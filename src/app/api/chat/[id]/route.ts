import { Prisma } from "@prisma/client";
import prisma from "../../../../../prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  try {
    const { id } = params;

    const chat = await prisma.chat.findUnique({
      where: { chatId: id },
    });

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json({ data: chat });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, { params }: any) {
  try {
    const data = await req.json();
    // Verifique se o chat existe
    let chat = await prisma.chat.findUnique({
      where: { chatId: data.chatId },
    });

    if (!chat) {
      // Se o chat não existir, cria um novo
      chat = await prisma.chat.create({
        data: {
          chatId: data.chatId,
          title: data.title,
          language: data.language,
          feedback: data.feedback,
          level: data.level,
          personality: data.personality,
          createdAt: new Date(),
          userId: data.userId,
        },
      });

      // Mensagem associada ao novo chat
      const messageContentData = {
        attachment: null,
        audioUrl: null,
        translation: null,
        text: data.textContent,
      };

      const message = await prisma.message.create({
        data: {
          content: messageContentData,
          timestamp: new Date(),
          sender: "user", // Você pode ajustar conforme necessário
          chatId: chat.chatId, // Usando chatId do chat recém-criado
        },
      });

      console.log(message);

      return NextResponse.json({ message }, { status: 201 });
    } else {
      // Se o chat existir, apenas cria a nova mensagem

      console.log(`text: ${data.textContent}`);

      const message = await prisma.message.create({
        data: {
          content: {
            attachment: null,
            audioUrl: null,
            translation: null,
            text: data.textContent,
          },
          timestamp: new Date(),
          sender: "user", // Você pode ajustar conforme necessário
          chatId: chat.chatId, // Usando chatId do chat existente
        },
      });

      console.log(message);

      return NextResponse.json({ message }, { status: 201 });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Erro do Prisma:", error.message);
    } else {
      console.error("Erro inesperado:", error);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: any) {
  try {
    const { id } = params;

    const chat = await prisma.chat.delete({
      where: { chatId: id },
    });

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json({ data: chat });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
