import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";

export const courierPrime = Courier_Prime({
  weight: '700',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Dice Fights 🥊",
  description: "Squaqqueroni",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${courierPrime.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
