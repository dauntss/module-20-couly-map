import type { Metadata } from "next";
import "./ui/globals.css";
import { Cinzel, Lusitana } from 'next/font/google';
import { SessionProvider } from "next-auth/react"

const cinzel = Cinzel({subsets: ['latin']});
const lusitana = Lusitana({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin']}
);

export const metadata: Metadata = {
  title: "Map of Couly",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      </head>
      <body className={`${cinzel.className} ${lusitana.className}`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
