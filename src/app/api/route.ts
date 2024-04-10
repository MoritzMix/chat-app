import { NextRequest } from "next/server";

// Define the type for the event stream writer
type EventStreamWriter = WritableStreamDefaultWriter<string>;

// Keep a reference to the writer globally
let eventStreamWriter: EventStreamWriter | undefined;

export async function GET(req: NextRequest): Promise<Response> {
  try {
    // Check if an event stream writer exists
    if (!eventStreamWriter) {
      // If not, create a new TransformStream and get a writer
      const responseStream = new TransformStream();
      eventStreamWriter = responseStream.writable.getWriter();

      // Construct a response header with Event Stream content type
      const headers: Record<string, string> = {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      };

      // Return the Response with the writable stream
      return new Response(responseStream.readable, { headers });
    }

    // Construct your event data
    const eventData = { message: "Hello, World!" };

    // Write the event data to the event stream
    eventStreamWriter.write(`data: ${JSON.stringify(eventData)}\n\n`);

    // Send a response indicating success
    return new Response("Event sent successfully", { status: 200 });
  } catch (error) {
    // Handle errors if any
    console.error("Error processing GET request:", error);
    // Return an error response
    return new Response("Error processing request", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json();

    // Check if an event stream writer exists
    if (!eventStreamWriter) {
      // If not, create a new TransformStream and get a writer
      const responseStream = new TransformStream();
      eventStreamWriter = responseStream.writable.getWriter();

      // Construct a response header with Event Stream content type
      const headers: Record<string, string> = {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      };

      // Return the Response with the writable stream
      return new Response(responseStream.readable, { headers });
    }

    // Construct your event data
    const eventData = { message: JSON.stringify(data) };

    // Write the event data to the event stream
    eventStreamWriter.write(`data: ${JSON.stringify(eventData)}\n\n`);

    // Send a response indicating success
    return new Response("Event sent successfully", { status: 200 });
  } catch (error) {
    // Handle errors if any
    console.error("Error processing POST request:", error);
    // Return an error response
    return new Response("Error processing request", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
