import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Inter } from 'next/font/google';
import "./styles/globals.css";

export const inter = Inter({subsets: ['cyrillic', 'latin'], weight: ['700']});

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="ru">
        <body className={`${inter.className} bg-background text-lg text-black min-h-screen flex flex-col`}>
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
