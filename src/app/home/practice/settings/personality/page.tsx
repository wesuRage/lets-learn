"use client";

import Spinner from "@/components/Spinner";
import { PageSwitch } from "@/components/transitions/PageSwitch";
import PageSwitchButton from "@/components/transitions/PageSwitchButton";
import axios from "axios";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";

export default function NewPersonality() {
  const [pageSwitch, setPageSwitch] = useState<boolean>(false);
  const { data: session } = useSession();
  const [AIName, setAIName] = useState<any>();
  const [AIPersonality, setAIPersonality] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function createPersonality() {
    if (!AIName || AIName == "" || !AIPersonality || AIPersonality == "") {
      alert("Preencha todos os campos!");
    }

    setLoading(true);
    await axios.post("/api/personality", {
      userId: session?.user.id,
      ai_name: AIName,
      ai_personality: AIPersonality,
    });
    setLoading(false);
    setPageSwitch(true);

    setTimeout(() => {
      router.push("/home/practice/settings");
    }, 500);
  }

  return (
    <motion.section
      exit={{ opacity: 0 }}
      className="flex justify-center h-full w-full max-w-lg gap-8 mt-4"
    >
      <PageSwitch.TopToBottom />
      {pageSwitch && <PageSwitch.BottomToTop />}

      <section className="w-full">
        <div className="flex">
          <PageSwitchButton
            route="/home/practice/settings"
            setPageSwitch={setPageSwitch}
            className="p-2 rounded-full me-2 bg-slate-800 relative top-1"
          >
            <BiArrowBack />
          </PageSwitchButton>
        </div>

        <section className="my-4">
          <h1 className="text-2xl font-bold">Criar personalidade</h1>
          <hr className="border-1 border-slate-300 my-4" />

          <div className="flex">
            <label
              htmlFor="name"
              className="w-full flex justify-between items-center"
            >
              Nome da IA:
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e: any) => setAIName(e.target.value)}
                className="outline-none w-72 rounded-md bg-slate-800 text-slate-300 p-2"
              />
            </label>
          </div>

          <div>
            <label htmlFor="personality">
              Personalidade:
              <textarea
                name="personality"
                autoComplete="off"
                rows={5}
                onChange={(e) => setAIPersonality(e.target.value)}
                placeholder="Personalidade da IA"
                className="mt-2 outline-none w-full resize-none rounded-md bg-slate-800 text-slate-300 p-2"
              />
            </label>
          </div>
        </section>

        <div className="flex justify-center items-center">
          {loading ? (
            <Spinner />
          ) : (
            <button
              onClick={createPersonality}
              className="hover:scale-125 transition ease-in-out duration-150 border-2 border-slate-800 hover:bg-slate-800 rounded-xl p-2 relative top-3"
            >
              <p className="font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-700 inline-block text-transparent bg-clip-text">
                Criar personalidade
              </p>
            </button>
          )}
        </div>
      </section>
    </motion.section>
  );
}
