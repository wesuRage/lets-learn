import { MouseEventHandler } from "react";
import { IconType } from "react-icons";

interface BotBalloonButton {
  Icon: IconType;
  func: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function BotBalloonButton({ Icon, func }: BotBalloonButton) {
  return (
    <button
      onClick={func}
      className="text-2xl p-3 rounded-full hover:bg-slate-900 transition ease-in-out duration-150"
    >
      <Icon />
    </button>
  );
}
