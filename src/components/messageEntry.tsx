"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageWithData } from "@/lib/interfaces";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FC } from "react";

const MessageEntry: FC<MessageWithData> = ({ message, isCurrentUser }) => {
  const currentUserStyle = isCurrentUser
    ? "ml-auto bg-chat-purple-lightest border-chat-purple-light"
    : "bg-chat-blue-lightest border-chat-blue-light";

  return (
    <Card
      className={`mt-2 mb-2 bg-slate-100 snap-center w-[400px] last:animate-fade-down last:animate-once last:animate-duration-[400ms] ${currentUserStyle}`}
    >
      <CardHeader className="flex-row flex-nowrap item-center">
        <Avatar className="mr-2">
          <AvatarImage src={message.user.image || ""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="mt-0">
          {message.user.name} {message.user.surname}
        </p>
        <p className="text-sm text-muted-foreground ml-auto">
          {message.timestamp.toLocaleTimeString("de")}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">{message.content}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageEntry;
