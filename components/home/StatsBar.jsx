'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

// --- NUMBER COUNTER COMPONENT ---
const AnimatedNumber = ({ value }) => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
    const suffix = value.replace(/[0-9]/g, '')

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, {
        damping: 40,
        stiffness: 100,
        duration: 2000
    })

    useEffect(() => {
        if (isInView) {
            motionValue.set(numericValue)
        }
    }, [isInView, motionValue, numericValue])

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat('en-US').format(latest.toFixed(0)) + suffix
            }
        })
    }, [springValue, suffix])

    return <span ref={ref}>0{suffix}</span>
}

export default function StatsBar() {
    const stats = [
        { value: "100+", label: "Worldwide Clients" },
        { value: "10M+", label: "Delivered" },
        { value: "250+", label: "Projects" }
    ]

    return (
        <section className="py-12 w-full px-6 flex justify-center md:mt-[-60px] md:mb-[-80px]">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                // INCREASED PADDING: Changed p-[1px] to p-[4px] to make the border thicker
                className="w-full max-w-5xl relative p-[4px] rounded-[2rem] overflow-hidden group"
            >
                {/* WIDER GRADIENT: Changed transparent_0_340deg to transparent_0_260deg for a longer light tail */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_260deg,#6EDD4D_360deg)] z-0"
                />

                {/* ADJUSTED RADIUS: Changed rounded-[calc(2rem-1px)] to rounded-[calc(2rem-4px)] to match the new border thickness */}
                <div className="relative z-10 rounded-[calc(2rem-4px)] bg-zinc-950/90 backdrop-blur-xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-500 w-full h-full">

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6EDD4D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[calc(2rem-4px)]"></div>

                    <div className="relative z-20 flex flex-col md:flex-row items-center justify-between divide-y md:divide-y-0 md:divide-x divide-zinc-800/50">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="w-full flex flex-col items-center justify-center py-8 md:py-0"
                            >
                                <h3 className="text-5xl md:text-6xl font-black mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#6EDD4D] to-[#4ade80] drop-shadow-sm">
                                    <AnimatedNumber value={stat.value} />
                                </h3>
                                <p className="text-zinc-400 text-base md:text-lg font-medium tracking-wide">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    )
}