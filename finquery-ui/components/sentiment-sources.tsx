"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SentimentSources() {
  const sentimentSources = {
    news: [
      { source: "Financial News", sentiment: 68, articles: 245 },
      { source: "Market Watch", sentiment: 72, articles: 187 },
      { source: "Bloomberg", sentiment: 65, articles: 156 },
      { source: "CNBC", sentiment: 58, articles: 134 },
      { source: "Wall Street Journal", sentiment: 62, articles: 112 },
    ],
    social: [
      { source: "Twitter/X", sentiment: 64, posts: 12500 },
      { source: "Reddit", sentiment: 70, posts: 8700 },
      { source: "StockTwits", sentiment: 75, posts: 6200 },
      { source: "LinkedIn", sentiment: 68, posts: 3400 },
      { source: "YouTube", sentiment: 62, posts: 1800 },
    ],
    analysts: [
      { source: "Goldman Sachs", sentiment: 72, reports: 45 },
      { source: "Morgan Stanley", sentiment: 68, reports: 42 },
      { source: "JP Morgan", sentiment: 65, reports: 38 },
      { source: "Bank of America", sentiment: 70, reports: 36 },
      { source: "Citigroup", sentiment: 62, reports: 32 },
    ],
  }

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 70) return "bg-profit"
    if (sentiment >= 50) return "bg-neutral"
    return "bg-loss"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="news">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="analysts">Analysts</TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="pt-4">
            <div className="space-y-4">
              {sentimentSources.news.map((source) => (
                <div key={source.source} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{source.source}</span>
                      <span className="text-xs text-muted-foreground">({source.articles} articles)</span>
                    </div>
                    <span className="text-sm font-medium">{source.sentiment}</span>
                  </div>
                  <Progress
                    value={source.sentiment}
                    className="h-2 w-full bg-muted"
                    indicatorClassName={getSentimentColor(source.sentiment)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="social" className="pt-4">
            <div className="space-y-4">
              {sentimentSources.social.map((source) => (
                <div key={source.source} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{source.source}</span>
                      <span className="text-xs text-muted-foreground">({source.posts.toLocaleString()} posts)</span>
                    </div>
                    <span className="text-sm font-medium">{source.sentiment}</span>
                  </div>
                  <Progress
                    value={source.sentiment}
                    className="h-2 w-full bg-muted"
                    indicatorClassName={getSentimentColor(source.sentiment)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysts" className="pt-4">
            <div className="space-y-4">
              {sentimentSources.analysts.map((source) => (
                <div key={source.source} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{source.source}</span>
                      <span className="text-xs text-muted-foreground">({source.reports} reports)</span>
                    </div>
                    <span className="text-sm font-medium">{source.sentiment}</span>
                  </div>
                  <Progress
                    value={source.sentiment}
                    className="h-2 w-full bg-muted"
                    indicatorClassName={getSentimentColor(source.sentiment)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

