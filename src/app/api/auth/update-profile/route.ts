import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UserJSON, User } from '../../../../../interface';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const name = data.get('name');
    const imageFile = data.get('image') as File | null;

    const filePath = path.resolve('./public/Storage/User/user.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const jsonData: UserJSON = JSON.parse(fileData);

    const session = await getServerSession(authOptions);

    const sessionUserId = session?.user.id;

    const userIndex = jsonData.data.findIndex((user) => user.id === sessionUserId);
    if (userIndex === -1) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (name) {
      jsonData.data[userIndex].name = name.toString();
    }

    if (imageFile) {
      const oldImagePath = path.resolve(`./public/${jsonData.data[userIndex].image}`);
      console.log(oldImagePath)
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Delete the old image file
      }
      console.log(fs.existsSync(oldImagePath))

      const imageId = uuidv4();
      const imagePath = path.resolve('./public/uploads', `${imageId}_${imageFile.name}`);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      fs.writeFileSync(imagePath, buffer);
      jsonData.data[userIndex].image = `/uploads/${imageId}_${imageFile.name}`;
    }

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
    return NextResponse.json({ message: 'Profile updated successfully', user: jsonData.data[userIndex]});
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ message: 'Failed to update profile', error }, { status: 500 });
  }
}