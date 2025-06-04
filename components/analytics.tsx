import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LanguageChart } from "@/components/language-chart"
import { ResponseTimeChart } from "@/components/response-time-chart"

export function Analytics() {
  const languageStats = [
    { language: "Shona", percentage: 45, conversations: 1281 },
    { language: "English", percentage: 35, conversations: 996 },
    { language: "Ndebele", percentage: 15, conversations: 427 },
    { language: "Other", percentage: 5, conversations: 143 },
  ]

  const topQueries = [
    { query: "Banking information", count: 234, trend: "+12%" },
    { query: "CEO information", count: 189, trend: "+8%" },
    { query: "Loan applications", count: 156, trend: "+15%" },
    { query: "Account balance", count: 134, trend: "+5%" },
    { query: "Transfer money", count: 98, trend: "+22%" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-slate-400">Detailed insights into your AI assistant performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Language Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <LanguageChart />
            <div className="mt-4 space-y-2">
              {languageStats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-slate-300">{stat.language}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400">{stat.conversations}</span>
                    <Badge variant="outline" className="text-slate-300 border-slate-600">
                      {stat.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Response Time Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponseTimeChart />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Top Queries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topQueries.map((query, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">{query.query}</h4>
                  <p className="text-sm text-slate-400">{query.count} queries this month</p>
                </div>
                <Badge variant="outline" className="text-green-400 border-green-600">
                  {query.trend}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
