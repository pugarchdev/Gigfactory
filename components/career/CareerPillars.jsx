"use client";

import React from 'react';
import { Lightbulb, Users, Target } from 'lucide-react';

const PILLARS = [
  {
    id: 'learn-grow',
    title: 'Learn & Grow',
    description:
      'Get hands-on experience, work on high-impact projects, and build your future with access to global mentorship.',
    icon: Lightbulb,
  },
  {
    id: 'collaborate',
    title: 'Collaborate',
    description:
      'Work alongside diverse teams, share transformative ideas, and create global impact in digital construction workflows.',
    icon: Users,
  },
  {
    id: 'impact',
    title: 'Make an Impact',
    description:
      'Be part of solutions that drive efficiency, sustainability, and quality across complex built environments.',
    icon: Target,
  },
];

export default function CareerPillars({ onScrollToForm }) {
  const handleScroll = () => {
    if (onScrollToForm) {
      onScrollToForm();
      return;
    }
    const formSection = document.getElementById('application-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-xs font-bold tracking-[0.15em] text-[#22c55e] uppercase mb-3">
        WHY GIGFACTORY
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white max-w-xl leading-tight">
          A culture built on people, purpose and progress.
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-lg leading-relaxed">
          We&apos;re a team of passionate problem-solvers, engineers, and digital architects
          working at the intersection of modern construction technology and global infrastructure excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.id}
              className="rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: '#121820',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#22c55e]/15 text-[#22c55e] flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

             
            </div>
          );
        })}
      </div>
    </section>
  );
}
