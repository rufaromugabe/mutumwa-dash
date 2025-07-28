"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MessageSquare,
  User,
  Clock,
  Bot,
  Copy,
  Check,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Session } from "@/interfaces/sessions";
import type { Message, MessagesResponse } from "@/interfaces";

export function ChatManagement() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch("/api/sessions");
      if (!response.ok) throw new Error("Failed to fetch sessions");
      const data = await response.json();
      setSessions(data.sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const openSession = async (session: Session) => {
    setSelectedSession(session);
    setMessagesLoading(true);
    try {
      const response = await fetch(`/api/chats?sessionId=${session.id}`);
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data: MessagesResponse = await response.json();
      setMessages(
        data.messages.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    } finally {
      setMessagesLoading(false);
    }
  };

  const copyMessage = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      console.error("Failed to copy message:", error);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString([], {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const filteredSessions = sessions.filter(
    (session) =>
      (session.metadata?.name || `Chat${session.id}`)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      session.user_id.toLowerCase().includes(searchTerm.toLowerCase())
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

  if (selectedSession) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
            onClick={() => setSelectedSession(null)}
          >
            <span>←</span>
            <span>Back to sessions</span>
          </button>
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className="text-slate-300 border-slate-600"
            >
              {messages.length} messages
            </Badge>
          </div>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {selectedSession.metadata?.name ||
                    `Chat ${selectedSession.id}`}
                </h2>
                <p className="text-sm text-slate-400">
                  Started {formatTime(selectedSession.created_at)}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="h-[600px] overflow-y-auto">
              {messagesLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex items-center space-x-2 text-slate-400">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <span>Loading messages...</span>
                  </div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400">
                      No messages in this chat yet.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-1 p-4">
                  {messages.map((msg, idx) => {
                    const isUser = msg.role === "Human";
                    const isConsecutive =
                      idx > 0 && messages[idx - 1].role === msg.role;

                    return (
                      <div
                        key={msg.uuid}
                        className={`flex ${
                          isUser ? "justify-end" : "justify-start"
                        } ${isConsecutive ? "mt-1" : "mt-4"}`}
                      >
                        <div
                          className={`flex items-end space-x-2 max-w-[80%] ${
                            isUser
                              ? "flex-row-reverse space-x-reverse"
                              : "flex-row"
                          }`}
                        >
                          {/* Avatar */}
                          {!isConsecutive && (
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isUser ? "bg-blue-500" : "bg-slate-600"
                              }`}
                            >
                              {isUser ? (
                                <User className="w-4 h-4 text-white" />
                              ) : (
                                <Bot className="w-4 h-4 text-white" />
                              )}
                            </div>
                          )}
                          {isConsecutive && <div className="w-8" />}

                          {/* Message bubble */}
                          <div className="group relative">
                            <div
                              className={`relative px-4 py-3 rounded-2xl shadow-sm ${
                                isUser
                                  ? "bg-blue-600 text-white rounded-br-md"
                                  : "bg-slate-700 text-slate-100 rounded-bl-md"
                              }`}
                            >
                              {/* Message content */}
                              <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                {msg.content}
                              </div>

                              {/* Copy button */}
                              <button
                                onClick={() =>
                                  copyMessage(msg.content, msg.uuid)
                                }
                                className={`absolute -top-2 ${
                                  isUser ? "-left-2" : "-right-2"
                                } 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                  bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white
                                  rounded-full p-1.5 shadow-lg border border-slate-600`}
                              >
                                {copiedMessageId === msg.uuid ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>

                            {/* Timestamp */}
                            {!isConsecutive && (
                              <div
                                className={`flex items-center mt-1 space-x-1 ${
                                  isUser ? "justify-end" : "justify-start"
                                }`}
                              >
                                <Clock className="w-3 h-3 text-slate-500" />
                                <span className="text-xs text-slate-500">
                                  {formatTime(msg.created_at)}
                                </span>
                                <Badge
                                  variant="outline"
                                  className="text-xs border-slate-600 text-slate-400 px-1.5 py-0"
                                >
                                  {msg.role}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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
                All ({filteredSessions.length})
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSessions.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No conversations found</p>
              </div>
            ) : (
              filteredSessions.map((session, idx) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer border border-transparent hover:border-slate-600"
                  onClick={() => openSession(session)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-white">
                          {session.metadata?.name || `Chat ${idx + 1}`}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                        Created: {new Date(session.created_at).toLocaleString()}
                      </p>
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
