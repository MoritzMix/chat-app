import { PrismaClient } from "@prisma/client";
import RoomEntry from "./roomEntry";

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
    <ul className="divide-y divide-gray-200 pt-6">
      {rooms.map((room) => (
        <RoomEntry key={room.id} {...room} />
      ))}
    </ul>
  );
}
