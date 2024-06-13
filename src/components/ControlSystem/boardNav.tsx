import { useState } from "react";
import { Board } from "../../../interface";
import Image from "next/image";

export default function BoardNav ({board} : {board: Board}) {
    const [isStarActive, setIsStarActive] = useState(false);

    const handleStarClick = () => {
        setIsStarActive(!isStarActive);
    };

    return (
        <div className="bg-orange-300 w-full h-8 flex flex-row justify-between items-center px-8 py-9">
            <div className="flex flex-row gap-3 items-center">
                <h1 className="font-semibold text-3xl">{board.name}</h1>
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
