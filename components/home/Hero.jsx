export default function Hero({ onContactClick }) {
  return (
    <section className="relative pt-2 pb-12 md:pt-6 md:pb-12 overflow-hidden flex flex-col items-center text-center">
      
      {/* Top Brand Glow */}
      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon-green/10 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center mt-10 md:mt-16">
        
        {/* Exact Heading from Screenshot */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 tracking-tight max-w-5xl">
          Global Capability Center <br className="hidden md:block" />
          for Construction Services
        </h1>
        
        {/* Exact Paragraph from Screenshot */}
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          Technology-enabled platform for integrated BIM planning, designing & engineering. Project reference across 10+ Million Sqft.
        </p>
        
        {/* Exact Button from Screenshot */}
        <div className="flex justify-center">
          <button 
            onClick={onContactClick}
            className="bg-neon-green text-black font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(110,221,77,0.2)] flex items-center gap-2"
          >
            Let&apos;s Connect <span className="text-xl leading-none">→</span>
          </button>
        </div>
        
      </div>
    </section>
  );
}