interface UserBalloonProps {
  children: React.ReactNode;
}

export default function UserBalloon({ children }: UserBalloonProps) {
  return (
    <section className="flex justify-between">
      <div></div>
      <div className="flex">
        <div className="bg-slate-900 p-2 rounded-xl rounded-tr-none">
          <p>{children}</p>
        </div>
        <div className="w-0 h-0 border-t-[0px] border-t-transparent border-l-[15px] border-l-slate-900 border-b-[15px] border-b-transparent"></div>
      </div>
    </section>
  );
}
