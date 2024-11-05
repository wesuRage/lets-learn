import prisma from "../../../../prisma";
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../utils/connectToDatabase";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { userId } = await req.json();
    console.log(userId);

    return NextResponse.json(
      {
        data: await prisma.chat.findMany(),
        userId,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
