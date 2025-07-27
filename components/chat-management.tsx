import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, User, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Message } from "@/interfaces";

interface ChatSession {
  id: string;
  user: string;
  role: string;
  status: string;
  lastMessage: string;
  timestamp: string;
  messages: number;
}

export function ChatManagement() {
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await fetch("/api/chats");
      if (!response.ok) {
        throw new Error("Failed to fetch chats");
      }
      const data = await response.json();

      // Transform the messages data into chat sessions
      const chatSessions = transformMessagesToChatSessions(data.messages);
      setChats(chatSessions);
    } catch (error) {
      console.error("Error fetching chats:", error);
      // Fallback to demo data if API fails
      setChats(demoChats);
    } finally {
      setLoading(false);
    }
  };

  const transformMessagesToChatSessions = (
    messages: Message[]
  ): ChatSession[] => {
    // Group messages by session (you might need to adjust this based on your data structure)
    const sessions = new Map<string, Message[]>();

    messages.forEach((message) => {
      // For now, we'll create sessions based on role_type
      const sessionKey = message.role_type;
      if (!sessions.has(sessionKey)) {
        sessions.set(sessionKey, []);
      }
      sessions.get(sessionKey)!.push(message);
    });

    return Array.from(sessions.entries()).map(
      ([sessionKey, sessionMessages], index) => {
        const lastMessage = sessionMessages[sessionMessages.length - 1];
        const firstMessage = sessionMessages[0];

        // Determine status based on message count and timing
        let status = "active";
        if (sessionMessages.length > 10) {
          status = "resolved";
        } else if (sessionMessages.length < 3) {
          status = "pending";
        }

        return {
          id: sessionKey + index,
          user: `User ${index + 1}`,
          role: lastMessage.role,
          status,
          lastMessage:
            lastMessage.content.substring(0, 50) +
            (lastMessage.content.length > 50 ? "..." : ""),
          timestamp: formatTimestamp(lastMessage.created_at),
          messages: sessionMessages.length,
        };
      }
    );
  };

  const formatTimestamp = (timestamp: string): string => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor(
      (now.getTime() - messageTime.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440)
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const filteredChats = chats.filter(
    (chat) =>
      chat.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Chat Management
            </h1>
            <p className="text-slate-400">Loading conversations...</p>
          </div>
        </div>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-700 rounded w-1/4"></div>
                    <div className="h-3 bg-slate-700 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Chat Management
          </h1>
          <p className="text-slate-400">
            Monitor and manage customer conversations
          </p>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Badge
                variant="outline"
                className="text-slate-300 border-slate-600"
              >
                All ({filteredChats.length})
              </Badge>
              <Badge
                variant="outline"
                className="text-green-400 border-green-600"
              >
                Active (
                {filteredChats.filter((c) => c.status === "active").length})
              </Badge>
              <Badge
                variant="outline"
                className="text-yellow-400 border-yellow-600"
              >
                Pending (
                {filteredChats.filter((c) => c.status === "pending").length})
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredChats.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400">No conversations found</p>
              </div>
            ) : (
              filteredChats.map((chat) => (
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
                        <Badge
                          variant="outline"
                          className="text-xs text-slate-300 border-slate-600"
                        >
                          {chat.role}
                        </Badge>
                        <div
                          className={`w-2 h-2 rounded-full ${getStatusColor(
                            chat.status
                          )}`}
                        />
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                        {chat.lastMessage}
                      </p>
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
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Fallback demo data
const demoChats = [
  {
    id: "1",
    user: "User 1",
    role: "Human",
    status: "active",
    lastMessage: "Hello, I need help with my account",
    timestamp: "2 minutes ago",
    messages: 12,
  },
  {
    id: "2",
    user: "User 2",
    role: "Human",
    status: "resolved",
    lastMessage: "Thank you for your help",
    timestamp: "15 minutes ago",
    messages: 8,
  },
  {
    id: "3",
    user: "User 3",
    role: "Human",
    status: "pending",
    lastMessage: "Can you assist me with this issue?",
    timestamp: "1 hour ago",
    messages: 5,
  },
  {
    id: "4",
    user: "User 4",
    role: "Human",
    status: "active",
    lastMessage: "I have a question about the service",
    timestamp: "2 hours ago",
    messages: 15,
  },
  {
    id: "5",
    user: "User 5",
    role: "Human",
    status: "resolved",
    lastMessage: "Everything is working now, thanks!",
    timestamp: "3 hours ago",
    messages: 6,
  },
];
