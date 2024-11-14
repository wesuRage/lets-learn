// @ts-nocheck

"use client";

import Spinner from "@/components/Spinner";
import { PageSwitch } from "@/components/transitions/PageSwitch";
import PageSwitchButton from "@/components/transitions/PageSwitchButton";
import axios from "axios";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import React from "react";
import { TbTrash } from "react-icons/tb";

export default function Personality({ params }: any) {
  const { id } = React.use(params);

  const [pageSwitch, setPageSwitch] = useState<boolean>(false);
  const { data: session } = useSession();
  const [AIName, setAIName] = useState<any>();
  const [AIPersonality, setAIPersonality] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPersonality = async () => {
      const response = await axios.post(
        `/api/personality/${id}`,
        { userId: session?.user.id },
        { headers: { "Content-Type": "application/json" } }
      );

      setAIName(await response.data.data.ai_name);
      setAIPersonality(await response.data.data.ai_personality);
    };

    fetchPersonality();
  }, []);

  async function updatePersonality() {
    if (!AIName || AIName == "" || !AIPersonality || AIPersonality == "") {
      alert("Preencha todos os campos!");
    }

    setLoading(true);
    await axios.patch(`/api/personality/${id}`, {
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

  if (!AIName || !AIPersonality) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-slate-700 text-slate-700">
        .
      </div>
    );
  }

  return (
    <motion.section
      exit={{ opacity: 0 }}
      className="flex justify-center h-full w-full max-w-lg gap-8 mt-4"
    >
      <PageSwitch.TopToBottom />
      {pageSwitch && <PageSwitch.BottomToTop />}

      <section className="w-full">
        <div className="flex justify-between items-center">
          <PageSwitchButton
            route="/home/practice/settings"
            setPageSwitch={setPageSwitch}
            className="p-2 rounded-full me-2 bg-slate-800 relative top-1"
          >
            <BiArrowBack />
          </PageSwitchButton>

          <button className="flex items-center gap-2 text-red-500">
            <TbTrash /> Deletar Personalidade
          </button>
        </div>

        <section className="my-4">
          <h1 className="text-2xl font-bold">Editar personalidade</h1>
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
                value={AIName}
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
                value={AIPersonality}
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
              onClick={updatePersonality}
              className="hover:scale-125 transition ease-in-out duration-150 border-2 border-slate-800 hover:bg-slate-800 rounded-xl p-2 relative top-3"
            >
              <p className="font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-700 inline-block text-transparent bg-clip-text">
                Atualizar
              </p>
            </button>
          )}
        </div>
      </section>
    </motion.section>
  );
}
