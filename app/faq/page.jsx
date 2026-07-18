'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Plus, Minus, HelpCircle } from 'lucide-react'
import ContactModal from '@/components/home/ContactModal' // Make sure this path matches your folder structure
import { faqApi } from '@/lib/api'

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

// --- FAQ SKELETON LOADER ---
const FaqSkeleton = () => (
  <div className="border border-zinc-800 rounded-3xl p-6 md:p-8 bg-zinc-900/10 animate-pulse space-y-4">
    <div className="flex justify-between items-center">
      <div className="h-6 bg-zinc-800/85 rounded w-2/3" />
      <div className="w-10 h-10 rounded-full bg-zinc-800/85 shrink-0" />
    </div>
  </div>
)

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  // --- LIVE DATA & PAGINATION STATES ---
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const debounceRef = useRef(null)

  const fetchFaqs = useCallback(async (search, pageNum) => {
    try {
      const params = { page: pageNum, limit: 6 }
      if (search && search.trim()) {
        params.search = search.trim()
      }

      const response = await faqApi.list(params)
      
      let listData = []
      let totalPages = 1

      if (response && response.items) {
        listData = response.items
        totalPages = response.totalPages || 1
      } else if (Array.isArray(response)) {
        listData = response
      }

      setHasMore(pageNum < totalPages && listData.length > 0)

      if (pageNum === 1) {
        setFaqs(listData)
      } else {
        setFaqs(prev => {
          const existingIds = new Set(prev.map(f => f.id))
          const uniqueNew = listData.filter(f => !existingIds.has(f.id))
          return [...prev, ...uniqueNew]
        })
      }
    } catch (error) {
      console.error('Failed to fetch FAQs:', error)
      if (pageNum === 1) setFaqs([])
      setHasMore(false)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      await fetchFaqs(searchTerm, 1)
      setLoading(false)
    }
    init()
  }, [fetchFaqs])

  // Scrolling Intersection Observer
  const observerRef = useRef()
  const lastElementRef = useCallback(node => {
    if (typeof window === 'undefined') return
    if (loading || searching) return
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => {
          const nextPage = prev + 1
          fetchFaqs(searchTerm, nextPage)
          return nextPage
        })
      }
    })

    if (node) observerRef.current.observe(node)
  }, [loading, searching, hasMore, searchTerm, fetchFaqs])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    if (debounceRef.current) clearTimeout(debounceRef.current)

    setSearching(true)
    debounceRef.current = setTimeout(async () => {
      setPage(1)
      setHasMore(true)
      setLoading(true)
      await fetchFaqs(value, 1)
      setLoading(false)
      setSearching(false)
    }, 400)
  }

  const handleClearSearch = async () => {
    setSearchTerm('')
    setPage(1)
    setHasMore(true)
    setLoading(true)
    await fetchFaqs('', 1)
    setLoading(false)
  }

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

        {/* Search Input */}
        <div className="mb-14 flex justify-center">
          <div className="relative w-full ">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-10 py-3 rounded-full text-sm bg-zinc-900/50 border border-zinc-800 focus:border-[#6EDD4D] focus:ring-1 focus:ring-[#6EDD4D] text-white placeholder-zinc-500 outline-none transition-all"
            />
            {searching ? (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-zinc-300 border-t-[#6EDD4D] rounded-full animate-spin" />
            ) : (
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">🔍</span>
            )}
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {loading && page === 1 ? (
          <div className="space-y-4">
            {[1, 2, 3].map(n => <FaqSkeleton key={n} />)}
          </div>
        ) : (
          <>
            {/* FAQ Accordion List */}
            <div className="space-y-4">
              {faqs.map((item, index) => {
                const isOpen = activeIndex === index;
                
                return (
                  <AnimatedSection 
                    key={item.id || index} 
                    animationClass="opacity-0 translate-y-8" 
                    delay={(index % 6) * 50}
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
                        <div className="text-zinc-400 text-base md:text-lg leading-relaxed border-t border-zinc-800/50">
                            <div className="px-6 md:px-8 pb-4 pt-6">
                                {item.a}
                            </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>

            {/* Infinite Scroll target observer element */}
            {hasMore && !loading && !searching && (
              <div ref={lastElementRef} className="space-y-4 mt-4">
                {[1, 2].map(n => <FaqSkeleton key={n} />)}
              </div>
            )}

            {faqs.length === 0 && (
              <div className="text-center py-20 text-zinc-500">
                No FAQs found.
              </div>
            )}
          </>
        )}

        {/* Professional Contact Support Footer */}
        <AnimatedSection animationClass="opacity-0 translate-y-10" delay={400}>
            <div className="mt-32 p-12 bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-[2.5rem] text-center max-w-3xl mx-auto">
                <HelpCircle className="text-[#6EDD4D] mx-auto mb-6" size={48} />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Still have questions?</h2>
                <p className="text-zinc-500 mb-8">
                    If you couldn&apos;t find the answer you were looking for, our support team is ready to assist you directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

      {isContactModalOpen && (
        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
        />
      )}

    </main>
  )
}