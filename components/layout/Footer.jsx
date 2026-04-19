'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image' // Added for the logo
import { motion } from 'framer-motion'
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa'
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
        <footer className="relative border-t border-dark-border bg-dark-base pt-24 pb-12 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[150px] bg-neon-green/5 blur-[100px] rounded-t-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Section 1: Logo Replacement */}
                    <motion.div variants={itemVariants} className="lg:col-span-3 flex flex-col gap-6">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/assets/GIG.png" // Replace with your actual logo path
                                alt="Gigfactory Logo"
                                width={180}
                                height={50}
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-zinc-400 text-base leading-relaxed max-w-xs font-medium">
                            Global Capability Center providing cutting-edge BIM and construction services worldwide. Engineering the future of infrastructure.
                        </p>
                    </motion.div>

                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-12">
                        <motion.div variants={itemVariants}>
                            <h3 className="text-[#6EDD4D] font-bold text-lg uppercase tracking-widest mb-8">Expertise</h3>
                            <ul className="space-y-5 text-zinc-400 text-base font-medium">
                                <li><Link href="/expertise" className="hover:text-[#6EDD4D] transition-colors">BIM</Link></li>
                                <li><Link href="/expertise" className="hover:text-[#6EDD4D] transition-colors">Planning</Link></li>
                                <li><Link href="/expertise" className="hover:text-[#6EDD4D] transition-colors">Risk</Link></li>
                                <li><Link href="/expertise" className="hover:text-[#6EDD4D] transition-colors">Cost</Link></li>
                            </ul>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h3 className="text-[#6EDD4D] font-bold text-lg uppercase tracking-widest mb-8">Services</h3>
                            <ul className="space-y-5 text-zinc-400 text-base font-medium">
                                <li><Link href="/services?service=2d" className="hover:text-[#6EDD4D] transition-colors">2D Services</Link></li>
                                <li><Link href="/services?service=3d" className="hover:text-[#6EDD4D] transition-colors">BIM 3D Services</Link></li>
                                <li><Link href="/services?service=4d" className="hover:text-[#6EDD4D] transition-colors">4D Services</Link></li>
                                <li><Link href="/services?service=pp-c" className="hover:text-[#6EDD4D] transition-colors">Project Planning & Controls</Link></li>
                                <li><Link href="/services?service=boq" className="hover:text-[#6EDD4D] transition-colors">BOQ & Quantity Intelligence</Link></li>
                                <li><Link href="/services?service=audit" className="hover:text-[#6EDD4D] transition-colors">Audit & Verification Services</Link></li>
                            </ul>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h3 className="text-[#6EDD4D] font-bold text-lg uppercase tracking-widest mb-8">Quick Links</h3>
                            <ul className="space-y-5 text-zinc-400 text-base font-medium">
                                <li><Link href="/about" className="hover:text-[#6EDD4D] transition-colors">About</Link></li>
                                {/* FIXED: Ensure the href matches your actual projects page filename */}
                                <li><Link href="/projects" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Projects</Link></li>
                                <li><Link href="/case-studies" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Case Studies</Link></li>
                                <li>
                                    <button
                                        onClick={() => setIsGigExpertFormOpen(true)}
                                        className="hover:text-[#6EDD4D] transition-colors text-left"
                                    >
                                        GigExpert Feedback Form
                                    </button>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h3 className="text-[#6EDD4D] font-bold text-lg uppercase tracking-widest mb-8">Contact</h3>
                            <ul className="space-y-5 text-zinc-400 text-base font-medium">
                                <li><a href="tel:+919876543210" className="hover:text-[#6EDD4D] transition-colors">Call</a></li>
                                <li>
                                    <button
                                        onClick={() => setIsContactModalOpen(true)}
                                        className="hover:text-[#6EDD4D] transition-colors text-left"
                                    >
                                        Email Us
                                    </button>
                                </li>
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
                            </ul>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col items-start lg:items-end gap-6">
                        <h3 className="text-[#6EDD4D] font-bold text-lg uppercase tracking-widest">Connect</h3>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 rounded-full border border-dark-border bg-dark-base flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#6EDD4D] hover:bg-[#6EDD4D]/10 transition-all">
                                <FaLinkedinIn size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full border border-dark-border bg-dark-base flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#6EDD4D] hover:bg-[#6EDD4D]/10 transition-all">
                                <FaTwitter size={20} />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="border-t border-dark-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs uppercase font-bold tracking-[0.2em] text-zinc-500"
                >
                    <p>&copy; {new Date().getFullYear()} Gigfactory. All rights reserved.</p>
                    <div className="flex gap-10">
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