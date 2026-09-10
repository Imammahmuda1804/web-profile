"use client";

import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import Magnet from "./Magnet";
import { useSite } from "@/context/SiteContext";

const SunIcon = () => (
  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="4" />
    <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, lang, toggleLang, t, mounted } = useSite();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "experience", label: t.nav.experience },
    { id: "portofolio", label: t.nav.portfolio },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md py-4 border-b border-border shadow-sm"
          : "py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
        <div className="font-bold text-xl cursor-pointer">
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="text-foreground hover:text-accent transition-colors"
          >
            Imam Mahmuda
          </Link>
        </div>

        {/* Desktop menu & controls */}
        <div className="hidden md:flex items-center gap-x-8">
          <ul className="flex items-center gap-x-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <Magnet padding={20} magnetStrength={3}>
                  <Link
                    activeClass="text-accent font-semibold"
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="capitalize text-muted hover:text-accent transition-colors cursor-pointer"
                  >
                    {item.label}
                  </Link>
                </Magnet>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-x-3 pl-6 border-l border-border">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="px-2.5 py-1 text-xs font-semibold rounded-full border border-border bg-card/60 hover:border-accent text-foreground transition-colors cursor-pointer"
              aria-label={t.langToggle.aria}
            >
              <span className={lang === "id" ? "text-accent font-bold" : "text-muted"}>ID</span>
              <span className="text-muted mx-1">/</span>
              <span className={lang === "en" ? "text-accent font-bold" : "text-muted"}>EN</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-border bg-card/60 hover:border-accent transition-colors cursor-pointer flex items-center justify-center"
              aria-label={theme === "dark" ? t.themeToggle.toLight : t.themeToggle.toDark}
            >
              {mounted ? (theme === "dark" ? <SunIcon /> : <MoonIcon />) : <span className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile controls & hamburger button */}
        <div className="flex items-center gap-x-2 md:hidden">
          {/* Quick Language Toggle */}
          <button
            onClick={toggleLang}
            className="px-2 py-1 text-xs font-semibold rounded-full border border-border bg-card/80 text-foreground"
            aria-label={t.langToggle.aria}
          >
            <span className={lang === "id" ? "text-accent font-bold" : "text-muted"}>ID</span>
            <span className="text-muted mx-0.5">/</span>
            <span className={lang === "en" ? "text-accent font-bold" : "text-muted"}>EN</span>
          </button>

          {/* Quick Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full border border-border bg-card/80 flex items-center justify-center"
            aria-label={theme === "dark" ? t.themeToggle.toLight : t.themeToggle.toDark}
          >
            {mounted ? (theme === "dark" ? <SunIcon /> : <MoonIcon />) : <span className="w-4 h-4" />}
          </button>

          {/* Hamburger button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-foreground p-2 rounded-lg hover:bg-card transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown drawer */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={() => setIsOpen(false)}
              className="block capitalize text-muted hover:text-accent py-2 text-base font-medium transition-colors cursor-pointer"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
