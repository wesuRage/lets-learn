"use client";

import ChatBalloon from "@/components/Balloons/ChatBalloon";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Key, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PageSwitch } from "@/components/transitions/PageSwitch";
import { IoSettingsSharp } from "react-icons/io5";
import PageSwitchButton from "@/components/transitions/PageSwitchButton";

const variants = {
  container: {
    animate: {
      transition: {
        delay: 0.5,
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
  const [loading, setLoading] = useState(true);
  const [chatData, setChatData] = useState<any>(null);
  const [pageSwitch, setPageSwitch] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user.id == undefined) return;
        const response = await axios.post("/api/chats/", {
          userId: session?.user.id,
        });
        if (response.data !== undefined) setChatData(response.data.data);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          <PageSwitchButton
            route="/home/practice/settings"
            setPageSwitch={setPageSwitch}
            className="flex font-bold"
          >
            <IoSettingsSharp className="text-4xl me-2 hover:bg-slate-700 rounded-full transition ease-in-out duration-150 p-2" />
          </PageSwitchButton>
        </div>
        <div className="text-center mt-20">
          <PageSwitchButton
            route="/home/practice/new-chat"
            setPageSwitch={setPageSwitch}
            className="hover:scale-125 transition ease-in-out duration-150 border-2 border-slate-800 hover:bg-slate-800 rounded-xl p-2 relative top-3"
          >
            <p className="font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-700 inline-block text-transparent bg-clip-text">
              Iniciar Novo Chat
            </p>
          </PageSwitchButton>
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
