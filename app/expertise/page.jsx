/* eslint-disable react-hooks/static-components */
'use client'

import { useRouter } from 'next/navigation'
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
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : animationClass
        } ${className}`}
    >
      {children}
    </div>
  )
}

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
      image: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589575/Architectural_Design_oxye26.png",
      features: ["Parametric Design", "3D Visualization", "Design Optimization"]
    },
    {
      title: "3D Modeling",
      description: "High-precision 3D modeling services for complex architectural and engineering projects",
      image: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589574/3D_Modelling_k6eckv.png",
      features: ["LOD Development", "Family Creation", "Model Coordination"]
    },
    {
      title: "4D/5D Construction Simulation",
      description: "Time and cost simulation for construction planning and project management optimization",
      video: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589573/4D_5D_MODELIING_vxjwlu.png",
      features: ["Construction Sequencing", "Cost Analysis", "Resource Planning"]
    },
    {
      title: "Scan to BIM",
      description: "Convert point cloud data and laser scans into accurate BIM models for existing buildings",
      image: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589587/SCAN_TO_BIM_w2m35h.png",
      features: ["Point Cloud Processing", "As-Built Modeling", "Accuracy Verification"]
    },
    {
      title: "Construction Documentation",
      description: "Comprehensive construction documentation with detailed drawings and specifications",
      image: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589579/Construction_Documentation_k972go.png",
      features: ["Drawing Extraction", "Specification Writing", "Document Management"]
    },
    {
      title: "Constructability Review",
      description: "Thorough constructability analysis to identify potential issues and optimize building methods",
      image: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589587/Construction_REVIEW_y2vgik.png",
      features: ["Buildability Assessment", "Risk Identification", "Optimization Recommendations"]
    },
    {
      title: "Clash Coordination",
      description: "Advanced clash detection and coordination to resolve conflicts between building systems",
      image: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589576/CLASH_COORD_txk03i.png",
      features: ["Clash Detection", "Conflict Resolution", "System Coordination"]
    },
    {
      title: "Value Engineering",
      description: "Value engineering analysis to optimize costs while maintaining quality and functionality",
      image: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589590/VALUE_ENGINEERING_nbppku.png",
      features: ["Cost Optimization", "Alternative Solutions", "Quality Assurance"]
    },
    {
      title: "Quantity Takeoff",
      description: "Accurate quantity extraction and material takeoffs from BIM models for cost estimation",
      image: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589585/QUANTITY_TAKEOFF_ji1can.png",
      features: ["Material Quantification", "Cost Estimation", "Quantity Analysis"]
    }
  ]

  const bimConsulting = [
    {
      title: "BIM Strategy Plan",
      description: "Comprehensive BIM strategy development and roadmap planning for successful project execution",
      image: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589552/BIM_Strategy_plan_cic2l0.png",
      features: ["Strategic Planning", "Roadmap Development", "Goal Alignment"]
    },
    {
      title: "BIM Implementation",
      description: "End-to-end BIM implementation support with proven methodologies and best practices",
      image: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589555/BIM_Implementation_gzbo7v.png",
      features: ["Process Setup", "Team Training", "Technology Integration"]
    },
    {
      title: "BIM Execution Plan",
      description: "Detailed BIM execution planning with clear milestones and deliverables for project success",
      image: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589554/BIM_Execution_Plan_tjpwrk.png",
      features: ["Project Planning", "Milestone Definition", "Quality Control"]
    },
    {
      title: "BIM Audit",
      description: "Comprehensive BIM audit and assessment to optimize processes and ensure compliance",
      image: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776589557/BIM_Audit_y3ax7q.png",
      features: ["Process Review", "Compliance Check", "Performance Analysis"]
    }
  ]

  const otherServices = [
    {
      title: "CAD Drafting",
      description: "Professional CAD drafting services with precision and adherence to industry standards",
      image: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776590140/CAD_Drafting_mpcoc2.png",
      features: ["2D Drawings", "3D Modeling", "Detailing Services"]
    },
    {
      title: "Architecture & Structure Designing",
      description: "Integrated architectural and structural design solutions for comprehensive building projects",
      image: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776590134/Arch_struct._Design.1_epaxdr.png",
      features: ["Architectural Design", "Structural Analysis", "Integrated Solutions"]
    },
    {
      title: "BOQ Preparation & QTO",
      description: "Detailed Bill of Quantities preparation and Quantity Takeoff services for accurate cost estimation",
      image: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776590138/BOQ_PREP_AND_QTO_b0spom.png",
      features: ["Bill of Quantities", "Quantity Takeoff", "Cost Analysis"]
    },
    {
      title: "Audits",
      description: "Comprehensive project audits to ensure compliance, quality, and process optimization",
      image: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776590135/Audits_vynhat.png",
      features: ["Quality Audits", "Compliance Review", "Process Optimization"]
    },
    {
      title: "Planning & Project Support",
      description: "Strategic project planning and comprehensive support services for successful project delivery",
      image: "https://res.cloudinary.com/deinrj3zm/image/upload/v1776590142/PLANNING_AND_PROJECT_SUPPORT_tuvgtz.png",
      features: ["Project Planning", "Coordination Support", "Delivery Management"]
    }
  ]

  // --- UPDATED SERVICE SECTION WITH CENTERED POPUP HEADINGS ---
  const ServiceSection = ({ title, items }) => (
    <div className="mb-24">
      {/* Centered Heading with Pop Animation */}
      <div className="flex justify-center mb-16 px-6">
        <AnimatedSection
          animationClass="opacity-0 scale-50 translate-y-10"
          className="w-full flex items-center justify-center gap-4 md:gap-10"
        >
          {/* Left Decorative Gradient Line */}
          <div className="hidden sm:block h-[1px] flex-grow bg-gradient-to-r from-transparent to-zinc-800"></div>

          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter text-center">
              {title}
            </h2>
            {/* Visual Underline for Mobile Visibility */}
            <div className="mt-4 h-1 w-24 bg-[#6EDD4D] rounded-full shadow-[0_0_15px_rgba(110,221,77,0.4)]"></div>
          </div>

          {/* Right Decorative Gradient Line */}
          <div className="hidden sm:block h-[1px] flex-grow bg-gradient-to-l from-transparent to-zinc-800"></div>
        </AnimatedSection>
      </div>

      {/* --- MOBILE HORIZONTAL SCROLL WRAPPER --- */}
      <div className="relative">
        <div className="overflow-x-auto no-scrollbar pb-10 -mx-6 px-6">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-w-max md:min-w-full">
            {items.map((service, index) => (
              <AnimatedSection
                key={index}
                animationClass="opacity-0 translate-y-12"
                delay={index * 100}
                className="h-full w-[300px] md:w-auto flex-shrink-0 md:flex-shrink"
              >
                <div
                  onClick={() => handleServiceClick(service.title)}
                  className="h-full group relative flex flex-col rounded-[2.5rem] border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-[#6EDD4D]/50 hover:shadow-[0_0_40px_rgba(110,221,77,0.1)] cursor-pointer"
                >
                  <div className="aspect-video w-full overflow-hidden bg-zinc-950 relative">
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
                    <div className="absolute inset-0 bg-[#6EDD4D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#6EDD4D] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

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
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen text-zinc-100 font-sans selection:bg-[#6EDD4D]/30 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="relative z-10">
        <header className="py-24 md:py-12 px-6 text-center border-b border-zinc-900 backdrop-blur-md mb-16 mt-[-40px] md:mt-[-80px]">
          <div className="container mx-auto pt-20">
            <AnimatedSection animationClass="opacity-0 scale-50 translate-y-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#6EDD4D]/10 border border-[#6EDD4D]/20 text-[#6EDD4D] text-xs font-bold uppercase tracking-widest mb-6">
                Our Expertise
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                World-Class <span className="text-[#6EDD4D]">BIM Solutions</span>
              </h1>
              <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed">
                From high-precision 3D modeling to strategic consulting, we deliver integrated intelligence for complex construction projects worldwide.
              </p>
            </AnimatedSection>
          </div>
        </header>

        <div className="container mx-auto px-6 pb-24">
          <ServiceSection title="BIM Services" items={bimServices} />
          <ServiceSection title="BIM Consulting" items={bimConsulting} />
          <ServiceSection title="Other Services" items={otherServices} />
        </div>
      </div>
    </main>
  )
}