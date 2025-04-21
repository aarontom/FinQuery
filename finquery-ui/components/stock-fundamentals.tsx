"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function StockFundamentals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fundamentals & Financials</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
            <TabsTrigger value="cash">Cash Flow</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Market Cap</p>
                <p className="text-lg font-medium">$2.94T</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">P/E Ratio</p>
                <p className="text-lg font-medium">32.14</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">EPS (TTM)</p>
                <p className="text-lg font-medium">$5.83</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Dividend Yield</p>
                <p className="text-lg font-medium">0.51%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Beta</p>
                <p className="text-lg font-medium">1.28</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">52-Week High</p>
                <p className="text-lg font-medium">$199.62</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">52-Week Low</p>
                <p className="text-lg font-medium">$124.17</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Avg. Volume</p>
                <p className="text-lg font-medium">62.1M</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Revenue (TTM)</p>
                <p className="text-lg font-medium">$383.93B</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Profit Margin</p>
                <p className="text-lg font-medium">25.31%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">ROE</p>
                <p className="text-lg font-medium">160.09%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">ROA</p>
                <p className="text-lg font-medium">28.36%</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="income" className="pt-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium">Income Statement</th>
                    <th className="py-3 px-4 text-right font-medium">2023</th>
                    <th className="py-3 px-4 text-right font-medium">2022</th>
                    <th className="py-3 px-4 text-right font-medium">2021</th>
                    <th className="py-3 px-4 text-right font-medium">2020</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Revenue</td>
                    <td className="py-3 px-4 text-right">$383.93B</td>
                    <td className="py-3 px-4 text-right">$394.33B</td>
                    <td className="py-3 px-4 text-right">$365.82B</td>
                    <td className="py-3 px-4 text-right">$274.52B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Cost of Revenue</td>
                    <td className="py-3 px-4 text-right">$215.39B</td>
                    <td className="py-3 px-4 text-right">$223.55B</td>
                    <td className="py-3 px-4 text-right">$212.98B</td>
                    <td className="py-3 px-4 text-right">$169.56B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Gross Profit</td>
                    <td className="py-3 px-4 text-right">$168.54B</td>
                    <td className="py-3 px-4 text-right">$170.78B</td>
                    <td className="py-3 px-4 text-right">$152.84B</td>
                    <td className="py-3 px-4 text-right">$104.96B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Operating Expenses</td>
                    <td className="py-3 px-4 text-right">$54.32B</td>
                    <td className="py-3 px-4 text-right">$51.34B</td>
                    <td className="py-3 px-4 text-right">$43.89B</td>
                    <td className="py-3 px-4 text-right">$38.67B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Operating Income</td>
                    <td className="py-3 px-4 text-right">$114.22B</td>
                    <td className="py-3 px-4 text-right">$119.44B</td>
                    <td className="py-3 px-4 text-right">$108.95B</td>
                    <td className="py-3 px-4 text-right">$66.29B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Net Income</td>
                    <td className="py-3 px-4 text-right">$97.18B</td>
                    <td className="py-3 px-4 text-right">$99.80B</td>
                    <td className="py-3 px-4 text-right">$94.68B</td>
                    <td className="py-3 px-4 text-right">$57.41B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">EPS (Diluted)</td>
                    <td className="py-3 px-4 text-right">$5.83</td>
                    <td className="py-3 px-4 text-right">$6.11</td>
                    <td className="py-3 px-4 text-right">$5.61</td>
                    <td className="py-3 px-4 text-right">$3.28</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="balance" className="pt-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium">Balance Sheet</th>
                    <th className="py-3 px-4 text-right font-medium">2023</th>
                    <th className="py-3 px-4 text-right font-medium">2022</th>
                    <th className="py-3 px-4 text-right font-medium">2021</th>
                    <th className="py-3 px-4 text-right font-medium">2020</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Total Assets</td>
                    <td className="py-3 px-4 text-right">$352.58B</td>
                    <td className="py-3 px-4 text-right">$338.22B</td>
                    <td className="py-3 px-4 text-right">$351.00B</td>
                    <td className="py-3 px-4 text-right">$323.89B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Total Liabilities</td>
                    <td className="py-3 px-4 text-right">$290.45B</td>
                    <td className="py-3 px-4 text-right">$302.08B</td>
                    <td className="py-3 px-4 text-right">$287.91B</td>
                    <td className="py-3 px-4 text-right">$258.55B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Total Equity</td>
                    <td className="py-3 px-4 text-right">$62.13B</td>
                    <td className="py-3 px-4 text-right">$36.14B</td>
                    <td className="py-3 px-4 text-right">$63.09B</td>
                    <td className="py-3 px-4 text-right">$65.34B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Cash & Equivalents</td>
                    <td className="py-3 px-4 text-right">$29.97B</td>
                    <td className="py-3 px-4 text-right">$23.65B</td>
                    <td className="py-3 px-4 text-right">$34.94B</td>
                    <td className="py-3 px-4 text-right">$38.02B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Short-Term Investments</td>
                    <td className="py-3 px-4 text-right">$31.58B</td>
                    <td className="py-3 px-4 text-right">$24.66B</td>
                    <td className="py-3 px-4 text-right">$27.70B</td>
                    <td className="py-3 px-4 text-right">$52.93B</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="cash" className="pt-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium">Cash Flow</th>
                    <th className="py-3 px-4 text-right font-medium">2023</th>
                    <th className="py-3 px-4 text-right font-medium">2022</th>
                    <th className="py-3 px-4 text-right font-medium">2021</th>
                    <th className="py-3 px-4 text-right font-medium">2020</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Operating Cash Flow</td>
                    <td className="py-3 px-4 text-right">$113.76B</td>
                    <td className="py-3 px-4 text-right">$122.15B</td>
                    <td className="py-3 px-4 text-right">$104.04B</td>
                    <td className="py-3 px-4 text-right">$80.67B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Capital Expenditure</td>
                    <td className="py-3 px-4 text-right">-$11.08B</td>
                    <td className="py-3 px-4 text-right">-$10.71B</td>
                    <td className="py-3 px-4 text-right">-$11.09B</td>
                    <td className="py-3 px-4 text-right">-$7.31B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Free Cash Flow</td>
                    <td className="py-3 px-4 text-right">$102.68B</td>
                    <td className="py-3 px-4 text-right">$111.44B</td>
                    <td className="py-3 px-4 text-right">$92.95B</td>
                    <td className="py-3 px-4 text-right">$73.36B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Dividends Paid</td>
                    <td className="py-3 px-4 text-right">-$14.80B</td>
                    <td className="py-3 px-4 text-right">-$14.80B</td>
                    <td className="py-3 px-4 text-right">-$14.47B</td>
                    <td className="py-3 px-4 text-right">-$14.08B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Share Repurchases</td>
                    <td className="py-3 px-4 text-right">-$77.55B</td>
                    <td className="py-3 px-4 text-right">-$89.40B</td>
                    <td className="py-3 px-4 text-right">-$85.97B</td>
                    <td className="py-3 px-4 text-right">-$72.36B</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

