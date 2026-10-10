"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CareerHero({ onScrollToForm }) {
  const handleScroll = () => {
    if (onScrollToForm) {
      onScrollToForm();
      return;
    }
    const formSection = document.getElementById('application-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.getElementById('fullName');
        if (input) input.focus();
      }, 600);
    }
  };

  return (
    <section
      className="relative min-h-[500px] md:h-[65vh] flex items-center justify-center text-center px-6 py-20 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Dark overlay with subtle radial green glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(10, 13, 18, 0.75) 0%, rgba(10, 13, 18, 0.98) 100%), radial-gradient(circle at center, rgba(34, 197, 94, 0.14) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          More than just a workplace
        </h1>
        <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
          Become part of a high-performance team pushing the boundaries of digital construction workflows,
          designing, and engineering services worldwide.
        </p>
        <div className="pt-2">
          <button
            onClick={handleScroll}
            className="inline-flex items-center justify-center bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold text-base px-8 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-[#22c55e]/20 hover:scale-105 cursor-pointer"
          >
            Submit Your Interests
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
