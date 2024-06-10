'use client'

import { AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { Board, User } from "../../../interface";
import { addBoard } from "@/redux/feature/boardSlice";
import GetDataFromJson from "@/lib/GetDataFromJson";

export default function CreateBoard () {
    //const dispatch = useDispatch<AppDispatch>();

    const createBoard = async () => {
        const user: User = {
            id: "ADMIN",
            name: "Jason",
            email: "jason@jason.com",
            password: "12345678",
            tel: "0987654321",
            role: "admin",
            image: ""
        }
        const board: Board = {
            id: "B0003",
            name: "My Board 3",
            description: "This is my board 3",
            lists: [],
            favorite: false,
            owner: user,
            member: [user],
            color: ""
        }

        //dispatch(addBoard(board));

        const response = await fetch('/api/create-board', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(board)
        });

        if (response.ok) {
            alert("Board created and saved to JSON file");
            console.log(board);
        } else {
            alert("Failed to save the board to JSON file");
        }
        const boardData = await GetDataFromJson('Storage/Board/board.json');
        console.log(boardData)
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
