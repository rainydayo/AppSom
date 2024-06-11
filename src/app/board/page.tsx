'use client'

import BoardList from "@/components/Board/BoardList"
import GetDataFromJson from "@/lib/GetDataFromJson"
import { Board, User } from "../../../interface"
import { revalidateTag } from "next/cache"
import CreateBoard from "@/lib/CreateBoard"
import { randomUUID } from "crypto"
import ServerActionRevalidate from "@/lib/RevalidateAction"
import { ThemeProvider } from "@/components/ControlSystem/themeSet"
import Sidebar from "@/components/ControlSystem/sideBar"

export default function MyBoard () {

    
    const user: User = {
        id: "ADMIN",
        name: "Jason",
        username: "God",
        password: "12345678",
        role: "admin",
        image: ""
    }
    const uuid = crypto.randomUUID();
    const board: Board = {
        id: uuid,
        name: "My Board 3",
        description: "This is my board 3",
        lists: [],
        favorite: false,
        owner: user,
        member: [user],
        color: ""
    }
    

    return (
        <ThemeProvider>
        <main className="h-screen bg-red-100 flex flex-col">
            <Sidebar/>
            <BoardList userProfile={user}></BoardList>
            <div className="flex flex-row justify-center">
                <button className="bg-black text-white px-3 py-2 rounded"
                onClick={() => {CreateBoard(board); ServerActionRevalidate();}}>
                    Create Board
                </button>
            </div>
        </main>
        </ThemeProvider>
    )
}