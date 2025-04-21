import os
from openai import OpenAI

# —————————————————————————————————————————————————————————
# 1) — Configure your API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
if not client.api_key:
    raise RuntimeError("Please set the OPENAI_API_KEY environment variable")

# —————————————————————————————————————————————————————————
# 2) — Per‑table/collection schema definitions
schema = {
    # Company & Market Data → SQL
    "companies":        { "db_type": "sql",   "definition": "companies(company_id, ticker, name, sector, industry, exchange, created_at)" },
    "stock_prices":     { "db_type": "sql",   "definition": "stock_prices(price_id, company_id, trade_date, open_price, high_price, low_price, close_price, volume)" },

    # Financial Statements → SQL
    "income_statements":{ "db_type": "sql",   "definition": "income_statements(stmt_id, company_id, period_end, revenue, cost_of_goods, operating_exp, net_income)" },
    "balance_sheets":   { "db_type": "sql",   "definition": "balance_sheets(stmt_id, company_id, period_end, total_assets, total_liab, equity)" },

    # Portfolio & Transactions → SQL
    "portfolios":       { "db_type": "sql",   "definition": "portfolios(portfolio_id, user_id, name, created_at)" },
    "holdings":         { "db_type": "sql",   "definition": "holdings(holding_id, portfolio_id, company_id, shares, avg_cost, as_of_date)" },
    "transactions":     { "db_type": "sql",   "definition": "transactions(tx_id, portfolio_id, company_id, tx_date, tx_type, quantity, price_per_unit)" },

    # Sentiment Analysis → MongoDB
    "texts":            { "db_type": "mongo", "definition": "texts(_id, source, publishedAt, content, sentiment)" },
}

# —————————————————————————————————————————————————————————
# 3) — Few‑shot examples
EXAMPLES = [
    {
        "db_type": "sql",
        "nl":      "Get the closing prices for AAPL for the last 5 trading days.",
        "query":   (
            "SELECT sp.trade_date, sp.close_price\n"
            "FROM stock_prices AS sp\n"
            "JOIN companies AS c ON sp.company_id = c.company_id\n"
            "WHERE c.ticker = 'AAPL'\n"
            "ORDER BY sp.trade_date DESC\n"
            "LIMIT 5;"
        )
    },
    {
        "db_type": "mongo",
        "nl":      "Find tweets with negative sentiment about TSLA since 2025-04-01.",
        "query":   (
            "db.texts.find({\n"
            '  "content": { $regex: "TSLA", $options: "i" },\n'
            '  "sentiment.label": "negative",\n'
            '  "publishedAt": { $gte: ISODate("2025-04-01T00:00:00Z") }\n'
            "});"
        )
    },
]

# —————————————————————————————————————————————————————————
def detect_db_type(nl_question: str) -> str:
    """Keyword‑based routing to mongo for sentiment, else sql."""
    q = nl_question.lower()
    if any(kw in q for kw in ("sentiment", "tweet", "news", "reddit", "social")):
        return "mongo"
    return "sql"

# —————————————————————————————————————————————————————————
def build_messages(nl_question: str, db_type: str) -> list[dict]:
    """
    Build ChatCompletion messages:
    - system: global instructions
    - user: schema + examples + user query
    """
    # collect only schemas for this db_type
    defs = [entry["definition"] for entry in schema.values() if entry["db_type"] == db_type]
    schema_block = "\n".join(defs)

    # system prompt to set behavior
    system = {
        "role": "system",
        "content": (
            "You are an AI assistant that converts natural language into database queries. "
            "You will be given a schema and a user request, and you must return only the "
            "exact query (no prose)."
        )
    }

    # user prompt: schema + examples + question
    user_lines = [
        f"{db_type.upper()}_SCHEMA:",
        schema_block,
        "",
        "### Examples ###",
    ]
    for ex in EXAMPLES:
        if ex["db_type"] == db_type:
            user_lines += [
                f"# NL: {ex['nl']}",
                f"{db_type.upper()} QUERY:\n{ex['query']}",
                ""
            ]
    user_lines += [
        f"# NL: {nl_question}",
        f"{db_type.upper()} QUERY:"
    ]

    user = {"role": "user", "content": "\n".join(user_lines)}
    return [system, user]

# —————————————————————————————————————————————————————————

def generate_query_openai(nl_question: str, model: str = "gpt-3.5-turbo") -> tuple[str,str]:
    """
    Detect db_type, build messages, call the new OpenAI client,
    and return (db_type, query_text).
    """
    db_type = detect_db_type(nl_question)
    messages = build_messages(nl_question, db_type)

    # — use client.chat.completions.create() instead of openai.ChatCompletion.create()
    resp = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0.0,
        max_tokens=256,
    )
    # access the content from the new Response object
    query = resp.choices[0].message.content.strip()
    return db_type, query

# —————————————————————————————————————————————
if __name__ == "__main__":
    tests = [
        "What was Tesla's net income in Q1 2025?",
        "Give me the average sentiment score for tweets about AAPL in the last 24 hours."
    ]
    for q in tests:
        db, qtext = generate_query_openai(q, model="gpt-4")
        print(f">>> [{db.upper()}] {q}\n{qtext}\n")