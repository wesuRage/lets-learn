"use client";

import { SessionProvider } from "next-auth/react";

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body
      suppressHydrationWarning={true}
      className="bg-slate-900 text-slate-300 flex justify-center"
    >
      <SessionProvider>{children}</SessionProvider>
    </body>
  );
}
