"use client"

import { useEffect, useState } from "react";
import { Card, List } from "../../../interface";
import CreateCard from "@/lib/CreateCard";
import GetListById from "@/lib/GetListById";

export default function CardList ({list} : {list: List}) {

    const [cards, setCards] = useState<Card[]>([]);
    useEffect(() => {
        const LoadCard = async () => {
            const data = await GetListById(list.id);
            const cardsData = data?.cards;
            if (!cardsData) {
                return null;
            }
            setCards(cardsData);
        }
        setTimeout(() => {

        }, 1000);
        LoadCard();
    }, [cards]);
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
            list: list.id
        }
        return card;
    }
    return (
        <div className="flex flex-col items-start gap-2">
            {
                cards.map((c) => 
                    <div key={c.id} className="bg-white shadow-lg w-full px-3 py-2 rounded">
                        <h1 className="font-semibold text-md">{c.name}</h1>
                    </div>
                )
            }
            <button onClick={() => {CreateCard(makeCard(), list.id, list.board)}}>
                <h1 className="font-semibold text-lg">+ Add a Card</h1>
            </button>
        </div>
    );
}