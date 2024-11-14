"use client";

import LanguageSelector, { styles } from "@/components/LanguageSelector";
import Spinner from "@/components/Spinner";
import { PageSwitch } from "@/components/transitions/PageSwitch";
import PageSwitchButton from "@/components/transitions/PageSwitchButton";
import axios from "axios";
import { Select, Option } from "bymax-react-select";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";

export default function NewChat() {
  const [languageOption, setLanguageOption] = useState<any>(null);
  const [feedbackOption, setFeedbackOption] = useState<any>(null);
  const [level, setLevel] = useState<any>(null);
  const [topic, setTopic] = useState<string | null>(null);
  const [personality, setPersonality] = useState<any>("");
  const [personalities, setPersonalities] = useState<Option[]>([]);
  const [personalityText, setPersonalityText] = useState<string>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [pageSwitch, setPageSwitch] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  const variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const [personalitiesLoading, setPersonalitiesLoading] =
    useState<boolean>(true);

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

  const optionsCEFR: Option[] = useMemo(
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

  useEffect(() => {
    const fetchPersonalities = async () => {
      setPersonalitiesLoading(true);
      const response = await axios.post(
        "/api/personality",
        { userId: session?.user.id },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = await response.data.data;

      const allPersonalities = data.map((item: any, index: number) => ({
        id: `${index}`,
        value: item.ai_personality,
        label: item.ai_name,
      }));

      setPersonalities(allPersonalities);
      setPersonalitiesLoading(false);
    };

    fetchPersonalities();
  }, []);

  function handlePersonalityChange(selectedOption: Option | Option[] | null) {
    if (Array.isArray(selectedOption)) {
      setPersonality(selectedOption[0]?.label || "");
      setPersonalityText(selectedOption[0]?.value || "");
    } else {
      setPersonality(selectedOption?.label || "");
      setPersonalityText(selectedOption?.value || "");
    }
  }

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

      setPageSwitch(true);

      setTimeout(() => {
        router.push(`/home/chat/${chatId}`);
      }, 500);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  if (personalities.length === 0 || personalitiesLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-slate-700 text-slate-700">
        .
      </div>
    );
  }

  return (
    <motion.section
      exit={{ opacity: 0 }}
      className="flex justify-center h-full w-full max-w-lg gap-8 my-6"
    >
      <PageSwitch.TopToBottom />
      {pageSwitch && <PageSwitch.BottomToTop />}

      <div className="w-full">
        <div className="flex">
          <PageSwitchButton
            route="/home/practice/chats"
            setPageSwitch={setPageSwitch}
            className="p-2 rounded-full me-2 bg-slate-800 relative top-1"
          >
            <BiArrowBack />
          </PageSwitchButton>
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
              styles={styles}
              isMulti={false}
              isClearable={false}
              options={optionsCEFR}
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

        <section className="my-4">
          <section className="flex items-center justify-between w-full gap-4 mb-4">
            <p className="font-bold flex">Personalidade da IA:</p>
            <div className="w-72">
              <Select
                id="personality"
                value={personalities}
                styles={styles}
                isMulti={false}
                isClearable={true}
                options={personalities}
                placeholder="Selecione a Personalidade"
                noOptionsMessage="Personalidade não encontrada"
                onChange={handlePersonalityChange}
              />
            </div>
          </section>

          <p className="italic mb-2 text-slate-500">
            Se não houver opções de personalidade, você pode criar uma em
            <PageSwitchButton
              route="/home/practice/chats"
              setPageSwitch={setPageSwitch}
              className="underline italic"
            >
              configurações
            </PageSwitchButton>{" "}
            ou simplesmente escrever uma abaixo!
          </p>

          <textarea
            name="personality"
            autoComplete="off"
            rows={5}
            value={personalityText}
            onChange={(e) => setPersonality(e.target.value)}
            placeholder="Personalidade da IA"
            className="outline-none w-full resize-none rounded-md bg-slate-800 text-slate-300 p-2"
          />
        </section>

        <section className="w-full flex justify-center">
          {disabled ? (
            <motion.div exit={{ opacity: 1 }} variants={variants}>
              <Spinner />
            </motion.div>
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
    </motion.section>
  );
}
