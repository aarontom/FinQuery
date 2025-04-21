import { PortfolioOverview } from "@/components/portfolio-overview"
import { PortfolioAllocation } from "@/components/portfolio-allocation"
import { PortfolioPerformance } from "@/components/portfolio-performance"
import { PortfolioPositions } from "@/components/portfolio-positions"
import { PortfolioDiversification } from "@/components/portfolio-diversification"
import { PortfolioTransactions } from "@/components/portfolio-transactions"
import { PortfolioRecommendations } from "@/components/portfolio-recommendations"

export default function PortfolioPage() {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-3xl font-bold">Portfolio</h1>
      <p className="text-muted-foreground">
        Track and analyze your investments, monitor performance, and optimize your portfolio.
      </p>

      <PortfolioOverview />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PortfolioPerformance />
          <PortfolioPositions />
          <PortfolioTransactions />
        </div>
        <div className="space-y-6">
          <PortfolioAllocation />
          <PortfolioDiversification />
          <PortfolioRecommendations />
        </div>
      </div>
    </div>
  )
}

