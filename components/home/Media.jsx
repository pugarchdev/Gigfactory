"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { mediaProjects, blogPosts, achievements } from "../../app/data/portfolioData";
import TabNavigation from "../tab/TabNavigation";
import PortfolioCard from "../cards/PortfolioCard";

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
        isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : animationClass
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default function Media() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("media");

  // Determine which data to render based on the active tab
  const getActiveData = () => {
    switch (activeTab) {
      case "media":
        // Merge all blog posts and achievements safely together into one stream
        const mappedBlogs = (blogPosts || []).map(b => ({ ...b, type: 'blog' }));
        const mappedAwards = (achievements || []).map(a => ({ ...a, type: 'achievements' }));
        return [...mappedBlogs, ...mappedAwards];
        
      case "blog":
        return (blogPosts || []).map(b => ({ ...b, type: 'blog' }));
        
      case "achievements":
        return (achievements || []).map(a => ({ ...a, type: 'achievements' }));
        
      default:
        return [];
    }
  };

  return (
    <div className="w-full">
      {/* 1. Tab Bar Navigation Control */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Portfolio Items Cards Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getActiveData().map((item, i) => (
            <PortfolioCard key={`${item.type}-${item.id || i}`} item={item} />
          ))}
        </div>
      </main>

      <AnimatedSection className="flex flex-col items-center m-16" animationClass="opacity-0 scale-90" delay={200}>
        <button
          onClick={() => router.push('/media')}
          className="text-zinc-700 dark:text-zinc-400 hover:text-[#6EDD4D] font-bold text-sm tracking-widest uppercase transition-colors flex items-center group"
        >
          View More
          <i className="fa-solid fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
        </button>
      </AnimatedSection>
    </div>
  );
}