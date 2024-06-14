// app/(mainpage)/board/[bid]/page.tsx
'use client';

import { useEffect, useState } from "react";
import { Board, List } from "../../../../../interface";
import GetBoardById from "@/lib/GetBoardById";
import BoardNav from "@/components/ControlSystem/boardNav";
import CreateList from "@/lib/CreateList";
import CardList from "@/components/Board/CardList";
import Image from "next/image";
import AddListPopup from "@/components/Board/AddListPopup";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import UpdateBoardById from "@/lib/UpdateBoardById";

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
                console.log("Board loaded:", board);
                setBoard(board);
                setLists(board.lists);
            } else {
                console.error("Failed to load board");
            }
        };
        loadList();
    }, [params.bid]);

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
        console.log("Adding new list:", newList);
        CreateList(newList, params.bid);
        setLists([...lists, newList]);
    };

    const handleDragEnd = async (result: DropResult) => {
        const { destination, source, type } = result;
        console.log("Drag result:", result);

        if (!destination) return;

        if (type === "list") {
            const newLists = Array.from(lists);
            const [movedList] = newLists.splice(source.index, 1);
            newLists.splice(destination.index, 0, movedList);
            setLists(newLists);
            const updatedBoard = { ...board, lists: newLists };
            setBoard(updatedBoard);
            await UpdateBoardById(board.id, updatedBoard);
        } else {
            const sourceListIndex = lists.findIndex((list) => list.id === source.droppableId);
            const destinationListIndex = lists.findIndex((list) => list.id === destination.droppableId);

            if (sourceListIndex === -1 || destinationListIndex === -1) return;

            const sourceCards = Array.from(lists[sourceListIndex].cards);
            const [movedCard] = sourceCards.splice(source.index, 1);

            if (source.droppableId === destination.droppableId) {
                sourceCards.splice(destination.index, 0, movedCard);
                const newLists = lists.map((list, index) =>
                    index === sourceListIndex ? { ...list, cards: sourceCards } : list
                );
                setLists(newLists);
                const updatedBoard = { ...board, lists: newLists };
                setBoard(updatedBoard);
                await UpdateBoardById(board.id, updatedBoard);
            } else {
                const destinationCards = Array.from(lists[destinationListIndex].cards);
                destinationCards.splice(destination.index, 0, movedCard);
                const newLists = lists.map((list, index) => {
                    if (index === sourceListIndex) {
                        return { ...list, cards: sourceCards };
                    } else if (index === destinationListIndex) {
                        return { ...list, cards: destinationCards };
                    } else {
                        return list;
                    }
                });
                setLists(newLists);
                const updatedBoard = { ...board, lists: newLists };
                setBoard(updatedBoard);
                await UpdateBoardById(board.id, updatedBoard);
            }
        }
    };

    return (
        <main className="flex flex-col bg-somon h-full ml-64">
            <BoardNav board={board} />
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="all-lists" direction="horizontal" type="list">
                    {(provided) => (
                        <div
                            className="flex flex-row justify-start items-start gap-10 p-10"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {lists.map((l, index) => (
                                <Draggable key={l.id} draggableId={l.id} index={index}>
                                    {(provided) => (
                                        <div
                                            className="rounded bg-[#EFEFEF] p-5 w-[200px] flex flex-col shadow-xl"
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            <div className="flex flex-row justify-between items-center mb-2">
                                                <h1 className="font-bold text-left text-xl">{l.name}</h1>
                                                <Image src="/Image/dotdotdot.png" alt="Edit" width={40} height={30} />
                                            </div>
                                            <CardList list={l} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            <button
                                className="p-5 bg-somon font-bold shadow-inner drop-shadow-xl rounded w-[200px]"
                                onClick={() => setShowPopup(true)}
                            >
                                + Add a List
                            </button>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
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
