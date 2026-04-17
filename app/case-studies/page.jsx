'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, Home, Factory, HeartPulse, GraduationCap, Ship, Zap } from 'lucide-react'

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
    }
  ]

  const handleViewProject = (studyId) => {
    router.push(`/case-studies/${studyId}`)
  }

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <section className="bg-zinc-950 py-24 px-6 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6EDD4D]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#6EDD4D]/10 border border-[#6EDD4D]/20 text-[#6EDD4D] text-[10px] font-bold uppercase tracking-widest mb-6">
              Our Track Record
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter italic">
              CASE <span className="text-[#6EDD4D]">STUDIES</span>
            </h2>
            <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl leading-relaxed">
              Real construction projects delivered with quality, precision, and efficiency.
            </p>
          </motion.div>
        </div>

        {/* Case Studies Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {caseStudies.map((study) => (
            <motion.div 
              key={study.id} 
              variants={itemVariants}
              className="group flex flex-col rounded-[2.5rem] border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-[#6EDD4D]/40 hover:shadow-[0_0_40px_rgba(110,221,77,0.05)]"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
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
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2 italic">
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
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Navigation */}
        <div className="flex flex-col items-center gap-12 mt-12 border-t border-zinc-900 pt-16">
          <button 
            onClick={() => router.push('/case-studies')}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-300 font-bold hover:border-[#6EDD4D]/50 hover:text-[#6EDD4D] transition-all"
          >
            View More Case Studies 
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </button>

          {/* Final CTA */}
          <div className="text-center bg-zinc-900/40 p-10 rounded-[3rem] border border-zinc-800 w-full max-w-4xl backdrop-blur-md">
            <h3 className="text-2xl font-bold text-white mb-4 italic">Ready to move your project forward?</h3>
            <button 
              onClick={onContactClick} 
              className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-[#6EDD4D] px-10 py-4 font-black uppercase tracking-widest text-zinc-950 transition-all hover:bg-[#6EDD4D]/90 hover:shadow-[0_0_30px_rgba(110,221,77,0.4)]"
            >
              <span>Let&apos;s Connect</span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CaseStudies