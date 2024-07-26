import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { ObjectModel } from '@/model/Object';

type Params = {
  id: string;
};

export const GET = async (req: Request, { params }: { params: Params }) => {
  await dbConnect();

  const id = params.id;
  if (id.length !== 24) {
    return NextResponse.json({ error: 'Object not found' }, { status: 404 });
  }

  try {
    const result = await ObjectModel.findById(id);
    if (!result) {
      return NextResponse.json({ error: 'Object not found' }, { status: 404 });
    }
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: Params }) => {
  await dbConnect();

  const id = params.id;
  if (id.length !== 24) {
    return NextResponse.json({ error: 'Object not found' }, { status: 404 });
  }

  try {
    const result = await ObjectModel.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ error: 'Object not found' }, { status: 404 });
    }
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: Params }) => {
  await dbConnect();

  const id = params.id;
  if (id.length !== 24) {
    return NextResponse.json({ error: 'Object not found' }, { status: 404 });
  }

  try {
    const body = await req.json();
    const result = await ObjectModel.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );
    if (!result) {
      return NextResponse.json({ error: 'Object not found' }, { status: 404 });
    }
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
