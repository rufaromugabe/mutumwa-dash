import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LanguageChart } from "@/components/language-chart";
import { ResponseTimeChart } from "@/components/response-time-chart";
import { useEffect, useState } from "react";
import { Message } from "@/interfaces";

interface RoleStat {
  role: string;
  percentage: number;
  conversations: number;
}

export function Analytics() {
  const [roleStats, setRoleStats] = useState<RoleStat[]>([]);
  const [loading, setLoading] = useState(true);

  const topQueries = [
    { query: "Banking information", count: 234, trend: "+12%" },
    { query: "CEO information", count: 189, trend: "+8%" },
    { query: "Loan applications", count: 156, trend: "+15%" },
    { query: "Account balance", count: 134, trend: "+5%" },
    { query: "Transfer money", count: 98, trend: "+22%" },
  ];

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch("/api/chats");
      if (!response.ok) {
        throw new Error("Failed to fetch analytics data");
      }
      const data = await response.json();

      // Calculate role distribution from real data
      const stats = calculateRoleStats(data.messages);
      setRoleStats(stats);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      // Fallback to demo data if API fails
      setRoleStats(demoRoleStats);
    } finally {
      setLoading(false);
    }
  };

  const calculateRoleStats = (messages: Message[]): RoleStat[] => {
    const roleCounts = new Map<string, number>();
    let totalConversations = 0;

    // Group messages by role_type to count conversations
    const sessions = new Map<string, Message[]>();

    messages.forEach((message) => {
      const sessionKey = message.role_type;
      if (!sessions.has(sessionKey)) {
        sessions.set(sessionKey, []);
      }
      sessions.get(sessionKey)!.push(message);
    });

    // Analyze each session for role
    sessions.forEach((sessionMessages) => {
      const lastMessage = sessionMessages[sessionMessages.length - 1];
      const role = lastMessage.role || "Unknown";

      roleCounts.set(role, (roleCounts.get(role) || 0) + 1);
      totalConversations++;
    });

    // Convert to array and calculate percentages
    const stats: RoleStat[] = [];
    roleCounts.forEach((count, role) => {
      stats.push({
        role,
        conversations: count,
        percentage: Math.round((count / totalConversations) * 100),
      });
    });

    // Sort by conversation count (descending)
    stats.sort((a, b) => b.conversations - a.conversations);

    // If no data, return demo stats
    if (stats.length === 0) {
      return demoRoleStats;
    }

    return stats;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-slate-400">Loading analytics data...</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Role Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse space-y-4">
                <div className="h-32 bg-slate-700 rounded"></div>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-4 bg-slate-700 rounded w-1/4"></div>
                    <div className="h-4 bg-slate-700 rounded w-1/6"></div>
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
              <div className="animate-pulse h-32 bg-slate-700 rounded"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-slate-400">
          Detailed insights into your AI assistant performance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Role Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <LanguageChart />
            <div className="mt-4 space-y-2">
              {roleStats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-slate-300">{stat.role}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400">{stat.conversations}</span>
                    <Badge
                      variant="outline"
                      className="text-slate-300 border-slate-600"
                    >
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
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-white">{query.query}</h4>
                  <p className="text-sm text-slate-400">
                    {query.count} queries this month
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="text-green-400 border-green-600"
                >
                  {query.trend}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Fallback demo data
const demoRoleStats = [
  { role: "Human", percentage: 70, conversations: 1281 },
  { role: "AI", percentage: 30, conversations: 996 },
];
