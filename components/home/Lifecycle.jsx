'use client'

import { useState, useEffect, useRef } from 'react'

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

export default function Lifecycle({ onContactClick }) {
  // We track which stage is active. Clicking on mobile sets this.
  const [activeStage, setActiveStage] = useState(null)

  const stages = [
    { id: 1, name: 'Initiation', icon: 'fa-lightbulb', image: '/assets/Intiation Phase.png', description: 'Feasibility & concept phase planning', outputs: ['Early Design Clarity', 'Initial Budget Confidence', 'Stakeholder Alignment'] },
    { id: 2, name: 'Pre-construction', icon: 'fa-layer-group', image: '/assets/Preconstruction Phase.png', description: 'Pre-Construction Planning & Coordination', outputs: ['Coordinated Model', 'Reduced Conflicts', 'Execution-Ready Documentation'] },
    { id: 3, name: 'Design Dev', icon: 'fa-bezier-curve', image: '/assets/Design Development Phase.png', description: 'Designing Development & Optimization', outputs: ['Design visualization', 'Early identification of conflicts', 'Digital foundation'] },
    { id: 4, name: 'Execution', icon: 'fa-person-digging', image: '/assets/Execution Phase.png', description: 'Construction & Execution Phase', outputs: ['Timeline Optimization via 4d', 'Reduced Rework', 'Proactive Resolution'] },
    { id: 5, name: 'Handover', icon: 'fa-check-to-slot', image: '/assets/Handover Phase.png', description: 'Handover & Commissioning', outputs: ['Digital Twin', 'Legal BIM Model', 'Predictive Maintenance'] }
  ]

  const handleStageClick = (id) => {
    // If clicking the same one, close it. Otherwise, open the new one.
    setActiveStage(prev => prev === id ? null : id)
  }

  return (
    <section className="container mx-auto px-6 -mt-20 pt-0 pb-12 relative overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes subtleFloating {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: subtleFloating 3s ease-in-out infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Header */}
      <div className="text-center mb-12">
        <AnimatedSection animationClass="opacity-0 translate-y-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            End-to-End <span className="text-[#6EDD4D]">Lifecycle</span>
          </h2>
          <p className="text-zinc-500 text-lg font-medium max-w-2xl mx-auto">
            Comprehensive project management from conceptualization to final asset handover.
          </p>
        </AnimatedSection>
      </div>

      {/* Horizontal Scroll on Mobile, Grid on Desktop */}
      <div className="relative mb-12">
        <div className="overflow-x-auto no-scrollbar pb-12 -mx-6 px-6">
          <div className="flex lg:grid lg:grid-cols-5 gap-4 min-w-max lg:min-w-full items-start">
            {stages.map((stage, idx) => {
              const isActive = activeStage === stage.id

              return (
                <AnimatedSection
                  key={stage.id}
                  animationClass="opacity-0 translate-y-16"
                  delay={idx * 150}
                  className="w-[300px] md:w-[350px] lg:w-auto flex-shrink-0 lg:flex-shrink"
                >
                  <div
                    onClick={() => handleStageClick(stage.id)}
                    onMouseEnter={() => { if (window.innerWidth > 1024) setActiveStage(stage.id) }}
                    onMouseLeave={() => { if (window.innerWidth > 1024) setActiveStage(null) }}
                    className={`relative flex flex-col items-center text-center p-8 rounded-[2.5rem] transition-all duration-700 cursor-pointer border ${isActive
                      ? 'bg-zinc-900/80 border-[#6EDD4D]/40 shadow-[0_0_40px_rgba(110,221,77,0.1)]'
                      : 'bg-zinc-900/20 border-white/5 hover:border-white/10'
                      }`}
                  >
                    {/* Image Container */}
                    <div className={`w-full transition-all duration-700 flex justify-center items-center ${isActive ? 'h-40 opacity-100 mb-6 scale-110 animate-float' : 'h-24 opacity-40 mb-4'}`}>
                      <img src={stage.image} alt={stage.name} className="max-h-full object-contain" />
                    </div>

                    <div className={`mb-4 px-3 py-1 rounded-full text-[10px] uppercase font-bold transition-all ${isActive ? 'bg-[#6EDD4D] text-black' : 'bg-zinc-800 text-zinc-500'}`}>
                      Stage 0{stage.id}
                    </div>

                    <h3 className={`font-black uppercase tracking-tighter transition-all ${isActive ? 'text-xl text-white mb-4' : 'text-base text-zinc-500'}`}>
                      {stage.name}
                    </h3>

                    <div className={`text-3xl mb-6 transition-all ${isActive ? 'text-[#6EDD4D]' : 'text-zinc-700'}`}>
                      <i className={`fa-solid ${stage.icon}`}></i>
                    </div>

                    <p className={`text-sm transition-colors ${isActive ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      {stage.description}
                    </p>

                    {/* Expandable Content */}
                    <div className={`w-full overflow-hidden transition-all duration-700 ease-in-out ${isActive ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                      <div className="w-full h-[1px] bg-zinc-800 mb-6"></div>
                      <ul className="space-y-4 text-left">
                        {stage.outputs.map((out, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#6EDD4D]"></div>
                            <span className="text-[11px] font-bold text-zinc-400 uppercase">{out}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </div>

      {/* Static Contact Button */}
      <div className="flex flex-col items-center pt-8">

        {/* NEW HEADING HERE */}
        <AnimatedSection animationClass="opacity-0 translate-y-4" className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-10 -mt-16 tracking-tight">
            Got a challenge or idea?
          </h3>
        </AnimatedSection>

        <AnimatedSection animationClass="opacity-0 scale-90">
          <button
            onClick={onContactClick}
            className="group relative overflow-hidden border border-[#6EDD4D] text-[#6EDD4D] font-black uppercase tracking-widest text-xs px-12 py-5 rounded-xl transition-all hover:text-black"
          >
            <div className="absolute inset-0 bg-[#6EDD4D] translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10"></div>
            <span className="flex items-center gap-4">
              Let's Solve it Together
              <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-2"></i>
            </span>
          </button>
        </AnimatedSection>
      </div>
    </section>
  )
}