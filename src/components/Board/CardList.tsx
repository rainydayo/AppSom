"use client";

import { useEffect, useState } from "react";
import { Card, List } from "../../../interface";
import CreateCard from "@/lib/CreateCard";
import GetListById from "@/lib/GetListById";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function CardList({ list }: { list: List }) {
    const [cards, setCards] = useState<Card[]>(list.cards);

    useEffect(() => {
        setCards(list.cards);
    }, [list.cards]);

    const uuid = crypto.randomUUID();

    const makeCard = () => {
        const card: Card = {
            id: uuid,
            name: "Card 1",
            description: "hehe",
            date_start: "today",
            date_end: "tomorrow",
            color: "",
            member: [],
            list: list.id,
        };
        console.log("Creating new card:", card);
        return card;
    };

    return (
        <Droppable droppableId={list.id} type="card">
            {(provided) => (
                <div
                    className="flex flex-col items-start gap-2"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {cards.map((c, index) => (
                        <Draggable key={c.id} draggableId={c.id} index={index}>
                            {(provided) => (
                                <div
                                    className="bg-white shadow-lg w-full px-3 py-2 rounded"
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                >
                                    <h1 className="font-semibold text-md">{c.name}</h1>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                    <button onClick={() => { CreateCard(makeCard(), list.id, list.board) }}>
                        <h1 className="font-semibold text-lg">+ Add a Card</h1>
                    </button>
                </div>
            )}
        </Droppable>
    );
}
