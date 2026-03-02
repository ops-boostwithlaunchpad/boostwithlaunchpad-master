"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[rgba(10,10,10,0.9)] backdrop-blur-[20px] border-b border-border sticky top-0 z-[1000]">
      <div className="max-w-[1400px] mx-auto px-12 max-md:px-5 flex justify-between items-center py-5">
        <Link href="/" className="font-heading text-2xl font-bold text-text no-underline">
          Launchpad.
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] w-[30px] h-[30px] cursor-pointer bg-transparent border-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-full h-[2px] bg-text transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[7px] translate-x-0" : ""
            }`}
          />
          <span
            className={`block w-full h-[2px] bg-text transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-full h-[2px] bg-text transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[7px] translate-x-0" : ""
            }`}
          />
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-12">
          <Link href="/" className="text-text-dim no-underline font-medium text-[0.95rem] hover:text-text transition-colors">
            Home
          </Link>
          <Link href="/products" className="text-text-dim no-underline font-medium text-[0.95rem] hover:text-text transition-colors">
            Products
          </Link>
          <Link href="/about" className="text-text-dim no-underline font-medium text-[0.95rem] hover:text-text transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-text-dim no-underline font-medium text-[0.95rem] hover:text-text transition-colors">
            Contact
          </Link>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-dark flex flex-col z-[999] border-t border-border">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-full py-5 px-8 text-center text-[1.1rem] text-text-dim no-underline border-b border-border hover:text-text transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
