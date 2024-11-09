// @ts-nocheck

"use client";

import UserBalloon from "@/components/Balloons/UserBalloon";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import BotBalloon from "@/components/Balloons/BotBalloon";

export default function Home({ params }: any) {
  const { chat } = React.use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [chatData, setChatData] = useState<Array<any>>([]);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/home/practice/chats");
    },
  });

  const userId = session?.user.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId === undefined) return;

        const response = await axios.get(`/api/messages/${userId}/${chat}`);

        if (!response.data || !Array.isArray(response.data.data)) {
          router.push("/not-found");
        } else {
          setChatData(response.data.data);
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

  if (loading || !chatData) {
    return (
      <main className="h-full bg-slate-800 rounded-xl p-6 m-6">
        <div>Carregando...</div>
      </main>
    );
  }

  return (
    <main className="min-h-[75%] max-h-[75%] overflow-x-hidden overflow-y-scroll bg-slate-800 rounded-xl p-6 m-6">
      {chatData.map((item: any, index: number) => {
        if (item.sender === "user") {
          if (item.content.text) {
            return <UserBalloon key={index} message={item.content.text} />;
          }
        } else {
          if (item.content.text) {
            return (
              <BotBalloon
                key={index}
                message={item.content.text}
                audio={item.content.audioData}
                translation={item.content.translation}
              />
            );
          }
        }
        return null;
      })}
    </main>
  );
}
