"use client";

import { CreateRoomForm } from "@/components/createRoomForm";
import { Separator } from "@/components/ui/separator";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { isDesktop } from "@/lib/utils";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

export function SideBar({ children }: { children: React.ReactNode }) {
  const [isOnDesktop, setIsOnDesktop] = useState(false);

  useEffect(() => {
    setIsOnDesktop(isDesktop(window));
  }, []);

  if (isOnDesktop) {
    return (
      <div className="w-1/3">
        {children}
        <Separator className=" bg-chat-purple-lightest" />
        <CreateRoomForm />
      </div>
    );
  }

  return (
    <Sheet>
      <SheetTrigger className="absolute p-2">
        <Users className="" />
      </SheetTrigger>
      <SheetContent side="left" className="w-2/3 p-0 pt-12">
        {children}
        <Separator className=" bg-chat-purple-lightest" />
        <CreateRoomForm />
      </SheetContent>
    </Sheet>
  );
}
