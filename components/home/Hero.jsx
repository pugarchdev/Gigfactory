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

export default function Hero({ onContactClick }) {
  const [currentImg, setCurrentImg] = useState(0)

  // Array of background images
  const images = [
    "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589095/1_gv7pis.png",
    "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589098/Screenshot_2026-04-11_102220_uo0pcb.png",
    "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589091/Screenshot_2026-03-27_125503_ornn0g.png",
    "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589101/Screenshot_2026-04-15_173533_zcn2tm.png",
    "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589097/Screenshot_2026-04-02_110457_tqn0kt.png",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden py-20 md:py-32 bg-zinc-950 text-white">

      {/* --- CUSTOM CSS FOR ANIMATIONS --- */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -50px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .animate-blob { animation: blob 10s infinite alternate ease-in-out; }
        .animate-blink { animation: blink 2s infinite ease-in-out; }
      `}} />

      {/* --- BACKGROUND IMAGE SLIDESHOW --- */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 brightness-[0.85] saturate-[1.1]"
            style={{
              backgroundImage: `url(${img})`,
              // Increased opacity to 0.45 for much better visibility
              opacity: currentImg === index ? 0.45 : 0
            }}
          />
        ))}

        {/* Adjusted Gradient: Keeping edges dark for text readability, but clearing the center */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/10 to-zinc-950/90" />
        <div className="absolute inset-0 bg-zinc-950/20" /> {/* Overall subtle dark wash */}
      </div>

      {/* --- TECH GRID & GLOW LAYER --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full opacity-20 blur-[120px]">
          <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-[#6EDD4D] rounded-full mix-blend-screen filter animate-blob"></div>
          <div className="absolute bottom-[10%] left-[40%] w-72 h-72 bg-[#22c55e] rounded-full mix-blend-screen filter animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      {/* --- FOREGROUND CONTENT --- */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">

        {/* Blinking Badge */}
        <AnimatedSection animationClass="opacity-0 translate-y-4" delay={0}>
          <div className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6EDD4D]/40 bg-[#6EDD4D]/20 text-[#6EDD4D] text-xs font-bold tracking-widest uppercase animate-blink backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#6EDD4D] shadow-[0_0_8px_#6EDD4D]" />
            Leading Construction Tech
          </div>
        </AnimatedSection>

        {/* Heading - Added drop shadow for clarity against images */}
        <AnimatedSection animationClass="opacity-0 translate-y-12" delay={200}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 tracking-tight max-w-5xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            Global Capacity Center <br className="hidden md:block" />
            <span className="text-[#6EDD4D]">for Construction Services</span>
          </h1>
        </AnimatedSection>

        {/* Paragraph - Increased contrast */}
        <AnimatedSection animationClass="opacity-0 translate-y-12" delay={400}>
          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-md font-medium">
            Technology-enabled platform for integrated BIM planning, designing & engineering. Project reference across 10+ Million Sqft.
          </p>
        </AnimatedSection>

        {/* Button */}
        <AnimatedSection animationClass="opacity-0 scale-50" delay={600}>
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