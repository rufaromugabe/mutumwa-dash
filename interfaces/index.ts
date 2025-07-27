interface Message {
  uuid: string;
  created_at: string; // ISO 8601 datetime string
  updated_at: string; // ISO 8601 datetime string
  role: "Human" | "AI";
  role_type: "user" | "assistant";
  content: string;
  token_count: number;
  processed: boolean;
}

interface MessagesResponse {
  messages: Message[];
  total_count: number;
  row_count: number;
}

export type { Message, MessagesResponse };
