"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Shona", value: 45, color: "#3b82f6" },
  { name: "English", value: 35, color: "#10b981" },
  { name: "Ndebele", value: 15, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#ef4444" },
]

export function LanguageChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={5} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#334155",
            border: "1px solid #475569",
            borderRadius: "8px",
            color: "#f1f5f9",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
