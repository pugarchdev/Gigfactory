"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { mediaApi } from '@/lib/api';

/* ───────────────── helpers ───────────────── */
const stripHtml = (html) => (html || '').replace(/<[^>]*>/g, '');

const formatDate = (d) => {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });
};

const readingTime = (text) => {
  const words = stripHtml(text || '').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const getEmbedUrl = (url) => {
  if (!url) return null;
  let id = '';
  if (url.includes('youtube.com/watch')) {
    id = new URLSearchParams(url.split('?')[1]).get('v');
  } else if (url.includes('youtu.be/')) {
    id = url.split('youtu.be/')[1]?.split('?')[0];
  } else if (url.includes('youtube.com/embed/')) {
    id = url.split('youtube.com/embed/')[1]?.split('?')[0];
  }
  return id ? `https://www.youtube.com/embed/${id}` : null;
};

const toHtml = (text) => {
  if (!text) return '';
  if (/<[a-z][\s\S]*>/i.test(text)) return text;
  return text.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
};

/* ──────────────── Lightbox ──────────────── */
function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
      >
        ✕
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); prev(); }}
          className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          ‹
        </button>
      )}

      {/* Image */}
      <div className="max-w-5xl max-h-[85vh] px-16" onClick={e => e.stopPropagation()}>
        <img
          src={images[idx]}
          alt={`Image ${idx + 1}`}
          className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
        />
        <p className="text-center text-zinc-400 text-sm mt-4 font-semibold">
          {idx + 1} / {images.length}
        </p>
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); next(); }}
          className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          ›
        </button>
      )}
    </div>
  );
}

/* ───────────── Section heading ───────────── */
function SectionHeading({ children }) {
  return (
    <h3 className="flex items-center gap-3 text-lg font-extrabold text-zinc-900 dark:text-white mb-5 uppercase tracking-widest">
      <span className="w-1 h-5 rounded-full bg-[#6EDD4D] inline-block shrink-0" />
      {children}
    </h3>
  );
}

