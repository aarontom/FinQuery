import os
from openai import OpenAI

# ─── 1) Configure your OpenAI client ─────────────────────────────────────────
client = OpenAI(api_key='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')
if not client.api_key:
    raise RuntimeError("Please set the OPENAI_API_KEY environment variable")

# ─── 2) Schema definitions ────────────────────────────────────────────────────
schema = {
    "companies": {
        "db_type":   "sql",
        "definition":"companies(company_id, ticker, name, sector, industry, exchange, created_at, sentiment)"
    },
    "financial_data_sp500": {
        "db_type":   "sql",
        "definition":(
            "financial_data_sp500("
            "date, firm, ticker, research_development, income_before_tax, net_income, "
            "selling_general_administrative, gross_profit, ebit, operating_income, "
            "interest_expense, income_tax_expense, total_revenue, total_operating_expenses, "
            "cost_of_revenue, total_other_income_expense_net, net_income_from_continuing_ops, "
            "net_income_applicable_to_common_shares"
            ")"
        )
    },
    "financial_statements": {
        "db_type":   "sql",
        "definition":(
            "financial_statements("
            "year, company, category, market_cap_in_b_usd, revenue, gross_profit, net_income, "
            "earning_per_share, ebitda, share_holder_equity, "
            "cash_flow_from_operating, cash_flow_from_investing, cash_flow_from_financial_activities, "
            "current_ratio, debt_equity_ratio, roe, roa, roi, net_profit_margin, "
            "free_cash_flow_per_share, return_on_tangible_equity, number_of_employees, "
            "inflation_rate_in_us_us"
            ")"
        )
    },
    "weekly_prices": {
        "db_type": "mongo",
        "definition": "weekly_prices(symbol: String, timestamp: Date, open: Number, high: Number, low: Number, close: Number, volume: Number)",
        "description": "Stores one document per symbol per ISO week, with OHLC and volume aggregated for that week.  \n• symbol: the ticker (e.g. \"MSFT\")  \n• timestamp: BSON Date at week's close  \n• open, high, low, close: numeric prices  \n• volume: total traded volume"
    }
}

