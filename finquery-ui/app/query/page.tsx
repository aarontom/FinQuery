import { QueryInterface } from "@/components/query-interface"
import { QueryResults } from "@/components/query-results"

export default function QueryPage() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Query Assistant</h1>
      <p className="text-muted-foreground">
        Ask questions about financial data in natural language. Our AI will translate your query and fetch the relevant
        information.
      </p>

      <QueryInterface />

      <QueryResults />
    </div>
  )
}

