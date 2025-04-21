"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PortfolioPerformance() {
  const [timeframe, setTimeframe] = useState("1Y")
  const [benchmark, setBenchmark] = useState("sp500")

  const benchmarks = [
    { value: "sp500", label: "S&P 500" },
    { value: "nasdaq", label: "NASDAQ" },
    { value: "djia", label: "Dow Jones" },
  ]

  const performanceData = {
    portfolio: {
      "1M": "+2.4%",
      "3M": "+5.8%",
      "6M": "+8.3%",
      "1Y": "+15.7%",
      "3Y": "+42.3%",
      "5Y": "+87.6%",
      MAX: "+124.5%",
    },
    benchmark: {
      "1M": "+1.8%",
      "3M": "+4.2%",
      "6M": "+7.1%",
      "1Y": "+12.4%",
      "3Y": "+38.6%",
      "5Y": "+72.3%",
      MAX: "+98.7%",
    },
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Performance</CardTitle>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border">
            {benchmarks.map((item) => (
              <Button
                key={item.value}
                variant={benchmark === item.value ? "secondary" : "ghost"}
                size="sm"
                className="rounded-none text-xs"
                onClick={() => setBenchmark(item.value)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex rounded-md border">
            {["1M", "3M", "6M", "1Y", "3Y", "5Y", "MAX"].map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? "secondary" : "ghost"}
                size="sm"
                className="rounded-none"
                onClick={() => setTimeframe(period)}
              >
                {period}
              </Button>
            ))}
          </div>

          <div className="h-[350px] w-full">
            {/* This would be a real chart component in production */}
            <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
              <p className="text-muted-foreground">
                Portfolio performance chart for {timeframe} timeframe compared to{" "}
                {benchmarks.find((b) => b.value === benchmark)?.label} would render here
              </p>
            </div>
          </div>

          <Tabs defaultValue="returns">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="risk">Risk</TabsTrigger>
              <TabsTrigger value="drawdown">Drawdown</TabsTrigger>
            </TabsList>

            <TabsContent value="returns" className="pt-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Portfolio ({timeframe})</p>
                  <p className="text-lg font-medium text-profit">
                    {performanceData.portfolio[timeframe as keyof typeof performanceData.portfolio]}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {benchmarks.find((b) => b.value === benchmark)?.label} ({timeframe})
                  </p>
                  <p className="text-lg font-medium text-profit">
                    {performanceData.benchmark[timeframe as keyof typeof performanceData.benchmark]}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Alpha</p>
                  <p className="text-lg font-medium text-profit">+3.3%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                  <p className="text-lg font-medium">1.24</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="risk" className="pt-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Volatility</p>
                  <p className="text-lg font-medium">14.2%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Beta</p>
                  <p className="text-lg font-medium">0.92</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">R-Squared</p>
                  <p className="text-lg font-medium">0.87</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Sortino Ratio</p>
                  <p className="text-lg font-medium">1.38</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="drawdown" className="pt-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Max Drawdown</p>
                  <p className="text-lg font-medium text-loss">-18.4%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Recovery Time</p>
                  <p className="text-lg font-medium">142 days</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Current Drawdown</p>
                  <p className="text-lg font-medium text-loss">-3.2%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Avg. Drawdown</p>
                  <p className="text-lg font-medium text-loss">-8.7%</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

