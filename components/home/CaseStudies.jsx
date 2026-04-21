import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { caseStudiesApi, enquiryApi } from '../../lib/api'

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

export default function CaseStudies({ onContactClick }) {
  const router = useRouter()
  
  // State and Ref for the mobile scroll slider
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollContainerRef = useRef(null)

  // --- NEW: MODAL & FORM STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStudy, setSelectedStudy] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [pdfLink, setPdfLink] = useState('')
  const [caseStudies, setCaseStudies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCaseStudies = async () => {
      try {
        const data = await caseStudiesApi.list()
        setCaseStudies(data)
      } catch (error) {
        console.error('Failed to load case studies:', error)
      } finally {
        setLoading(false)
      }
    }
    loadCaseStudies()
  }, [])

  // Calculate scroll progress for the slider indicator
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    if (scrollWidth === clientWidth) {
      setScrollProgress(0);
      return;
    }
    
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollProgress(progress);
  };

  // --- NEW: MODAL HANDLERS ---
  const handleOpenModal = (study) => {
    setSelectedStudy(study)
    setIsModalOpen(true)
    setIsSuccess(false)
    setPdfLink('')
    setFormData({ name: '', email: '', phone: '' })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedStudy(null), 300) // Clear after animation finishes
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleForceDownload = async (url, filename) => {
    // If it's a Cloudinary URL, add the attachment flag to force download
    let downloadUrl = url;
    if (url.includes('cloudinary.com') && !url.includes('fl_attachment')) {
      downloadUrl = url.replace('/upload/', '/upload/fl_attachment/');
    }

    try {
      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || 'case-study.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      console.error("Force download failed, falling back to direct attachment link", e);
      // Direct navigation to a Cloudinary URL with fl_attachment will trigger download
      window.location.href = downloadUrl;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 1. Submit lead to enquiries
      await enquiryApi.send({
        ...formData,
        message: `Case Study Download Interest: ${selectedStudy.name}`,
        companyName: 'Individual Lead'
      })

      // 2. Set PDF link from study and set success
      const link = selectedStudy.pdfLink || '#'
      setPdfLink(link)
      setIsSuccess(true)

      // 3. (REMOVED) Trigger automatic download
      // We now let the user click the download button in the success state
    } catch (error) {
      console.error("Error submitting form", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading && caseStudies.length === 0) {
    return (
      <section id="case-studies" className="py-20 text-center">
        <div className="animate-pulse text-zinc-500">Loading Case Studies...</div>
      </section>
    )
  }

  return (
    <section id="case-studies" className="container mx-auto px-6 py-20 -mt-24 border-t border-zinc-800/50 overflow-hidden relative">

      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Header */}
      <div className="text-center mb-16">
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={0}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 -mt-12 tracking-tight">Our Case <span className="text-[#6EDD4D]">Studies</span></h2>
        </AnimatedSection>
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={150}>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Real construction projects delivered with quality, precision, and efficiency. Scroll to explore.
          </p>
        </AnimatedSection>
      </div>

      <div className="relative">
        <div className="-mx-6">
          {/* Horizontal Scrollable Wrapper */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 md:gap-8 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory px-6 scroll-pl-6"
          >
            {caseStudies.map((study, idx) => (
              <AnimatedSection
                key={study.id}
                animationClass="opacity-0 translate-y-12"
                delay={idx * 100}
                className="snap-start shrink-0 w-[85vw] max-w-[320px] md:max-w-none md:w-[400px]"
              >
                <div className="group bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-[2rem] overflow-hidden flex flex-col hover:border-[#6EDD4D]/50 hover:shadow-[0_0_30px_rgba(110,221,77,0.1)] transition-all duration-500 h-full">

                  {/* Image Container with Hover Zoom */}
                  <div className="w-full h-56 md:h-64 overflow-hidden relative">
                    <div className="absolute inset-0 bg-zinc-950/20 z-10 group-hover:bg-transparent transition-all duration-500"></div>
                    <img
                      src={study.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'}
                      alt={study.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    {/* <div className="absolute top-4 right-4 z-20">
                      <span className="px-4 py-1.5 bg-zinc-950/80 backdrop-blur-md border border-zinc-700 rounded-full text-xs font-bold text-[#6EDD4D] uppercase tracking-wider shadow-lg">
                        {study.category}
                      </span>
                    </div> */}
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#6EDD4D] transition-colors line-clamp-1">{study.name}</h3>
                    <p className="text-zinc-400 mb-8 flex-grow text-sm leading-relaxed line-clamp-3">{study.features}</p>

                    <button
                      onClick={() => handleOpenModal(study)}
                      className="w-full py-3.5 rounded-xl bg-zinc-950 text-white font-bold border border-zinc-800 hover:bg-[#6EDD4D] hover:text-zinc-950 hover:border-[#6EDD4D] hover:shadow-[0_0_15px_rgba(110,221,77,0.3)] transition-all flex justify-center items-center gap-2 group/btn"
                    >
                      Download Case Study
                      <i className="fa-solid fa-download text-sm group-hover/btn:-translate-y-0.5 transition-transform"></i>
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* SLIDER INDICATOR */}
        <div className="flex justify-center items-center mt-4">
          <div className="w-24 md:w-48 h-1.5 bg-zinc-800 rounded-full relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full w-1/3 bg-[#6EDD4D] rounded-full transition-transform duration-150 ease-out"
              style={{ transform: `translateX(${scrollProgress * 2}%)` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-20 mt-16">
        <AnimatedSection animationClass="opacity-0 scale-90" delay={200}>
          <button
            onClick={() => router.push('/case-studies')}
            className="text-zinc-400 hover:text-[#6EDD4D] font-bold text-sm tracking-widest uppercase transition-colors flex items-center group"
          >
            View All Case Studies
            <i className="fa-solid fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
          </button>
        </AnimatedSection>

        {/* Let's Connect CTA */}
        <div className="w-full max-w-4xl text-center space-y-10">
          <AnimatedSection animationClass="opacity-0 translate-y-10" delay={300}>
            <div className="space-y-4">
              <h3 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Ready to move your <br className="hidden md:block" />
                project <span className="text-[#6EDD4D]">forward?</span>
              </h3>
              <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
                Let&apos;s discuss how our expertise can bring your vision to life with precision and speed.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animationClass="opacity-0 scale-95" delay={500}>
            <button
              onClick={onContactClick}
              className="group relative inline-flex items-center justify-center"
            >
              <div className="absolute -inset-1 bg-[#6EDD4D] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

              <div className="relative bg-[#6EDD4D] text-zinc-950 font-black px-12 py-5 rounded-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 text-lg">
                <span>Let&apos;s Connect</span>
                <span className="text-2xl leading-none group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          </AnimatedSection>
        </div>
      </div>

      {/* --- NEW DOWNLOAD MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
            
            {/* Close Button */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            {/* Modal Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {isSuccess ? "Ready to Download!" : "Get the Case Study"}
              </h3>
              <p className="text-zinc-400 text-sm">
                {isSuccess 
                  ? "Your case study is ready. Click below to download." 
                  : `Enter your details to download the full study for "${selectedStudy?.name}".`}
              </p>
            </div>

            {/* Form or Success State */}
            {!isSuccess ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6EDD4D] transition-colors"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6EDD4D] transition-colors"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    maxLength={10}
                    placeholder="Contact Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#6EDD4D] transition-colors"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 bg-[#6EDD4D] text-zinc-950 font-bold py-3.5 rounded-xl hover:bg-[#5bc73e] transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <><i className="fa-solid fa-spinner animate-spin"></i> Processing...</>
                  ) : (
                    "Submit Details"
                  )}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center py-4">
                <div className="w-16 h-16 bg-[#6EDD4D]/10 text-[#6EDD4D] rounded-full flex items-center justify-center text-3xl mb-6">
                  <i className="fa-solid fa-check"></i>
                </div>
                <button 
                  onClick={() => {
                    handleForceDownload(pdfLink, `${selectedStudy?.name?.replace(/\s+/g, '_')}.pdf`);
                    handleCloseModal();
                  }}
                  className="w-full bg-[#6EDD4D] text-zinc-950 font-bold py-3.5 rounded-xl hover:bg-[#5bc73e] transition-colors flex justify-center items-center gap-2"
                >
                  <i className="fa-solid fa-file-pdf"></i> Download PDF Now
                </button>
              </div>
            )}
            
          </div>
        </div>
      )}

    </section>
  )
}