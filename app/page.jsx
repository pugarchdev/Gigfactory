"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Importing all the home page components
import Hero from '@/components/home/Hero';
import LogoSection from '@/components/home/LogoSection';
import Services from '@/components/home/Services';
import Lifecycle from '@/components/home/Lifecycle';
import Advantages from '@/components/home/Advantages';
import CaseStudies from '@/components/home/CaseStudies';

import ContactModal from '@/components/home/ContactModal';
import Video from '@/components/home/Video'
import StatsBar from '@/components/home/StatsBar';
export default function Home() {
  const router = useRouter();
  
  // State to manage the visibility of the Contact Modal
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  // State to track which service the user clicked on (optional, to pre-fill the form)
  const [serviceToOpen, setServiceToOpen] = useState(null);

  // Function to open the modal directly to the form step
  const openContactModal = (serviceName = null) => {
    if (typeof serviceName === 'string') {
      setServiceToOpen(serviceName);
    } else {
      setServiceToOpen(null);
    }
    setIsContactModalOpen(true);
  };

  // Function to close the modal
  const closeContactModal = () => {
    setIsContactModalOpen(false);
    setTimeout(() => setServiceToOpen(null), 300); 
  };

  return (
    <main className="relative flex flex-col gap-16 md:gap-24 overflow-hidden">
      
      {/* Hero Section */}
      <Hero onContactClick={() => openContactModal('General Inquiry')} />

      {/* Logo Section */}
      <LogoSection />

       <StatsBar/>
      {/* Services Section */}
      <Services onContactClick={openContactModal} serviceToOpen={serviceToOpen} />

      {/* Lifecycle Section */}
      <Lifecycle onContactClick={() => openContactModal('Lifecycle Consultation')} />

      {/* Advantages Section */}
      <Advantages onContactClick={() => openContactModal('Partnership Inquiry')} />

      {/* Trust Section */}
      <Video />

      {/* Case Studies Section */}
      <CaseStudies onContactClick={() => openContactModal('Case Study Details')} />

      {/* Contact Modal - Set to initialStep={1} to skip intro and open form directly */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={closeContactModal} 
        preSelectedService={serviceToOpen}
        initialStep={1}
      />
      
    </main>
  );
}