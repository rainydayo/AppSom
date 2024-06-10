'use client'

import { useAppSelector } from "@/redux/store"
import { useEffect, useState } from "react"
import { Board } from "../../../interface"
import GetBoards from "@/lib/GetBoards";
import DeleteBoardById from "@/lib/DeleteBoardByID";

export default function BoardList () {
    //const boards = useAppSelector((state) => state.reduxPersistedReducer.boardSlice.boards);
    const [boards, setBoards] = useState<Board[]>([]);
    useEffect(() => {
        const LoadBoards = async () => {
            const data = await GetBoards();
            setBoards(data.data);
        }
        LoadBoards();
    },[]);
    return (
        <div>
            {
                boards.length > 0 ? 
                    boards.map((b) => 
                        <div key={b.id} className="bg-slate-200 rounded p-3">
                            <h1>
                                Name: {b.name}
                            </h1>
                            <h2>
                                Description: {b.description}
                            </h2>
                            <h3>
                                Favorite: {b.favorite? "True" : "False"}
                            </h3>
                            <h3>
                                Owner: {b.owner? b.owner.name : "Jason"}
                            </h3>
                            <h3>
                                Members: {b.member.map((m) => <h3>- {m.name}</h3>)}
                            </h3>
                            <button className="px-3 py-2 bg-red-600 text-white rounded" onClick={() => {DeleteBoardById(b.id); window.location.reload()}}>
                                Delete
                            </button>
                        </div>
                    ) : 
                    <div>
                        No boards
                    </div>
            }
        </div>
    )
}