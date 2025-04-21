"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MarketOverview() {
  const marketData = {
    indices: [
      { name: "S&P 500", value: "4,587.64", change: "+0.57%", isPositive: true },
      { name: "Nasdaq", value: "16,274.94", change: "+0.85%", isPositive: true },
      { name: "Dow Jones", value: "37,986.40", change: "-0.21%", isPositive: false },
      { name: "Russell 2000", value: "2,015.63", change: "+0.32%", isPositive: true },
    ],
    sectors: [
      { name: "Technology", change: "+1.24%", isPositive: true },
      { name: "Healthcare", change: "+0.45%", isPositive: true },
      { name: "Financials", change: "-0.32%", isPositive: false },
      { name: "Energy", change: "-0.87%", isPositive: false },
      { name: "Consumer", change: "+0.21%", isPositive: true },
    ],
    commodities: [
      { name: "Gold", value: "$2,345.60", change: "+0.42%", isPositive: true },
      { name: "Silver", value: "$27.85", change: "+0.63%", isPositive: true },
      { name: "Oil (WTI)", value: "$78.42", change: "-1.24%", isPositive: false },
      { name: "Natural Gas", value: "$2.14", change: "-0.93%", isPositive: false },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="indices">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="indices">Indices</TabsTrigger>
            <TabsTrigger value="sectors">Sectors</TabsTrigger>
            <TabsTrigger value="commodities">Commodities</TabsTrigger>
          </TabsList>
          <TabsContent value="indices" className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {marketData.indices.map((index) => (
                <div key={index.name} className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{index.name}</p>
                  <p className="text-2xl font-bold">{index.value}</p>
                  <div className={`flex items-center text-sm ${index.isPositive ? "text-profit" : "text-loss"}`}>
                    {index.isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                    {index.change}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="sectors" className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {marketData.sectors.map((sector) => (
                <div key={sector.name} className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{sector.name}</p>
                  <div
                    className={`flex items-center text-lg font-semibold ${sector.isPositive ? "text-profit" : "text-loss"}`}
                  >
                    {sector.isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                    {sector.change}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="commodities" className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {marketData.commodities.map((commodity) => (
                <div key={commodity.name} className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{commodity.name}</p>
                  <p className="text-2xl font-bold">{commodity.value}</p>
                  <div className={`flex items-center text-sm ${commodity.isPositive ? "text-profit" : "text-loss"}`}>
                    {commodity.isPositive ? (
                      <ArrowUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 mr-1" />
                    )}
                    {commodity.change}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

