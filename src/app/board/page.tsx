'use client'

import BoardList from "@/components/Board/BoardList"
import GetDataFromJson from "@/lib/GetDataFromJson"
import { Board, User } from "../../../interface"
import { revalidateTag } from "next/cache"
import CreateBoard from "@/lib/CreateBoard"
import { randomUUID } from "crypto"

export default function MyBoard () {

    
    const user: User = {
        id: "ADMIN",
        name: "Jason",
        email: "jason@jason.com",
        password: "12345678",
        tel: "0987654321",
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
        <main className="h-screen bg-red-100 flex flex-col">
            <BoardList></BoardList>
            <div className="flex flex-row justify-center">
                <button className="bg-black text-white px-3 py-2 rounded"
                onClick={() => {CreateBoard(board); window.location.reload();}}>
                    Create Board
                </button>
            </div>
        </main>
    )
}