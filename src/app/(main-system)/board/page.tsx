'use client'
import BoardList from "@/components/Board/BoardList"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BoardPage () {

    return (       
        <main className="min-h-screen bg-somon ml-64">
            <BoardList starred={false}></BoardList>
            <ToastContainer />
            
        </main>
    )
}