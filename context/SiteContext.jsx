"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { translations } from "@/data/translations";

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Sync theme from DOM (which anti-FOUC script in head already initialized)
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");

    // Sync language from localStorage
    try {
      const savedLang = localStorage.getItem("lang");
      if (savedLang === "en" || savedLang === "id") {
        setLang(savedLang);
        document.documentElement.lang = savedLang;
      }
    } catch {
      // Ignore localStorage access restrictions
    }

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // Ignore localStorage access restrictions
    }
  };

  const toggleLang = () => {
    const nextLang = lang === "id" ? "en" : "id";
    setLang(nextLang);
    document.documentElement.lang = nextLang;
    try {
      localStorage.setItem("lang", nextLang);
    } catch {
      // Ignore localStorage access restrictions
    }
  };

  const t = useMemo(() => translations[lang] || translations.id, [lang]);

  return (
    <SiteContext.Provider
      value={{
        theme,
        toggleTheme,
        lang,
        setLang,
        toggleLang,
        t,
        mounted,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
