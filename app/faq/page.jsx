'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, Minus, HelpCircle } from 'lucide-react'
import ContactModal from '@/components/home/ContactModal' // Make sure this path matches your folder structure

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
                isVisible ? 'opacity-100 translate-x-0 translate-y-0' : animationClass
            } ${className}`}
        >
            {children}
        </div>
    )
}

const faqs = [
  {
    q: "How does the GigScore system work for GigExperts on Gigfactory?",
    a: "The GigScore system helps gigowners choose the right GigExpert. It is based on Gigfactory’s vetting process and ratings from previous projects. It considers qualifications, portfolio, and feedback. Higher GigScore means more experienced and qualified experts."
  },
  {
    q: "How long does it take to complete a project on GigFactory?",
    a: "Project timelines vary based on scope and availability. It can range from one day to a year. Clear milestones and timelines help ensure timely completion. The platform also provides real-time tracking."
  },
  {
    q: "How do I make sure that my project stays within budget on Gigfactory?",
    a: "Clearly define scope, expectations, and outputs. Break the project into milestones for better tracking and cost control."
  },
  {
    q: "What happens if I'm not satisfied with the work delivered?",
    a: "You can communicate with the GigExpert to resolve issues. If unresolved, Gigfactory provides a dispute resolution process."
  },
  {
    q: "How can I ensure confidentiality of my project?",
    a: "Gigfactory enforces strict confidentiality policies, NDAs, and secure encrypted communication tools."
  },
  {
    q: "How can I track project progress?",
    a: "You can track milestones, communicate, share files, and request updates including video meetings."
  },
  {
    q: "Is there a limit to number of projects?",
    a: "No, you can post unlimited projects and work with multiple GigExperts."
  },
  {
    q: "Can I work with the same GigExpert on multiple projects?",
    a: "Yes, you can collaborate with the same expert across multiple projects and even mark them as preferred."
  },
  {
    q: "How do I ensure project quality and timely completion?",
    a: "Gigfactory vets experts, provides communication tools, and uses escrow payments to ensure quality and timely delivery."
  },
  {
    q: "How long does it take to find a suitable GigExpert?",
    a: "It depends on project scope, but GigScore helps you quickly find the best match."
  },
  {
    q: "Can I work with multiple GigExperts?",
    a: "Yes, you can assign different experts to different tasks or project stages."
  },
  {
    q: "Can I cancel a project?",
    a: "Yes, but completed milestone payments will be released to the expert. Always communicate before cancellation."
  }
]

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false) // 1. Added State

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-[#6EDD4D]/30 pb-32">
      
      {/* Background Decorative Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-[#6EDD4D]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-24 md:pt-40 max-w-4xl">
        
        {/* Simple Header */}
        <AnimatedSection animationClass="opacity-0 translate-y-10">
          <header className="mb-20 text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 uppercase">
              Common <span className="text-[#6EDD4D]">Questions</span>
            </h1>
            <p className="text-zinc-500 text-lg font-medium max-w-xl mx-auto">
              Find answers to common inquiries about how Gigfactory streamlines your construction workflow.
            </p>
          </header>
        </AnimatedSection>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = activeIndex === index;
            
            return (
              <AnimatedSection 
                key={index} 
                animationClass="opacity-0 translate-y-8" 
                delay={index * 50}
              >
                <div 
                  className={`group border border-zinc-800 rounded-3xl overflow-hidden transition-all duration-500 ${
                    isOpen ? 'bg-zinc-900/50 border-[#6EDD4D]/30 shadow-[0_0_30px_rgba(110,221,77,0.05)]' : 'bg-transparent hover:border-zinc-700'
                  }`}
                >
                  <button 
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                  >
                    <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
                      isOpen ? 'text-[#6EDD4D]' : 'text-white'
                    }`}>
                      {item.q}
                    </span>
                    <div className={`shrink-0 ml-4 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isOpen ? 'bg-[#6EDD4D] border-[#6EDD4D] text-zinc-950' : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                    }`}>
                        {isOpen ? <Minus size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
                    </div>
                  </button>

                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-6 md:p-8 pt-0 md:pt-0 text-zinc-400 text-base md:text-lg leading-relaxed border-t border-zinc-800/50 mx-6 md:mx-8 mt-[-1px]">
                        <div className="pt-6">
                            {item.a}
                        </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>

        {/* Professional Contact Support Footer */}
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={400}>
            <div className="mt-32 p-12 bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-[2.5rem] text-center max-w-3xl mx-auto">
                <HelpCircle className="text-[#6EDD4D] mx-auto mb-6" size={48} />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Still have questions?</h2>
                <p className="text-zinc-500 mb-8">
                    If you couldn&apos;t find the answer you were looking for, our support team is ready to assist you directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    
                    {/* 2. UPDATED BUTTON: Added onClick */}
                    <button 
                        onClick={() => setIsContactModalOpen(true)}
                        className="bg-[#6EDD4D] text-zinc-950 font-black px-10 py-4 rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(110,221,77,0.2)]"
                    >
                        Contact Support
                    </button>
                    
                    <button className="bg-zinc-950 text-white border border-zinc-800 font-bold px-10 py-4 rounded-xl hover:bg-zinc-900 transition-all">
                        View Tutorials
                    </button>
                </div>
            </div>
        </AnimatedSection>

      </div>

      {/* 3. ADDED MODAL RENDER: Conditional rendering with props */}
      {isContactModalOpen && (
        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
        />
      )}

    </main>
  )
}