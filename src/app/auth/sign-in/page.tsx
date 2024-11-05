"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { FaGoogle } from "react-icons/fa";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [error, setError] = useState<{ message: string }>();
  const [hovered, setHovered] = useState<boolean>(false);

  async function handleGoogleSignIn() {
    try {
      const response = await signIn("google", {
        redirect: true,
        callbackUrl: callbackUrl || "/home/practice",
      });

      if (response) {
        const { ok, error, url } = response;

        if (!ok && error === "CredentialsSignin") {
          setError({ message: "Invalid E-mail or Password." });
        }

        if (ok && url) {
          router.push(url);
        }
      }
    } catch (error) {
      setError({ message: "Internal server error" });
    }
  }

  return (
    <div>
      <section className="p-10 h-full">
        <h1 className="leading-normal mb-6 font-bold text-6xl max-w-[270px]">
          Sign In and Start
          <span className="font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-700 inline-block text-transparent bg-clip-text">
            Learning
          </span>
          !
        </h1>
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleGoogleSignIn}
          className="hover:scale-150 transition ease-in-out duration-150 hover:bg-slate-800 flex items-center w-full justify-center border-4 border-slate-800 rounded-full p-2"
        >
          <FaGoogle className={`me-2 ${hovered ? "text-blue-600" : ""}`} />
          <span
            className={`${
              hovered
                ? "font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-600 inline-block text-transparent bg-clip-text"
                : ""
            }`}
          >
            Sign In with Google
          </span>
        </button>
        <p className="text-red-500 font-bold">{error?.message}</p>
      </section>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
