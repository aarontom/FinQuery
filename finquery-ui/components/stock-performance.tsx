"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function StockPerformance() {
  const [timeframe, setTimeframe] = useState("1M")
  const [chartType, setChartType] = useState("line")

  const chartTypes = [
    { value: "line", label: "Line" },
    { value: "candle", label: "Candlestick" },
    { value: "ohlc", label: "OHLC" },
    { value: "area", label: "Area" },
  ]

  const indicators = [
    { value: "sma", label: "SMA" },
    { value: "ema", label: "EMA" },
    { value: "bollinger", label: "Bollinger Bands" },
    { value: "rsi", label: "RSI" },
    { value: "macd", label: "MACD" },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Stock Performance</CardTitle>
        <div className="flex items-center gap-2">
          <Select defaultValue={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              {chartTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Add Indicator" />
            </SelectTrigger>
            <SelectContent>
              {indicators.map((indicator) => (
                <SelectItem key={indicator.value} value={indicator.value}>
                  {indicator.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex rounded-md border">
            {["1D", "1W", "1M", "3M", "6M", "1Y", "5Y", "MAX"].map((period) => (
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

          <div className="h-[400px] w-full">
            {/* This would be a real chart component in production */}
            <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
              <p className="text-muted-foreground">
                {chartType === "line" && "Line chart"}
                {chartType === "candle" && "Candlestick chart"}
                {chartType === "ohlc" && "OHLC chart"}
                {chartType === "area" && "Area chart"} visualization for {timeframe} timeframe would render here
              </p>
            </div>
          </div>

          <Tabs defaultValue="performance">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="volume">Volume</TabsTrigger>
              <TabsTrigger value="volatility">Volatility</TabsTrigger>
            </TabsList>
            <TabsContent value="performance" className="pt-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground">1 Day</p>
                  <p className="text-lg font-medium text-profit">+1.15%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">1 Week</p>
                  <p className="text-lg font-medium text-profit">+3.42%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">1 Month</p>
                  <p className="text-lg font-medium text-loss">-2.18%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">YTD</p>
                  <p className="text-lg font-medium text-profit">+8.76%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">1 Year</p>
                  <p className="text-lg font-medium text-profit">+15.32%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">3 Year</p>
                  <p className="text-lg font-medium text-profit">+42.87%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">5 Year</p>
                  <p className="text-lg font-medium text-profit">+187.65%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">10 Year</p>
                  <p className="text-lg font-medium text-profit">+834.21%</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="volume" className="pt-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Volume</p>
                  <p className="text-lg font-medium">58.4M</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Volume (10d)</p>
                  <p className="text-lg font-medium">62.1M</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Volume (3m)</p>
                  <p className="text-lg font-medium">65.8M</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Relative Volume</p>
                  <p className="text-lg font-medium">0.94</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="volatility" className="pt-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground">Beta</p>
                  <p className="text-lg font-medium">1.28</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ATR (14)</p>
                  <p className="text-lg font-medium">3.42</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Volatility (1m)</p>
                  <p className="text-lg font-medium">18.7%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Volatility (3m)</p>
                  <p className="text-lg font-medium">22.3%</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

