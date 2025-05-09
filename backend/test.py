#!/usr/bin/env python3
import os
import re
import sys
import json
from typing import Any, Dict, List, Optional

import pandas as pd
from sqlalchemy import create_engine
from pymongo import MongoClient
from dotenv import load_dotenv

# ─── Import your existing query generator ─────────────────────────────────────
# Assumes you have generate_query_openai(question: str, model: str) -> (db_type, query)
# defined in query_generator.py
from query_generator import generate_query_openai

# ─── 1) Load environment variables (if you have a .env) ─────────────────────────
load_dotenv()

# ─── 2) Configure your DB connections ──────────────────────────────────────────
MYSQL_HOST = "localhost"
MYSQL_USER = "root"
MYSQL_PASS = "DSCI-551"
MYSQL_DB   =  "finquery_db"
MONGO_URI = "mongodb://localhost:27017"
MONGO_DBNAME = "weekly_prices"

# SQLAlchemy engine for MySQL
ENGINE = create_engine(
    f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASS}@{MYSQL_HOST}/{MYSQL_DB}",
    pool_pre_ping=True,
    connect_args={"local_infile": 1}
)
# "mongodb://user:pass@localhost:27017/"
# Mongo client
mongo_client = MongoClient(MONGO_URI)
mongo_db = mongo_client[MONGO_DBNAME]

# ─── 3) Helpers ────────────────────────────────────────────────────────────────
def exec_sql(query: str, params: Optional[List[Any]] = None) -> List[Dict[str, Any]]:
    conn = ENGINE.raw_connection()
    try:
        df = pd.read_sql(query, conn, params=params)
        return df.to_dict(orient="records")
    finally:
        conn.close()

import re
import json
from pymongo.cursor import Cursor

def exec_mongo(mongo_query: str):
    # 1) Clean up
    js = mongo_query.strip().rstrip(';')   # remove trailing semicolon
    # 2) Figure out collection + method
    m = re.match(r"db\.([^.]+)\.([^(]+)\(([\s\S]*)\)$", js)
    if not m:
        raise ValueError(f"Cannot parse Mongo snippet: {mongo_query!r}")
    coll_name, method, args_str = m.groups()
    method = method.strip()
    # 3) Quote all object‑literal keys so JSON parser can handle it
    #    This regex finds { foo:  or ,foo: or { $foo:
    json_args = re.sub(
      r'([{,])\s*([\$\w][\w\$]*)\s*:',   # group1=brace/comma, group2=key
      r'\1 "\2":',                       # inserts quotes around key
      args_str
    )
    # 4) Parse into Python object
    try:
        parsed = json.loads(json_args)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to JSON‑parse arguments: {e}\n→ {json_args}")

    # 5) Dispatch to PyMongo
    coll = mongo_db[coll_name]
    fn = getattr(coll, method, None)
    if fn is None:
        raise ValueError(f"No such Mongo method: {method}")
    result = fn(parsed) if not isinstance(parsed, list) else fn(parsed)

    # 6) If it’s a cursor, materialize it
    return list(result) if isinstance(result, Cursor) else result



# ─── 4) Main routine ──────────────────────────────────────────────────────────
def main():
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} \"<your question>\"")
        sys.exit(1)

    question = sys.argv[1]
    # 1) Generate the query
    db_type, query = generate_query_openai(question, model="gpt-4o-mini")

    # 2) Execute and fetch results
    try:
        if db_type.lower() == "sql":
            print(query)
            results = exec_sql(query)
        else:
            print(query)
            raw = exec_mongo(query)
            # make sure to pull the cursor into a list
            results = list(raw) if hasattr(raw, "__iter__") else raw
    except Exception as e:
        print(f"Error executing {db_type} query:\n{e}", file=sys.stderr)
        sys.exit(2)

    # 3) Print out the query + results
    output = {
        "db_type": db_type,
        "query":   query,
        "results": results
    }
    print(json.dumps(output, indent=2, default=str))

if __name__ == "__main__":
    main()

