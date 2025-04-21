"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function PortfolioTransactions() {
  const [page, setPage] = useState(1)

  // Mock transactions data
  const transactions = [
    {
      id: "tx-001",
      date: "2023-05-15",
      symbol: "AAPL",
      type: "buy",
      shares: 10,
      price: 142.32,
      amount: 1423.2,
      fees: 4.95,
    },
    {
      id: "tx-002",
      date: "2023-05-10",
      symbol: "MSFT",
      type: "buy",
      shares: 5,
      price: 287.65,
      amount: 1438.25,
      fees: 4.95,
    },
    {
      id: "tx-003",
      date: "2023-04-28",
      symbol: "TSLA",
      type: "sell",
      shares: 3,
      price: 185.42,
      amount: 556.26,
      fees: 4.95,
    },
    {
      id: "tx-004",
      date: "2023-04-15",
      symbol: "VFIAX",
      type: "buy",
      shares: 2.45,
      price: 345.67,
      amount: 846.89,
      fees: 0,
    },
    {
      id: "tx-005",
      date: "2023-04-01",
      symbol: "AAPL",
      type: "dividend",
      shares: 0,
      price: 0,
      amount: 35.75,
      fees: 0,
    },
  ]

  const getTransactionTypeColor = (type: string) => {
    if (type === "buy") return "bg-neutral text-neutral-foreground"
    if (type === "sell") return "bg-primary text-primary-foreground"
    if (type === "dividend") return "bg-profit text-profit-foreground"
    return "bg-muted text-muted-foreground"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Transactions</CardTitle>
        <Button variant="outline" size="sm">
          Add Transaction
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="buys">Buys</TabsTrigger>
            <TabsTrigger value="sells">Sells</TabsTrigger>
            <TabsTrigger value="dividends">Dividends</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="pt-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium">Date</th>
                    <th className="py-3 px-4 text-left font-medium">Symbol</th>
                    <th className="py-3 px-4 text-left font-medium">Type</th>
                    <th className="py-3 px-4 text-right font-medium">Shares</th>
                    <th className="py-3 px-4 text-right font-medium">Price</th>
                    <th className="py-3 px-4 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="py-3 px-4">{formatDate(transaction.date)}</td>
                      <td className="py-3 px-4 font-medium">{transaction.symbol}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={getTransactionTypeColor(transaction.type)}>
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {transaction.shares > 0
                          ? transaction.shares.toFixed(transaction.shares % 1 === 0 ? 0 : 2)
                          : "-"}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {transaction.price > 0 ? `$${transaction.price.toFixed(2)}` : "-"}
                      </td>
                      <td className="py-3 px-4 text-right">${transaction.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-center">
              <Button variant="outline" size="sm">
                View All Transactions
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="buys" className="pt-4">
            <div className="flex h-40 w-full items-center justify-center">
              <p className="text-muted-foreground">Buy transactions would be listed here</p>
            </div>
          </TabsContent>

          <TabsContent value="sells" className="pt-4">
            <div className="flex h-40 w-full items-center justify-center">
              <p className="text-muted-foreground">Sell transactions would be listed here</p>
            </div>
          </TabsContent>

          <TabsContent value="dividends" className="pt-4">
            <div className="flex h-40 w-full items-center justify-center">
              <p className="text-muted-foreground">Dividend transactions would be listed here</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

