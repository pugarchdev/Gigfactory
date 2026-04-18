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
            className={`transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : animationClass
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
    <section id="case-studies" className="container mx-auto px-6 py-20 border-t border-zinc-800/50">
      
      {/* Header */}
      <div className="text-center mb-16">
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={0}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Our Case Studies</h2>
        </AnimatedSection>
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={150}>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Real construction projects delivered with quality, precision, and efficiency.
            </p>
        </AnimatedSection>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {caseStudies.map((study, idx) => (
          <AnimatedSection 
            key={study.id} 
            animationClass="opacity-0 translate-y-20" 
            delay={idx * 150} // Staggered arrival for the cards
            className="h-full"
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
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#6EDD4D] transition-colors">{study.title}</h3>
                <p className="text-zinc-400 mb-8 flex-grow text-sm leading-relaxed">{study.description}</p>
                
                <button 
                  onClick={() => handleViewProject(study.id)}
                  className="w-full py-3.5 rounded-xl bg-zinc-950 text-white font-bold border border-zinc-800 hover:bg-[#6EDD4D] hover:text-zinc-950 hover:border-[#6EDD4D] hover:shadow-[0_0_15px_rgba(110,221,77,0.3)] transition-all flex justify-center items-center gap-2"
                >
                  View Full Case Study
                </button>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
      
      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-12 mt-12">
        
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

        {/* Let's Connect CTA */}
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={400}>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 md:p-12 w-full max-w-4xl text-center flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                <div className="text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to move your project forward?</h3>
                    <p className="text-zinc-400">Let&apos;s discuss how our expertise can bring your vision to life.</p>
                </div>
                <button 
                    onClick={onContactClick} 
                    className="bg-[#6EDD4D] text-zinc-950 font-black px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(110,221,77,0.2)] flex items-center gap-2 shrink-0 whitespace-nowrap"
                >
                    <span>Let&apos;s Connect</span>
                    <span className="text-lg leading-none">→</span>            
                </button>
            </div>
        </AnimatedSection>

      </div>
    </section>
  )
}