# ─── 3) Few‑shot examples ───────────────────────────────────────────────────────
EXAMPLES = [
    # — Mongo aggregation for weekly_prices —
    {
        "db_type": "mongo",
        "nl":      "Get the closing price and volume for AAPL in week 15 of 2021.",
        "query":   (
            "db.weekly_prices.aggregate([\n"
            "  { $match: { symbol: \"AAPL\" } },\n"
            "  { $addFields: {\n"
            "      weekOfYear: { $isoWeek:    \"$timestamp\" },\n"
            "      year:       { $isoWeekYear: \"$timestamp\" }\n"
            "    }\n"
            "  },\n"
            "  { $match: { year: 2021, weekOfYear: 15 } },\n"
            "  { $project: { weekOfYear: 0, year: 0 } }\n"
            "]);"
        )
    },
    {
        "db_type": "mongo",
        "nl": "Find the document for MSFT on 2020-04-20.",
        "query": '''db.weekly_prices.find({
    symbol: "MSFT",
    timestamp: ISODate("2020-04-20T00:00:00Z")
});'''
    },
    {
        "db_type": "mongo",
        "nl": "Get all weekly_prices for AAPL in week 3 of 2020 using a date range.",
        "query": '''db.weekly_prices.find({
    symbol: "AAPL",
    timestamp: {
        $gte: ISODate("2020-01-13T00:00:00Z"),
        $lt:  ISODate("2020-01-20T00:00:00Z")
    }
});'''
    },
    {
        "db_type": "mongo",
        "nl": "Show the open and close prices for IBM in week 10 of 2022.",
        "query": '''db.weekly_prices.aggregate([
    { $match: { symbol: "IBM" } },
    { $addFields: {
        weekOfYear: { $isoWeek:    "$timestamp" },
        year:       { $isoWeekYear:"$timestamp" }
    }},
    { $match: { year: 2022, weekOfYear: 10 } },
    { $project: { _id: 0, open: 1, close: 1 } }
]);'''
    },
    {
        "db_type": "mongo",
        "nl": "Get the top 5 highest-volume weeks for NVDA.",
        "query": '''db.weekly_prices.aggregate([
    { $match: { symbol: "NVDA" } },
    { $sort: { volume: -1 } },
    { $limit: 5 }
]);'''
    },
    {
        "db_type": "mongo",
        "nl": "What was the average closing price per symbol in 2021?",
        "query": '''db.weekly_prices.aggregate([
    { $addFields: { year: { $isoWeekYear: "$timestamp" } } },
    { $match: { year: 2021 } },
    { $group: {
        _id: "$symbol",
        avgClose: { $avg: "$close" }
    }},
    { $project: { symbol: "$_id", _id: 0, avgClose: 1 } }
]);'''
    },
    {
        "db_type": "mongo",
        "nl": "Insert a new weekly_prices document for TSM with a timestamp and volume 1000000.",
        "query": '''db.weekly_prices.insertOne({
    symbol: "TSM",
    timestamp: ISODate("2025-04-20T00:00:00Z"),
    open: 110.5,
    high: 112.0,
    low: 109.8,
    close: 111.2,
    volume: 1000000
});'''
    },
    # — SQL example for companies —
    {
        "db_type": "sql",
        "nl":      "List all companies in the Information Technology sector.",
        "query":   (
            "SELECT *\n"
            "FROM companies\n"
            "WHERE sector = 'Information Technology';"
        )
    },
    # — SQL example for financial_data_sp500 —
    {
        "db_type": "sql",
        "nl":      "What was Microsoft's R&D spend on 2021-12-31?",
        "query":   (
            "SELECT research_development\n"
            "FROM financial_data_sp500\n"
            "WHERE ticker = 'MSFT'\n"
            "  AND date = '2021-12-31';"
        )
    },
    # — SQL example for financial_statements —
    {
        "db_type": "sql",
        "nl":      "How much revenue did AAPL report in 2022?",
        "query":   (
            "SELECT revenue\n"
            "FROM financial_statements\n"
            "WHERE company = 'AAPL'\n"
            "  AND year = 2022;"
        )
    }
]

# ─── 4) Routing: weekly_prices → Mongo, everything else → SQL ────────────────
def detect_db_type(nl_question: str) -> str:
    q = nl_question.lower()
    # any mention of week or symbol routes to Mongo
    mongo_keys = ("weekly", "week", "symbol", "volume", "stock")
    return "mongo" if any(k in q for k in mongo_keys) else "sql"

# ─── 5) Build ChatCompletion messages ─────────────────────────────────────────
def build_messages(nl_question: str, db_type: str) -> list[dict]:
    defs = [e["definition"] for e in schema.values() if e["db_type"] == db_type]
    schema_block = "\n".join(defs)

    system = {
        "role": "system",
        "content": (
            "You are an AI assistant that converts natural language into database queries. "
            "For the `weekly_prices` collection, data is only available at week granularity up to 2022—"
            "Return ONLY the query, no explanations. If we do not ask for a specified time period, do not include the time period."
        )
    }

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
    return [system, {"role": "user", "content": "\n".join(user_lines)}]

# ─── 6) Generate with OpenAI ─────────────────────────────────────────────────
def generate_query_openai(nl_question: str, model: str = "gpt-3.5-turbo") -> tuple[str, str]:
    db_type = detect_db_type(nl_question)
    messages = build_messages(nl_question, db_type)
    resp = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0.05,
        max_tokens=2000,
    )
    return db_type, resp.choices[0].message.content.strip()

# ─── 7) Quick smoke‑test ─────────────────────────────────────────────────────
if __name__ == "__main__":
    tests = [
        "Get the closing price and volume for AAPL in week 15 of 2021.",
        "List all companies in the Information Technology sector.",
        "What was Microsoft's R&D spend on 2021-12-31?",
        "How much revenue did AAPL report in 2022?"
    ]
    for q in tests:
        db, qtext = generate_query_openai(q, model="gpt-4")
        print(f">>> [{db.upper()}] {q!r}\n{qtext}\n")