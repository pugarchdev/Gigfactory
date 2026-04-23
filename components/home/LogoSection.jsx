'use client'

const LogoSection = () => {
  // Individual logo styles for precise control
  const logoStyles = {
    'tcs': { maxHeight: 'px', maxWidth: 'px' },
    'adani': { maxHeight: 'px', maxWidth: 'px' },
    'lt': { maxHeight: 'px', maxWidth: 'px' },
    'salesforce': { maxHeight: 'px', maxWidth: 'px' },
    'emaar': { maxHeight: 'px', maxWidth: 'px' },
    'labindia': { maxHeight: 'px', maxWidth: 'px' },
    'sk': { maxHeight: 'px', maxWidth: 'px' },
    'spa': { maxHeight: 'px', maxWidth: 'px' },
    'mastercard': { maxHeight: 'px', maxWidth: 'px' },
    'edifice': { maxHeight: 'px', maxWidth: 'px' },
    'mmoser': { maxHeight: 'px', maxWidth: 'px' },
    'ey': { maxHeight: 'px', maxWidth: 'px' },
    'atkins': { maxHeight: 'px', maxWidth: 'px' },
    'schneider': { maxHeight: 'px', maxWidth: 'px' },
    'denkall': { maxHeight: 'px', maxWidth: 'px' },
    'modon': { maxHeight: 'px', maxWidth: 'px' },
    'dh': { maxHeight: 'px', maxWidth: 'px' },
    'claramont': { maxHeight: 'px', maxWidth: 'px' },
    'gulf-islamic': { maxHeight: 'px', maxWidth: 'px' },
    'jacobs': { maxHeight: 'px', maxWidth: 'px' },
    'jmbaxi': { maxHeight: 'px', maxWidth: 'px' },
    'orchid': { maxHeight: 'px', maxWidth: 'px' },
    'peninsula': { maxHeight: 'px', maxWidth: 'px' },
    'skillbind': { maxHeight: 'px', maxWidth: 'px' },
    'westbridge': { maxHeight: 'px', maxWidth: 'px' },
    'ascenders': { maxHeight: 'px', maxWidth: 'px' },
    'freespanz': { maxHeight: 'px', maxWidth: 'px' },
    'gilly': { maxHeight: 'px', maxWidth: 'px' },
    'imagegrafix': { maxHeight: 'px', maxWidth: 'px' },
    'oarchilos': { maxHeight: 'px', maxWidth: 'px' },
    'turnkey': { maxHeight: 'px', maxWidth: 'px' },
    'suresh-babu-and-partners': { maxHeight: 'px', maxWidth: 'px' },
    'designworks': { maxHeight: 'px', maxWidth: 'px' },
    'tge': { maxHeight: 'px', maxWidth: 'px' },
    'gbarchitect': { maxHeight: 'px', maxWidth: 'px' },
    'sanderson': { maxHeight: 'px', maxWidth: 'px' },
    'hosmac': { maxHeight: 'px', maxWidth: 'px' },
    'cynosure': { maxHeight: 'px', maxWidth: 'px' },
    'Aesthetic': { maxHeight: 'px', maxWidth: 'px' },
    'ans': { maxHeight: 'px', maxWidth: 'px' },
    'genesis': { maxHeight: 'px', maxWidth: 'px' },
    'natash': { maxHeight: 'px', maxWidth: 'px' },
    'AMs': { maxHeight: 'px', maxWidth: 'px' },
    'creative_luxury': { maxHeight: 'px', maxWidth: 'px' },
    'microsoft': { maxHeight: 'px', maxWidth: 'px' },
    'DesignHouse': { maxHeight: 'px', maxWidth: 'px' },
  };

  const logos = [
    { name: 'microsoft', image: '/assets/microsoft-1.png' },
    { name: 'TCS', image: '/assets/tcs-2.png' },
    { name: 'Adani', image: '/assets/adani-3.png' },
    { name: 'Emaar', image: '/assets/emaar-6.png' },
    { name: 'EY', image: '/assets/ey-12.png' },
    { name: 'Salesforce', image: '/assets/salesforce-4.png' },
    { name: 'Mastercard', image: '/assets/mastercard-5.png' },
    { name: 'gulfislamic', image: '/assets/gulfislamic-7.png' },
    { name: 'uiidb', image: '/assets/uiidb-9.png' },
    { name: 'Atkins', image: '/assets/atkins-8.png' },
    { name: 'Schneider', image: '/assets/schneider-10.png' },
    { name: 'jacobs', image: '/assets/jacobs-11.png' },
    { name: 'lt1', image: '/assets/lt-13.png' },
    { name: 'modon', image: '/assets/modon-15.png' },
    { name: 'peninsula', image: '/assets/penensula group.png' },
    { name: 'creative_luxury', image: '/assets/creative_luxury-16.png' },
    { name: 'natash', image: '/assets/natash-17.png' },
    { name: 'spa', image: '/assets/spa-18.png' },
    { name: 'Exotic', image: '/assets/Exotic-20.png' },
    { name: 'Labindia', image: '/assets/labindia-34.png' },
    { name: 'AMs', image: '/assets/AMs-19.png' },
    { name: 'Aesthetic', image: '/assets/Aesthetic-23.png' },
    { name: 'mmoser', image: '/assets/mmoser-22.png' },
    { name: 'EDIFICE', image: '/assets/EDIFICE-25.png' },
    { name: 'HOSMAC', image: '/assets/HOSMAC-24.png' },
    { name: 'westbridge', image: '/assets/westbridge-21.png' },
    { name: 'Claramont', image: '/assets/claramont-45.png' },
    { name: 'sk', image: '/assets/sk-30.png' },
    { name: 'DH', image: '/assets/DH-41.png' },
    { name: 'denkall', image: '/assets/denkall-43.png' },
    { name: 'jmbaxi', image: '/assets/jmbaxi-35.png' },
    { name: 'orchid', image: '/assets/orchid-32.png' },
    { name: 'skillbind', image: '/assets/skillbind-29.png' },
    { name: 'ascenders', image: '/assets/ascenders-47.png' },
    { name: 'freespanz', image: '/assets/fsz-l6 2 (1).png' },
    { name: 'gilly', image: '/assets/gilly-l1 1.png' },
    { name: 'imagegrafix', image: '/assets/ig-l5 1.png' },
    { name: 'oarchilos', image: '/assets/oarchilos-l2 1.png' },
    { name: 'turnkey', image: '/assets/turnkey-49.png' },
    { name: 'suresh_babu_and_partners', image: '/assets/sbp-l4 1.png' },
    { name: 'Designworks', image: '/assets/Designworks-42.png' },
    { name: 'TGE', image: '/assets/TGE-27.png' },
    { name: 'GBArchitect', image: '/assets/GBArchitect-39.png' },
    { name: 'Sanderson', image: '/assets/Sanderson-31.png' },
    { name: 'Cynosure', image: '/assets/cynosure-44.png' },
    { name: 'ans', image: '/assets/ans-48.png' },
    { name: 'Au', image: '/assets/Au-46.png' },
    { name: 'DesignHouse', image: '/assets/DesignHouse-26.png' },
    { name: 'genesis', image: '/assets/genesis-l3 1.png' }
  ];

  // We combine the array twice to create a seamless infinite loop
  const allLogos = [...logos, ...logos];

  return (
    <section className="py-12 -mt-24 border-y border-dark-border overflow-hidden relative bg-white">
      <div className="container mx-auto px-6 mb-8">
        <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest">
          Trusted by industry leaders globally
        </p>
      </div>

      <div className="relative w-full overflow-hidden">

        {/* Left and Right Fade Gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r from-[] to-transparent pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l from-[] to-transparent pointer-events-none"></div>

        {/* 1. Added `gap-20` (or `gap-16`) to create exact equal spacing between elements.
          2. Added `pr-20` so the loop resets seamlessly without a layout jump.
        */}
        <div className="flex w-fit items-center gap-16 md:gap-24 pr-16 md:pr-24 animate-marquee ">
          {allLogos.map((logo, index) => {
            const logoKey = logo.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            const styleProps = logoStyles[logoKey] || {};

            return (

              <div
                key={index}
                className="flex items-center justify-center shrink-0"
              >
                {logo.image ? (
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className="max-h-[100px] w-auto object-contain"
                    style={{ ...styleProps }}
                    onError={(e) => {
                      console.warn(`Failed to load logo: ${logo.name}`);
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}

                {/* Fallback Text if image fails */}
                <div
                  className="hidden items-center justify-center bg-dark-surface border border-dark-border px-4 py-2 rounded-lg"
                  style={{ display: logo.image ? 'none' : 'flex' }}
                >
                  <span className="text-gray-400 font-bold tracking-wider text-sm">{logo.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LogoSection;