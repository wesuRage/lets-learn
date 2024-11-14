import prisma from "../../../../prisma";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/connectToDatabase";
import { v4 } from "uuid";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { userId, ai_name, ai_personality } = await req.json();

    if (!ai_name && !ai_personality) {
      return NextResponse.json(
        {
          data: await prisma.personality.findMany({ where: { id: userId } }),
        },
        { status: 200 }
      );
    } else {
      const createdPersonality = await prisma.personality.create({
        data: { personalityId: v4(), userId, ai_personality, ai_name },
      });

      return NextResponse.json({ data: createdPersonality }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: error }, { status: 500 });
  }
}
