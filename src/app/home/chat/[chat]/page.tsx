"use client";

import UserBalloon from "@/components/Balloons/UserBalloon";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home({ params }: any) {
  const chat = params.chat; // Extraindo o parâmetro do chat
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [chatData, setChatData] = useState(null); // Estado para armazenar os dados do chat

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/chat/${chat}`);
        if (!response.data.data) {
          router.push("/not-found");
        } else {
          setChatData(response.data.data); // Armazena os dados do chat
          console.log(chatData);
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
        router.push("/not-found");
      } finally {
        setLoading(false); // Atualiza o estado de carregamento
      }
    };

    fetchData(); // Chama a função de busca de dados
  }, [chat, router]);

  if (loading) {
    return (
      <main className="h-full bg-slate-800 rounded-xl p-6 m-6">
        <div>Carregando...</div>
      </main>
    );
  }

  return (
    <main className="h-full bg-slate-800 rounded-xl p-6 m-6">
      <UserBalloon>{chat}</UserBalloon>
    </main>
  );
}
