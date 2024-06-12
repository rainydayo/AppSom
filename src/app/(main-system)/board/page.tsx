'use client'
import BoardList from "@/components/Board/BoardList"

export default function BoardPage () {

    return (       
        <main className="h-full bg-orange-50 ml-64">
            <BoardList starred={false}></BoardList>
        </main>
    )
}