'use client'

import { AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { Board, User } from "../../../interface";
import { addBoard } from "@/redux/feature/boardSlice";

export default function CreateBoard () {
    const dispatch = useDispatch<AppDispatch>();

    const createBoard = () => {
        const user:User = {
            id: "ADMIN",
            name: "Jason",
            email: "jason@jason.com",
            password: "12345678",
            tel: "0987654321",
            role: "admin",
            image: ""
        }
        const board:Board = {
            id: "B0002",
            name: "My Board 2",
            description: "This is my board",
            lists: [],
            favorite: false,
            owner: user,
            member: [user],
            color: ""
        }
        dispatch(addBoard(board));
        alert("board created");
        console.log(board);
    }

    return (
        <main className="flex flex-row justify-center h-screen">
            <div>
                <button className="bg-black text-white px-3 py-2 rounded"
                onClick={() => createBoard()}>
                    Create Board
                </button>
            </div>
        </main>
    )
}