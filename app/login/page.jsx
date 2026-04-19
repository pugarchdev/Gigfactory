'use client'

import { useState, useEffect, useRef } from 'react'
import AgencyForm from '@/components/form/AgencyForm'
import FreelancerForm from '@/components/form/FreelancerForm'

// --- REUSABLE ANIMATION WRAPPER ---
const AnimatedSection = ({ children, animationClass, className = "", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false)
    const domRef = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(domRef.current)
                }
            },
            { threshold: 0.1 }
        )
        if (domRef.current) observer.observe(domRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={domRef}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : animationClass
                } ${className}`}
        >
            {children}
        </div>
    )
}

export default function Login() {
    const [showAgencyForm, setShowAgencyForm] = useState(false)
    const [showFreelancerForm, setShowFreelancerForm] = useState(false)

    const culturePillars = [
        { title: "Intelligence-Driven Thinking", description: "We embrace creativity and forward-thinking solutions" },
        { title: "Collaboration Over Silos", description: "We work together to achieve exceptional results" },
        { title: "Ownership & Accountability", description: "We uphold the highest standards of ethics and transparency" },
        { title: "Continuous Learning", description: "We strive for outstanding quality in everything we do" }
    ]

    const inputBaseStyle = "w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6EDD4D] transition-all placeholder:text-zinc-600"
    const labelStyle = "block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2"

    return (
        <main className="min-h-screen bg-black text-zinc-100 selection:bg-[#6EDD4D]/30 relative overflow-hidden">

            <div className="relative z-10 container mx-auto px-6 py-16 md:py-24 max-w-7xl">

                {/* ===== JOIN NETWORK SECTION ===== */}
                <AnimatedSection animationClass="opacity-0 -translate-y-10">
                    <section className="mb-16 flex flex-col items-center justify-center rounded-[2.5rem] border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl p-10 text-center">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">
                            Interested in becoming a <br /> Gigfactory Expert?
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => setShowAgencyForm(true)} className="px-8 py-4 rounded-xl font-bold bg-white text-zinc-950 hover:bg-zinc-200 transition-all">Apply as an Agency</button>
                            <button onClick={() => setShowFreelancerForm(true)} className="px-8 py-4 rounded-xl font-bold bg-[#6EDD4D] text-zinc-950 hover:bg-[#5bc43f] transition-all">Apply as a Freelancer</button>
                        </div>
                    </section>
                </AnimatedSection>

                {/* ===== MAIN LOGIN CARD (CORE Section) ===== */}
                <AnimatedSection animationClass="opacity-0 translate-y-12">
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[2.5rem] border border-zinc-800 bg-zinc-900/40 overflow-hidden mb-32 shadow-2xl">
                        {/* LEFT SIDE: GREEN BOX WITH WHITE TEXT */}
                        <div className="p-16 flex flex-col items-center justify-center bg-[#6EDD4D] text-zinc-950">
                            <h1 className="text-7xl md:text-9xl font-black mb-4 text-white drop-shadow-md">
                                CORE
                            </h1>
                            <p className="text-zinc-900 text-center text-lg font-bold uppercase tracking-widest leading-tight">
                                Gigfactory Project <br /> Management Platform
                            </p>
                        </div>

                        {/* RIGHT SIDE: LOGIN FORM */}
                        <div className="p-12 md:p-16 flex flex-col justify-center bg-zinc-950/50">
                            <h2 className="text-3xl font-bold text-white mb-8">Login to your account</h2>
                            <form className="space-y-6">
                                <div>
                                    <label className={labelStyle}>Mail ID</label>
                                    <input type="email" placeholder="Enter your email" className={inputBaseStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Password</label>
                                    <input type="password" placeholder="Enter your password" className={inputBaseStyle} />
                                </div>
                                <button type="submit" className="w-full mt-4 bg-[#6EDD4D] text-zinc-950 font-black text-lg py-4 rounded-xl hover:scale-[1.02] transition-all">
                                    LOG IN
                                </button>
                            </form>
                        </div>
                    </section>
                </AnimatedSection>

                {/* ===== CULTURE SECTION: TEXT LEFT, GRID RIGHT ===== */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">

                    {/* LEFT COLUMN: TITLE & SUBTITLE */}
                    <div className="lg:col-span-5 pt-8">
                        <AnimatedSection animationClass="opacity-0 -translate-x-10">
                            <h2 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-2 uppercase tracking-tighter">
                                Our Culture
                            </h2>
                            <h2 className="text-5xl md:text-6xl font-bold text-[#6EDD4D] leading-[1.1] mb-8 uppercase tracking-tighter">
                                Pillars
                            </h2>
                            <p className="text-zinc-400 text-lg max-w-md leading-relaxed italic border-l-2 border-[#6EDD4D] pl-6">
                                At Gigfactory, culture is not just about where we work — it&apos;s about how we think, collaborate, and build.
                            </p>
                        </AnimatedSection>
                    </div>

                    {/* RIGHT COLUMN: 2x2 GRID BOXES */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {culturePillars.map((pillar, index) => (
                            <AnimatedSection
                                key={index}
                                animationClass="opacity-0 scale-90 translate-y-10"
                                delay={index * 150} // Staggered pop-in animation
                            >
                                <div className="p-10 h-full rounded-[2rem] bg-zinc-900/40 border border-zinc-800 transition-all duration-500 hover:border-[#6EDD4D]/50 hover:bg-zinc-900/60 group">
                                    {/* Icon Circle */}
                                    <div className="w-12 h-12 rounded-full bg-[#6EDD4D]/10 flex items-center justify-center mb-8 border border-[#6EDD4D]/20 group-hover:scale-110 transition-transform">
                                        <div className="w-2 h-2 rounded-full bg-[#6EDD4D] animate-pulse"></div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#6EDD4D] transition-colors">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
                                        {pillar.description}
                                    </p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </section>

            </div>

            {/* Form Modals */}
            {showFreelancerForm && <FreelancerForm onClose={() => setShowFreelancerForm(false)} />}
            {showAgencyForm && <AgencyForm onClose={() => setShowAgencyForm(false)} />}
        </main>
    )
}