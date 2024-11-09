import axios from "axios";
import { Key, useRef, useState } from "react";
import { HiTranslate } from "react-icons/hi";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import Spinner from "../Spinner";

interface BotBalloonProps {
  key: Key;
  message: string;
  messageId: string;
  translation: string;
}

function format(message: string) {
  const pieces = message.split("\n");

  const formattedText = pieces.map((piece, index) => {
    const boldFormatted = piece.replace(
      /\*\*(.*?)\*\*/g,
      '<span class="font-bold">$1</span>'
    );

    return (
      <>
        <span dangerouslySetInnerHTML={{ __html: boldFormatted }} />
        {index < pieces.length - 1 && <br />}
      </>
    );
  });

  return <>{formattedText}</>;
}

export default function BotBalloon({
  key,
  message,
  messageId,
  translation,
}: BotBalloonProps) {
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  async function findAndPlay(messageId: string) {
    setDisabled(true);
    try {
      const response = await axios.post(
        "/api/audio",
        { messageId },
        { headers: { "Content-Type": "application/json" } }
      );

      const audioData = response.data.audioStringBuffer?.audioData;
      if (!audioData) {
        console.error("Audio data not found");
        setDisabled(false);
        return;
      }

      // Pausa o áudio existente e reinicia se já houver um
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Cria uma nova instância de áudio com o conteúdo codificado em base64
      audioRef.current = new Audio(`data:audio/mp3;base64,${audioData}`);
      audioRef.current.play();

      audioRef.current.onended = () => setDisabled(false);
    } catch (error) {
      console.error("Erro ao buscar o áudio:", error);
      setDisabled(false);
    }
  }

  return (
    <section key={key}>
      <div className="max-w-[80%]">
        {showTranslation ? format(translation) : format(message)}
      </div>

      <section className="flex items-center">
        <div className="flex gap-2">
          {disabled ? (
            <Spinner />
          ) : (
            <button
              className="text-2xl p-3 rounded-full"
              onClick={() => findAndPlay(messageId)}
            >
              <HiMiniSpeakerWave />
            </button>
          )}

          <button
            className="text-2xl p-3 rounded-full"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            <HiTranslate />
          </button>
        </div>
      </section>
    </section>
  );
}
