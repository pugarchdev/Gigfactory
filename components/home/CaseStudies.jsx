export default function CaseStudies({ onContactClick }) {
  const cases = [
    { title: "Commercial Complex Development", type: "Commercial", desc: "Complete development of 50,000 sq ft. commercial complex with advanced BIM integration." },
    { title: "Project in Texas, Dallas", type: "Infrastructure", desc: "End-to-end infrastructure planning and 4D scheduling for a major state highway." },
    { title: "Retail Mall Expansion", type: "Retail", desc: "Clash detection and resolution saving 15% in material rework costs." }
  ];

  return (
    <section className="container mx-auto px-6 py-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Case Studies</h2>
        <p className="text-gray-400 text-lg">Real-world examples of how we deliver excellence, innovation, and precision.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {cases.map((cs, idx) => (
          <div key={idx} className="bg-dark-surface border border-dark-border rounded-3xl p-8 flex flex-col hover:border-neon-green/50 transition-colors">
            <span className="px-3 py-1 bg-dark-base border border-dark-border rounded-full text-xs font-bold text-gray-400 w-fit mb-6 uppercase tracking-wider">{cs.type}</span>
            <h3 className="text-2xl font-bold text-white mb-4">{cs.title}</h3>
            <p className="text-gray-400 mb-8 flex-grow text-sm leading-relaxed">{cs.desc}</p>
            <button 
              onClick={onContactClick}
              className="w-full py-3 rounded-xl bg-neon-green text-dark-base font-bold hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all"
            >
              View Full Study
            </button>
          </div>
        ))}
      </div>
      
      <div className="text-center">
         <button className="text-gray-400 hover:text-neon-green font-semibold text-sm tracking-widest uppercase transition-colors">View All Case Studies <i className="fa-solid fa-arrow-right ml-2"></i></button>
      </div>
    </section>
  );
}