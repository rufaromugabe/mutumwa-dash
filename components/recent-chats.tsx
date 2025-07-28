import { useEffect, useState } from "react";
import { Session } from "@/interfaces/sessions";
import { Message, MessagesResponse } from "@/interfaces";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function RecentChats() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

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
      // Sort messages by created_at ascending
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

  if (loading) {
    return (
      <div className="text-center py-8 text-slate-400">Loading sessions...</div>
    );
  }

  if (selectedSession) {
    return (
      <div>
        <button
          className="mb-4 text-blue-400 underline"
          onClick={() => setSelectedSession(null)}
        >
          ← Back to sessions
        </button>
        <h2 className="text-xl font-bold mb-2 text-white">
          {selectedSession.metadata?.name || `Chat${selectedSession.id}`}
        </h2>
        {messagesLoading ? (
          <div className="text-slate-400">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-slate-400">No messages in this chat.</div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={msg.uuid}
                className={`flex ${
                  idx % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div className="max-w-md p-3 rounded-lg bg-slate-700 text-white">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge
                      variant="outline"
                      className="text-xs border-slate-600"
                    >
                      {msg.role}
                    </Badge>
                    <span className="text-xs text-slate-400">
                      {new Date(msg.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <div>{msg.content}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          No recent conversations
        </div>
      ) : (
        sessions.map((session, idx) => (
          <div
            key={session.id}
            className="flex items-start space-x-3 cursor-pointer hover:bg-slate-700 p-2 rounded"
            onClick={() => openSession(session)}
          >
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-blue-500 text-white text-xs">
                {(session.metadata?.name || `Chat${idx + 1}`)
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-white">
                  {session.metadata?.name || `Chat${idx + 1}`}
                </p>
              </div>
              <p className="text-xs text-slate-500">
                Created: {new Date(session.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
