import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

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
        <CreateRoomForm createRoom={createRoom} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
