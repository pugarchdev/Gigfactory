'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin, Maximize2, Zap, ChevronLeft, ChevronRight } from 'lucide-react'

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
  <div className="group h-full flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[#6EDD4D]/40 hover:scale-[1.01]">

    <CardCarousel images={project.images} />

    <div className="p-6 flex flex-col flex-grow">
      {/* 1. Header Row */}
      <div className="flex justify-between items-start mb-4">
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-200">
          {project.type}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${project.status === 'Completed' ? 'text-[#6EDD4D]' : 'text-amber-400'
          }`}>
          {project.status}
        </span>
      </div>

      {/* 2. Title Section */}
      <div className="h-[48px] mb-2">
        <h3 className="text-lg font-bold text-white group-hover:text-[#6EDD4D] transition-colors leading-snug line-clamp-2">
          {project.title}
        </h3>
      </div>

      {/* 3. Description */}
      <div className="h-[40px] mb-5">
        <p className="text-zinc-300 text-sm font-semibold leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>

      {/* 4. Scope Box */}
      <div className="mb-6 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 h-[90px] flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-1.5 text-[#6EDD4D]">
          <Zap size={12} fill="currentColor" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Scope</span>
        </div>
        <p className="text-zinc-200 text-xs font-semibold leading-relaxed line-clamp-2">
          {project.scope}
        </p>
      </div>

      {/* 5. Footer Row - Labels removed as requested */}
      <div className="mt-auto pt-4 border-t border-zinc-800/50 flex items-center justify-between">
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

// --- ROW WRAPPER ---
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

export default function Projects() {
  const allProjects = [
    { title: "Microsoft B3 Building", description: "End to End BIM Support for Brownfield Commercial building project for Mmoser", images: ["https://res.cloudinary.com/deinrj3zm/image/upload/v1776168313/1.Microsoft.A_qxxxad.jpg", "https://res.cloudinary.com/deinrj3zm/image/upload/v1776168318/1.Microsoft.B_rhuk0g.png", "https://res.cloudinary.com/deinrj3zm/image/upload/v1776168315/1.Microsoft.C_wkmgzj.png"], area: "6,00,000 sqft", location: "Hyderabad", scope: "BIM - LOD 350, LOD 500, Clash Detection + Resolution", status: "Ongoing", type: "Commercial" },
    { title: "Ryan International School", description: "End to End BIM support for school project for architecture trade", images: ["https://res.cloudinary.com/deinrj3zm/image/upload/v1776168318/2.Ryan.A_i1gryq.png", "https://res.cloudinary.com/deinrj3zm/image/upload/v1776168336/2.Ryan.B_zxym92.png", "https://res.cloudinary.com/deinrj3zm/image/upload/v1776168332/2.Ryan.C_lxuea2.png"], area: "95,000 sqft", location: "Pune", scope: "BIM - LOD 350, Modeling + Documentation Support", status: "Ongoing", type: "Institutional" },
    { title: "Bluestar Interior Fitout", description: "End-to-End BIM Support for Bluestar Interior Fitout Project", images: ["https://res.cloudinary.com/deinrj3zm/image/upload/v1776586919/3.Bluestar.A_w3sxxi.png", "https://res.cloudinary.com/deinrj3zm/image/upload/v1776586922/3.Bluestar.B_xhvbmd.png", "https://res.cloudinary.com/deinrj3zm/image/upload/v1776586919/3.Bluestar.C_l6zmi6.png"], area: "35,000 sqft", location: "Pune", scope: "BIM - LOD 350, 4D Monitoring and Controls", status: "Completed", type: "Commercial" },
    { title: "Webworks Data Centre", description: "Tracking and monitoring of project using BIM 4D, Synchro and Primavera P6", images: ["https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800", "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800", "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800"], area: "8,00,000 sqft", location: "Navi Mumbai", scope: "BIM - LOD 350, 4D Monitoring and Controls", status: "Ongoing", type: "Data Centre" },
    { title: "Mall Project (Kolkata)", description: "BIM support for Edifice Client's interior works in Brookfield Mall", images: ["https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=800", "https://images.unsplash.com/photo-1567449303078-57ad995bd301?q=80&w=800", "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800"], area: "70,000 sqft", location: "Kolkata", scope: "BIM ID - LOD 350, Clash Detection + Resolution", status: "Completed", type: "Retail" },
    { title: "Antariksh Logistics Park", description: "MEPF planning, design and engineering support for logistic park", images: ["https://res.cloudinary.com/deinrj3zm/image/upload/v1776168326/6.Antariksh.A_zme4ue.png", "https://res.cloudinary.com/deinrj3zm/image/upload/v1776168344/6.Antariksh.B_g0qiob.png", "https://res.cloudinary.com/deinrj3zm/image/upload/v1776168334/6.Antariksh.C_rbyemv.png"], area: "2,68,000 sqft", location: "Bhiwandi", scope: "End to End Design, DBR Preparation, Trade drawings", status: "Completed", type: "Logistics" },
    { title: "Mall Project (Vizag)", description: "BIM Support for Edifice for interior trade in a high end mall project", images: ["https://res.cloudinary.com/deinrj3zm/image/upload/v1776168347/7.Vizag.A_xtimdh.png", "https://res.cloudinary.com/deinrj3zm/image/upload/v1776168360/7.Vizag.B_plfgyc.png", "https://res.cloudinary.com/deinrj3zm/image/upload/v1776168365/7.Vizag.C_rpuvuo.png"], area: "3,30,000 sqft", location: "Vizag", scope: "BIM ID - LOD 350, Modeling + Clash Resolution", status: "Completed", type: "Retail" },
    { title: "Peer Review & Optimisation", description: "Peer review of MEPF design for luxury villas in Dubai", images: ["https://res.cloudinary.com/deinrj3zm/image/upload/v1776168366/8.Dubai_e8npds.png", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800", "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800"], area: "1,80,000 Sqft", location: "Dubai", scope: "Value engineering and design optimization", status: "Completed", type: "Residential" },
    { title: "Mission Critical Project(Confidential)", description: "Rectification of architectural BIM model and sheet extraction", images: ["https://res.cloudinary.com/deinrj3zm/image/upload/v1776168354/9.Aconnex.A_vyalue.png", "https://res.cloudinary.com/deinrj3zm/image/upload/v1776168352/9.Aconnex.B_m1orgb.png", "https://res.cloudinary.com/deinrj3zm/image/upload/v1776168354/9.Aconnex.C_bwbffb.png"], area: "5,00,000 sqft", location: "Navi Mumbai", scope: "BIM - LOD 350, Modeling + Documentation", status: "Ongoing", type: "Data Centre" },
    { title: "3 Star Hotel in Puri", description: "Ensuring a clash-free building model for construction execution", images: ["https://res.cloudinary.com/deinrj3zm/image/upload/v1776168327/10.Hotel3Star.Puri_k2dfqp.png", "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?q=80&w=800", "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800"], area: "1,00,000 sqft", location: "Puri", scope: "BIM LOD 350 - All Trades + Clash Resolution", status: "Completed", type: "Hospitality" },
    { title: "Mission Critical Project", description: "Information management services for Colt's data center project (Phases 2 & 3), provided on behalf of the general contractor.", images: ["https://res.cloudinary.com/deinrj3zm/image/upload/v1776168336/11.Colt.A_co6bzd.png", "https://res.cloudinary.com/deinrj3zm/image/upload/v1776168337/11.Colt.B_wdj0jd.png"], area: "5,00,000 sqft", location: "Navi Mumbai", scope: "BIM-LOD 400,500 + Clash Detection + Clash Resolution Support + Documentation + As-Built preparation", status: "Ongoing", type: "Data Centre" },
    { title: "Billionaire Bunglow", description: "End to End BIM Support for Luxury Villa to add value for Execution", images: ["https://res.cloudinary.com/deinrj3zm/image/upload/v1776168351/12.Dreamsmith.A_pdd7ds.png", "https://res.cloudinary.com/deinrj3zm/image/upload/v1776168349/12.Dreamsmith.B_xvmnag.png", "https://res.cloudinary.com/deinrj3zm/image/upload/v1776168353/12.Dreamsmith.C_zk0toz.png"], area: "30,000 sqft", location: "Goa", scope: "BIM LOD 350 - All Trades + Clash Resolution", status: "Completed", type: "Residential" },
    { title: "Medical College Project", description: "Preparation of MEPF BOQ for Medical College and hospital", images: ["https://res.cloudinary.com/deinrj3zm/image/upload/v1776168356/13.MedicalCollege.IITKanpur_yumrb2.png", "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800", "https://res.cloudinary.com/deinrj3zm/image/upload/v1776168353/12.Dreamsmith.C_zk0toz.png"], area: "8,00,000 sqft", location: "Kanpur", scope: "MEP BOQ - Tradewise and measurement sheets", status: "Completed", type: "Hospital" },
    { title: "The Address UAE", description: "Documentation support for luxury 5-star hotel project", images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800", "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800"], area: "36,00,000 sqft", location: "UAE", scope: "BIM - LOD 350, Modeling + Documentation", status: "Completed", type: "Mixed Use" },
    { title: "Commercial Project Visualisation", description: "4D sequencing and visualization for a USA-based retrofitting project, achieved by integrating the Revit model with the MSP schedule.", images: ["https://res.cloudinary.com/deinrj3zm/image/upload/v1776168349/15.CommercialProjectUSA.A_logab2.jpg", "https://res.cloudinary.com/deinrj3zm/image/upload/v1776168351/15.CommercialProjectUSA.B_tpplz8.jpg", "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800"], area: "-", location: "USA", scope: "4D visualization video( as planned) by Integrating BIM ( Revit ) and MS Project Schedule with LOI 350", status: "Completed", type: "Data Centre" },
    { title: "Mission Critical Project (Confidential)", description: "Preperation of architectural BIM for data center project", images: ["https://res.cloudinary.com/deinrj3zm/image/upload/v1776168365/16.DataCenter.Hyd_f2q2hl.png", "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800", "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800"], area: "4,70,000 sqft", location: "Hyderabad", scope: "BIM - LOD 350, Modeling + Clash Detection + Clash Resolution Support + Documentation", status: "Ongoing", type: "Data Centre" },
  ]

  const desktopRows = []; for (let i = 0; i < allProjects.length; i += 3) desktopRows.push(allProjects.slice(i, i + 3))
  const mobileChunks = []; for (let i = 0; i < allProjects.length; i += 5) mobileChunks.push(allProjects.slice(i, i + 5))

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-[#6EDD4D]/30 pb-32 overflow-x-hidden">
      <header className="py-20 px-6 text-center border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md mb-16">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Project <span className="text-[#6EDD4D]">Portfolio</span>
          </h1>          <p className="max-w-2xl mx-auto text-zinc-400 text-lg">Delivered across 10+ million sq.ft of construction projects worldwide.</p>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-6">
        <div className="hidden md:flex flex-col gap-12">{desktopRows.map((row, idx) => <ProjectRow key={idx} projects={row} />)}</div>

        <div className="md:hidden flex flex-col gap-20">
          {mobileChunks.map((chunk, idx) => (
            <div key={idx} className="relative">
              <div className="flex items-center justify-between mb-6 px-2">
                <h2 className="text-[#6EDD4D] text-[10px] font-bold uppercase tracking-[0.2em]">Batch 0{idx + 1}</h2>
                <div className="h-px flex-grow mx-4 bg-zinc-800" />
              </div>
              <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-6">
                {chunk.map((p, i) => <div key={i} className="min-w-[85vw] snap-center"><ProjectCard project={p} /></div>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  )
}