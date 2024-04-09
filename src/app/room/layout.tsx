import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Rooms from "@/components/rooms";
import User from "@/components/user";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = 1;

  return (
    <ResizablePanelGroup className="h-full" direction="horizontal">
      <ResizablePanel defaultSize={30}>
        <p className="">USER</p>
        <User />

        <Rooms />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
