'use client'

import { useState } from 'react'
import ContactModal from '@/components/home/ContactModal'

export default function LetsDiscuss() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)

    return (
        <section className="bg-zinc-950 py-24 md:py-32 relative overflow-hidden border-t border-zinc-900">
            
            {/* Subtle Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#6EDD4D]/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-center">
                    
                    {/* Left Column: Let's Discuss (Black design re-themed to Dark zinc-950, left-aligned) */}
                    <div className="space-y-6 flex flex-col items-start text-left">
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.1]">
                            Let&apos;s <br/> <span className="text-[#6EDD4D] font-bold">Discuss</span>
                        </h2>
                        <p className="text-zinc-400 leading-relaxed max-w-sm text-sm md:text-base">
                            Ready to bring your ideas to life? Let&apos;s collaborate to create innovative, 
                            impactful solutions tailored to your construction needs. Get in touch today 
                            and let&apos;s make something amazing together!
                        </p>
                    </div>

                    {/* Middle Column: Significantly Improved Watery CSS Glossy Orb */}
                    <div className="flex justify-center relative">
                        <div className="relative w-48 h-48 md:w-64 md:h-64 animate-[float_6s_ease-in-out_infinite]">
                            
                            {/* Base Sphere with deep shadows */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-700 via-zinc-950 to-black shadow-[inset_15px_15px_30px_rgba(255,255,255,0.05),inset_-15px_-15px_30px_rgba(0,0,0,0.9),0_20px_50px_rgba(0,0,0,0.5)] border border-zinc-800"></div>
                            
                            {/* Inner Rim Detail to create the complex structure */}
                            <div className="absolute top-[2%] left-[2%] right-[2%] bottom-[2%] rounded-full border-[1.5px] border-white/5 shadow-[inset_0_20px_20px_rgba(255,255,255,0.05)]"></div>
                            
                            {/* Sharp Watery Top Highlight/Reflection - KEY ELEMENT */}
                            <div className="absolute top-[8%] left-[20%] w-[45%] h-[30%] bg-gradient-to-b from-white/30 to-transparent rounded-full blur-[2px] transform -rotate-[15deg] shadow-[0_0_20px_10px_rgba(255,255,255,0.3)]"></div>
                            
                            {/* Additional sharp watery highlight on bottom right for extra gloss */}
                            <div className="absolute bottom-[20%] right-[20%] w-[30%] h-[20%] bg-gradient-to-tl from-white/10 to-transparent rounded-full blur-[1px] transform -rotate-[30deg]"></div>
                            
                            {/* Soft Bottom-Right Green Glow/Reflection (branded accent) */}
                            <div className="absolute bottom-[15%] right-[15%] w-[50%] h-[40%] bg-gradient-to-tl from-[#6EDD4D]/20 to-transparent rounded-full blur-xl"></div>
                            
                        </div>

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
                        
                        {/* Get In Touch Button (Uppercase and Outline design) */}
                        <button 
                            onClick={() => setIsContactModalOpen(true)}
                            className="px-8 py-3 rounded-xl border border-zinc-700 text-xs font-bold uppercase tracking-widest text-white hover:border-[#6EDD4D] hover:text-[#6EDD4D] transition-all duration-300 hover:bg-[#6EDD4D]/5"
                        >
                            GET IN TOUCH
                        </button>

                        <div className="space-y-3">
                            {/* Email */}
                            <a 
                                href="mailto:contact@gigfactory.com" 
                                className="text-lg md:text-xl font-medium text-white hover:text-[#6EDD4D] transition-colors block"
                            >
                                contact@gigfactory.com
                            </a>
                            
                            {/* Large "Your Project" Text Block (Exactly like 1st image: Two lines, tight leading, left-aligned relative to column) */}
                            <div className="text-6xl md:text-7xl lg:text-8xl font-normal tracking-tighter text-white leading-tight">
                                Your <br/> 
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