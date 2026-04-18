'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link' // Import Next.js Link

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
            { threshold: 0.1 } // Triggers when 10% visible
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

export default function Services({ onContactClick }) {
  const services = [
    { 
      id: '2D Services', 
      param: '2d', // Added URL parameter
      icon: 'fa-pen-ruler', 
      title: '2D', 
      desc: 'Our team delivers clear, technically accurate drawings that help project stakeholders communicate design intent and execute construction efficiently.' 
    },
    { 
      id: '3D Services', 
      param: '3d', // Added URL parameter
      icon: 'fa-cube', 
      title: '3D', 
      desc: 'Our 3D BIM services help project teams identify issues early, streamline collaboration, and ensure accurate documentation for construction.' 
    },
    { 
      id: '4D Services', 
      param: '4d', // Added URL parameter
      icon: 'fa-clock', 
      title: '4D', 
      desc: 'We integrate project schedules with BIM models to simulate, optimize, and control construction sequencing.' 
    },
    { 
      id: 'Project Planning', 
      param: 'pp-c', // Added URL parameter
      icon: 'fa-chart-gantt', 
      title: 'Project Planning & Controls', 
      desc: 'We support structured planning to enhance coordination and execution clarity.' 
    },
    { 
      id: 'BOQ Services', 
      param: 'boq', // Added URL parameter
      icon: 'fa-calculator', 
      title: 'BOQ', 
      desc: 'We deliver accurate cost and quantity support to enhance financial transparency and procurement alignment.' 
    },
    { 
      id: 'Audit Services', 
      param: 'audit', // Added URL parameter
      icon: 'fa-clipboard-check', 
      title: 'Audit', 
      desc: 'We ensure compliance, transparency, and technical accuracy across project stages.' 
    }
  ];

  return (
    <section className="container mx-auto px-6 py-8">
      
      {/* Header */}
      <div className="text-center mb-16">
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={0}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Services We Deliver</h2>
        </AnimatedSection>
        
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={150}>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Our comprehensive range of services covers every aspect of construction and design, ensuring your project is handled with expertise from conception to completion.
          </p>
        </AnimatedSection>
      </div>
      
      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {services.map((service, idx) => (
          <AnimatedSection 
            key={idx} 
            animationClass="opacity-0 translate-y-16" 
            delay={idx * 100}
            className="h-full"
          >
            {/* Card styling updated to use Zinc theme colors */}
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 p-8 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:border-[#6EDD4D]/50 hover:shadow-[0_0_40px_rgba(110,221,77,0.05)] group flex flex-col items-center text-center h-full">
              
              <div className="w-16 h-16 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(110,221,77,0.2)] transition-all duration-500">
                <i className={`fa-solid ${service.icon} text-2xl text-[#6EDD4D] group-hover:scale-110 transition-transform duration-300`}></i>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#6EDD4D] transition-colors duration-300">{service.title}</h3>
              
              <div className="bg-[#6EDD4D]/5 border-l-2 border-[#6EDD4D] p-4 rounded-r-xl flex-grow mb-8 text-sm text-zinc-400 leading-relaxed text-left w-full">
                {service.desc}
              </div>
              
              {/* REPLACED BUTTON WITH NEXT.JS LINK */}
              <Link 
                href={`/services?service=${service.param}`}
                className="px-6 py-2.5 rounded-full border border-zinc-700 text-white text-sm font-bold hover:bg-[#6EDD4D] hover:text-zinc-950 hover:border-[#6EDD4D] transition-all w-fit flex items-center gap-2 mt-auto group/btn"
              >
                Know More <i className="fa-solid fa-arrow-right text-xs group-hover/btn:translate-x-1 transition-transform"></i>
              </Link>

            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Bottom CTA Button */}
      <AnimatedSection animationClass="opacity-0 scale-95" delay={100}>
        <div className="flex justify-center mt-20">
          <button 
            onClick={onContactClick} // Keep this for opening the Contact Modal!
            className="group bg-[#6EDD4D] text-zinc-950 font-black uppercase tracking-widest px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(110,221,77,0.2)] hover:shadow-[0_0_40px_rgba(110,221,77,0.4)] flex items-center gap-3"
          >
            Have a project in mind? Let&apos;s talk 
            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      </AnimatedSection>

    </section>
  );
}