"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Bell, ChevronDown, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export function StockHeader() {
  const [isWatchlisted, setIsWatchlisted] = useState(false)
  const [isAlertSet, setIsAlertSet] = useState(false)

  // Mock stock data
  const stockData = {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 187.42,
    change: 2.14,
    changePercent: 1.15,
    isPositive: true,
    exchange: "NASDAQ",
    marketCap: "2.94T",
    volume: "58.4M",
    avgVolume: "62.1M",
    open: 185.28,
    previousClose: 185.28,
    dayRange: "185.19 - 188.04",
    yearRange: "124.17 - 199.62",
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{stockData.symbol}</h2>
              <span className="text-muted-foreground">{stockData.name}</span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{stockData.exchange}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">${stockData.price.toFixed(2)}</span>
              <div className={`flex items-center ${stockData.isPositive ? "text-profit" : "text-loss"}`}>
                {stockData.isPositive ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
                <span className="font-medium">
                  {stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Input placeholder="Search stocks..." className="w-full md:w-auto" />
            </div>

            <Button
              variant={isWatchlisted ? "default" : "outline"}
              size="icon"
              onClick={() => setIsWatchlisted(!isWatchlisted)}
              title={isWatchlisted ? "Remove from watchlist" : "Add to watchlist"}
            >
              <Star className={`h-4 w-4 ${isWatchlisted ? "fill-primary-foreground" : ""}`} />
            </Button>

            <Button
              variant={isAlertSet ? "default" : "outline"}
              size="icon"
              onClick={() => setIsAlertSet(!isAlertSet)}
              title={isAlertSet ? "Remove alert" : "Set price alert"}
            >
              <Bell className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Actions
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Financials</DropdownMenuItem>
                <DropdownMenuItem>Download Data</DropdownMenuItem>
                <DropdownMenuItem>Share Analysis</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
          <div>
            <p className="text-sm text-muted-foreground">Market Cap</p>
            <p className="font-medium">{stockData.marketCap}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Volume</p>
            <p className="font-medium">{stockData.volume}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Avg. Volume</p>
            <p className="font-medium">{stockData.avgVolume}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Open</p>
            <p className="font-medium">${stockData.open.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Previous Close</p>
            <p className="font-medium">${stockData.previousClose.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Day Range</p>
            <p className="font-medium">{stockData.dayRange}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">52-Week Range</p>
            <p className="font-medium">{stockData.yearRange}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

