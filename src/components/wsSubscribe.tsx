"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
const socket = io("http://localhost:3001");

export default function WsSubscribe() {
  const router = useRouter();

  useEffect(() => {
    const handleSocketMessage = (data) => {
      console.log("Received from SERVER ::", data);

      //Dont refresh everything
      router.refresh();
    };

    socket.on("message", handleSocketMessage);

    return () => {
      console.log("Unsubscribing from socket.io");
      socket.off("message", handleSocketMessage); // Clean up the subscription
    };
  }, [socket, router]);

  return null;
}
