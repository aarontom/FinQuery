"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

export function StockComparison() {
  const [comparisonStocks, setComparisonStocks] = useState<string[]>(["MSFT", "GOOGL"])
  const [metric, setMetric] = useState("price")

  const availableStocks = [
    { value: "AAPL", label: "Apple (AAPL)" },
    { value: "MSFT", label: "Microsoft (MSFT)" },
    { value: "GOOGL", label: "Alphabet (GOOGL)" },
    { value: "AMZN", label: "Amazon (AMZN)" },
    { value: "META", label: "Meta (META)" },
    { value: "TSLA", label: "Tesla (TSLA)" },
    { value: "NVDA", label: "NVIDIA (NVDA)" },
  ]

  const metrics = [
    { value: "price", label: "Price Performance" },
    { value: "pe", label: "P/E Ratio" },
    { value: "revenue", label: "Revenue Growth" },
    { value: "eps", label: "EPS Growth" },
    { value: "margin", label: "Profit Margin" },
  ]

  const addStock = (stock: string) => {
    if (!comparisonStocks.includes(stock) && comparisonStocks.length < 5) {
      setComparisonStocks([...comparisonStocks, stock])
    }
  }

  const removeStock = (stock: string) => {
    setComparisonStocks(comparisonStocks.filter((s) => s !== stock))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Comparison</CardTitle>
        <div className="flex items-center gap-2">
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              {metrics.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={addStock}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Add stock" />
            </SelectTrigger>
            <SelectContent>
              {availableStocks
                .filter((stock) => !comparisonStocks.includes(stock.value) && stock.value !== "AAPL")
                .map((stock) => (
                  <SelectItem key={stock.value} value={stock.value}>
                    {stock.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">AAPL (Base)</div>
            {comparisonStocks.map((stock) => (
              <div key={stock} className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm font-medium">
                {stock}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 rounded-full p-0"
                  onClick={() => removeStock(stock)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))}
          </div>

          <div className="h-[350px] w-full">
            {/* This would be a real chart component in production */}
            <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
              <p className="text-muted-foreground">
                Comparison chart for{" "}
                {metric === "price"
                  ? "Price Performance"
                  : metric === "pe"
                    ? "P/E Ratio"
                    : metric === "revenue"
                      ? "Revenue Growth"
                      : metric === "eps"
                        ? "EPS Growth"
                        : "Profit Margin"}{" "}
                would render here
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium">Stock</th>
                  <th className="py-3 px-4 text-left font-medium">Current</th>
                  <th className="py-3 px-4 text-left font-medium">1 Month</th>
                  <th className="py-3 px-4 text-left font-medium">3 Months</th>
                  <th className="py-3 px-4 text-left font-medium">6 Months</th>
                  <th className="py-3 px-4 text-left font-medium">1 Year</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">AAPL</td>
                  <td className="py-3 px-4">$187.42</td>
                  <td className="py-3 px-4 text-loss">-2.18%</td>
                  <td className="py-3 px-4 text-profit">+5.32%</td>
                  <td className="py-3 px-4 text-profit">+8.76%</td>
                  <td className="py-3 px-4 text-profit">+15.32%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">MSFT</td>
                  <td className="py-3 px-4">$415.56</td>
                  <td className="py-3 px-4 text-profit">+1.87%</td>
                  <td className="py-3 px-4 text-profit">+7.65%</td>
                  <td className="py-3 px-4 text-profit">+12.43%</td>
                  <td className="py-3 px-4 text-profit">+24.76%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">GOOGL</td>
                  <td className="py-3 px-4">$178.32</td>
                  <td className="py-3 px-4 text-loss">-0.54%</td>
                  <td className="py-3 px-4 text-profit">+3.21%</td>
                  <td className="py-3 px-4 text-profit">+9.87%</td>
                  <td className="py-3 px-4 text-profit">+18.65%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

