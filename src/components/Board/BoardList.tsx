'use client';

import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { Board, BoardJSON, List, User } from "../../../interface";
import GetBoards from "@/lib/GetBoards";
import CreateBoard from "@/lib/CreateBoard";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CreateList from "@/lib/CreateList";

export default function BoardList({ starred }: { starred: boolean }) {
    const [boards, setBoards] = useState<Board[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("a-z");
    const {data: session} = useSession();

    if (!session) {
        return null;
    }
    useEffect(() => {
        const LoadBoards = async () => {
            const data: BoardJSON = await GetBoards();
            const filteredBoards = data.data.filter(b => (b.favorite === starred && (b.owner === session.user.id || b.member.includes(session.user.id))));
            setBoards(filteredBoards);
        };
        LoadBoards();
    }, [starred, boards]);

    const sortedBoards = [...boards].sort((a, b) => {
        if (sortOrder === "a-z") {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    const filteredBoards = sortedBoards.filter(board =>
        board.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const uuid = crypto.randomUUID();
    const uuid_l_1 = crypto.randomUUID();
    const uuid_l_2 = crypto.randomUUID();
    const uuid_l_3 = crypto.randomUUID();

    const board: Board = {
        id: crypto.randomUUID(),
        name: "My Board 3",
        description: "This is my board 3",
        lists: [],
        favorite: starred,
        owner: session.user.id,
        member: [session.user.id],
        color: ""
    };

    const createTemplateList = async (bid: string) => {
        const to_do: List = {
            id: crypto.randomUUID(),
            name: "To-Do",
            description: "To-Do List",
            cards: [],
            board: bid
        }
        const doing: List = {
            id: crypto.randomUUID(),
            name: "Doing",
            description: "Doing List",
            cards: [],
            board: bid
        }
        const done: List = {
            id: crypto.randomUUID(),
            name: "Done",
            description: "Doing List",
            cards: [],
            board: bid
        }
        await CreateList(to_do, bid);
        await CreateList(doing, bid);
        await CreateList(done, bid);
    }
    

    return (
        <div className="flex flex-col">
            <div className="p-10 text-3xl font-bold">
                Board
            </div>
            <div className="flex flex-row px-10 font-semibold text-xl justify-between">
                <div>
                    <div className="pb-2">Sort By</div>
                    <select 
                        className="px-16 py-2 rounded border-2 border-gray-500"
                        onChange={(e) => setSortOrder(e.target.value)} 
                        value={sortOrder} >
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option>
                    </select>
                </div>
                <div>
                    <div className="pb-2">Search</div>
                    <input 
                        className="px-1 py-2 rounded border-2 border-gray-500"
                        type="text"
                        placeholder="Search boards.."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-wrap flex-row justify-start gap-10 p-10">
                <div className="bg-orange-400 rounded w-[300px] h-[150px]">
                    <button className="w-full h-full p-5" onClick={() => { CreateBoard(board); createTemplateList(board.id); }}>
                        <h1 className="text-white font-semibold">Create Board</h1>
                    </button>
                </div>
                {filteredBoards.length > 0 ? 
                    filteredBoards.map((b) => 
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
        </div>
    );
}
