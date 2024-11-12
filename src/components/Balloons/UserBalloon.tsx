"use client";

import { Key } from "react";

interface UserBalloonProps {
  key: Key;
  message: string;
}

export default function UserBalloon({ key, message }: UserBalloonProps) {
  return (
    <section className="flex justify-between" key={key}>
      <div></div>
      <div className="flex">
        <div className="bg-slate-900 p-2 rounded-xl rounded-tr-none">
          <p>{message}</p>
        </div>
        <div className="w-0 h-0 border-t-[0px] border-t-transparent border-l-[15px] border-l-slate-900 border-b-[15px] border-b-transparent"></div>
      </div>
    </section>
  );
}
