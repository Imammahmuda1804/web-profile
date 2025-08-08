"use client";

import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import Magnet from "./Magnet";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        isScrolled ? 'bg-black/50 backdrop-blur-md py-4' : 'py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <div className="font-bold text-xl cursor-pointer">
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="text-white"
          >
         
          </Link>
        </div>
        <ul className="hidden md:flex items-center gap-x-8">
          {navItems.map((item) => (
            <li key={item}>
              <Magnet padding={20} magnetStrength={3}>
                <Link
                  activeClass="text-cyan-400" 
                  to={item}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="capitalize text-white hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {item}
                </Link>
              </Magnet>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;