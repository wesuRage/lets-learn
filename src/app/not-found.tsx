import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center h-screen">
      <section className="text-center">
        <div className="flex items-center text-2xl text-red-500">
          <FaTimes className="relative top-[0.15rem] text-3xl" />
          <p>Page Not Found</p>
        </div>
        <br />
        <div className="flex items-center justify-center">
          <Link
            href="/home/practice/chats"
            className="underline flex items-center text-slate-400"
          >
            Go Back
            <GoArrowUpRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
