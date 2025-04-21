
import os
import re
import json
from typing import Any, Dict, List

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

# ─── Import your existing query generator ─────────────────────────────────────
# Assumes you have `generate_query_openai(question: str, model: str) -> (db_type, query)`
# defined in query_generator.py
from query_generator import generate_query_openai

import mysql.connector
from pymongo import MongoClient

# ─── 1) Load environment variables ──────────────────────────────────────────────
load_dotenv()

MYSQL_HOST = os.getenv("MYSQL_HOST", "localhost")
MYSQL_PORT = int(os.getenv("MYSQL_PORT", "3306"))
MYSQL_USER = os.getenv("MYSQL_USER", "your_mysql_user")
MYSQL_PASS = os.getenv("MYSQL_PASS", "your_mysql_pass")
MYSQL_DB = os.getenv("MYSQL_DB",   "your_database")

MONGO_URI = os.getenv("MONGO_URI",  "mongodb://user:pass@localhost:27017/")
MONGO_DBNAME = os.getenv("MONGO_DBNAME", "your_mongo_db")

# ─── 2) Initialize database clients ─────────────────────────────────────────────
mongo_client = MongoClient(MONGO_URI)
mongo_db = mongo_client[MONGO_DBNAME]

# ─── 3) Helpers to execute queries ──────────────────────────────────────────────
def exec_sql(query: str) -> List[Dict[str, Any]]:
    conn = mysql.connector.connect(
        host=MYSQL_HOST, port=MYSQL_PORT,
        user=MYSQL_USER, password=MYSQL_PASS,
        database=MYSQL_DB
    )
    cur = conn.cursor(dictionary=True)
    cur.execute(query)
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows

def exec_mongo(mongo_query: str) -> List[Dict[str, Any]]:
    # Very basic parser: expects `db.COL.find({...})`
    m = re.match(r"db\.([a-zA-Z0-9_]+)\.find\(\s*(\{.*\})\s*\)", mongo_query, re.S)
    if not m:
        raise ValueError(f"Cannot parse Mongo query: {mongo_query}")
    coll_name, filt_json = m.group(1), m.group(2)
    # Convert single‐quoted JS object to valid JSON
    filt_py = json.loads(filt_json.replace("'", '"'))
    return list(mongo_db[coll_name].find(filt_py))

# ─── 4) FastAPI app and models ─────────────────────────────────────────────────
app = FastAPI()

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
        if db_type == "sql":
            results = exec_sql(query)
        else:
            results = exec_mongo(query)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # 3) Return both the generated query and its results
    return QueryResponse(db_type=db_type, query=query, results=results)

# ─── 5) To run: uvicorn api_server:app --host 0.0.0.0 --port 8000 --reload ────