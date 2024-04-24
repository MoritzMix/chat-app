import Rooms from "@/components/rooms";
import { Header } from "@/components/header";
import { SideBar } from "@/components/sideBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full w-full">
      <Header />
      <div className="h-full w-full pt-[72px] flex">
        <SideBar>
          <Rooms />
        </SideBar>
        <div className="h-full w-full md:w-2/3 md:shadow-md">{children}</div>
      </div>
    </div>
  );
}
