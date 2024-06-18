'use client'

import BoardList from "@/components/Board/BoardList"
import { ThemeProvider } from "@/components/ControlSystem/themeSet"
import Sidebar from "@/components/ControlSystem/sideBar"

export default function StarredPage () {

    return (
        <ThemeProvider>
        <main className="min-h-screen bg-somon ml-64">
            <BoardList starred={true}></BoardList>
        </main>
        </ThemeProvider>
    )
}