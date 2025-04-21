import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function PortfolioDiversification() {
  const diversificationData = {
    score: 78,
    metrics: [
      { name: "Asset Class", score: 82, description: "Well diversified across asset classes" },
      { name: "Sector", score: 75, description: "Moderate tech concentration" },
      { name: "Geography", score: 68, description: "US market overweight" },
      { name: "Size", score: 85, description: "Good mix of large, mid, and small cap" },
      { name: "Risk", score: 72, description: "Moderate volatility profile" },
    ],
  }

  const getDiversificationColor = (score: number) => {
    if (score >= 80) return "bg-profit"
    if (score >= 60) return "bg-neutral"
    return "bg-loss"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Diversification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-muted">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full ${
                  diversificationData.score >= 80
                    ? "bg-profit/20"
                    : diversificationData.score >= 60
                      ? "bg-neutral/20"
                      : "bg-loss/20"
                }`}
              >
                <span className="text-2xl font-bold">{diversificationData.score}</span>
              </div>
            </div>
            <span className="mt-2 text-sm font-medium">
              {diversificationData.score >= 80
                ? "Well Diversified"
                : diversificationData.score >= 60
                  ? "Moderately Diversified"
                  : "Poorly Diversified"}
            </span>
          </div>

          <div className="space-y-3">
            {diversificationData.metrics.map((metric) => (
              <div key={metric.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <span className="text-sm font-medium">{metric.score}</span>
                </div>
                <Progress
                  value={metric.score}
                  className="h-2 w-full bg-muted"
                  indicatorClassName={getDiversificationColor(metric.score)}
                />
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

