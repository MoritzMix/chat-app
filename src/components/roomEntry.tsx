"use client";

import { Room } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { deleteRoom } from "@/lib/actions";
import { CircleX, X } from "lucide-react";

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

  function deleteRoomHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    deleteRoom({ id });
  }

  return (
    <li
      onClick={() => router.push(`/room/${id}`)}
      className="py-4 w-full flex relative group"
    >
      <Image
        width={10}
        height={10}
        className="h-10 w-10 rounded-full"
        src={image || ""}
        alt={name}
      />

      <Button
        onClick={deleteRoomHandler}
        type="submit"
        size="icon"
        className="absolute rounded-full h-3 w-3 p-2 top-3 left-0 group-hover:visible invisible"
      >
        <CircleX className="text-white" />
      </Button>

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
