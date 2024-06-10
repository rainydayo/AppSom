import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import { Board } from "../../../interface";
import CreateBoard from "@/not-used/CreateBoard";

type BoardState = {
    boards: Board[]
};

const initialState:BoardState = {
    boards: []
}

export const boardSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        addBoard: (state, action: PayloadAction<Board>) => {
            const remainingBoard = state.boards.filter(obj => {
                return obj.id != action.payload.id
            });
            state.boards = remainingBoard;
            state.boards.push(action.payload);
            
            console.log("board = " + action.payload.name);
            
        },

        removeBoard: (state, action: PayloadAction<string>) => {
            const remainingBoard = state.boards.filter(obj => {
                return obj.id != action.payload
            });
            state.boards = remainingBoard;
        }
    }
});

export const {addBoard, removeBoard} = boardSlice.actions;
export default boardSlice.reducer;