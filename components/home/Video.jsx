'use client'

import { useState, useEffect } from 'react'

const Videos = () => {
  const [activeModal, setActiveModal] = useState(null)

  const videos = [
    { id: 1, name: "Puneet Arora - AMS Project Consultants", videoId: "cU8iEKLeqvc?si=8pqIXKYRktopX4q8" },
    { id: 2, name: "Harshad Rajadhyax - Sandersons", videoId: "qJLOReEmQE0?si=Za1t6SjBSyNdgp1N" },
    { id: 3, name: "Yayati Kene | Real Estate", videoId: "oaIkiqXfBqI?si=BY0LOl5_iXUr-KHz" },
    { id: 4, name: "Ashish | Construction Expert", videoId: "sC1WwWJkLAI?si=q4xHvLEguOl_CrJy" }
  ]

  // Duplicate the array for infinite loop
  const displayVideos = [...videos, ...videos]

  const getCleanId = (input) => {
    if (!input) return "";
    return input.split('?')[0].split('/').pop().replace('watch?v=', '');
  }

  useEffect(() => {
    document.body.style.overflow = activeModal ? 'hidden' : 'unset';
  }, [activeModal]);

  return (
    <section className="pt-0 pb-20 px-6 overflow-hidden -mt-[40px] md:-mt-[80x]">      <style dangerouslySetInnerHTML={{
      __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Trusted by hundreds of <span className="text-[#6EDD4D]">Industry Professionals</span>
          </h2>
          <div className="h-1.5 w-24 bg-[#6EDD4D] mx-auto rounded-full"></div>
        </div>

        {/* Marquee Container */}
        <div className="relative group overflow-hidden">
          <div className="animate-marquee flex gap-6 py-4">
            {displayVideos.map((video, idx) => (
              <div
                key={`${video.id}-${idx}`}
                className="w-[300px] md:w-[350px] shrink-0"
              >
                <div
                  className="group/card relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 transition-all duration-500 hover:border-[#6EDD4D]/50 hover:shadow-[0_0_30px_rgba(110,221,77,0.15)] cursor-pointer h-full flex flex-col"
                  onClick={() => setActiveModal(video.videoId)}
                >
                  {/* Thumbnail */}
                  <div className="aspect-video relative w-full overflow-hidden bg-black">
                    <img
                      src={`https://img.youtube.com/vi/${getCleanId(video.videoId)}/hqdefault.jpg`}
                      alt={video.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-[#6EDD4D] rounded-full flex items-center justify-center shadow-lg transform translate-y-2 group-hover/card:translate-y-0 transition-transform">
                        <svg className="w-6 h-6 text-black fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h4 className="text-zinc-100 font-bold text-base leading-tight group-hover/card:text-[#6EDD4D] transition-colors line-clamp-2">
                      {video.name}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Faded edges for better transition */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent"></div>
        </div>

        {/* Description Section */}
        <div className="max-w-4xl mx-auto text-center space-y-6 pt-16 border-t border-zinc-900 mt-10">
          <p className="text-zinc-400 text-lg leading-relaxed italic">
            &apos;At Gigfactory, our success is measured by the confidence our clients place in us. Across <span className="text-zinc-100">10+ million sq.ft.</span> of delivered projects, we have partnered with developers and consultants to bring clarity to complex construction.&apos;
          </p>
          <h3 className="text-xl font-bold text-[#6EDD4D] uppercase tracking-widest">
            Insights & Industry Knowledge
          </h3>
        </div>
      </div>

      {/* Modal remains the same */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/80" onClick={() => setActiveModal(null)}>
          <div className="relative w-full max-w-4xl bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 z-10 w-8 h-8 bg-zinc-800 hover:bg-[#6EDD4D] hover:text-black text-white rounded-full flex items-center justify-center transition-colors" onClick={() => setActiveModal(null)}>
              ✕
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${getCleanId(activeModal)}?autoplay=1`}
                className="w-full h-full border-none"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Videos