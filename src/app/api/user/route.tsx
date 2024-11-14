import prisma from "../../../../prisma";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/connectToDatabase";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { userId, name, gender, age, email } = await req.json();

    if (!name && !gender && !age && !email) {
      return NextResponse.json(
        {
          data: await prisma.user.findFirst({ where: { id: userId } }),
        },
        { status: 200 }
      );
    } else {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name, gender, age: parseInt(age), email },
      });

      return NextResponse.json({ data: updatedUser }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 500 });
  }
}
