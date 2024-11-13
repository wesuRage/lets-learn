// @ts-nocheck

"use client";

import UserBalloon from "@/components/Balloons/UserBalloon";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import BotBalloon from "@/components/Balloons/BotBalloon";
import { motion } from "framer-motion";
import { PageSwitch } from "@/components/transitions/PageSwitch";

export default function Chat({ params }: any) {
  const { chat } = React.use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/home/practice/chats");
    },
  });

  const userId = session?.user.id;
  const [chatData, setChatData] = useState<Array<any>>([]);
  const [background, setBackground] = useState<string>("rgb(15, 23, 42)");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const previousChatLength = useRef(0);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId === undefined) return;

        const response = await axios.get(`/api/messages/${userId}/${chat}`);

        if (!response.data || !Array.isArray(response.data.data)) {
          router.push("/not-found");
        } else {
          const data = await response.data;
          setChatData(data.data);
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
        router.push("/not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [chat, router, userId]);

  useEffect(() => {
    if (
      chatData.length > previousChatLength.current ||
      previousChatLength.current === 0
    ) {
      scrollToBottom();
    }
    previousChatLength.current = chatData.length;
  }, [chatData]);

  if (loading || !chatData) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-slate-700 text-slate-700">
        .
      </div>
    );
  }

  return (
    <motion.section
      exit={{ opacity: 0 }}
      className="min-h-[75%] max-h-[75%] overflow-x-hidden overflow-y-scroll bg-slate-800 rounded-xl p-6 m-6"
    >
      <PageSwitch.TopToBottom />

      {chatData.map((item: any, index: number, { length }) => {
        if (item.sender === "user") {
          if (item.content.text) {
            if (index + 1 == length) {
              return (
                <>
                  <UserBalloon key={index} message={item.content.text} />
                  <BotBalloon loading={true} />
                </>
              );
            } else {
              return <UserBalloon key={index} message={item.content.text} />;
            }
          }
        } else {
          if (item.content.text) {
            return (
              <BotBalloon
                message={item.content.text}
                messageId={item.messageId}
                translation={item.content.translation}
              />
            );
          }
        }
        return null;
      })}

      <div ref={chatEndRef} />
    </motion.section>
  );
}
