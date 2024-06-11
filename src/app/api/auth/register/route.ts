import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { UserJSON, User } from '../../../../../interface';

export async function POST(req: Request) {
    try {
        const user = await req.json();

        const filePath = path.resolve('./public/Storage/User/user.json');

        const fileData = fs.readFileSync(filePath, 'utf-8');
        const jsonData: UserJSON = JSON.parse(fileData);

        // Check if the username already exists
        const userExists = jsonData.data.some((existingUser: User) => existingUser.username === user.username);
        if (userExists) {
            return NextResponse.json({ message: 'Username is invalid' }, { status: 400 });
        }

        jsonData.data.push(user);

        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

        return NextResponse.json({ message: 'User registered successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to register', error }, { status: 500 });
    }
}
