"use client";

import { Room } from "@prisma/client";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { deleteRoom } from "@/lib/actions";
import { CircleX, X } from "lucide-react";

export default function RoomEntry({ id, description, name, image }: Room) {
  const router = useRouter();

  function deleteRoomHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    deleteRoom({ id });
  }

  const { roomId } = useParams();
  const currentRoomStyle =
    roomId === String(id) ? "bg-chat-purple-lightest" : "";

  function updateRoomHandler() {
    router.push(`/room/${id}`);
  }

  return (
    <li
      onClick={updateRoomHandler}
      className={`py-4 pl-6 w-full flex relative group cursor-pointer transition-colors ${currentRoomStyle}`}
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
        className="absolute rounded-full h-3 w-3 p-2 top-4 left-4 group-hover:visible invisible"
      >
        <CircleX className="text-white" />
      </Button>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </li>
  );
}
