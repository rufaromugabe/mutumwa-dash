import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MessageSquare, User, Clock } from "lucide-react"

const demoChats = [
  {
    id: "1",
    user: "Tendai Mukamuri",
    language: "Shona",
    status: "active",
    lastMessage: "Ndiri kutsvaga ruzivo rwekubhadhara mari kubank",
    timestamp: "2 minutes ago",
    messages: 12,
  },
  {
    id: "2",
    user: "Chipo Nyamande",
    language: "Shona",
    status: "resolved",
    lastMessage: "Maita basa, ndakanzwisisa zvino",
    timestamp: "15 minutes ago",
    messages: 8,
  },
  {
    id: "3",
    user: "Blessing Moyo",
    language: "Ndebele",
    status: "pending",
    lastMessage: "Ngifuna ukwazi ngezindlela zokonga imali",
    timestamp: "1 hour ago",
    messages: 5,
  },
  {
    id: "4",
    user: "Grace Sibanda",
    language: "English",
    status: "active",
    lastMessage: "Can you help me with loan applications?",
    timestamp: "2 hours ago",
    messages: 15,
  },
  {
    id: "5",
    user: "Farai Chigumba",
    language: "Shona",
    status: "resolved",
    lastMessage: "CEO weZB Bank ndiani?",
    timestamp: "3 hours ago",
    messages: 6,
  },
]

export function ChatManagement() {
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Chat Management</h1>
          <p className="text-slate-400">Monitor and manage customer conversations</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <MessageSquare className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              />
            </div>
            <div className="flex space-x-2">
              <Badge variant="outline" className="text-slate-300 border-slate-600">
                All ({demoChats.length})
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-600">
                Active ({demoChats.filter((c) => c.status === "active").length})
              </Badge>
              <Badge variant="outline" className="text-yellow-400 border-yellow-600">
                Pending ({demoChats.filter((c) => c.status === "pending").length})
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {demoChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-white">{chat.user}</h3>
                      <Badge variant="outline" className="text-xs text-slate-300 border-slate-600">
                        {chat.language}
                      </Badge>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(chat.status)}`} />
                    </div>
                    <p className="text-sm text-slate-400 mt-1">{chat.lastMessage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-slate-400 text-sm mb-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {chat.timestamp}
                  </div>
                  <div className="flex items-center text-slate-400 text-sm">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {chat.messages} messages
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
