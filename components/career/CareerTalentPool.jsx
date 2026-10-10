"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CareerTalentPool({ onScrollToForm }) {
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
    <section className="pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
      <div
        className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 transition-shadow"
        style={{
          background:
            'linear-gradient(135deg, rgba(18, 24, 32, 0.95) 0%, rgba(10, 13, 18, 0.98) 100%)',
          border: '1px solid #22c55e',
          boxShadow: '0 0 25px rgba(34, 197, 94, 0.15)',
        }}
      >
        <div className="space-y-3 text-center md:text-left">
          <div className="text-xs font-bold tracking-[0.15em] text-[#22c55e] uppercase">
            YOUR NEXT CHAPTER
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Join our talent pool
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed">
            Don&apos;t see an exact match right now? Tell us what you&apos;re interested in,
            and we&apos;ll keep you in mind for upcoming roles.
          </p>
        </div>

        <button
          onClick={handleScroll}
          className="bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-sm px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-[#22c55e]/20 whitespace-nowrap flex items-center hover:scale-105 cursor-pointer shrink-0"
        >
          <span>Submit Your Interest</span>
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
