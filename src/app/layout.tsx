import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainNavigation from "./components/main-navigation/main-navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Jazz Riff Lab",
   description: "Get your jam going",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <MainNavigation />
            <main>{children}</main>
         </body>
      </html>
   );
}
