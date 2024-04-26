"use client";

import MessageEntry from "@/components/messageEntry";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import io from "socket.io-client";
import useSWR from "swr";
import { Skeleton } from "./ui/skeleton";
import { MessageWithUser } from "@/lib/interfaces";

const fetcher = (...args: unknown[]) =>
  fetch(...(args as [RequestInfo, RequestInit?])).then((res) => res.json());

const MessageList = ({
  currentUserId,
  roomId,
}: {
  currentUserId: number;
  roomId: number;
}) => {
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

  const handleSocketMessage = (data: string) => {
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
  });

  function getMessages() {
    if (isLoading) {
      return SkeletonList();
    } else {
      return messages.map((message: MessageWithUser) => (
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

function SkeletonList() {
  return (
    <>
      <SkeletonEntry />
      <SkeletonEntry />
      <SkeletonEntry />
      <SkeletonEntry />
      <SkeletonEntry />
      <SkeletonEntry />
      <SkeletonEntry />
    </>
  );
}

function SkeletonEntry(): JSX.Element {
  return (
    <div className="flex w-full md-w-[400px] items-center space-x-4 mb-12">
      <Skeleton className="h-12  rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
