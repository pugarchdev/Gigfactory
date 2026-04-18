'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin, Maximize2, CheckCircle2, Clock, Zap } from 'lucide-react'

// --- UNIQUE ANIMATION WRAPPER FOR PROJECTS PAGE (Blur + Scale Reveal) ---
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
      // Added blur-0 and a premium cubic-bezier easing for a cinematic feel
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0' : animationClass
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default function Projects() {
  const services = [
    {
      title: "Microsoft B3 Building",
      description: "End to End BIM Support for Brownfield Commercial building project for Mmoser",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
      area: "6,00,000 sqft",
      location: "Hyderabad",
      scope: "BIM - LOD 350, LOD 500, Clash Detection + Clash Resolution, Support + Documentation, BEP Preparation and Control",
      status: "Ongoing",
      type: "Commercial",
    },
    {
      title: "Ryan International School",
      description: "End to End BIM support for school project for architecture trade, focusing on sheet production",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop",
      area: "95000 sqft",
      location: "Pune",
      scope: "BIM - LOD 350, Modeling + Documentation",
      status: "Ongoing",
      type: "Institutional",
    },
    {
      title: "Bluestar Interior Fitout",
      description: "End-to-End BIM Support for Bluestar Interior Fitout Project for AMS Project Consultants, aimed at driving project management through BIM.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
      area: "35000 sqft",
      location: "Pune",
      scope: "BIM - LOD 350, Modeling + Documentation, 4D Monitoring and Controls",
      status: "Completed",
      type: "Commercial",
    },
    {
      title: "Webworks Data Centre",
      description: "Tracking and monitoring of project using BIM 4D, Synchro and Primavera P6 in weekly frequency - tradewise/phasewise and contractor wise",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
      area: "8,00,000 sqft",
      location: "Navi Mumbai",
      scope: "BIM - LOD 350, Modeling + Documentation, 4D Monitoring and Controls",
      status: "Ongoing",
      type: "Data Centre",
    },
    {
      title: "Mall Project (Kolkata)",
      description: "BIM support for Edifice Client's interior works in Brookfield Mall, a high-end mall project.",
      image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=800&auto=format&fit=crop",
      area: "70,000 sqft",
      location: "Kolkata",
      scope: "BIM ID - LOD 350, Modeling + Clash Detection + Clash Resolution, Support + Documentation",
      status: "Completed",
      type: "Retail",
    },
    {
      title: "Antariksh Logistics Park",
      description: "MEPF planning, design and engineering support for logistic park by Space Deck Logistics",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
      area: "2,68,000 sqft",
      location: "Bhiwandi",
      scope: "End to End Design, DBR Preparation, Trade drawings, Site visit and commissioning support",
      status: "Completed",
      type: "Logistics",
    },
    {
      title: "Mall Project (Vizag)",
      description: "BIM Support for Edifice for interior trade in a high end mall project",
      image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=800&auto=format&fit=crop",
      area: "3,30,000 sqft",
      location: "Vizag",
      scope: "BIM ID - LOD 350, Modeling + Clash Detection + Clash Resolution, Support + Documentation",
      status: "Completed",
      type: "Retail",
    },
    {
      title: "Peer Review & Optimisation",
      description: "Peer review of MEPF design for luxury villas in Dubai, undertaken for Gulf Islamic Investment.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      area: "1,80,000 Sqft",
      location: "Dubai",
      scope: "Peer review adhering to norms and optimisation of design for value engineering",
      status: "Completed",
      type: "Residential",
    },
    {
      title: "Mission Critical (Confidential)",
      description: "Rectification of architectural BIM model and sheet extraction for data center project for Edifice (Aconnex Project)",
      image: "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?q=80&w=800&auto=format&fit=crop",
      area: "5,00,000 sqft",
      location: "Navi Mumbai",
      scope: "BIM - LOD 350, Modeling(Rectification) + Documentation",
      status: "Ongoing",
      type: "Data Centre",
    },
    {
      title: "3 Star Hotel in Puri",
      description: "Ensuring a clash-free building model for D&GM to add value to construction execution.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
      area: "1,00,000 sqft",
      location: "Puri",
      scope: "BIM LOD 350 - All Trades (Ar/St/MEPF) + Clash Detection + Clash Resolution Support",
      status: "Completed",
      type: "Hospitality",
    },
    {
      title: "Billionaire Bunglow (Goa)",
      description: "End to End BIM Support for Luxury Villa to add value for Execution by making the building clash free",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop",
      area: "30,000 sqft",
      location: "Goa",
      scope: "BIM LOD 350 - All Trades (Ar/St/MEPF) + Clash Detection + Clash Resolution Support",
      status: "Completed",
      type: "Residential",
    },
    {
      title: "Medical College Project",
      description: "Preparation of MEPF BOQ for Medical College and hospital at IIT Kanpur for Hosmac",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
      area: "8,00,000 sqft",
      location: "Kanpur",
      scope: "MEP BOQ - Tradewise and preparation of measurement sheet",
      status: "Completed",
      type: "Hospital",
    },
    {
      title: "The Address Development",
      description: "Documentation support for Claramont's architecture and interior trade in a luxury 5-star hotel project.",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
      area: "36,000 sqft",
      location: "Al Marjan, UAE",
      scope: "BIM - LOD 350, Modeling + Documentation",
      status: "Completed",
      type: "Mixed Use",
    },
    {
      title: "Project Visualisation",
      description: "4D sequencing and visualization for a USA-based retrofitting project integrating Revit and MSP.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop",
      area: "3,30,000 sqft",
      location: "USA",
      scope: "4D visualization video by Integrating BIM (Revit) and MS Project Schedule with LOI 350",
      status: "Completed",
      type: "Institutional",
    },
    {
      title: "Mission Critical Project (Confidential)",
      description: "Preparation of architectural BIM for data center project",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
      area: "4,70,000 sqft",
      location: "USA",
      scope: "BIM - LOD 350, Modeling + Clash Detection + Clash Resolution, Support + Documentation",
      status: "Ongoing",
      type: "Data Centre",
    },
  ];

  return (
    <main className="min-h-screen text-zinc-100 selection:bg-[#6EDD4D]/30 pb-12">
      
      <div className="relative z-10">
        {/* Page Hero Header */}
        <header className="py-24 md:py-22 px-6 text-center border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md mb-16 mt-[-40px] md:mt-[-70px]">
          <div className="container mx-auto pt-20">
            {/* Header zooms in and unblurs */}
            <AnimatedSection animationClass="opacity-0 scale-110 blur-xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#6EDD4D]/10 border border-[#6EDD4D]/20 text-[#6EDD4D] text-xs font-bold uppercase tracking-widest mb-6">
                Our Portfolio
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
                Projects <span className="text-[#6EDD4D]">Excellence</span>
              </h1>
              <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed">
                Delivered across 10+ million sq.ft of construction projects worldwide.
              </p>
            </AnimatedSection>
          </div>
        </header>

        <section className="py-12 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((project, index) => (
                
                <AnimatedSection 
                  key={index} 
                  animationClass="opacity-0 scale-[0.85] blur-md translate-y-16" 
                  delay={(index % 3) * 150} // Slightly wider stagger for a cooler effect
                  className="h-full"
                >
                  <div className="h-full group flex flex-col rounded-[2.5rem] border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-[#6EDD4D]/50 hover:shadow-[0_0_40px_rgba(110,221,77,0.1)]">

                    {/* Visual Header */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-[#6EDD4D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md ${
                          project.status.toLowerCase() === 'completed' 
                          ? 'bg-[#6EDD4D]/20 border-[#6EDD4D]/40 text-[#6EDD4D]' 
                          : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                        }`}>
                          {project.status.toLowerCase() === 'completed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                          {project.status}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-700 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                          {project.type}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#6EDD4D] transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>

                      <div className="mb-8 p-5 rounded-2xl bg-zinc-950/50 border border-zinc-800/50">
                        <div className="flex items-center gap-2 mb-3 text-[#6EDD4D]">
                          <Zap size={14} fill="currentColor" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Scope</span>
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                          {project.scope}
                        </p>
                      </div>

                      {/* Details Footer */}
                      <div className="mt-auto pt-6 border-t border-zinc-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-[#6EDD4D]/10 text-[#6EDD4D]"><Maximize2 size={16} /></div>
                          <div>
                            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Area</p>
                            <p className="text-sm font-bold text-zinc-100">{project.area}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-right">
                          <div>
                            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Location</p>
                            <p className="text-sm font-bold text-zinc-100">{project.location}</p>
                          </div>
                          <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400"><MapPin size={16} /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}