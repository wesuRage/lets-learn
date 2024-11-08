"use client";

import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { FaImage, FaKeyboard, FaSquare } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { useRecordAudio } from "../hooks/useRecordAudio";
import axios from "axios";
import { useSession } from "next-auth/react";

interface SendOptionsProps {
  uuid: string;
}

export default function SendOptions({ uuid }: SendOptionsProps) {
  const [keyboardPressed, setKeyboardPressed] = useState(false);
  const [hasText, setHasText] = useState(false);
  const [gotAnswer, setGotAnswer] = useState(true);
  const [inputText, setInputText] = useState<string>();
  const { recording, startRecording, stopRecording, text } = useRecordAudio();
  const { data: session } = useSession();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHasText(value.trim() !== "");
    setInputText(value);
  };

  useEffect(() => {
    if (text) {
      sendMessage(); // Chama sendMessage quando o texto é atualizado
    }
  }, [text]);

  async function sendMessage() {
    setGotAnswer(false);
    if (inputText === "" && !text) {
      alert("Please enter a message or record audio before sending.");
      return; // Sai da função se ambos forem nulos
    }

    const messageContent = inputText || text;

    setHasText(false);
    setInputText("");

    const postData = {
      attachment: null,
      audioUrl: null,
      translation: null,
      textContent: messageContent,
      timestamp: new Date(),
      sender: "user",
      chatId: uuid,
      userId: session?.user.id,
    };

    try {
      await axios.post(`/api/chat/${uuid}`, postData, {
        headers: { "Content-Type": "application/json" },
      });

      setGotAnswer(true);
    } catch (error) {
      console.error("Error sending message:", error);
      alert(error);
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputText === "" || !inputText) return;
      if (!gotAnswer) return;
      sendMessage();
    }
  };

  useEffect(() => {
    const inputElement = document.getElementById("message");
    inputElement?.addEventListener(
      "keydown",
      handleKeyDown as unknown as EventListener
    );

    return () => {
      inputElement?.removeEventListener(
        "keydown",
        handleKeyDown as unknown as EventListener
      );
    };
  }, [sendMessage]);

  return (
    <section className="flex justify-center items-center px-6">
      {keyboardPressed ? (
        <div className="bg-slate-800 w-full p-2 flex justify-between rounded-full">
          <input
            type="text"
            id="message"
            value={inputText ?? ""}
            autoComplete="off"
            placeholder="Type here"
            onChange={handleInputChange}
            className="bg-slate-800 w-full ps-5 outline-none"
          />
          <div className="flex justify-around mx-4">
            <IconButton icon={<FaImage />} disabled={!gotAnswer} />
            {hasText ? (
              <IconButton
                icon={<IoSend />}
                onClick={sendMessage}
                disabled={!gotAnswer}
              />
            ) : (
              <IconButton
                icon={<FaMicrophone />}
                onClick={() => setKeyboardPressed(false)}
                disabled={!gotAnswer}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-around w-full">
          <IconButton
            icon={<FaKeyboard className="text-2xl" />}
            onClick={() => setKeyboardPressed(true)}
            disabled={!gotAnswer}
          />
          {recording ? (
            <IconButton
              icon={<FaSquare className="text-5xl" />}
              onClick={stopRecording}
              disabled={!gotAnswer}
            />
          ) : (
            <IconButton
              icon={<FaMicrophone className="text-5xl" />}
              onClick={startRecording}
              disabled={!gotAnswer}
            />
          )}
          <IconButton
            icon={<FaImage className="text-2xl" />}
            disabled={!gotAnswer}
          />
        </div>
      )}
    </section>
  );
}

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  disabled: boolean;
}

const IconButton = ({ icon, onClick, disabled }: IconButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="hover:bg-slate-900 p-2 rounded-full transition ease-in-out duration-200"
  >
    {icon}
  </button>
);
