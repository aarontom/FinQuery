"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SentimentHeatmap() {
  const [timeframe, setTimeframe] = useState("1W")

  // Mock data for the heatmap
  const sectors = [
    "Technology",
    "Healthcare",
    "Financials",
    "Energy",
    "Consumer Staples",
    "Consumer Discretionary",
    "Industrials",
    "Materials",
    "Utilities",
    "Real Estate",
    "Communication Services",
  ]

  // Generate random sentiment scores for each sector
  const sectorData = sectors
    .map((sector) => {
      const score = Math.floor(Math.random() * 100)
      return {
        name: sector,
        score,
        color: getSentimentColor(score),
      }
    })
    .sort((a, b) => b.score - a.score)

  function getSentimentColor(score: number) {
    if (score >= 80) return "bg-profit"
    if (score >= 65) return "bg-profit/80"
    if (score >= 55) return "bg-profit/60"
    if (score >= 50) return "bg-neutral"
    if (score >= 40) return "bg-loss/60"
    if (score >= 25) return "bg-loss/80"
    return "bg-loss"
  }

  function getSentimentTextColor(score: number) {
    if (score >= 55 || score < 40) return "text-white"
    return "text-foreground"
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Sector Sentiment Heatmap</CardTitle>
        <Select defaultValue={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1D">1 Day</SelectItem>
            <SelectItem value="1W">1 Week</SelectItem>
            <SelectItem value="1M">1 Month</SelectItem>
            <SelectItem value="3M">3 Months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {sectorData.map((sector) => (
            <div
              key={sector.name}
              className={`flex flex-col items-center justify-center rounded-md p-4 ${sector.color} ${getSentimentTextColor(sector.score)}`}
            >
              <span className="text-2xl font-bold">{sector.score}</span>
              <span className="text-center text-sm mt-1">{sector.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 rounded-sm bg-loss"></div>
              <span className="text-xs">Bearish</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 rounded-sm bg-loss/60"></div>
              <span className="text-xs">Somewhat Bearish</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 rounded-sm bg-neutral"></div>
              <span className="text-xs">Neutral</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 rounded-sm bg-profit/60"></div>
              <span className="text-xs">Somewhat Bullish</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 rounded-sm bg-profit"></div>
              <span className="text-xs">Bullish</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

