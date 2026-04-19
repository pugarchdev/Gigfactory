'use client'

import { useState, useEffect, useRef } from 'react'

// --- REUSABLE ANIMATION WRAPPER ---
const AnimatedSection = ({ children, animationClass, className = "", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false)
    const domRef = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
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
            className={`transition-all duration-700 ease-[0.34,1.56,0.64,1] ${isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : animationClass
                } ${className}`}
        >
            {children}
        </div>
    )
}

export default function StatsBar() {
    const stats = [
        { value: "10k+", label: "Worldwide Clients" },
        { value: "14+", label: "Years Experience" },
        { value: "$20M", label: "Total Funding" }
    ]

    return (
        <section className="py-12 w-full px-6 flex justify-center md:mt-[-60px] md:mb-[-80px]">
            {/* Main Container */}
            <AnimatedSection
                animationClass="opacity-0 scale-75"
                className="w-full max-w-5xl"
                delay={100}
            >
                <div className="relative rounded-[2rem] border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group hover:border-[#6EDD4D]/30 transition-colors duration-500">

                    {/* Subtle ambient glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6EDD4D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    {/* Stats Grid */}
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between divide-y md:divide-y-0 md:divide-x divide-zinc-800">

                        {stats.map((stat, index) => (
                            /* REMOVED (index * 150): 
                               By setting a static delay (e.g., 500ms), 
                               all items wait for the box to finish scaling, then pop together.
                            */
                            <AnimatedSection
                                key={index}
                                animationClass="opacity-0 scale-50"
                                delay={500}
                                className="w-full flex flex-col items-center justify-center py-8 md:py-0"
                            >
                                <h3 className="text-5xl md:text-6xl font-black mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#6EDD4D] to-[#4ade80] drop-shadow-sm">
                                    {stat.value}
                                </h3>
                                <p className="text-zinc-400 text-base md:text-lg font-medium tracking-wide">
                                    {stat.label}
                                </p>
                            </AnimatedSection>
                        ))}

                    </div>
                </div>
            </AnimatedSection>
        </section>
    )
}