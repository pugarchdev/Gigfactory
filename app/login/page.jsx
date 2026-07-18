'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AgencyForm from '@/components/form/AgencyForm'
import GigExpertRegisterForm from '@/components/form/GigExpertRegisterForm'
import { Lightbulb, Users, Target, TrendingUp } from 'lucide-react'

// --- REUSABLE ANIMATION WRAPPER ---
const AnimatedSection = ({ children, animationClass, className = "", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false)
    const domRef = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(domRef.current)
                }
            },
            { threshold: 0.1 }
        )
        if (domRef.current) observer.observe(domRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={domRef}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-1000 ease-[0.22,1,0.36,1] ${isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : animationClass
                } ${className}`}
        >
            {children}
        </div>
    )
}

const API_BASE_URL = process.env.NEXT_PUBLIC_PLATFORM_API_URL || "http://localhost:5000/api";
const PLATFORM_URL_RAW = process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:5173";
const PLATFORM_URL = PLATFORM_URL_RAW.endsWith('/') ? PLATFORM_URL_RAW.slice(0, -1) : PLATFORM_URL_RAW;

export default function Login() {
    const [showAgencyForm, setShowAgencyForm] = useState(false)
    const [showGigExpertRegisterForm, setShowGigExpertRegisterForm] = useState(false)

    // SSO login and OTP States
    const [authMethod, setAuthMethod] = useState('otp') // 'otp' or 'password'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('')
    const [isOtpSent, setIsOtpSent] = useState(false)
    const [timer, setTimer] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    // Countdown Timer for OTP Resending
    useEffect(() => {
        let interval = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0 && isOtpSent) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer, isOtpSent]);

    const handleSendOtp = async (e) => {
        e?.preventDefault();
        if (!email) {
            setErrorMsg("Please enter your email address first.");
            return;
        }
        setIsLoading(true);
        setErrorMsg('');
        setSuccessMsg('');
        try {
            const res = await fetch(`${API_BASE_URL}/auth/request-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, purpose: 'login_verification' }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to send OTP.");
            }
            setSuccessMsg(data.message || "OTP sent successfully to your email!");
            setIsOtpSent(true);
            setTimer(30);
        } catch (err) {
            setErrorMsg(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpLoginSubmit = async (e) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            setErrorMsg("Please enter the 6-digit OTP code.");
            return;
        }
        setIsLoading(true);
        setErrorMsg('');
        setSuccessMsg('');
        try {
            const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "OTP verification failed.");
            }
            setSuccessMsg("OTP verified! Redirecting to platform...");
            setTimeout(() => {
                window.location.href = `${PLATFORM_URL}/?token=${data.token}&refreshToken=${data.refreshToken}&user=${encodeURIComponent(JSON.stringify(data.user))}`;
            }, 1000);
        } catch (err) {
            setErrorMsg(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordLoginSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMsg("Please fill in both email and password.");
            return;
        }
        setIsLoading(true);
        setErrorMsg('');
        setSuccessMsg('');
        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Login failed.");
            }
            setSuccessMsg("Login successful! Redirecting to platform...");
            setTimeout(() => {
                window.location.href = `${PLATFORM_URL}/?token=${data.token}&refreshToken=${data.refreshToken}&user=${encodeURIComponent(JSON.stringify(data.user))}`;
            }, 1000);
        } catch (err) {
            setErrorMsg(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleAuthMethod = () => {
        setErrorMsg('');
        setSuccessMsg('');
        if (authMethod === 'password') {
            setAuthMethod('otp');
            setIsOtpSent(false);
            setOtp('');
        } else {
            setAuthMethod('password');
        }
    };

    const handleBackToEmail = () => {
        setIsOtpSent(false);
        setOtp('');
        setErrorMsg('');
        setSuccessMsg('');
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (authMethod === 'otp') {
            if (isOtpSent) {
                handleOtpLoginSubmit(e);
            } else {
                handleSendOtp(e);
            }
        } else {
            handlePasswordLoginSubmit(e);
        }
    };



    const inputBaseStyle = "w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-[#6EDD4D] transition-all placeholder:text-zinc-500 dark:placeholder:text-zinc-600 focus:bg-zinc-50 dark:focus:bg-zinc-900/50"
    const labelStyle = "block text-xs font-bold text-zinc-600 dark:text-zinc-500 uppercase tracking-widest mb-2"

     const culturePillars = [
        { title: "Intelligence-Driven Thinking", description: "We embrace creativity and forward-thinking solutions", icon: <Lightbulb size={20} /> },
        { title: "Collaboration Over Silos", description: "We work together to achieve exceptional results", icon: <Users size={20} /> },
        { title: "Ownership & Accountability", description: "We uphold the highest standards of ethics and transparency", icon: <Target size={24} /> },
        { title: "Continuous Learning", description: "We strive for outstanding quality in everything we do", icon: <TrendingUp size={24} /> }
    ]
    return (
        <main className=" bg-zinc-100 dark:bg-[#030303] text-zinc-900 dark:text-zinc-100 selection:bg-[#6EDD4D]/30 relative overflow-hidden">

            {/* --- ADVANCED BACKGROUND SYSTEM --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* 1. Blueprint Grid */}
                <div
                    className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12] [background-size:45px_45px] [background-image:linear-gradient(#d4d4d8_1px,transparent_1px),linear-gradient(90deg,#d4d4d8_1px,transparent_1px)] dark:[background-image:linear-gradient(#1e1e1e_1px,transparent_1px),linear-gradient(90deg,#1e1e1e_1px,transparent_1px)]"
                />

                {/* 2. Moving Laser Scanning Beams */}
                <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#6EDD4D]/30 to-transparent"
                />
                <motion.div
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
                    className="absolute top-0 left-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#6EDD4D]/15 to-transparent"
                />

                {/* 3. Deep Ambient Orbs */}
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#6EDD4D]/5 blur-[150px] rounded-full animate-pulse"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12 md:py-16 lg:py-0 max-w-7xl  lg:flex lg:flex-col lg:justify-center lg:gap-10 lg:mt-20 mt-10">
                
                {/* ===== MAIN LOGIN CARD (CORE Section) ===== */}
                <AnimatedSection animationClass="opacity-0 translate-y-12 " delay={100}>
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[3rem] border border-zinc-200 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-900/30 overflow-hidden mb-12 lg:mb-0 shadow-xl dark:shadow-[0_40px_100px_rgba(0,0,0,0.8)] backdrop-blur-md">

                        {/* LEFT SIDE: LOGO BOX */}
                        <div className="p-16 md:p-24 lg:p-14 flex flex-col items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 relative overflow-hidden">
                            {/* Inner Decoration */}
                            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                                className="flex flex-col items-center justify-center"
                            >
                                <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter drop-shadow-2xl leading-none">
                                    <span className="text-[#6EDD4D]">Gig</span>
                                    <span className="text-zinc-900 dark:text-white">factory</span>
                                </h1>
                                <p className="text-zinc-550 dark:text-zinc-500 text-center text-xs md:text-sm font-bold uppercase tracking-[0.25em] leading-tight mt-2">
                                    Building Intelligence, <br className="md:hidden" /> Growing Together.
                                </p>
                            </motion.div>
                        </div>

                        {/* RIGHT SIDE: LOGIN FORM */}
                        <motion.div 
                            layout="size"
                            transition={{ type: "spring", stiffness: 350, damping: 35 }}
                            className="p-12 md:p-20 lg:p-12 flex flex-col justify-center bg-transparent border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800/50 overflow-hidden"
                        >
                            <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">Login to your account</h2>

                            {/* Alert Notifications */}
                            <AnimatePresence mode="sync">
                                {errorMsg && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0, y: -10 }}
                                        animate={{ opacity: 1, height: "auto", y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-xl text-sm mb-6 flex items-center justify-between transition-all overflow-hidden"
                                    >
                                        <span className="font-semibold">{errorMsg}</span>
                                        <button type="button" onClick={() => setErrorMsg('')} className="text-red-500 hover:text-red-700 font-bold ml-2 text-lg leading-none">&times;</button>
                                    </motion.div>
                                )}
                                {successMsg && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0, y: -10 }}
                                        animate={{ opacity: 1, height: "auto", y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-[#6EDD4D]/10 border border-[#6EDD4D]/30 text-[#6EDD4D] px-4 py-3 rounded-xl text-sm mb-6 flex items-center justify-between transition-all overflow-hidden"
                                    >
                                        <span className="font-semibold">{successMsg}</span>
                                        <button type="button" onClick={() => setSuccessMsg('')} className="text-[#6EDD4D] hover:text-[#5bc43f] font-bold ml-2 text-lg leading-none">&times;</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div className="group">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-xs font-bold text-zinc-650 dark:text-zinc-500 uppercase tracking-widest">Mail ID</label>
                                        {authMethod === 'otp' && isOtpSent && (
                                            <button 
                                                type="button" 
                                                onClick={handleBackToEmail} 
                                                className="text-[#6EDD4D] hover:underline text-xs flex items-center gap-1 font-bold"
                                            >
                                                Change Email
                                            </button>
                                        )}
                                    </div>
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email" 
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={authMethod === 'otp' && isOtpSent}
                                        className={`${inputBaseStyle} ${authMethod === 'otp' && isOtpSent ? 'opacity-60 cursor-not-allowed' : ''}`} 
                                    />
                                </div>

                                <AnimatePresence mode="wait">
                                    {authMethod === 'password' && (
                                        <motion.div
                                            key="password-field"
                                            initial={{ opacity: 0, height: 0, y: -10 }}
                                            animate={{ opacity: 1, height: "auto", y: 0 }}
                                            exit={{ opacity: 0, height: 0, y: -10 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="group pt-2">
                                                <label className={labelStyle}>Password</label>
                                                <input 
                                                    type="password" 
                                                    placeholder="Enter your password" 
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className={inputBaseStyle} 
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {authMethod === 'otp' && isOtpSent && (
                                        <motion.div
                                            key="otp-field"
                                            initial={{ opacity: 0, height: 0, y: -10 }}
                                            animate={{ opacity: 1, height: "auto", y: 0 }}
                                            exit={{ opacity: 0, height: 0, y: -10 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="group pt-2">
                                                <div className="flex justify-between items-center mb-2">
                                                    <label className="text-xs font-bold text-zinc-650 dark:text-zinc-500 uppercase tracking-widest">One Time Password (OTP)</label>
                                                    {timer > 0 ? (
                                                        <span className="text-zinc-500 text-xs font-medium">Resend in {timer}s</span>
                                                    ) : (
                                                        <button type="button" onClick={handleSendOtp} className="text-[#6EDD4D] hover:underline text-xs font-bold">
                                                            Resend OTP
                                                        </button>
                                                    )}
                                                </div>
                                                <input 
                                                    type="text" 
                                                    placeholder="Enter 6-Digit OTP" 
                                                    required
                                                    maxLength={6}
                                                    value={otp}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                                                        setOtp(val);
                                                    }}
                                                    className={inputBaseStyle} 
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.button
                                    layout
                                    whileHover={{ scale: 1.02 }} 
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full mt-2 bg-[#6EDD4D] text-zinc-950 font-black text-sm tracking-[0.2em] py-5 rounded-2xl shadow-[0_15px_30px_rgba(110,221,77,0.2)] hover:shadow-[0_20px_40px_rgba(110,221,77,0.3)] transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading 
                                        ? (authMethod === 'otp' ? 'Processing...' : 'Logging In...') 
                                        : authMethod === 'otp' 
                                            ? (isOtpSent ? 'Verify & Log In' : 'Send OTP') 
                                            : 'LOG IN'
                                    }
                                </motion.button>
                            </form>

                            {/* Toggle login method */}
                            <div className="mt-8 text-center">
                                <button 
                                    type="button" 
                                    onClick={handleToggleAuthMethod}
                                    className="text-zinc-500 hover:text-zinc-850 dark:hover:text-zinc-300 text-sm underline font-bold"
                                >
                                    {authMethod === 'otp' ? 'Login with password instead' : 'Login with OTP instead'}
                                </button>
                            </div>
                        </motion.div>
                    </section>
                </AnimatedSection>

                {/* ===== JOIN NETWORK SECTION ===== */}
                <AnimatedSection animationClass="opacity-0 scale-95" delay={300}>
                    <section className="mb-12 lg:mb-0 relative group">
                        <div className="absolute -inset-1 bg-[#6EDD4D]/10 rounded-[2.6rem] blur-xl opacity-0 group-hover:opacity-10 transition duration-1000"></div>
                        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/20 backdrop-blur-2xl p-10 md:p-14 lg:p-8 text-left shadow-2xl gap-8">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#6EDD4D]/30 bg-[#6EDD4D]/10 text-[#6EDD4D] text-[10px] font-extrabold uppercase tracking-widest mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#6EDD4D]" />
                                    Global Talent Network
                                </div>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-905 dark:text-white mb-3 tracking-tight uppercase leading-tight">
                                    Interested in becoming a <br className="hidden md:inline" /> <span className="text-[#6EDD4D]">Gigfactory Expert?</span>
                                </h2>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium">
                                    Join our network of elite construction agencies and independent professionals. Gain access to premium workflows and scale your output.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                    onClick={() => setShowAgencyForm(true)}
                                    className="px-8 py-4.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-transparent border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-500 dark:hover:border-zinc-700 transition-all text-center"
                                >
                                    Apply as an Agency
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                    onClick={() => setShowGigExpertRegisterForm(true)}
                                    className="px-8 py-4.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-[#6EDD4D] text-zinc-950 hover:bg-[#5bc43f] hover:shadow-[0_0_25px_rgba(110,221,77,0.35)] transition-all text-center"
                                >
                                    Apply as a Gig Expert
                                </motion.button>
                            </div>
                        </div>
                    </section>
                </AnimatedSection>
  {/* ===== CULTURE SECTION ===== */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start my-16 relative">
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-5 pt-4">
                        <AnimatedSection animationClass="opacity-0 -translate-x-10">
                            <h2 className="text-6xl md:text-8xl font-black text-zinc-900 dark:text-white leading-[0.85] mb-2 uppercase tracking-tighter">
                                Our Culture
                            </h2>
                            <h2 className="text-6xl md:text-8xl font-black text-[#6EDD4D] leading-[0.85] mb-12 uppercase tracking-tighter">
                                Pillars
                            </h2>
                            <div className="relative">
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#6EDD4D]/40 rounded-full"></div>
                                <p className="text-zinc-600 dark:text-zinc-400 text-xl max-w-md leading-relaxed font-medium pl-8 italic">
                                    At Gigfactory, culture is not just about where we work — it&apos;s about how we think, collaborate, and build.
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>
                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {culturePillars.map((pillar, index) => (
                            <AnimatedSection
                                key={index}
                                animationClass="opacity-0 translate-y-12"
                                delay={index * 150}
                            >
                                <div className="p-10 h-full rounded-[2.5rem] bg-white/80 dark:bg-white/5 border border-zinc-200 dark:border-white/5 transition-all duration-500 hover:border-[#6EDD4D]/30 hover:bg-[#6EDD4D]/5 group">
                                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-[#6EDD4D]/40 transition-all duration-500 text-[#6EDD4D] group-hover:text-zinc-900 dark:group-hover:text-white">
                                        {pillar.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-[#6EDD4D] transition-colors tracking-tight">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors">
                                        {pillar.description}
                                    </p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </section>
            </div>

            {/* Form Modals */}
            <AnimatePresence>
                {showGigExpertRegisterForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100]">
                        <GigExpertRegisterForm onClose={() => setShowGigExpertRegisterForm(false)} />
                    </motion.div>
                )}
                {showAgencyForm && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100]">
                        <AgencyForm onClose={() => setShowAgencyForm(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
             
        </main>
    )
}