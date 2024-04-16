import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

import Rooms from "@/components/rooms";
import { CreateRoomForm } from "@/components/createRoomForm";
import User from "@/components/user";
import { createRoom } from "@/lib/actions";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ResizablePanelGroup className="h-full" direction="horizontal">
      <ResizablePanel defaultSize={30}>
        <p className="">USER</p>
        <User />

        <Rooms />

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <CirclePlus className="mr-2 h-4 w-4" /> Create new
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-chat-purple-light">
            <DialogHeader>
              <DialogTitle>Create new room</DialogTitle>
              <DialogDescription>
                <CreateRoomForm createRoom={createRoom} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
