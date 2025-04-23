// pages/query.tsx

// app/query/page.tsx
"use client";

import React, { useState, KeyboardEvent } from "react";

// 1) Declare the shared response type
export interface QueryResponse {
  db_type: "sql" | "mongo";
  query: string;
  results: Record<string, any>[];
}

// 2) Inline QueryInterface component
function QueryInterface({
  onSubmit,
  disabled,
}: {
  onSubmit: (question: string) => void;
  disabled: boolean;
}) {
  const [question, setQuestion] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && question.trim() && !disabled) {
      onSubmit(question.trim());
    }
  };

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        className="flex-1 border rounded p-2"
        placeholder="Ask a question…"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={() => onSubmit(question.trim())}
        disabled={disabled || !question.trim()}
      >
        Submit
      </button>
    </div>
  );
}

// 3) Inline QueryResults component
// inside your page file, replace the old QueryResults with this:

function QueryResults({
  data,
  loading,
  error,
}: {
  data: QueryResponse | null;
  loading: boolean;
  error: string | null;
}) {
  if (loading) return <p className="text-gray-900">Loading…</p>;
  if (error)   return <p className="text-red-500">{error}</p>;
  if (!data)  return null;

  const rows = data.results;
  // guard against empty
  if (rows.length === 0) {
    return <p className="text-gray-900">No results found.</p>;
  }

  // use the keys of the first row as table headers
  const headers = Object.keys(rows[0]);

  return (
    <div className="space-y-4 text-gray-900">
      <div>
        <h2 className="font-semibold">Generated ({data.db_type.toUpperCase()}) Query:</h2>
        <pre className="bg-gray-100 p-3 overflow-auto text-gray-900">
          {data.query}
        </pre>
      </div>

      <div>
        <h2 className="font-semibold">Results:</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              {headers.map((h) => (
                <th
                  key={h}
                  className="border px-4 py-2 text-left bg-gray-200"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {headers.map((h) => (
                  <td key={h} className="border px-4 py-2">
                    {row[h] == null ? "" : String(row[h])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 4) The page component tying it all together
export default function QueryPage() {
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (question: string) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }

      const data: QueryResponse = await res.json();
      setResponse(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Query Assistant</h1>
      <p className="text-muted-foreground">
        Ask questions about financial data in natural language. Our AI will
        translate your query and fetch the relevant information.
      </p>

      <QueryInterface onSubmit={handleSubmit} disabled={loading} />
      <QueryResults data={response} loading={loading} error={error} />
    </div>
  );
}
