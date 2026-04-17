export default function Services({ onContactClick }) {
  const services = [
    { 
      id: '2D Services', 
      icon: 'fa-pen-ruler', 
      title: '2D', 
      desc: 'Our team delivers clear, technically accurate drawings that help project stakeholders communicate design intent and execute construction efficiently.' 
    },
    { 
      id: '3D Services', 
      icon: 'fa-cube', 
      title: '3D', 
      desc: 'Our 3D BIM services help project teams identify issues early, streamline collaboration, and ensure accurate documentation for construction.' 
    },
    { 
      id: '4D Services', 
      icon: 'fa-clock', 
      title: '4D', 
      desc: 'We integrate project schedules with BIM models to simulate, optimize, and control construction sequencing.' 
    },
    { 
      id: 'Project Planning', 
      icon: 'fa-chart-gantt', 
      title: 'Project Planning & Controls', 
      desc: 'We support structured planning to enhance coordination and execution clarity.' 
    },
    { 
      id: 'BOQ Services', 
      icon: 'fa-calculator', 
      title: 'BOQ', 
      desc: 'We deliver accurate cost and quantity support to enhance financial transparency and procurement alignment.' 
    },
    { 
      id: 'Audit Services', 
      icon: 'fa-clipboard-check', 
      title: 'Audit', 
      desc: 'We ensure compliance, transparency, and technical accuracy across project stages.' 
    }
  ];

  return (
    <section className="container mx-auto px-6 py-20">
      
      {/* Exact Header and Paragraph from the image */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Services We Deliver</h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Our comprehensive range of services covers every aspect of construction and design, ensuring your project is handled with expertise from conception to completion.
        </p>
      </div>
      
      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {services.map((service, idx) => (
          <div 
            key={idx} 
            className="bg-dark-surface border border-dark-border p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:border-neon-green group flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-dark-base border border-dark-border flex items-center justify-center mb-6 group-hover:shadow-[0_0_15px_rgba(110,221,77,0.3)] transition-all">
              <i className={`fa-solid ${service.icon} text-2xl text-neon-green`}></i>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
            
            {/* Added a subtle background for the description area just like the light-mode cards have a green tint area */}
            <div className="bg-neon-green/5 border-l-2 border-neon-green p-4 rounded-r-lg flex-grow mb-8 text-sm text-gray-400 leading-relaxed text-left w-full">
              {service.desc}
            </div>
            
            <button 
              onClick={() => onContactClick(service.id)}
              className="px-6 py-2.5 rounded-full border border-dark-border text-white text-sm font-bold hover:bg-neon-green hover:text-black hover:border-neon-green transition-all w-fit flex items-center gap-2"
            >
              Know More <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>
        ))}
      </div>

      {/* Bottom CTA Button exactly matching the image */}
      <div className="flex justify-center">
        <button 
          onClick={() => onContactClick('General Project Inquiry')}
          className="bg-neon-green text-black font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(110,221,77,0.2)] flex items-center gap-2"
        >
          Have a project in mind? Let&apos;s talk <span className="text-lg leading-none">→</span>
        </button>
      </div>

    </section>
  );
}