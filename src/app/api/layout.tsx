export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <body suppressHydrationWarning={true}>{children}</body>;
}
