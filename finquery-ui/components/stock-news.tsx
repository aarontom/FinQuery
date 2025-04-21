import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function StockNews() {
  const newsItems = [
    {
      title: "Apple's AI strategy takes shape with new features coming to iPhone",
      source: "CNBC",
      time: "2 hours ago",
      sentiment: "positive",
    },
    {
      title: "Apple supplier reports strong earnings, signals robust iPhone demand",
      source: "Bloomberg",
      time: "5 hours ago",
      sentiment: "positive",
    },
    {
      title: "Tech giants face new regulatory challenges in EU markets",
      source: "Financial Times",
      time: "Yesterday",
      sentiment: "negative",
    },
    {
      title: "Apple's services revenue hits all-time high in latest quarter",
      source: "Wall Street Journal",
      time: "Yesterday",
      sentiment: "positive",
    },
    {
      title: "Analysts divided on Apple's growth prospects amid market saturation",
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
        <CardTitle>Recent News</CardTitle>
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

