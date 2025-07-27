import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Message } from "@/interfaces";

interface RecentChat {
  user: string;
  message: string;
  time: string;
  role: string;
  status: string;
}

export function RecentChats() {
  const [recentChats, setRecentChats] = useState<RecentChat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentChats();
  }, []);

  const fetchRecentChats = async () => {
    try {
      const response = await fetch("/api/chats");
      if (!response.ok) {
        throw new Error("Failed to fetch chats");
      }
      const data = await response.json();

      // Transform the messages data into recent chats
      const transformedChats = transformMessagesToRecentChats(data.messages);
      setRecentChats(transformedChats);
    } catch (error) {
      console.error("Error fetching recent chats:", error);
      // Fallback to demo data if API fails
      setRecentChats(demoRecentChats);
    } finally {
      setLoading(false);
    }
  };

  const transformMessagesToRecentChats = (
    messages: Message[]
  ): RecentChat[] => {
    // Group messages by user (using uuid as a proxy for user identification)
    const sessions = new Map<string, Message[]>();

    messages.forEach((message) => {
      // Use a combination of role and uuid to create unique user sessions
      const userKey = `${message.role}_${message.uuid.split("-")[0]}`;
      if (!sessions.has(userKey)) {
        sessions.set(userKey, []);
      }
      sessions.get(userKey)!.push(message);
    });

    return Array.from(sessions.entries())
      .map(([userKey, sessionMessages], index) => {
        const lastMessage = sessionMessages[sessionMessages.length - 1];

        // Determine status based on message count
        let status = "active";
        if (sessionMessages.length > 10) {
          status = "resolved";
        } else if (sessionMessages.length < 3) {
          status = "pending";
        }

        return {
          user: `User ${index + 1}`,
          message:
            lastMessage.content.substring(0, 60) +
            (lastMessage.content.length > 60 ? "..." : ""),
          time: formatTimeAgo(lastMessage.created_at),
          role: lastMessage.role,
          status,
        };
      })
      .sort((a, b) => {
        // Sort by time (most recent first)
        const timeA = parseTimeAgo(a.time);
        const timeB = parseTimeAgo(b.time);
        return timeA - timeB;
      })
      .slice(0, 15); // Limit to 15 most recent chats
  };

  const formatTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor(
      (now.getTime() - messageTime.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const parseTimeAgo = (timeString: string): number => {
    const match = timeString.match(/(\d+)([mhd])/);
    if (!match) return 0;

    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
      case "m":
        return value;
      case "h":
        return value * 60;
      case "d":
        return value * 1440;
      default:
        return 0;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "resolved":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-slate-700 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-slate-700 rounded w-1/3 animate-pulse"></div>
              <div className="h-3 bg-slate-700 rounded w-2/3 animate-pulse"></div>
              <div className="h-2 bg-slate-700 rounded w-1/4 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentChats.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-400">No recent conversations</p>
        </div>
      ) : (
        recentChats.map((chat, index) => (
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
                <Badge
                  variant="outline"
                  className="text-xs text-slate-400 border-slate-600"
                >
                  {chat.role}
                </Badge>
                <div
                  className={`w-2 h-2 rounded-full ${getStatusColor(
                    chat.status
                  )}`}
                />
              </div>
              <p className="text-sm text-slate-400 truncate">{chat.message}</p>
              <p className="text-xs text-slate-500">{chat.time}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// Fallback demo data
const demoRecentChats = [
  {
    user: "User 1",
    message: "Hello, I need help with my account",
    time: "2m ago",
    role: "Human",
    status: "active",
  },
  {
    user: "User 2",
    message: "Thank you for your assistance",
    time: "7m ago",
    role: "Human",
    status: "resolved",
  },
  {
    user: "User 3",
    message: "Can you help me with this issue?",
    time: "15m ago",
    role: "Human",
    status: "active",
  },
  {
    user: "User 4",
    message: "I have a question about the service",
    time: "22m ago",
    role: "Human",
    status: "pending",
  },
  {
    user: "User 5",
    message: "How do I reset my password?",
    time: "30m ago",
    role: "Human",
    status: "active",
  },
  {
    user: "User 6",
    message: "Is there a mobile app available?",
    time: "38m ago",
    role: "Human",
    status: "pending",
  },
  {
    user: "User 7",
    message: "What are the business hours?",
    time: "45m ago",
    role: "Human",
    status: "resolved",
  },
  {
    user: "User 8",
    message: "I need to update my contact information",
    time: "53m ago",
    role: "Human",
    status: "pending",
  },
  {
    user: "User 9",
    message: "Can you explain the fee structure?",
    time: "1h ago",
    role: "Human",
    status: "active",
  },
  {
    user: "User 10",
    message: "Do you offer international transfers?",
    time: "1h 15m ago",
    role: "Human",
    status: "pending",
  },
  {
    user: "User 11",
    message: "How do I apply for a loan?",
    time: "1h 45m ago",
    role: "Human",
    status: "active",
  },
  {
    user: "User 12",
    message: "What documents do I need to open an account?",
    time: "2h ago",
    role: "Human",
    status: "resolved",
  },
  {
    user: "User 13",
    message: "Can I change my account type?",
    time: "2h 30m ago",
    role: "Human",
    status: "pending",
  },
  {
    user: "User 14",
    message: "Is there a minimum balance requirement?",
    time: "3h ago",
    role: "Human",
    status: "active",
  },
  {
    user: "User 15",
    message: "How do I report a lost card?",
    time: "3h 20m ago",
    role: "Human",
    status: "resolved",
  },
];
