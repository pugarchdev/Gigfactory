import React from 'react';
import CareerHero from '@/components/career/CareerHero';
import CareerPillars from '@/components/career/CareerPillars';
import CareerTalentPool from '@/components/career/CareerTalentPool';
import CareerForm from '@/components/career/CareerForm';

export const metadata = {
  title: 'Careers | Gigfactory - Global Construction Experts',
  description:
    'Join our high-performance team pushing the boundaries of digital construction workflows, designing, and engineering services worldwide.',
  keywords: ['digital construction workflows', 'construction engineering jobs', 'Gigfactory careers', 'engineering jobs'],
  openGraph: {
    title: 'Careers | Gigfactory',
    description:
      'Become part of a high-performance team pushing the boundaries of digital construction workflows, designing, and engineering services worldwide.',
  },
};

export default function CareerPage() {
  return (
    <div className="min-h-screen text-[#f3f4f6]" style={{ backgroundColor: '#0a0d12' }}>
      <CareerHero />
      <CareerPillars />
      <CareerTalentPool />
      <CareerForm />
    </div>
  );
}
