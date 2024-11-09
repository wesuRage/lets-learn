import prisma from "../../../../../../prisma";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/connectToDatabase";

export async function GET(req: Request, { params }: any) {
  try {
    const { userId, chatId } = await params;

    await connectToDatabase();

    // Verifica se o chat pertence ao usuário especificado
    const chat = await prisma.chat.findFirst({
      where: {
        chatId: chatId,
        userId: userId,
      },
    });

    if (!chat) {
      return NextResponse.json(
        {
          error: "Chat não encontrado ou você não tem permissão para acessá-lo",
        },
        { status: 404 }
      );
    }

    // Busca todas as mensagens desse chat
    const messages = await prisma.message.findMany({
      where: { chatId: chatId },
    });

    return NextResponse.json({ data: messages }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
