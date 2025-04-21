import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function NewsHeadlines() {
  const newsHeadlines = [
    {
      title: "Fed signals potential rate cuts later this year",
      source: "Financial Times",
      timestamp: "2 hours ago",
    },
    {
      title: "Tech stocks rally as inflation concerns ease",
      source: "Wall Street Journal",
      timestamp: "4 hours ago",
    },
    {
      title: "NVIDIA announces new AI chip, stock surges",
      source: "CNBC",
      timestamp: "Yesterday",
    },
    {
      title: "Oil prices drop amid global demand concerns",
      source: "Bloomberg",
      timestamp: "Yesterday",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>News Headlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsHeadlines.map((news, index) => (
            <div key={index} className="space-y-1">
              <p className="font-medium">{news.title}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{news.source}</span>
                <span>{news.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

