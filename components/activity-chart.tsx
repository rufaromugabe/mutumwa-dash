"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Mon", conversations: 45, responses: 43 },
  { name: "Tue", conversations: 52, responses: 51 },
  { name: "Wed", conversations: 48, responses: 47 },
  { name: "Thu", conversations: 61, responses: 60 },
  { name: "Fri", conversations: 55, responses: 54 },
  { name: "Sat", conversations: 38, responses: 37 },
  { name: "Sun", conversations: 42, responses: 41 },
]

export function ActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#334155",
            border: "1px solid #475569",
            borderRadius: "8px",
            color: "#f1f5f9",
          }}
        />
        <Line
          type="monotone"
          dataKey="conversations"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="responses"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
