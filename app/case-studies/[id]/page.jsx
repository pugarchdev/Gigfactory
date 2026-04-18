/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, use, useRef } from 'react'

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

const caseStudiesData = {
  1: {
    id: 1,
    title: "Commercial Complex Development",
    category: "Commercial",
    description: "Complete development of 50,000 sq.ft. commercial complex with advanced BIM integration",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    features: ["BIM Modeling", "Cost Optimization", "Timeline Management"],
    overview: "A landmark commercial complex spanning 50,000 square feet, featuring modern architectural design with integrated BIM technology for seamless construction management.",
    challenges: [
      "Complex structural design requirements",
      "Tight urban construction timeline",
      "Integration of multiple commercial units",
      "Advanced MEP systems coordination"
    ],
    solutions: [
      "Implemented LOD 400 BIM modeling for clash detection",
      "Utilized 4D scheduling for timeline optimization",
      "Developed modular construction approach",
      "Integrated smart building management systems"
    ],
    results: [
      "Completed 15% ahead of schedule",
      "Achieved 98% client satisfaction",
      "Reduced construction costs by 12%",
      "Zero safety incidents throughout project"
    ],
    technologies: ["BIM 360", "Revit", "Navisworks", "AutoCAD", "Primavera P6"],
    duration: "18 months",
    teamSize: "45 professionals",
    projectValue: "$12.5M"
  },
  2: {
    id: 2,
    title: "Residential Tower Project",
    category: "Residential",
    description: "30-story residential tower with sustainable construction practices",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    features: ["Sustainable Design", "Quality Control", "Safety Compliance"],
    overview: "A 30-story residential tower featuring 120 luxury apartments with sustainable construction practices and green building certifications.",
    challenges: [
      "Limited construction site access",
      "Strict environmental regulations",
      "High-rise safety requirements",
      "Complex facade installation"
    ],
    solutions: [
      "Implemented pre-fabricated panel systems",
      "Adopted green construction materials",
      "Advanced safety monitoring systems",
      "Modular bathroom and kitchen units"
    ],
    results: [
      "LEED Platinum certification achieved",
      "Energy efficiency improved by 35%",
      "Construction waste reduced by 40%",
      "Zero major safety incidents"
    ],
    technologies: ["LEED Modeling", "ETABS", "SketchUp", "Green Building Studio"],
    duration: "24 months",
    teamSize: "60 professionals",
    projectValue: "$25M"
  },
  3: {
    id: 3,
    title: "Industrial Facility",
    category: "Industrial",
    description: "Large-scale industrial facility with complex MEP systems",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
    features: ["MEP Integration", "Project Coordination", "Risk Management"],
    overview: "A state-of-the-art industrial manufacturing facility spanning 100,000 square feet with specialized production lines and complex utility systems.",
    challenges: [
      "Specialized equipment installation",
      "Clean room requirements",
      "Complex utility infrastructure",
      "Operational continuity during construction"
    ],
    solutions: [
      "Phased construction approach",
      "Advanced MEP coordination models",
      "Specialized equipment integration planning",
      "Real-time project monitoring systems"
    ],
    results: [
      "Operational efficiency increased by 25%",
      "Utility costs reduced by 18%",
      "Zero production downtime during transition",
      "Certified for international standards"
    ],
    technologies: ["SolidWorks", "CADmep", "Procore", "BIM 360", "MS Project"],
    duration: "30 months",
    teamSize: "80 professionals",
    projectValue: "$45M"
  },
  4: {
    id: 4,
    title: "Healthcare Infrastructure",
    category: "Healthcare",
    description: "State-of-the-art healthcare facility with specialized requirements",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    features: ["Specialized Systems", "Regulatory Compliance", "Quality Assurance"],
    overview: "A 200-bed modern hospital facility with advanced medical infrastructure, specialized treatment areas, and emergency response capabilities.",
    challenges: [
      "Strict healthcare regulations",
      "Specialized medical gas systems",
      "Radiation shielding requirements",
      "Infection control protocols"
    ],
    solutions: [
      "Healthcare-specific BIM modeling",
      "Advanced medical equipment planning",
      "Strict contamination control measures",
      "Integrated hospital management systems"
    ],
    results: [
      "Joint Commission International accreditation",
      "Patient satisfaction score of 95%",
      "Emergency response time under 3 minutes",
      "Zero construction-related infections"
    ],
    technologies: ["Healthcare BIM", "Medical Equipment Planning", "Infection Control Modeling"],
    duration: "36 months",
    teamSize: "95 professionals",
    projectValue: "$85M"
  },
  5: {
    id: 5,
    title: "Educational Campus",
    category: "Educational",
    description: "Multi-building educational campus with integrated infrastructure",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop",
    features: ["Campus Planning", "Infrastructure Integration", "Sustainable Solutions"],
    overview: "A comprehensive educational campus spanning 25 acres with multiple academic buildings, sports facilities, and student housing.",
    challenges: [
      "Multiple building coordination",
      "Campus-wide infrastructure integration",
      "Sustainable campus design",
      "Phased occupancy requirements"
    ],
    solutions: [
      "Master campus BIM coordination",
      "Integrated infrastructure planning",
      "Green campus initiatives",
      "Phased construction and occupancy"
    ],
    results: [
      "Campus capacity increased by 40%",
      "Energy efficiency improved by 30%",
      "Student satisfaction score of 92%",
      "Completed within budget constraints"
    ],
    technologies: ["Campus BIM", "ArcGIS", "EnergyPlus", "Revit Campus"],
    duration: "48 months",
    teamSize: "120 professionals",
    projectValue: "$120M"
  },
  6: {
    id: 6,
    title: "Transportation Hub",
    category: "Infrastructure",
    description: "Major transportation hub with complex civil engineering requirements",
    image: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&w=1600&q=80",
    features: ["Civil Engineering", "Structural Design", "Project Management"],
    overview: "A major transportation hub integrating railway, metro, and bus services with passenger facilities and commercial spaces.",
    challenges: [
      "Complex civil engineering requirements",
      "Integration of multiple transport modes",
      "High passenger traffic management",
      "Minimal service disruption"
    ],
    solutions: [
      "Advanced structural analysis",
      "Integrated transport system design",
      "Phased construction methodology",
      "Real-time traffic management systems"
    ],
    results: [
      "Daily passenger capacity of 150,000",
      "Reduced average commute time by 25%",
      "Integrated ticketing system implemented",
      "Zero major service disruptions"
    ],
    technologies: ["Civil 3D", "Structural Analysis", "Transport Simulation", "ProjectWise"],
    duration: "42 months",
    teamSize: "150 professionals",
    projectValue: "$200M"
  }
}

