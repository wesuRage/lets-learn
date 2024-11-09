"use client";

import ChatBalloon from "@/components/Balloons/ChatBalloon";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";

export default function Chats() {
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [chatData, setChatData] = useState<any>(null); // Estado para armazenar os dados do chat
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
      <main className="flex justify-center h-full w-full max-w-lg gap-8 mt-4">
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
          <div className="flex justify-center mt-20">
            <Spinner />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex justify-center h-full w-full max-w-lg gap-8 mt-4">
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
            onClick={() => router.push("/home/practice/new-chat")}
            className="hover:scale-125 transition ease-in-out duration-150 border-2 border-slate-800 hover:bg-slate-800 rounded-xl p-2 relative top-3"
          >
            <p className="font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-700 inline-block text-transparent bg-clip-text">
              Iniciar Novo Chat
            </p>
          </button>
          <br />
          <br />
          {chatData !== null && (
            <div>
              {chatData.map((chat: any, index: Key) => (
                <ChatBalloon
                  key={index}
                  id={chat.chatId}
                  title={chat.title}
                  createdAt={chat.createdAt}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
