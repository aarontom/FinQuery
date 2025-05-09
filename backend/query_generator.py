import os
from openai import OpenAI

# ─── 1) Configure your OpenAI client ─────────────────────────────────────────
client = OpenAI(api_key='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')
if not client.api_key:
    raise RuntimeError("Please set the OPENAI_API_KEY environment variable")

# ─── 2) Schema definitions (unchanged) ───────────────────────────────────────
schema = {
    "companies": {"definition": "companies(company_id, ticker, name, sector, industry, exchange, created_at, sentiment)"},
    "financial_data_sp500": {"definition": (
        "financial_data_sp500(date, firm, ticker, research_development, income_before_tax, net_income, "
        "selling_general_administrative, gross_profit, ebit, operating_income, interest_expense, income_tax_expense, "
        "total_revenue, total_operating_expenses, cost_of_revenue, total_other_income_expense_net, "
        "net_income_from_continuing_ops, net_income_applicable_to_common_shares)"
    )},
    "financial_statements": {"definition": (
        "financial_statements(year, company, category, market_cap_in_b_usd, revenue, gross_profit, net_income, "
        "earning_per_share, ebitda, share_holder_equity, cash_flow_from_operating, cash_flow_from_investing, "
        "cash_flow_from_financial_activities, current_ratio, debt_equity_ratio, roe, roa, roi, net_profit_margin, "
        "free_cash_flow_per_share, return_on_tangible_equity, number_of_employees, inflation_rate_in_us_us)"
    )},
}

# ─── 3) Expanded few-shot examples ───────────────────────────────────────────
EXAMPLES = [
    # — SQL examples —
    {"db_type": "sql", "nl": "What tables exist in the database?", "query": "SHOW TABLES;"},
    {"db_type": "sql", "nl": "What columns does the companies table have?", "query": "DESCRIBE companies;"},
    {"db_type": "sql", "nl": "Show me 3 sample rows from financial_data_sp500.", "query": "SELECT * FROM financial_data_sp500 LIMIT 3;"},
    {"db_type": "sql", "nl": "Give me a query that finds the top 5 firms by total_revenue in 2021.",
     "query": (
         "SELECT firm, total_revenue\n"
         "FROM financial_data_sp500\n"
         "WHERE YEAR(date) = 2021\n"
         "ORDER BY total_revenue DESC\n"
         "LIMIT 5;"
     )},
    {"db_type": "sql", "nl": "List each sector and its average gross_profit from financial_statements for year 2022, but only show those with avg > $10 billion, sorted high→low.",
     "query": (
         "SELECT sector, AVG(gross_profit) AS avg_gp\n"
         "FROM financial_statements\n"
         "WHERE year = 2022\n"
         "GROUP BY sector\n"
         "HAVING AVG(gross_profit) > 10000000000\n"
         "ORDER BY avg_gp DESC;"
     )},
    {"db_type": "sql", "nl": "For date = '2021-12-31', list company name, ticker, and net_income.",
     "query": (
         "SELECT c.name, c.ticker, f.net_income\n"
         "FROM companies AS c\n"
         "JOIN financial_data_sp500 AS f ON c.ticker = f.ticker\n"
         "WHERE f.date = '2021-12-31';"
     )},
    {"db_type": "sql", "nl": "Show me rows 11–20 of financial_statements ordered by market_cap_in_b_usd desc.",
     "query": (
         "SELECT *\n"
         "FROM financial_statements\n"
         "ORDER BY market_cap_in_b_usd DESC\n"
         "LIMIT 10 OFFSET 10;"
     )},
    {"db_type": "sql", "nl": "Add a new company: ticker XYZ, name 'Example Corp', sector Tech, industry Software, exchange NASDAQ, created_at today, sentiment 0.1.",
     "query": (
         "INSERT INTO companies (ticker, name, sector, industry, exchange, created_at, sentiment)\n"
         "VALUES ('XYZ', 'Example Corp', 'Tech', 'Software', 'NASDAQ', CURDATE(), 0.1);"
     )},

    # — Mongo examples —
    {"db_type": "mongo", "nl": "What collections are in this database?", "query": "show collections;"},
    {"db_type": "mongo", "nl": "Give me 3 sample documents from companies.", "query": "db.companies.find().limit(3);"},
    {"db_type": "mongo", "nl": "Find the names and tickers of all companies in the 'Technology' sector.",
     "query": (
         "db.companies.find(\n"
         "  { sector: 'Technology' },\n"
         "  { _id: 0, name: 1, ticker: 1 }\n"
         ");"
     )},
    {"db_type": "mongo", "nl": "For financial_data_sp500, compute the total net_income per firm in 2020, and list the top 5.",
     "query": (
         "db.financial_data_sp500.aggregate([\n"
         "  { $match: { date: { $gte: ISODate('2020-01-01'), $lte: ISODate('2020-12-31') } } },\n"
         "  { $group: { _id: '$firm', totalNet: { $sum: '$net_income' } } },\n"
         "  { $sort: { totalNet: -1 } },\n"
         "  { $limit: 5 }\n"
         "]);"
     )},
    {"db_type": "mongo", "nl": "Join financial_data_sp500 with companies to show each firm's name and revenue on 2021-12-31.",
     "query": (
         "db.financial_data_sp500.aggregate([\n"
         "  { $match: { date: ISODate('2021-12-31') } },\n"
         "  { $lookup: { from: 'companies', localField: 'ticker', foreignField: 'ticker', as: 'companyInfo' } },\n"
         "  { $unwind: '$companyInfo' },\n"
         "  { $project: { _id: 0, firm: 1, revenue: '$total_revenue', name: '$companyInfo.name' } }\n"
         "]);"
     )},
    {"db_type": "mongo", "nl": "Insert a new financial_data_sp500 record for firm 'ABC Inc' on 2022-06-30 with net_income 5000000.",
     "query": (
         "db.financial_data_sp500.insertOne({\n"
         "  date: ISODate('2022-06-30'),\n"
         "  firm: 'ABC Inc',\n"
         "  ticker: 'ABC',\n"
         "  net_income: 5000000\n"
         "});"
     )},
    {"db_type": "mongo", "nl": "Increase net_income by 10% for firm 'Example Corp' on 2021-12-31.",
     "query": (
         "db.financial_data_sp500.updateOne(\n"
         "  { firm: 'Example Corp', date: ISODate('2021-12-31') },\n"
         "  { $mul: { net_income: 1.10 } }\n"
         ");"
     )},
    {"db_type": "mongo", "nl": "Delete all financial_statements documents for year 2019 with revenue < 1 billion.",
     "query": (
         "db.financial_statements.deleteMany({ year: 2019, revenue: { $lt: 1000000000 } });"
     )},
]

