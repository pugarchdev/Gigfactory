"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

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
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-md dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]" id="navbar">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex flex-col group"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex items-center gap-2">
            {/* Light: black Factory; Gig = same PNG as dark (color strip) over white plate so edges don’t sit on black. Dark: single image. */}
            <div className="group-hover:scale-[1.02] transition-transform origin-left relative dark:hidden isolate h-8 md:h-10 w-auto inline-block">
              {/* Black "factory" part */}
              <img
                src="/assets/GIG.png"
                alt="Gigfactory Logo"
                className="relative z-0 block h-full w-auto object-contain object-left [filter:grayscale(1)_contrast(1.45)_brightness(0)] [clip-path:inset(0_0_0_31%)]"
              />
              {/* Green "Gig" part */}
              <img
                src="/assets/GIG.png"
                alt=""
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-auto object-contain object-left [clip-path:inset(0_69%_0_0)]"
              />
            </div>
            <div className="group-hover:scale-[1.02] transition-transform origin-left hidden dark:block">
              <img
                src="/assets/GIG.png"
                alt="Gigfactory Logo"
                className="h-8 md:h-10 w-auto object-contain"
              />
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
            className={`text-sm font-semibold transition-colors ${isActive('/') ? 'text-neon-green' : 'text-zinc-500 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'}`}
          >
            Home
          </Link>
          <Link
            href="/expertise"
            className={`text-sm font-semibold transition-colors ${isActive('/expertise') ? 'text-neon-green' : 'text-zinc-500 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'}`}
          >
            Our Expertise
          </Link>
          <Link
            href="/projects"
            className={`text-sm font-semibold transition-colors ${isActive('/projects') ? 'text-neon-green' : 'text-zinc-500 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'}`}
          >
            Projects
          </Link>
          <Link
            href="/case-studies"
            className={`text-sm font-semibold transition-colors ${isActive('/case-studies') ? 'text-neon-green' : 'text-zinc-500 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'}`}
          >
            Case Studies
          </Link>

          <div className="w-px h-6 bg-zinc-200 dark:bg-dark-border mx-2"></div>

          <Link
            href="/login"
            className="nav-link bg-transparent border border-neon-green text-neon-green hover:bg-neon-green hover:text-dark-base hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-300"
          >
            Login
          </Link>

          <ThemeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-zinc-600 dark:text-gray-300 hover:text-zinc-900 dark:hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
        </button>
      </div>
      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-dark-border p-6 flex flex-col gap-4 shadow-2xl">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`text-left text-lg font-medium p-3 rounded-lg ${isActive('/') ? 'bg-zinc-100 dark:bg-dark-surface text-neon-green' : 'text-zinc-600 dark:text-gray-300'}`}
          >
            Home
          </Link>
          <Link
            href="/expertise"
            onClick={() => setIsOpen(false)}
            className={`text-left text-lg font-medium p-3 rounded-lg ${isActive('/expertise') ? 'bg-zinc-100 dark:bg-dark-surface text-neon-green' : 'text-zinc-600 dark:text-gray-300'}`}
          >
            Our Expertise
          </Link>
          <Link
            href="/projects"
            onClick={() => setIsOpen(false)}
            className={`text-left text-lg font-medium p-3 rounded-lg ${isActive('/projects') ? 'bg-zinc-100 dark:bg-dark-surface text-neon-green' : 'text-zinc-600 dark:text-gray-300'}`}
          >
            Projects
          </Link>
          <Link
            href="/case-studies"
            onClick={() => setIsOpen(false)}
            className={`text-left text-lg font-medium p-3 rounded-lg ${isActive('/case-studies') ? 'bg-zinc-100 dark:bg-dark-surface text-neon-green' : 'text-zinc-600 dark:text-gray-300'}`}
          >
            Case Studies
          </Link>
          <div className="flex items-center justify-between p-3 mt-2">
            <span className="text-zinc-600 dark:text-gray-300 font-medium">Theme</span>
            <ThemeToggle />
          </div>
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="mt-2 bg-neon-green text-dark-base font-bold p-3 rounded-xl text-center w-full shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}