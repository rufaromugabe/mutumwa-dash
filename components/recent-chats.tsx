import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentChats = [
  {
    user: "Tendai M.",
    message: "Ndiri kutsvaga ruzivo nezve maapplication kuHIT",
    time: "2m ago",
    language: "Shona",
    status: "active",
  },
  {
    user: "Chipo N.",
    message: "Maita basa, ndanzwisisa marequirements eSoftware Engineering",
    time: "7m ago",
    language: "Shona",
    status: "resolved",
  },
  {
    user: "Blessing M.",
    message: "Ngifuna ukwazi ukuthi yiziphi izifundo ezitholakala for Computer Science",
    time: "15m ago",
    language: "Ndebele",
    status: "active",
  },
  {
    user: "Grace S.",
    message: "Can you help me understand the difference between HIT and other polytechnics?",
    time: "22m ago",
    language: "English",
    status: "pending",
  },
  {
    user: "Kuda T.",
    message: "How much is the tuition fee for first-year students?",
    time: "30m ago",
    language: "English",
    status: "active",
  },
  {
    user: "Lerato M.",
    message: "Kune accommodation here yemadzimai pedyo necampus?",
    time: "38m ago",
    language: "Shona",
    status: "pending",
  },
  {
    user: "Nokuthula D.",
    message: "Ngabe ngidinga iMaths ukuze ngifake iSoftware Engineering?",
    time: "45m ago",
    language: "Ndebele",
    status: "resolved",
  },
  {
    user: "Tatenda Z.",
    message: "I got 10 points at A-Level, can I qualify for Industrial Design?",
    time: "53m ago",
    language: "English",
    status: "pending",
  },
  {
    user: "Fadzai K.",
    message: "Marii inodiwa pakunyoresa first semester?",
    time: "1h ago",
    language: "Shona",
    status: "active",
  },
  {
    user: "Tafadzwa B.",
    message: "Ndinoda kuziva kana HIT ichipa part-time courses futi",
    time: "1h 15m ago",
    language: "Shona",
    status: "pending",
  },
  {
    user: "Amanda N.",
    message: "How do I apply as an international student?",
    time: "1h 45m ago",
    language: "English",
    status: "active",
  },
  {
    user: "Sibongile M.",
    message: "Ngifuna ukufunda ngeScholarships available eHIT",
    time: "2h ago",
    language: "Ndebele",
    status: "resolved",
  },
  {
    user: "Brian G.",
    message: "Can I change my program after registration?",
    time: "2h 30m ago",
    language: "English",
    status: "pending",
  },
  {
    user: "Rutendo J.",
    message: "Pane orientation here ye first years? Ingori riini?",
    time: "3h ago",
    language: "Shona",
    status: "active",
  },
  {
    user: "Nomusa P.",
    message: "Ngabe uHIT une facilities ezinhle zeLibrary naLab?",
    time: "3h 20m ago",
    language: "Ndebele",
    status: "resolved",
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
