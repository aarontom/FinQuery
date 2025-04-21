"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PortfolioAllocation() {
  const allocationData = {
    assetClass: [
      { name: "Stocks", value: 72, color: "bg-primary" },
      { name: "Bonds", value: 15, color: "bg-secondary" },
      { name: "Cash", value: 5, color: "bg-muted" },
      { name: "Alternatives", value: 8, color: "bg-accent" },
    ],
    sector: [
      { name: "Technology", value: 32, color: "bg-primary" },
      { name: "Healthcare", value: 18, color: "bg-secondary" },
      { name: "Financials", value: 14, color: "bg-muted" },
      { name: "Consumer", value: 12, color: "bg-accent" },
      { name: "Industrials", value: 8, color: "bg-neutral" },
      { name: "Other", value: 16, color: "bg-primary/50" },
    ],
    geography: [
      { name: "United States", value: 65, color: "bg-primary" },
      { name: "Europe", value: 15, color: "bg-secondary" },
      { name: "Asia Pacific", value: 12, color: "bg-muted" },
      { name: "Emerging Markets", value: 8, color: "bg-accent" },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="assetClass">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="assetClass">Asset Class</TabsTrigger>
            <TabsTrigger value="sector">Sector</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
          </TabsList>

          <TabsContent value="assetClass" className="pt-4">
            <div className="space-y-4">
              <div className="h-[180px] w-full">
                {/* This would be a real chart component in production */}
                <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                  <p className="text-muted-foreground">Asset class allocation pie chart would render here</p>
                </div>
              </div>

              <div className="space-y-2">
                {allocationData.assetClass.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-sm ${item.color}`}></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sector" className="pt-4">
            <div className="space-y-4">
              <div className="h-[180px] w-full">
                {/* This would be a real chart component in production */}
                <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                  <p className="text-muted-foreground">Sector allocation pie chart would render here</p>
                </div>
              </div>

              <div className="space-y-2">
                {allocationData.sector.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-sm ${item.color}`}></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="geography" className="pt-4">
            <div className="space-y-4">
              <div className="h-[180px] w-full">
                {/* This would be a real chart component in production */}
                <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                  <p className="text-muted-foreground">Geographic allocation pie chart would render here</p>
                </div>
              </div>

              <div className="space-y-2">
                {allocationData.geography.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-sm ${item.color}`}></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

