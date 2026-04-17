'use client'

import { useState, useEffect } from 'react'

const Videos = () => {
  const [activeModal, setActiveModal] = useState(null)

  const videos = [
    {
      id: 1,
      name: "Puneet Arora - AMS Project Consultants",
      videoId: "cU8iEKLeqvc?si=8pqIXKYRktopX4q8"
    },
    {
      id: 2,
      name: "Harshad Rajadhyax - Sandersons",
      videoId: "qJLOReEmQE0?si=Za1t6SjBSyNdgp1N"
    },
    {
      id: 3,
      name: "Yayati Kene | Real Estate",
      videoId: "oaIkiqXfBqI?si=BY0LOl5_iXUr-KHz"
    },
    {
      id: 4,
      name: "Ashish | Construction Expert",
      videoId: "sC1WwWJkLAI?si=q4xHvLEguOl_CrJy"
    }
  ]

  const getCleanId = (input) => {
    if (!input) return "";
    return input.split('?')[0].split('/').pop().replace('watch?v=', '');
  }

  useEffect(() => {
    document.body.style.overflow = activeModal ? 'hidden' : 'unset';
  }, [activeModal]);

  return (
    <section className="bg-zinc-950 py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Trusted by hundreds of <span className="text-emerald-500">Industry Professionals</span>
          </h2>
          <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        {/* GRID: grid-cols-4 ensures they all take equal width.
            GAP: gap-6 keeps spacing consistent.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col h-full">
              <div 
                className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 transition-all duration-500 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] cursor-pointer h-full flex flex-col"
                onClick={() => setActiveModal(video.videoId)}
              >
                {/* FIXED ASPECT RATIO: 
                    'aspect-video' (16:9) forces the height to be identical for all thumbnails.
                */}
                <div className="aspect-video relative w-full overflow-hidden bg-black">
                  <img
                    src={`https://img.youtube.com/vi/${getCleanId(video.videoId)}/hqdefault.jpg`}
                    alt={video.name}
                    /* 'object-cover' ensures the image fills the box without gaps or stretching */
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info area with flex-grow to keep bottom borders aligned */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <h4 className="text-zinc-100 font-bold text-base leading-tight group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {video.name}
                  </h4>
                
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Description Section */}
        <div className="max-w-4xl mx-auto text-center space-y-6 pt-12 border-t border-zinc-900">
          <p className="text-zinc-400 text-lg leading-relaxed italic">
            &apos;At Gigfactory, our success is measured by the confidence our clients place in us. Across <span className="text-zinc-100">10+ million sq.ft.</span> of delivered projects, we have partnered with developers and consultants to bring clarity to complex construction.&apos;
          </p>
          <h3 className="text-xl font-bold text-emerald-500 uppercase tracking-widest">
            Insights & Industry Knowledge
          </h3>
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/80" onClick={() => setActiveModal(null)}>
          <div className="relative w-full max-w-4xl bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 z-10 w-8 h-8 bg-zinc-800 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center transition-colors" onClick={() => setActiveModal(null)}>
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