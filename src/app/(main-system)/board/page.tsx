'use client'

import BoardList from "@/components/Board/BoardList"
import { ThemeProvider } from "@/components/ControlSystem/themeSet"
import Sidebar from "@/components/ControlSystem/sideBar"

export default function BoardPage () {

    return (
        <ThemeProvider>
        <main className="h-full bg-orange-50 ml-64">
            <BoardList starred={false}></BoardList>
        </main>
        </ThemeProvider>
    )
}