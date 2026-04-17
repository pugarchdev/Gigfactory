'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lightbulb, Users, Target, TrendingUp, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  const router = useRouter()

  const culturePillars = [
    {
      title: "Intelligence-Driven Thinking",
      description: "We embrace creativity and forward-thinking solutions",
      icon: <Lightbulb size={24} />
    },
    {
      title: "Collaboration Over Silos",
      description: "We work together to achieve exceptional results",
      icon: <Users size={24} />
    },
    {
      title: "Ownership & Accountability",
      description: "We uphold the highest standards of ethics and transparency",
      icon: <Target size={24} />
    },
    {
      title: "Continuous Learning",
      description: "We strive for outstanding quality in everything we do",
      icon: <TrendingUp size={24} />
    }
  ]

  const team = [
    {
      name: "Mason Walker",
      role: "Lead Architect",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "Isabella Rivera",
      role: "BIM Manager",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "Amelia Scott",
      role: "Structural Engineer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop"
    }
  ]

  // --- Animations ---
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-[#6EDD4D]/30 pb-24 mt-[-60px] md:mt-[-60px]">
      
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#6EDD4D]/5 blur-[150px]"></div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 px-6 flex flex-col items-center text-center z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#6EDD4D]/10 border border-[#6EDD4D]/20 text-[#6EDD4D] text-xs font-bold uppercase tracking-widest mb-6">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-tight">
            Integrated Construction <br/>
            <span className="text-[#6EDD4D]">Technology Platform</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Building Intelligence. Growing Together. At Gigfactory, culture is not just about where we work — it&apos;s about how we think, collaborate, and build.
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial="hidden" animate="visible" variants={scaleIn}
          className="w-full max-w-6xl relative rounded-[2rem] overflow-hidden border border-zinc-800 shadow-[0_0_50px_rgba(110,221,77,0.05)] aspect-[21/9] bg-zinc-900"
        >
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" 
            alt="Team collaborating" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
        </motion.div>
      </section>

      {/* 2. STATS BAR */}
      <section className="relative -mt-16 z-20 px-6">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="max-w-4xl mx-auto rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-8 flex flex-wrap justify-around gap-8 shadow-2xl"
        >
          <div className="text-center">
            <h3 className="text-4xl font-black text-[#6EDD4D] mb-1">10M+</h3>
            <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Sq ft Delivered</p>
          </div>
          <div className="w-px bg-zinc-800 hidden md:block"></div>
          <div className="text-center">
            <h3 className="text-4xl font-black text-[#6EDD4D] mb-1">1000+</h3>
            <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Experts Network</p>
          </div>
          <div className="w-px bg-zinc-800 hidden md:block"></div>
          <div className="text-center">
            <h3 className="text-4xl font-black text-[#6EDD4D] mb-1">100%</h3>
            <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Reliability</p>
          </div>
        </motion.div>
      </section>

      {/* 3. WHO WE ARE */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">
                What Drives Us <br/>
                <span className="text-zinc-500">Forward</span>
              </h2>
              <div className="space-y-6 text-zinc-400 leading-relaxed text-lg">
                <p>
                  Gigfactory Private Limited revolutionizes the construction industry by providing an integrated, technology-powered, one-stop solution for all your project needs. We have a diverse network of 1000+ experts spanning architecture, Structure, Interior design, project management, engineering, and more.
                </p>
                <p>
                  Our platform streamlines workflows, optimizes resource allocation, and drives efficiency in design and construction. With a proven track record of delivering over 10 Million Sq ft across diverse sectors, Gigfactory is committed to providing Quality and reliability to our partners in every project.
                </p>
              </div>
            </motion.div>
            
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} className="relative">
              <div className="aspect-square rounded-[2rem] overflow-hidden border border-zinc-800 bg-zinc-900/50 shadow-[0_0_30px_rgba(110,221,77,0.05)]">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" 
                  alt="Company Forward Vision" 
                  className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. MISSION & VISION */}
      <section className="py-20 px-6 bg-zinc-900/20 border-y border-zinc-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Mission */}
            <motion.div variants={fadeUp} className="p-10 rounded-[2rem] bg-zinc-900/40 border border-zinc-800 hover:border-[#6EDD4D]/30 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Target className="text-[#6EDD4D]" size={28} />
                Our Mission
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                To deliver exceptional construction technology services that enhance project outcomes, reduce costs, improve timelines, and promote sustainability through innovative digital solutions and expert collaboration.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div variants={fadeUp} className="p-10 rounded-[2rem] bg-zinc-900/40 border border-zinc-800 hover:border-[#6EDD4D]/30 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Lightbulb className="text-[#6EDD4D]" size={28} />
                Our Vision
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                To become the global leader in construction technology solutions, transforming how buildings are designed, constructed, and managed through digital innovation and sustainable practices.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. EXPLORE OUR VALUES (Pillars Grid) */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:w-1/3">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                Explore Our <br/>
                <span className="text-[#6EDD4D]">Values</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8">
                Our culture pillars define how we operate, collaborate, and innovate within the construction industry.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {culturePillars.map((pillar, index) => (
                <motion.div 
                  key={index} variants={fadeUp}
                  className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/80 hover:border-[#6EDD4D]/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-[#6EDD4D]/10 flex items-center justify-center text-[#6EDD4D] mb-6">
                    {pillar.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">{pillar.title}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">{pillar.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. TEAM SECTION */}
      {/* <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter">
              Our Expert Collaboration <span className="text-[#6EDD4D]">Team</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-16">
              Our dynamic network is led by industry veterans committed to sharing knowledge, ensuring quality, and transforming construction outcomes.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={scaleIn} className="group text-left">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-zinc-900 relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                  />
                
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-zinc-950 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-end gap-3">
                    <svg className="text-white hover:text-[#6EDD4D] cursor-pointer transition-colors" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    <svg className="text-white hover:text-[#6EDD4D] cursor-pointer transition-colors" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                <p className="text-sm text-[#6EDD4D] font-medium tracking-wide uppercase">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* 7. CTA SECTION */}
      <section className="pt-32 pb-10 px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
            Ready To Simplify Your <br/>
            <span className="text-[#6EDD4D]">Project Management?</span>
          </h2>
          <div className="mt-10">
            <button 
              onClick={() => router.push('/contact')}
              className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-[#6EDD4D] px-10 py-4 font-black uppercase tracking-widest text-zinc-950 transition-all hover:bg-[#6EDD4D]/90 hover:shadow-[0_0_30px_rgba(110,221,77,0.4)]"
            >
              <span>Get Started Now</span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </section>

    </main>
  )
}