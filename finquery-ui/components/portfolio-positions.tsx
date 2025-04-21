"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export function PortfolioPositions() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock positions data
  const positions = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      shares: 45,
      avgCost: 142.32,
      currentPrice: 187.42,
      marketValue: 8433.9,
      dayChange: { value: 1.15, isPositive: true },
      totalReturn: { value: 45.1, percent: 31.69, isPositive: true },
      weight: 12.5,
      type: "stock",
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      shares: 20,
      avgCost: 287.65,
      currentPrice: 415.56,
      marketValue: 8311.2,
      dayChange: { value: 0.87, isPositive: true },
      totalReturn: { value: 127.91, percent: 44.47, isPositive: true },
      weight: 12.3,
      type: "stock",
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      shares: 35,
      avgCost: 135.42,
      currentPrice: 178.32,
      marketValue: 6241.2,
      dayChange: { value: 0.63, isPositive: true },
      totalReturn: { value: 42.9, percent: 31.68, isPositive: true },
      weight: 9.2,
      type: "stock",
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      shares: 30,
      avgCost: 125.87,
      currentPrice: 152.19,
      marketValue: 4565.7,
      dayChange: { value: 0.42, isPositive: true },
      totalReturn: { value: 26.32, percent: 20.91, isPositive: true },
      weight: 6.8,
      type: "stock",
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      shares: 25,
      avgCost: 195.32,
      currentPrice: 172.63,
      marketValue: 4315.75,
      dayChange: { value: 1.42, isPositive: false },
      totalReturn: { value: 22.69, percent: 11.62, isPositive: false },
      weight: 6.4,
      type: "stock",
    },
    {
      symbol: "VFIAX",
      name: "Vanguard 500 Index Fund",
      shares: 45.32,
      avgCost: 345.67,
      currentPrice: 412.85,
      marketValue: 18710.38,
      dayChange: { value: 0.75, isPositive: true },
      totalReturn: { value: 67.18, percent: 19.44, isPositive: true },
      weight: 27.7,
      type: "etf",
    },
    {
      symbol: "VBTLX",
      name: "Vanguard Total Bond Market Index",
      shares: 120.45,
      avgCost: 85.32,
      currentPrice: 82.15,
      marketValue: 9894.97,
      dayChange: { value: 0.12, isPositive: false },
      totalReturn: { value: 3.17, percent: 3.72, isPositive: false },
      weight: 14.7,
      type: "bond",
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      shares: 0.25,
      avgCost: 42568.32,
      currentPrice: 68452.15,
      marketValue: 17113.04,
      dayChange: { value: 2.35, isPositive: true },
      totalReturn: { value: 25883.83, percent: 60.81, isPositive: true },
      weight: 10.4,
      type: "crypto",
    },
  ]

  // Filter positions based on selected filter and search query
  const filteredPositions = positions.filter((position) => {
    const matchesFilter = filter === "all" || position.type === filter
    const matchesSearch =
      position.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Positions</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="w-[180px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assets</SelectItem>
              <SelectItem value="stock">Stocks</SelectItem>
              <SelectItem value="etf">ETFs</SelectItem>
              <SelectItem value="bond">Bonds</SelectItem>
              <SelectItem value="crypto">Crypto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left font-medium">Symbol</th>
                <th className="py-3 px-4 text-left font-medium">Shares</th>
                <th className="py-3 px-4 text-right font-medium">Avg. Cost</th>
                <th className="py-3 px-4 text-right font-medium">Price</th>
                <th className="py-3 px-4 text-right font-medium">Market Value</th>
                <th className="py-3 px-4 text-right font-medium">Day Change</th>
                <th className="py-3 px-4 text-right font-medium">Total Return</th>
                <th className="py-3 px-4 text-right font-medium">Weight</th>
              </tr>
            </thead>
            <tbody>
              {filteredPositions.map((position) => (
                <tr key={position.symbol} className="border-b">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{position.symbol}</p>
                      <p className="text-xs text-muted-foreground">{position.name}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">{position.shares.toFixed(position.shares % 1 === 0 ? 0 : 2)}</td>
                  <td className="py-3 px-4 text-right">${position.avgCost.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">${position.currentPrice.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">${position.marketValue.toFixed(2)}</td>
                  <td className={`py-3 px-4 text-right ${position.dayChange.isPositive ? "text-profit" : "text-loss"}`}>
                    <div className="flex items-center justify-end">
                      {position.dayChange.isPositive ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      {position.dayChange.value.toFixed(2)}%
                    </div>
                  </td>
                  <td
                    className={`py-3 px-4 text-right ${position.totalReturn.isPositive ? "text-profit" : "text-loss"}`}
                  >
                    <div>
                      <p>${position.totalReturn.value.toFixed(2)}</p>
                      <p className="text-xs">
                        {position.totalReturn.isPositive ? "+" : ""}
                        {position.totalReturn.percent.toFixed(2)}%
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center gap-2">
                      <Progress value={position.weight} className="h-1.5 w-16" />
                      <span className="text-xs">{position.weight.toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center">
          <Button variant="outline" size="sm">
            View All Positions
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

