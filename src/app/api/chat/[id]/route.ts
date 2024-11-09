import { Prisma } from "@prisma/client";
import prisma from "../../../../../prisma";
import { NextResponse } from "next/server";
import { openai } from "@/utils/openai";
import { prompter } from "@/utils/prompter";
import translator, { LanguageCode } from "open-google-translator";

export async function GET(req: Request, { params }: any) {
  const { id } = await params;

  try {
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

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      chatId,
      textContent,
      title,
      language,
      feedback,
      level,
      personality,
      userId,
    } = data;

    let chat = await prisma.chat.findUnique({ where: { chatId } });

    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          chatId,
          title,
          language,
          feedback,
          level,
          personality,
          createdAt: new Date(),
          userId,
        },
      });
    }

    const userMessage = await createMessage(
      chat.language,
      chat.feedback,
      chat.chatId,
      "user",
      textContent
    );

    if (!chat) {
      return NextResponse.json({ message: userMessage }, { status: 201 });
    }

    const botResponse = await generateBotResponse(chat, textContent);
    const botMessage = await createMessage(
      chat.language,
      chat.feedback,
      chat.chatId,
      "bot",
      botResponse.text,
      botResponse.audioBase64
    );

    return NextResponse.json({ botMessage }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: any) {
  const { id } = await params;

  try {
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

async function createMessage(
  language: string,
  feedback: string,
  chatId: string,
  sender: "user" | "bot",
  text: string,
  audioData: string | null = null
) {
  const regex = /\(([^()]*)\)(?!.*\().*/;

  const lang = language?.match(regex)?.toString().split(",")[1];
  const feed = feedback?.match(regex)?.toString().split(",")[1];

  await translator
    .TranslateLanguageData({
      listOfWordsToTranslate: [text],
      fromLanguage: lang! as unknown as LanguageCode,
      toLanguage: feed! as unknown as LanguageCode,
    })
    .then((data) => {
      return prisma.message.create({
        data: {
          content: {
            attachment: null,
            audioData,
            translation: data[0].translation,
            text,
          },
          timestamp: new Date(),
          sender,
          chatId,
        },
      });
    });
}

async function generateBotResponse(chat: any, userText: string) {
  const userData = await prisma.user.findFirst({ where: { id: chat.userId } });
  const previousMessages = await getChatHistory(chat.chatId);

  const prompt = prompter(
    chat.feedback,
    chat.language,
    chat.level,
    chat.personality,
    chat.title,
    userData?.name,
    userData?.gender
  );

  const textResponse = await openai.chat.completions.create({
    model: "chatgpt-4o-latest",
    messages: [
      { role: "system", content: prompt },
      {
        role: "system",
        content: `The previous messages were:\n${previousMessages}\nNow continue with the student.`,
      },
      { role: "user", content: userText },
    ],
  });

  const text = textResponse.choices[0].message.content!;
  const audioResponse = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });
  const audioBase64 = Buffer.from(await audioResponse.arrayBuffer()).toString(
    "base64"
  );

  return { text, audioBase64 };
}

async function getChatHistory(chatId: string) {
  const messages = await prisma.message.findMany({ where: { chatId } });
  return messages
    .map((msg) =>
      msg.sender === "bot"
        ? `GPT: ${msg.content.text}`
        : `STUDENT: ${msg.content.text}`
    )
    .join("\n");
}
