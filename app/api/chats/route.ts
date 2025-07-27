import { NextRequest, NextResponse } from "next/server";
import { MessagesResponse } from "@/interfaces/index";

const ZEP_API_BASE_URL = "https://api.getzep.com/api/v2";
const ZEP_API_KEY =
  "z_1dWlkIjoiZTI2ZTVkNmMtMWY3Yy00ZjViLTg2YTEtYmI1MDk0ZDhjYmUzIn0.4Ja1isVIFvP_fCn0R_PzpyefJbucLmbiwn3v5SQPWryWtk1RKJESZKQ3sk1DFMn31Uk39_gyNDL0MSD2QWH3xQ";

export async function GET(request: NextRequest) {
  try {
    // Get session ID from query parameters, default to '6' as in the curl example
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId") || "6";

    // Make request to Zep API
    const response = await fetch(
      `${ZEP_API_BASE_URL}/sessions/${sessionId}/messages`,
      {
        method: "GET",
        headers: {
          Authorization: `Api-Key ${ZEP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Zep API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // Transform the data to match your interface structure
    // Assuming the Zep API returns an array of messages
    const messages = Array.isArray(data) ? data : data.messages || [];

    const transformedMessages = messages.map((message: any) => ({
      uuid: message.uuid || message.id || crypto.randomUUID(),
      created_at:
        message.created_at || message.createdAt || new Date().toISOString(),
      updated_at:
        message.updated_at || message.updatedAt || new Date().toISOString(),
      role: message.role || "Human",
      role_type: message.role_type || message.roleType || "user",
      content: message.content || "",
      token_count: message.token_count || message.tokenCount || 0,
      processed: message.processed || false,
    }));

    const responseData: MessagesResponse = {
      messages: transformedMessages,
      total_count: transformedMessages.length,
      row_count: transformedMessages.length,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching messages from Zep API:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
