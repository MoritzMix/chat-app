"use client";

import MessageEntry from "@/components/messageEntry";

import { ScrollArea } from "@/components/ui/scroll-area";

import { FC } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import io from "socket.io-client";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MessageList = ({ currentUserId, roomId }) => {
  const router = useRouter();
  const socket = io("http://localhost:3001");

  const { data, error, isLoading, mutate } = useSWR(
    `/api/messages/${roomId}`,
    fetcher
  );
  const messages = data?.data;

  const handleJoinRoom = () => {
    if (!socket) return;
    socket.emit("joinRoom", roomId);
  };

  const handleLeaveRoom = () => {
    if (!socket) return;
    socket.emit("leaveRoom", roomId);
  };

  const handleSocketMessage = (data) => {
    console.log("Received from SERVER ::", data);
    mutate();
  };

  useEffect(() => {
    handleJoinRoom();
    socket.on("message", handleSocketMessage);
    socket.on("userUpdate", handleSocketMessage);

    // Clean up socket listeners when component unmounts
    return () => {
      handleLeaveRoom();
      socket.off("message", handleSocketMessage); // Clean up the subscription
    };
  }, [socket]);

  function getMessages() {
    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return messages.map((message) => (
        <MessageEntry
          key={message.id}
          message={message}
          isCurrentUser={currentUserId === message?.user?.id}
        />
      ));
    }
  }

  return (
    <ScrollArea
      style={{ height: "calc(100vh - 200px)" }}
      className="p-6 snap-y"
    >
      {getMessages()}
    </ScrollArea>
  );
};

export default MessageList;
