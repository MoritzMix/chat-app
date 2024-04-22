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
import { convertToLocalTime } from "@/lib/utils";

const MessageEntry: FC<MessageWithData> = ({ message, isCurrentUser }) => {
  const currentUserStyle = isCurrentUser
    ? "ml-auto bg-chat-purple-lightest border-chat-purple-light"
    : "bg-gray-100 border-gray-200";

  return (
    <Card
      className={`my-6 snap-center w-[400px] shadow-md last:animate-fade-down last:animate-once last:animate-duration-[400ms] ${currentUserStyle}`}
    >
      <CardHeader className="flex-row flex-nowrap item-center">
        <Avatar className="mr-2 h-7 w-7">
          <AvatarImage src={message.user.image || ""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="">{message.user.name}</p>
        <p className="text-sm text-muted-foreground ml-auto">
          {convertToLocalTime(message.timestamp)}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-sm leading-6">{message.content}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageEntry;
