import { Board } from "../../../interface";

export default function BoardNav ({board} : {board: Board}) {
    return (
        <div className="bg-orange-200 w-full h-8 flex items-center p-8">
            <h1 className="font-bold">{board.name}</h1>
        </div>
    )
}