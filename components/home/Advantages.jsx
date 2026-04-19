'use client'

import { useState, useRef, useEffect } from 'react'

export default function Advantages({ onContactClick }) {
    const [selectedAdvantageId, setSelectedAdvantageId] = useState(null)
    const modalContentRef = useRef(null)

    const advantagesData = [
        {
            id: 'construction-smart',
            key: 'Construction Smart',
            title: 'Construct Smart',
            subtitle: 'End-to-End Construction Intelligence',
            description: "We don't just deliver drawings — we deliver integrated project intelligence. From 3D BIM (LOD 100–500) to 4D planning, 6D asset management, and AI-powered automation, Gigfactory provides a unified ecosystem that connects:",
            points: [
                'Architecture',
                'Structure',
                'MEPF',
                'Planning',
                'BOQ & Quantity Take-Off',
                'Documentation',
                'Operations & Maintenance'
            ],
            footer: 'This ensures seamless coordination from concept to facility lifecycle.',
            images: [
                '/assets/A_architecture.png',
                '/assets/A_structure.png',
                '/assets/A_MEPF.png',
                '/assets/A_planning.png',
                '/assets/A_BOQ.png',
                '/assets/A_operations and maintenance.png'
            ]
        },
        {
            id: 'intelligence',
            key: 'Intelligence',
            title: 'Intelligence',
            subtitle: 'Data-Driven Insights',
            description: 'Our AI-powered intelligence system provides deep insights into construction processes, enabling data-driven decision making and predictive analytics for optimal project outcomes.',
            points: [
                'Real-time data analysis and reporting',
                'Predictive modeling for risk assessment',
                'Automated workflow optimization',
                'Machine learning for continuous improvement',
                'Advanced analytics dashboard'
            ],
            footer: 'Empowering your projects with intelligent foresight.',
        },
        {
            id: 'reduce-rework',
            key: 'Reduce Rework',
            title: 'Reduce Rework',
            subtitle: 'Proactive Error Prevention',
            description: 'Advanced quality control and error prevention systems that significantly reduce rework through proactive detection and correction of issues.',
            points: [
                'Automated clash detection',
                'Real-time quality monitoring',
                'Digital inspection workflows',
                'Error prediction algorithms',
                'Continuous quality assurance'
            ],
            footer: 'Minimizing errors, maximizing efficiency.',
        },
        {
            id: 'accelerate-delivery',
            key: 'Accelerate Delivery',
            title: 'Accelerate Delivery',
            subtitle: 'Streamlined Project Methodology',
            description: 'Streamlined project delivery methodologies that leverage technology and optimized workflows to significantly reduce construction timelines.',
            points: [
                'Parallel processing capabilities',
                'Automated scheduling optimization',
                'Resource leveling algorithms',
                'Progress tracking automation',
                'Integrated delivery management'
            ],
            footer: 'Fast-tracking your vision to completion.',
        },
        {
            id: 'optimize-cost',
            key: 'Optimize Cost',
            title: 'Optimize Cost',
            subtitle: 'Value Engineering & Efficiency',
            description: 'Comprehensive cost optimization strategies that leverage technology and data analytics to minimize expenses while maintaining quality.',
            points: [
                'Dynamic cost tracking and monitoring',
                'Automated budget alerts and controls',
                'Resource utilization optimization',
                'Supply chain cost analysis',
                'Value engineering recommendations'
            ],
            footer: 'Smart spending for superior results.',
        }
    ]

    const allTags = [
        "Improved accuracy", "Enhanced coordination", "Clarity in documentation",
        "Standardized outputs", "Reduced errors", "Faster reviews",
        { name: "Construction Smart", highlight: true },
        "Better quality control", "Streamlined workflows", "Clear communication",
        "Improved collaboration", "Error reduction", "Better decision making",
        "Enhanced understanding",
        { name: "Intelligence", highlight: true },
        "Sequence planning", "Clash-Free Execution", "Integrated Coordination",
        "Smart Collaboration", "Real-time monitoring", "Structured workflows",
        { name: "Reduce Rework", highlight: true },
        "Clear construction intent", "Reduced design conflicts",
        "Better interdisciplinary coordination", "Reduced bottlenecks",
        "Improved compliance", "Risk mitigation strategies",
        { name: "Accelerate Delivery", highlight: true },
        "Data-driven operations", "Long-term cost savings", "Asset performance tracking",
        "Lifecycle optimization", "Digital continuity", "Strategic planning",
        "Timeline optimization", "Quality assurance", "Reduced cost overruns",
        "Quantity validation", "Procurement optimization", "Waste reduction",
        "Cost forecasting",
        { name: "Optimize Cost", highlight: true }
    ];

    const handleHighlightClick = (key) => {
        const advantage = advantagesData.find(a => a.key === key)
        if (advantage) {
            setSelectedAdvantageId(advantage.id)
        }
    }

    const closeModal = () => {
        setSelectedAdvantageId(null)
    }

    useEffect(() => {
        if (selectedAdvantageId) {
            const element = document.getElementById(`modal-section-${selectedAdvantageId}`)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
    }, [selectedAdvantageId])

    useEffect(() => {
        if (selectedAdvantageId) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [selectedAdvantageId])

    return (
        <section className="relative w-full py-16 px-6 -mt-16">            <div className="container mx-auto">
            <div className="relative overflow-hidden rounded-[3rem] border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-10 md:p-16 text-center shadow-2xl">

                {/* Background Glow Effect Updated to #6EDD4D */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6EDD4D]/5 blur-[100px]"></div>

                <div className="relative z-10 mb-12">
                    <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
                        Advantages of working <span className="text-[#6EDD4D]">with Gigfactory</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-zinc-400 text-lg">
                        We don&apos;t just support projects - we improve performance across time, cost, coordination and lifecycle value.
                    </p>
                </div>

                {/* Word Cloud with #6EDD4D Highlights */}
                <div className="relative z-10 mx-auto mb-16 flex max-w-5xl flex-wrap justify-center gap-3">
                    {allTags.map((tag, i) => {
                        const isHighlight = typeof tag === 'object' && tag.highlight;
                        const tagName = isHighlight ? tag.name : tag;

                        return (
                            <span
                                key={i}
                                onClick={() => isHighlight ? handleHighlightClick(tagName) : undefined}
                                className={`rounded-full border px-5 py-2.5 text-sm md:text-base font-medium transition-all duration-300 ${isHighlight
                                    ? 'cursor-pointer border-[#6EDD4D] bg-[#6EDD4D]/10 text-[#6EDD4D] shadow-[0_0_15px_rgba(110,221,77,0.15)] hover:bg-[#6EDD4D] hover:text-zinc-950 hover:shadow-[0_0_20px_rgba(110,221,77,0.3)]'
                                    : 'cursor-default border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                                    }`}
                            >
                                {tagName}
                            </span>
                        )
                    })}
                </div>

                {/* CTA Button Updated to #6EDD4D */}
                <button
                    onClick={onContactClick}
                    className="group relative z-10 inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#6EDD4D] bg-transparent px-8 py-4 font-bold text-[#6EDD4D] transition-all hover:bg-[#6EDD4D] hover:text-zinc-950 hover:shadow-[0_0_30px_rgba(110,221,77,0.3)]"
                >
                    <span>Looking for smart construction solutions? Let&apos;s talk</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
            </div>
        </div>

            {selectedAdvantageId && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm md:p-8"
                    onClick={closeModal}
                >
                    <div
                        className="relative flex h-full max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                        ref={modalContentRef}
                    >
                        <button
                            className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-2xl text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
                            onClick={closeModal}
                        >
                            &times;
                        </button>

                        <div className="flex-1 overflow-y-auto scroll-smooth p-8 md:p-12">
                            <div className="flex flex-col gap-16">
                                {advantagesData.map((advantage) => (
                                    <div key={advantage.id} id={`modal-section-${advantage.id}`} className="scroll-mt-12">

                                        <div className="mb-6 border-b border-zinc-800 pb-4">
                                            <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">{advantage.title}</h2>
                                            {/* Green Underline */}
                                            <div className="h-1 w-16 rounded-full bg-[#6EDD4D]"></div>
                                        </div>

                                        <div className="text-zinc-300">
                                            {/* Subtitle color updated */}
                                            <h3 className="mb-4 text-xl font-semibold text-[#6EDD4D]">{advantage.subtitle}</h3>
                                            <p className="mb-6 leading-relaxed">{advantage.description}</p>

                                            <ul className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                                                {advantage.points.map((point, index) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        {/* Point bullets updated */}
                                                        <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#6EDD4D]"></span>
                                                        <span className="text-zinc-400">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <p className="mb-8 font-medium italic text-zinc-400">{advantage.footer}</p>

                                            {advantage.images && (
                                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                                    {advantage.images.map((img, index) => (
                                                        <div key={index} className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 aspect-video flex items-center justify-center p-2 transition-all hover:border-[#6EDD4D]/50">
                                                            <img
                                                                src={img}
                                                                alt={`Visual representation ${index + 1}`}
                                                                className="h-full w-full object-contain object-center"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}