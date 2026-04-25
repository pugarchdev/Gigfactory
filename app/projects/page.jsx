'use client'

import { useState, useEffect, useRef } from 'react'
import { projectsApi } from '@/lib/api'
import { MapPin, Maximize2, Zap, ChevronLeft, ChevronRight } from 'lucide-react'

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

// --- NESTED IMAGE CAROUSEL COMPONENT ---
const CardCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = (e) => {
    e.preventDefault(); e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prev = (e) => {
    e.preventDefault(); e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950 group/carousel">
      {images.filter(img => img && img.trim() !== "").map((img, i) => (
        <img
          key={i}
          src={img}
          alt="Project view"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${i === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-20">
        <button onClick={prev} className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-[#6EDD4D] hover:text-black transition-all">
          <ChevronLeft size={18} />
        </button>
        <button onClick={next} className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-[#6EDD4D] hover:text-black transition-all">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {images.filter(img => img && img.trim() !== "").map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-4 bg-[#6EDD4D]' : 'w-1.5 bg-white/30'}`} />
        ))}
      </div>
    </div>
  )
}

// --- INDIVIDUAL PROJECT CARD ---
const ProjectCard = ({ project }) => (
  <div className="group h-full w-full flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[#6EDD4D]/40 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(110,221,77,0.05)]">

    <CardCarousel images={project.images} />

    <div className="p-6 flex flex-col flex-grow">
      {/* 1. Header Row */}
      <div className="flex justify-between items-start mb-4">
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-200">
          {project.category}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${project.status?.toLowerCase() === 'completed' ? 'text-[#6EDD4D]' : 'text-amber-400'
          }`}>
          {project.status}
        </span>
      </div>

      {/* 2. Title Section */}
      <div className="h-[48px] mb-2">
        <h3 className="text-lg font-bold text-white group-hover:text-[#6EDD4D] transition-colors leading-snug line-clamp-2">
          {project.name}
        </h3>
      </div>

      {/* 3. Description */}
      <div className="h-[40px] mb-5 overflow-hidden group-hover:h-auto">
        <p className="text-zinc-300 text-sm font-semibold leading-relaxed line-clamp-2 group-hover:line-clamp-none group-hover:max-h-32 group-hover:overflow-y-auto">
          {project.description}
        </p>
      </div>

      {/* 4. Scope Box */}
      <div className="mb-6 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 h-[90px] flex flex-col justify-center mt-auto overflow-hidden group-hover:h-auto">        <div className="flex items-center gap-2 mb-1.5 text-[#6EDD4D]">
        <Zap size={12} fill="currentColor" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Scope</span>
      </div>
        <p className="text-zinc-200 text-xs font-semibold leading-relaxed line-clamp-2 group-hover:line-clamp-none group-hover:max-h-32 group-hover:overflow-y-auto">          {project.scope}
        </p>
      </div>

      {/* 5. Footer Row */}
      <div className="pt-4 border-t border-zinc-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Maximize2 size={14} className="text-[#6EDD4D]" />
          <span className="text-xs font-bold">{project.area}</span>
        </div>
        <div className="flex items-center gap-2 text-white">
          <span className="text-xs font-bold">{project.location}</span>
          <MapPin size={14} className="text-zinc-500" />
        </div>
      </div>
    </div>
  </div>
)

// --- SYNCING INDICATOR ---
const SyncingIndicator = () => (
  <div className="flex justify-center py-20">
    <div className="flex items-center text-zinc-500 font-bold tracking-[0.2em] text-xs uppercase">
      <span>Loading Projects</span>
      <span className="flex gap-1 ml-2">
        <span className="animate-bounce [animation-delay:-0.3s]">.</span>
        <span className="animate-bounce [animation-delay:-0.15s]">.</span>
        <span className="animate-bounce">.</span>
      </span>
    </div>
  </div>
)

// --- ROW WRAPPER (For Desktop View) ---
const ProjectRow = ({ projects }) => {
  const [isVisible, setIsVisible] = useState(false)
  const rowRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(rowRef.current) }
    }, { threshold: 0.1 })
    if (rowRef.current) observer.observe(rowRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={rowRef} className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {projects.map((p, i) => <ProjectCard key={i} project={p} />)}
    </div>
  )
}

// --- NEW: MOBILE BATCH ROW COMPONENT (Handles slider per row) ---
const MobileBatchRow = ({ projects }) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollContainerRef = useRef(null)

  // 🔥 AUTO SCROLL EFFECT (ADD EXACTLY HERE)
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const interval = setInterval(() => {
      const card = container.querySelector('div')
      const cardWidth = card?.offsetWidth || 300
      const gap = 16
      const scrollAmount = cardWidth + gap

      const maxScroll = container.scrollWidth - container.clientWidth

      if (container.scrollLeft + scrollAmount >= maxScroll) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [projects])

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    if (scrollWidth === clientWidth) {
      setScrollProgress(0);
      return;
    }
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollProgress(progress);
  };

  return (
    <div className="relative mb-12 z-10">
      <div className="-mx-6">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory px-6 scroll-pl-6"
        >
          {projects.map((p, i) => (
            <AnimatedSection
              key={i}
              animationClass="opacity-0 translate-y-12"
              delay={(i % 3) * 100}
              className="snap-start shrink-0 w-[85vw] max-w-[320px] flex"
            >
              <ProjectCard project={p} />
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* MOBILE SLIDER INDICATOR */}
      <div className="flex justify-center items-center mt-2">
        <div className="w-24 h-1.5 bg-zinc-800 rounded-full relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full w-1/3 bg-[#6EDD4D] rounded-full transition-transform duration-150 ease-out"
            style={{ transform: `translateX(${scrollProgress * 2}%)` }}
          />
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsApi.list()
        setProjects(data || [])
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  // Split into chunks of 3 for desktop rows
  const desktopRows = [];
  for (let i = 0; i < projects.length; i += 3) {
    desktopRows.push(projects.slice(i, i + 3))
  }

  // Split into chunks of 5 for Mobile Batches
  const mobileChunks = [];
  for (let i = 0; i < projects.length; i += 5) {
    mobileChunks.push(projects.slice(i, i + 5))
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-[#6EDD4D]/30 pb-22 overflow-x-hidden relative">

      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <header className="py-20 px-6 text-center border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md mb-16 relative z-10">
        <div className="container mx-auto">
          <AnimatedSection animationClass="opacity-0 translate-y-10" delay={0}>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              Project <span className="text-[#6EDD4D]">Portfolio</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection animationClass="opacity-0 translate-y-10" delay={150}>
            <p className="max-w-2xl mx-auto text-zinc-400 text-lg">
              Delivered across 10+ million sq.ft of construction projects worldwide.
            </p>
          </AnimatedSection>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-6">
        {loading ? (
          <div className="text-center py-20 text-zinc-400">Loading projects...</div>
        ) : (
          <>
            {/* DESKTOP VIEW */}
            <div className="hidden md:flex flex-col gap-12 relative z-10">
              {desktopRows.map((row, idx) => <ProjectRow key={idx} projects={row} />)}
            </div>

            {/* MOBILE VIEW */}
            <div className="md:hidden flex flex-col relative z-10">
              {mobileChunks.map((chunk, idx) => (
                <MobileBatchRow key={idx} projects={chunk} />
              ))}
            </div>
            
            <SyncingIndicator />

            {projects.length === 0 && (
              <div className="text-center py-20 text-zinc-400">No projects found.</div>
            )}
          </>
        )}
      </div>

    </main>
  )
}