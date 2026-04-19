"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll effect to make the navbar darker when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to check if a path is active
  const isActive = (path) => pathname === path;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a0a0a]/90 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'glass'
        }`}
      id="navbar"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex flex-col group"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex items-center gap-2">

            {/* Logo Image */}
            <img
              src="/assets/GIG.png" /* Replace with your actual logo path */
              alt="Gigfactory Logo"
              className="h-8 md:h-10 w-auto object-contain group-hover:scale-[1.02] transition-transform origin-left"
            />

            {/* SVG Flags Container */}
            <div className="flex items-center gap-2 ml-1 opacity-90 group-hover:opacity-100 transition-opacity">

              {/* India Flag SVG */}
              <svg className="w-6 h-4 rounded-sm shadow-sm" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="16" fill="#FF9933" />
                <rect y="5.33" width="24" height="5.33" fill="white" />
                <rect y="10.67" width="24" height="5.33" fill="#138808" />
                <circle cx="12" cy="8" r="2" fill="#000080" />
              </svg>

              {/* UK Flag SVG */}
              <svg className="w-6 h-4 rounded-sm shadow-sm" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="16" fill="#012169" />
                <path d="M0 0L24 16M24 0L0 16" stroke="white" strokeWidth="2.67" />
                <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.33" />
                <path d="M12 0V16M0 8H24" stroke="white" strokeWidth="4" />
                <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="2.67" />
              </svg>

            </div>
          </div>

          {/* Subtitle */}
          <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] text-zinc-400 uppercase mt-1 group-hover:text-zinc-300 transition-colors">
            Technology Enabled Platform
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors ${isActive('/') ? 'text-neon-green' : 'text-gray-400 hover:text-white'}`}
          >
            Home
          </Link>
          <Link
            href="/expertise"
            className={`text-sm font-semibold transition-colors ${isActive('/expertise') ? 'text-neon-green' : 'text-gray-400 hover:text-white'}`}
          >
            Our Expertise
          </Link>
          <Link
            href="/projects"
            className={`text-sm font-semibold transition-colors ${isActive('/projects') ? 'text-neon-green' : 'text-gray-400 hover:text-white'}`}
          >
            Projects
          </Link>
          <Link
            href="/case-studies"
            className={`text-sm font-semibold transition-colors ${isActive('/case-studies') ? 'text-neon-green' : 'text-gray-400 hover:text-white'}`}
          >
            Case Studies
          </Link>

          <div className="w-px h-6 bg-dark-border mx-2"></div>

          <Link
            href="/login"
            className="nav-link bg-transparent border border-neon-green text-neon-green hover:bg-neon-green hover:text-dark-base hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-300"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full glass border-b border-dark-border p-6 flex flex-col gap-4 shadow-2xl">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`text-left text-lg font-medium p-3 rounded-lg ${isActive('/') ? 'bg-dark-surface text-neon-green' : 'text-gray-300'}`}
          >
            Home
          </Link>
          <Link
            href="/expertise"
            onClick={() => setIsOpen(false)}
            className={`text-left text-lg font-medium p-3 rounded-lg ${isActive('/expertise') ? 'bg-dark-surface text-neon-green' : 'text-gray-300'}`}
          >
            Our Expertise
          </Link>
          <Link
            href="/projects"
            onClick={() => setIsOpen(false)}
            className={`text-left text-lg font-medium p-3 rounded-lg ${isActive('/projects') ? 'bg-dark-surface text-neon-green' : 'text-gray-300'}`}
          >
            Projects
          </Link>
          <Link
            href="/case-studies"
            onClick={() => setIsOpen(false)}
            className={`text-left text-lg font-medium p-3 rounded-lg ${isActive('/case-studies') ? 'bg-dark-surface text-neon-green' : 'text-gray-300'}`}
          >
            Case Studies
          </Link>
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="mt-4 bg-neon-green text-dark-base font-bold p-3 rounded-xl text-center w-full shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}