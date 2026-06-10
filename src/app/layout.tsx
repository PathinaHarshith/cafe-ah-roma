import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cafe Ah-Roma | Gourmet Food & Dine-In",
  description: "Experience gourmet culinary moments at Cafe Ah-Roma. Taste our expertly prepared fresh dishes and enjoy world-class standards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased font-sans"
    >
      <body className="min-h-full flex flex-col bg-[#FAF6F0] text-[#1E1B18] selection:bg-[#BD1E24] selection:text-white">
        {children}
      </body>
    </html>
  );
}
