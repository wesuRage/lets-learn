import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, ButtonHTMLAttributes } from "react";

interface PageSwitchButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  route: string;
  setPageSwitch: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function PageSwitchButton({
  route,
  setPageSwitch,
  children,
  ...props
}: PageSwitchButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        setPageSwitch(true);

        setTimeout(() => {
          router.push(route);
        }, 500);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
