import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BoardJSON, ListJSON } from '../../../../interface';

export async function POST(req: Request) {
    try {
        const list = await req.json();

        const listPath = path.resolve('./public/Storage/List/list.json');
        const boardPath = path.resolve('./public/Storage/Board/board.json');

        const listFileData = fs.readFileSync(listPath, 'utf-8');
        const listJson: ListJSON = JSON.parse(listFileData);

        const boardFileData = fs.readFileSync(boardPath, 'utf-8');
        const boardJson: BoardJSON = JSON.parse(boardFileData);

        const idx = boardJson.data.findIndex(b => b.id === list.bid);
        if (idx == -1) {
            return NextResponse.json({ message: 'Cannot find board to add list' }, {status: 404});
        }
        boardJson.data[idx].lists.push(list.data);
        listJson.data.push(list.data);

        fs.writeFileSync(listPath, JSON.stringify(listJson, null, 2));
        fs.writeFileSync(boardPath, JSON.stringify(boardJson, null, 2));

        return NextResponse.json({ message: 'List added successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to add list', error }, { status: 500 });
    }
}
