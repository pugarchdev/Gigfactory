'use client'

import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion'
import { Lightbulb, Users, Target, TrendingUp, ArrowRight } from 'lucide-react'

// --- NUMBER COUNTER COMPONENT ---
const AnimatedNumber = ({ value }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
  const suffix = value.replace(/[0-9]/g, '')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 100, duration: 2000 })

  useEffect(() => {
    if (isInView) motionValue.set(numericValue)
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

export default function AboutPage() {
  const router = useRouter()
  const containerRef = useRef(null)

  // --- PARALLAX SCROLL SETUP ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  const culturePillars = [
    { title: "Intelligence-Driven Thinking", description: "We embrace creativity and forward-thinking solutions", icon: <Lightbulb size={24} /> },
    { title: "Collaboration Over Silos", description: "We work together to achieve exceptional results", icon: <Users size={24} /> },
    { title: "Ownership & Accountability", description: "We uphold the highest standards of ethics and transparency", icon: <Target size={24} /> },
    { title: "Continuous Learning", description: "We strive for outstanding quality in everything we do", icon: <TrendingUp size={24} /> }
  ]

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  return (
    <main ref={containerRef} className="min-h-screen bg-[#030303] text-zinc-100 font-sans selection:bg-[#6EDD4D]/30 pb-24 mt-[-60px] md:mt-[-60px] overflow-hidden relative">

      {/* --- ADVANCED BACKGROUND SYSTEM --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* 1. The Blueprint Grid */}
        <div className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(#1e1e1e 1px, transparent 1px), linear-gradient(90deg, #1e1e1e 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}>
        </div>

        {/* 2. Moving Laser Beams */}
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#6EDD4D]/40 to-transparent"
        />
        <motion.div
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#6EDD4D]/20 to-transparent"
        />

        {/* 3. Deep Ambient Glows */}
        <motion.div
          animate={{ y: [0, -60, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-1/4 w-[700px] h-[700px] bg-[#6EDD4D]/10 blur-[180px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, 80, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full"
        />
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative pt-48 px-6 flex flex-col items-center text-center z-10">
        <motion.div style={{ opacity: textOpacity }} initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#6EDD4D]/10 border border-[#6EDD4D]/20 text-[#6EDD4D] text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(110,221,77,0.2)]">
              Who We Are
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-[1.2]">
            Integrated Construction <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6EDD4D] via-emerald-300 to-[#6EDD4D] bg-[length:200%_auto] animate-text-gradient">Technology Platform</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed font-medium">
            Building Intelligence. Growing Together. At Gigfactory, culture is not just about where we work — it&apos;s about how we think, collaborate, and build.
          </motion.p>
        </motion.div>

        {/* Hero Image - Zoomed Out Parallax */}
        <div className="w-full max-w-7xl relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.7)] aspect-[21/9] bg-zinc-900 group">
          <motion.img
            style={{ y: heroImageY }}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
            alt="Team collaborating"
            className="absolute inset-[-10%] w-[120%] h-[120%] object-cover origin-top transition-all duration-1000 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-90"></div>


        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="relative -mt-24 z-20 px-6">

        {/* ✅ NEW WRAPPER (this creates the animated border) */}
        <div className="relative p-[4px] rounded-[2.5rem] overflow-hidden max-w-5xl mx-auto">

          {/* ✅ ROTATING GRADIENT (PUT IT HERE) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_260deg,#6EDD4D_360deg)] z-0"
          />

          {/* ✅ YOUR ORIGINAL BOX (UNCHANGED, just moved inside) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="relative z-10 rounded-[calc(2.5rem-4px)] bg-zinc-900/40 backdrop-blur-2xl border border-white/10 p-10 md:p-14 flex flex-wrap justify-around gap-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden group"
          >

            <div className="absolute inset-0 bg-gradient-to-br from-[#6EDD4D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <div className="text-center relative z-10">
              <h3 className="text-5xl md:text-7xl font-black text-[#6EDD4D] mb-2 tracking-tighter">
                <AnimatedNumber value="10M+" />
              </h3>
              <p className="text-xs text-zinc-500 uppercase tracking-[0.3em] font-black">SqFt Delivered</p>
            </div>

            <div className="w-px h-16 bg-zinc-800 hidden md:block self-center"></div>

            <div className="text-center relative z-10">
              <h3 className="text-5xl md:text-7xl font-black text-[#6EDD4D] mb-2 tracking-tighter">
                <AnimatedNumber value="100+" />
              </h3>
              <p className="text-xs text-zinc-500 uppercase tracking-[0.3em] font-black">Global Clients</p>
            </div>

            <div className="w-px h-16 bg-zinc-800 hidden md:block self-center"></div>

            <div className="text-center relative z-10">
              <h3 className="text-5xl md:text-7xl font-black text-[#6EDD4D] mb-2 tracking-tighter">
                <AnimatedNumber value="250+" />
              </h3>
              <p className="text-xs text-zinc-500 uppercase tracking-[0.3em] font-black">Projects Done</p>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 3. WHO WE ARE */}
      <section className="py-40 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-none">
                What Drives Us <br />
                <span className="text-[#6EDD4D]">Forward</span>
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-8 text-zinc-400 leading-relaxed text-lg font-medium">
                <p className="border-l-2 border-[#6EDD4D]/30 pl-6">
                  Gigfactory Private Limited revolutionizes the construction industry by providing an integrated, technology-powered, one-stop solution for all your project needs.
                </p>
                <p className="pl-6">
                  Our platform streamlines workflows, optimizes resource allocation, and drives efficiency in design and construction. With a proven track record of delivering over 10 Million Sq ft across diverse sectors.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative group"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl relative">
                <div className="absolute inset-0 bg-[#6EDD4D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 mix-blend-overlay"></div>
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
                  alt="Company Vision"
                  className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                />
              </div>
              {/* Decorative Frame Element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-[#6EDD4D] rounded-bl-[2rem] opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. MISSION & VISION */}
      <section className="py-5 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -15 }}
              className="p-12 rounded-[3rem] bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-2xl border border-white/5 hover:border-[#6EDD4D]/40 transition-all duration-500 group"
            >
              <div className="w-20 h-20 rounded-[1.5rem] bg-zinc-950 border border-white/10 flex items-center justify-center mb-10 group-hover:bg-[#6EDD4D] transition-colors duration-500">
                <Target className="text-[#6EDD4D] group-hover:text-black transition-colors" size={36} />
              </div>
              <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">Our Mission</h3>
              <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                To deliver exceptional construction technology services that enhance project outcomes, reduce costs, and promote sustainability through innovative digital solutions.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -15 }}
              className="p-12 rounded-[3rem] bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-2xl border border-white/5 hover:border-[#6EDD4D]/40 transition-all duration-500 group"
            >
              <div className="w-20 h-20 rounded-[1.5rem] bg-zinc-950 border border-white/10 flex items-center justify-center mb-10 group-hover:bg-[#6EDD4D] transition-colors duration-500">
                <Lightbulb className="text-[#6EDD4D] group-hover:text-black transition-colors" size={36} />
              </div>
              <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">Our Vision</h3>
              <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                To become the global leader in construction technology solutions, transforming building lifecycle management through digital innovation.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. EXPLORE OUR VALUES */}
      <section className="py-40 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl text-center mb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              Explore Our <span className="text-[#6EDD4D]">Values</span>
            </h2>
            <p className="text-zinc-500 text-xl max-w-2xl mx-auto font-medium">
              The core principles that guide every pixel and every project we build.
            </p>
          </motion.div>
        </div>

        <div className="container mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {culturePillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(110, 221, 77, 0.05)" }}
              className="p-10 rounded-[2.5rem] bg-zinc-900/20 backdrop-blur-md border border-white/5 hover:border-[#6EDD4D]/30 transition-all duration-500 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-zinc-950 border border-[#6EDD4D]/20 flex items-center justify-center text-[#6EDD4D] mb-8 shadow-[0_0_30px_rgba(110,221,77,0.1)]">
                {pillar.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-4 tracking-tight">{pillar.title}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed font-medium">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="pt-10 pb-20 px-6 text-center relative z-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative max-w-5xl mx-auto bg-zinc-900/30 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-16 md:p-24 overflow-hidden"
        >
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#6EDD4D] blur-[150px] rounded-full pointer-events-none"
          />

          <h2 className="relative z-10 text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-tight">
            Ready To Simplify Your <br />
            <span className="text-[#6EDD4D]">Project Management?</span>
          </h2>
          <div className="mt-12 relative z-10">
            <button
              onClick={() => router.push('/contact')}
              className="group relative inline-flex items-center justify-center gap-4 rounded-full bg-[#6EDD4D] px-12 py-6 font-black uppercase tracking-[0.2em] text-zinc-950 transition-all hover:bg-white hover:shadow-[0_0_50px_rgba(110,221,77,0.5)] text-sm"
            >
              <span>Get Started Now</span>
              <ArrowRight size={22} className="transition-transform group-hover:translate-x-2" />
            </button>
          </div>
        </motion.div>
      </section>

      <style jsx global>{`
        @keyframes text-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-text-gradient {
          animation: text-gradient 6s ease infinite;
        }
      `}</style>
    </main>
  )
}