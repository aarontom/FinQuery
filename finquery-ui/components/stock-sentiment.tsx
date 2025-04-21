"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function StockSentiment() {
  const sentimentData = {
    overall: 72,
    breakdown: {
      news: 68,
      social: 74,
      analyst: 76,
    },
    trends: [
      { date: "1 Week", value: 70 },
      { date: "1 Month", value: 65 },
      { date: "3 Months", value: 72 },
    ],
    keywords: [
      { word: "Innovation", sentiment: "positive" },
      { word: "Growth", sentiment: "positive" },
      { word: "Competition", sentiment: "neutral" },
      { word: "Regulation", sentiment: "negative" },
      { word: "AI", sentiment: "positive" },
    ],
  }

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 70) return "bg-profit"
    if (sentiment >= 50) return "bg-neutral"
    return "bg-loss"
  }

  const getKeywordColor = (sentiment: string) => {
    if (sentiment === "positive") return "bg-profit/20 text-profit"
    if (sentiment === "neutral") return "bg-neutral/20 text-neutral"
    return "bg-loss/20 text-loss"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Sentiment</span>
              <span
                className={`text-sm font-medium ${sentimentData.overall >= 70 ? "text-profit" : sentimentData.overall >= 50 ? "text-neutral" : "text-loss"}`}
              >
                {sentimentData.overall}/100
              </span>
            </div>
            <Progress
              value={sentimentData.overall}
              className="h-2 w-full bg-muted"
              indicatorClassName={getSentimentColor(sentimentData.overall)}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Bearish</span>
              <span>Neutral</span>
              <span>Bullish</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Sentiment Breakdown</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">News Sentiment</span>
                <span className="text-xs font-medium">{sentimentData.breakdown.news}/100</span>
              </div>
              <Progress
                value={sentimentData.breakdown.news}
                className="h-1.5 w-full bg-muted"
                indicatorClassName={getSentimentColor(sentimentData.breakdown.news)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">Social Media Sentiment</span>
                <span className="text-xs font-medium">{sentimentData.breakdown.social}/100</span>
              </div>
              <Progress
                value={sentimentData.breakdown.social}
                className="h-1.5 w-full bg-muted"
                indicatorClassName={getSentimentColor(sentimentData.breakdown.social)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">Analyst Sentiment</span>
                <span className="text-xs font-medium">{sentimentData.breakdown.analyst}/100</span>
              </div>
              <Progress
                value={sentimentData.breakdown.analyst}
                className="h-1.5 w-full bg-muted"
                indicatorClassName={getSentimentColor(sentimentData.breakdown.analyst)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Sentiment Trend</h3>
            <div className="grid grid-cols-3 gap-2">
              {sentimentData.trends.map((trend) => (
                <div key={trend.date} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">{trend.date}</span>
                    <span className="text-xs font-medium">{trend.value}/100</span>
                  </div>
                  <Progress
                    value={trend.value}
                    className="h-1.5 w-full bg-muted"
                    indicatorClassName={getSentimentColor(trend.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Key Topics</h3>
            <div className="flex flex-wrap gap-2">
              {sentimentData.keywords.map((keyword) => (
                <span
                  key={keyword.word}
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getKeywordColor(keyword.sentiment)}`}
                >
                  {keyword.word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

