'use client'

import { Suspense, useEffect, useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

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

const FeatureItem = ({ text }) => (
    <li className="flex items-start gap-4 group cursor-default p-3 rounded-xl hover:bg-zinc-900/50 transition-colors">
        <div className="text-[#6EDD4D] mt-0.5 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
            <CheckCircle size={20} strokeWidth={2.5} />
        </div>
        <span className="text-zinc-300 text-lg leading-relaxed group-hover:text-white transition-colors">{text}</span>
    </li>
)

const ServicesPageContent = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [activeService, setActiveService] = useState('')
    const sectionRefs = useRef({})

    const servicesData = [
        {
            id: '2d',
            title: '2D Services',
            description: 'Our team delivers clear, technically accurate drawings that help project stakeholders communicate design intent and execute construction efficiently.',
            detailedDescription: 'We provide precise, standards-compliant 2D drawings extracted from coordinated BIM models or developed independently. Our solutions ensure that every detail of your construction project is documented with accuracy, facilitating seamless execution on-site and clear communication among all stakeholders.',
            features: [
                'GFC (Good for Construction) Drawings',
                'Working Drawings',
                'Shop Drawings (Arch, Structure, MEPF)',
                'As-Built Drawings',
                'Tender Drawings',
                'Detail Drawings & Sections',
                'Layout & Interior Drafting Support'
            ],
            benefits: [
                'Clear, buildable documentation that ensures smooth on-site execution.',
                'Compliance with international drafting standards and local regulations.',
                'High-precision scaling and layering for coordinated multi-disciplinary reviews.'
            ],
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80' // Using an Unsplash placeholder for architecture
        },
        {
            id: '3d',
            title: '3D Services',
            description: 'Advanced 3D modeling and visualization for enhanced project understanding.',
            detailedDescription: 'We create coordinated, execution-ready BIM models across disciplines with precision and scalability. Our 3D modeling services provide a comprehensive digital representation of your project, allowing for better visualization, clash detection, and coordination before any physical work begins.',
            features: [
                '3D Architectural Modeling',
                'Photorealistic Rendering',
                'Virtual Tours',
                '3D Animation',
                'Material Visualization',
                'Lighting Analysis'
            ],
            benefits: [
                'Accurate, clash-free, data-rich models ready for construction and lifecycle management.',
                'Enhanced stakeholder engagement through high-quality visual walkthroughs.',
                'Improved decision-making by visualizing spatial relationships and material choices early.'
            ],
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'
        },
        {
            id: '4d',
            title: '4D Services',
            description: 'Time-based 4D simulation integrating 3D models with project schedules.',
            detailedDescription: 'Our 4D services add the dimension of time to your 3D models, enabling powerful construction sequencing and project timeline visualization. This proactive approach helps in identifying scheduling conflicts and optimizing resource allocation throughout the project lifecycle.',
            features: [
                'Construction Sequencing',
                'Timeline Visualization',
                'Progress Tracking',
                'Schedule Optimization',
                'Conflict Detection',
                'Resource Planning'
            ],
            benefits: [
                'Improved timeline control, proactive issue resolution, and reduced execution risk.',
                'Clear communication of the construction sequence to field teams and clients.',
                'Better logistics and safety planning by visualizing workspace availability over time.'
            ],
            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80'
        },
        {
            id: 'pp-c',
            title: 'Project Planning & Controls',
            description: 'Project Planning, Programming & Control for comprehensive project management.',
            detailedDescription: 'We support structured planning to enhance coordination and execution clarity. Our PP&C services ensure that every phase of your project is meticulously planned and monitored, providing the transparency and control needed to meet deadlines and budget constraints.',
            features: [
                'Project Planning',
                'Programming & Scheduling',
                'Cost Management',
                'Quality Control',
                'Risk Management',
                'Progress Reporting'
            ],
            benefits: [
                'Better time management, improved coordination, and controlled project progression.',
                'Real-time visibility into project health and early warning of potential delays.',
                'Strategic resource management to maximize efficiency and minimize waste.'
            ],
            valueAdd: [
                'Enhanced project visibility through real-time tracking',
                'Reduced delays via predictive scheduling',
                'Cost savings through optimized resource allocation',
                'Improved stakeholder communication and reporting'
            ],
            image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
        },
        {
            id: 'boq',
            title: 'BOQ Services',
            description: 'Detailed Bill of Quantities preparation for accurate cost estimation.',
            detailedDescription: 'We deliver accurate cost and quantity support to enhance financial transparency and procurement alignment. Our BOQ services provide a detailed and precise breakdown of materials, labor, and equipment needed, ensuring accurate bidding and effective cost control.',
            features: [
                'Quantity Take-Off',
                'BOQ Preparation',
                'Item-Wise Cost Analysis',
                'Tender BOQ Support',
                'Procurement Quantity Tracking',
                'Variation & Change Order Analysis',
                'Subcontractor Billing Verification',
            ],
            benefits: [
                'Improved cost accuracy, reduced financial ambiguity, and controlled budget execution.',
                'Transparent procurement process with detailed quantity justifications.',
                'Streamlined payment certification and variation management.'
            ],
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80'
        },
        {
            id: 'audit',
            title: 'Audit Services',
            description: 'Comprehensive project audit and quality assurance services.',
            detailedDescription: 'We ensure compliance, transparency, and technical accuracy across project stages. Our audit services provide an independent review of design documentation, quantities, and on-site changes to safeguard project quality and financial integrity.',
            features: [
                'Audit & Validation',
                'Design Audit and Peer Review',
                'BOQ vs Model Cross-Verification',
                'Subcontractor Payment Verification',
                'As-Built Validation',
                'Documentation Compliance Review'
            ],
            benefits: [
                'Risk reduction, improved accountability, and higher stakeholder confidence.',
                'Verification of construction quality against design specifications.',
                'Fair and accurate settlement of accounts through rigorous verification.'
            ],
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
        }
    ]

    // Handle URL params and initial scroll
    useEffect(() => {
        const serviceId = searchParams.get('service')
        if (serviceId) {
            setTimeout(() => {
                const element = document.getElementById(`service-${serviceId}`)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
            }, 100)
        }
    }, [searchParams])

    // Scroll Spy logic to update active sidebar item on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveService(entry.target.id.replace('service-', ''))
                    }
                })
            },
            { rootMargin: '-20% 0px -60% 0px' } // Adjust this to trigger when element is near top
        )

        const sections = Object.values(sectionRefs.current)
        sections.forEach((section) => {
            if (section) observer.observe(section)
        })

        return () => sections.forEach((section) => {
            if (section) observer.unobserve(section)
        })
    }, [])

    const handleServiceClick = (serviceId) => {
        setActiveService(serviceId)
        router.push(`/services?service=${serviceId}`, { scroll: false })

        const element = document.getElementById(`service-${serviceId}`)
        if (element) {
            // Add an offset to account for fixed headers if you have them
            const yOffset = -40;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' })
        }
    }

    return (
        <main className="min-h-screen  text-zinc-100 font-sans selection:bg-[#6EDD4D]/30 relative pb-32">

        
            <div className="relative z-10 container mx-auto px-6 pt-24 md:pt-12 max-w-7xl">

                {/* Page Header */}
                <AnimatedSection animationClass="opacity-0 translate-y-10" delay={0}>
                    <div className="mb-16 md:mb-24">
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">Our Services</h1>
                        <div className="w-24 h-2 bg-[#6EDD4D] rounded-full"></div>
                    </div>
                </AnimatedSection>

                <div className="flex flex-col lg:flex-row gap-2 xl:gap-20">

                    {/* ====== SIDEBAR ====== */}
                    <aside className="lg:w-1/4 xl:w-1/5 shrink-0">
                        {/* The sticky container */}
                        <div className="sticky top-32 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 shadow-2xl hidden lg:block">
                            <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6 px-4">Jump To</h3>
                            <nav className="flex flex-col gap-2">
                                {servicesData.map((service) => {
                                    const isActive = activeService === service.id
                                    return (
                                        <button
                                            key={service.id}
                                            onClick={() => handleServiceClick(service.id)}
                                            className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${isActive
                                                    ? 'bg-[#6EDD4D]/10 text-[#6EDD4D] border border-[#6EDD4D]/20 shadow-[0_0_15px_rgba(110,221,77,0.1)]'
                                                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white border border-transparent'
                                                }`}
                                        >
                                            {service.title}
                                        </button>
                                    )
                                })}
                            </nav>
                        </div>

                        {/* Mobile Scrollable Nav */}
                        <div className="lg:hidden overflow-x-auto pb-4 -mx-6 px-6 flex gap-3 sticky top-20 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
                            {servicesData.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => handleServiceClick(service.id)}
                                    className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeService === service.id
                                            ? 'bg-[#6EDD4D] text-zinc-950'
                                            : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                                        }`}
                                >
                                    {service.title}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* ====== MAIN CONTENT ====== */}
                    <div className="lg:w-3/4 xl:w-4/5 space-y-32">
                        {servicesData.map((service, index) => (
                            <section
                                key={service.id}
                                id={`service-${service.id}`}
                                ref={el => sectionRefs.current[service.id] = el} // Attach ref for scroll spy
                                className="scroll-mt-32" // Adds padding to top when anchored so it doesn't hide under fixed headers
                            >
                                <AnimatedSection animationClass="opacity-0 translate-y-16" delay={100}>

                                    <div className="mb-10">
                                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">{service.title}</h2>
                                        <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">{service.description}</p>
                                    </div>

                                    <div className="w-full h-[300px] md:h-[450px] rounded-[2.5rem] border border-zinc-800 overflow-hidden mb-12 shadow-2xl relative group">
                                        <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                        />
                                    </div>

                                    <div className="prose prose-invert max-w-none mb-12">
                                        <p className="text-lg text-zinc-300 leading-relaxed">
                                            {service.detailedDescription}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        {/* Features List */}
                                        <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8">
                                            <h3 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-4 flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm">✨</span>
                                                Features
                                            </h3>
                                            <ul className="space-y-2">
                                                {service.features.map((feature, idx) => (
                                                    <FeatureItem key={idx} text={feature} />
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Benefits List */}
                                        <div className="bg-[#6EDD4D]/5 border border-[#6EDD4D]/20 rounded-3xl p-8">
                                            <h3 className="text-2xl font-bold text-white mb-6 border-b border-[#6EDD4D]/20 pb-4 flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-full bg-[#6EDD4D]/20 text-[#6EDD4D] flex items-center justify-center text-sm">📈</span>
                                                Outputs & Benefits
                                            </h3>
                                            <ul className="space-y-2">
                                                {service.benefits.map((benefit, idx) => (
                                                    <FeatureItem key={idx} text={benefit} />
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Value Add (Only for PP&C) */}
                                        {service.valueAdd && (
                                            <div className="md:col-span-2 bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8">
                                                <h3 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Value Add</h3>
                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {service.valueAdd.map((item, idx) => (
                                                        <FeatureItem key={idx} text={item} />
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Visual separator between sections */}
                                    {index !== servicesData.length - 1 && (
                                        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mt-32"></div>
                                    )}

                                </AnimatedSection>
                            </section>
                        ))}
                    </div>

                </div>

                {/* Global CTA Section */}
                <AnimatedSection animationClass="opacity-0 scale-95" delay={200} className="mt-32">
                    <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-[2.5rem] p-12 text-center shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#6EDD4D] to-transparent opacity-50"></div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Ready to Get Started?</h2>
                        <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">Contact us today to discuss how our specialized services can streamline and benefit your next project.</p>
                        <button
                            onClick={() => router.push('/contact')}
                            className="bg-[#6EDD4D] text-zinc-950 font-black px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-[#5bc43f] shadow-[0_0_20px_rgba(110,221,77,0.3)] flex items-center gap-3 mx-auto"
                        >
                            Get In Touch <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </AnimatedSection>

            </div>
        </main>
    )
}

export default function ServicesPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                    <div className="text-[#6EDD4D] font-bold text-xl animate-pulse">Loading Services...</div>
                </div>
            }
        >
            <ServicesPageContent />
        </Suspense>
    )
}