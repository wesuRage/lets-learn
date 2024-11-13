"use client";

import Header from "@/components/Header";
import SendOptions from "@/components/SendOptions";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const chatId = pathname.split("/").pop();
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const fetchTitle = async () => {
      if (chatId) {
        try {
          const response = await axios.get(`/api/chat/${chatId}`);
          setTitle(response.data.data.title);
        } catch (error) {
          console.error("Error fetching title:", error);
        }
      }
    };

    fetchTitle();
  }, [chatId]);

  return (
    <div className="text-slate-300 transition-colors duration-200 ease-in-out">
      <section className="w-full fixed flex justify-between flex-col h-full p-6">
        <Header title={title} id={chatId || ""} />
        {children}
        <SendOptions uuid={chatId || ""} />
      </section>
    </div>
  );
}
