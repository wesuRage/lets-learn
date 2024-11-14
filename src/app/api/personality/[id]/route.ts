import prisma from "../../../../../prisma";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/connectToDatabase";
import { v4 } from "uuid";

export async function POST(req: Request, { params }: any) {
  try {
    await connectToDatabase();

    const { id } = await params;

    const { userId } = await req.json();

    return NextResponse.json(
      {
        data: await prisma.personality.findFirst({
          where: { userId: userId, personalityId: id },
        }),
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: error }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: any) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const { userId, ai_name, ai_personality } = await req.json();

    const existingPersonality = await prisma.personality.findFirst({
      where: { personalityId: id, userId },
    });

    if (!existingPersonality) {
      return NextResponse.json(
        { error: "Personality not found" },
        { status: 404 }
      );
    }

    // Atualiza os campos ai_name e ai_personality
    const updatedPersonality = await prisma.personality.update({
      where: { personalityId: id },
      data: {
        ai_name,
        ai_personality,
      },
    });

    return NextResponse.json({ data: updatedPersonality }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
