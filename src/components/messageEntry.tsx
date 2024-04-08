"use server";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MessageSubmit from "@/components/messageSubmit";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function MessageEntry({
  params,
}: {
  params: { roomId: number };
}) {
  const { roomId = -1 } = params;

  return (
    <Card
      key={message.id}
      className="mt-2 mb-2 bg-slate-100 snap-center w-[400px]"
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
          {message.timestamp.toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">{message.content}</p>
        </div>
      </CardContent>
    </Card>
  );
}
