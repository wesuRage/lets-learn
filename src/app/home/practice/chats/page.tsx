"use client";

import ChatBalloon from "@/components/Balloons/ChatBalloon";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { motion, Variants } from "framer-motion";
import { PageSwitch } from "@/components/transitions/PageSwitch";

const variants = {
  container: {
    animate: {
      transition: {
        delay: 0.5, // Adiciona um delay de 0,5 segundos antes de iniciar
        staggerChildren: 0.1,
      },
    },
  },
  card: {
    card_text: {
      initial: {
        opacity: 0,
        x: -50,
      },
      animate: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.3,
        },
      },
    },
    card_container: {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: {
          duration: 0.3,
        },
      },
    },
  },
};

export default function Chats() {
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [chatData, setChatData] = useState<any>(null); // Estado para armazenar os dados do chat
  const [pageSwitch, setPageSwitch] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user.id == undefined) return;
        const response = await axios.post("/api/chats/", {
          userId: session?.user.id,
        });
        if (response.data !== undefined) setChatData(response.data.data); // Armazena os dados do chat
      } catch (error) {
        console.error("Error fetching chat data:", error);
      } finally {
        setLoading(false); // Atualiza o estado de carregamento
      }
    };

    fetchData(); // Chama a função de busca de dados
  }, [session?.user.id]);

  if (loading) {
    return (
      <div className="fixed w-full h-full bg-slate-700 text-slate-700">.</div>
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
        <div className="flex justify-between w-full">
          <h1 className="font-bold">Chats</h1>
          <button
            onClick={() => signOut()}
            className="flex font-bold hover:text-red-500 transition ease-in-out duration-150"
          >
            <BiLogOut className="text-2xl me-2" /> Sair
          </button>
        </div>
        <div className="text-center mt-20">
          <button
            onClick={() => {
              setPageSwitch(true);

              setTimeout(() => {
                router.push("/home/practice/new-chat");
              }, 500);
            }}
            className="hover:scale-125 transition ease-in-out duration-150 border-2 border-slate-800 hover:bg-slate-800 rounded-xl p-2 relative top-3"
          >
            <p className="font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-700 inline-block text-transparent bg-clip-text">
              Iniciar Novo Chat
            </p>
          </button>
          <br />
          <br />
          {chatData !== null && (
            <motion.div
              initial="initial"
              animate="animate"
              variants={variants.container}
            >
              {chatData.map((chat: any, index: Key) => (
                <ChatBalloon
                  key={index}
                  button_variant={variants.card.card_container}
                  text_variant={variants.card.card_text}
                  id={chat.chatId}
                  title={chat.title}
                  language={chat.language}
                  feedback={chat.feedback}
                  createdAt={chat.createdAt}
                  setPageSwitch={setPageSwitch}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </motion.section>
  );
}
