"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SentimentTrends() {
  const [timeframe, setTimeframe] = useState("3M")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Sentiment Trends</CardTitle>
        <Select defaultValue={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1M">1 Month</SelectItem>
            <SelectItem value="3M">3 Months</SelectItem>
            <SelectItem value="6M">6 Months</SelectItem>
            <SelectItem value="1Y">1 Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="market">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="sectors">Sectors</TabsTrigger>
            <TabsTrigger value="stocks">Top Stocks</TabsTrigger>
          </TabsList>

          <TabsContent value="market" className="pt-4">
            <div className="h-[300px] w-full">
              {/* This would be a real chart component in production */}
              <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                <p className="text-muted-foreground">Market sentiment trend chart for {timeframe} would render here</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Current</p>
                <p className="text-lg font-medium">62</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Average</p>
                <p className="text-lg font-medium">58</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Change</p>
                <p className="text-lg font-medium text-profit">+4</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sectors" className="pt-4">
            <div className="h-[300px] w-full">
              {/* This would be a real chart component in production */}
              <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                <p className="text-muted-foreground">Sector sentiment trend chart for {timeframe} would render here</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Most Improved</p>
                <p className="text-lg font-medium">Technology (+8)</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Most Declined</p>
                <p className="text-lg font-medium">Energy (-6)</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stocks" className="pt-4">
            <div className="h-[300px] w-full">
              {/* This would be a real chart component in production */}
              <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                <p className="text-muted-foreground">
                  Top stocks sentiment trend chart for {timeframe} would render here
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Most Positive</p>
                <p className="text-lg font-medium">NVDA (85)</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Most Negative</p>
                <p className="text-lg font-medium">XOM (32)</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