/* ═══════════════════ Page ═══════════════════ */
export default function MediaDetail() {
  const { slug } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);
  const [lightboxIdx, setLightboxIdx] = useState(null); // null = closed

  useEffect(() => {
    if (!slug) return;

    const loadItem = async () => {
      setLoading(true);
      try {
        const res = await mediaApi.getById(slug);
        if (res?.slug) {
          setItem(res);
        } else {
          setItem(null);
        }
      } catch {
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    const loadRecent = async () => {
      try {
        const res = await mediaApi.list({ status: 'published', limit: 4 });
        const list = res.data ?? res;
        setRecentPosts(
          Array.isArray(list) && list.length
            ? list.filter(p => p.slug !== slug).slice(0, 3)
            : []
        );
      } catch {
        setRecentPosts([]);
      }
    };

    loadItem();
    loadRecent();
  }, [slug]);

  /* ── loading ── */
  if (loading) return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-zinc-200 border-t-[#6EDD4D] rounded-full animate-spin" />
        <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest animate-pulse">Loading article…</span>
      </div>
    </div>
  );

  /* ── 404 ── */
  if (!item) return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] flex items-center justify-center text-center">
      <div className="max-w-md px-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Article Not Found</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8">
          The article you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/media" className="inline-flex items-center gap-2 bg-[#6EDD4D] text-black font-extrabold px-6 py-3 rounded-full text-sm uppercase tracking-wider">
          <span>Back to Media Hub</span>
        </Link>
      </div>
    </div>
  );

  /* ── derived values ── */
  const embedUrl = getEmbedUrl(item.youtubeLink);
  const galleryImages = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
  const hasVideo = item.video && item.video.trim() !== '';
  const hasYoutube = !!embedUrl;
  const hasPdf = item.pdfLink && item.pdfLink.trim() !== '';
  const hasExtLink = item.link && item.link.trim() !== '';

  return (
    <>
      {/* Lightbox overlay */}
      {lightboxIdx !== null && (
        <Lightbox
          images={galleryImages}
          startIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}

      <div className="min-h-screen py-12 md:py-20 relative overflow-hidden bg-zinc-50 dark:bg-[#050505] transition-colors duration-500">

        {/* Background glow */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-neon-green/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">

          {/* Back link */}
          <Link
            href="/media"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-zinc-500 dark:text-zinc-400 hover:text-[#6EDD4D] transition-colors mb-8 group uppercase tracking-wider"
          >
            ← Back to Media
          </Link>

          {/* ── Meta header ── */}
          <div className="max-w-4xl mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {item.type === 'blog' ? (
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full text-[#6EDD4D] border border-[#6EDD4D]/30 bg-[#6EDD4D]/10">Blog</span>
              ) : (
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full text-cyan-400 border border-cyan-500/30 bg-cyan-950/40">Milestone</span>
              )}
              {item.achievementType && (
                <span className="text-[10px] font-bold tracking-wide px-3 py-1 rounded-full text-zinc-600 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-800">
                  {item.achievementType}
                </span>
              )}
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="text-sm text-zinc-500 dark:text-zinc-400 font-semibold">{formatDate(item.publishedAt || item.createdAt)}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="text-sm text-zinc-500 dark:text-zinc-400 font-semibold">{readingTime(item.content)}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white leading-tight mb-4">
              {item.title}
            </h1>

            {/* summary lead */}
            {item.summary && (
              <p className="text-lg md:text-xl text-zinc-650 dark:text-zinc-450 leading-relaxed border-l-4 border-[#6EDD4D] pl-4">
                {stripHtml(item.summary)}
              </p>
            )}
          </div>

          {/* ── Hero image ── */}
          {item.image && (
            <div className="w-full h-[280px] md:h-[500px] rounded-[2.5rem] overflow-hidden mb-12 shadow-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          )}

          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* ── Article body (left 8 cols) ── */}
            <div className="lg:col-span-8 space-y-10">

              {/* Rich-text content */}
              <div
                className="text-zinc-700 dark:text-zinc-300 text-base md:text-lg leading-relaxed space-y-4
                  [&_span]:!text-inherit
                  [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:text-zinc-900 dark:[&_h1]:text-white [&_h1]:mb-4 [&_h1]:mt-8
                  [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-zinc-900 dark:[&_h2]:text-white [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:border-b [&_h2]:border-zinc-200 dark:[&_h2]:border-zinc-800 [&_h2]:pb-2
                  [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-zinc-900 dark:[&_h3]:text-white [&_h3]:mb-2 [&_h3]:mt-4
                  [&_p]:mb-4
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1
                  [&_li]:text-zinc-700 dark:[&_li]:text-zinc-300
                  [&_strong]:font-bold [&_strong]:text-zinc-900 dark:[&_strong]:text-white
                  [&_em]:italic
                  [&_a]:text-[#6EDD4D] [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-[#6EDD4D]/80
                  [&_blockquote]:border-l-4 [&_blockquote]:border-[#6EDD4D] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-zinc-500"
                dangerouslySetInnerHTML={{ __html: toHtml(item.content || item.summary) }}
              />

              {/* YouTube embed */}
              {hasYoutube && (
                <div>
                  <SectionHeading>Related Video</SectionHeading>
                  <div className="aspect-video rounded-[2rem] overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800">
                    <iframe
                      src={embedUrl}
                      title="YouTube video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}

              {/* Direct uploaded video */}
              {hasVideo && (
                <div>
                  <SectionHeading>Watch Video</SectionHeading>
                  <div className="aspect-video rounded-[2rem] overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800 bg-black">
                    <video
                      src={item.video}
                      controls
                      preload="metadata"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Gallery — click to open lightbox */}
              {galleryImages.length > 0 && (
                <div>
                  <SectionHeading>Project Gallery ({galleryImages.length})</SectionHeading>
                  <div className={`grid gap-4 ${galleryImages.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {galleryImages.map((url, idx) => (
                      <div
                        key={idx}
                        onClick={() => setLightboxIdx(idx)}
                        className="group relative aspect-video rounded-[1.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md cursor-pointer"
                      >
                        <img
                          src={url}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                          <span className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">🔍</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Downloads / external links */}
              {(hasPdf || hasExtLink) && (
                <div className="flex flex-wrap gap-4 p-6 bg-zinc-100/60 dark:bg-zinc-900/20 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-[2rem]">
                  {hasPdf && (
                    <a
                      href={item.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#6EDD4D] hover:bg-[#6EDD4D]/90 text-black font-extrabold px-6 py-3 rounded-full text-sm uppercase tracking-wider transition-all shadow-md"
                    >
                      Download PDF
                    </a>
                  )}
                  {hasExtLink && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-zinc-400 dark:border-zinc-700 text-zinc-800 dark:text-zinc-300 hover:text-[#6EDD4D] hover:border-[#6EDD4D] font-extrabold px-6 py-3 rounded-full text-sm uppercase tracking-wider transition-all"
                    >
                      Visit Source
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* ── Sidebar (right 4 cols) ── */}
            <div className="lg:col-span-4 space-y-6">

              {/* Article info card (Author details completely hidden) */}
              <div className="p-6 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-4">
                  Article Details
                </h3>

                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-zinc-500">Published</span>
                  <span className="text-zinc-900 dark:text-zinc-200 text-right">{formatDate(item.publishedAt || item.createdAt)}</span>
                </div>

                <div className="flex justify-between text-sm font-semibold border-t border-zinc-100 dark:border-zinc-800 pt-3">
                  <span className="text-zinc-500">Read time</span>
                  <span className="text-zinc-900 dark:text-zinc-200">{readingTime(item.content)}</span>
                </div>

                {item.source && (
                  <div className="flex justify-between text-sm font-semibold border-t border-zinc-100 dark:border-zinc-800 pt-3">
                    <span className="text-zinc-500">Source</span>
                    <span className="text-zinc-900 dark:text-zinc-200 text-right">{item.source}</span>
                  </div>
                )}

                {item.achievementType && (
                  <div className="flex justify-between items-center text-sm font-semibold border-t border-zinc-100 dark:border-zinc-800 pt-3">
                    <span className="text-zinc-500">Category</span>
                    <span className="text-cyan-400 bg-cyan-950/20 border border-cyan-800/40 px-3 py-0.5 rounded-full text-xs font-bold">
                      {item.achievementType}
                    </span>
                  </div>
                )}

                {/* Media count indicators */}
                <div className="flex gap-3 flex-wrap border-t border-zinc-100 dark:border-zinc-800 pt-4">
                  {galleryImages.length > 0 && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                      📸 {galleryImages.length} Photos
                    </span>
                  )}
                  {hasVideo && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                      🎥 Video
                    </span>
                  )}
                  {hasPdf && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                      📄 PDF
                    </span>
                  )}
                </div>
              </div>

              {/* Recent posts */}
              {recentPosts.length > 0 && (
                <div className="p-6 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-[2rem]">
                  <h3 className="text-sm font-extrabold uppercase tracking-widest text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-5">
                    Recent Insights
                  </h3>
                  <div className="space-y-5">
                    {recentPosts.map((post) => (
                      <Link key={post.id ?? post.slug} href={`/media/${post.slug}`} className="group block">
                        {post.image && (
                          <div className="h-28 w-full rounded-xl overflow-hidden mb-2 border border-zinc-100 dark:border-zinc-800">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        )}
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6EDD4D] mb-1 block">
                          {post.type === 'blog' ? 'Blog' : 'Milestone'}
                        </span>
                        <h4 className="font-bold text-zinc-900 dark:text-white group-hover:text-[#6EDD4D] transition-colors leading-snug line-clamp-2 text-sm">
                          {post.title}
                        </h4>
                        <span className="text-xs text-zinc-450 font-semibold block mt-1">
                          {formatDate(post.publishedAt || post.createdAt)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
