import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center h-screen">
      <section className="text-center">
        <div className="flex items-center text-2xl">
          <FaTimes className="relative top-[0.15rem] text-3xl" />
          <p>Page Not Found</p>
        </div>
        <Link
          href="/home/practice/chats"
          className="underline flex items-center justify-center"
        >
          Go Back <GoArrowUpRight />
        </Link>
      </section>
    </main>
  );
}
