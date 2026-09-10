import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar"; 
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio Imam Mahmuda — Web Developer",
  description: "Portfolio pribadi Imam Mahmuda — Web Developer & Software Engineer. Dibangun dengan Next.js, Three.js, dan Framer Motion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}><Navbar />{children}</body>
    </html>
  );
}