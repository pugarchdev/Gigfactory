'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

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
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : animationClass
        } ${className}`}
    >
      {children}
    </div>
  )
}

export default function CaseStudies({ onContactClick }) {
  const router = useRouter()

  const caseStudies = [
    {
      id: 1,
      title: "Commercial Complex Development",
      category: "Commercial",
      description: "Complete development of 50,000 sq.ft. commercial complex with advanced BIM integration.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
      features: ["BIM Modeling", "Cost Optimization", "Timeline Management"]
    },
    {
      id: 2,
      title: "Residential Tower Project",
      category: "Residential",
      description: "30-story residential tower with sustainable construction practices.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      features: ["Sustainable Design", "Quality Control", "Safety Compliance"]
    },
    {
      id: 3,
      title: "Industrial Facility",
      category: "Industrial",
      description: "Large-scale industrial facility with complex MEP systems.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      features: ["MEP Integration", "Project Coordination", "Risk Management"]
    },
    {
      id: 4,
      title: "Healthcare Infrastructure",
      category: "Healthcare",
      description: "State-of-the-art healthcare facility with specialized requirements.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      features: ["Specialized Systems", "Regulatory Compliance", "Quality Assurance"]
    },
    {
      id: 5,
      title: "Educational Campus",
      category: "Educational",
      description: "Multi-building educational campus with integrated infrastructure.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop",
      features: ["Campus Planning", "Infrastructure Integration", "Sustainable Solutions"]
    },
    {
      id: 6,
      title: "Transportation Hub",
      category: "Infrastructure",
      description: "Major transportation hub with complex civil engineering requirements.",
      image: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&w=800&q=80",
      features: ["Civil Engineering", "Structural Design", "Project Management"]
    }
  ]

  const handleViewProject = (studyId) => {
    router.push(`/case-studies/${studyId}`)
  }

  return (
    <section id="case-studies" className="container mx-auto px-6 py-20 -mt-24 border-t border-zinc-800/50 overflow-hidden">

      {/* Custom Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: #18181b;
          border-radius: 10px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 10px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6EDD4D;
        }
      `}} />

      {/* Header */}
      <div className="text-center mb-16">
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={0}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 -mt-12 tracking-tight">Our Case <span className="text-[#6EDD4D]">Studies</span></h2>
        </AnimatedSection>
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={150}>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Real construction projects delivered with quality, precision, and efficiency. Scroll to explore.
          </p>
        </AnimatedSection>
      </div>

      {/* Case Studies Horizontal Scrollable Wrapper */}
      <div className="flex gap-8 overflow-x-auto pb-12 hide-scrollbar snap-x snap-mandatory">
        {caseStudies.map((study, idx) => (
          <AnimatedSection
            key={study.id}
            animationClass="opacity-0 translate-x-20"
            delay={idx * 100}
            className="snap-center shrink-0 w-[320px] md:w-[400px]"
          >
            <div className="group bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-[2rem] overflow-hidden flex flex-col hover:border-[#6EDD4D]/50 hover:shadow-[0_0_30px_rgba(110,221,77,0.1)] transition-all duration-500 h-full">

              {/* Image Container with Hover Zoom */}
              <div className="w-full h-56 md:h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-zinc-950/20 z-10 group-hover:bg-transparent transition-all duration-500"></div>
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-4 py-1.5 bg-zinc-950/80 backdrop-blur-md border border-zinc-700 rounded-full text-xs font-bold text-[#6EDD4D] uppercase tracking-wider shadow-lg">
                    {study.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#6EDD4D] transition-colors line-clamp-1">{study.title}</h3>
                <p className="text-zinc-400 mb-8 flex-grow text-sm leading-relaxed line-clamp-3">{study.description}</p>

                <button
                  onClick={() => handleViewProject(study.id)}
                  className="w-full py-3.5 rounded-xl bg-zinc-950 text-white font-bold border border-zinc-800 hover:bg-[#6EDD4D] hover:text-zinc-950 hover:border-[#6EDD4D] hover:shadow-[0_0_15px_rgba(110,221,77,0.3)] transition-all flex justify-center items-center gap-2"
                >
                  View Case Study
                </button>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-20 mt-16">

        {/* View All Button */}
        <AnimatedSection animationClass="opacity-0 scale-90" delay={200}>
          <button
            onClick={() => router.push('/case-studies')}
            className="text-zinc-400 hover:text-[#6EDD4D] font-bold text-sm tracking-widest uppercase transition-colors flex items-center group"
          >
            View All Case Studies
            <i className="fa-solid fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
          </button>
        </AnimatedSection>

        {/* Let's Connect CTA - CLEAN VERSION */}
        <div className="w-full max-w-4xl text-center space-y-10">
          <AnimatedSection animationClass="opacity-0 translate-y-10" delay={300}>
            <div className="space-y-4">
              <h3 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Ready to move your <br className="hidden md:block" />
                project <span className="text-[#6EDD4D]">forward?</span>
              </h3>
              <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
                Let&apos;s discuss how our expertise can bring your vision to life with precision and speed.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animationClass="opacity-0 scale-95" delay={500}>
            <button
              onClick={onContactClick}
              className="group relative inline-flex items-center justify-center"
            >
              {/* Glow effect behind button */}
              <div className="absolute -inset-1 bg-[#6EDD4D] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

              <div className="relative bg-[#6EDD4D] text-zinc-950 font-black px-12 py-5 rounded-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 text-lg">
                <span>Let&apos;s Connect</span>
                <span className="text-2xl leading-none group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          </AnimatedSection>
        </div>

      </div>
    </section>
  )
}