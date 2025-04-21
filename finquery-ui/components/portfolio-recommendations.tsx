import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"

export function PortfolioRecommendations() {
  const recommendations = [
    {
      type: "rebalance",
      title: "Rebalance Portfolio",
      description: "Your portfolio has drifted 8% from target allocation",
      action: "Rebalance Now",
      icon: TrendingUp,
    },
    {
      type: "diversify",
      title: "Add International Exposure",
      description: "Increase international stocks to reduce home bias",
      action: "View Suggestions",
      icon: ArrowRight,
    },
    {
      type: "tax",
      title: "Tax-Loss Harvesting",
      description: "Potential tax savings of $1,245 available",
      action: "View Opportunities",
      icon: ArrowRight,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((recommendation) => (
            <div key={recommendation.type} className="rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">{recommendation.title}</h3>
                  <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <recommendation.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-3">
                {recommendation.action}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

