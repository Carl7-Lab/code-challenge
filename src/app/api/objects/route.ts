import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { ObjectModel } from '@/model/Object';

export const POST = async (req: Request, res: Response) => {
  await dbConnect();
  try {
    const body = await req.json();
    const newObject = await ObjectModel.create(body);
    return NextResponse.json({ data: newObject }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const GET = async (req: Request, res: Response) => {
  await dbConnect();
  try {
    const result = await ObjectModel.find({});
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
