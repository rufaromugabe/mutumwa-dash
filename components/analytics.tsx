"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import {
  Zap,
  Users,
  Clock,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Globe,
  BarChart3,
  Timer,
  Target,
} from "lucide-react";

export function AnalyticsDashboard() {
  // Language distribution data
  const languageData = [
    { name: "English", value: 65, color: "#3B82F6" },
    { name: "Shona", value: 28, color: "#10B981" },
    { name: "Ndebele", value: 7, color: "#F59E0B" },
  ];

  // Regional query distribution
  const regionalData = [
    { region: "Harare", queries: 2840, resolved: 2445 },
    { region: "Bulawayo", queries: 1920, resolved: 1651 },
    { region: "Chitungwiza", queries: 1560, resolved: 1342 },
    { region: "Mutare", queries: 980, resolved: 843 },
    { region: "Gweru", queries: 760, resolved: 654 },
    { region: "Kwekwe", queries: 540, resolved: 464 },
  ];

  // Query types data
  const queryTypesData = [
    { type: "Power Outages", count: 3200, percentage: 35 },
    { type: "Bill Payments", count: 2400, percentage: 26 },
    { type: "Load Shedding", count: 1800, percentage: 20 },
    { type: "New Connections", count: 900, percentage: 10 },
    { type: "Meter Issues", count: 540, percentage: 6 },
    { type: "General Inquiry", count: 270, percentage: 3 },
  ];

  // Resolution time data
  const resolutionTimeData = [
    { timeRange: "< 1 min", count: 4200, percentage: 46 },
    { timeRange: "1-5 min", count: 2800, percentage: 31 },
    { timeRange: "5-15 min", count: 1400, percentage: 15 },
    { timeRange: "15-30 min", count: 500, percentage: 5 },
    { timeRange: "> 30 min", count: 210, percentage: 3 },
  ];

  // Daily performance data
  const dailyPerformanceData = [
    { day: "Mon", queries: 1200, resolved: 1032, avgTime: 3.2 },
    { day: "Tue", queries: 1350, resolved: 1161, avgTime: 2.8 },
    { day: "Wed", queries: 1180, resolved: 1015, avgTime: 3.5 },
    { day: "Thu", queries: 1420, resolved: 1221, avgTime: 2.9 },
    { day: "Fri", queries: 1680, resolved: 1445, avgTime: 3.1 },
    { day: "Sat", queries: 980, resolved: 843, avgTime: 4.2 },
    { day: "Sun", queries: 800, resolved: 688, avgTime: 3.8 },
  ];

  // Hourly distribution
  const hourlyData = [
    { hour: "6AM", queries: 120 },
    { hour: "8AM", queries: 340 },
    { hour: "10AM", queries: 520 },
    { hour: "12PM", queries: 680 },
    { hour: "2PM", queries: 590 },
    { hour: "4PM", queries: 720 },
    { hour: "6PM", queries: 850 },
    { hour: "8PM", queries: 640 },
    { hour: "10PM", queries: 280 },
  ];

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#F97316",
  ];

  return (
    <div className="space-y-6 p-6 bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-slate-400">
            Customer service chatbot performance and insights
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-slate-600 text-slate-300 bg-transparent"
          >
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Queries</p>
                <p className="text-2xl font-bold text-white">9,110</p>
                <p className="text-green-400 text-sm flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.5% from last week
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Success Rate</p>
                <p className="text-2xl font-bold text-white">86%</p>
                <p className="text-green-400 text-sm flex items-center mt-1">
                  <Target className="w-3 h-3 mr-1" />
                  Above target (85%)
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Resolution Time</p>
                <p className="text-2xl font-bold text-white">3.2 min</p>
                <p className="text-yellow-400 text-sm flex items-center mt-1">
                  <Timer className="w-3 h-3 mr-1" />
                  -0.3 min improvement
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-white">1,247</p>
                <p className="text-blue-400 text-sm flex items-center mt-1">
                  <Users className="w-3 h-3 mr-1" />
                  Currently online
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Distribution */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Language Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie
                    data={languageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {languageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {languageData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-300 text-sm">{item.name}</span>
                    <Badge
                      variant="outline"
                      className="text-slate-400 border-slate-600"
                    >
                      {item.value}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resolution Time Distribution */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Timer className="w-5 h-5 mr-2" />
              Resolution Time Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={resolutionTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="timeRange" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Query Types */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Query Types Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {queryTypesData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">{item.type}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 text-sm">
                        {item.count}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-slate-400 border-slate-600"
                      >
                        {item.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Regional Query Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={regionalData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="region"
                  stroke="#9CA3AF"
                  fontSize={12}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="queries" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                <Bar dataKey="resolved" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Performance */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Daily Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="queries"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Total Queries"
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Resolved"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hourly Activity */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Hourly Activity Pattern
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="hour" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="queries"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Success Rate Breakdown */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Chatbot Success Rate Analysis (86%)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">
                Success Factors
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Automated Resolution</span>
                  <Badge className="bg-green-500/20 text-green-400">72%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Quick Escalation</span>
                  <Badge className="bg-blue-500/20 text-blue-400">14%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Failed Queries</span>
                  <Badge className="bg-red-500/20 text-red-400">14%</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">
                Top Performing Areas
              </h4>
              <div className="space-y-2">
                <div className="text-slate-300 text-sm">
                  Bill Payment Queries: 94%
                </div>
                <div className="text-slate-300 text-sm">
                  Load Shedding Info: 91%
                </div>
                <div className="text-slate-300 text-sm">
                  General Inquiries: 89%
                </div>
                <div className="text-slate-300 text-sm">
                  Power Outage Reports: 82%
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">
                Improvement Areas
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-slate-300 text-sm">
                    Complex Technical Issues
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-slate-300 text-sm">
                    Multi-step Processes
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-slate-300 text-sm">
                    Language Context Issues
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
