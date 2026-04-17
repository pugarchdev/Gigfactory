'use client'

import { useState, useRef, useEffect } from 'react'

export default function Lifecycle({ onContactClick }) {
  const [activeStage, setActiveStage] = useState(null)
  const [hoveredStage, setHoveredStage] = useState(null)
  const lifecycleRef = useRef(null)

  // Handle click outside to close description
  useEffect(() => {
    const handleClickAnywhere = (event) => {
      const stageCircle = event.target.closest('.stage-circle')
      if (stageCircle) return
      
      if (lifecycleRef.current && !lifecycleRef.current.contains(event.target)) {
        setActiveStage(null)
      }
    }
    document.addEventListener('mousedown', handleClickAnywhere)
    return () => document.removeEventListener('mousedown', handleClickAnywhere)
  }, [])

  const stages = [
    {
      id: 1,
      name: 'Initiation',
      image: '/assets/Intiation Phase.png',
      description: 'Feasibility & concept phase planning',
      outputs: ['Early Design Clarity', 'Initial Budget Confidence', 'Stakeholder Alignment']
    },
    {
      id: 2,
      name: 'Pre-construction Planning',
      image: '/assets/Preconstruction Phase.png',
      description: 'Pre-Construction',
      outputs: ['Coordinated Multi-Discipline Model', 'Reduced Design Conflicts', 'Execution-Ready Documentation', '2D/3D']
    },
    {
      id: 3,
      name: 'Designing Development',
      image: '/assets/Design Development Phase.png',
      description: 'Design Development',
      outputs: ['Improved design clarity and visualization', 'Early identification of coordination conflicts', 'Better collaboration between consultants', 'Reduced design revisions during construction', 'Structured digital foundation for project execution']
    },
    {
      id: 4,
      name: 'Execution & Monitoring',
      image: '/assets/Execution Phase.png',
      description: 'Construction & Execution Phase',
      outputs: ['Timeline Optimization via 4d', 'Reduced Rework via BIM', 'Proactive Issue Resolution', 'Data-Driven Execution Via Automation']
    },
    {
      id: 5,
      name: 'Handover',
      image: '/assets/Handover Phase.png',
      description: 'Handover & Commissioning',
      outputs: ['Digital Twin', 'Legal & Operational BIM Model', 'Structured Asset Data in uniclass', 'DataPredictive Maintenance', 'Lifecycle Cost Optimization', 'Real-Time Asset Intelligence']
    }
  ]

  const handleStageClick = (stageId) => setActiveStage(activeStage === stageId ? null : stageId)
  const handleStageHover = (stageId) => setHoveredStage(stageId)
  const handleStageLeave = () => setHoveredStage(null)

  const shouldShowDescription = (stageId) => activeStage === stageId || hoveredStage === stageId

  return (
    <section className="container mx-auto px-6 py-24 border-t border-dark-border" ref={lifecycleRef}>
      
      {/* Header */}
      <div className="text-center mb-20">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
          End-to-End Construction Lifecycle Framework
        </h2>
        <p className="text-gray-400 text-lg">
          Comprehensive project management from concept to completion
        </p>
      </div>

      {/* Stages Grid */}
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-20 max-w-6xl mx-auto mb-24">
        {stages.map((stage) => (
          <div key={stage.id} className="relative flex flex-col items-center w-40 group">
            
            {/* The Interactive Circle */}

            <button
              // Added `overflow-hidden` here so the image perfectly clips to the circle
              className={`stage-circle w-32 h-32 md:w-40 md:h-40 rounded-full border-2 flex items-center justify-center relative transition-all duration-300 z-20 overflow-hidden ${
                shouldShowDescription(stage.id) 
                  ? 'border-neon-green bg-dark-surface shadow-[0_0_30px_rgba(110,221,77,0.2)]' 
                  : 'border-dark-border bg-dark-base hover:border-neon-green/50'
              }`}
              onClick={() => handleStageClick(stage.id)}
              onMouseEnter={() => handleStageHover(stage.id)}
              onMouseLeave={handleStageLeave}
            >
      
              <img 
                src={stage.image} 
                alt={stage.name} 
                className="w-full h-full object-cover" 
              />
            </button>

            {/* Stage Title */}
            <div className={`mt-6 text-sm md:text-base font-bold text-center transition-colors duration-300 ${
              shouldShowDescription(stage.id) ? 'text-neon-green' : 'text-gray-300'
            }`}>
              {stage.id}. {stage.name}
            </div>

            {/* Hover / Click Description Popup Box */}
            <div className={`absolute top-[110%] left-1/2 -translate-x-1/2 mt-4 w-80 md:w-96 bg-dark-surface border border-dark-border rounded-2xl p-6 shadow-2xl z-50 transition-all duration-300 pointer-events-none ${
              shouldShowDescription(stage.id) 
                ? 'opacity-100 translate-y-0 pointer-events-auto border-neon-green/30' 
                : 'opacity-0 translate-y-4'
            }`}>
              {/* Up Arrow Pointer */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-dark-surface border-t border-l border-neon-green/30 rotate-45"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2 border-b border-dark-border pb-2">
                  Stage {stage.id}: {stage.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {stage.description}
                </p>
                
                <h4 className="text-xs font-bold text-neon-green uppercase tracking-widest mb-3">
                  Outputs:
                </h4>
                <ul className="space-y-2">
                  {stage.outputs.map((output, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="text-neon-green font-bold shrink-0 mt-0.5">✓</span>
                      <span className="leading-tight">{output}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Old CTA Button Logic styled in Dark Theme */}
      <div className="flex justify-center mt-12">
        <button 
          onClick={onContactClick} 
          className="bg-transparent border-2 border-neon-green text-neon-green font-bold px-10 py-4 rounded-full transition-all duration-300 hover:bg-neon-green hover:text-black hover:shadow-[0_0_20px_rgba(110,221,77,0.3)] flex items-center gap-3"
        >
          <span>Got a challenge or idea? Let&apos;s talk</span>
          <span className="text-xl leading-none">→</span>
        </button>
      </div>

    </section>
  )
}