import "@/app/globals.css";
import { AnimatePresence } from "framer-motion";

export const metadata = {
  title: "Let's Learn",
  description: "Start learning!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AnimatePresence>
      <html suppressHydrationWarning={true}>
        <body className="bg-slate-900 text-slate-300 flex justify-center">
          {children}
        </body>
      </html>
    </AnimatePresence>
  );
}
