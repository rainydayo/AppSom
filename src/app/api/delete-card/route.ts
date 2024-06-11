import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BoardJSON, CardJSON, ListJSON } from '../../../../interface';

export async function DELETE(req: Request) {
    try {
        const card = await req.json();
        // card = {
        //     cid: card id,
        //     lid: list id,
        //     bid: board id
        // }

        const cardPath = path.resolve('./public/Storage/Card/card.json');
        const listPath = path.resolve('./public/Storage/List/list.json');
        const boardPath = path.resolve('./public/Storage/Board/board.json');

        const cardFileData = fs.readFileSync(cardPath, 'utf-8');
        const cardJson: CardJSON = JSON.parse(cardFileData);

        const listFileData = fs.readFileSync(listPath, 'utf-8');
        const listJson: ListJSON = JSON.parse(listFileData);

        const boardFileData = fs.readFileSync(boardPath, 'utf-8');
        const boardJson: BoardJSON = JSON.parse(boardFileData);

        const idx_b = boardJson.data.findIndex(b => b.id === card.bid);
        if (idx_b == -1) { // find board
            return NextResponse.json({ message: 'Cannot find board to add card' }, {status: 404});
        }

        const idx_lb = boardJson.data[idx_b].lists.findIndex(l => l.id === card.lid);
        if (idx_lb == -1) { // find list in the board
            return NextResponse.json({ message: 'Cannot find list-board to add card' }, {status: 404});
        }

        const idx_l = listJson.data.findIndex(l => l.id === card.lid);
        if (idx_l == -1) { // ensure list is in list.json
            return NextResponse.json({ message: 'Cannot find list to delete card' }, {status: 404});
        }

        const idx_clb = boardJson.data[idx_b].lists[idx_lb].cards.findIndex(c => c.id === card.cid);
        if (idx_clb == -1) { // find card in list-board
            return NextResponse.json({ message: 'Cannot find card in list-baord to delete' }, {status: 404});
        }

        const idx_cl = listJson.data[idx_l].cards.findIndex(c => c.id === card.cid);
        if (idx_cl == -1) { // ensure card is in list in list.json
            return NextResponse.json({ message: 'Cannot find card in list' }, {status: 404});
        }

        const idx_c = cardJson.data.findIndex(c => c.id === card.cid);
        if (idx_c == -1) { // ensure card is in card.json
            return NextResponse.json({ message: 'Cannot find card to delete' }, {status: 404});
        }

        cardJson.data.splice(idx_c, 1);
        listJson.data[idx_l].cards.splice(idx_cl, 1);
        boardJson.data[idx_b].lists[idx_lb].cards.splice(idx_clb, 1);
        
        fs.writeFileSync(cardPath, JSON.stringify(cardJson, null, 2));
        fs.writeFileSync(listPath, JSON.stringify(listJson, null, 2));
        fs.writeFileSync(boardPath, JSON.stringify(boardJson, null, 2));

        return NextResponse.json({ message: 'Card deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete card', error }, { status: 500 });
    }
}
