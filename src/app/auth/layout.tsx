import AuthProvider from "@/components/Providers/auth-provider";

export const metadata = {
  title: "Sign In - Let's Learn",
  description: "Sign In and Start Learning!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body
      suppressHydrationWarning={true}
      className="bg-slate-900 text-slate-300"
    >
      <AuthProvider>
        <div className="flex justify-center items-center fixed h-full w-full">
          {children}
        </div>
      </AuthProvider>
    </body>
  );
}
