import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentChats = [
  {
    user: "Tendai M.",
    message: "Ndiri kutsvaga ruzivo rwekubhadhara mari kubank",
    time: "2m ago",
    language: "Shona",
    status: "active",
  },
  {
    user: "Chipo N.",
    message: "Maita basa, ndakanzwisisa zvino",
    time: "15m ago",
    language: "Shona",
    status: "resolved",
  },
  {
    user: "Blessing M.",
    message: "Ngifuna ukwazi ngezindlela zokonga imali",
    time: "1h ago",
    language: "Ndebele",
    status: "pending",
  },
  {
    user: "Grace S.",
    message: "Can you help me with loan applications?",
    time: "2h ago",
    language: "English",
    status: "active",
  },
]

export function RecentChats() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "resolved":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      {recentChats.map((chat, index) => (
        <div key={index} className="flex items-start space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-blue-500 text-white text-xs">
              {chat.user
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-white">{chat.user}</p>
              <Badge variant="outline" className="text-xs text-slate-400 border-slate-600">
                {chat.language}
              </Badge>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(chat.status)}`} />
            </div>
            <p className="text-sm text-slate-400 truncate">{chat.message}</p>
            <p className="text-xs text-slate-500">{chat.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
