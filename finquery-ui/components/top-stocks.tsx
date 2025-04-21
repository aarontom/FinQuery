import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TopStocks() {
  const topStocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: "$187.42", change: "+1.15%", isPositive: true },
    { symbol: "MSFT", name: "Microsoft Corp.", price: "$415.56", change: "+0.87%", isPositive: true },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: "$924.73", change: "+2.34%", isPositive: true },
    { symbol: "TSLA", name: "Tesla Inc.", price: "$172.63", change: "-1.42%", isPositive: false },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: "$178.32", change: "+0.63%", isPositive: true },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Stocks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topStocks.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{stock.symbol}</p>
                <p className="text-xs text-muted-foreground">{stock.name}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{stock.price}</p>
                <p
                  className={`text-xs ${stock.isPositive ? "text-profit" : "text-loss"} flex items-center justify-end`}
                >
                  {stock.isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {stock.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

