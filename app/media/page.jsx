'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  MapPin,
  Maximize2,
  Zap,
  ChevronLeft,
  ChevronRight,
  Search,
  Pin // Imported the Pin icon
} from 'lucide-react'

import { mediaProjects, blogPosts, achievements } from "@/app/data/portfolioData"

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

// --- NESTED IMAGE CAROUSEL COMPONENT ---
const CardCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const validImages = images.filter(img => img && img.trim() !== "")

  if (validImages.length === 0) {
    return <div className="relative aspect-[16/10] bg-zinc-200 dark:bg-zinc-800" />
  }

  const next = (e) => {
    e.preventDefault(); e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % validImages.length)
  }

  const prev = (e) => {
    e.preventDefault(); e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length)
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-200 dark:bg-zinc-950 group/carousel">
      {validImages.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="Portfolio item view"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${i === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
        />
      ))}

      {validImages.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-20">
            <button onClick={prev} className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-[#6EDD4D] hover:text-black transition-all">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-[#6EDD4D] hover:text-black transition-all">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {validImages.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-4 bg-[#6EDD4D]' : 'w-1.5 bg-white/30'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// --- INDIVIDUAL PORTFOLIO CARD ---
const PortfolioCard = ({ item, isPinned, onTogglePin }) => {
  const targetRoute = item.type === 'achievements' ? 'achievements' : 'blog';

  return (
    <div className="group h-full w-full flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[#6EDD4D]/40 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(110,221,77,0.05)] relative">

      {/* Dynamic Pin Action Button on Card Corner */}
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onTogglePin(item.id)
        }}
        className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:scale-110 transition-all"
      >
        <Pin size={14} className={isPinned ? "fill-[#6EDD4D] text-[#6EDD4D]" : "text-white"} />
      </button>

      <Link href={`/${targetRoute}/${item.id}`} className="flex flex-col flex-grow cursor-pointer">
        <CardCarousel images={item.images || [item.image]} />

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
              {item.category || (item.type === 'achievements' ? 'Award' : 'Blog')}
            </span>
            {item.date && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                {item.date}
              </span>
            )}
          </div>

          <div className="h-[48px] mb-2">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-[#6EDD4D] transition-colors leading-snug line-clamp-2">
              {item.title || item.name}
            </h3>
          </div>

          <div className="h-[40px] mb-5 overflow-hidden group-hover:h-auto">
            <p className="text-zinc-600 dark:text-zinc-300 text-sm font-semibold leading-relaxed line-clamp-2 group-hover:line-clamp-none group-hover:max-h-32 group-hover:overflow-y-auto">
              {item.description}
            </p>
          </div>

          {(item.scope || item.content) && (
            <div className="mb-6 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 h-[90px] flex flex-col justify-center mt-auto overflow-hidden group-hover:h-auto">
              <div className="flex items-center gap-2 mb-1.5 text-[#6EDD4D]">
                <Zap size={12} fill="currentColor" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Details</span>
              </div>
              <p className="text-zinc-700 dark:text-zinc-200 text-xs font-semibold leading-relaxed line-clamp-2 group-hover:line-clamp-none group-hover:max-h-32 group-hover:overflow-y-auto">
                {item.scope || item.content}
              </p>
            </div>
          )}

          {(item.author || item.location) && (
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/50 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white">
                <span className="text-xs font-bold">{item.author || 'Insight'}</span>
              </div>
              {item.location && (
                <div className="flex items-center gap-2 text-zinc-900 dark:text-white">
                  <span className="text-xs font-bold">{item.location}</span>
                  <MapPin size={14} className="text-zinc-500" />
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

// --- ROW WRAPPER ---
const PortfolioRow = ({ items, pinnedIds, onTogglePin }) => {
  const [isVisible, setIsVisible] = useState(false)
  const rowRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(rowRef.current) }
    }, { threshold: 0.1 })
    if (rowRef.current) observer.observe(rowRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={rowRef} className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {items.map((item, i) => {
        // 🔥 Define the uniqueKey right here inside the map loop!
        const uniqueKey = `${item.type}-${item.id}`
        
        return (
          <PortfolioCard 
            key={i} 
            item={item} 
            isPinned={pinnedIds.includes(uniqueKey)}
            onTogglePin={() => onTogglePin(item.id, item.type)}
          />
        )
      })}
    </div>
  )
}

// --- MOBILE BATCH ROW COMPONENT ---
const MobileBatchRow = ({ items, pinnedIds, onTogglePin }) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollContainerRef = useRef(null)

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
        const maxScrollLeft = container.scrollWidth - container.clientWidth
        const currentScroll = container.scrollLeft

        if (currentScroll >= maxScrollLeft - 5) {
          clearInterval(interval)
          container.scrollTo({ left: maxScrollLeft, behavior: 'smooth' })
          return
        }

        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }, 5000)
    }

    startAutoScroll()
    return () => clearInterval(interval)
  }, [items])

  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    if (scrollWidth === clientWidth) {
      setScrollProgress(0)
      return
    }
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100
    setScrollProgress(progress)
  }

  return (
    <div className="relative mb-12 z-10">
      <div className="-mx-6">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory px-6 scroll-pl-6"
        >
          {items.map((item, i) => {
            // 🔥 Define the uniqueKey right here inside the mobile map loop too!
            const uniqueKey = `${item.type}-${item.id}`
            
            return (
              <AnimatedSection
                key={i}
                animationClass="opacity-0 translate-y-12"
                delay={(i % 3) * 100}
                className="snap-start shrink-0 w-[85vw] max-w-[320px] flex"
              >
                <PortfolioCard 
                  item={item} 
                  isPinned={pinnedIds.includes(uniqueKey)}
                  onTogglePin={() => onTogglePin(item.id, item.type)}
                />
              </AnimatedSection>
            )
          })}
        </div>
      </div>

      <div className="flex justify-center items-center mt-2">
        <div className="w-24 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full w-1/3 bg-[#6EDD4D] rounded-full transition-transform duration-150 ease-out"
            style={{ transform: `translateX(${scrollProgress * 2}%)` }}
          />
        </div>
      </div>
    </div>
  )
}

