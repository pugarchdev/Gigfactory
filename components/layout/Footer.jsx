'use client'

import { useState } from 'react'
import Link from 'next/link'

import ContactModal from '@/components/home/ContactModal'

export default function Footer() {

    const [isContactModalOpen, setIsContactModalOpen] = useState(false)
    return (
        <footer className="relative border-t border-dark-border bg-dark-base pt-16 pb-20 overflow-hidden">

            {/* Dark Theme Architectural Blueprint Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            {/* Subtle bottom glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[150px] bg-neon-green/5 blur-[100px] rounded-t-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center tracking-tight">
                    Site Map
                </h2>

                {/* 4-Column Grid exactly mapping your image */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">

                    {/* Column 1: Our Expertise */}
                    <div>
                        <h3 className="text-[#6EDD4D] font-bold text-xl mb-6">Our Expertise</h3>
                        <ul className="space-y-4 text-zinc-400 font-medium">
                            <li>
                                <Link href="/expertise" className="hover:text-[#6EDD4D] hover:translate-x-1 inline-block transition-all duration-300">
                                    Construction Management
                                </Link>
                            </li>
                            <li>
                                <Link href="/expertise" className="hover:text-[#6EDD4D] hover:translate-x-1 inline-block transition-all duration-300">
                                    Project Planning
                                </Link>
                            </li>
                            <li>
                                <Link href="/expertise" className="hover:text-[#6EDD4D] hover:translate-x-1 inline-block transition-all duration-300">
                                    BIM Integration
                                </Link>
                            </li>
                            <li>
                                <Link href="/expertise" className="hover:text-[#6EDD4D] hover:translate-x-1 inline-block transition-all duration-300">
                                    Quality Assurance
                                </Link>
                            </li>
                            <li>
                                <Link href="/expertise" className="hover:text-[#6EDD4D] hover:translate-x-1 inline-block transition-all duration-300">
                                    Risk Management
                                </Link>
                            </li>
                            <li>
                                <Link href="/expertise" className="hover:text-[#6EDD4D] hover:translate-x-1 inline-block transition-all duration-300">
                                    Cost Control
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Services */}
                    <div>
                        <h3 className="text-[#6EDD4D] font-bold text-xl mb-6">Services</h3>
                        <ul className="space-y-4 text-zinc-400 font-medium">
                            <li>
                                <Link href="/services?service=2d" className="hover:text-white hover:translate-x-1 hover:text-[#6EDD4D] inline-block transition-all duration-300">
                                    2D Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/services?service=3d" className="hover:text-white hover:translate-x-1 hover:text-[#6EDD4D] inline-block transition-all duration-300">
                                    3D Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/services?service=4d" className="hover:text-white hover:translate-x-1 hover:text-[#6EDD4D] inline-block transition-all duration-300">
                                    4D Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/services?service=pp-c" className="hover:text-white hover:translate-x-1 hover:text-[#6EDD4D] inline-block transition-all duration-300">
                                    Project Planning & Controls
                                </Link>
                            </li>
                            <li>
                                <Link href="/services?service=boq" className="hover:text-white hover:translate-x-1 hover:text-[#6EDD4D] inline-block transition-all duration-300">
                                    BOQ Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/services?service=audit" className="hover:text-white hover:translate-x-1 hover:text-[#6EDD4D] inline-block transition-all duration-300">
                                    Audit Services
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div>
                        <h3 className="text-neon-green font-bold text-xl mb-6">Quick Links</h3>
                        <ul className="space-y-4 text-gray-400 font-medium">
                            <li><Link href="/about" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">About Us</Link></li>
                            <li><Link href="/projects" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Projects</Link></li>
                            <li><Link href="/case-studies" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Case Studies</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Us */}
                    <div>
                        <h3 className="text-[#6EDD4D] font-bold text-xl mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-zinc-400 font-medium">
                            {/* Opens the Contact Modal */}
                            <li>
                                {/* <button
                                    onClick={() => setIsContactModalOpen(true)}
                                    className="hover:text-[#6EDD4D] hover:translate-x-1 inline-block transition-all duration-300 text-left"
                                >
                                    Get In Touch
                                </button> */}
                                <Link
                                    href="/contact"
                                    className="hover:text-[#6EDD4D] hover:translate-x-1 inline-block transition-all duration-300 text-left"
                                >
                                    Get In Touch
                                </Link>
                            </li>

                            {/* Opens Default Email Client */}
                            <li>
                                <a
                                    href="mailto:hello@gigfactory.com"
                                    className="hover:text-[#6EDD4D] hover:translate-x-1 inline-block transition-all duration-300"
                                >
                                    Email Us
                                </a>
                            </li>

                            {/* Opens Phone Dialer */}
                            <li>
                                <a
                                    href="tel:+919876543210"
                                    className="hover:text-[#6EDD4D] hover:translate-x-1 inline-block transition-all duration-300"
                                >
                                    Call Us
                                </a>
                            </li>

                            {/* Opens LinkedIn in a New Tab */}
                            <li>
                                <a
                                    href="https://www.linkedin.com/company/your-company-profile"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-[#6EDD4D] hover:translate-x-1 inline-block transition-all duration-300"
                                >
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Optional: Bottom Copyright Row */}
                <div className="border-t border-dark-border mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Gigfactory. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
                    </div>
                </div>

            </div>

            {isContactModalOpen && (
                <ContactModal
                    isOpen={isContactModalOpen} // <--- Add this line
                    onClose={() => setIsContactModalOpen(false)}
                />
            )}
        </footer>
    );
}