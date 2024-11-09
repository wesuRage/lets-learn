"use client";

import LanguageSelector from "@/components/LanguageSelector";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { Select, Option } from "bymax-react-select";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";

export default function NewChat() {
  const [languageOption, setLanguageOption] = useState<any>(null);
  const [feedbackOption, setFeedbackOption] = useState<any>(null);
  const [level, setLevel] = useState<any>(null);
  const [topic, setTopic] = useState<string | null>(null);
  const [personality, setPersonality] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  const { data: session } = useSession();
  const router = useRouter();

  const randomInt = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
  const placeHolders = [
    "Uma conversa em um portão de embarque no aeroporto",
    "Um diálogo em uma cafeteria movimentada",
    "Uma conversa sobre uma reunião de clube do livro",
    "Um diálogo em um trem para Londres",
    "Uma conversa em um resort de praia",
    "Um diálogo em uma conferência de tecnologia",
    "Uma conversa em uma biblioteca silenciosa",
    "Um bate-papo durante uma aula de culinária",
    "Uma conversa em uma feira de agricultores",
    "Um diálogo em uma recepção de casamento",
    "Um diálogo em um restaurante em Paris",
  ];

  const options: Option[] = useMemo(
    () => [
      { id: "1", value: "A1", label: "A1" },
      { id: "2", value: "A2", label: "A2" },
      { id: "3", value: "B1", label: "B1" },
      { id: "4", value: "B2", label: "B2" },
      { id: "5", value: "C1", label: "C1" },
      { id: "6", value: "C2", label: "C2" },
    ],
    []
  );

  async function createChat() {
    const chatId = uuidv4();
    const userId = session?.user.id;

    if (!languageOption || !feedbackOption || !level || !topic) {
      alert("Por favor preencha todos os campos");
      return;
    }

    setDisabled(true);

    try {
      await axios.post(
        `/api/chat/${chatId}`,
        {
          chatId,
          title: topic,
          userId,
          language: languageOption.value,
          feedback: feedbackOption.value,
          level: level.value,
          personality,
          textContent: "",
        },
        { headers: { "Content-Type": "application/json" } }
      );

      router.push(`/home/chat/${chatId}`);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  return (
    <main className="flex justify-center h-full w-full max-w-lg gap-8 mt-4">
      <div className="w-full">
        <div className="flex">
          <Link
            href={"/home/practice/chats"}
            prefetch
            className="p-2 rounded-full me-2 bg-slate-800 relative top-1"
          >
            <BiArrowBack />
          </Link>
        </div>
        <section className="flex items-center justify-between w-full gap-4 mb-4">
          <h1 className="font-bold whitespace-nowrap">
            Aprenda<span className="text-red-500">*</span>:
          </h1>
          <div className="w-72">
            <LanguageSelector
              option={languageOption}
              setOption={setLanguageOption}
            />
          </div>
        </section>

        <section className="flex items-center justify-between w-full gap-4 mb-4">
          <h1 className="font-bold whitespace-nowrap">
            Feedback<span className="text-red-500">*</span>:
          </h1>
          <div className="w-72">
            <LanguageSelector
              option={feedbackOption}
              setOption={setFeedbackOption}
            />
          </div>
        </section>

        <section className="flex items-center justify-between w-full gap-4 mb-4">
          <h1 className="font-bold whitespace-nowrap">
            Nível<span className="text-red-500">*</span>:
          </h1>
          <div className="w-72 text-black">
            <Select
              id="language-selector"
              value={level ?? ""}
              isMulti={false}
              isClearable={false}
              options={options}
              placeholder="Selecione o Nível CEFR"
              noOptionsMessage="Nível não encontrado"
              onChange={(selectedOption) => setLevel(selectedOption)}
            />
          </div>
        </section>

        <section>
          <label htmlFor="topic">
            <p className="font-bold">
              Assunto principal do chat<span className="text-red-500">*</span>:
            </p>
            <input
              type="text"
              name="topic"
              autoComplete="off"
              placeholder={placeHolders[randomInt]}
              onChange={(e) => setTopic(e.target.value)}
              className="outline-none w-full rounded-md bg-slate-800 text-slate-300 p-2"
            />
          </label>
        </section>

        <section className="mt-4">
          <label htmlFor="personality">
            <p className="font-bold">Personalidade da IA:</p>
            <input
              type="text"
              name="personality"
              autoComplete="off"
              onChange={(e) => setPersonality(e.target.value)}
              placeholder="Como você quer que ela se comporte"
              className="outline-none w-full rounded-md bg-slate-800 text-slate-300 p-2"
            />
          </label>
        </section>

        <section className="w-full flex justify-center">
          {disabled ? (
            <Spinner />
          ) : (
            <button
              disabled={disabled}
              onClick={createChat}
              className="hover:scale-125 transition ease-in-out duration-150 border-2 border-slate-800 hover:bg-slate-800 rounded-xl p-2 relative top-3"
            >
              <p className="font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-700 inline-block text-transparent bg-clip-text">
                Iniciar Novo Chat
              </p>
            </button>
          )}
        </section>
      </div>
    </main>
  );
}
