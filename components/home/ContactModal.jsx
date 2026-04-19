'use client';

import React, { useEffect, useState } from 'react';

export default function ContactModal({ isOpen, onClose, preSelectedService, initialStep = 0 }) {
  // --- NEW STATE: Tracks which screen the user is on ---
  // 0: Let's Discuss Box, 1: The Form, 2: Success Message
  const [step, setStep] = useState(initialStep);
  const [isSending, setIsSending] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(initialStep); // Reset to requested step when opened
    } else {
      document.body.style.overflow = 'unset';
      // Reset to initial screen when modal is closed
      setTimeout(() => {
        setStep(0);
        setIsSending(false);
      }, 300);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate an API call
    setTimeout(() => {
      setIsSending(false);
      setStep(2); // Move to Success View
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">

      {/* Blurred Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content Box */}
      <div className="relative w-full max-w-2xl bg-zinc-900/90 backdrop-blur-xl border border-[#6EDD4D]/30 rounded-[2rem] p-8 md:p-12 shadow-[0_0_50px_rgba(110,221,77,0.15)] animate-in zoom-in-95 duration-300 overflow-y-auto max-h-[90vh] no-scrollbar">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-[#6EDD4D] hover:border-[#6EDD4D] transition-colors z-10"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        {/* --- STEP 0: INITIAL "LET'S DISCUSS" BOX --- */}
        {step === 0 && (
          <div className="py-10 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-[#6EDD4D]/10 border border-[#6EDD4D]/20 rounded-2xl flex items-center justify-center mb-8 rotate-3">
              <i className="fa-solid fa-comments text-4xl text-[#6EDD4D]"></i>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Let&apos;s <span className="text-[#6EDD4D]">Discuss</span> <br /> Your Next Project
            </h3>
            <p className="text-zinc-400 text-lg max-w-md mb-10 leading-relaxed">
              Have a vision in mind? We provide the technical expertise to bring it to life.
            </p>
            <button
              onClick={() => setStep(1)} // MOVE TO FORM
              className="group px-12 py-5 bg-[#6EDD4D] text-zinc-950 font-black rounded-2xl hover:shadow-[0_0_30px_rgba(110,221,77,0.4)] hover:scale-105 transition-all uppercase tracking-widest flex items-center gap-3"
            >
              Get in Touch <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        )}

        {/* --- STEP 1: THE CONTACT FORM --- */}
        {step === 1 && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Send a Message</h3>
            <p className="text-zinc-400 mb-8">
              {preSelectedService
                ? `Inquiring about: ${preSelectedService}`
                : 'Fill out the form below and our team will get back to you.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6EDD4D] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Company</label>
                  <input
                    type="text"
                    placeholder="Acme Corp"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6EDD4D] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6EDD4D] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Phone Number *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6EDD4D] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Message *</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Tell us about your project requirements..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white resize-none focus:outline-none focus:border-[#6EDD4D] transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-[#6EDD4D] text-zinc-950 font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(110,221,77,0.4)] disabled:opacity-70 transition-all uppercase tracking-widest text-sm mt-4 group"
              >
                {isSending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        )}

        {/* --- STEP 2: SUCCESS VIEW --- */}
        {step === 2 && (
          <div className="py-12 flex flex-col items-center text-center animate-in zoom-in-90 duration-500">
            <div className="w-24 h-24 bg-[#6EDD4D]/10 border border-[#6EDD4D]/20 rounded-full flex items-center justify-center mb-8">
              <i className="fa-solid fa-check text-5xl text-[#6EDD4D]"></i>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Message Received!</h3>
            <p className="text-zinc-400 text-lg max-w-sm mb-10">Thank you for reaching out.</p>
            <button
              onClick={onClose}
              className="px-10 py-4 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-all uppercase tracking-widest text-xs"
            >
              Back to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
}