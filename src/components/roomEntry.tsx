"use client";

import { Room } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface RoomWithCount extends Room {
  _count: {
    Message: number;
  };
}

export default function RoomEntry({
  id,
  name,
  description,
  image,
  _count,
}: RoomWithCount) {
  const router = useRouter();

  return (
    <li onClick={() => router.push(`/room/${id}`)} className="py-4 w-full flex">
      <Image
        width={10}
        height={10}
        className="h-10 w-10 rounded-full"
        src={image || ""}
        alt={name}
      />

      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <p className="text-xs text-muted-foreground ml-auto mr-3">
        {_count.Message} Messages
      </p>
    </li>
  );
}
