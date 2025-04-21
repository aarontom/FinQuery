import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StockRecommendations() {
  const recommendations = [
    {
      firm: "Morgan Stanley",
      rating: "Overweight",
      priceTarget: "$220",
      date: "May 15, 2023",
    },
    {
      firm: "Goldman Sachs",
      rating: "Buy",
      priceTarget: "$223",
      date: "May 2, 2023",
    },
    {
      firm: "JP Morgan",
      rating: "Overweight",
      priceTarget: "$210",
      date: "Apr 28, 2023",
    },
    {
      firm: "Bank of America",
      rating: "Buy",
      priceTarget: "$225",
      date: "Apr 25, 2023",
    },
    {
      firm: "Citigroup",
      rating: "Hold",
      priceTarget: "$190",
      date: "Apr 20, 2023",
    },
  ]

  const getRatingColor = (rating: string) => {
    if (rating === "Buy" || rating === "Overweight" || rating === "Strong Buy") return "text-profit"
    if (rating === "Hold" || rating === "Neutral") return "text-neutral"
    return "text-loss"
  }

  const summary = {
    buy: 18,
    hold: 7,
    sell: 2,
    averageTarget: "$215.50",
    highTarget: "$250.00",
    lowTarget: "$175.00",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyst Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-profit/20 text-profit">
                {summary.buy}
              </div>
              <div className="text-xs">
                <p className="font-medium">Buy</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral/20 text-neutral">
                {summary.hold}
              </div>
              <div className="text-xs">
                <p className="font-medium">Hold</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-loss/20 text-loss">
                {summary.sell}
              </div>
              <div className="text-xs">
                <p className="font-medium">Sell</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Average Target</p>
              <p className="font-medium">{summary.averageTarget}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">High Target</p>
              <p className="font-medium">{summary.highTarget}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Low Target</p>
              <p className="font-medium">{summary.lowTarget}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Upside</p>
              <p className="font-medium text-profit">+14.98%</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Recent Ratings</h3>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{rec.firm}</p>
                    <p className="text-xs text-muted-foreground">{rec.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${getRatingColor(rec.rating)}`}>{rec.rating}</p>
                    <p className="text-xs">{rec.priceTarget}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

