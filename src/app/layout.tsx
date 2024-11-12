"use client";

import "@/app/globals.css";
import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import { createContext, ReactNode, useRef, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const AudioAnalyserContext = createContext<
  (analyser: AnalyserNode) => void
>(() => {});

export default function Layout({ children }: LayoutProps) {
  const [background, setBackground] = useState<string>("rgb(15, 23, 42)");
  const analyserRef = useRef<AnalyserNode | null>(null);

  function handleAudioAnalyser(analyser: AnalyserNode) {
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function updateBackgroundColor() {
      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArray);
        const avgAmplitude =
          dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

        // Interpolação entre `rgb(15, 23, 42)` e `rgb(59, 130, 246)`
        const minRed = 15,
          minGreen = 23,
          minBlue = 42;
        const maxRed = 59,
          maxGreen = 130,
          maxBlue = 246;

        const intensity = avgAmplitude / 255; // Valor entre 0 e 1

        const red = Math.round(minRed + (maxRed - minRed) * intensity);
        const green = Math.round(minGreen + (maxGreen - minGreen) * intensity);
        const blue = Math.round(minBlue + (maxBlue - minBlue) * intensity);

        setBackground(`rgb(${red}, ${green}, ${blue})`);
      }
      requestAnimationFrame(updateBackgroundColor);
    }

    requestAnimationFrame(updateBackgroundColor);
  }

  return (
    <AnimatePresence>
      <html>
        <body
          style={{ backgroundColor: background }}
          className="text-slate-300 min-h-screen"
        >
          <AudioAnalyserContext.Provider value={handleAudioAnalyser}>
            <SessionProvider>{children}</SessionProvider>
          </AudioAnalyserContext.Provider>
        </body>
      </html>
    </AnimatePresence>
  );
}
