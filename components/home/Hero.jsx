'use client'

import { useState, useEffect, useRef } from 'react'

// --- REUSABLE ARRIVAL ANIMATION WRAPPER ---
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
            { threshold: 0.1 } // Triggers when 10% visible
        )

        if (domRef.current) observer.observe(domRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={domRef}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : animationClass
            } ${className}`}
        >
            {children}
        </div>
    )
}

export default function Hero({ onContactClick }) {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden py-20 md:py-32 bg-zinc-950 text-white">
      
      {/* --- CUSTOM CSS FOR BACKGROUND ANIMATION --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -50px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite alternate ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}} />

      {/* --- ANIMATED BACKGROUND LAYER --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        
        {/* Subtle Tech Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Floating Neon Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full opacity-30 blur-[120px]">
            <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-[#6EDD4D] rounded-full mix-blend-screen filter animate-blob"></div>
            <div className="absolute top-[20%] right-[20%] w-80 h-80 bg-[#4ade80] rounded-full mix-blend-screen filter animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[10%] left-[40%] w-72 h-72 bg-[#22c55e] rounded-full mix-blend-screen filter animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* --- FOREGROUND CONTENT --- */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Exact Heading - Slides up from bottom */}
        <AnimatedSection animationClass="opacity-0 translate-y-12" delay={0}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 tracking-tight max-w-5xl drop-shadow-md">
            Global Capability Center <br className="hidden md:block" />
            for Construction Services
            </h1>
        </AnimatedSection>
        
        {/* Exact Paragraph - Slides up slightly after heading */}
        <AnimatedSection animationClass="opacity-0 translate-y-12" delay={200}>
            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Technology-enabled platform for integrated BIM planning, designing & engineering. Project reference across 10+ Million Sqft.
            </p>
        </AnimatedSection>
        
        {/* Exact Button - Pops/Scales in last */}
        <AnimatedSection animationClass="opacity-0 scale-50" delay={400}>
            <div className="flex justify-center">
            <button 
                onClick={onContactClick}
                className="bg-[#6EDD4D] text-black font-black px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:bg-[#5bc43f] shadow-[0_0_30px_rgba(110,221,77,0.3)] flex items-center gap-2"
            >
                Let&apos;s Connect <span className="text-xl leading-none">→</span>
            </button>
            </div>
        </AnimatedSection>
        
      </div>
    </section>
  );
}