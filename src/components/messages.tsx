"use client";

import MessageEntry from "@/components/messageEntry";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";

import useSWR from "swr";
import { Skeleton } from "./ui/skeleton";
import { MessageWithUser } from "@/lib/interfaces";
import socket from "@/lib/socket";

const fetcher = (...args: unknown[]) =>
  fetch(...(args as [RequestInfo, RequestInit?])).then((res) => res.json());

const MessageList = ({
  currentUserId,
  roomId,
}: {
  currentUserId: number;
  roomId: number;
}) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/messages/${roomId}`,
    fetcher,
  );
  const messages = data?.data;

  useEffect(() => {
    const handleSocketMessage = (data: string) => {
      console.log("Received from SERVER ::", data);
      mutate();
    };

    if (socket) {
      socket.emit("joinRoom", roomId);
      socket.on("message", handleSocketMessage);
      socket.on("userUpdate", handleSocketMessage);
    }

    // Clean up socket listeners when component unmounts
    return () => {
      if (socket) {
        socket.emit("leaveRoom", roomId);
        socket.off("userUpdate", handleSocketMessage);
      }
    };
  }, [roomId]);

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
