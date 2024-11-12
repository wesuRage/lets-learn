import axios from "axios";
import { useRef, useState } from "react";
import { HiTranslate } from "react-icons/hi";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { MdContentCopy } from "react-icons/md";

import Spinner from "../Spinner";

interface BotBalloonProps {
  message?: string;
  messageId?: string;
  translation?: string;
  loading?: boolean;
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
  message,
  messageId,
  translation,
  loading,
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

  function copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <section className="flex">
      <div className="relative top-2 w-0 h-0 border-t-[0px] border-t-transparent border-r-[15px] border-r-slate-900 border-b-[15px] border-b-transparent">
        <div className="relative left-[2px] top-[1px] w-0 h-0 border-t-[0px] border-t-transparent border-r-[15px] border-r-slate-800 border-b-[15px] border-b-transparent"></div>
      </div>
      <div className="border border-slate-900 max-w-[80%] p-2 my-2 rounded-xl rounded-tl-none">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div>
              {showTranslation ? format(translation!) : format(message!)}
            </div>
            <section className="flex items-center">
              <div className="flex gap-2">
                {disabled ? (
                  <Spinner />
                ) : (
                  <button
                    className="text-2xl p-3 rounded-full hover:bg-slate-900 transition ease-in-out duration-150"
                    onClick={() => findAndPlay(messageId!)}
                  >
                    <HiMiniSpeakerWave />
                  </button>
                )}

                <button
                  className="text-2xl p-3 rounded-full hover:bg-slate-900 transition ease-in-out duration-150"
                  onClick={() => setShowTranslation(!showTranslation)}
                >
                  <HiTranslate />
                </button>

                <button
                  className="text-2xl p-3 rounded-full hover:bg-slate-900 transition ease-in-out duration-150"
                  onClick={() =>
                    showTranslation ? copy(translation!) : copy(message!)
                  }
                >
                  <MdContentCopy />
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </section>
  );
}
