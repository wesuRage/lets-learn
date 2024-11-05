"use client";

import Header from "@/components/Header";
import SendOptions from "@/components/SendOptions";
import axios from "axios";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation"; // Importando usePathname
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const chatId = pathname.split("/").pop(); // Pega o último segmento do caminho
  console.log(chatId);

  const [title, setTitle] = useState<string>();

  useEffect(() => {
    const fetchTitle = async () => {
      if (chatId) {
        try {
          const response = await axios.get(`/api/chat/${chatId}`);
          setTitle(await response.data.data.title); // Ajuste isso com base na resposta real da API
        } catch (error) {
          console.error("Error fetching title:", error);
        }
      }
    };

    fetchTitle(); // Chama a função fetchTitle
  }, [chatId]); // Adicione chatId como dependência

  return (
    <body
      suppressHydrationWarning={true}
      className="bg-slate-900 text-slate-300"
    >
      <SessionProvider>
        <section className="w-full p-6 fixed flex flex-1 justify-between flex-col h-full">
          <Header title={title} id={chatId as string} />
          {children}
          <SendOptions uuid={chatId as string} />
        </section>
      </SessionProvider>
    </body>
  );
}
