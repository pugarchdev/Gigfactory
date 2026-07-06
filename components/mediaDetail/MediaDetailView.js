'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Calendar, Award, BookOpen, Video, ChevronLeft, Pin } from 'lucide-react'
import { mediaProjects, blogPosts, achievements } from "@/app/data/portfolioData"

export default function MediaDetailView({ id, type }) {
    const [isPinned, setIsPinned] = useState(false)

    // 1. Load pinned status from local storage
    useEffect(() => {
        const savedPins = localStorage.getItem('pinned_portfolio_items')
        if (savedPins) {
            const pinsArray = JSON.parse(savedPins)
            setIsPinned(pinsArray.includes(String(id)))
        }
    }, [id])

    // 2. Toggle Pin status inside Detail View
    const togglePin = () => {
        const savedPins = localStorage.getItem('pinned_portfolio_items')
        let pinsArray = savedPins ? JSON.parse(savedPins) : []

        // Use the unique composite key format
        const uniqueKey = `${item.type || type}-${id}`

        if (pinsArray.includes(uniqueKey)) {
            pinsArray = pinsArray.filter(pId => pId !== uniqueKey)
            setIsPinned(false)
        } else {
            pinsArray.push(uniqueKey)
            setIsPinned(true)
        }
        localStorage.setItem('pinned_portfolio_items', JSON.stringify(pinsArray))
    }

    let dataSource = []
    let TypeIcon = BookOpen
    let typeLabel = "Blog"

    if (type === 'media') {
        dataSource = [...(blogPosts || []), ...(achievements || [])]
        TypeIcon = Video
        typeLabel = "Portfolio Item"
    } else if (type === 'blog') {
        dataSource = blogPosts || []
        TypeIcon = BookOpen
        typeLabel = "Blog Post"
    } else if (type === 'achievements') {
        dataSource = achievements || []
        TypeIcon = Award
        typeLabel = "Award & Achievement"
    }

    const item = dataSource.find((p) => String(p.id) === String(id))

    if (!item) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
                <h2 className="text-2xl font-black mb-4">Item Not Found</h2>
                <Link href="/media" className="px-5 py-2.5 rounded-full bg-[#6EDD4D] text-black text-sm font-bold shadow-lg">
                    Back to Media
                </Link>
            </div>
        )
    }

    let DisplayIcon = TypeIcon
    if (type === 'media' && item.type) {
        DisplayIcon = item.type === 'achievements' ? Award : BookOpen
    }

    const displayImage = item.image || (item.images && item.images[0])

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans pb-24">
            <div className="max-w-4xl mx-auto px-6 pt-12">

                <div className="flex justify-between items-center mb-8">
                    <Link href="/media" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-[#6EDD4D]">
                        <ChevronLeft size={16} /> Back to Media
                    </Link>

                    {/* Actionable Interactive Pin Toggle Button */}
                    <button
                        onClick={togglePin}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-[#6EDD4D] transition-colors"
                    >
                        <Pin size={14} className={isPinned ? "fill-[#6EDD4D] text-[#6EDD4D]" : "text-zinc-400"} />
                        {isPinned ? "Pinned to Front" : "Pin to Front"}
                    </button>
                </div>

                <div className="flex items-center gap-2 text-[#6EDD4D] mb-4">
                    <DisplayIcon size={16} />
                    <span className="text-xs font-black uppercase tracking-widest">
                        {item.type === 'achievements' ? 'Award & Achievement' : typeLabel}
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight">
                    {item.title || item.name}
                </h1>

                <div className="flex flex-wrap gap-6 items-center text-sm text-zinc-500 border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-8">
                    {item.date && <div className="flex items-center gap-2"><Calendar size={14} /><span>{item.date}</span></div>}
                    {item.location && <div className="flex items-center gap-2"><MapPin size={14} /><span>{item.location}</span></div>}
                </div>

                {displayImage && (
                    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 mb-10 shadow-xl">
                        <img src={displayImage} alt="Cover image view" className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg font-medium leading-relaxed mb-6">{item.description}</p>
                    {(item.content || item.scope) && (
                        <div className="mt-8 p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                            <p className="text-sm leading-relaxed whitespace-pre-line">{item.content || item.scope}</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}