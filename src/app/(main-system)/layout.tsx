'use client'
import Sidebar from "@/components/ControlSystem/sideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Sidebar/>
        {children}
    </>
  );
}