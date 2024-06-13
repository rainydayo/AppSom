'use client'
import Sidebar from "@/components/ControlSystem/sideBar";
import { ThemeProvider } from "@/components/ControlSystem/themeSet";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <ThemeProvider>
        <Sidebar/>
        {children}
    </ThemeProvider>
    </>
  );
}