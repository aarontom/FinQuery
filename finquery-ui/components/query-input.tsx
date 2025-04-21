"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function QueryInput() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Handle query response
    }, 1500)
  }

  const exampleQueries = [
    "What was Tesla's revenue last quarter?",
    "Show me tech stocks with positive sentiment",
    "Compare Apple and Microsoft stock performance",
    "Which sectors are trending based on news?",
  ]

  return (
    <Card className="bg-card">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Ask anything about financial data..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Query"}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Try:</span>
            {exampleQueries.map((example) => (
              <Button key={example} variant="outline" size="sm" onClick={() => setQuery(example)} className="text-xs">
                {example}
              </Button>
            ))}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

