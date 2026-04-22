'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AgencyForm from '@/components/form/AgencyForm'
import FreelancerForm from '@/components/form/FreelancerForm'
import { Lightbulb, Users, Target, TrendingUp } from 'lucide-react'

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
            className={`transition-all duration-1000 ease-[0.22,1,0.36,1] ${isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : animationClass
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
        { title: "Intelligence-Driven Thinking", description: "We embrace creativity and forward-thinking solutions", icon: <Lightbulb size={20} /> },
        { title: "Collaboration Over Silos", description: "We work together to achieve exceptional results", icon: <Users size={20} /> },
        { title: "Ownership & Accountability", description: "We uphold the highest standards of ethics and transparency", icon: <Target size={24} /> },
        { title: "Continuous Learning", description: "We strive for outstanding quality in everything we do", icon: <TrendingUp size={24} /> }
    ]

    const inputBaseStyle = "w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6EDD4D] transition-all placeholder:text-zinc-600 focus:bg-zinc-900/50"
    const labelStyle = "block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2"

    return (
        <main className="min-h-screen bg-[#030303] text-zinc-100 selection:bg-[#6EDD4D]/30 relative overflow-hidden">

            {/* --- ADVANCED BACKGROUND SYSTEM --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* 1. Blueprint Grid */}
                <div className="absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage: `linear-gradient(#1e1e1e 1px, transparent 1px), linear-gradient(90deg, #1e1e1e 1px, transparent 1px)`,
                        backgroundSize: '45px 45px'
                    }}>
                </div>

                {/* 2. Moving Laser Scanning Beams */}
                <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#6EDD4D]/30 to-transparent"
                />
                <motion.div
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
                    className="absolute top-0 left-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#6EDD4D]/15 to-transparent"
                />

                {/* 3. Deep Ambient Orbs */}
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#6EDD4D]/5 blur-[150px] rounded-full animate-pulse"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-16 md:py-24 max-w-7xl">

                {/* ===== JOIN NETWORK SECTION ===== */}
                <AnimatedSection animationClass="opacity-0 scale-95">
                    <section className="mb-20 relative group">
                        <div className="absolute -inset-1 bg-[#6EDD4D]/20 rounded-[2.6rem] blur-xl opacity-0 group-hover:opacity-20 transition duration-1000"></div>
                        <div className="relative flex flex-col items-center justify-center rounded-[2.5rem] border border-zinc-800 bg-zinc-900/30 backdrop-blur-2xl p-12 md:p-20 text-center shadow-2xl">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-tight">
                                Interested in becoming a <br /> <span className="text-[#6EDD4D]">Gigfactory Expert?</span>
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <motion.button
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowAgencyForm(true)}
                                    className="px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs bg-white text-zinc-950 hover:bg-zinc-200 transition-all shadow-xl"
                                >
                                    Apply as an Agency
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowFreelancerForm(true)}
                                    className="px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs bg-[#6EDD4D] text-zinc-950 hover:shadow-[0_0_30px_rgba(110,221,77,0.4)] transition-all"
                                >
                                    Apply as a Freelancer
                                </motion.button>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                {/* ===== MAIN LOGIN CARD (CORE Section) ===== */}
                <AnimatedSection animationClass="opacity-0 translate-y-12" delay={200}>
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[3rem] border border-white/5 bg-zinc-900/40 overflow-hidden mb-32 shadow-[0_40px_100px_rgba(0,0,0,0.8)] backdrop-blur-md">

                        {/* LEFT SIDE: GREEN BOX */}
                        <div className="p-16 md:p-24 flex flex-col items-center justify-center bg-[#6EDD4D] relative overflow-hidden">
                            {/* Inner Decoration */}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                            <motion.h1
                                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                                className="text-8xl md:text-[11rem] font-black mb-4 text-white tracking-tighter drop-shadow-2xl leading-none"
                            >
                                CORE
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                                className="text-zinc-900 text-center text-lg font-black uppercase tracking-[0.3em] leading-tight relative z-10"
                            >
                                Centralised operations <br /> for Realtime execution
                            </motion.p>
                        </div>

                        {/* RIGHT SIDE: LOGIN FORM */}
                        <div className="p-12 md:p-20 flex flex-col justify-center bg-zinc-950/50">
                            <h2 className="text-4xl font-bold text-white mb-10 tracking-tight">Login to your account</h2>
                            <form className="space-y-8">
                                <div className="group">
                                    <label className={labelStyle}>Mail ID</label>
                                    <input type="email" placeholder="Enter your email" className={inputBaseStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>Password</label>
                                    <input type="password" placeholder="Enter your password" className={inputBaseStyle} />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full mt-6 bg-[#6EDD4D] text-zinc-950 font-black text-sm tracking-[0.2em] py-5 rounded-2xl shadow-[0_15px_30px_rgba(110,221,77,0.2)] hover:shadow-[0_20px_40px_rgba(110,221,77,0.3)] transition-all uppercase"
                                >
                                    LOG IN
                                </motion.button>
                            </form>
                        </div>
                    </section>
                </AnimatedSection>

                {/* ===== CULTURE SECTION ===== */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24 relative">
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-5 pt-4">
                        <AnimatedSection animationClass="opacity-0 -translate-x-10">
                            <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.85] mb-2 uppercase tracking-tighter">
                                Our Culture
                            </h2>
                            <h2 className="text-6xl md:text-8xl font-black text-[#6EDD4D] leading-[0.85] mb-12 uppercase tracking-tighter">
                                Pillars
                            </h2>
                            <div className="relative">
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#6EDD4D]/40 rounded-full"></div>
                                <p className="text-zinc-400 text-xl max-w-md leading-relaxed font-medium pl-8 italic">
                                    At Gigfactory, culture is not just about where we work — it&apos;s about how we think, collaborate, and build.
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {culturePillars.map((pillar, index) => (
                            <AnimatedSection
                                key={index}
                                animationClass="opacity-0 translate-y-12"
                                delay={index * 150}
                            >
                                <div className="p-10 h-full rounded-[2.5rem] bg-white/5 border border-white/5 transition-all duration-500 hover:border-[#6EDD4D]/30 hover:bg-[#6EDD4D]/5 group">
                                    <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-[#6EDD4D]/40 transition-all duration-500 text-[#6EDD4D] group-hover:text-white">
                                        {pillar.icon}
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#6EDD4D] transition-colors tracking-tight">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
                                        {pillar.description}
                                    </p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </section>

            </div>

            {/* Form Modals */}
            <AnimatePresence>
                {showFreelancerForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100]">
                        <FreelancerForm onClose={() => setShowFreelancerForm(false)} />
                    </motion.div>
                )}
                {showAgencyForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100]">
                        <AgencyForm onClose={() => setShowAgencyForm(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}