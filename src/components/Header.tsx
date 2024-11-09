import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";

interface HeaderProps {
  title: string | undefined;
  id: string;
}

export default function Header({ title, id }: HeaderProps) {
  const router = useRouter();

  async function deleteChat() {
    await axios.delete(`/api/chat/${id}`);

    router.push("/home/practice/chats");
  }

  return (
    <section className="flex justify-between items-center mx-6">
      <div className="flex items-center">
        <Link
          href={"/home/practice/chats"}
          prefetch
          className="p-2 rounded-full me-2 bg-slate-800 relative top-1"
        >
          <BiArrowBack />
        </Link>
        <h1 className="font-bold text-2xl truncate">{title}</h1>
      </div>
      <button
        onClick={deleteChat}
        className="flex font-bold hover:text-red-500 transition ease-in-out duration-150"
      >
        <TbTrash className="text-2xl me-2" /> Delete Chat
      </button>
    </section>
  );
}
