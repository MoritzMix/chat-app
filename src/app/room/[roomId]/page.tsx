"use server";

import MessageSubmit from "@/components/messageSubmit";
import MessageEntry from "@/components/messageEntry";

import { ScrollArea } from "@/components/ui/scroll-area";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { auth } from "@/auth";

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
  //ToDo order by timestamp
  const messages = await prisma.message.findMany({
    where: { room_id: Number(roomId) },
    include: {
      user: true,
    },
  });

  const currentUser = await auth();
  const currentUserId = Number(currentUser?.user?.id);

  return (
    <div className="h-full">
      <p className="pl-6">{room?.name}</p>
      <ScrollArea
        style={{ height: "calc(100vh - 200px)" }}
        className="p-6 snap-y"
      >
        {messages.map((message) => (
          <MessageEntry
            key={message.id}
            message={message}
            isCurrentUser={currentUserId === message?.user?.id}
          />
        ))}
      </ScrollArea>
      <MessageSubmit
        className="pl-6 ml-auto w-[400px]"
        roomId={roomId}
      ></MessageSubmit>
    </div>
  );
}
