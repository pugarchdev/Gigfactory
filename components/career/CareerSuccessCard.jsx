"use client";

import React from 'react';
import { Check } from 'lucide-react';

export default function CareerSuccessCard({ onReset }) {
  return (
    <div
      id="thankYouCard"
      className="rounded-3xl p-10 md:p-12 text-center space-y-6 shadow-2xl animate-in fade-in duration-300"
      style={{
        backgroundColor: '#121820',
        border: '1px solid rgba(34, 197, 94, 0.3)',
      }}
    >
      <div className="w-16 h-16 bg-[#22c55e]/15 border-2 border-[#22c55e] rounded-full flex items-center justify-center mx-auto text-[#4ade80]">
        <Check className="w-8 h-8 stroke-[3]" />
      </div>
      <h3 className="text-2xl md:text-3xl font-extrabold text-white">
        Thank you for your interest!
      </h3>
      <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
        Our talent acquisition team will review your application and get in touch shortly.
      </p>
      {/* {onReset && (
        <div className="pt-4">
          <button
            onClick={onReset}
            className="text-xs text-gray-400 hover:text-[#4ade80] underline transition-colors cursor-pointer"
          >
            Submit another application
          </button>
        </div>
      )} */}
    </div>
  );
}
