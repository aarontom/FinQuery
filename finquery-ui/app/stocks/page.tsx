import { StockHeader } from "@/components/stock-header"
import { StockPerformance } from "@/components/stock-performance"
import { StockComparison } from "@/components/stock-comparison"
import { StockFundamentals } from "@/components/stock-fundamentals"
import { StockSentiment } from "@/components/stock-sentiment"
import { StockNews } from "@/components/stock-news"
import { StockRecommendations } from "@/components/stock-recommendations"

export default function StockAnalysisPage() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Stock Analysis</h1>

      <StockHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StockPerformance />
          <StockComparison />
          <StockFundamentals />
        </div>
        <div className="space-y-6">
          <StockSentiment />
          <StockNews />
          <StockRecommendations />
        </div>
      </div>
    </div>
  )
}

