"use client"

import type React from "react"

import { useState } from "react"
import { Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function QueryInterface() {
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

  const categoryExamples = {
    stocks: [
      "What was Tesla's revenue last quarter?",
      "Compare Apple and Microsoft stock performance over the last year",
      "Show me tech stocks with the highest P/E ratio",
    ],
    financials: [
      "What is Amazon's profit margin?",
      "Show me companies with the highest revenue growth in the tech sector",
      "Compare quarterly earnings for top 5 banks",
    ],
    market: [
      "Which sectors are trending based on news sentiment?",
      "Show me the correlation between oil prices and energy stocks",
      "What's the market outlook for renewable energy companies?",
    ],
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Ask anything about financial data..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-32 resize-none pr-12"
            />
            <Button type="submit" size="icon" className="absolute bottom-3 right-3" disabled={isLoading}>
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              <span className="sr-only">Search</span>
            </Button>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
              <Sparkles className="h-4 w-4" />
              <span>Example queries</span>
            </div>

            <Tabs defaultValue="stocks">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
                <TabsTrigger value="market">Market</TabsTrigger>
              </TabsList>
              {Object.entries(categoryExamples).map(([category, examples]) => (
                <TabsContent key={category} value={category} className="pt-3">
                  <div className="flex flex-col gap-2">
                    {examples.map((example) => (
                      <Button
                        key={example}
                        variant="outline"
                        size="sm"
                        onClick={() => setQuery(example)}
                        className="justify-start text-left h-auto py-2"
                      >
                        {example}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

