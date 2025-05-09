import re
import json
from typing import Any, Dict, List, Optional
from bson import ObjectId, json_util
from datetime import datetime

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel

from query_generator import generate_query_openai

import pandas as pd
from sqlalchemy import create_engine
from pymongo import MongoClient

# ─── 1) Hard‑coded database connection details ────────────────────────────────
DB_HOST     = "localhost"
DB_USER     = "api_user"
DB_PASSWORD = "StrongPass!"
DB_NAME     = "fintech_db"

# MongoDB (local)
MONGO_URI    = "mongodb://api_user:StrongPass!@127.0.0.1:27017/fintech_db?authSource=fintech_db"
MONGO_DBNAME = "fintech_db"

# ─── 2) Initialize database clients ─────────────────────────────────────────────
# SQLAlchemy engine for MySQL
engine = create_engine(
    f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
)

# Mongo client
mongo_client = MongoClient(MONGO_URI)
mongo_db     = mongo_client[MONGO_DBNAME]

# ─── 3) Helpers to execute queries ──────────────────────────────────────────────
def exec_sql(query: str, params: Optional[List[Any]] = None) -> List[Dict[str, Any]]:
    print(query)
    conn = engine.raw_connection()
    try:
        sql = query.strip().lower()
        # If it starts with SELECT/SHOW/DESCRIBE return rows via Pandas
        if sql.startswith(("select", "show", "describe")):
            df = pd.read_sql(query, conn, params=params)
            return df.to_dict(orient="records")
        # Otherwise treat it as DML
        cursor = conn.cursor()
        cursor.execute(query, params or [])
        conn.commit()
        # You could return [{"affected": cursor.rowcount}] if you like,
        # but an empty list is fine for an INSERT/UPDATE/DELETE.
        return []
    finally:
        conn.close()

