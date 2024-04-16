"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

export default function WsSubscribe() {
  const router = useRouter();

  useEffect(() => {
    const handleSocketMessage = (data) => {
      console.log("Received from SERVER ::", data);
      // Execute any command
      router.refresh();
    };

    socket.on("message2", handleSocketMessage);

    return () => {
      socket.off("message2", handleSocketMessage); // Clean up the subscription
    };
  }, [socket, router]);

  return null;
}
