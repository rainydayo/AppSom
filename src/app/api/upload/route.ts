import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  const data = await req.formData();
  const imageFile = data.get('image') as File;
  
  if (!imageFile) {
    return NextResponse.json({ message: 'No image file uploaded' }, { status: 400 });
  }

  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const imageId = uuidv4();
  const imagePath = path.resolve('./public/uploads', `${imageId}_${imageFile.name}`);

  try {
    fs.writeFileSync(imagePath, buffer);
    const imageUrl = `/uploads/${imageId}_${imageFile.name}`;
    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error('Error saving image:', error);
    return NextResponse.json({ message: 'Failed to save image', error }, { status: 500 });
  }
}