export default function CaseStudyDetails({ params }) {
  const router = useRouter()
  const [caseStudy, setCaseStudy] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Unwrap params using React.use()
  const resolvedParams = use(params)

  useEffect(() => {
    const studyId = parseInt(resolvedParams.id)
    const study = caseStudiesData[studyId]
    
    if (study) {
      setCaseStudy(study)
    }
    setLoading(false)
  }, [resolvedParams.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-[#6EDD4D] font-bold text-xl animate-pulse">Loading case study...</div>
      </div>
    )
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-4xl font-black text-white mb-4">Case Study Not Found</h2>
        <p className="text-zinc-400 mb-8">The requested project details could not be found or have been moved.</p>
        <button 
          onClick={() => router.push('/case-studies')} 
          className="bg-zinc-900 border border-zinc-800 text-white hover:border-[#6EDD4D] hover:text-[#6EDD4D] px-8 py-3 rounded-full transition-all"
        >
          ← Back to Case Studies
        </button>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-[#6EDD4D]/30 pb-24">
      
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#6EDD4D]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-12 md:pt-20 max-w-6xl">
        
        {/* Back Button */}
        <AnimatedSection animationClass="opacity-0 -translate-x-10" delay={0}>
            <button 
                onClick={() => router.push('/case-studies')} 
                className="group flex items-center gap-3 text-zinc-400 hover:text-[#6EDD4D] font-bold text-sm uppercase tracking-widest transition-colors mb-12"
            >
                <i className="fa-solid fa-arrow-left transform group-hover:-translate-x-1 transition-transform"></i>
                Back to Projects
            </button>
        </AnimatedSection>

        {/* Header */}
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={100}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-10 tracking-tight leading-tight">
                {caseStudy.title}
            </h1>
        </AnimatedSection>

        {/* Hero Image */}
        <AnimatedSection animationClass="opacity-0 scale-95" delay={200}>
            <div className="w-full h-[40vh] md:h-[60vh] rounded-[2rem] border border-zinc-800 overflow-hidden mb-12 shadow-2xl">
                <img 
                    src={caseStudy.image} 
                    alt={caseStudy.title} 
                    className="w-full h-full object-cover"
                />
            </div>
        </AnimatedSection>

        {/* Meta Stats Grid */}
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={300}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
                <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 flex flex-col justify-center">
                    <span className="text-xs text-zinc-500 uppercase tracking-widest mb-2 font-bold">Category</span>
                    <span className="text-xl md:text-2xl font-black text-[#6EDD4D]">{caseStudy.category}</span>
                </div>
                <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 flex flex-col justify-center">
                    <span className="text-xs text-zinc-500 uppercase tracking-widest mb-2 font-bold">Duration</span>
                    <span className="text-xl md:text-2xl font-black text-white">{caseStudy.duration}</span>
                </div>
                <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 flex flex-col justify-center">
                    <span className="text-xs text-zinc-500 uppercase tracking-widest mb-2 font-bold">Team Size</span>
                    <span className="text-xl md:text-2xl font-black text-white">{caseStudy.teamSize}</span>
                </div>
                <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 flex flex-col justify-center">
                    <span className="text-xs text-zinc-500 uppercase tracking-widest mb-2 font-bold">Project Value</span>
                    <span className="text-xl md:text-2xl font-black text-white">{caseStudy.projectValue}</span>
                </div>
            </div>
        </AnimatedSection>

        {/* Overview & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            {/* Overview */}
            <div className="lg:col-span-2">
                <AnimatedSection animationClass="opacity-0 translate-y-10" delay={100}>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Project Overview</h2>
                    <p className="text-zinc-400 text-lg leading-relaxed">{caseStudy.overview}</p>
                </AnimatedSection>
            </div>

            {/* Key Features */}
            <div>
                <AnimatedSection animationClass="opacity-0 translate-x-10" delay={200}>
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Key Features</h2>
                    <ul className="space-y-4">
                        {caseStudy.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3 bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50">
                                <span className="text-[#6EDD4D] font-bold mt-0.5">✓</span>
                                <span className="text-zinc-300 font-medium">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </AnimatedSection>
            </div>
        </div>

        {/* Challenges & Solutions */}
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={100}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
                {/* Challenges */}
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm">🚧</span>
                        The Challenges
                    </h2>
                    <ul className="space-y-4">
                        {caseStudy.challenges.map((challenge, index) => (
                            <li key={index} className="flex items-start gap-4 text-zinc-400">
                                <span className="text-zinc-600 mt-1.5 text-xs">●</span>
                                <span className="leading-relaxed">{challenge}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Solutions */}
                <div className="bg-[#6EDD4D]/5 border border-[#6EDD4D]/20 rounded-3xl p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#6EDD4D]/20 text-[#6EDD4D] flex items-center justify-center text-sm">💡</span>
                        Our Solutions
                    </h2>
                    <ul className="space-y-4">
                        {caseStudy.solutions.map((solution, index) => (
                            <li key={index} className="flex items-start gap-4 text-zinc-300">
                                <span className="text-[#6EDD4D] mt-1 font-bold">✓</span>
                                <span className="leading-relaxed">{solution}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AnimatedSection>

        {/* Results */}
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={100}>
            <div className="mb-20">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center border-b border-zinc-800 pb-6">Project Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {caseStudy.results.map((result, index) => (
                        <div key={index} className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 text-center hover:border-[#6EDD4D]/50 transition-colors group">
                            <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(110,221,77,0.3)]">🏆</div>
                            <p className="text-zinc-300 font-medium leading-relaxed">{result}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>

        {/* Technologies Used */}
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={100}>
            <div className="mb-24 text-center">
                <h2 className="text-xl text-zinc-500 uppercase tracking-widest font-bold mb-8">Technologies Used</h2>
                <div className="flex flex-wrap justify-center gap-3">
                    {caseStudy.technologies.map((tech, index) => (
                        <span 
                            key={index} 
                            className="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-bold text-zinc-300 hover:text-[#6EDD4D] hover:border-[#6EDD4D]/50 transition-all cursor-default"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection animationClass="opacity-0 scale-95" delay={200}>
            <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-[2.5rem] p-12 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#6EDD4D] to-transparent opacity-50"></div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Start Your Next Project?</h3>
                <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">Let us bring the same expertise, precision, and success to your construction project.</p>
                <button 
                    onClick={() => router.push('/contact')} 
                    className="bg-[#6EDD4D] text-zinc-950 font-black px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-[#5bc43f] shadow-[0_0_20px_rgba(110,221,77,0.3)] flex items-center gap-3 mx-auto"
                >
                    Get in Touch <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </AnimatedSection>

      </div>
    </main>
  )
}