'use client';

import { useEffect, useState } from "react";
import { Board, List, Card } from "../../../../../interface";
import GetBoardById from "@/lib/GetBoardById";
import BoardNav from "@/components/ControlSystem/boardNav";
import CreateList from "@/lib/CreateList";
import CardList from "@/components/Board/CardList";
import Image from "next/image";
import AddListPopup from "@/components/Board/AddListPopup";

interface BoardIdPageProps {
    params: {
        bid: string;
    };
}

const BoardIdPage: React.FC<BoardIdPageProps> = ({ params }) => {
    const [board, setBoard] = useState<Board | null>(null);
    const [lists, setLists] = useState<List[]>([]);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    useEffect(() => {
        const loadList = async () => {
            const board = await GetBoardById(params.bid);
            if (board) {
                setBoard(board);
                setLists(board.lists);
            }
        };
        loadList();
    }, [params.bid, lists]);

    if (!board) {
        return null;
    }

    const handleAddList = (name: string, description: string) => {
        const uuid = crypto.randomUUID();
        const newList: List = {
            id: uuid,
            name,
            description,
            cards: [],
            board: params.bid,
        };
        CreateList(newList, params.bid);
        setLists([...lists, newList]);
    };

    return (
        <main className="flex flex-col bg-somon h-full ml-64">
            <BoardNav board={board} />
            <div className="flex flex-row justify-start items-start gap-10 p-10">
                {lists.map((l) => (
                    <div key={l.id} className="rounded bg-[#EFEFEF] p-5 w-[200px] flex flex-col shadow-xl">
                        <div className="flex flex-row justify-between items-center mb-2">
                            <h1 className="font-bold text-left text-xl">{l.name}</h1>
                            <Image src="/Image/dotdotdot.png" alt="Edit" width={40} height={30} />
                        </div>
                        <CardList list={l} />
                    </div>
                ))}
                <button
                    className="p-5 bg-somon font-bold shadow-inner drop-shadow-xl rounded w-[200px]"
                    onClick={() => setShowPopup(true)}
                >
                    + Add a List
                </button>
            </div>
            {showPopup && (
                <AddListPopup
                    onClose={() => setShowPopup(false)}
                    onSave={handleAddList}
                />
            )}
        </main>
    );
};

export default BoardIdPage;
