interface BotBalloonProps {
  children: React.ReactNode;
}

export default function BotBalloon({ children }: BotBalloonProps) {
  return (
    <section>
      <div>
        <p>{children}</p>
      </div>
    </section>
  );
}
