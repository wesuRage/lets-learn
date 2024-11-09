import { Key, useRef, useState } from "react";
import { HiTranslate } from "react-icons/hi";
import { HiMiniSpeakerWave } from "react-icons/hi2";

interface BotBalloonProps {
  key: Key;
  message: string;
  audio: string;
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
  audio,
  translation,
}: BotBalloonProps) {
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function play(audioStringBuffer: string) {
    // If an audio instance already exists, pause it and reset the time
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Create a new Audio instance if it's not already set
    audioRef.current = new Audio(`data:audio/mp3;base64,${audioStringBuffer}`);
    audioRef.current.play();
  }

  return (
    <section key={key}>
      <div className="max-w-[80%]">
        {showTranslation ? translation : format(message)}
      </div>

      <div className="flex gap-2">
        <button
          className="text-2xl p-2 rounded-full"
          onClick={() => play(audio)}
        >
          <HiMiniSpeakerWave />
        </button>

        <button
          className="text-2xl p-2 rounded-full"
          onClick={() => setShowTranslation(!showTranslation)}
        >
          <HiTranslate />
        </button>
      </div>
    </section>
  );
}
