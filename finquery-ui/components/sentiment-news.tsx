import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SentimentNews() {
  const newsItems = [
    {
      title: "Fed signals potential rate cuts later this year",
      source: "Financial Times",
      time: "2 hours ago",
      sentiment: "positive",
    },
    {
      title: "Tech stocks rally as inflation concerns ease",
      source: "Wall Street Journal",
      time: "4 hours ago",
      sentiment: "positive",
    },
    {
      title: "Oil prices drop amid global demand concerns",
      source: "Bloomberg",
      time: "Yesterday",
      sentiment: "negative",
    },
    {
      title: "Retail sales data shows consumer spending remains strong",
      source: "CNBC",
      time: "Yesterday",
      sentiment: "positive",
    },
    {
      title: "Manufacturing sector shows mixed signals in latest report",
      source: "Reuters",
      time: "2 days ago",
      sentiment: "neutral",
    },
  ]

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === "positive") return "bg-profit text-profit-foreground"
    if (sentiment === "neutral") return "bg-neutral text-neutral-foreground"
    return "bg-loss text-loss-foreground"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsItems.map((news, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium leading-tight">{news.title}</h3>
                <Badge variant="outline" className={`shrink-0 ${getSentimentColor(news.sentiment)}`}>
                  {news.sentiment}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{news.source}</span>
                <span>{news.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

