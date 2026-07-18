'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { projectsApi } from '@/lib/api'
import {
  MapPin,
  Maximize2,
  Zap,
  ChevronLeft,
  ChevronRight,
  Search,
  ToggleLeft,
  ToggleRight
} from 'lucide-react'
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
const CardCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = (e) => {
    e.preventDefault(); e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prev = (e) => {
    e.preventDefault(); e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-200 dark:bg-zinc-950 group/carousel">
      {images.filter(img => img && img.trim() !== "").map((img, i) => (
        <img
          key={i}
          src={img}
          alt="Project view"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${i === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-20">
        <button onClick={prev} className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-[#6EDD4D] hover:text-black transition-all">
          <ChevronLeft size={18} />
        </button>
        <button onClick={next} className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-[#6EDD4D] hover:text-black transition-all">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {images.filter(img => img && img.trim() !== "").map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-4 bg-[#6EDD4D]' : 'w-1.5 bg-white/30'}`} />
        ))}
      </div>
    </div>
  )
}

// --- INDIVIDUAL PROJECT CARD ---
const ProjectCard = ({ project }) => (
  <div className="group h-full w-full flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[#6EDD4D]/40 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(110,221,77,0.05)]">

    <CardCarousel images={project.images} />

    <div className="p-6 flex flex-col flex-grow">
      {/* 1. Header Row */}
      <div className="flex justify-between items-start mb-4">
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
          {project.category}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${project.status?.toLowerCase() === 'completed' ? 'text-[#6EDD4D]' : 'text-amber-400'
          }`}>
          {project.status}
        </span>
      </div>

      {/* 2. Title Section */}
      <div className="h-[48px] mb-2">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-[#6EDD4D] transition-colors leading-snug line-clamp-2">
          {project.name}
        </h3>
      </div>

      {/* 3. Description */}
      <div className="h-[40px] mb-5 overflow-hidden group-hover:h-auto">
        <p className="text-zinc-600 dark:text-zinc-300 text-sm font-semibold leading-relaxed line-clamp-2 group-hover:line-clamp-none group-hover:max-h-32 group-hover:overflow-y-auto">
          {project.description}
        </p>
      </div>

      {/* 4. Scope Box */}
      <div className="mb-6 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 h-[90px] flex flex-col justify-center mt-auto overflow-hidden group-hover:h-auto">        <div className="flex items-center gap-2 mb-1.5 text-[#6EDD4D]">
        <Zap size={12} fill="currentColor" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Scope</span>
      </div>
        <p className="text-zinc-700 dark:text-zinc-200 text-xs font-semibold leading-relaxed line-clamp-2 group-hover:line-clamp-none group-hover:max-h-32 group-hover:overflow-y-auto">          {project.scope}
        </p>
      </div>

      {/* 5. Footer Row */}
      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-white">
          <Maximize2 size={14} className="text-[#6EDD4D]" />
          <span className="text-xs font-bold">{project.area}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-900 dark:text-white">
          <span className="text-xs font-bold">{project.location}</span>
          <MapPin size={14} className="text-zinc-500" />
        </div>
      </div>
    </div>
  </div>
)

// --- PROJECT SKELETON LOADER ---
const ProjectSkeleton = () => (
  <div className="bg-zinc-150/45 dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 animate-pulse h-[400px] flex flex-col justify-between">
    <div className="space-y-4">
      {/* Image space */}
      <div className="aspect-[16/10] bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
      {/* Category / Status row */}
      <div className="flex justify-between">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 w-1/4 rounded" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 w-1/5 rounded" />
      </div>
      {/* Title */}
      <div className="h-6 bg-zinc-200 dark:bg-zinc-800 w-3/4 rounded" />
      {/* Description */}
      <div className="space-y-2">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 w-5/6 rounded" />
      </div>
    </div>
    {/* Footer row */}
    <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-xl mt-4" />
  </div>
);

// --- ROW WRAPPER (For both Desktop & Mobile Stacked Views) ---
const ProjectRow = ({ projects }) => {
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
      {projects.map((p, i) => <ProjectCard key={i} project={p} />)}
    </div>
  )
}

export default function Projects() {
  const [projects, setProjects]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [searching, setSearching]     = useState(false);
  const [searchTerm, setSearchTerm]   = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [page, setPage]               = useState(1);
  const [hasMore, setHasMore]         = useState(true);

  const debounceRef = useRef(null);

  /* ──────────────────────────────────────────
     Core fetch — called with current params
  ────────────────────────────────────────── */
  const fetchProjects = useCallback(async (status, search, pageNum) => {
    try {
      const params = { page: pageNum, limit: 6 };
      if (status) params.status = status;
      if (search && search.trim()) params.search = search.trim();

      const response = await projectsApi.list(params);
      
      let listData = [];
      let totalPages = 1;
      
      if (response && response.data) {
        listData = response.data;
        totalPages = response.pagination?.totalPages || 1;
      } else if (Array.isArray(response)) {
        listData = response;
      }

      setHasMore(pageNum < totalPages && listData.length > 0);

      if (pageNum === 1) {
        setProjects(listData);
      } else {
        setProjects(prev => {
          // Avoid duplicates by ID
          const existingIds = new Set(prev.map(p => p.id));
          const uniqueNew = listData.filter(p => !existingIds.has(p.id));
          return [...prev, ...uniqueNew];
        });
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      if (pageNum === 1) setProjects([]);
      setHasMore(false);
    }
  }, []);

  /* ──────────────────────────────────────────
     Initial load
  ────────────────────────────────────────── */
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchProjects(statusFilter, searchTerm, 1);
      setLoading(false);
    };
    init();
  }, [statusFilter, fetchProjects]);

  /* ──────────────────────────────────────────
     Scrolling Intersection Observer
  ────────────────────────────────────────── */
  const observerRef = useRef();
  const lastElementRef = useCallback(node => {
    if (typeof window === 'undefined') return;
    if (loading || searching) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => {
          const nextPage = prev + 1;
          fetchProjects(statusFilter, searchTerm, nextPage);
          return nextPage;
        });
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [loading, searching, hasMore, statusFilter, searchTerm, fetchProjects]);

  /* ──────────────────────────────────────────
     Filter action resets page and loads page 1
  ────────────────────────────────────────── */
  const handleStatusFilterChange = async (status) => {
    setStatusFilter(status);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    await fetchProjects(status, searchTerm, 1);
    setLoading(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    setSearching(true);
    debounceRef.current = setTimeout(async () => {
      setPage(1);
      setHasMore(true);
      setLoading(true);
      await fetchProjects(statusFilter, value, 1);
      setLoading(false);
      setSearching(false);
    }, 400);
  };

  // Split into chunks of 3 for desktop rows
  const desktopRows = [];
  for (let i = 0; i < projects.length; i += 3) {
    desktopRows.push(projects.slice(i, i + 3));
  }

  return (
    <main className="min-h-screen  text-zinc-900 dark:text-zinc-100 font-sans selection:bg-[#6EDD4D]/30 pb-22 overflow-x-hidden relative">

      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <header className="py-14 px-6 text-center border-b border-zinc-200 dark:border-zinc-900 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md mb-8 relative z-10">
        <div className="container mx-auto">
          <AnimatedSection animationClass="opacity-0 translate-y-10" delay={0}>
            <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-6 tracking-tighter">
              Project <span className="text-[#6EDD4D]">Portfolio</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection animationClass="opacity-0 translate-y-10" delay={150}>
            <p className="max-w-2xl mx-auto text-zinc-650 dark:text-zinc-400 text-lg">
              Delivered across 10+ million sq.ft of construction projects worldwide.
            </p>
          </AnimatedSection>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col md:flex-row gap-5 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-10 py-3 rounded-full text-sm bg-white dark:bg-black/50 border border-zinc-350 dark:border-zinc-800 focus:border-[#6EDD4D] focus:ring-1 focus:ring-[#6EDD4D] text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition-all"
            />
            {searching ? (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-zinc-300 border-t-[#6EDD4D] rounded-full animate-spin" />
            ) : (
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 text-sm">🔍</span>
            )}
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  handleStatusFilterChange(statusFilter);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-450 hover:text-zinc-600 dark:hover:text-white font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div
              className="
                relative w-[180px] h-[38px]
                rounded-full
                bg-white/90 dark:bg-zinc-950/30
                border border-[#6EDD4D]/20
                overflow-hidden
                backdrop-blur-xl
                hover:opacity-100
                transition-all duration-500
                group
              "
            >
              {statusFilter && (
                <div
                  className={`
                    absolute top-[3px]
                    w-[85px] h-[32px]
                    rounded-full
                    bg-[#6EDD4D]
                    shadow-[0_0_18px_rgba(110,221,77,0.25)]
                    transition-all duration-500
                    ${statusFilter === 'ongoing' ? 'left-[3px]' : 'left-[92px]'}
                  `}
                />
              )}

              <button
                onClick={() => handleStatusFilterChange('ongoing')}
                className={`
                  relative z-10 w-1/2 h-full text-[11px] font-black uppercase transition-all duration-300
                  ${statusFilter === 'ongoing'
                    ? 'text-black'
                    : 'text-zinc-650 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }
                `}
              >
                Ongoing
              </button>

              <button
                onClick={() => handleStatusFilterChange('completed')}
                className={`
                  relative z-10 w-1/2 h-full text-[11px] font-black uppercase transition-all duration-300
                  ${statusFilter === 'completed'
                    ? 'text-black'
                    : 'text-zinc-655 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }
                `}
              >
                Complete
              </button>
            </div>

            {statusFilter && (
              <button
                onClick={() => handleStatusFilterChange(null)}
                className="
                  px-3 h-[38px]
                  rounded-full
                  border border-zinc-300 dark:border-zinc-700
                  text-zinc-600 dark:text-zinc-400
                  text-[11px] font-bold uppercase
                  hover:border-[#6EDD4D]
                  hover:text-[#6EDD4D]
                  transition-all
                "
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {loading || searching ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[1, 2, 3].map(n => <ProjectSkeleton key={n} />)}
          </div>
        ) : (
          <>
            {/* Projects list — responsive grid stacks vertically on mobile */}
            <div className="flex flex-col gap-12 relative z-10">
              {desktopRows.map((row, idx) => <ProjectRow key={idx} projects={row} />)}
            </div>

            {/* Infinite Scroll target observer element */}
            {hasMore && !loading && !searching && (
              <div ref={lastElementRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative z-10">
                {[1, 2, 3].map(n => <ProjectSkeleton key={n} />)}
              </div>
            )}

            {projects.length === 0 && (
              <div className="text-center py-20 text-zinc-500 dark:text-zinc-400 relative z-10">No projects found.</div>
            )}
          </>
        )}
      </div>

    </main>
  )
}