import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  const message = "Hello, World!";

  const eventData = { message: `Received "${message}"` };
  const responseMsg = `data: ${JSON.stringify(eventData)}\n\n`;
  writer.write(encoder.encode(responseMsg));

  return new Response(responseStream.readable, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