# ─── 4) Build ChatCompletion messages ─────────────────────────────────────────
def build_messages(nl_question: str, db_type: str) -> list[dict]:
    # include schema, system prompt now allows schema exploration & DML
    schema_block = "\n".join(entry["definition"] for entry in schema.values())
    system = {
        "role": "system",
        "content": (
            "You are an AI assistant that converts natural language into SQL or MongoDB commands. "
            "You can handle schema exploration (SHOW TABLES, DESCRIBE, show collections), data retrieval (SELECT, find, aggregate), "
            "pagination (LIMIT/OFFSET), joins ($lookup or JOIN), and data modification (INSERT, UPDATE, DELETE, insertOne, updateOne, deleteMany). "
            "Return ONLY the exact command—no explanations."
        )
    }
    user_lines = [
        f"{db_type.upper()}_SCHEMA:",
        schema_block,
        "", "### Examples ###"
    ]
    for ex in EXAMPLES:
        if ex["db_type"] == db_type:
            user_lines += [
                f"# NL: {ex['nl']}",
                f"{db_type.upper()} QUERY:\n{ex['query']}",
                ""
            ]
    # append actual question
    user_lines += [f"# NL: {nl_question}", f"{db_type.upper()} QUERY:"]
    return [system, {"role": "user", "content": "\n".join(user_lines)}]



# ─── 6) Generate with OpenAI ─────────────────────────────────────────────────
def generate_query_openai(nl_question: str, force_db: str, model: str = "gpt-3.5-turbo") -> tuple[str, str]:
    db_type = force_db
    messages = build_messages(nl_question, db_type)
    resp = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0.05,
        max_tokens=512,
    )
    return db_type, resp.choices[0].message.content.strip()

# ─── 7) Quick smoke-test ─────────────────────────────────────────────────────
if __name__ == "__main__":
    tests = [
        "List all companies in the Information Technology sector.",
        "What was Microsoft's R&D spend on 2021-12-31?",
        "How much revenue did AAPL report in 2022?",
        "Find all financial_statements entries for year 2023.",
        "Show all weekly prices for AAPL in week 15 of 2021."
    ]
    for q in tests:
        db, qtext = generate_query_openai(q, model="gpt-4")
        print(f">>> [{db.upper()}] {q!r}\n{qtext}\n")