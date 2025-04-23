import re
import json
from typing import Any, Dict, List, Optional
from collections.abc import Iterable

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel

from query_generator import generate_query_openai

import pandas as pd
from sqlalchemy import create_engine
from pymongo import MongoClient
from pymongo.cursor import Cursor

# ─── 1) Hard‑coded database connection details ────────────────────────────────
DB_HOST     = "localhost"
DB_USER     = "api_user"
DB_PASSWORD = "StrongPass!"
DB_NAME     = "fintech_db"

# MongoDB (local)
MONGO_URI    = "mongodb://api_user:StrongPass!@127.0.0.1:27017/fintech_db?authSource=fintech_db"
MONGO_DBNAME = "stocks"

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
        df = pd.read_sql(query, conn, params=params)
        return df.to_dict(orient="records")
    finally:
        conn.close()

def exec_mongo(mongo_query: str) -> List[Dict[str, Any]]:
    """
    Parse & run a Mongo snippet like:
      db.COL.find({...})
      db.COL.aggregate([...])
      db.COL.insertOne({...})
    Always return a JSON-safe list of dicts.
    """
    # 1) Strip trailing semicolon
    js = mongo_query.strip().rstrip(';')

    # 2) Extract collection, method, args
    m = re.match(r"db\.([^.]+)\.([^(]+)\(([\s\S]*)\)$", js)
    if not m:
        raise ValueError(f"Cannot parse Mongo snippet: {mongo_query!r}")
    coll_name, method, args_str = m.groups()
    method = method.strip()

    # 3) Quote bare keys so JSON loads work
    json_args = re.sub(
        r'([{,])\s*([\$\w][\w\$]*)\s*:',
        r'\1 "\2":',
        args_str
    )

    # 4) Parse JS object or array to Python
    try:
        parsed = json.loads(json_args)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to JSON-parse arguments: {e}\n→ {json_args}")

    # 5) Dispatch to PyMongo
    coll = mongo_db[coll_name]
    fn = getattr(coll, method, None)
    if fn is None:
        raise ValueError(f"No such Mongo method: {method}")
    result = fn(parsed) if not isinstance(parsed, list) else fn(parsed)

    # 6) Materialize into a Python list
    try:
        # aggregate() returns a CommandCursor (iterable), find() returns Cursor
        docs = list(result)
    except TypeError:
        # not iterable (e.g. insertOne returns a result object)
        if isinstance(result, dict):
            docs = [result]
        else:
            # fallback: wrap any single value
            docs = [result]

    # 7) JSON-encode to convert ObjectId, datetime, etc.
    return jsonable_encoder(docs)

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

@app.post("/query", response_model=QueryResponse)
async def run_query(req: QueryRequest):
    # 1) Generate the SQL or Mongo query
    db_type, query = generate_query_openai(req.question, model="gpt-3.5-turbo")

    # 2) Execute against the appropriate database
    try:
        if db_type.lower() == "sql":
            results = exec_sql(query)
        else:
            results = exec_mongo(query)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # 3) Return both the generated query and its results
    return QueryResponse(db_type=db_type, query=query, results=results)

# ─── 5) To run: 
# uvicorn api_server:app --host 0.0.0.0 --port 8000 --reload
