'use client'

import { Suspense, useEffect, useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, Sparkles, BarChart3 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// --- ANIMATION VARIANTS ---
const popUpVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 200, damping: 20 }
    }
}

const slideInLeft = {
    hidden: { opacity: 0, x: -70 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const slideInRight = {
    hidden: { opacity: 0, x: 70 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

// --- UPDATED LIST ITEM: Clean Hover Effect ---
const FeatureItem = ({ text }) => (
    <motion.li
        whileHover={{ x: 5 }} // Subtle slide to the right on hover
        className="flex items-start gap-4 group py-2 cursor-default transition-all duration-300"
    >
        {/* The Icon: Rotates when the LI is hovered */}
        <div className="text-[#6EDD4D] mt-1 transform group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out shrink-0">
            <CheckCircle size={18} strokeWidth={2.5} />
        </div>

        {/* The Text: Turns white when the LI is hovered */}
        <span className="text-zinc-400 text-lg font-medium leading-tight group-hover:text-white transition-colors duration-300">
            {text}
        </span>
    </motion.li>
)

const ServicesPageContent = () => {
    const router = useRouter()
    const [activeService, setActiveService] = useState('')
    const sectionRefs = useRef({})

    const servicesData = [
        {
            id: '2d',
            title: '2D Services',
            description: 'Precise, technically accurate drawings for seamless construction execution.',
            features: ['GFC Drawings', 'Working Drawings', 'Shop Drawings (MEPF)', 'As-Built Drawings', 'Tender Drawings', 'Detail Sections'],
            benefits: ['Smooth Site Execution', 'International Compliance', 'Multi-disciplinary Coordination'],
            image: 'https://res.cloudinary.com/deinrj3zm/image/upload/v1776588658/2D.Desktop_kxaknt.png'
        },
        {
            id: '3d',
            title: '3D Services',
            description: 'Advanced modeling and visualization for enhanced project understanding.',
            features: ['3D Architectural Modeling', 'Photorealistic Rendering', 'Virtual Tours', '3D Animation', 'Material Visualization'],
            benefits: ['Clash-Free Models', 'Stakeholder Engagement', 'Spatial Relationship Clarity'],
            image: 'https://res.cloudinary.com/deinrj3zm/image/upload/v1776588660/3D.Desktop_f37aeh.png'
        },
        {
            id: '4d',
            title: '4D Services',
            description: 'Time-based simulation integrating models with project schedules.',
            features: ['Construction Sequencing', 'Timeline Visualization', 'Progress Tracking', 'Schedule Optimization', 'Logistics Planning'],
            benefits: ['Proactive Issue Resolution', 'Reduced Execution Risk', 'Improved Workspace Safety'],
            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80'
        },
        {
            id: 'pp-c',
            title: 'Planning & Controls',
            description: 'Comprehensive management for coordination and execution clarity.',
            features: ['Project Programming', 'Cost Management', 'Quality Control', 'Risk Management', 'Progress Reporting'],
            benefits: ['Real-time Visibility', 'Strategic Resource Use', 'Predictive Scheduling'],
            image: 'https://res.cloudinary.com/deinrj3zm/image/upload/v1776588661/PP_C.Desktop_aothw4.png'
        },
        {
            id: 'boq',
            title: 'BOQ Services',
            description: 'Detailed Bill of Quantities for accurate financial transparency.',
            features: ['Quantity Take-Off', 'BOQ Preparation', 'Cost Analysis', 'Procurement Tracking', 'Variation Analysis'],
            benefits: ['Budget Precision', 'Transparent Procurement', 'Streamlined Billing'],
            image: 'https://res.cloudinary.com/deinrj3zm/image/upload/v1776588665/BOQ.Desktop_ytxtzi.png'
        },
        {
            id: 'audit',
            title: 'Audit Services',
            description: 'Comprehensive quality assurance and technical verification.',
            features: ['Design Peer Review', 'Model Cross-Verification', 'Payment Verification', 'As-Built Validation', 'Compliance Review'],
            benefits: ['Risk Reduction', 'High Stakeholder Confidence', 'Accurate Account Settlement'],
            image: 'https://res.cloudinary.com/deinrj3zm/image/upload/v1776588667/Audit.Desktop_qavsh1.png'
        }
    ]

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveService(entry.target.id.replace('service-', ''))
                    }
                })
            },
            { rootMargin: '-20% 0px -60% 0px' }
        )

        Object.values(sectionRefs.current).forEach((section) => {
            if (section) observer.observe(section)
        })

        return () => observer.disconnect()
    }, [])

    const handleServiceClick = (serviceId) => {
        setActiveService(serviceId)
        const element = document.getElementById(`service-${serviceId}`)
        if (element) {
            const yOffset = -100
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
            window.scrollTo({ top: y, behavior: 'smooth' })
        }
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-[#6EDD4D]/30 pb-32">
            <div className="relative z-10 container mx-auto px-6 pt-24 max-w-7xl">

                {/* PAGE HEADER */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={popUpVariants}
                    className="mb-16 md:mb-24"
                >
                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6">Our Services</h1>
                    <div className="w-32 h-2.5 bg-[#6EDD4D] rounded-full"></div>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-4 xl:gap-20">

                    {/* STICKY SIDEBAR */}
                    <aside className="lg:w-1/4 xl:w-1/5 shrink-0">
                        <div className="sticky top-32 bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-[2rem] p-6 hidden lg:block shadow-2xl">
                            <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6 px-4">Navigation</h3>
                            <nav className="flex flex-col gap-1.5">
                                {servicesData.map((service) => (
                                    <button
                                        key={service.id}
                                        onClick={() => handleServiceClick(service.id)}
                                        className={`text-left px-5 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeService === service.id
                                            ? 'bg-[#6EDD4D] text-zinc-950 shadow-[0_0_20px_rgba(110,221,77,0.2)]'
                                            : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                                            }`}
                                    >
                                        {service.title}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* MAIN CONTENT AREA */}
                    <div className="lg:w-3/4 xl:w-4/5 space-y-40">
                        {servicesData.map((service, index) => (
                            <section
                                key={service.id}
                                id={`service-${service.id}`}
                                ref={el => sectionRefs.current[service.id] = el}
                                className="scroll-mt-32"
                            >
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    variants={popUpVariants}
                                    className="mb-12"
                                >
                                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                                        {service.title}
                                    </h2>
                                    <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl font-medium">
                                        {service.description}
                                    </p>
                                </motion.div>

                                <div className="w-full h-[350px] md:h-[500px] rounded-[3rem] border border-zinc-800/50 overflow-hidden mb-16 shadow-2xl relative group">
                                    <img
                                        src={service.image}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        alt={service.title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent"></div>
                                </div>

                                {/* CARDS GRID */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                                    {/* Features Box */}
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={slideInLeft}
                                        className="bg-zinc-900/30 border border-zinc-800/50 rounded-[2.5rem] p-10 shadow-xl"
                                    >
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="p-3 bg-zinc-800/80 rounded-2xl text-[#6EDD4D]">
                                                <Sparkles size={24} />
                                            </div>
                                            <h3 className="text-2xl font-black text-white">Features</h3>
                                        </div>
                                        <ul className="flex flex-col gap-1">
                                            {service.features.map((f, i) => (
                                                <FeatureItem key={i} text={f} />
                                            ))}
                                        </ul>
                                    </motion.div>

                                    {/* Benefits Box */}
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={slideInRight}
                                        className="bg-[#6EDD4D]/[0.02] border border-[#6EDD4D]/10 rounded-[2.5rem] p-10 shadow-xl"
                                    >
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="p-3 bg-[#6EDD4D]/10 rounded-2xl text-[#6EDD4D]">
                                                <BarChart3 size={24} />
                                            </div>
                                            <h3 className="text-2xl font-black text-white">Value & Output</h3>
                                        </div>
                                        <ul className="flex flex-col gap-1">
                                            {service.benefits.map((b, i) => (
                                                <FeatureItem key={i} text={b} />
                                            ))}
                                        </ul>
                                    </motion.div>
                                </div>

                                {index !== servicesData.length - 1 && (
                                    <div className="mt-40 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                                )}
                            </section>
                        ))}
                    </div>
                </div>

                {/* BOTTOM CTA */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={popUpVariants}
                    className="mt-48 bg-zinc-900/40 border border-zinc-800 rounded-[3rem] p-16 text-center max-w-5xl mx-auto relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6EDD4D] to-transparent" />
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Have a project in mind?</h2>
                    <p className="text-zinc-400 text-xl mb-10 max-w-2xl mx-auto">Let's discuss how our specialized BIM and engineering services can bring your vision to life.</p>
                    <button
                        onClick={() => router.push('/contact')}
                        className="bg-[#6EDD4D] text-zinc-950 font-black px-12 py-5 rounded-2xl text-lg hover:scale-105 transition-all shadow-[0_20px_40px_rgba(110,221,77,0.2)]"
                    >
                        Contact Our Experts
                    </button>
                </motion.div>
            </div>
        </main>
    )
}

export default function ServicesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#6EDD4D]/20 border-t-[#6EDD4D] rounded-full animate-spin mb-4" />
                <p className="text-[#6EDD4D] font-bold tracking-widest animate-pulse">LOADING GIGFACTORY SERVICES</p>
            </div>
        }>
            <ServicesPageContent />
        </Suspense>
    )
}