import { useEffect, useState } from "react";
import { Board } from "../../../interface";
import Image from "next/image";
import UpdateBoardById from "@/lib/UpdateBoardById";
import { useSession } from "next-auth/react";

export default function BoardNav ({board} : {board: Board}) {
    const [isStarActive, setIsStarActive] = useState<boolean>(board.favorite);
    const { data: session } = useSession();
    if (!session) {
        return null;
    }
    const handleStarClick = async () => {
        setIsStarActive(!board.favorite);
        const favorite: Board = {
            id: board.id,
            name: board.name,
            description: board.description,
            lists: board.lists,
            favorite: !board.favorite,
            owner: board.owner,
            member: board.member,
            color: board.color
        }
        await UpdateBoardById(board.id, favorite);
    };

    return (
        <div className="bg-orange-300 w-full h-8 flex flex-row justify-between items-center px-8 py-9">
            <div className="flex flex-row gap-3 items-center">
                <h1 className="font-semibold text-3xl">{board.name} {board.owner == session.user.id ? " (Owner)" : " (Member)"}</h1>
                <Image 
                    src={isStarActive ? "/Image/star_Active.png" : "/Image/star_notActive.png"} 
                    alt="Star" 
                    width={40} 
                    height={40} 
                    onClick={handleStarClick}
                />
            </div>
            
            <div className="flex flex-row gap-3">
                <div className="flex flex-row gap-2 items-center bg-gray-300 py-2 px-3 rounded">
                    <Image src="/Image/member.png" alt="Member" width={32} height={32}/>
                    <div>Member</div>
                </div>
                <Image src="/Image/edit.png" alt="Edit" width={50} height={50}/>
                <Image src="/Image/delete.png" alt="Delete" width={50} height={50}/>
            </div>
        </div>
    )
}
