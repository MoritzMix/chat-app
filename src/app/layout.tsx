import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Rooms from "@/components/rooms";
import User from "@/components/user";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "SuperChat",
  description: "Best Chat In Th World",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = 1;

  return (
    <html lang="en">
      <body
        className={cn("bg-background font-sans antialiased", inter.variable)}
      >
        <main className="h-screen p-12">
          <ResizablePanelGroup className="h-full" direction="horizontal">
            <ResizablePanel defaultSize={30}>
              <p className="">USER</p>
              <User />

              <Rooms />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={70}>{children}</ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </body>
    </html>
  );
}
