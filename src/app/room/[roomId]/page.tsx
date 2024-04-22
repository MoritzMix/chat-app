"use server";

import MessageSubmit from "@/components/messageSubmit";
import { Separator } from "@/components/ui/separator";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { auth } from "@/auth";
import MessageList from "@/components/messages";

export default async function ChatList({
  params,
}: {
  params: { roomId: number };
}) {
  const { roomId = -1 } = params;

  const room = await prisma.room.findUnique({
    where: { id: Number(roomId) },
  });

  //probably should exclude pwhash and email

  const currentUser = await auth();
  const currentUserId = Number(currentUser?.user?.id);

  return (
    <div className="h-full bg-white">
      <p className="pl-6">{room?.name}</p>
      <Separator />
      <MessageList currentUserId={currentUserId} roomId={room?.id} />
      <MessageSubmit
        className="pl-6 ml-auto w-[400px]"
        roomId={roomId}
      ></MessageSubmit>
    </div>
  );
}
