'use client'

import { useAppSelector } from "@/redux/store"

export default function BoardList () {
    const boards = useAppSelector((state) => state.reduxPersistedReducer.boardSlice.boards);
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
                                Owner: {b.owner.name}
                            </h3>
                            <h3>
                                Members: {b.member.map((m) => <h3>- {m.name}</h3>)}
                            </h3>
                        </div>
                    ) : 
                    <div>
                        No boards
                    </div>
            }
        </div>
    )
}