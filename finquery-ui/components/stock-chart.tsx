"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function StockChart() {
  const [timeframe, setTimeframe] = useState("1M")

  // Mock data for chart
  const chartData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "AAPL",
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 150),
      },
    ],
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Stock Performance</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">$187.42</span>
            <span className="text-sm font-medium text-profit">+2.14 (1.15%)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="AAPL">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AAPL">Apple (AAPL)</SelectItem>
              <SelectItem value="MSFT">Microsoft (MSFT)</SelectItem>
              <SelectItem value="GOOGL">Google (GOOGL)</SelectItem>
              <SelectItem value="AMZN">Amazon (AMZN)</SelectItem>
              <SelectItem value="TSLA">Tesla (TSLA)</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex rounded-md border">
            {["1D", "1W", "1M", "3M", "1Y", "5Y"].map((period) => (
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {/* This would be a real chart component in production */}
          <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">Stock chart visualization would render here</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

