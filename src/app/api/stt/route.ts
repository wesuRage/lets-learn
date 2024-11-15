import { NextResponse } from "next/server";
import fs from "fs";
import { openai } from "@/libs/openai";

export async function POST(req: Request) {
  const body = await req.json();

  const base64Audio = body.audio;

  // Convert the base64 audio data to a Buffer
  const audio = Buffer.from(base64Audio, "base64");

  // Define the file path for storing the temporary WAV file
  const filePath = "tmp/input.wav";

  try {
    // Write the audio data to a temporary WAV file synchronously
    fs.writeFileSync(filePath, audio);

    // Create a readable stream from the temporary WAV file
    const readStream = fs.createReadStream(filePath);

    const data = await openai.audio.transcriptions.create({
      file: readStream,
      model: "whisper-1",
    });

    return NextResponse.json({ text: data.text }, { status: 200 });
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.error();
  }
}
