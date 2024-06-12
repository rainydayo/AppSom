'use client'

import { useAppSelector } from "@/redux/store"
import { useEffect, useState } from "react"
import { Board, BoardJSON, Card, List, User } from "../../../interface"
import GetBoards from "@/lib/GetBoards";
import DeleteBoardById from "@/lib/DeleteBoardById";
import CreateList from "@/lib/CreateList";
import DeleteListById from "@/lib/DeleteListById";
import CreateCard from "@/lib/CreateCard";
import DeleteCardById from "@/lib/DeleteCardById";
import ServerActionRevalidate from "@/lib/RevalidateAction";
import CreateBoard from "@/lib/CreateBoard";
import Link from "next/link";

export default function BoardList ({starred} : {starred: boolean}) {
    //const boards = useAppSelector((state) => state.reduxPersistedReducer.boardSlice.boards);
    const [boards, setBoards] = useState<Board[]>([]);
    useEffect(() => {
        const LoadBoards = async () => {
            const data: BoardJSON = await GetBoards();
            setBoards(data.data.filter(b => b.favorite === starred));
        }
        setTimeout(() => {

        }, 1000);
        LoadBoards();
    },[boards]);

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
        <div className="flex flex-wrap flex-row justify-start gap-10 p-10">
            <div className="bg-orange-400 rounded w-[300px] h-[150px]">
                <button className="w-full h-full p-5" onClick={() => {CreateBoard(board);}}>
                    <h1 className="text-white font-semibold">Create Board</h1>
                </button>
            </div>
            {
                boards.length > 0 ? 
                    boards.map((b) => 
                        <div key={b.id} className="bg-orange-500 rounded w-[300px] h-[150px]">
                            <Link href={`/board/${b.id}`}>
                                <button className="w-full h-full p-5">
                                    <h1 className="text-white font-semibold">{b.name}</h1>
                                </button>
                            </Link>
                        </div>
                    ) : 
                    null
            }
        </div>
    )
}