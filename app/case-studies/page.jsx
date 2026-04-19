'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Building2, Home, Factory, HeartPulse, GraduationCap, Ship, Zap, Network, ShoppingBag, Server, MoveRight } from 'lucide-react'
import ContactModal from '@/components/home/ContactModal'

// --- ANIMATION WRAPPER ---
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
      className={`transition-all duration-[1000ms] ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : animationClass
        } ${className}`}
    >
      {children}
    </div>
  )
}

// --- INDIVIDUAL CARD COMPONENT ---
const CaseStudyCard = ({ study, onView }) => (
  <div className="group h-full flex flex-col rounded-[1.5rem] border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[#6EDD4D]/40 hover:scale-[1.01]">
    {/* Image */}
    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
      <img
        src={study.image}
        alt={study.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-4 left-4">
        <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
          <span className="text-[#6EDD4D]">{study.icon}</span>
          {study.category}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-grow">
      <div className="h-[52px] mb-2">
        <h3 className="text-lg font-bold text-white group-hover:text-[#6EDD4D] transition-colors leading-snug line-clamp-2">
          {study.title}
        </h3>
      </div>

      <div className="h-[40px] mb-5">
        <p className="text-zinc-300 text-sm font-semibold leading-relaxed line-clamp-2">
          {study.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {study.features.map((feature, i) => (
          <span key={i} className="text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-1.5">
            <Zap size={10} className="text-[#6EDD4D]" fill="currentColor" />
            {feature}
          </span>
        ))}
      </div>

      {/* Button */}
      <button
        onClick={() => onView(study.id)}
        className="mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest transition-all group-hover:bg-[#6EDD4D] group-hover:text-black"
      >
        View Full Case Study
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  </div>
)

const CaseStudies = () => {
  const router = useRouter()
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const caseStudies = [
    { id: 1, title: "Commercial Complex Development", category: "Commercial", description: "Complete development of 50,000 sq.ft. commercial complex with advanced BIM integration", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800", features: ["BIM Modeling", "Cost Optimization"], icon: <Building2 size={14} /> },
    { id: 2, title: "Residential Tower Project", category: "Residential", description: "30-story residential tower with sustainable construction practices", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800", features: ["Sustainable Design", "Quality Control"], icon: <Home size={14} /> },
    { id: 3, title: "Industrial Facility", category: "Industrial", description: "Large-scale industrial facility with complex MEP systems", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800", features: ["MEP Integration", "Risk Management"], icon: <Factory size={14} /> },
    { id: 4, title: "Healthcare Infrastructure", category: "Healthcare", description: "State-of-the-art healthcare facility with specialized requirements", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800", features: ["Specialized Systems", "QA"], icon: <HeartPulse size={14} /> },
    { id: 5, title: "Educational Campus", category: "Educational", description: "Multi-building educational campus with integrated infrastructure", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800", features: ["Campus Planning", "Sustainable"], icon: <GraduationCap size={14} /> },
    { id: 6, title: "Transportation Hub", category: "Infrastructure", description: "Major transportation hub with complex civil engineering requirements", image: "https://images.unsplash.com/photo-1473830394358-91588751b241?q=80&w=800", features: ["Civil Engineering", "Management"], icon: <Ship size={14} /> },
    { id: 7, title: "Smart City Development", category: "Infrastructure", description: "Integrated smart city development with IoT and sustainable systems", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800", features: ["IoT Integration", "Smart Systems"], icon: <Network size={14} /> },
    { id: 8, title: "Shopping Mall Complex", category: "Commercial", description: "Modern shopping mall with entertainment and retail spaces", image: "https://images.unsplash.com/photo-1555529902-5261145633bf?w=800", features: ["Retail Design", "Parking"], icon: <ShoppingBag size={14} /> },
    { id: 9, title: "IT Park Development", category: "Commercial", description: "Technology park with advanced infrastructure and amenities", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800", features: ["Tech Infrastructure", "Green Building"], icon: <Server size={14} /> }
  ]

  const handleViewProject = (id) => router.push(`/case-studies/${id}`)

  // Logic for mobile scrolling (5 per row) and desktop (3 per row)
  const desktopRows = []
  for (let i = 0; i < caseStudies.length; i += 3) desktopRows.push(caseStudies.slice(i, i + 3))

  const mobileChunks = []
  for (let i = 0; i < caseStudies.length; i += 5) mobileChunks.push(caseStudies.slice(i, i + 5))

  return (
    <section className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection animationClass="opacity-0 -translate-y-10">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              Case <span className="text-[#6EDD4D]">Studies</span>
            </h2>
            <p className="max-w-2xl mx-auto text-zinc-400 text-lg font-semibold leading-relaxed">
              Real construction projects delivered with quality, precision, and efficiency.
            </p>
          </AnimatedSection>
        </div>

        {/* Desktop View (Grid) */}
        <div className="hidden md:flex flex-col gap-12">
          {desktopRows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-3 gap-8">
              {row.map((study) => (
                <AnimatedSection key={study.id} animationClass="opacity-0 translate-y-10" delay={100}>
                  <CaseStudyCard study={study} onView={handleViewProject} />
                </AnimatedSection>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile View (Horizontal Scroll per batch of 5) */}
        <div className="md:hidden flex flex-col gap-16">
          {mobileChunks.map((chunk, idx) => (
            <div key={idx} className="relative">
              <div className="flex items-center justify-between mb-4 px-2">
                <span className="text-[#6EDD4D] text-[10px] font-bold uppercase tracking-widest">Batch 0{idx + 1}</span>
                <div className="h-px flex-grow mx-4 bg-zinc-800" />
                <span className="text-zinc-600 text-[8px] uppercase">Swipe →</span>
              </div>
              <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-4">
                {chunk.map((study) => (
                  <div key={study.id} className="min-w-[85vw] snap-center">
                    <CaseStudyCard study={study} onView={handleViewProject} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* NEW CTA SECTION */}
        {/* COMPACT CTA SECTION (Matches Image) */}
        <div className="mt-10 mb-6 px-4">
          <AnimatedSection animationClass="opacity-0 scale-95" delay={200}>
            {/* Reduced max-width and vertical padding (py-12) */}
            <div className="relative overflow-hidden bg-[#0a0a0a]/80 backdrop-blur-xl border border-zinc-900 rounded-[3rem] py-12 px-6 text-center group max-w-3xl mx-auto">

              {/* Subtle Glowing Background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-[#6EDD4D]/5 blur-[80px] pointer-events-none rounded-full" />

              {/* Smaller, tighter heading */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-tight relative z-10">
                Ready to move your project forward?
              </h3>

              <div className="flex justify-center relative z-10">
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  /* Compact button style */
                  className="bg-[#6EDD4D] text-black font-black px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-white shadow-[0_0_30px_rgba(110,221,77,0.2)] uppercase tracking-widest text-[10px] md:text-xs"
                >
                  Let&apos;s Connect
                  <MoveRight size={18} />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Modal Rendering */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        initialStep={1}
      />
    </section>
  )
}

export default CaseStudies