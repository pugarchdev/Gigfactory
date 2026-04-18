'use client'

import { useState, useEffect, useRef } from 'react'

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

export default function Lifecycle({ onContactClick }) {
  // Changed from 1 to null so no card is open by default
  const [activeStage, setActiveStage] = useState(null)

  const stages = [
    {
      id: 1,
      name: 'Initiation',
      icon: 'fa-lightbulb',
      image: '/assets/Intiation Phase.png',
      description: 'Feasibility & concept phase planning',
      outputs: ['Early Design Clarity', 'Initial Budget Confidence', 'Stakeholder Alignment']
    },
    {
      id: 2,
      name: 'Pre-construction',
      icon: 'fa-layer-group',
      image: '/assets/Preconstruction Phase.png',
      description: 'Pre-Construction Planning & Coordination',
      outputs: ['Coordinated Model', 'Reduced Conflicts', 'Execution-Ready Documentation']
    },
    {
      id: 3,
      name: 'Design Dev',
      icon: 'fa-bezier-curve',
      image: '/assets/Design Development Phase.png',
      description: 'Designing Development & Optimization',
      outputs: ['Design visualization', 'Early identification of conflicts', 'Digital foundation']
    },
    {
      id: 4,
      name: 'Execution',
      icon: 'fa-person-digging',
      image: '/assets/Execution Phase.png',
      description: 'Construction & Execution Phase',
      outputs: ['Timeline Optimization via 4d', 'Reduced Rework', 'Proactive Resolution']
    },
    {
      id: 5,
      name: 'Handover',
      icon: 'fa-check-to-slot',
      image: '/assets/Handover Phase.png',
      description: 'Handover & Commissioning',
      outputs: ['Digital Twin', 'Legal BIM Model', 'Predictive Maintenance']
    }
  ]

  return (
    <section className="container mx-auto px-6 py-24 ">
      
      {/* Header */}
      <div className="text-center mb-20">
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={0}>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            End-to-End Construction Lifecycle
            </h2>
        </AnimatedSection>
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={150}>
            <p className="text-zinc-400 text-lg">
            Comprehensive project management from concept to completion
            </p>
        </AnimatedSection>
      </div>

      {/* Interactive Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto mb-24 items-start">
        {stages.map((stage, idx) => {
          const isActive = activeStage === stage.id

          return (
            /* Staggered arrival animation */
            <AnimatedSection 
              key={stage.id} 
              animationClass="opacity-0 translate-y-16" 
              delay={idx * 150} 
              className="h-full"
            >
              <div 
                onMouseEnter={() => setActiveStage(stage.id)}
                onMouseLeave={() => setActiveStage(null)} // Added this so it closes when cursor leaves
                onClick={() => setActiveStage(activeStage === stage.id ? null : stage.id)} // Toggles on click for mobile
                className={`relative flex flex-col items-center text-center p-6 lg:p-8 rounded-[2rem] transition-all duration-700 cursor-pointer overflow-hidden ${
                  isActive 
                    ? 'bg-zinc-900/60 border border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.5)]' 
                    : 'border border-transparent hover:bg-zinc-900/20'
                }`}
              >
                
                {/* 3D Image Container (Expands on Hover) */}
                <div 
                  className={`w-full transition-all duration-700 ease-in-out flex justify-center items-center ${
                    isActive ? 'h-40 opacity-100 mb-6 scale-100' : 'h-0 opacity-0 mb-0 scale-75'
                  }`}
                >
                  <img 
                    src={stage.image} 
                    alt={stage.name} 
                    className="max-h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" 
                  />
                </div>

                {/* Stage Title */}
                <h3 className={`font-bold transition-colors duration-300 ${
                  isActive ? 'text-xl text-white mb-6' : 'text-lg text-zinc-400 mb-6'
                }`}>
                  {stage.name}
                </h3>

                {/* Stage Icon */}
                <div className={`text-4xl transition-colors duration-300 mb-6 ${
                  isActive ? 'text-[#6EDD4D]' : 'text-zinc-600'
                }`}>
                  <i className={`fa-solid ${stage.icon}`}></i>
                </div>

                {/* Stage Description */}
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  {stage.description}
                </p>

                {/* Stage Outputs (Expands on Hover to retain data value) */}
                <div 
                  className={`w-full overflow-hidden transition-all duration-700 ease-in-out ${
                    isActive ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <div className="w-full h-px bg-zinc-800 mb-4"></div>
                  <ul className="space-y-3 text-left">
                    {stage.outputs.map((output, index) => (
                      <li key={index} className="flex items-start gap-3 text-xs text-zinc-300">
                        <span className="text-[#6EDD4D] mt-0.5"><i className="fa-solid fa-check text-[10px]"></i></span> 
                        <span className="leading-tight">{output}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </AnimatedSection>
          )
        })}
      </div>

      {/* Bottom CTA Button */}
      <AnimatedSection animationClass="opacity-0 scale-75" delay={400}>
        <div className="flex justify-center">
          <button 
            onClick={onContactClick} 
            className="bg-transparent border-2 border-[#6EDD4D] text-[#6EDD4D] font-bold px-10 py-4 rounded-full transition-all duration-300 hover:bg-[#6EDD4D] hover:text-black hover:shadow-[0_0_20px_rgba(110,221,77,0.3)] flex items-center gap-3"
          >
            <span>Got a challenge or idea? Let&apos;s talk</span>
            <span className="text-xl leading-none">→</span>
          </button>
        </div>
      </AnimatedSection>

    </section>
  )
}