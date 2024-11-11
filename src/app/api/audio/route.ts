import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { messageId } = data;

    return NextResponse.json(
      {
        audioStringBuffer: await prisma.audio.findUnique({
          where: { messageId: messageId },
        }),
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
