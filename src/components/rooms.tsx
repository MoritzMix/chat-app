import { PrismaClient } from "@prisma/client";
import RoomEntry from "./roomEntry";
import { ScrollArea } from "./ui/scroll-area";

const prisma = new PrismaClient();

export default async function RoomList() {
  const rooms = await prisma.room.findMany({
    include: {
      _count: {
        select: { Message: true },
      },
    },
  });

  return (
    <ScrollArea style={{ height: "calc(100vh - 200px)" }}>
      <ul className="divide-y divide-chat-purple-lightest md:pt-6">
        {rooms.map((room) => (
          <RoomEntry key={room.id} {...room} />
        ))}
      </ul>
    </ScrollArea>
  );
}
