'use client'

import { useState, useEffect } from 'react';
import { mediaApi } from '../../lib/api';

const LogoSection = () => {
  const STATIC_LOGOS = [
    { name: 'microsoft', image: '/assets/microsoft-1.png' },
    { name: 'TCS', image: '/assets/tcs-2.png' },
    { name: 'Adani', image: '/assets/adani-3.png' },
    { name: 'Emaar', image: '/assets/emaar-6.png' },
    { name: 'EY', image: '/assets/ey-12.png' },
    { name: 'Salesforce', image: '/assets/salesforce-4.png' },
    { name: 'Mastercard', image: '/assets/mastercard-5.png' },
    { name: 'gulfislamic', image: '/assets/gulfislamic-7.png' },
    { name: 'uiidb', image: '/assets/uiidb-9.png' },
    { name: 'Atkins', image: '/assets/atkins-8.png' }
  ];

  const [logos, setLogos] = useState(STATIC_LOGOS);

  useEffect(() => {
    const loadCustomLogos = async () => {
      try {
        const customLogos = await mediaApi.list({ type: 'logo', status: 'published' });
        if (customLogos && customLogos.length > 0) {
          const mapped = customLogos.map(logo => ({
            name: logo.title,
            image: logo.image,
            logoMaxHeight: logo.logoMaxHeight,
            logoMaxWidth: logo.logoMaxWidth,
          }));
          setLogos(mapped);
        }
      } catch (error) {
        console.error('Failed to load custom logos from database:', error);
      }
    };
    loadCustomLogos();
  }, []);

  // We combine the array twice to create a seamless infinite loop
  const allLogos = logos ? [...logos, ...logos] : [];

  return (
    <section className="py-12 -mt-24 overflow-hidden relative bg-white">
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
            const styleProps = {};
            if (logo.logoMaxHeight) styleProps.maxHeight = logo.logoMaxHeight;
            if (logo.logoMaxWidth) styleProps.maxWidth = logo.logoMaxWidth;

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
                    loading="eager"
                    fetchPriority="high"
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