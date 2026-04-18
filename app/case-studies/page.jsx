'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Building2, Home, Factory, HeartPulse, GraduationCap, Ship, Zap, Network, ShoppingBag, Server } from 'lucide-react'

// --- UNIQUE ANIMATION WRAPPER FOR CASE STUDIES (Skew & Swing Reveal) ---
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
      // Uses a very snappy, satisfying easing curve for the "swing" effect
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isVisible ? 'opacity-100 translate-y-0 skew-y-0 scale-100' : animationClass
        } ${className}`}
    >
      {children}
    </div>
  )
}

const CaseStudies = ({ onContactClick }) => {
  const router = useRouter()

  const caseStudies = [
    {
      id: 1,
      title: "Commercial Complex Development",
      category: "Commercial",
      description: "Complete development of 50,000 sq.ft. commercial complex with advanced BIM integration",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
      features: ["BIM Modeling", "Cost Optimization", "Timeline Management"],
      icon: <Building2 size={18} />
    },
    {
      id: 2,
      title: "Residential Tower Project",
      category: "Residential",
      description: "30-story residential tower with sustainable construction practices",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop",
      features: ["Sustainable Design", "Quality Control", "Safety Compliance"],
      icon: <Home size={18} />
    },
    {
      id: 3,
      title: "Industrial Facility",
      category: "Industrial",
      description: "Large-scale industrial facility with complex MEP systems",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
      features: ["MEP Integration", "Project Coordination", "Risk Management"],
      icon: <Factory size={18} />
    },
    {
      id: 4,
      title: "Healthcare Infrastructure",
      category: "Healthcare",
      description: "State-of-the-art healthcare facility with specialized requirements",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
      features: ["Specialized Systems", "Regulatory Compliance", "Quality Assurance"],
      icon: <HeartPulse size={18} />
    },
    {
      id: 5,
      title: "Educational Campus",
      category: "Educational",
      description: "Multi-building educational campus with integrated infrastructure",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop",
      features: ["Campus Planning", "Infrastructure Integration", "Sustainable Solutions"],
      icon: <GraduationCap size={18} />
    },
    {
      id: 6,
      title: "Transportation Hub",
      category: "Infrastructure",
      description: "Major transportation hub with complex civil engineering requirements",
      image: "https://images.unsplash.com/photo-1473830394358-91588751b241?q=80&w=800&auto=format&fit=crop",
      features: ["Civil Engineering", "Structural Design", "Project Management"],
      icon: <Ship size={18} />
    },
    {
      id: 7,
      title: "Smart City Development",
      category: "Infrastructure",
      description: "Integrated smart city development with IoT and sustainable systems",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800&q=80",
      features: ["IoT Integration", "Smart Systems", "Sustainable Design"],
      icon: <Network size={18} />
    },
    {
      id: 8,
      title: "Shopping Mall Complex",
      category: "Commercial",
      description: "Modern shopping mall with entertainment and retail spaces",
      image: "https://images.unsplash.com/photo-1555529902-5261145633bf?auto=format&fit=crop&w=800&q=80",
      features: ["Retail Design", "Entertainment Spaces", "Parking Solutions"],
      icon: <ShoppingBag size={18} />
    },
    {
      id: 9,
      title: "IT Park Development",
      category: "Commercial",
      description: "Technology park with advanced infrastructure and amenities",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      features: ["Tech Infrastructure", "Modern Amenities", "Green Building"],
      icon: <Server size={18} />
    }
  ]

  const handleViewProject = (studyId) => {
    router.push(`/case-studies/${studyId}`)
  }

  return (
    <section className="py-24 px-6 relative overflow-hidden md:mt-[-50px] bg-zinc-950 selection:bg-[#6EDD4D]/30 min-h-screen">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6EDD4D]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Header drops down smoothly */}
          <AnimatedSection animationClass="opacity-0 -translate-y-10 scale-95">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#6EDD4D]/10 border border-[#6EDD4D]/20 text-[#6EDD4D] text-[10px] font-bold uppercase tracking-widest mb-6">
              Our Track Record
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">
              CASE <span className="text-[#6EDD4D]">STUDIES</span>
            </h2>
            <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed">
              Real construction projects delivered with quality, precision, and efficiency.
            </p>
          </AnimatedSection>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {caseStudies.map((study, index) => (

            <AnimatedSection
              key={study.id}
              animationClass="opacity-0 translate-y-24 skew-y-6 scale-90"
              delay={(index % 3) * 150} // Creates a nice diagonal staggered effect
              className="h-full"
            >
              <div
                className="h-full group flex flex-col rounded-[2.5rem] border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-[#6EDD4D]/40 hover:shadow-[0_0_40px_rgba(110,221,77,0.05)]"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Green overlay on hover */}
                  <div className="absolute inset-0 bg-[#6EDD4D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-6 left-6">
                    <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950/80 border border-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                      <span className="text-[#6EDD4D]">{study.icon}</span>
                      {study.category}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#6EDD4D] transition-colors leading-tight">
                    {study.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2">
                    {study.description}
                  </p>

                  {/* Features Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {study.features.map((feature, i) => (
                      <span key={i} className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight flex items-center gap-1.5">
                        <Zap size={10} className="text-[#6EDD4D]" fill="currentColor" />
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <button
                    onClick={() => handleViewProject(study.id)}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#6EDD4D] hover:text-[#6EDD4D]/80 transition-colors"
                  >
                    View Full Case Study <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </AnimatedSection>

          ))}
        </div>

        {/* Bottom Navigation / Final CTA */}
        <div className="flex flex-col items-center gap-12 mt-12 border-t border-zinc-900 pt-16">
          <AnimatedSection animationClass="opacity-0 translate-y-16 scale-95" delay={200} className="w-full max-w-4xl">
            <div className="text-center bg-zinc-900/40 p-10 rounded-[3rem] border border-zinc-800 backdrop-blur-md relative overflow-hidden group">
              {/* Internal Accent Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#6EDD4D]/20 blur-[80px] rounded-full"></div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to move your project forward?</h3>
              <button
                onClick={onContactClick}
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-[#6EDD4D] px-10 py-4 font-black uppercase tracking-widest text-zinc-950 transition-all hover:bg-white hover:shadow-[0_0_30px_rgba(110,221,77,0.4)]"
              >
                <span>Let&apos;s Connect</span>
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </AnimatedSection>
        </div>

      </div>
    </section>
  )
}

export default CaseStudies