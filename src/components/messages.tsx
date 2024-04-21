"use client";

import { MessageWithData } from "@/lib/interfaces";
import MessageEntry from "@/components/messageEntry";

import { ScrollArea } from "@/components/ui/scroll-area";

import { FC } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import io from "socket.io-client";
const socket = io("http://localhost:3001");

const MessageList = ({ messages, currentUserId, roomId }) => {
  const router = useRouter();
  const handleJoinRoom = () => {
    if (!socket) return;
    socket.emit("joinRoom", roomId);
  };

  const handleLeaveRoom = () => {
    console.log(roomId);
    if (!socket) return;
    socket.emit("leaveRoom", roomId);
  };

  const handleSocketMessage = (data) => {
    console.log("Received from SERVER ::", data);

    //Dont refresh everything
    router.refresh();
  };

  useEffect(() => {
    //ToDo reload data to get missed messages

    handleJoinRoom();
    socket.on("message", handleSocketMessage);

    // Clean up socket listeners when component unmounts
    return () => {
      handleLeaveRoom();
      socket.off("message", handleSocketMessage); // Clean up the subscription
    };
  }, [socket]);

  return (
    <ScrollArea
      style={{ height: "calc(100vh - 200px)" }}
      className="p-6 snap-y"
    >
      {messages.map((message) => (
        <MessageEntry
          key={message.id}
          message={message}
          isCurrentUser={currentUserId === message?.user?.id}
        />
      ))}
    </ScrollArea>
  );
};

export default MessageList;
