//import next request and response
import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { roomId: string } },
) {
  //get params id
  const roomId = parseInt(params.roomId);

  console.log("Room ID", params);

  //get detail notes
  const messages = await prisma.message.findMany({
    where: { room_id: Number(roomId) },
    include: {
      user: true,
    },
    orderBy: {
      timestamp: "asc",
    },
  });

  if (!messages) {
    //return response JSON
    return NextResponse.json(
      {
        sucess: true,
        message: "Messages not found!",
        data: [],
      },
      {
        status: 404,
      },
    );
  }

  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: "Detail Data Note",
      data: messages,
    },
    {
      status: 200,
    },
  );
}
