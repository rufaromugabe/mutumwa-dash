import { NextRequest, NextResponse } from "next/server";
import { Session, SessionsResponse } from "@/interfaces/sessions";

const ZEP_API_BASE_URL = "https://api.getzep.com/api/v2";
const ZEP_API_KEY =
  "z_1dWlkIjoiZTI2ZTVkNmMtMWY3Yy00ZjViLTg2YTEtYmI1MDk0ZDhjYmUzIn0.4Ja1isVIFvP_fCn0R_PzpyefJbucLmbiwn3v5SQPWryWtk1RKJESZKQ3sk1DFMn31Uk39_gyNDL0MSD2QWH3xQ";

export async function GET(request: NextRequest) {
  try {
    // Fetch sessions from Zep API
    const response = await fetch(`${ZEP_API_BASE_URL}/sessions-ordered`, {
      method: "GET",
      headers: {
        Authorization: `Api-Key ${ZEP_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Zep API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // Map sessions to ensure metadata.name is set if metadata is null
    const sessions: Session[] = (data.sessions || []).map(
      (session: Session, idx: number) => {
        if (!session.metadata) {
          session.metadata = { name: `Chat${idx + 1}` };
        }
        return session;
      }
    );

    const result: SessionsResponse = {
      sessions,
      total_count: data.total_count || sessions.length,
      response_count: data.response_count || sessions.length,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching sessions from Zep API:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}
