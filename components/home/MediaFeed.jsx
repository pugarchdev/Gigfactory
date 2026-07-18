'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { mediaApi } from '../../lib/api';

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

const stripHtml = (html) => (html || '').replace(/<[^>]*>/g, '');

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
};

const CARD_WIDTH_PX = 396; // card width + gap (380 + 16)

export default function MediaFeed({ onContactClick }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchLatestMedia = async () => {
      try {
        const response = await mediaApi.list({ status: 'published', page: 1, limit: 6 });
        const listData = response.data || response;
        if (Array.isArray(listData) && listData.length > 0) {
          setItems(listData.slice(0, 6));
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("Failed to load latest media:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestMedia();
  }, []);

  const updateScrollState = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
    if (scrollWidth <= clientWidth) { setScrollProgress(-1); return; }
    setScrollProgress((scrollLeft / (scrollWidth - clientWidth)) * 100);
  };

  // Update scroll state when items render or window is resized
  useEffect(() => {
    if (!loading && items.length > 0) {
      const timer = setTimeout(() => {
        updateScrollState();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, items]);

  useEffect(() => {
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, []);

  const scrollBy = (dir) => {
    scrollContainerRef.current?.scrollBy({ left: dir * CARD_WIDTH_PX, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Visual Separator ── */}
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
            <span className="w-2 h-2 rounded-full bg-[#6EDD4D] animate-pulse" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Latest Insights
            </span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
        </div>
      </div>

      <section
        id="latest-media"
        className="container mx-auto px-6 pb-20 relative overflow-hidden"
      >
        <style dangerouslySetInnerHTML={{
          __html: `.media-no-scrollbar::-webkit-scrollbar { display: none; }
          .media-no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`
        }} />

        {/* Background glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-neon-green/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Header row — title left, arrows right */}
        <div className="flex items-end justify-between mb-12 mt-12 relative z-10">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-zinc-200 dark:bg-zinc-800 w-64 rounded-md" />
              <div className="h-6 bg-zinc-200 dark:bg-zinc-800 w-[80vw] max-w-md rounded-md" />
            </div>
          ) : (
            <div>
              <AnimatedSection animationClass="opacity-0 translate-y-10" delay={0}>
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">
                  Latest From Our <span className="text-[#6EDD4D]">Media</span>
                </h2>
              </AnimatedSection>
              <AnimatedSection animationClass="opacity-0 translate-y-10" delay={120}>
                <p className="text-zinc-600 dark:text-zinc-400 text-base max-w-xl">
                  Industry insights, technical blogs, and corporate milestones — scroll to explore.
                </p>
              </AnimatedSection>
            </div>
          )}

          {/* Arrow nav buttons */}
          {!loading && (
            <AnimatedSection animationClass="opacity-0 translate-x-6" delay={200} className="flex items-center gap-3 shrink-0 ml-6">
              <button
                onClick={() => scrollBy(-1)}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300
                  ${canScrollLeft
                    ? 'border-[#6EDD4D]/50 text-[#6EDD4D] hover:bg-[#6EDD4D] hover:text-black hover:border-[#6EDD4D] shadow-[0_0_14px_rgba(110,221,77,0.2)]'
                    : 'border-zinc-350 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-50'
                  }`}
              >
                ←
              </button>
              <button
                onClick={() => scrollBy(1)}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300
                  ${canScrollRight
                    ? 'border-[#6EDD4D]/50 text-[#6EDD4D] hover:bg-[#6EDD4D] hover:text-black hover:border-[#6EDD4D] shadow-[0_0_14px_rgba(110,221,77,0.2)]'
                    : 'border-zinc-355 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-50'
                  }`}
              >
                →
              </button>
            </AnimatedSection>
          )}
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="flex gap-6 overflow-hidden pb-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="shrink-0 w-[85vw] max-w-[320px] md:w-[380px] bg-zinc-100/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] overflow-hidden animate-pulse"
              >
                <div className="h-52 bg-zinc-200 dark:bg-zinc-800" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 w-1/3 rounded" />
                  <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="h-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="h-5 bg-zinc-200 dark:bg-zinc-800 w-1/2 rounded-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="-mx-6">
              {/* Horizontal Scrollable Slider */}
              <div
                ref={scrollContainerRef}
                onScroll={updateScrollState}
                className="flex gap-6 md:gap-8 overflow-x-auto pb-8 media-no-scrollbar snap-x snap-mandatory px-6 scroll-pl-6"
              >
                {items.map((item, idx) => (
                  <AnimatedSection
                    key={item.id || item.slug}
                    animationClass="opacity-0 translate-y-12"
                    delay={idx * 80}
                    className="snap-start shrink-0 w-[85vw] max-w-[320px] md:max-w-none md:w-[380px]"
                  >
                    <Link
                      href={`/media/${item.slug}`}
                      className="group h-full flex flex-col bg-zinc-100/80 dark:bg-zinc-900/40 backdrop-blur-xl border border-zinc-350 dark:border-zinc-800 rounded-[2rem] overflow-hidden hover:border-[#6EDD4D]/50 hover:shadow-[0_0_30px_rgba(110,221,77,0.1)] transition-all duration-500"
                    >
                      {/* Card Image */}
                      <div className="relative w-full h-56 md:h-64 overflow-hidden bg-zinc-800">
                        <div className="absolute inset-0 bg-white/10 dark:bg-zinc-950/20 z-10 group-hover:bg-transparent transition-all duration-500" />
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center">
                            <span className="text-zinc-650 font-bold uppercase tracking-widest text-[10px]">{item.type}</span>
                          </div>
                        )}

                        {/* Floating Badges */}
                        <div className="absolute top-4 left-4 z-20 flex gap-2">
                          {item.isPinned && (
                            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-[#6EDD4D] border border-[#6EDD4D]/40 bg-[#6EDD4D]/10 backdrop-blur-md flex items-center gap-1.5">
                              📌 Pinned
                            </span>
                          )}
                          {item.type === 'blog' ? (
                            <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full text-[#6EDD4D] border border-[#6EDD4D]/30 bg-black/70 backdrop-blur-md">
                              Blog
                            </span>
                          ) : (
                            <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full text-cyan-400 border border-cyan-500/30 bg-black/70 backdrop-blur-md">
                              Milestone
                            </span>
                          )}
                          {item.achievementType && (
                            <span className="text-[10px] font-semibold tracking-wide px-3 py-1 rounded-full text-zinc-350 bg-zinc-800/80 backdrop-blur-md">
                              {item.achievementType}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 font-semibold">
                          {formatDate(item.publishedAt || item.createdAt)}
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-[#6EDD4D] transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-zinc-700 dark:text-zinc-400 mb-8 flex-grow text-sm leading-relaxed line-clamp-3">
                          {stripHtml(item.summary)}
                        </p>
                        <div className="flex items-center gap-2 text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-[#6EDD4D] transition-colors mt-auto">
                          <span>Read Article</span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* Scroll progress bar + item counter */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="w-24 md:w-48 h-1.5 bg-zinc-300 dark:bg-zinc-800 rounded-full relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-[#6EDD4D] rounded-full transition-transform duration-150 ease-out"
                  style={{
                    width: scrollProgress === -1 ? '100%' : '33.33%',
                    transform: scrollProgress === -1 ? 'none' : `translateX(${scrollProgress * 2}%)`
                  }}
                />
              </div>
              <span className="text-xs font-semibold text-zinc-400 tabular-nums">
                {items.length} articles
              </span>
            </div>
          </div>
        )}

        {/* View All */}
        <div className="flex justify-center mt-10 relative z-10">
          <AnimatedSection animationClass="opacity-0 translate-y-8" delay={300}>
            <Link
              href="/media"
              className="inline-flex items-center gap-3 bg-transparent border border-[#6EDD4D] text-[#6EDD4D] hover:bg-[#6EDD4D] hover:text-black hover:shadow-[0_0_25px_rgba(110,221,77,0.3)] text-sm font-extrabold px-8 py-3.5 rounded-full transition-all duration-300 uppercase tracking-wider"
            >
              <span>View All Insights</span>
              <span className="text-base">→</span>
            </Link>
          </AnimatedSection>
        </div>

        {/* ── Ready to move forward CTA ── */}
        <div className="w-full max-w-4xl mx-auto text-center mt-24 space-y-10">
          <AnimatedSection animationClass="opacity-0 translate-y-10" delay={300}>
            <div className="space-y-4">
              <h3 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                Ready to move your <br className="hidden md:block" />
                project <span className="text-[#6EDD4D]">forward?</span>
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
                Let&apos;s discuss how our expertise can bring your vision to life with precision and speed.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animationClass="opacity-0 scale-95" delay={500}>
            <button
              onClick={onContactClick}
              className="group relative inline-flex items-center justify-center cursor-pointer"
            >
              <div className="absolute -inset-1 bg-[#6EDD4D] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              <div className="relative bg-[#6EDD4D] text-zinc-950 font-black px-12 py-5 rounded-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 text-lg">
                <span>Let&apos;s Connect</span>
                <span className="text-2xl leading-none group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
