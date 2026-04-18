'use client'

import React, { useEffect } from 'react';

export default function ContactModal({ isOpen, onClose, preSelectedService }) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content Box */}
      <div className="relative w-full max-w-2xl bg-zinc-900/90 backdrop-blur-xl border border-[#6EDD4D]/30 rounded-[2rem] p-8 md:p-12 shadow-[0_0_50px_rgba(110,221,77,0.15)] animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-[#6EDD4D] hover:border-[#6EDD4D] transition-colors z-10"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Let&apos;s Talk</h3>
        <p className="text-zinc-400 mb-8">
          {preSelectedService 
            ? `Inquiring about: ${preSelectedService}` 
            : 'Fill out the form below and our team will get back to you.'}
        </p>

        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#6EDD4D] focus:shadow-[0_0_15px_rgba(110,221,77,0.2)] transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Email</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#6EDD4D] focus:shadow-[0_0_15px_rgba(110,221,77,0.2)] transition-all" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Service of Interest</label>
            <input 
              type="text" 
              defaultValue={preSelectedService || ''}
              placeholder="E.g. 3D BIM Services"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#6EDD4D] focus:shadow-[0_0_15px_rgba(110,221,77,0.2)] transition-all" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Message</label>
            <textarea 
              rows="4" 
              placeholder="Tell us about your project requirements..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 resize-none focus:outline-none focus:border-[#6EDD4D] focus:shadow-[0_0_15px_rgba(110,221,77,0.2)] transition-all"
            ></textarea>
          </div>

          <button 
            type="button" 
            className="w-full bg-[#6EDD4D] text-zinc-950 font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(110,221,77,0.4)] hover:bg-[#5bc43f] transition-all uppercase tracking-widest text-sm mt-4 group"
          >
            Send Message <i className="fa-solid fa-paper-plane ml-2 group-hover:translate-x-1 transition-transform"></i>
          </button>
        </form>

      </div>
    </div>
  );
}