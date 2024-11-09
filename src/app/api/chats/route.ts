import prisma from "../../../../prisma";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/connectToDatabase";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { userId } = await req.json();

    return NextResponse.json(
      {
        data: await prisma.chat.findMany({ where: { userId } }),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
