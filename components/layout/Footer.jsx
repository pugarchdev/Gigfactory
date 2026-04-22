'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaLinkedinIn } from 'react-icons/fa'
import ContactModal from '@/components/home/ContactModal'
import GigExpertForm from '@/components/form/GigExpertForm'

export default function Footer() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false)
    const [isGigExpertFormOpen, setIsGigExpertFormOpen] = useState(false)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    return (
        <footer className="relative border-t border-dark-border bg-dark-base pt-16 lg:pt-24 pb-8 lg:pb-12 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[150px] bg-neon-green/5 blur-[100px] rounded-t-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 mb-12 lg:mb-16" variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Section 1: Logo & Description */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-12 lg:col-span-3 xl:col-span-3"

                    >
                        {/* LOGO */}
                        <Link href="/" className="inline-block">
                            <Image
                                src="/assets/GIG.png"
                                alt="Gigfactory Logo"
                                width={180}
                                height={50}
                                className="object-contain"
                            />
                        </Link>

                        {/* DESCRIPTION */}
                        <p className="text-zinc-400 text-sm lg:text-base leading-relaxed max-w-sm font-medium mb-6">
                            Global Capability Center providing cutting-edge BIM and construction services worldwide. Engineering the future of infrastructure.
                        </p>
                        {/* FLAGS + LINKEDIN (ADDED HERE) */}
                        <div className="flex flex-col items-start gap-4">

                            {/* FLAGS */}
                            <div className="flex items-center gap-2">
                                {/* India Flag */}
                                <svg className="w-6 h-4 rounded-sm shadow-sm" viewBox="0 0 24 16" fill="none">
                                    <rect width="24" height="16" fill="#FF9933" />
                                    <rect y="5.33" width="24" height="5.33" fill="white" />
                                    <rect y="10.67" width="24" height="5.33" fill="#138808" />
                                    <circle cx="12" cy="8" r="2" fill="#000080" />
                                </svg>

                                {/* UK Flag */}
                                <a
                                    href="https://www.baca.uk.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block hover:opacity-80 transition-opacity"
                                >
                                    <svg className="w-6 h-4 rounded-sm shadow-sm" viewBox="0 0 24 16" fill="none">
                                        <rect width="24" height="16" fill="#012169" />
                                        <path d="M0 0L24 16M24 0L0 16" stroke="white" strokeWidth="2.67" />
                                        <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.33" />
                                        <path d="M12 0V16M0 8H24" stroke="white" strokeWidth="4" />
                                        <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="2.67" />
                                    </svg>
                                </a>
                            </div>

                            {/* LINKEDIN */}
                            <a
                                href="https://www.linkedin.com/company/gigfactory/?viewAsMember=true"
                                target="_blank"
                                className="w-10 h-10 rounded-full border border-dark-border bg-dark-base flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#6EDD4D] hover:bg-[#6EDD4D]/10 transition-all"
                            >
                                <FaLinkedinIn size={18} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Section 2: Links Columns */}
                    <div className="md:col-span-12 lg:col-span-6 xl:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 xl:gap-16">
                        <motion.div variants={itemVariants}>
                            <h3 className="text-[#6EDD4D] font-bold text-sm lg:text-base uppercase tracking-widest mb-6">Expertise</h3>
                            <ul className="space-y-3 text-zinc-400 text-sm lg:text-base font-medium">
                                <li><Link href="/expertise" className="hover:text-[#6EDD4D] transition-colors inline-block">BIM Services</Link></li>
                                <li><Link href="/expertise#bim-consulting" className="hover:text-[#6EDD4D] transition-colors inline-block">BIM Consulting</Link></li>
                                <li><Link href="/expertise#other-services" className="hover:text-[#6EDD4D] transition-colors inline-block">Other Services</Link></li>
                            </ul>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h3 className="text-[#6EDD4D] font-bold text-sm lg:text-base uppercase tracking-widest mb-6">Services</h3>
                            <ul className="space-y-3 text-zinc-400 text-sm lg:text-base font-medium">
                                <li><Link href="/services?service=2d" className="hover:text-[#6EDD4D] transition-colors inline-block">2D Services</Link></li>
                                <li><Link href="/services?service=3d" className="hover:text-[#6EDD4D] transition-colors inline-block"> 3D Services</Link></li>
                                <li><Link href="/services?service=3d-bim" className="hover:text-[#6EDD4D] transition-colors inline-block">3D BIM Services</Link></li>
                                <li><Link href="/services?service=4d" className="hover:text-[#6EDD4D] transition-colors inline-block">4D Services</Link></li>
                                <li><Link href="/services?service=pp-c" className="hover:text-[#6EDD4D] transition-colors inline-block">Project Planning & Controls</Link></li>
                                <li><Link href="/services?service=boq" className="hover:text-[#6EDD4D] transition-colors inline-block">BOQ & Quantity Intelligence</Link></li>
                                <li><Link href="/services?service=audit" className="hover:text-[#6EDD4D] transition-colors inline-block">Audit & Verification</Link></li>
                            </ul>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h3 className="text-[#6EDD4D] font-bold text-sm lg:text-base uppercase tracking-widest mb-6">Quick Links</h3>
                            <ul className="space-y-3 text-zinc-400 text-sm lg:text-base font-medium">
                                <li><Link href="/about" className="hover:text-[#6EDD4D] transition-colors inline-block">About</Link></li>
                                <li><Link href="/projects" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Projects</Link></li>
                                <li><Link href="/case-studies" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Case Studies</Link></li>
                                <li><Link href="/login" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Become a Gigfactory Expert</Link></li>

                                <li>
                                    <button
                                        onClick={() => setIsGigExpertFormOpen(true)}
                                        className="hover:text-[#6EDD4D] transition-colors text-left inline-block"
                                    >
                                        GigExpert Feedback
                                    </button>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h3 className="text-[#6EDD4D] font-bold text-sm lg:text-base uppercase tracking-widest mb-6">Contact</h3>
                            <ul className="space-y-3 text-zinc-400 text-sm lg:text-base font-medium">
                                <li><a href="tel:+919876543210" className="hover:text-[#6EDD4D] transition-colors inline-block">Call</a></li>
                                <li>
                                    <button
                                        onClick={() => setIsContactModalOpen(true)}
                                        className="hover:text-[#6EDD4D] transition-colors text-left inline-block"
                                    >
                                        Email Us
                                    </button>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="hover:text-[#6EDD4D] hover:translate-x-1 inline-block transition-all duration-300 text-left"
                                    >
                                        Get In Touch
                                    </Link>
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    {/* Section 3: Connect Box */}

                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="border-t border-dark-border pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] md:text-xs uppercase font-bold tracking-[0.2em] text-zinc-500 text-center md:text-left"
                >
                    <p>&copy; {new Date().getFullYear()} Gigfactory. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </motion.div>
            </div>

            {/* Modal Components */}
            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />

            <GigExpertForm
                isOpen={isGigExpertFormOpen}
                onClose={() => setIsGigExpertFormOpen(false)}
            />
        </footer>
    );
}