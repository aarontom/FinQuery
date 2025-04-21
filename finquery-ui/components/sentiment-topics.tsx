import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SentimentTopics() {
  const topics = [
    { name: "Artificial Intelligence", sentiment: "positive", weight: 85 },
    { name: "Interest Rates", sentiment: "negative", weight: 78 },
    { name: "Earnings Season", sentiment: "positive", weight: 72 },
    { name: "Inflation", sentiment: "negative", weight: 68 },
    { name: "Tech Layoffs", sentiment: "negative", weight: 65 },
    { name: "Semiconductor Demand", sentiment: "positive", weight: 62 },
    { name: "Consumer Spending", sentiment: "neutral", weight: 58 },
    { name: "Energy Prices", sentiment: "neutral", weight: 55 },
    { name: "Supply Chain", sentiment: "positive", weight: 52 },
    { name: "Regulatory Changes", sentiment: "negative", weight: 48 },
  ]

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === "positive") return "bg-profit/20 text-profit border-profit/30"
    if (sentiment === "neutral") return "bg-neutral/20 text-neutral border-neutral/30"
    return "bg-loss/20 text-loss border-loss/30"
  }

  const getTopicSize = (weight: number) => {
    if (weight >= 80) return "text-lg font-medium"
    if (weight >= 70) return "text-base font-medium"
    if (weight >= 60) return "text-sm"
    return "text-xs"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <div
              key={topic.name}
              className={`rounded-full border px-3 py-1 ${getSentimentColor(topic.sentiment)} ${getTopicSize(topic.weight)}`}
            >
              {topic.name}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

