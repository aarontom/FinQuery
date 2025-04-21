import { QueryInput } from "@/components/query-input"
import { MarketOverview } from "@/components/market-overview"
import { StockChart } from "@/components/stock-chart"
import { SentimentAnalysis } from "@/components/sentiment-analysis"
import { RecentQueries } from "@/components/recent-queries"
import { TopStocks } from "@/components/top-stocks"
import { NewsHeadlines } from "@/components/news-headlines"

export default function Dashboard() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Financial Dashboard</h1>

      <QueryInput />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <MarketOverview />
          <StockChart />
          <SentimentAnalysis />
        </div>
        <div className="space-y-6">
          <RecentQueries />
          <TopStocks />
          <NewsHeadlines />
        </div>
      </div>
    </div>
  )
}

