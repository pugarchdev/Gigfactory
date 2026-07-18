/* eslint-disable react-hooks/static-components */
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { expertiseApi } from '@/lib/api'

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

// --- EXPERTISE SKELETON LOADER ---
const ExpertiseSkeleton = () => (
  <div className="w-full flex flex-col rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/10 backdrop-blur-xl overflow-hidden animate-pulse h-[500px] justify-between">
    <div className="space-y-6">
      {/* Video/Image area */}
      <div className="aspect-video w-full bg-zinc-200 dark:bg-zinc-800" />
      
      <div className="p-8 space-y-4">
        {/* Title */}
        <div className="h-6 bg-zinc-200 dark:bg-zinc-850 rounded w-2/3" />
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-850 rounded w-full" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-850 rounded w-5/6" />
        </div>
      </div>
    </div>

    {/* Points */}
    <div className="p-8 pt-0 space-y-3">
      <div className="h-4 bg-zinc-200 dark:bg-zinc-850 rounded w-3/4" />
      <div className="h-4 bg-zinc-200 dark:bg-zinc-850 rounded w-1/2" />
    </div>
  </div>
)

export default function OurExpertise() {
  const [expertiseItems, setExpertiseItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const data = await expertiseApi.list()
        setExpertiseItems(data || [])
      } catch (error) {
        console.error('Failed to fetch expertise:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchExpertise()
  }, [])

  // Define preferred order for categories (exact matches we want to prioritize)
  const preferredOrder = ["BIM Services", "BIM Consulting", "Other Services"]

  // Get unique categories and sort them robustly
  const categories = Array.from(new Set(expertiseItems.map(item => item.category)))
    .filter(Boolean) // Remove any empty/null categories
    .sort((a, b) => {
      // Find index in preferredOrder by normalizing both strings
      const indexA = preferredOrder.findIndex(p => p.toLowerCase().trim() === a.toLowerCase().trim())
      const indexB = preferredOrder.findIndex(p => p.toLowerCase().trim() === b.toLowerCase().trim())

      // If both are in preferredOrder, sort by index
      if (indexA !== -1 && indexB !== -1) return indexA - indexB
      // If only one is in preferredOrder, that one comes first
      if (indexA !== -1) return -1
      if (indexB !== -1) return 1
      // If neither are in preferredOrder, sort alphabetically
      return a.trim().localeCompare(b.trim())
    })

  // --- UPDATED SERVICE SECTION WITH SLIDER LOGIC & MOBILE TAP STATE ---
  const ServiceSection = ({ title, items, id }) => {
    const [scrollProgress, setScrollProgress] = useState(0)
    // Tracks which card is tapped on mobile
    const [activeCard, setActiveCard] = useState(null)
    const scrollContainerRef = useRef(null)

    // 🔥 AUTO SCROLL (ADD HERE)
    useEffect(() => {
      const container = scrollContainerRef.current
      if (!container) return

      let interval

      const startAutoScroll = () => {
        interval = setInterval(() => {
          const firstCard = container.children[0]

          if (!firstCard) return

          const cardWidth = firstCard.offsetWidth
          const gap = 16
          const scrollAmount = cardWidth + gap

          const maxScrollLeft =
            container.scrollWidth - container.clientWidth

          const currentScroll = container.scrollLeft

          // 🔥 STOP AT LAST CARD
          if (currentScroll >= maxScrollLeft - 5) {
            clearInterval(interval)

            container.scrollTo({
              left: maxScrollLeft,
              behavior: 'smooth'
            })

            return
          }

          container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          })
        }, 5000)
      }

      startAutoScroll()

      return () => clearInterval(interval)
    }, [items])
    const updateScrollState = useCallback(() => {
      if (!scrollContainerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      if (scrollWidth <= clientWidth) {
        setScrollProgress(-1);
        return;
      }
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }, []);

    const handleScroll = () => {
      updateScrollState();
    };

    useEffect(() => {
      const timer = setTimeout(() => {
        updateScrollState();
      }, 100);
      return () => clearTimeout(timer);
    }, [items, updateScrollState]);

    useEffect(() => {
      window.addEventListener('resize', updateScrollState);
      return () => window.removeEventListener('resize', updateScrollState);
    }, [updateScrollState]);

    return (
      <div id={id} className="mb-24 scroll-mt-24">
        <div className="flex justify-center mb-12 md:mb-16 px-6">
          <AnimatedSection
            animationClass="opacity-0 scale-50 translate-y-10"
            className="w-full flex items-center justify-center gap-4 md:gap-10"
          >
            <div className="hidden sm:block h-[1px] flex-grow bg-gradient-to-r from-transparent to-zinc-300 dark:to-zinc-800"></div>

            <div className="flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter text-center">
                {title}
              </h2>
              <div className="mt-4 h-1 w-24 bg-[#6EDD4D] rounded-full shadow-[0_0_15px_rgba(110,221,77,0.4)]"></div>
            </div>

            <div className="hidden sm:block h-[1px] flex-grow bg-gradient-to-l from-transparent to-zinc-300 dark:to-zinc-800"></div>
          </AnimatedSection>
        </div>

        <div className="relative">
          <div className="-mx-6">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-4 md:gap-8 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory px-6 scroll-pl-6 md:grid md:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((service, index) => {
                // Check if this specific card is active
                const isActive = activeCard === index;

                return (
                  <AnimatedSection
                    key={index}
                    animationClass="opacity-0 translate-y-12"
                    delay={index * 100}
                    className="snap-start shrink-0 w-[85vw] max-w-[320px] md:max-w-none md:w-auto h-full"
                  >
                    <div
                      // Toggle active state on tap. Removed router navigation.
                      onClick={() => setActiveCard(isActive ? null : index)}
                      // We use lg:hover classes for desktop, and explicit active classes for mobile tap
                      className={`h-full group relative flex flex-col rounded-[2.5rem] border bg-white dark:bg-zinc-900/40 backdrop-blur-xl overflow-hidden transition-all duration-500 cursor-pointer lg:hover:border-[#6EDD4D]/50 lg:hover:shadow-[0_0_40px_rgba(110,221,77,0.1)] ${isActive ? 'border-[#6EDD4D]/50 shadow-[0_0_40px_rgba(110,221,77,0.1)]' : 'border-zinc-200 dark:border-zinc-800'
                        }`}
                    >
                      <div className="aspect-video w-full overflow-hidden bg-zinc-200 dark:bg-zinc-950 relative">
                        {service.video ? (
                          <video
                            autoPlay loop muted playsInline
                            className={`w-full h-full object-cover transition-transform duration-700 lg:group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}
                          >
                            <source src={service.video} type="video/mp4" />
                          </video>
                        ) : (
                          <img
                            src={service.image || '/assets/GIG.png'}
                            alt={service.name}
                            className={`w-full h-full object-cover transition-transform duration-700 lg:group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}
                          />
                        )}
                        <div className={`absolute inset-0 bg-[#6EDD4D]/10 transition-opacity duration-500 lg:group-hover:opacity-100 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                      </div>

                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 lg:group-hover:text-[#6EDD4D] ${isActive ? 'text-[#6EDD4D]' : 'text-zinc-900 dark:text-white'}`}>
                          {service.name}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                          {service.description}
                        </p>

                        <ul className="mt-auto space-y-3">
                          {service.points?.map((item, i) => (
                            <li key={i} className="flex items-center text-sm text-zinc-700 dark:text-zinc-300">
                              <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#6EDD4D]/10 text-[10px] text-[#6EDD4D]">
                                ✔
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>

          {/* MOBILE SLIDER INDICATOR (Hidden on tablet/desktop grids) */}
          <div className="md:hidden flex justify-center items-center mt-2">
            <div className="w-24 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#6EDD4D] rounded-full transition-transform duration-150 ease-out"
                style={{
                  width: scrollProgress === -1 ? '100%' : '33.33%',
                  transform: scrollProgress === -1 ? 'none' : `translateX(${scrollProgress * 2}%)`
                }}
              />
            </div>
          </div>

        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen text-zinc-900 dark:text-zinc-100 font-sans selection:bg-[#6EDD4D]/30 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="relative z-10">
        <header className="py-24 md:py-12 px-6 text-center border-b border-zinc-200 dark:border-zinc-900 backdrop-blur-md mb-16 mt-[-40px] md:mt-[-80px]">
          <div className="container mx-auto pt-20">
            <AnimatedSection animationClass="opacity-0 translate-y-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#6EDD4D]/10 border border-[#6EDD4D]/20 text-[#6EDD4D] text-xs font-bold uppercase tracking-widest mb-6">
                Our Expertise
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-6 tracking-tighter">
                World-Class <span className="text-[#6EDD4D]">BIM Solutions</span>
              </h1>
              <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed">
                From high-precision 3D modeling to strategic consulting, we deliver integrated intelligence for complex construction projects worldwide.
              </p>
            </AnimatedSection>
          </div>
        </header>

        <div className="container mx-auto px-6 ">
          {loading ? (
            <div className="space-y-20 relative z-10">
              {[1, 2].map((catIndex) => (
                <div key={catIndex} className="mb-24">
                  {/* Category Title Skeleton */}
                  <div className="flex justify-center mb-12 md:mb-16 px-6">
                    <div className="flex flex-col items-center animate-pulse">
                      <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded w-48 mb-4" />
                      <div className="h-1 w-24 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                    </div>
                  </div>
                  {/* Category Items Skeleton Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((n) => (
                      <ExpertiseSkeleton key={n} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {categories.map((category) => {
                const items = expertiseItems.filter(item => item.category === category)
                const id = category.toLowerCase().replace(/\s+/g, '-')
                return (
                  <ServiceSection
                    key={category}
                    title={category}
                    items={items}
                    id={id}
                  />
                )
              })}
              {expertiseItems.length === 0 && (
                <div className="text-center py-20 text-zinc-500 dark:text-zinc-400">No expertise items found.</div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}