// --- MAIN PORTFOLIO COMPONENT ---
export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('media')
  const [searchTerm, setSearchTerm] = useState('')
  const [pinnedIds, setPinnedIds] = useState([])

  // Load pinned IDs from LocalStorage on mount
  useEffect(() => {
    const savedPins = localStorage.getItem('pinned_portfolio_items')
    if (savedPins) {
      setPinnedIds(JSON.parse(savedPins))
    }
  }, [])

  // Toggle Pinned status logic handler
  const handleTogglePin = (id, type) => {
    // Create a completely unique key combined of type and id
    const uniqueKey = `${type}-${id}`
    let updatedPins

    if (pinnedIds.includes(uniqueKey)) {
      // Unpin: Remove unique key from list
      updatedPins = pinnedIds.filter(pId => pId !== uniqueKey)
    } else {
      // Pin: Push unique key to the end of the historical queue
      updatedPins = [...pinnedIds, uniqueKey]
    }

    setPinnedIds(updatedPins)
    localStorage.setItem('pinned_portfolio_items', JSON.stringify(updatedPins))
  }

  // Resolves and forces pinned items to index position 0
  const getActiveData = () => {
    let baseData = []

    switch (activeTab) {
      case 'media':
        const typedBlogs = (blogPosts || []).map(b => ({ ...b, type: 'blog' }))
        const typedAwards = (achievements || []).map(a => ({ ...a, type: 'achievements' }))
        baseData = [...typedBlogs, ...typedAwards]
        break
      case 'blog':
        baseData = (blogPosts || []).map(b => ({ ...b, type: 'blog' }))
        break
      case 'achievements':
        baseData = (achievements || []).map(a => ({ ...a, type: 'achievements' }))
        break
      default:
        baseData = []
    }

    return [...baseData].sort((a, b) => {
      // Generate the unique keys to compare against the pinned array
      const keyA = `${a.type}-${a.id}`
      const keyB = `${b.type}-${b.id}`

      const indexA = pinnedIds.indexOf(keyA)
      const indexB = pinnedIds.indexOf(keyB)

      const isAPinned = indexA !== -1
      const isBPinned = indexB !== -1

      if (isAPinned && isBPinned) {
        return indexA - indexB // Maintain precise pin selection order
      }

      if (isAPinned) return -1
      if (isBPinned) return 1

      return 0
    })
  }




  const filteredItems = getActiveData().filter((item) => {
    const titleText = (item.title || item.name || '').toLowerCase()
    const descText = (item.description || '').toLowerCase()
    return titleText.includes(searchTerm.toLowerCase()) || descText.includes(searchTerm.toLowerCase())
  })

  const desktopRows = []
  for (let i = 0; i < filteredItems.length; i += 3) {
    desktopRows.push(filteredItems.slice(i, i + 3))
  }

  const mobileChunks = []
  for (let i = 0; i < filteredItems.length; i += 5) {
    mobileChunks.push(filteredItems.slice(i, i + 5))
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans pb-22 overflow-x-hidden relative">
      <div className="container mx-auto max-w-7xl px-6 pt-14">
        <div className="mb-14 flex flex-col md:flex-row gap-5 justify-between items-center">

          <div className="relative w-full md:w-[350px] group">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2 text-sm rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-[280px] h-[38px] rounded-full bg-white/90 dark:bg-zinc-950/30 border border-[#6EDD4D]/20 overflow-hidden flex p-[3px]">
              <div
                className={`absolute top-[3px] h-[32px] rounded-full bg-[#6EDD4D] transition-all duration-300 ease-out ${activeTab === 'media' ? 'left-[3px] w-[88px]' :
                    activeTab === 'blog' ? 'left-[93px] w-[88px]' : 'left-[184px] w-[93px]'
                  }`}
              />
              <button onClick={() => { setActiveTab('media'); setSearchTerm('') }} className={`relative z-10 flex-1 text-[11px] font-black uppercase ${activeTab === 'media' ? 'text-black' : 'text-zinc-400'}`}>Media</button>
              <button onClick={() => { setActiveTab('blog'); setSearchTerm('') }} className={`relative z-10 flex-1 text-[11px] font-black uppercase ${activeTab === 'blog' ? 'text-black' : 'text-zinc-400'}`}>Blog</button>
              <button onClick={() => { setActiveTab('achievements'); setSearchTerm('') }} className={`relative z-10 flex-1 text-[11px] font-black uppercase ${activeTab === 'achievements' ? 'text-black' : 'text-zinc-400'}`}>Achievements</button>
            </div>
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:flex flex-col gap-12">
          {desktopRows.map((row, idx) => (
            <PortfolioRow key={idx} items={row} pinnedIds={pinnedIds} onTogglePin={handleTogglePin} />
          ))}
        </div>

        {/* MOBILE VIEW */}
        <div className="md:hidden flex flex-col">
          {mobileChunks.map((chunk, idx) => (
            <MobileBatchRow key={idx} items={chunk} pinnedIds={pinnedIds} onTogglePin={handleTogglePin} />
          ))}
        </div>
      </div>
    </main>
  )
}