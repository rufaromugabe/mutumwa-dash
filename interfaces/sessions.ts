// Metadata interface
interface Metadata {
  name: string;
}

// Individual session interface
interface Session {
  uuid: string;
  id: number;
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
  deleted_at: string | null;
  ended_at: string | null;
  project_uuid: string;
  session_id: string;
  user_id: string;
  metadata: Metadata | null;
  facts: unknown | null; // Type not specified, using unknown
  classifications: unknown | null; // Type not specified, using unknown
}

// Main response interface
interface SessionsResponse {
  sessions: Session[];
  total_count: number;
  response_count: number;
}

export type { SessionsResponse, Session };
