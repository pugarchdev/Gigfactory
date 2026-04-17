'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'

export default function OurExpertise() {
  const router = useRouter()

  const handleServiceClick = (serviceTitle) => {
    const serviceMapping = {
      'Architectural Design': '2d',
      '3D Modeling': '3d',
      '4D/5D Construction Simulation': '4d',
      'Scan to BIM': '2d',
      'Construction Documentation': '2d',
      'Constructability Review': 'audit',
      'Clash Coordination': '3d',
      'Value Engineering': 'pp-c',
      'Quantity Takeoff': 'boq'
    }

    const serviceId = serviceMapping[serviceTitle] || '2d'

    router.push('/')
    setTimeout(() => {
      const event = new CustomEvent('openServiceModal', { detail: serviceId })
      window.dispatchEvent(event)
    }, 100)
  }

  const bimServices = [
    {
      title: "Architectural Design",
      description: "Advanced 3D architectural modeling and design visualization with parametric capabilities",
      image: "/assets/Architectural Design.png",
      features: ["Parametric Design", "3D Visualization", "Design Optimization"]
    },
    {
      title: "3D Modeling",
      description: "High-precision 3D modeling services for complex architectural and engineering projects",
      image: "/assets/3D Modelling.png",
      features: ["LOD Development", "Family Creation", "Model Coordination"]
    },
    {
      title: "4D/5D Construction Simulation",
      description: "Time and cost simulation for construction planning and project management optimization",
      video: "/assets/4D_video.mp4",
      features: ["Construction Sequencing", "Cost Analysis", "Resource Planning"]
    },
    {
      title: "Scan to BIM",
      description: "Convert point cloud data and laser scans into accurate BIM models for existing buildings",
      image: "/assets/SCAN TO BIM.png",
      features: ["Point Cloud Processing", "As-Built Modeling", "Accuracy Verification"]
    },
    {
      title: "Construction Documentation",
      description: "Comprehensive construction documentation with detailed drawings and specifications",
      image: "/assets/Construction Documentation.png",
      features: ["Drawing Extraction", "Specification Writing", "Document Management"]
    },
    {
      title: "Constructability Review",
      description: "Thorough constructability analysis to identify potential issues and optimize building methods",
      image: "/assets/Construction REVIEW.png",
      features: ["Buildability Assessment", "Risk Identification", "Optimization Recommendations"]
    },
    {
      title: "Clash Coordination",
      description: "Advanced clash detection and coordination to resolve conflicts between building systems",
      image: "/assets/CLASH COORDINATION.png",
      features: ["Clash Detection", "Conflict Resolution", "System Coordination"]
    },
    {
      title: "Value Engineering",
      description: "Value engineering analysis to optimize costs while maintaining quality and functionality",
      image: "/assets/VALUE ENGINEERING.png",
      features: ["Cost Optimization", "Alternative Solutions", "Quality Assurance"]
    },
    {
      title: "Quantity Takeoff",
      description: "Accurate quantity extraction and material takeoffs from BIM models for cost estimation",
      image: "/assets/QUANTITY TAKEOFF.png",
      features: ["Material Quantification", "Cost Estimation", "Quantity Analysis"]
    }
  ]

  const bimConsulting = [
    {
      title: "BIM Strategy Plan",
      description: "Comprehensive BIM strategy development and roadmap planning for successful project execution",
      image: "/assets/BIMStra.png",
      features: ["Strategic Planning", "Roadmap Development", "Goal Alignment"]
    },
    {
      title: "BIM Implementation",
      description: "End-to-end BIM implementation support with proven methodologies and best practices",
      image: "/assets/BIM Implementation.png",
      features: ["Process Setup", "Team Training", "Technology Integration"]
    },
    {
      title: "BIM Execution Plan",
      description: "Detailed BIM execution planning with clear milestones and deliverables for project success",
      image: "/assets/BIM Execution Plan.png",
      features: ["Project Planning", "Milestone Definition", "Quality Control"]
    },
    {
      title: "BIM Audit",
      description: "Comprehensive BIM audit and assessment to optimize processes and ensure compliance",
      image: "/assets/BIM Audit.png",
      features: ["Process Review", "Compliance Check", "Performance Analysis"]
    }
  ]

  const otherServices = [
    {
      title: "CAD Drafting",
      description: "Professional CAD drafting services with precision and adherence to industry standards",
      image: "/assets/CAD Drafting.png",
      features: ["2D Drawings", "3D Modeling", "Detailing Services"]
    },
    {
      title: "Architecture & Structure Designing",
      description: "Integrated architectural and structural design solutions for comprehensive building projects",
      image: "/assets/Arch_struct. Design.1.png",
      features: ["Architectural Design", "Structural Analysis", "Integrated Solutions"]
    },
    {
      title: "BOQ Preparation & QTO",
      description: "Detailed Bill of Quantities preparation and Quantity Takeoff services for accurate cost estimation",
      image: "/assets/BOQ PREP AND QTO.png",
      features: ["Bill of Quantities", "Quantity Takeoff", "Cost Analysis"]
    },
    {
      title: "Audits",
      description: "Comprehensive project audits to ensure compliance, quality, and process optimization",
      image: "/assets/Audits.png",
      features: ["Quality Audits", "Compliance Review", "Process Optimization"]
    },
    {
      title: "Planning & Project Support",
      description: "Strategic project planning and comprehensive support services for successful project delivery",
      image: "/assets/PLANNING AND PROJECT SUPPORT.png",
      features: ["Project Planning", "Coordination Support", "Delivery Management"]
    }
  ]

  // Reusable Section Component to keep the code DRY
  const ServiceSection = ({ title, items }) => (
    <div className="mb-24">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
          {title}
        </h2>
        <div className="h-[2px] flex-grow bg-zinc-800"></div>
        <div className="h-2 w-2 rounded-full bg-[#6EDD4D]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((service, index) => (
          <div 
            key={index} 
            onClick={() => handleServiceClick(service.title)}
            className="group relative flex flex-col rounded-[2.5rem] border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-[#6EDD4D]/50 hover:shadow-[0_0_40px_rgba(110,221,77,0.1)] cursor-pointer"
          >
            {/* Visual Header (Image/Video) */}
            <div className="aspect-video w-full overflow-hidden bg-zinc-950">
              {service.video ? (
                <video
                  autoPlay loop muted playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                >
                  <source src={service.video} type="video/mp4" />
                </video>
              ) : (
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-[#6EDD4D]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content Area */}
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#6EDD4D] transition-colors">
                {service.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="mt-auto space-y-3">
                {service.features.map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-zinc-300">
                    <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#6EDD4D]/10 text-[10px] text-[#6EDD4D]">
                      ✔
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-[#6EDD4D]/30">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6EDD4D]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#6EDD4D]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        {/* Page Hero Header */}
        <header className="py-24 px-6 text-center border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md mb-16">
          <div className="container mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#6EDD4D]/10 border border-[#6EDD4D]/20 text-[#6EDD4D] text-xs font-bold uppercase tracking-widest mb-6">
              Our Expertise
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              World-Class <span className="text-[#6EDD4D]">BIM Solutions</span>
            </h1>
            <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed">
              From high-precision 3D modeling to strategic consulting, we deliver integrated intelligence for complex construction projects worldwide.
            </p>
          </div>
        </header>

        {/* Content Container */}
        <div className="container mx-auto px-6 pb-24">
          <ServiceSection title="BIM Services" items={bimServices} />
          <ServiceSection title="BIM Consulting" items={bimConsulting} />
          <ServiceSection title="Other Services" items={otherServices} />
        </div>
      </div>
    </main>
  )
}