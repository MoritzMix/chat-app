"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import socket from "@/lib/socket";

const WSHandler = () => {
  const router = useRouter();

  const handleRoomUpdate = () => {
    if (!socket) return;
    router.refresh();
    console.log("Room updated");
  };

  useEffect(() => {
    socket.on("roomUpdate", handleRoomUpdate);
    console.log("WSHandler mounted");
    // Clean up socket listeners when component unmounts
    return () => {
      console.log("WSHandler unmounted");
      socket.off("roomUpdate", handleRoomUpdate);
    };
  });

  return null;
};

export { WSHandler };
