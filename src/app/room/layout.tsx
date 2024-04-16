import Rooms from "@/components/rooms";
import { CreateRoomForm } from "@/components/createRoomForm";
import { createRoom } from "@/lib/actions";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <Header />
      <div className="h-full w-full p-12 pt-[72px] flex">
        <div className="w-1/3">
          <Rooms />
          <Separator />
          <CreateRoomForm createRoom={createRoom} />
        </div>
        <div className="w-2/3">{children}</div>
      </div>
    </div>
  );
}
