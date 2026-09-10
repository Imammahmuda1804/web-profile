"use client";

import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import Magnet from "./Magnet";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = ["home", "about", "experience", "portofolio"];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/70 backdrop-blur-md py-4 border-b border-white/10" : "py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
        <div className="font-bold text-xl cursor-pointer">
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="text-white hover:text-cyan-400 transition-colors"
          >
            Imam Mahmuda
          </Link>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-x-8">
          {navItems.map((item) => (
            <li key={item}>
              <Magnet padding={20} magnetStrength={3}>
                <Link
                  activeClass="text-cyan-400 font-semibold"
                  to={item}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="capitalize text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {item}
                </Link>
              </Magnet>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
      </nav>

      {/* Mobile dropdown drawer */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-gray-800 px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <Link
              key={item}
              to={item}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={() => setIsOpen(false)}
              className="block capitalize text-gray-300 hover:text-cyan-400 py-2 text-base font-medium transition-colors cursor-pointer"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
