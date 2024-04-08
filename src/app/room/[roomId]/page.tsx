"use server";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MessageSubmit from "@/components/messageSubmit";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function ChatList({
  params,
}: {
  params: { roomId: number };
}) {
  const { roomId = -1 } = params;

  const room = await prisma.room.findUnique({
    where: { id: Number(roomId) },
  });

  const messages = await prisma.message.findMany({
    where: { room_id: Number(roomId) },
    include: {
      user: true,
    },
  });

  return (
    <div className="h-full">
      <p className="pl-6">{room?.name}</p>
      <ScrollArea
        style={{ height: "calc(100vh - 200px)" }}
        className="p-6 snap-y"
      >
        {messages.map((message) => (
          <Card
            key={message.id}
            className="mt-2 mb-2 bg-slate-100 snap-center w-[400px]"
          >
            <CardHeader className="flex-row flex-nowrap item-center">
              <Avatar className="mr-2">
                <AvatarImage src={message.user.image || ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="mt-0">
                {message.user.name} {message.user.surname}
              </p>
              <p className="text-sm text-muted-foreground ml-auto">
                {message.timestamp.toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {message.content}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
      <MessageSubmit
        className="pl-6 ml-auto w-[400px] divide-y divide-gray-200"
        roomId={roomId}
      ></MessageSubmit>
    </div>
  );
}
