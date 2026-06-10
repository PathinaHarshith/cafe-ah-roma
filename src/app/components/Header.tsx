"use client";

import { useState, useEffect } from "react";
import { Phone, ShoppingBag, Menu, X, Coffee } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-md shadow-lg py-3"
          : "bg-primary py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Navigation Links - Desktop */}
          <nav className="hidden md:flex space-x-8 text-sm font-semibold tracking-widest text-white/95">
            <Link
              href="#home"
              className="hover:text-cream transition-colors duration-200 uppercase"
            >
              Home
            </Link>
            <Link
              href="#about"
              className="hover:text-cream transition-colors duration-200 uppercase"
            >
              About
            </Link>
            <Link
              href="#menu"
              className="hover:text-cream transition-colors duration-200 uppercase"
            >
              Menu
            </Link>
            <Link
              href="#locations"
              className="hover:text-cream transition-colors duration-200 uppercase"
            >
              Locations
            </Link>
          </nav>

          {/* Centered Logo */}
          <div className="flex-1 flex justify-start md:justify-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-serif text-2xl font-bold tracking-widest"
            >
              <Coffee className="h-6 w-6 text-cream" />
              <span className="uppercase text-xl sm:text-2xl whitespace-nowrap">Cafe Ah-Roma</span>
            </Link>
          </div>

          {/* Right Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="tel:+390331123456"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-200 text-sm font-semibold tracking-wider"
            >
              <Phone className="h-4 w-4" />
              <span>+39 0331 123456</span>
            </a>
            <button className="relative p-2 text-white/90 hover:text-white transition-colors duration-200">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-cream text-primary text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <Link
              href="#reservation"
              className="bg-white text-primary hover:bg-cream-dark transition-all duration-200 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm hover:scale-105"
            >
              Book Table
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
            <button className="relative p-2 text-white">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-cream text-primary text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-white hover:text-cream focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 border-t border-white/10" : "max-h-0 opacity-0"
        } bg-primary`}
      >
        <div className="px-4 pt-4 pb-6 space-y-3">
          <Link
            href="#home"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-white hover:bg-white/10 tracking-wider uppercase"
          >
            Home
          </Link>
          <Link
            href="#about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-white hover:bg-white/10 tracking-wider uppercase"
          >
            About
          </Link>
          <Link
            href="#menu"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-white hover:bg-white/10 tracking-wider uppercase"
          >
            Menu
          </Link>
          <Link
            href="#locations"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-white hover:bg-white/10 tracking-wider uppercase"
          >
            Locations
          </Link>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
            <a
              href="tel:+390331123456"
              className="flex items-center gap-3 px-3 py-2 text-white font-semibold tracking-wide"
            >
              <Phone className="h-5 w-5 text-cream" />
              <span>+39 0331 123456</span>
            </a>
            <Link
              href="#reservation"
              onClick={() => setIsOpen(false)}
              className="w-full bg-white text-primary text-center font-bold uppercase py-3 rounded-full text-sm tracking-wider hover:bg-cream transition-colors duration-200"
            >
              Book A Table
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
