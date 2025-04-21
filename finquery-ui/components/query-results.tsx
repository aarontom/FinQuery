"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, LineChart, Table } from "lucide-react"

export function QueryResults() {
  // This would normally come from the query response
  const hasResults = true

  if (!hasResults) {
    return null
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Query Results</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Results for: "What was Tesla's revenue last quarter?"</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="rounded-lg border bg-card/50 p-4">
            <p className="text-sm">
              <span className="font-medium">Tesla's revenue for Q1 2023 was $23.33 billion</span>, representing a 24%
              increase year-over-year from $18.76 billion in Q1 2022. This exceeded analyst expectations of $23.21
              billion.
            </p>
          </div>

          <Tabs defaultValue="table">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="table">
                <Table className="h-4 w-4 mr-2" />
                Table View
              </TabsTrigger>
              <TabsTrigger value="chart">
                <LineChart className="h-4 w-4 mr-2" />
                Chart View
              </TabsTrigger>
            </TabsList>
            <TabsContent value="table" className="pt-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Quarter</th>
                      <th className="py-3 px-4 text-left font-medium">Revenue (billions)</th>
                      <th className="py-3 px-4 text-left font-medium">YoY Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Q1 2023</td>
                      <td className="py-3 px-4">$23.33</td>
                      <td className="py-3 px-4 text-profit">+24%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Q4 2022</td>
                      <td className="py-3 px-4">$24.32</td>
                      <td className="py-3 px-4 text-profit">+37%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Q3 2022</td>
                      <td className="py-3 px-4">$21.45</td>
                      <td className="py-3 px-4 text-profit">+56%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Q2 2022</td>
                      <td className="py-3 px-4">$16.93</td>
                      <td className="py-3 px-4 text-profit">+42%</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Q1 2022</td>
                      <td className="py-3 px-4">$18.76</td>
                      <td className="py-3 px-4 text-profit">+81%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="chart" className="pt-4">
              <div className="h-[300px] w-full">
                {/* This would be a real chart component in production */}
                <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                  <p className="text-muted-foreground">Revenue chart visualization would render here</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Additional Insights</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Automotive revenue was $19.96 billion, up 18% year-over-year.</li>
              <li>Energy generation and storage revenue was $1.53 billion, up 148% year-over-year.</li>
              <li>Services and other revenue was $1.84 billion, up 28% year-over-year.</li>
              <li>Gross margin was 19.3%, down from 29.1% in Q1 2022.</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="text-sm font-medium mb-2">Related Queries</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                What is Tesla's profit margin?
              </Button>
              <Button variant="outline" size="sm">
                Compare Tesla revenue with competitors
              </Button>
              <Button variant="outline" size="sm">
                Tesla earnings forecast for next quarter
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

