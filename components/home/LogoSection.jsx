'use client'

const LogoSection = () => {
  // Individual logo styles for precise control
  const logoStyles = {
    'tcs': { maxHeight: '200px', maxWidth: '150px' },
    'adani': { maxHeight: '75px', maxWidth: '150px' },
    'lt': { maxHeight: '105px', maxWidth: '130px' },
    'salesforce': { maxHeight: '100px', maxWidth: '150px' },
    'emaar': { maxHeight: '70px', maxWidth: '140px' },
    'labindia': { maxHeight: '150px', maxWidth: '120px' },
    'sk': { maxHeight: '150px', maxWidth: '130px' },
    'spa': { maxHeight: '140px', maxWidth: '100px' },
    'mastercard': { maxHeight: '100px', maxWidth: '120px' },
    'edifice': { maxHeight: '250px', maxWidth: '150px' },
    'mmoser': { maxHeight: '250px', maxWidth: '240px' },
    'ey': { maxHeight: '70px', maxWidth: '140px' },
    'atkins': { maxHeight: '65px', maxWidth: '130px' },
    'schneider': { maxHeight: '85px', maxWidth: '130px' },
    'denkall': { maxHeight: '250px', maxWidth: '150px' },
    'mudon': { maxHeight: '80px', maxWidth: '140px' },
    'dh': { maxHeight: '90px', maxWidth: '120px' },
    'claramont': { maxHeight: '65px', maxWidth: '130px' },
    'gulf-islamic': { maxHeight: '60px', maxWidth: '120px' },
    'jacobs': { maxHeight: '70px', maxWidth: '140px' },
    'jmbaxi': { maxHeight: '65px', maxWidth: '130px' },
    'orchid': { maxHeight: '100px', maxWidth: '140px' },
    'peninsula': { maxHeight: '105px', maxWidth: '130px' },
    'skillbind': { maxHeight: '80px', maxWidth: '120px' },
    'westbridge': { maxHeight: '100px', maxWidth: '140px' },
    'ascenders': { maxHeight: '65px', maxWidth: '130px' },
    'freespanz': { maxHeight: '80px', maxWidth: '160px' },
    'gilly': { maxHeight: '75px', maxWidth: '160px' },
    'imagegrafix': { maxHeight: '120px', maxWidth: '140px' },
    'oarchilos': { maxHeight: '250px', maxWidth: '230px' },
    'turnkey': { maxHeight: '80px', maxWidth: '120px' },
    'suresh-babu-and-partners': { maxHeight: '60px', maxWidth: '120px' },
    'designworks': { maxHeight: '100px', maxWidth: '140px' },
    'tge': { maxHeight: '65px', maxWidth: '130px' },
    'gbarchitect': { maxHeight: '80px', maxWidth: '120px' },
    'sanderson': { maxHeight: '80px', maxWidth: '140px' },
    'hosmac': { maxHeight: '150px', maxWidth: '130px' },
    'cynosure': { maxHeight: '180px', maxWidth: '140px' },
    'Aesthetic': { maxHeight: '65px', maxWidth: '130px' },
    'ans': { maxHeight: '60px', maxWidth: '120px' },
    'genesis': { maxHeight: '80px', maxWidth: '140px' },
    'natash': { maxHeight: '150px', maxWidth: '120px' },
    'AMs': { maxHeight: '180px', maxWidth: '280px' },
    'creative_luxury': { maxHeight: '100px', maxWidth: '240px' },
    'microsoft': { maxHeight: '150px', maxWidth: '120px' }
  };

  const logos = [
    { name: 'microsoft', image: '/assets/microsoft.png' },
    { name: 'TCS', image: '/assets/tcs.jpg' },
    { name: 'Adani', image: '/assets/adani.png' },
    { name: 'Emaar', image: '/assets/emaar.png' },
    { name: 'EY', image: '/assets/ey.png' },
    { name: 'Salesforce', image: '/assets/salesforce.png' },
    { name: 'Mastercard', image: '/assets/mastercard.png' },
    { name: 'gulf islamic', image: '/assets/gulf islamic.jpg' },
    { name: 'uiidb', image: '/assets/uiidb.png' },
    { name: 'Atkins', image: '/assets/atkins.jpg' },
    { name: 'Schneider', image: '/assets/schneider.png' },
    { name: 'jacobs', image: '/assets/jacobs.png' },
    { name: 'lt1', image: '/assets/lt1.png' },
    { name: 'modon1', image: '/assets/modon1.jpg' },
    { name: 'peninsula', image: '/assets/peninsula.png' },
    { name: 'creative_luxury', image: '/assets/creative_luxury.png' },
    { name: 'natash', image: '/assets/natash.png' },
    { name: 'spa', image: '/assets/spa.png' },
    { name: 'Exotic', image: '/assets/Exotic.jpg' },
    { name: 'Labindia', image: '/assets/labindia.png' },
    { name: 'AMs', image: '/assets/AMs.jpg' },
    { name: 'Aesthetic', image: '/assets/Aesthetic.png' },
    { name: 'mmoser', image: '/assets/mmoser.jpg' },
    { name: 'EDIFICE', image: '/assets/EDIFICE.png' },
    { name: 'HOSMAC', image: '/assets/HOSMAC.jpg' },
    { name: 'westbridge', image: '/assets/westbridge.png' },
    { name: 'Claramont', image: '/assets/claramont.jpg' },
    { name: 'sk', image: '/assets/sk.png' },
    { name: 'DH', image: '/assets/DH.png' },
    { name: 'denkall', image: '/assets/denkall.png' },
    { name: 'jmbaxi', image: '/assets/jmbaxi.png' },
    { name: 'orchid', image: '/assets/orchid.png' },
    { name: 'skillbind', image: '/assets/skillbind.png' },
    { name: 'ascenders', image: '/assets/ascenders.jpg' },
    { name: 'freespanz', image: '/assets/freespanz.png' },
    { name: 'gilly', image: '/assets/gilly.jpg' },
    { name: 'imagegrafix', image: '/assets/imagegrafix.png' },
    { name: 'oarchilos', image: '/assets/oarchilos.jpg' },
    { name: 'turnkey', image: '/assets/turnkey.jpg' },
    { name: 'suresh_babu_and_partners', image: '/assets/suresh_babu_and_partners_logo.jpg' },
    { name: 'Designworks', image: '/assets/Designworks.jpg' },
    { name: 'TGE', image: '/assets/TGE.png' },
    { name: 'GBArchitect', image: '/assets/GBArchitect.jpg' },
    { name: 'Sanderson', image: '/assets/Sanderson.jpg' },
    { name: 'Cynosure', image: '/assets/cynosure1.png' },
    { name: 'ans', image: '/assets/ans.png' },
    { name: 'Au', image: '/assets/Au.png' },
    { name: 'TheDesignHouse', image: '/assets/TheDesignHouse.png' },
    { name: 'genesis', image: '/assets/genesis.png' }
  ];

  // We combine the array twice to create a seamless infinite loop
  const allLogos = [...logos, ...logos];

  return (
    <section className="py-12 -mt-24 border-y border-dark-border  overflow-hidden relative">
      <div className="container mx-auto px-6 mb-8">
        <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest">
          Trusted by industry leaders globally
        </p>
      </div>

      <div className="relative flex w-full">

        {/* Left and Right Fade Gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r from-[#000000] to-transparent pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l from-[#000000] to-transparent pointer-events-none"></div>

        {/* 1. Added `gap-20` (or `gap-16`) to create exact equal spacing between elements.
          2. Added `pr-20` so the loop resets seamlessly without a layout jump.
        */}
        <div className="flex w-fit items-center gap-16 md:gap-24 pr-16 md:pr-24 animate-marquee">
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