"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SentimentAnalysis() {
  const sentimentData = {
    stocks: [
      { name: "AAPL", sentiment: 78, change: "+5", trend: "Positive" },
      { name: "MSFT", sentiment: 82, change: "+3", trend: "Positive" },
      { name: "GOOGL", sentiment: 65, change: "-8", trend: "Neutral" },
      { name: "AMZN", sentiment: 71, change: "+2", trend: "Positive" },
      { name: "TSLA", sentiment: 45, change: "-12", trend: "Negative" },
    ],
    sectors: [
      { name: "Technology", sentiment: 72, change: "+4", trend: "Positive" },
      { name: "Healthcare", sentiment: 68, change: "+1", trend: "Neutral" },
      { name: "Financials", sentiment: 51, change: "-3", trend: "Neutral" },
      { name: "Energy", sentiment: 42, change: "-7", trend: "Negative" },
      { name: "Consumer", sentiment: 63, change: "+2", trend: "Neutral" },
    ],
  }

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 70) return "bg-profit"
    if (sentiment >= 50) return "bg-neutral"
    return "bg-loss"
  }

  const getChangeColor = (change: string) => {
    return change.startsWith("+") ? "text-profit" : "text-loss"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stocks">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="sectors">Sectors</TabsTrigger>
          </TabsList>
          <TabsContent value="stocks" className="pt-4">
            <div className="space-y-4">
              {sentimentData.stocks.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-16 font-medium">{item.name}</div>
                    <div className="w-full max-w-64">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className={`h-2 rounded-full ${getSentimentColor(item.sentiment)}`}
                          style={{ width: `${item.sentiment}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-8 text-right font-medium">{item.sentiment}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`text-sm font-medium ${getChangeColor(item.change)}`}>{item.change}</div>
                    <div className="w-20 text-right text-sm">{item.trend}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="sectors" className="pt-4">
            <div className="space-y-4">
              {sentimentData.sectors.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-24 font-medium">{item.name}</div>
                    <div className="w-full max-w-64">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className={`h-2 rounded-full ${getSentimentColor(item.sentiment)}`}
                          style={{ width: `${item.sentiment}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-8 text-right font-medium">{item.sentiment}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`text-sm font-medium ${getChangeColor(item.change)}`}>{item.change}</div>
                    <div className="w-20 text-right text-sm">{item.trend}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

