'use client'

import { useState, useEffect, useRef } from 'react'
import AgencyForm from '@/components/form/AgencyForm'
import FreelancerForm from '@/components/form/FreelancerForm'

// --- REUSABLE ANIMATION WRAPPER ---
// This hides the component until it scrolls into the viewport
const AnimatedSection = ({ children, animationClass, className = "", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false)
    const domRef = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true)
                    // Disconnect after it appears so it only animates once per page load
                    observer.unobserve(domRef.current) 
                }
            },
            { threshold: 0.1 } // Triggers when 10% of the element is visible
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

export default function Login() {
    const [showExpertForm, setShowExpertForm] = useState(false)
    const [showFreelancerForm, setShowFreelancerForm] = useState(false)
    const [showAgencyForm, setShowAgencyForm] = useState(false)

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', city: '', state: '',
        expertise: '', experience: '', company: '', message: '', driveLink: ''
    })

    const [freelancerData, setFreelancerData] = useState({
        name: '', email: '', phone: '', city: '', state: '',
        skills: '', experience: '', portfolio: '', message: '', driveLink: ''
    })

    const culturePillars = [
        { title: "Intelligence-Driven Thinking", description: "We embrace creativity and forward-thinking solutions" },
        { title: "Collaboration Over Silos", description: "We work together to achieve exceptional results" },
        { title: "Ownership & Accountability", description: "We uphold the highest standards of ethics and transparency" },
        { title: "Continuous Learning & Growth", description: "We strive for outstanding quality in everything we do" }
    ]

    const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
    const handleFreelancerFormChange = (e) => setFreelancerData({ ...freelancerData, [e.target.name]: e.target.value })

    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log('Expert application submitted:', formData)
        alert('Application submitted successfully! We will contact you soon.')
        setFormData({ name: '', email: '', phone: '', city: '', state: '', expertise: '', experience: '', company: '', message: '', driveLink: '' })
        setShowExpertForm(false)
    }

    const handleFreelancerFormSubmit = (e) => {
        e.preventDefault()
        console.log('Freelancer application submitted:', freelancerData)
        alert('Freelancer application submitted successfully! We will contact you soon.')
        setFreelancerData({ name: '', email: '', phone: '', city: '', state: '', skills: '', experience: '', portfolio: '', message: '', driveLink: '' })
        setShowFreelancerForm(false)
    }

    const closeForm = () => setShowExpertForm(false)
    const closeAgencyForm = () => setShowAgencyForm(false)
    const closeFreelancerForm = () => setShowFreelancerForm(false)

    const inputBaseStyle = "w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6EDD4D] focus:ring-1 focus:ring-[#6EDD4D] transition-all placeholder:text-zinc-600"
    const labelStyle = "block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2"

    return (
        <main className="min-h-screen  text-zinc-100 font-sans selection:bg-[#6EDD4D]/30 relative overflow-hidden">

            {/* Background Ambient Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6EDD4D]/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#6EDD4D]/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-16 md:py-24 max-w-6xl">

                {/* ===== APPLY CARDS SECTION (Slide in from Left) ===== */}
                <AnimatedSection animationClass="opacity-0 -translate-x-24">
                    <section className="mb-16 flex flex-col items-center justify-center rounded-[2.5rem] border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl p-10 md:p-16 text-center transition-colors hover:border-[#6EDD4D]/30 hover:shadow-[0_0_40px_rgba(110,221,77,0.05)]">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#6EDD4D]/10 border border-[#6EDD4D]/20 text-[#6EDD4D] text-xs font-bold uppercase tracking-widest mb-6">
                            Join The Network
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                            Interested in becoming a <br className="hidden md:block" /> Gigfactory Expert?
                        </h2>
                        <p className="text-zinc-400 text-lg mb-10 max-w-2xl">
                            Submit your profile and explore opportunities to build and grow with us.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <button
                                onClick={() => setShowAgencyForm(true)}
                                className="px-8 py-4 rounded-xl font-bold bg-white text-zinc-950 hover:bg-zinc-200 transition-all"
                            >
                                Apply as an Agency
                            </button>
                            <button
                                onClick={() => setShowFreelancerForm(true)}
                                className="px-8 py-4 rounded-xl font-bold bg-[#6EDD4D] text-zinc-950 hover:shadow-[0_0_20px_rgba(110,221,77,0.4)] hover:bg-[#5bc43f] transition-all"
                            >
                                Apply as a Freelancer
                            </button>
                        </div>
                    </section>
                </AnimatedSection>

                {/* ===== MAIN LOGIN CARD (Slide in from Right) ===== */}
                <AnimatedSection animationClass="opacity-0 translate-x-24">
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[2.5rem] border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl overflow-hidden mb-24 shadow-2xl">
                        {/* LEFT SIDE */}
                        <div className="p-12 md:p-16 flex flex-col items-center justify-center bg-zinc-950/50 border-b lg:border-b-0 lg:border-r border-zinc-800">
                            <h1 className="text-6xl md:text-8xl font-black mb-4">
                                <a
                                    href="https://app.gigbimlabs.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-[#6EDD4D] transition-all duration-300 hover:scale-105 inline-block hover:drop-shadow-[0_0_15px_rgba(110,221,77,0.5)]"
                                >
                                    CORE
                                </a>
                            </h1>
                            <p className="text-zinc-400 text-center text-lg uppercase tracking-widest">
                                Gigfactory Project <br /> Management Platform
                            </p>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="p-12 md:p-16 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-white mb-8">Login to your account</h2>
                            <form className="space-y-6">
                                <div>
                                    <label className={labelStyle}>Mail ID</label>
                                    <input type="email" placeholder="Enter your email" className={inputBaseStyle} />
                                </div>
                                <div>
                                    <label className={labelStyle}>Password</label>
                                    <input type="password" placeholder="Enter your password" className={inputBaseStyle} />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full mt-4 bg-[#6EDD4D] text-zinc-950 font-black text-lg py-4 rounded-xl hover:shadow-[0_0_25px_rgba(110,221,77,0.3)] hover:scale-[1.02] transition-all"
                                >
                                    LOG IN
                                </button>
                            </form>
                        </div>
                    </section>
                </AnimatedSection>

                {/* ===== CULTURE SECTION ===== */}
                <section className="mb-24">
                    {/* (Scale / Pop In) */}
                    <AnimatedSection animationClass="opacity-0 scale-90">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Building Intelligence. Growing Together.</h3>
                            <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
                                At Gigfactory, culture is not just about where we work — it&apos;s about how we think, collaborate, and build.
                            </p>
                        </div>
                    </AnimatedSection>

                    {/* (Fade in & Slide Up) */}
                    <AnimatedSection animationClass="opacity-0 translate-y-10">
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
                                Our Culture Pillars
                            </h2>
                            <div className="h-[2px] flex-grow bg-zinc-800"></div>
                            <div className="h-2 w-2 rounded-full bg-[#6EDD4D]"></div>
                        </div>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {culturePillars.map((pillar, index) => (
                            /* (Staggered Fade Up based on index) */
                            <AnimatedSection 
                                key={index} 
                                animationClass="opacity-0 translate-y-20" 
                                delay={index * 150} // Multiplies index by 150ms to create a cascading arrival
                            >
                                <div className="group p-8 h-full rounded-[2rem] border border-zinc-800 bg-zinc-900/40 backdrop-blur-md hover:border-[#6EDD4D]/50 hover:bg-zinc-900/80 transition-all duration-500 hover:-translate-y-2">
                                    <div className="text-[#6EDD4D] font-black text-4xl mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
                                        0{index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#6EDD4D] transition-colors">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </section>

            </div>

            {/* ===== EXPERT APPLICATION FORM MODAL ===== */}
            {/* Keeping Modals untouched as they pop up on click, not scroll */}
            {showExpertForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-zinc-950/80 backdrop-blur-md">
                    <div
                        className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 md:p-12 shadow-2xl my-8 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-8 pb-6 border-b border-zinc-800">
                            <h2 className="text-2xl md:text-3xl font-bold text-white">Apply as Gigfactory Expert</h2>
                            <button onClick={closeForm} className="text-zinc-500 hover:text-white transition-colors p-2 text-2xl leading-none">
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-10">
                            <div>
                                <h3 className="text-[#6EDD4D] text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <div className="h-px bg-zinc-800 flex-grow"></div>
                                    Personal Information
                                    <div className="h-px bg-zinc-800 flex-grow"></div>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div><label className={labelStyle}>Full Name *</label><input type="text" name="name" value={formData.name} onChange={handleFormChange} required placeholder="Enter your full name" className={inputBaseStyle} /></div>
                                    <div><label className={labelStyle}>Email Address *</label><input type="email" name="email" value={formData.email} onChange={handleFormChange} required placeholder="Enter your email" className={inputBaseStyle} /></div>
                                    <div><label className={labelStyle}>Phone Number *</label><input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required placeholder="Enter your phone number" className={inputBaseStyle} /></div>
                                    <div><label className={labelStyle}>Company/Organization</label><input type="text" name="company" value={formData.company} onChange={handleFormChange} placeholder="Enter your company name" className={inputBaseStyle} /></div>
                                    <div><label className={labelStyle}>City *</label><input type="text" name="city" value={formData.city} onChange={handleFormChange} required placeholder="Enter your city" className={inputBaseStyle} /></div>
                                    <div><label className={labelStyle}>State *</label><input type="text" name="state" value={formData.state} onChange={handleFormChange} required placeholder="Enter your state" className={inputBaseStyle} /></div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[#6EDD4D] text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <div className="h-px bg-zinc-800 flex-grow"></div>
                                    Professional Information
                                    <div className="h-px bg-zinc-800 flex-grow"></div>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelStyle}>Area of Expertise *</label>
                                        <select name="expertise" value={formData.expertise} onChange={handleFormChange} required className={inputBaseStyle}>
                                            <option value="" className="bg-zinc-900 text-zinc-400">Select your expertise</option>
                                            <option value="architectural" className="bg-zinc-900 text-white">Architectural Design</option>
                                            <option value="structural" className="bg-zinc-900 text-white">Structural Engineering</option>
                                            <option value="mep" className="bg-zinc-900 text-white">MEP Engineering</option>
                                            <option value="bim" className="bg-zinc-900 text-white">BIM Modeling</option>
                                            <option value="project-management" className="bg-zinc-900 text-white">Project Management</option>
                                            <option value="construction" className="bg-zinc-900 text-white">Construction Management</option>
                                            <option value="sustainability" className="bg-zinc-900 text-white">Sustainability Consulting</option>
                                            <option value="other" className="bg-zinc-900 text-white">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelStyle}>Years of Experience *</label>
                                        <select name="experience" value={formData.experience} onChange={handleFormChange} required className={inputBaseStyle}>
                                            <option value="" className="bg-zinc-900 text-zinc-400">Select experience</option>
                                            <option value="0-2" className="bg-zinc-900 text-white">0-2 years</option>
                                            <option value="3-5" className="bg-zinc-900 text-white">3-5 years</option>
                                            <option value="6-10" className="bg-zinc-900 text-white">6-10 years</option>
                                            <option value="11-15" className="bg-zinc-900 text-white">11-15 years</option>
                                            <option value="15+" className="bg-zinc-900 text-white">15+ years</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[#6EDD4D] text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <div className="h-px bg-zinc-800 flex-grow"></div>
                                    Additional Information
                                    <div className="h-px bg-zinc-800 flex-grow"></div>
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className={labelStyle}>Cover Letter / Tell us about yourself</label>
                                        <textarea name="message" value={formData.message} onChange={handleFormChange} placeholder="Share your experience, skills, and why you'd like to join Gigfactory as an expert..." rows="4" className={`${inputBaseStyle} resize-y`} />
                                    </div>
                                    <div>
                                        <label className={labelStyle}>Drive Link (CV/Resume/Certificates)</label>
                                        <input type="url" name="driveLink" value={formData.driveLink} onChange={handleFormChange} placeholder="Share your Google Drive link here" className={inputBaseStyle} />
                                        <p className="text-zinc-500 text-xs mt-2 italic">Please ensure the link is set to &quot;Anyone with the link can view&quot;.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-6 border-t border-zinc-800 mt-10">
                                <button type="button" onClick={closeForm} className="px-6 py-3 rounded-xl font-bold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all">Cancel</button>
                                <button type="submit" className="px-8 py-3 rounded-xl font-bold bg-[#6EDD4D] text-zinc-950 hover:bg-[#5bc43f] hover:shadow-[0_0_20px_rgba(110,221,77,0.3)] transition-all">Submit Application</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ===== FREELANCER APPLICATION FORM MODAL ===== */}
            {showFreelancerForm && <FreelancerForm onClose={closeFreelancerForm} />}

            {/* ===== AGENCY APPLICATION FORM MODAL ===== */}
            {showAgencyForm && <AgencyForm onClose={closeAgencyForm} />}

        </main>
    )
}