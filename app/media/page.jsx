"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { mediaApi } from '@/lib/api';

const stripHtml = (html) => (html || '').replace(/<[^>]*>/g, '');

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
};

const TABS = [
  { id: 'all',         label: 'All Media' },
  { id: 'blog',        label: 'Blogs' },
  { id: 'achievement', label: 'Achievement' },
];

// --- REUSABLE ANIMATION WRAPPER ---
const AnimatedSection = ({ children, animationClass, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      },
      { threshold: 0.1 }
    );
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

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
  );
};

// --- MEDIA SKELETON LOADER ---
const MediaSkeleton = () => (
  <div className="bg-zinc-150/40 dark:bg-zinc-900/10 border border-zinc-200 dark:border-zinc-800/80 rounded-[2rem] p-6 animate-pulse h-96 flex flex-col justify-between">
    <div className="space-y-4">
      <div className="h-40 bg-zinc-200 dark:bg-zinc-800 rounded-[1.5rem]" />
      <div className="h-6 bg-zinc-200 dark:bg-zinc-800 w-1/3 rounded-md" />
      <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
      <div className="h-16 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
    </div>
    <div className="h-10 bg-zinc-200 dark:bg-zinc-800 w-1/2 rounded-full mt-4" />
  </div>
);

export default function MediaHub() {
  const [items, setItems]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [searching, setSearching]   = useState(false);
  const [activeTab, setActiveTab]   = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage]             = useState(1);
  const [hasMore, setHasMore]       = useState(true);

  // Debounce ref for search queries
  const debounceRef = useRef(null);

  /* ──────────────────────────────────────────
     Core fetch — called with current params
     Loads 6 items per page
  ────────────────────────────────────────── */
  const fetchMedia = useCallback(async (type, search, pageNum) => {
    try {
      const params = { page: pageNum, limit: 6 };
      if (type && type !== 'all') params.type = type;
      if (search && search.trim()) params.search = search.trim();

      const response = await mediaApi.list(params);
      
      // Handle array structure from server envelope (standardized backend returns { data, total, page, limit })
      const fetchedItems = response.data || (Array.isArray(response) ? response : []);
      const total = response.total !== undefined ? response.total : fetchedItems.length;

      // Determine hasMore based on total and current items length
      const calculatedHasMore = pageNum * 6 < total;
      setHasMore(calculatedHasMore);

      if (pageNum === 1) {
        setItems(fetchedItems);
      } else {
        setItems(prev => {
          const existingSlugs = new Set(prev.map(p => p.slug));
          const uniqueNew = fetchedItems.filter(p => !existingSlugs.has(p.slug));
          return [...prev, ...uniqueNew];
        });
      }
    } catch (err) {
      console.error("Failed to load media:", err);
      setHasMore(false);
      if (pageNum === 1) {
        setItems([]);
      }
    }
  }, []);

  /* ──────────────────────────────────────────
     Initial load
  ────────────────────────────────────────── */
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchMedia('all', '', 1);
      setLoading(false);
    };
    init();
  }, [fetchMedia]);

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
          fetchMedia(activeTab, searchQuery, nextPage);
          return nextPage;
        });
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loading, searching, hasMore, activeTab, searchQuery, fetchMedia]);

  /* ──────────────────────────────────────────
     Tab change — resets pagination and triggers fetch
  ────────────────────────────────────────── */
  const handleTabChange = async (tabId) => {
    setActiveTab(tabId);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    await fetchMedia(tabId, searchQuery, 1);
    setLoading(false);
  };

  /* ──────────────────────────────────────────
     Search change — debounced 400ms callback
  ────────────────────────────────────────── */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    setSearching(true);
    debounceRef.current = setTimeout(async () => {
      setPage(1);
      setHasMore(true);
      await fetchMedia(activeTab, value, 1);
      setSearching(false);
    }, 400);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setPage(1);
    setHasMore(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearching(true);
    fetchMedia(activeTab, '', 1).then(() => setSearching(false));
  };

  return (
    <div className="min-h-screen py-12 md:py-20 relative overflow-hidden bg-zinc-50 dark:bg-[#050505] transition-colors duration-500">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/10 w-[400px] h-[400px] bg-neon-green/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-neon-green/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedSection animationClass="opacity-0 translate-y-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6 leading-tight">
              Insights & <span className="text-[#6EDD4D]">Media</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-650 dark:text-zinc-400 font-medium">
              Discover our latest thoughts on construction technology, BIM processes, and key achievements driving the industry forward.
            </p>
          </AnimatedSection>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 p-6 bg-zinc-100/50 dark:bg-zinc-900/20 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-[2rem]">
          
          {/* Tab Selector — sliding pill design, same as projects page */}
          <div className="relative w-[270px] h-[38px] rounded-full bg-zinc-200/60 dark:bg-zinc-950/30 border border-[#6EDD4D]/20 overflow-hidden backdrop-blur-xl shrink-0">
            <div
              className={`absolute top-[3px] w-[86px] h-[32px] rounded-full bg-[#6EDD4D] shadow-[0_0_18px_rgba(110,221,77,0.25)] transition-all duration-500
                ${activeTab === 'all' ? 'left-[3px]' : ''}
                ${activeTab === 'blog' ? 'left-[91px]' : ''}
                ${activeTab === 'achievement' ? 'left-[179px]' : ''}
              `}
            />

            <button
              onClick={() => handleTabChange('all')}
              className={`relative z-10 w-1/3 h-full text-[10px] font-black uppercase tracking-wider transition-all duration-300
                ${activeTab === 'all'
                  ? 'text-black'
                  : 'text-zinc-650 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }
              `}
            >
              All Media
            </button>

            <button
              onClick={() => handleTabChange('blog')}
              className={`relative z-10 w-1/3 h-full text-[10px] font-black uppercase tracking-wider transition-all duration-300
                ${activeTab === 'blog'
                  ? 'text-black'
                  : 'text-zinc-650 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }
              `}
            >
              Blogs
            </button>

            <button
              onClick={() => handleTabChange('achievement')}
              className={`relative z-10 w-1/3 h-full text-[10px] font-black uppercase tracking-wider transition-all duration-300
                ${activeTab === 'achievement'
                  ? 'text-black'
                  : 'text-zinc-650 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }
              `}
            >
              Achievement
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-10 py-3 rounded-full text-sm bg-white dark:bg-black/50 border border-zinc-350 dark:border-zinc-800 focus:border-[#6EDD4D] focus:ring-1 focus:ring-[#6EDD4D] text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition-all"
            />
            {/* Search icon or spinner */}
            {searching ? (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-zinc-300 border-t-[#6EDD4D] rounded-full animate-spin" />
            ) : (
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 text-sm">🔍</span>
            )}
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-450 hover:text-zinc-600 dark:hover:text-white font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading || searching ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => <MediaSkeleton key={n} />)}
          </div>

        ) : items.length === 0 ? (
          /* Empty State */
          <div className="text-center py-24 bg-zinc-100/30 dark:bg-zinc-900/10 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-[2rem]">
            <div className="w-16 h-16 mx-auto rounded-full bg-zinc-200/50 dark:bg-zinc-900 flex items-center justify-center text-zinc-450 dark:text-zinc-600 mb-6 font-bold text-2xl">
              📁
            </div>
            <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">No articles found</h3>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              We couldn&apos;t find any articles matching your filters or search term. Try adjusting your search query.
            </p>
          </div>

        ) : (
          /* Card Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((item) => (
              <Link
                key={item.id || item.slug}
                href={`/media/${item.slug}`}
                className="group flex flex-col h-full bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-200 dark:border-zinc-850 rounded-[2rem] overflow-hidden hover:border-[#6EDD4D]/50 hover:shadow-[0_0_30px_rgba(110,221,77,0.12)] transition-all duration-500"
              >
                {/* Image Area */}
                <div className="relative h-52 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center p-6 border-b border-zinc-250 dark:border-zinc-750">
                      <span className="text-zinc-400 dark:text-zinc-600 font-bold uppercase tracking-widest text-xs">{item.type}</span>
                    </div>
                  )}

                  {/* Type Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {item.isPinned && (
                      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-[#6EDD4D] border border-[#6EDD4D]/40 bg-[#6EDD4D]/10 backdrop-blur-md flex items-center gap-1.5">
                        📌 Pinned
                      </span>
                    )}
                    {item.type === 'blog' ? (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full text-[#6EDD4D] border border-[#6EDD4D]/30 bg-black/80 backdrop-blur-md">
                        Blog
                      </span>
                    ) : (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full text-cyan-400 border border-cyan-500/30 bg-black/80 backdrop-blur-md">
                        Milestone
                      </span>
                    )}

                    {item.achievementType && (
                      <span className="text-[10px] font-semibold tracking-wide px-3 py-1 rounded-full text-zinc-300 bg-zinc-800/90 backdrop-blur-md">
                        {item.achievementType}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Metadata */}
                    <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-4 font-semibold">
                      <span>{formatDate(item.publishedAt || item.createdAt)}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 line-clamp-2 leading-snug group-hover:text-[#6EDD4D] transition-colors">
                      {item.title}
                    </h2>

                    {/* Summary */}
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-6">
                      {stripHtml(item.summary)}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-[#6EDD4D] transition-colors mt-auto">
                    <span>Read Article</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Infinite Scroll target observer element */}
        {hasMore && !loading && !searching && (
          <div ref={lastElementRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3].map((n) => <MediaSkeleton key={n} />)}
          </div>
        )}
      </div>
    </div>
  );
}
