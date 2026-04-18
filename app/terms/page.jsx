'use client'

import { useEffect, useState, useRef } from 'react'
import { Check, Mail } from 'lucide-react'

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

const SimpleSection = ({ title, children, number }) => (
    <div className="group border-b border-zinc-800 py-12 md:py-16 last:border-0">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div className="md:w-1/4 shrink-0">
                <span className="text-[#6EDD4D] font-mono text-sm tracking-widest mb-4 block">SECTION 0{number}</span>
                <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#6EDD4D] transition-colors">{title}</h2>
            </div>
            <div className="md:w-3/4 text-zinc-400 text-base md:text-lg leading-relaxed space-y-4">
                {children}
            </div>
        </div>
    </div>
)

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-[#6EDD4D]/30 pb-32">
      
      {/* Clean Header */}
      <div className="container mx-auto px-6 pt-24 md:pt-40 max-w-6xl">
        <AnimatedSection animationClass="opacity-0 translate-y-10">
          <header className="mb-20 border-b border-zinc-800 pb-12">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
              Terms & <span className="text-[#6EDD4D]">Conditions</span>
            </h1>
            <div className="flex items-center gap-6">
                <p className="text-zinc-500 font-medium uppercase text-xs tracking-widest">Version 1.2</p>
                <div className="h-4 w-px bg-zinc-800"></div>
                <p className="text-zinc-500 font-medium uppercase text-xs tracking-widest">Updated: 22 March 2023</p>
            </div>
          </header>
        </AnimatedSection>

        {/* Vertical Content Flow */}
        <div className="space-y-4">
          
          <AnimatedSection animationClass="opacity-0 translate-y-8" delay={100}>
            <SimpleSection title="Introduction" number={1}>
              <p>Gigfactory Private Limited provides an online platform for freelancers and agencies in the construction sector. By accessing or using our website, you agree to these Terms.</p>
              <p>If you do not agree with any part of these Terms, please do not use our website. These Terms form a legally binding agreement between you and Gigfactory.</p>
            </SimpleSection>
          </AnimatedSection>

          <AnimatedSection animationClass="opacity-0 translate-y-8" delay={150}>
            <SimpleSection title="Platform Access" number={2}>
              <p>To access our services, you must register and maintain a user account. You are responsible for maintaining confidentiality of your account.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {['Use a strong password', 'Do not share your account', 'Report breaches in 48h'].map(text => (
                      <div key={text} className="flex items-center gap-3 text-sm text-zinc-300">
                          <Check size={16} className="text-[#6EDD4D]" /> {text}
                      </div>
                  ))}
              </div>
            </SimpleSection>
          </AnimatedSection>

          <AnimatedSection animationClass="opacity-0 translate-y-8" delay={200}>
            <SimpleSection title="Usage Policy" number={4}>
              <p>You agree to use our platform for professional purposes only. The following activities are strictly prohibited:</p>
              <ul className="space-y-3 list-none">
                  {['Illegal or harmful activity', 'Identity impersonation', 'Spam or misleading content', 'Unauthorized system access'].map(item => (
                      <li key={item} className="flex items-center gap-4 text-zinc-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span> {item}
                      </li>
                  ))}
              </ul>
            </SimpleSection>
          </AnimatedSection>

          <AnimatedSection animationClass="opacity-0 translate-y-8" delay={250}>
            <SimpleSection title="Intellectual Property" number={5}>
              <p>All content, trademarks, and materials on this site belong to Gigfactory. You may not reproduce, distribute, or create derivative works from our proprietary assets without explicit written permission.</p>
            </SimpleSection>
          </AnimatedSection>

          <AnimatedSection animationClass="opacity-0 translate-y-8" delay={300}>
            <SimpleSection title="Payments & Fees" number={7}>
              <p>Gigfactory charges service fees for access to the platform. All payments are processed in Indian Rupees (INR) and are subject to applicable taxes.</p>
              <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl mt-4 inline-block">
                  <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest block mb-2">Subscription Cost</span>
                  <div className="text-3xl font-black text-white">₹5999 <span className="text-base text-[#6EDD4D]">+ GST</span></div>
                  <p className="text-xs text-zinc-500 mt-2 font-medium italic">Billed Quarterly (Once every 3 months)</p>
              </div>
            </SimpleSection>
          </AnimatedSection>

          <AnimatedSection animationClass="opacity-0 translate-y-8" delay={350}>
            <SimpleSection title="Refunds & Cancellation" number={8}>
              <p className="text-white font-bold">All transactions are final. No refunds will be provided under any circumstances.</p>
              <p>Once a subscription fee is paid, the resources are allocated to your account immediately, making the transaction non-refundable.</p>
            </SimpleSection>
          </AnimatedSection>

          <AnimatedSection animationClass="opacity-0 translate-y-8" delay={400}>
            <SimpleSection title="Governing Law" number={10}>
              <p>These Terms are governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai.</p>
            </SimpleSection>
          </AnimatedSection>

          <AnimatedSection animationClass="opacity-0 translate-y-8" delay={450}>
            <SimpleSection title="Contact Information" number={11}>
              <p>For official legal inquiries or support regarding these terms, please contact:</p>
              <div className="flex flex-col sm:flex-row gap-6 mt-6">
                  <a href="mailto:contact@gigfactory.com" className="flex items-center gap-3 text-white font-bold hover:text-[#6EDD4D] transition-colors">
                      <Mail size={20} className="text-[#6EDD4D]" /> contact@gigfactory.com
                  </a>
              </div>
            </SimpleSection>
          </AnimatedSection>

        </div>

        {/* Minimal Footer */}
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={500}>
            <div className="mt-32 pt-12 border-t border-zinc-800 text-center">
                <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} Gigfactory Private Limited. All Rights Reserved.</p>
            </div>
        </AnimatedSection>

      </div>
    </main>
  )
}