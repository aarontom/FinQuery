import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TopSentimentStocks() {
  const topStocks = {
    positive: [
      { symbol: "NVDA", name: "NVIDIA Corp.", sentiment: 85, change: "+7", isPositive: true },
      { symbol: "MSFT", name: "Microsoft Corp.", sentiment: 78, change: "+5", isPositive: true },
      { symbol: "AAPL", name: "Apple Inc.", sentiment: 76, change: "+3", isPositive: true },
      { symbol: "AMZN", name: "Amazon.com Inc.", sentiment: 74, change: "+4", isPositive: true },
      { symbol: "GOOGL", name: "Alphabet Inc.", sentiment: 72, change: "+2", isPositive: true },
    ],
    negative: [
      { symbol: "XOM", name: "Exxon Mobil Corp.", sentiment: 32, change: "-8", isPositive: false },
      { symbol: "WFC", name: "Wells Fargo & Co.", sentiment: 35, change: "-6", isPositive: false },
      { symbol: "CVX", name: "Chevron Corp.", sentiment: 38, change: "-5", isPositive: false },
      { symbol: "PFE", name: "Pfizer Inc.", sentiment: 42, change: "-4", isPositive: false },
      { symbol: "T", name: "AT&T Inc.", sentiment: 45, change: "-3", isPositive: false },
    ],
    trending: [
      { symbol: "AMD", name: "Advanced Micro Devices", sentiment: 68, change: "+12", isPositive: true },
      { symbol: "TSLA", name: "Tesla Inc.", sentiment: 62, change: "+9", isPositive: true },
      { symbol: "META", name: "Meta Platforms Inc.", sentiment: 70, change: "+8", isPositive: true },
      { symbol: "DIS", name: "Walt Disney Co.", sentiment: 64, change: "+7", isPositive: true },
      { symbol: "NFLX", name: "Netflix Inc.", sentiment: 66, change: "+6", isPositive: true },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Sentiment Stocks</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="positive">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="positive">Bullish</TabsTrigger>
            <TabsTrigger value="negative">Bearish</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="positive" className="pt-4">
            <div className="space-y-4">
              {topStocks.positive.map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{stock.symbol}</p>
                    <p className="text-xs text-muted-foreground">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{stock.sentiment}</p>
                    <p
                      className={`text-xs flex items-center justify-end ${stock.isPositive ? "text-profit" : "text-loss"}`}
                    >
                      {stock.isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      {stock.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="negative" className="pt-4">
            <div className="space-y-4">
              {topStocks.negative.map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{stock.symbol}</p>
                    <p className="text-xs text-muted-foreground">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{stock.sentiment}</p>
                    <p
                      className={`text-xs flex items-center justify-end ${stock.isPositive ? "text-profit" : "text-loss"}`}
                    >
                      {stock.isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      {stock.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="pt-4">
            <div className="space-y-4">
              {topStocks.trending.map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{stock.symbol}</p>
                    <p className="text-xs text-muted-foreground">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{stock.sentiment}</p>
                    <p
                      className={`text-xs flex items-center justify-end ${stock.isPositive ? "text-profit" : "text-loss"}`}
                    >
                      {stock.isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      {stock.change}
                    </p>
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

