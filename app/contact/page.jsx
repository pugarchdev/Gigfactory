'use client'

import { useState } from 'react'
import ContactModal from '@/components/home/ContactModal'

export default function LetsDiscuss() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)

    return (
        <section className="bg-zinc-50 dark:bg-zinc-950 py-24 md:py-32 relative overflow-hidden border-t border-zinc-200 dark:border-zinc-900">

            {/* Subtle Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#6EDD4D]/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-center">

                    {/* Left Column: Let's Discuss (Black design re-themed to Dark zinc-950, left-aligned) */}
                    <div className="space-y-6 flex flex-col items-start text-left">
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                            Let&apos;s <br /> <span className="text-[#6EDD4D] font-bold">Discuss</span>
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm text-sm md:text-base">
                            Ready to bring your ideas to life? Let&apos;s collaborate to create innovative,
                            impactful solutions tailored to your construction needs. Get in touch today
                            and let&apos;s make something amazing together!
                        </p>
                    </div>

                    {/* Middle Column: Significantly Improved Watery CSS Glossy Orb */}
                    <div className="flex flex-col items-center justify-center relative">
                        <div className="relative w-48 h-48 md:w-64 md:h-64 animate-[float_6s_ease-in-out_infinite]">

                            {/* Base sphere — green in light mode, black in dark mode */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6EDD4D] via-[#4CAF50] to-[#2E7D32] dark:from-zinc-800 dark:via-black dark:to-zinc-950 shadow-[inset_10px_10px_22px_rgba(255,255,255,0.3),inset_-12px_-12px_28px_rgba(0,0,0,0.2),0_20px_45px_rgba(110,221,77,0.25)] dark:shadow-[inset_10px_10px_22px_rgba(255,255,255,0.14),inset_-12px_-12px_28px_rgba(0,0,0,0.85),0_20px_45px_rgba(0,0,0,0.45)] border border-[#6EDD4D]/20 dark:border-zinc-700"></div>

                            {/* Inner rim */}
                            <div className="absolute top-[2%] left-[2%] right-[2%] bottom-[2%] rounded-full border-[1.5px] border-white/12 shadow-[inset_0_18px_18px_rgba(255,255,255,0.06)]"></div>

                            {/* Specular highlights (read on black) */}
                            <div className="absolute top-[8%] left-[20%] w-[45%] h-[30%] bg-gradient-to-b from-white/22 to-transparent rounded-full blur-[2px] transform -rotate-[15deg]"></div>
                            <div className="absolute bottom-[18%] right-[18%] w-[32%] h-[22%] bg-gradient-to-tl from-white/10 to-transparent rounded-full blur-[1px] transform -rotate-[28deg]"></div>

                            {/* Soft Bottom-Right Green Glow/Reflection (branded accent) */}
                            <div className="absolute bottom-[15%] right-[15%] w-[50%] h-[40%] bg-gradient-to-tl from-[#6EDD4D]/20 to-transparent rounded-full blur-xl"></div>

                        </div>
                        <button
                            onClick={() => setIsContactModalOpen(true)}
                            className="mt-8 px-10 py-4 md:px-12 md:py-5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm md:text-base font-bold uppercase tracking-widest text-zinc-900 dark:text-white hover:border-[#6EDD4D] hover:text-[#6EDD4D] transition-all duration-300 hover:bg-[#6EDD4D]/5 hover:shadow-[0_0_20px_rgba(110,221,77,0.2)]"
                        >
                            GET IN TOUCH
                        </button>
                        {/* Floating Animation Keyframes */}
                        <style jsx>{`
                            @keyframes float {
                                0% { transform: translateY(0px); }
                                50% { transform: translateY(-20px); }
                                100% { transform: translateY(0px); }
                            }
                        `}</style>
                    </div>

                    {/* Right Column: Contact Info & CTA (Exactly like design: single stack, button above email/text, left-aligned block) */}
                    <div className="flex flex-col items-start text-left space-y-6">



                        <div className="space-y-3">
                            {/* Email */}
                            <a
                                href="mailto:contact@gigfactory.com"
                                className="text-lg md:text-xl font-medium text-zinc-900 dark:text-white hover:text-[#6EDD4D] transition-colors block"
                            >
                                contact@gigfactory.in
                            </a>

                            {/* Large "Your Project" Text Block (Exactly like 1st image: Two lines, tight leading, left-aligned relative to column) */}
                            <div className="text-6xl md:text-7xl lg:text-8xl font-normal tracking-tighter text-zinc-900 dark:text-white leading-tight">
                                Your <br />
                                <span className="font-bold">Project</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Modal Rendering */}
            {isContactModalOpen && (
                <ContactModal
                    isOpen={isContactModalOpen}
                    onClose={() => setIsContactModalOpen(false)}
                    initialStep={1}
                />
            )}

        </section>
    )
}