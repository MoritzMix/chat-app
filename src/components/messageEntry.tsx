"use server";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Message } from "@prisma/client";

const currentUser = 90;

export default async function MessageEntry({
  id,
  user, // why though??
  content,
  timestamp
}:Message) {

  
const stupidCode =currentUser===user.id ? "ml-auto bg-[lightblue]"  :"";

  return (
    <Card
      key={id}
      className={`mt-2 mb-2 bg-slate-100 snap-center w-[400px]  ${stupidCode}`}
    >                             
      <CardHeader className="flex-row flex-nowrap item-center">
        <Avatar className="mr-2">
          <AvatarImage src={user.image || ""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="mt-0">
          {user.name} {user.surname}
        </p>
        <p className="text-sm text-muted-foreground ml-auto">
          {timestamp.toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">{content}</p>
        </div>
      </CardContent>
    </Card>
  );
}
