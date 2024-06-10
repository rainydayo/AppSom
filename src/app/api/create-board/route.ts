import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BoardJSON } from '../../../../interface';

export async function POST(req: Request) {
    try {
        const board = await req.json();

        const filePath = path.resolve('./public/Storage/Board/board.json');

        const fileData = fs.readFileSync(filePath, 'utf-8');
        const jsonData: BoardJSON = JSON.parse(fileData);

        jsonData.data.push(board);

        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

        return NextResponse.json({ message: 'Board added successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to add board', error }, { status: 500 });
    }
}
