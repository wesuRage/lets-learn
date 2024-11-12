"use client";

import axios from "axios";
import { useContext, useRef, useState } from "react";
import { HiTranslate } from "react-icons/hi";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { MdContentCopy } from "react-icons/md";
import Spinner from "../Spinner";
import { AudioAnalyserContext } from "../../app/layout";
import BotBalloonButton from "./BotBalloonButton";

interface BotBalloonProps {
  message?: string;
  messageId?: string;
  translation?: string;
  loading?: boolean;
  onAudioAnalyser?: (analyser: AnalyserNode) => void;
}

function format(message: string) {
  const pieces = message.split("\n");

  const formattedText = pieces.map((piece, index) => {
    const boldFormatted = piece.replace(
      /\*\*(.*?)\*\*/g,
      '<span class="font-bold">$1</span>'
    );

    return (
      <span key={index} dangerouslySetInnerHTML={{ __html: boldFormatted }} />
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
  const [disabled, setDisabled] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const handleAudioAnalyser = useContext(AudioAnalyserContext);

  async function findAndPlay(messageId: string) {
    setDisabled(true);
    try {
      const response = await axios.post(
        "/api/audio",
        { messageId },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const audioData = response.data.audioStringBuffer?.audioData;
      if (!audioData) {
        console.error("Audio data not found");
        setDisabled(false);
        return;
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(`data:audio/mp3;base64,${audioData}`);
      audioRef.current = audio;

      const audioContext = new window.AudioContext();
      const source = audioContext.createMediaElementSource(audio);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;

      source.connect(analyser);
      analyser.connect(audioContext.destination);

      handleAudioAnalyser(analyser);

      audio.play();
      audio.onended = () => setDisabled(false);
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
                  <BotBalloonButton
                    Icon={HiMiniSpeakerWave}
                    func={() => findAndPlay(messageId!)}
                  />
                )}

                <BotBalloonButton
                  Icon={HiTranslate}
                  func={() => setShowTranslation(!showTranslation)}
                />

                <BotBalloonButton
                  Icon={MdContentCopy}
                  func={() =>
                    showTranslation ? copy(translation!) : copy(message!)
                  }
                />
              </div>
            </section>
          </>
        )}
      </div>
    </section>
  );
}
