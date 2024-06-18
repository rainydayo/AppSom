'use client'
import BoardList from "@/components/Board/BoardList"

export default function BoardPage () {

    return (       
        <main className="min-h-screen bg-somon ml-64">
            <BoardList starred={false}></BoardList>
        </main>
    )
}