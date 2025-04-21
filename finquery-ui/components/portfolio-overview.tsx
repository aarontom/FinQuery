"use client"

import { ArrowDown, ArrowUp, Briefcase, DollarSign, LineChart, Percent, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PortfolioOverview() {
  // Mock portfolio data
  const portfolioData = {
    totalValue: 248756.32,
    dayChange: {
      value: 2345.67,
      percent: 0.95,
      isPositive: true,
    },
    totalReturn: {
      value: 48756.32,
      percent: 24.38,
      isPositive: true,
    },
    metrics: [
      { name: "Cash", value: "$12,458.21", icon: DollarSign },
      { name: "Annual Dividend", value: "$3,245.78", icon: Percent },
      { name: "Dividend Yield", value: "1.3%", icon: Percent },
      { name: "Beta", value: "0.92", icon: LineChart },
    ],
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-medium">My Portfolio</h2>
              <Select defaultValue="main">
                <SelectTrigger className="h-7 w-[130px] text-xs">
                  <SelectValue placeholder="Select portfolio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Portfolio</SelectItem>
                  <SelectItem value="retirement">Retirement</SelectItem>
                  <SelectItem value="tech">Tech Stocks</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                $
                {portfolioData.totalValue.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <div className={`flex items-center ${portfolioData.dayChange.isPositive ? "text-profit" : "text-loss"}`}>
                {portfolioData.dayChange.isPositive ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                <span className="font-medium">
                  $
                  {portfolioData.dayChange.value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  ({portfolioData.dayChange.percent.toFixed(2)}%)
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Today</span>
            </div>
            <div
              className={`flex items-center text-sm ${portfolioData.totalReturn.isPositive ? "text-profit" : "text-loss"}`}
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>
                Total Return: $
                {portfolioData.totalReturn.value.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                ({portfolioData.totalReturn.percent.toFixed(2)}%)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Add Funds
            </Button>
            <Button variant="outline" size="sm">
              Buy / Sell
            </Button>
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button size="sm">Rebalance</Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {portfolioData.metrics.map((metric) => (
            <div key={metric.name} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <metric.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{metric.name}</p>
                <p className="font-medium">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

