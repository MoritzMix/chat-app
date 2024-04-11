"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

export default function Websuck() {
  const router = useRouter();

  useEffect(() => {
    socket.on("message2", (data) => {
      console.log("Recieved from SERVER ::", data);
      // Execute any command
      router.refresh();
    });
  }, [socket]);
  return <div>Hello World!</div>;
}
