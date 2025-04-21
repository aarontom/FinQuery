import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export function RecentQueries() {
  const recentQueries = [
    {
      query: "What was Tesla's revenue last quarter?",
      timestamp: "2 hours ago",
    },
    {
      query: "Compare Apple and Microsoft stock performance",
      timestamp: "Yesterday",
    },
    {
      query: "Show me tech stocks with positive sentiment",
      timestamp: "2 days ago",
    },
    {
      query: "Which sectors are trending based on news?",
      timestamp: "3 days ago",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Queries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentQueries.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">{item.query}</p>
                <p className="text-xs text-muted-foreground">{item.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

