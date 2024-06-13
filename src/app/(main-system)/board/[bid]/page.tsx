'use client'

import { useEffect, useState } from "react"
import { Board, BoardJSON, Card, List } from "../../../../../interface"
import GetBoardById from "@/lib/GetBoardById";
import BoardNav from "@/components/ControlSystem/boardNav";
import CreateList from "@/lib/CreateList";
import ServerActionRevalidate from "@/lib/RevalidateAction";
import DeleteListById from "@/lib/DeleteListById";
import CardList from "@/components/Board/CardList";
import Image from "next/image";

export default function BoardIdPage ({params} : {params: {bid : string}}) {
    const [board, setBoard] = useState<Board | null>();
    const [lists, setLists] = useState<List[]>([]);
    useEffect(() => {
        const LoadList = async () => {
            const board = await GetBoardById(params.bid);
            if (board) {
                setBoard(board);
                setLists(board.lists);
            }
        }
        setTimeout(() => {

        }, 1000);
        LoadList();
        
    }, [lists]);

    if (!board) {
        return null;
    }


    const uuid = crypto.randomUUID();
    const makeList = (bid: string) => {
        const list:List = {
            id: uuid,
            name: "List 1",
            description: "To-do",
            cards: [],
            board: bid
        }
        return list;
    }

    const uuid2 = crypto.randomUUID();

    const makeCard = (lid: string) => {
        const card: Card = {
            id: uuid2,
            name: "Card 1",
            description: "hehe",
            date_start: "today",
            date_end: "tomorrow",
            color: "",
            member: [],
            list: lid
        }
        return card;
    }
    
    return (
        <main className="flex flex-col bg-orange-50 h-full ml-64">
            <BoardNav board={board}/>
            <div className="flex flex-row justify-start items-start gap-10 p-10">
                {
                    lists.map((l) => 
                        <div key={l.id} className="rounded bg-[#EFEFEF] p-5 w-[200px] flex flex-col shadow-xl">
                            <div className="flex flex-row justify-between items-center mb-2">
                                <h1 className="font-bold text-left text-xl">{l.name}</h1>
                                <Image src="/Image/dotdotdot.png" alt="Edit" width={40} height={30}/>
                            </div>
                            <CardList list={l} />
                        </div>
                    )
                }
                <button className="p-5 bg-orange-50 font-bold shadow-inner drop-shadow-xl rounded w-[200px]" onClick={() => {CreateList(makeList(params.bid), params.bid);}}>
                    + Add a List
                </button>
            </div>
        </main>
    )
}