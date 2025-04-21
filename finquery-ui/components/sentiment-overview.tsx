"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from "lucide-react"

export function SentimentOverview() {
  const marketSentiment = {
    overall: 62,
    change: +3,
    sectors: [
      { name: "Technology", value: 68, change: +5, isPositive: true },
      { name: "Healthcare", value: 64, change: +2, isPositive: true },
      { name: "Financials", value: 58, change: -2, isPositive: false },
      { name: "Energy", value: 45, change: -4, isPositive: false },
      { name: "Consumer", value: 72, change: +6, isPositive: true },
    ],
    timeframes: {
      daily: { value: 62, change: +3, isPositive: true },
      weekly: { value: 59, change: -1, isPositive: false },
      monthly: { value: 60, change: +2, isPositive: true },
    },
  }

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 70) return "bg-profit"
    if (sentiment >= 50) return "bg-neutral"
    return "bg-loss"
  }

  const getSentimentText = (sentiment: number) => {
    if (sentiment >= 70) return "Bullish"
    if (sentiment >= 50) return "Neutral"
    return "Bearish"
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Market Sentiment</h3>
                <div className="flex items-center gap-1">
                  {marketSentiment.change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-profit" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-loss" />
                  )}
                  <span className={marketSentiment.change > 0 ? "text-profit" : "text-loss"}>
                    {marketSentiment.change > 0 ? "+" : ""}
                    {marketSentiment.change}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-8 border-muted">
                  <div
                    className={`flex h-24 w-24 items-center justify-center rounded-full ${
                      marketSentiment.overall >= 70
                        ? "bg-profit/20"
                        : marketSentiment.overall >= 50
                          ? "bg-neutral/20"
                          : "bg-loss/20"
                    }`}
                  >
                    <span className="text-3xl font-bold">{marketSentiment.overall}</span>
                  </div>
                </div>
                <span className="mt-2 text-lg font-medium">{getSentimentText(marketSentiment.overall)}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="sectors">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sectors">Sectors</TabsTrigger>
                <TabsTrigger value="timeframes">Timeframes</TabsTrigger>
              </TabsList>

              <TabsContent value="sectors" className="pt-4">
                <div className="space-y-4">
                  {marketSentiment.sectors.map((sector) => (
                    <div key={sector.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{sector.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{sector.value}</span>
                          <span
                            className={`flex items-center text-xs ${sector.isPositive ? "text-profit" : "text-loss"}`}
                          >
                            {sector.isPositive ? (
                              <ArrowUp className="h-3 w-3 mr-0.5" />
                            ) : (
                              <ArrowDown className="h-3 w-3 mr-0.5" />
                            )}
                            {Math.abs(sector.change)}
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={sector.value}
                        className="h-2 w-full bg-muted"
                        indicatorClassName={getSentimentColor(sector.value)}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="timeframes" className="pt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Daily</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{marketSentiment.timeframes.daily.value}</span>
                        <span
                          className={`flex items-center text-xs ${marketSentiment.timeframes.daily.isPositive ? "text-profit" : "text-loss"}`}
                        >
                          {marketSentiment.timeframes.daily.isPositive ? (
                            <ArrowUp className="h-3 w-3 mr-0.5" />
                          ) : (
                            <ArrowDown className="h-3 w-3 mr-0.5" />
                          )}
                          {Math.abs(marketSentiment.timeframes.daily.change)}
                        </span>
                      </div>
                    </div>
                    <div className="flex h-24 w-full items-center justify-center rounded-md bg-muted">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-full ${
                          marketSentiment.timeframes.daily.value >= 70
                            ? "bg-profit/20"
                            : marketSentiment.timeframes.daily.value >= 50
                              ? "bg-neutral/20"
                              : "bg-loss/20"
                        }`}
                      >
                        <span className="text-xl font-bold">{marketSentiment.timeframes.daily.value}</span>
                      </div>
                    </div>
                    <div className="text-center text-sm">
                      {getSentimentText(marketSentiment.timeframes.daily.value)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Weekly</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{marketSentiment.timeframes.weekly.value}</span>
                        <span
                          className={`flex items-center text-xs ${marketSentiment.timeframes.weekly.isPositive ? "text-profit" : "text-loss"}`}
                        >
                          {marketSentiment.timeframes.weekly.isPositive ? (
                            <ArrowUp className="h-3 w-3 mr-0.5" />
                          ) : (
                            <ArrowDown className="h-3 w-3 mr-0.5" />
                          )}
                          {Math.abs(marketSentiment.timeframes.weekly.change)}
                        </span>
                      </div>
                    </div>
                    <div className="flex h-24 w-full items-center justify-center rounded-md bg-muted">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-full ${
                          marketSentiment.timeframes.weekly.value >= 70
                            ? "bg-profit/20"
                            : marketSentiment.timeframes.weekly.value >= 50
                              ? "bg-neutral/20"
                              : "bg-loss/20"
                        }`}
                      >
                        <span className="text-xl font-bold">{marketSentiment.timeframes.weekly.value}</span>
                      </div>
                    </div>
                    <div className="text-center text-sm">
                      {getSentimentText(marketSentiment.timeframes.weekly.value)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Monthly</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{marketSentiment.timeframes.monthly.value}</span>
                        <span
                          className={`flex items-center text-xs ${marketSentiment.timeframes.monthly.isPositive ? "text-profit" : "text-loss"}`}
                        >
                          {marketSentiment.timeframes.monthly.isPositive ? (
                            <ArrowUp className="h-3 w-3 mr-0.5" />
                          ) : (
                            <ArrowDown className="h-3 w-3 mr-0.5" />
                          )}
                          {Math.abs(marketSentiment.timeframes.monthly.change)}
                        </span>
                      </div>
                    </div>
                    <div className="flex h-24 w-full items-center justify-center rounded-md bg-muted">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-full ${
                          marketSentiment.timeframes.monthly.value >= 70
                            ? "bg-profit/20"
                            : marketSentiment.timeframes.monthly.value >= 50
                              ? "bg-neutral/20"
                              : "bg-loss/20"
                        }`}
                      >
                        <span className="text-xl font-bold">{marketSentiment.timeframes.monthly.value}</span>
                      </div>
                    </div>
                    <div className="text-center text-sm">
                      {getSentimentText(marketSentiment.timeframes.monthly.value)}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

