import { SentimentOverview } from "@/components/sentiment-overview"
import { SentimentHeatmap } from "@/components/sentiment-heatmap"
import { SentimentTrends } from "@/components/sentiment-trends"
import { SentimentSources } from "@/components/sentiment-sources"
import { SentimentTopics } from "@/components/sentiment-topics"
import { TopSentimentStocks } from "@/components/top-sentiment-stocks"
import { SentimentNews } from "@/components/sentiment-news"

export default function SentimentAnalysisPage() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Sentiment Analysis</h1>
      <p className="text-muted-foreground">
        Track market sentiment across sectors, stocks, and time periods to identify trends and opportunities.
      </p>

      <SentimentOverview />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SentimentHeatmap />
          <SentimentTrends />
          <SentimentSources />
        </div>
        <div className="space-y-6">
          <SentimentTopics />
          <TopSentimentStocks />
          <SentimentNews />
        </div>
      </div>
    </div>
  )
}

