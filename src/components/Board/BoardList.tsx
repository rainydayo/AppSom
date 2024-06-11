'use client'

import { useAppSelector } from "@/redux/store"
import { useEffect, useState } from "react"
import { Board, Card, List, User } from "../../../interface"
import GetBoards from "@/lib/GetBoards";
import DeleteBoardById from "@/lib/DeleteBoardById";
import CreateList from "@/lib/CreateList";
import DeleteListById from "@/lib/DeleteListById";
import CreateCard from "@/lib/CreateCard";
import DeleteCardById from "@/lib/DeleteCardById";
import ServerActionRevalidate from "@/lib/RevalidateAction";

export default function BoardList ({userProfile} : {userProfile : User}) {
    //const boards = useAppSelector((state) => state.reduxPersistedReducer.boardSlice.boards);
    const [boards, setBoards] = useState<Board[]>([]);
    useEffect(() => {
        const LoadBoards = async () => {
            const data = await GetBoards();
            setBoards(data.data);
        }
        LoadBoards();
    },[boards]);

    var uuid = crypto.randomUUID();

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

    var uuid2 = crypto.randomUUID();

    const makeCard = (lid: string) => {
        const card: Card = {
            id: uuid2,
            name: "Card 1",
            description: "hehe",
            date_start: "today",
            date_end: "tomorrow",
            color: "",
            member: [userProfile],
            list: lid
        }
        return card;
    }

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
                                Lists: 
                                
                                {b.lists.map((l) => 
                                    <div key={l.id}>
                                        <p>- {l.name}</p>
                                        <p>---- {l.description}</p>
                                        <p>Card: {l.cards.map((c) => 
                                            <div key={c.id}>
                                                
                                                {c.name + " "}
                                                
                                                <button className="px-3 py-2 bg-black text-white rounded" onClick={() => {DeleteCardById(c.id, l.id, b.id); ServerActionRevalidate();}}>Delete Card</button>
                                            </div>)}
                                        </p>
                                        <button className="px-3 py-2 bg-blue-500 text-white rounded" onClick={() => {CreateCard(makeCard(l.id), l.id, b.id); ServerActionRevalidate();}}>
                                            Add Card
                                        </button>
                                        <button className="px-3 py-2 bg-red-600 text-white rounded" onClick={() => {DeleteListById(l.id, b.id); ServerActionRevalidate();}}>
                                            Delete List 
                                        </button>
                                    </div>
                                )}
                            </h3>
                            <button className="px-3 py-2 bg-green-500 text-white rounded" onClick={() => {CreateList(makeList(b.id), b.id); ServerActionRevalidate();}}>
                                Add List
                            </button>
                            <h3>
                                Owner: {b.owner? b.owner.name : "none"}
                            </h3>
                            <h3>
                                Members: {b.member.map((m) => <p key={m.id}>- {m.name}</p>)}
                            </h3>
                            
                            <button className="px-3 py-2 bg-red-600 text-white rounded" onClick={() => {DeleteBoardById(b.id); ServerActionRevalidate();}}>
                                Delete Board
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