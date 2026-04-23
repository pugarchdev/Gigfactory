'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Building2, Home, Factory, HeartPulse, GraduationCap, Ship, Zap, Network, ShoppingBag, Server, MoveRight } from 'lucide-react'
import ContactModal from '@/components/home/ContactModal'
import { caseStudiesApi, enquiryApi } from '@/lib/api'

// --- ANIMATION WRAPPER ---
const AnimatedSection = ({ children, animationClass, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
      className={`transition-all duration-[1000ms] ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : animationClass
        } ${className}`}
    >
      {children}
    </div>
  )
}

// --- ICON MAPPING UTILITY ---
const iconMap = {
  Commercial: <Building2 size={14} />,
  Residential: <Home size={14} />,
  Industrial: <Factory size={14} />,
  Healthcare: <HeartPulse size={14} />,
  Educational: <GraduationCap size={14} />,
  Infrastructure: <Ship size={14} />,
  SmartCity: <Network size={14} />,
  Retail: <ShoppingBag size={14} />,
  ITPark: <Server size={14} />,
  Other: <Building2 size={14} />
}

const getIconForCategory = (category) => {
  return iconMap[category] || iconMap.Other
}

// --- INDIVIDUAL CARD COMPONENT ---
const CaseStudyCard = ({ study, onDownload }) => (
  <div className="group h-full w-full flex flex-col rounded-[1.5rem] border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[#6EDD4D]/40 hover:scale-[1.01]">
    {/* Image */}
    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
      <img
        src={study.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800'}
        alt={study.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* <div className="absolute top-4 left-4">
        <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
          <span className="text-[#6EDD4D]">{getIconForCategory(study.category)}</span>
          {study.category}
        </span>
      </div> */}
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-grow">
      <div className="h-[52px] mb-2">
        <h3 className="text-lg font-bold text-white group-hover:text-[#6EDD4D] transition-colors leading-snug line-clamp-2">
          {study.name}
        </h3>
      </div>

      <div className="h-[40px] mb-5">
        <p className="text-zinc-300 text-sm font-semibold leading-relaxed line-clamp-2">
          {study.features}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {study.features ? study.features.split(',').slice(0, 2).map((feature, i) => (
          <span key={i} className="text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-1.5 line-clamp-1">
            <Zap size={10} className="text-[#6EDD4D]" fill="currentColor" />
            {feature.trim()}
          </span>
        )) : null}
      </div>

      {/* Download Button */}
      <button
        onClick={() => onDownload(study)}
        className="mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest transition-all group-hover:bg-[#6EDD4D] group-hover:text-black"
      >
        Download Case Study
        <i className="fa-solid fa-download text-sm group-hover:-translate-y-0.5 transition-transform"></i>
      </button>
    </div>
  </div>
)

const CaseStudiesListing = () => {
  const router = useRouter()
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  // --- LIVE DATA STATE ---
  const [caseStudies, setCaseStudies] = useState([])
  const [loading, setLoading] = useState(true)

  // --- MODAL & FORM STATE ---
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
  const [selectedStudy, setSelectedStudy] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [pdfLink, setPdfLink] = useState('')

  // --- MOBILE SLIDER STATE ---
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const data = await caseStudiesApi.list()
        setCaseStudies(data)
      } catch (error) {
        console.error('Failed to fetch case studies:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStudies()
  }, [])
  // ✅ AUTO SCROLL EFFECT (ADD HERE)
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const interval = setInterval(() => {
      const cardWidth = container.querySelector('div')?.offsetWidth || 300
      const gap = 16
      const scrollAmount = cardWidth + gap

      const maxScroll = container.scrollWidth - container.clientWidth

      if (container.scrollLeft + scrollAmount >= maxScroll) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [caseStudies])

  // Desktop chunks
  const desktopRows = []
  for (let i = 0; i < caseStudies.length; i += 3) desktopRows.push(caseStudies.slice(i, i + 3))

  // --- HANDLERS ---
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

  const handleOpenModal = (study) => {
    setSelectedStudy(study)
    setIsDownloadModalOpen(true)
    setIsSuccess(false)
    setPdfLink('')
    setFormData({ name: '', email: '', phone: '' })
  }

  const handleCloseModal = () => {
    setIsDownloadModalOpen(false)
    setTimeout(() => setSelectedStudy(null), 300)
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
        message: `Case Study Download Interest (All Page): ${selectedStudy.name}`,
        companyName: 'Individual Lead'
      })

      // 2. Set PDF link from study and set success
      const link = selectedStudy.pdfLink || '#'
      setPdfLink(link)
      setIsSuccess(true)

      // 3. Trigger automatic download
      if (link && link !== '#') {
        handleForceDownload(link, `${selectedStudy.name.replace(/\s+/g, '_')}.pdf`);
      }
    } catch (error) {
      console.error("Error submitting form", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-14 px-6 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection animationClass="opacity-0 -translate-y-10">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              Case <span className="text-[#6EDD4D]">Studies</span>
            </h2>
            <p className="max-w-2xl mx-auto text-zinc-400 text-lg font-semibold leading-relaxed">
              Real construction projects delivered with quality, precision, and efficiency.
            </p>
          </AnimatedSection>
        </div>

        {/* Desktop View (Grid) */}
        <div className="hidden md:flex flex-col gap-12">
          {desktopRows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-3 gap-8">
              {row.map((study) => (
                <AnimatedSection key={study.id} animationClass="opacity-0 translate-y-10" delay={100}>
                  <CaseStudyCard study={study} onDownload={handleOpenModal} />
                </AnimatedSection>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile View (Single Continuous Slider) */}
        <div className="md:hidden relative z-10">
          <div className="-mx-6">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              /* FORCE NATIVE SCROLLBAR TO HIDE USING ARBITRARY VARIANTS */
              className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory px-6 scroll-pl-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {caseStudies.map((study, idx) => (
                <AnimatedSection
                  key={study.id}
                  animationClass="opacity-0 translate-y-12"
                  delay={(idx % 3) * 100}
                  className="snap-start shrink-0 w-[85vw] max-w-[320px] flex"
                >
                  <CaseStudyCard study={study} onDownload={handleOpenModal} />
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* CUSTOM MOBILE SLIDER INDICATOR */}
          <div className="flex justify-center items-center mt-2">
            <div className="w-24 h-1.5 bg-zinc-800 rounded-full relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full w-1/3 bg-[#6EDD4D] rounded-full transition-transform duration-150 ease-out"
                style={{ transform: `translateX(${scrollProgress * 2}%)` }}
              />
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="mt-20 mb-6 px-4">
          <AnimatedSection animationClass="opacity-0 scale-95" delay={200}>
            <div className="relative overflow-hidden bg-[#0a0a0a]/80 backdrop-blur-xl border border-zinc-900 rounded-[3rem] py-12 px-6 text-center group max-w-3xl mx-auto">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-[#6EDD4D]/5 blur-[80px] pointer-events-none rounded-full" />

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-tight relative z-10">
                Ready to move your project forward?
              </h3>

              <div className="flex justify-center relative z-10">
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="bg-[#6EDD4D] text-black font-black px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-white shadow-[0_0_30px_rgba(110,221,77,0.2)] uppercase tracking-widest text-[10px] md:text-xs"
                >
                  Let&apos;s Connect
                  <MoveRight size={18} />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* --- DOWNLOAD MODAL --- */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseModal}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">

            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>

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
                    placeholder="Contact Number"
                    maxLength={10}
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
                <a
                  href={pdfLink}
                  download
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleCloseModal}
                  className="w-full bg-[#6EDD4D] text-zinc-950 font-bold py-3.5 rounded-xl hover:bg-[#5bc73e] transition-colors flex justify-center items-center gap-2"
                >
                  <i className="fa-solid fa-file-pdf"></i> Download PDF Now
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* General Contact Modal Rendering */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        initialStep={1}
      />
    </section>
  )
}

export default CaseStudiesListing