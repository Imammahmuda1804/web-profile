import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { SiteProvider } from "@/context/SiteContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio Imam Mahmuda — Web Developer",
  description: "Portfolio pribadi Imam Mahmuda — Web Developer & Software Engineer. Dibangun dengan Next.js, Three.js, dan Framer Motion.",
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var isLight=t==='light'||(!t&&window.matchMedia('(prefers-color-scheme: light)').matches);if(isLight)document.documentElement.classList.add('light');}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={inter.className}>
        <SiteProvider>
          <Navbar />
          {children}
        </SiteProvider>
      </body>
    </html>
  );
}