def exec_mongo(mongo_query: str) -> List[Dict[str, Any]]:
    print(mongo_query)
    s = mongo_query.strip().rstrip(';')

    # ─── 1) JSON-based command ────────────────────────────────────────────────
    if s.startswith("{"):
        cmd = json.loads(s)
        coll_name = cmd.get("collection")
        if not coll_name:
            raise ValueError("JSON command must include 'collection'")
        coll = mongo_db[coll_name]

        op = cmd.get("operation", "find").lower()
        if op == "find":
            filt   = cmd.get("filter", {})
            proj   = cmd.get("projection")
            cursor = coll.find(filt, proj)
            if "sort" in cmd:
                cursor = cursor.sort(list(cmd["sort"].items()))
            if "skip" in cmd:
                cursor = cursor.skip(int(cmd["skip"]))
            if "limit" in cmd:
                cursor = cursor.limit(int(cmd["limit"]))
            docs = list(cursor)

        elif op == "aggregate":
            pipeline = cmd.get("pipeline")
            if not isinstance(pipeline, list):
                raise ValueError("'pipeline' must be a list for aggregate")
            docs = list(coll.aggregate(pipeline))

        elif op == "insertOne":
            doc = cmd.get("document")
            if doc is None:
                raise ValueError("insertOne JSON must include 'document'")
            res = coll.insert_one(doc)
            docs = [{"inserted_id": str(res.inserted_id)}]

        elif op == "updateOne":
            filt   = cmd.get("filter", {})
            update = cmd.get("update", {})
            res = coll.update_one(filt, update)
            docs = [{
                "matched_count":  res.matched_count,
                "modified_count": res.modified_count
            }]

        elif op == "deleteMany":
            filt = cmd.get("filter", {})
            res  = coll.delete_many(filt)
            docs = [{"deleted_count": res.deleted_count}]

        else:
            raise ValueError(f"Unsupported Mongo operation: {op}")

    # ─── 2) SHOW COLLECTIONS shortcut ─────────────────────────────────────────
    elif re.match(r"^show\s+collections$", s, flags=re.IGNORECASE):
        names = mongo_db.list_collection_names()
        docs = [{"name": n} for n in names]

    # ─── 3) db.getCollectionNames() snippet ───────────────────────────────────
    elif re.match(r"^db\.getCollectionNames\s*\(\s*\)$", s):
        names = mongo_db.list_collection_names()
        docs = [{"name": n} for n in names]

    # ─── 4) JS-style snippet fallback ─────────────────────────────────────────
    elif s.startswith("db."):
        # helper to normalize JS-snippet JSON (including ISODate)
        def to_json(js: str) -> Any:
            # a) Convert ISODate('YYYY-MM-DD') → {"$date":"YYYY-MM-DDT00:00:00"}
            def repl_iso(m):
                ds = m.group(1)
                if re.match(r'^\d{4}-\d{2}-\d{2}$', ds):
                    return '{"$date":"%sT00:00:00"}' % ds
                return '{"$date":"%s"}' % ds
            t = re.sub(
                r"ISODate\(\s*'([^']+)'\s*\)",
                repl_iso,
                js
            )
            # b) single → double quotes
            t = t.replace("'", '"')
            # c) quote bare keys
            t = re.sub(r'([{\[,]\s*)(\$?[\w\$]+)\s*:', r'\1"\2":', t)
            # d) parse Extended-JSON into Python objects
            return json_util.loads(t)

        # 4a) insertOne
        m = re.match(r"db\.([^.]+)\.insertOne\(\s*(\{[\s\S]*\})\s*\)$", s)
        if m:
            coll_name, doc_js = m.groups()
            doc = to_json(doc_js)
            res = mongo_db[coll_name].insert_one(doc)
            docs = [{"inserted_id": str(res.inserted_id)}]

        # 4b) updateOne
        elif re.match(r"db\.\w+\.updateOne", s):
            m = re.match(
                r"db\.([^.]+)\.updateOne\(\s*(\{[\s\S]*?\})\s*,\s*(\{[\s\S]*?\})\s*\)$",
                s
            )
            if not m:
                raise ValueError(f"Cannot parse updateOne snippet: {s!r}")
            coll_name, filt_js, upd_js = m.groups()
            filt = to_json(filt_js)
            upd  = to_json(upd_js)
            res  = mongo_db[coll_name].update_one(filt, upd)
            docs = [{
                "matched_count":  res.matched_count,
                "modified_count": res.modified_count
            }]

        # 4c) deleteMany
        elif re.match(r"db\.\w+\.deleteMany", s):
            m = re.match(r"db\.([^.]+)\.deleteMany\(\s*(\{[\s\S]*\})\s*\)$", s)
            if not m:
                raise ValueError(f"Cannot parse deleteMany snippet: {s!r}")
            coll_name, filt_js = m.groups()
            filt = to_json(filt_js)
            res  = mongo_db[coll_name].delete_many(filt)
            docs = [{"deleted_count": res.deleted_count}]

        # 4c-1) deleteOne
        elif re.match(r"db\.\w+\.deleteOne", s):
            m = re.match(r"db\.([^.]+)\.deleteOne\(\s*(\{[\s\S]*\})\s*\)$", s)
            if not m:
                raise ValueError(f"Cannot parse deleteOne snippet: {s!r}")
            coll_name, filt_js = m.groups()
            filt = to_json(filt_js)
            res  = mongo_db[coll_name].delete_one(filt)
            docs = [{"deleted_count": res.deleted_count}]

        # 4d) aggregate (multiline)
        elif "aggregate" in s:
            m = re.search(
                r"db\.([^.]+)\.aggregate\(\s*(\[.*\])\s*\)$",
                s,
                flags=re.DOTALL
            )
            if not m:
                raise ValueError(f"Cannot parse aggregate snippet: {s!r}")
            coll_name, pipe_js = m.groups()
            pipeline = to_json(pipe_js)
            docs = list(mongo_db[coll_name].aggregate(pipeline))

        # 4e) find + optional sort/skip/limit
        elif ".find" in s:
            m = re.search(r"db\.([^.]+)\.find\(\s*(.*?)\s*\)", s, flags=re.DOTALL)
            if not m:
                raise ValueError(f"Cannot parse find snippet: {s!r}")
            coll_name, args_js = m.groups()
            coll   = mongo_db[coll_name]
            parts  = re.findall(r"\{[\s\S]*?\}", args_js)
            filt   = to_json(parts[0]) if len(parts) >= 1 else {}
            proj   = to_json(parts[1]) if len(parts) >= 2 else None
            cursor = coll.find(filt, proj)

            # chain .sort / .skip / .limit
            sort_m = re.search(r"\.sort\(\s*(\{[\s\S]*?\})\s*\)", s, flags=re.DOTALL)
            if sort_m:
                cursor = cursor.sort(list(to_json(sort_m.group(1)).items()))
            skip_m = re.search(r"\.skip\(\s*(\d+)\s*\)", s)
            if skip_m:
                cursor = cursor.skip(int(skip_m.group(1)))
            lim_m  = re.search(r"\.limit\(\s*(\d+)\s*\)", s)
            if lim_m:
                cursor = cursor.limit(int(lim_m.group(1)))

            docs = list(cursor)

        else:
            raise ValueError(f"Unsupported snippet method: {s}")

    else:
        raise ValueError(
            "Mongo command must be JSON, SHOW COLLECTIONS, getCollectionNames(), or start with 'db.'"
        )

    # ─── sanitize BSON types ────────────────────────────────────────────────
    def _sanitize(v: Any) -> Any:
        if isinstance(v, ObjectId):
            return str(v)
        if isinstance(v, datetime):
            return v.isoformat()
        return v

    clean = []
    for d in docs:
        dd = dict(d)
        for k, v in dd.items():
            dd[k] = _sanitize(v)
        clean.append(dd)

    return clean


# ─── helper to quote JS-style objects into valid JSON ────────────────────────
def _quote_keys(js: str) -> str:
    # 1) single → double quotes
    j = js.replace("'", '"')
    # 2) quote bare keys e.g. { market_cap: ... }
    return re.sub(r'([{\[,]\s*)(\$?[\w\$]+)\s*:', r'\1"\2":', j)

# ─── 4) FastAPI app and models ─────────────────────────────────────────────────
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React’s URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    db_type: str
    query:   str
    results: List[Dict[str, Any]]


def _run_and_exec(question: str, force_db: str) -> QueryResponse:
    """
    force_db: "sql" or "mongo". Generate via LLM then execute on the forced store.
    """
    # 1) Generate the query (ignore LLM's own db choice)
    _, query = generate_query_openai(question, force_db, model="gpt-3.5-turbo")

    # 2) Execute
    try:
        if force_db == "sql":
            results = exec_sql(query)
        else:
            results = exec_mongo(query)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # 3) Return with forced db_type
    return QueryResponse(db_type=force_db, query=query, results=results)


@app.post("/query/sql", response_model=QueryResponse)
async def run_sql(req: QueryRequest):
    """
    Generate an SQL query via the LLM, then run it against MySQL.
    """
    return _run_and_exec(req.question, force_db="sql")


@app.post("/query/mongo", response_model=QueryResponse)
async def run_mongo(req: QueryRequest):
    """
    Generate a Mongo snippet via the LLM, then run it against MongoDB.
    """
    return _run_and_exec(req.question, force_db="mongo")

# ─── 5) To run:
# uvicorn api_server:app --host 0.0.0.0 --port 8000 --reload