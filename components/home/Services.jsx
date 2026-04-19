'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

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
      className={`transition-all duration-700 ease-[0.34,1.56,0.64,1] ${isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : animationClass
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
      param: '2d',
      icon: 'fa-pen-ruler',
      iconPath: '/assets/s2d.png',
      title: '2D',
      desc: 'Our team delivers clear, technically accurate drawings that help project stakeholders communicate design intent.'
    },
    {
      id: '3D Services',
      param: '3d',
      icon: 'fa-cube',
      iconPath: '/assets/s3d.png',
      title: 'BIM 3D',
      desc: 'Our 3D BIM services help project teams identify issues early, streamline collaboration, and ensure accuracy.'
    },
    {
      id: '4D Services',
      param: '4d',
      icon: 'fa-clock',
      iconPath: '/assets/s4d.png',
      title: '4D',
      desc: 'We integrate project schedules with BIM models to simulate, optimize, and control construction sequencing.'
    },
    {
      id: 'Project Planning',
      param: 'pp-c',
      icon: 'fa-chart-gantt',
      iconPath: '/assets/spp&c.png',
      title: 'Project Planning & Controls',
      desc: 'We support structured planning to enhance coordination and execution clarity across the project lifecycle.'
    },
    {
      id: 'BOQ Services',
      param: 'boq',
      icon: 'fa-calculator',
      iconPath: '/assets/sboq.png',
      title: 'BOQ & Quantity Intelligence',
      desc: 'We deliver accurate cost and quantity support to enhance financial transparency and procurement alignment.'
    },
    {
      id: 'Audit Services',
      param: 'audit',
      icon: 'fa-clipboard-check',
      iconPath: '/assets/saudit.png',
      title: 'Audit & Verification Services',
      desc: 'We ensure compliance, transparency, and technical accuracy across all critical project stages.'
    }
  ];

  return (
    <section className="container mx-auto px-6 py-20 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-2/3 bg-[#6EDD4D]/5 blur-[120px] pointer-events-none z-0" />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes subtle-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.01); }
        }
        .animate-subtle-pulse {
          animation: subtle-pulse 2s ease-in-out infinite;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Header */}
      <div className="text-center mb-20 relative z-10">
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={0}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 -mt-12 tracking-tight">
            Services We <span className="text-[#6EDD4D]">Deliver</span>
          </h2>
        </AnimatedSection>
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={150}>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Expertise across the construction lifecycle, enabled by cutting-edge technology.
          </p>
        </AnimatedSection>
      </div>

      {/* Services Grid */}
      <div className="relative mb-24 z-10">
        <div className="overflow-x-auto no-scrollbar -mx-6 px-6 pb-8">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-w-max md:min-w-full">
            {services.map((service, idx) => (
              <AnimatedSection
                key={idx}
                animationClass="opacity-0 scale-75"
                delay={idx * 100}
                className="w-[300px] md:w-auto h-full flex-shrink-0 md:flex-shrink"
              >
                <div className="relative overflow-hidden bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 p-8 rounded-[2.5rem] transition-all duration-500 ease-out hover:-translate-y-3 hover:border-[#6EDD4D]/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(110,221,77,0.1)] group flex flex-col items-center text-center h-full">

                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#6EDD4D]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* ICON CONTAINER - Increased to w-24 h-24 */}
                  <div className="w-24 h-24 rounded-3xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-8 relative z-10 group-hover:bg-[#6EDD4D] group-hover:rotate-[10deg] transition-all duration-500 overflow-hidden shadow-xl">
                    {service.iconPath ? (
                      <img
                        src={service.iconPath}
                        alt={service.title}
                        // Increased image size to w-14/h-14 or w-16/h-16
                        className="w-14 h-14 object-contain relative z-20 transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                      />
                    ) : (
                      <i className={`fa-solid ${service.icon} text-4xl text-[#6EDD4D] group-hover:text-zinc-950 transition-colors duration-500`}></i>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 relative z-10 group-hover:text-[#6EDD4D] transition-colors duration-300">{service.title}</h3>
                  <div className="relative bg-zinc-950/50 p-5 rounded-2xl flex-grow mb-8 text-sm text-zinc-400 leading-relaxed text-left w-full border-l-2 border-zinc-800 group-hover:border-[#6EDD4D] transition-all duration-500">{service.desc}</div>

                  <Link href={`/services?service=${service.param}`} className="relative z-10 px-8 py-3 rounded-full border border-zinc-700 text-white hover:text-zinc-950 text-sm font-bold overflow-hidden transition-all duration-300 hover:border-[#6EDD4D] group/btn">
                    <span className="relative z-10 flex items-center gap-2">Know More <i className="fa-solid fa-arrow-right text-xs group-hover/btn:translate-x-2 transition-transform duration-300"></i></span>
                    <div className="absolute inset-0 bg-[#6EDD4D] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="relative z-10 text-center pt-0 pb-10">
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={100} className="-mt-12">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Have a project <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">in mind?</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection animationClass="opacity-0 scale-0" delay={300}>
          <button
            onClick={onContactClick}
            className="group animate-subtle-pulse bg-transparent border border-[#6EDD4D]/60 hover:border-[#6EDD4D] text-[#6EDD4D] font-bold px-12 py-6 rounded-2xl text-lg transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(110,221,77,0.05)] hover:shadow-[0_0_50px_rgba(110,221,77,0.2)] flex items-center gap-4 mx-auto"
          >
            Start Your Project Today
            <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform duration-300"></i>
          </button>
        </AnimatedSection>
      </div>

    </section>
  );
}