'use client'

import { useState, useEffect, useRef } from 'react'

// --- REUSABLE ANIMATION WRAPPER ---
const AnimatedSection = ({ children, animationClass, className = "", delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false)
    const domRef = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(domRef.current)
                }
            },
            { threshold: 0.05 } // Low threshold because sections are long
        )

        if (domRef.current) observer.observe(domRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={domRef}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : animationClass
                } ${className}`}
        >
            {children}
        </div>
    )
}

const PolicyBlock = ({ title, id, children }) => (
    <section id={id} className="scroll-mt-32 mb-16">
        <AnimatedSection animationClass="opacity-0 translate-y-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-[#6EDD4D] text-xl opacity-50">#</span> {title}
            </h2>
            <div className="text-zinc-400 text-lg leading-relaxed space-y-6">
                {children}
            </div>
            <div className="w-full h-px bg-zinc-800/50 mt-16"></div>
        </AnimatedSection>
    </section>
)

export default function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState('intro')

    const navigation = [
        { id: 'intro', label: 'Introduction' },
        { id: 'scope', label: '1. Scope' },
        { id: 'data', label: '2. Data We Collect' },
        { id: 'usage', label: '3. Use of Information' },
        { id: 'legal', label: '4. Legal & Harm' },
        { id: 'disclosure', label: '5. Disclosure' },
        { id: 'choices', label: '6. Choices & Obligations' },
        { id: 'security', label: '7. Security' },
        { id: 'cookies', label: '8. Cookie Policy' },
        { id: 'liability', label: '9. No Liability' },
        { id: 'children', label: '10. Children’s Privacy' },
        { id: 'termination', label: '11. Termination' },
        { id: 'advertising', label: '12. Advertising Policy' },
        { id: 'changes', label: '13. Changes To This Policy' },
        { id: 'security-14', label: '14. Security' },
        { id: 'security-14b', label: '14. Security (Contact)' },
        { id: 'advertising-policy', label: 'Advertising Policy' },
        { id: 'cookie-full', label: 'Detailed Cookie Policy' },
    ]

    return (
        <main className="min-h-screen mt-[-40px] text-zinc-100 selection:bg-[#6EDD4D]/30 pb-12 md:mt-[-70px]">

            {/* Background Branding Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#6EDD4D]/5 rounded-full blur-[150px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px]"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 pt-24 md:pt-32">

                {/* Header */}
                <AnimatedSection animationClass="opacity-0 translate-y-10">
                    <header className="mb-24">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#6EDD4D]/10 border border-[#6EDD4D]/20 text-[#6EDD4D] text-xs font-bold uppercase tracking-widest mb-6">
                            Legal & Compliance
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
                            Privacy & <span className="text-[#6EDD4D]">Advertisement</span> Policy
                        </h1>
                        <p className="text-zinc-500 font-bold flex items-center gap-2">
                            <i className="fa-solid fa-calendar-check text-[#6EDD4D]"></i>
                            Updated: 22nd March 2023
                        </p>
                    </header>
                </AnimatedSection>

                <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">

                    {/* Sticky TOC Sidebar */}
                    <aside className="lg:w-1/4 shrink-0 hidden lg:block">
                        <AnimatedSection
                            animationClass="opacity-0 -translate-x-10"
                            delay={300}
                            // Move the sticky logic here so it stays relative to the tall 'aside' container
                            className="sticky top-32"
                        >
                            <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-[2rem] p-8 shadow-2xl">
                                <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6 px-4">Policy Contents</h3>

                                {/* Scrollable Container for the links */}
                                <nav className="flex flex-col gap-1 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            onClick={() => setActiveSection(item.id)}
                                            className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeSection === item.id
                                                ? 'bg-[#6EDD4D]/10 text-[#6EDD4D] border border-[#6EDD4D]/20'
                                                : 'text-zinc-500 hover:text-zinc-300'
                                                }`}
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </nav>

                                {/* Custom Scrollbar Styles */}
                                <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #27272a; 
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #6EDD4D;
                }
            `}</style>
                            </div>
                        </AnimatedSection>
                    </aside>

                    {/* Main Content Area - All client data preserved word-for-word */}
                    <div className="lg:w-3/4 max-w-4xl">

                        <PolicyBlock title="Introduction" id="intro">
                            <p>Gigfactory, (“We”, “Us”) are committed to protecting and respecting your privacy. This Privacy Notice (together with any other documents referred to herein) sets out the basis on which the personal data collected from you, or that you provide to Us, will be processed by Us in connection with the use of Our services. Please read the following carefully to understand Our views and practices regarding your personal data and how We will treat it.</p>
                            <p>We want to provide a safe and secure user experience. We will ensure that the information you submit to us, or which we collect, via various channels (including our website, through written correspondence (including e-mail), conversations or meetings with our consultants, or through any of our offices or websites globally), is only used for the purposes set out in this Privacy Policy.</p>
                            <p>Through this Privacy Policy, we aim to inform you about the types of personal information we collect, the purpose for which we use the information and the ways in which the information is handled. We’ve provided short summaries in this Privacy Policy to help you understand what information we collect, how we use it, and what choices or rights you may have. While these summaries help explain some of these concepts in a simple and clear way, we encourage you to read the entire Privacy Policy to understand our data practices.</p>
                        </PolicyBlock>

                        <PolicyBlock title="1. Scope" id="scope">
                            <p>Protecting your personal information is our priority. This Privacy Policy explains how Gigfactory processes and protects personal information about:</p>
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                                <li className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-center font-bold text-[#6EDD4D]">Registered Users</li>
                                <li className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-center font-bold text-[#6EDD4D]">Prospective Candidates</li>
                                <li className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-center font-bold text-[#6EDD4D]">Website Users</li>
                            </ul>
                            <p>This Privacy Policy applies to Information, data / any hard copy/ electronic record that may be collected /shared/ analysed and/or stored by Us. This Privacy Policy shall also be applicable irrespective of whether Our platform has been accessed/availed through a Third-Party source or directly.</p>
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mt-6">
                                <h4 className="text-white font-bold mb-4">Permitted Disclosure:</h4>
                                <p className="text-sm text-zinc-500 mb-4">User/s agree and consents that We may, in order to comply with Applicable Laws, share Your Personally Identifiable Information/PII with government authorities in the following cases:</p>
                                <ol className="list-decimal pl-5 space-y-3 text-sm text-zinc-500">
                                    <li>If a government authority requests for Information and We think disclosure is required or appropriate in order to comply with Applicable Laws, regulations, or a legal process;</li>
                                    <li>To comply with a legal requirement or process, including but not limited to, civil and criminal subpoenas, court orders or other compulsory disclosures;</li>
                                </ol>
                                <p className="mt-4 text-xs italic">User/s further agree that any liability arising out of misuse/loss/breach of Your Personally Identifiable Information/PII through the aforementioned disclosure or by the government authorities, neither We nor any of Our administrators, sister concerns, subsidiaries, representatives, associates, affiliates or assigns shall be held liable.</p>
                            </div>
                        </PolicyBlock>

                        <PolicyBlock title="2. Data We Collect" id="data">
                            <h4 className="text-[#6EDD4D] font-bold mb-6 text-xl">Information we collect from you</h4>
                            <div className="space-y-4 mb-12">
                                {[
                                    { t: "Identity Information", d: "Name, address, number, social media associated accounts, etc. can be collected for Identification and regulatory obligations. We collect the content, communications and other information you provide when you use our Services, including when you sign up for an account, create or share content and message or communicate with others." },
                                    { t: "Sensitive Information", d: "Security number or identification number to identify and detect fraud." },
                                    { t: "Mercantile Information", d: "Any undertaking, negotiation or deal, used for Identification or fulfilling the compliance requirements." },
                                    { t: "Monetary Information", d: "Card information or billing address, etc., is collected to improve services and Communications." },
                                    { t: "Device Technical Data", d: "Web devices, IP/ URL or device activities are collected to comply with laws and regulations." },
                                    { t: "Geolocation", d: "Geolocation and Communications are recorded and collected for better communications and improving the services." },
                                    { t: "Anonymous Info", d: "Zip codes, demographic data to add-on with personal information." },
                                    { t: "Mechanical Collection", d: "Data collected mechanically, like apps or other data is beyond company’s control, still its treated as personal information for security and avoiding cyber-crimes." },
                                    { t: "Usage Engagement", d: "IP address and other information about your device which we need to provide our online content to you. We also collect information about your engagement with our website or apps such as the pages you view. We use cookies and similar technologies to collect a lot of this information." }
                                ].map((item, i) => (
                                    <div key={i} className="group p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-[#6EDD4D]/30 transition-all">
                                        <h5 className="text-white font-bold mb-2 flex items-center gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#6EDD4D]"></span>
                                            {item.t}
                                        </h5>
                                        <p className="text-sm text-zinc-500 leading-relaxed">{item.d}</p>
                                    </div>
                                ))}
                            </div>

                            <h4 className="text-white font-bold mb-4">Device Information Detail</h4>
                            <p>We collect information from and about the computers, phones, connected TVs and other web-connected devices you use that integrate with our Services, and we combine this information across different devices you use. Information we obtain from these devices includes: Device attributes, Device operations, Device signals, Data from device settings, Network and connections, and Cookie data. Learn more about how we use cookies in the Gigfactory Cookies Policy.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                                    <h5 className="font-bold text-white mb-2">Payment Information</h5>
                                    <p className="text-sm text-zinc-500">If you use the Service to make or receive payments, we will also collect certain payment information, such as credit card or other financial account information, and billing address.</p>
                                </div>
                                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                                    <h5 className="font-bold text-white mb-2">Service Announcements</h5>
                                    <p className="text-sm text-zinc-500">On rare occasions it is necessary to send out a strictly service related announcement. For instance, if our service is temporarily suspended for maintenance. Generally, users cannot opt-out of these communications.</p>
                                </div>
                            </div>
                        </PolicyBlock>

                        <PolicyBlock title="3. How We Use Your Information" id="usage">
                            <ul className="space-y-4">
                                {[
                                    "To provide the services you requested.",
                                    "To notify you about changes to our Site or any services we offer or provide through it.",
                                    "To carry out our obligations and enforce our rights.",
                                    "To provide and improve the Service, complete your transactions, address your inquiries, process your registration, verify the information you provide is valid, and for compliance and internal business purposes.",
                                    "To tailor content we display to you and offers we may present to you, both on the Service and elsewhere online.",
                                    "To administer and develop our business relationship with you and the corporation you represent.",
                                    "We adhere to self-regulatory principles for interest-based advertising and participate in industry opt-outs.",
                                    "We use data to investigate, respond to and resolve complaints and for Service issues (e.g., bugs).",
                                    "To enforce and comply with the law, including to conduct an investigation and to protect the safety of the public.",
                                    "Provide measurement, analytics and other business services to help partners measure effectiveness.",
                                    "Promote safety, integrity and security - We use information to verify accounts, combat harmful conduct, and detect spam.",
                                    "For the purposes disclosed at the time you provide your information, with your consent."
                                ].map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <i className="fa-solid fa-circle-check text-[#6EDD4D] mt-1.5 shrink-0"></i>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </PolicyBlock>

                        <PolicyBlock title="4. Response to Legal Requests" id="legal">
                            <p>We access, preserve and share your information with regulators, law enforcement or others: In response to a legal request (e.g. a search warrant, court order or subpoena) if we have a good-faith belief that the law requires us to do so.</p>
                            <p>When we have a good-faith belief that it is necessary to: detect, prevent and address fraud, unauthorised use of the Products, breaches of our Terms or Policies, or other harmful or illegal activity; to protect ourselves (including our rights, property or Products), you or others; or to prevent death or imminent bodily harm.</p>
                            <p>Information we receive about you can be accessed and preserved for an extended period when it is the subject of a legal request or obligation, governmental investigation or investigations of possible violations of our terms or policies.</p>
                        </PolicyBlock>

                        <PolicyBlock title="5. Disclosure of Your Information" id="disclosure">
                            <p className="font-black text-white text-xl border-b border-[#6EDD4D]/30 pb-2 mb-6 inline-block">We do not sell your personal data.</p>
                            <p>However, we may share data with trusted partners, service providers, or in case of business transfers:</p>
                            <ul className="space-y-3 pl-4 border-l-2 border-zinc-800">
                                <li>To fulfill the purpose for which you provide it.</li>
                                <li>To contractors, service providers and other third parties we use to support our business.</li>
                                <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, or reorganization.</li>
                                <li>Aggregated information about our users that does not identify any individual.</li>
                                <li>To comply with any court order, law or legal process.</li>
                                <li>If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of the Site, our customers or others.</li>
                            </ul>
                        </PolicyBlock>

                        <PolicyBlock title="6. Your Choices and Obligation" id="choices">
                            <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800">
                                <h4 className="text-white font-bold mb-4">Personal Information Rights</h4>
                                <p className="text-sm mb-6">According to applicable law, you have several rights under the Regulations and other relevant laws. These include the right to ask us for a copy of your personal information, to correct, delete or restrict processing; to obtain the information in a structured, machine-readable format, and to ask us to share (port) this to another controller.</p>
                                <h4 className="text-white font-bold mb-4">Data Retention</h4>
                                <p className="text-sm">We generally retain your personal data as long as you keep your account open or as needed to provide you Services. Even if you only use our Services every few years, we will retain your information and keep your profile open, unless you close your account.</p>
                            </div>
                        </PolicyBlock>

                        <PolicyBlock title="7. Security" id="security">
                            <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800">
                                <h4 className="text-white font-bold mb-4">Data Protection Measures</h4>
                                <p className="text-sm mb-6">
                                    We take appropriate measures to ensure that all personal data is kept secure including security measures to prevent personal data from being accidentally lost, or used or accessed in an unauthorised way. We also have procedures in place to deal with any suspected data security breach. We will notify you and any applicable regulator of a suspected data security breach where We are legally required to do so.
                                </p>

                                <h4 className="text-white font-bold mb-4">Access Control</h4>
                                <p className="text-sm mb-6">
                                    We limit access to your personal data to those who have a genuine business need to know it. Those processing your information will do so only in an authorised manner and are subject to a duty of confidentiality.
                                </p>

                                <h4 className="text-white font-bold mb-4">Transmission Risk</h4>
                                <p className="text-sm">
                                    Unfortunately, the transmission of information via the internet is not completely secure. Although We will do Our best to protect your personal data, We cannot guarantee the security of your data transmitted through any online means, therefore any transmission remains at your own risk.
                                </p>
                            </div>
                        </PolicyBlock>

                        <PolicyBlock title="8. Cookie Policy" id="cookies">
                            <p>Cookies are small pieces of text used to store information on web browsers. We use cookies if you are registered as an User in GIGFACTORY, or you use GIGFACTORY’s services. This policy explains how we use cookies and the choices you have.</p>

                            <div className="grid grid-cols-1 gap-6 mt-10">
                                {[
                                    { t: "Authentication", d: "We use cookies to verify your account and determine when you're logged in so we can make it easier for you to access GIGFACTORY." },
                                    { t: "Security, site and product integrity", d: "We use cookies to help us keep your account, data and surfing safe and secure, and to combat activity that violates our policies." },
                                    { t: "Preferences, features and services", d: "We use cookies to remember information about your browser and your preferences, such as your preferred language." },
                                    { t: "Analytics and Research", d: "Cookies help us learn more about how well our Services and plugins perform in different locations and measure ad performance." },
                                    { t: "Advertising and measurement", d: "We use cookies to help us show ads and to make recommendations for businesses to people who may be interested." }
                                ].map((cookie, i) => (
                                    <div key={i} className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                                        <h5 className="font-bold text-[#6EDD4D] mb-2">{cookie.t}</h5>
                                        <p className="text-sm text-zinc-400">{cookie.d}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 bg-zinc-950 p-8 rounded-[2rem] border border-zinc-800">
                                <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">The Cookies We Set:</h4>
                                <ul className="space-y-4 text-sm text-zinc-500">
                                    <li><strong>Account related:</strong> Used for management of the signup process and general administration.</li>
                                    <li><strong>Login related:</strong> Prevents you from having to log in every single time you visit a new page.</li>
                                    <li><strong>Orders processing:</strong> Essential to ensure that your order is remembered between pages.</li>
                                    <li><strong>Forms related:</strong> Set to remember your user details for future correspondence when you submit data.</li>
                                    <li><strong>Site preferences:</strong> Provided so that you can set your preferences for how this site runs when you use it.</li>
                                </ul>
                            </div>
                        </PolicyBlock>

                        <PolicyBlock title="9. No Liability" id="liability">
                            <p className="italic bg-[#6EDD4D]/5 p-8 rounded-3xl border border-[#6EDD4D]/20 text-white">
                                &quot;User acknowledges and agrees that We take every measure for having in place the appropriate privacy and security measures for securing Your PII. By providing Personally Identifiable Information/PII to Us, You agree and understand that neither Gigfactory, nor its administrators, sister concerns, subsidiaries, representatives, associates, affiliates or assigns shall be held liable for any loss/damage/harm/ injury caused to You or any Third Party due to sharing of the aforesaid Information or due to any breach or other perils such as hacking, phishing.&quot;
                            </p>
                        </PolicyBlock>

                        <PolicyBlock title="10. Children’s Privacy" id="children">
                            <p>Our Site is not directed to children under the age of 18. We do not knowingly collect any personal information about children under the age of 18. If we obtain actual knowledge that we have collected personal information about a child under the age of 18, that information will be immediately deleted from our database.</p>
                        </PolicyBlock>

                        <PolicyBlock title="11. Termination of Account" id="termination">
                            <p>In the event of termination of services by user, or closing/ deactivating of account with us, user data may still remain and preserved for regulating and business purposes. User to take a note that neither Gigfactory nor the user can delete or modify the data that has been shared already.</p>
                        </PolicyBlock>

                        <PolicyBlock title="12. Advertising Policy" id="advertising">
                            <p>Advertising keeps Gigfactory free of charge. We work hard to make sure that ads are safe, unobtrusive, and as relevant as possible. We terminate the accounts of hundreds of thousands of publishers and advertisers that violate our policies each year.</p>
                            <h4 className="text-white font-bold mt-8 mb-4">How Gigfactory uses cookies in advertising</h4>
                            <p>Cookies help to make advertising more effective. Without cookies, it’s harder for an advertiser to reach its audience. We store a record of the ads we serve in our logs. These server logs typically include your web request, IP address, browser type, and one or more cookies. We anonymize this log data by removing part of the IP address (after 9 months) and cookie information (after 18 months).</p>
                            <h4 className="text-white font-bold mt-8 mb-4">Our advertising cookies</h4>
                            <p>To help our partners manage their advertising, we offer products including AdSense, AdWords, Gigfactory Analytics, and DoubleClick-branded services. When you visit a page or see an ad that uses one of these products, various cookies may be sent to your browser from domains including Gigfactory.com, doubleclick.net, Gigfactorysyndication.com, or Gigfactoryadservices.com.</p>
                            <h4 className="text-white font-bold mt-8 mb-4">What determines the ads by Gigfactory that I see?</h4>
                            <p>Many decisions are made to determine which ad you see. Sometimes the ad you see is based on your current or past location. Your IP address is usually a good indication of your approximate location. Sometimes you might also see an ad that’s based on your app activity or activity on Gigfactory services; an in-app ad that’s based on your web activity; or an ad based on your activity on another device.</p>
                        </PolicyBlock>

                        <PolicyBlock title="13. CHANGES TO THIS POLICY" id="changes">
                            <p>We may change this Privacy Policy. If we make substantial changes, we will provide notice. Gigfactory may update this Privacy Policy at any time and any changes will be effective upon posting. In the event that there are substantial changes to the way we treat your Personal Information, we will display a notice through the Services prior to the change becoming effective. We may also notify you by email, in our discretion. However, we will use your Personal Information in a manner consistent with the Privacy Policy in effect at the time you submitted the information, unless you consent to the new or revised policy</p>
                        </PolicyBlock>

                        <PolicyBlock title="14. SECURITY" id="security-14">
                            <p>Your account is password protected. We use industry standard measures and strive hard to protect your personal information that is stored in our database from unauthorized access or unauthorized alteration, disclosure or destruction. We limit the access to your personal information to those persons who need access to perform their job function, for instance, our customer service personnel, and such persons are subject to strict contractual confidentiality obligations and may be disciplined or terminated if they fail to meet these obligations. If you have any questions about the security on Gigfactory, please contact us. Although we take appropriate measures to safeguard against unauthorized disclosures of information, no method of transmission over the internet or via mobile device, or any method of electronic communication/storage, is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
                            <p>Security-in-check for your personally identifiable information/PII<br />
                                We are meticulous when it comes to receiving and securing Your Personally Identifiable Information/PII. We do realize the gravity of such Personally Identifiable Information/PII therefore We have highest security system in place to maintain Your privacy and to create a completely secure operating environment.<br />
                                You agree that in case of any unauthorized access, hacking, phishing, Denial of Service (DoS), waterhole attacks, Fake Wap, cookie theft, virus/ Trojan effects we shall not be held liable for any action/ claim for damages/ losses/ costs/ expenses brought by You or any Third Party.
                            </p>
                        </PolicyBlock>


                        <PolicyBlock title="14. SECURITY" id="security-14b">
                            <p>You can contact our Privacy Officer by writing to us at our email address or postal address below, if you wish to request for access to your personal information held by us, request that your personal information be updated or corrected, or withdraw your consent to the processing of your personal information by us. If you would like to have any further information, or if you have any comments about this Privacy Policy or any questions or complaints on any privacy issue, this should also be communicated to us in the same manner.</p>
                            <ul className="list-disc pl-6 space-y-4">
                                <li>Contact Details: 8349333524</li>
                                <li>contact@gigfactory.com</li>
                            </ul>
                        </PolicyBlock>

                        <PolicyBlock title="Advertising Policy" id="advertising-policy">
                            <p>Advertising keeps Gigfactory and many of the websites and services you use free of charge. We work hard to make sure that ads are safe, unobtrusive, and as relevant as possible. For example, you won’t see pop-up ads on Gigfactory, and we terminate the accounts of hundreds of thousands of publishers and advertisers that violate our policies each year – including ads containing malware, ads for counterfeit goods, or ads that attempt to misuse your personal information.</p>
                            <p>How Gigfactory uses cookies in advertising<br />
                                Cookies help to make advertising more effective. Without cookies, it’s harder for an advertiser to reach its audience, or to know how many ads were shown and how many clicks they received.</p>
                            <p>Many websites, such as news sites and blogs, partner with Gigfactory to show ads to their visitors. Working with our partners, we may use cookies for a number of purposes, such as to stop you from seeing the same ad over and over again, to detect and stop click fraud, and to show ads that are likely to be more relevant (such as ads based on websites you have visited).</p>
                            <p>We store a record of the ads we serve in our logs. These server logs typically include your web request, IP address, browser type, browser language, the date and time of your request, and one or more cookies that may uniquely identify your browser. We store this data for a number of reasons, the most important of which are to improve our services and to maintain the security of our systems. We anonymize this log data by removing part of the IP address (after 9 months) and cookie information (after 18 months).</p>
                            <p>Our advertising cookies<br />
                                To help our partners manage their advertising and websites, we offer many products, including AdSense, AdWords, Gigfactory Analytics, and a range of DoubleClick-branded services. When you visit a page or see an ad that uses one of these products, on Gigfactory various cookies may be sent to your browser.</p>
                            <p>These may be set from a few different domains, including Gigfactory.com, doubleclick.net, Gigfactorysyndication.com, or Gigfactoryadservices.com, or the domain of our partners’ sites. Some of our advertising products enable our partners to use other services in conjunction with ours (like an ad measurement and reporting service), and these services may send their own cookies to your browser. These cookies will be set from their domains.</p>
                            <p>See more detail about the types of cookies used by Gigfactory and our partners and how we use them. You can also manage cookies in your web browser.</p>
                            <p>Other technologies used in advertising<br />
                                Gigfactory’s advertising systems may use other technologies, including Flash and HTML5, for functions like display of interactive ad formats. We may use the IP address, for example, to identify your general location. We may also select advertising based on information about your computer or device, such as your device model, browser type, or sensors in your device like the accelerometer.</p>
                            <p>Location<br />
                                Gigfactory’s ad products may receive or infer information about your location from a variety of sources. For example, we may use the IP address to identify your general location; we may receive precise location from your mobile device; we may infer your location from your search queries; and websites or apps that you use may send information about your location to us. Gigfactory uses location information in our ads products to infer demographic information, to improve the relevance of the ads you see, to measure ad performance and to report aggregate statistics to advertisers.</p>
                            <p>Advertising identifiers for mobile apps<br />
                                To serve ads in services where cookie technology may not be available (for example, in mobile applications), we may use technologies that perform similar functions to cookies. Sometimes Gigfactory links the identifier used for advertising on mobile applications to an advertising cookie on the same device in order to coordinate ads across your mobile apps and mobile browser. This can happen, for example, when you see an ad within an app that launches a web page in your mobile browser. This also helps us improve the reports we give to our advertisers on the effectiveness of their campaigns.</p>
                            <p>What determines the ads by Gigfactory that I see?<br />
                                Many decisions are made to determine which ad you see.<br />
                                Sometimes the ad you see is based on your current or past location. Your IP address is usually a good indication of your approximate location. So, you might see an ad on the homepage of Gigfactory that promotes a forthcoming movie in your country, or a search for ‘pizza’ might return results for pizza places in your town.<br />
                                Sometimes you might also see an ad on the web that’s based on your app activity or activity on Gigfactory services; an in-app ad that’s based on your web activity; or an ad based on your activity on another device.</p>
                            <p>Sometimes the ad you see on a page is served by Gigfactory but selected by another company. For example, you might have registered with a newspaper website. From information you’ve given the newspaper, it can make decisions about which ads to show you, and it can use Gigfactory’s ad serving products to deliver those ads.</p>
                            <p>You may also see ads on Gigfactory products and services based on information, such as your email address, that you provided to advertisers and the advertisers then shared with Gigfactory.</p>
                            <p>We do have restrictions on this type of ad. For example, we prohibit advertisers from selecting an audience based on sensitive information, such as health information, nudity, intimate ads or religious beliefs.<br />
                                If you find any such advertisement objectionable you can report the advertisement for restricting future broadcast or directly close it by clicking the cross at the extreme top of corner in the right side of the advertisement.<br />
                                For further clarifications and queries please contact Gigfactory’s customer support.</p>
                        </PolicyBlock>
                        <PolicyBlock title="COOKIE POLICY" id="cookie-full">
                            <p>Cookies are small pieces of text used to store information on web browsers. Cookies are used to store and receive identifiers and other information on computers, phones and other devices. Other technologies, including data we store on your web browser or device, identifiers associated with your device, and other software, are used for similar purposes. In this policy, we refer to all of these technologies as &quot;cookies.&quot;</p>
                            <p>We use cookies if you are registered as an User in GIGFACTORY, or you use GIGFACTORY’s services, including our website and apps. Cookies helps to understand the information we receive about you, including information about your use of other websites and apps, whether or not you are registered or logged in.</p>
                            <p>This policy explains how we use cookies and the choices you have. Except as otherwise stated in this policy, the Data Policy will apply to our processing of the data that we collect via cookies.</p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">Why do we use cookies?</h3>
                            <p>Cookies help us provide, protect and improve the website services, such as by personalising content, tailoring and measuring ads, and providing a safer experience. While the cookies that we use may change from time to time as we improve and update the GIGFACTORY website, we use them for the following purposes:</p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">Authentication</h3>
                            <p>We use cookies to verify your account and determine when you&apos;re logged in so we can make it easier for you to access GIGFACTORY and show you the appropriate experience and features.</p>
                            <p>For example: We use cookies to keep you logged in as you navigate the GIGFACTORY platform. Cookies also help us remember your browser so you do not have to keep logging in to GIGFACTORY and so you can more easily log in via third-party apps and websites.</p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">Security, site and product integrity</h3>
                            <p>We use cookies to help us keep your account, data and surfing safe and secure.</p>
                            <p>For example: Cookies can help us identify and impose additional security measures when someone may be attempting to access any GIGFACTORY account without authorisation, for instance, by rapidly guessing different passwords. We also use cookies to store information that allows us to recover your account in the event that you forget your password or to require additional authentication if you tell us that your account has been hacked.</p>
                            <p>We also use cookies to combat activity that violates our policies or otherwise degrades our ability to provide our website services.</p>
                            <p>For example: Cookies help us fight spam and phishing attacks by enabling us to identify computers that are used to create large numbers of fake accounts. We also use cookies to detect computers infected with malware and to take steps to prevent them from causing further harm.</p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">Preferences, features and services</h3>
                            <p>We use cookies and similar technologies to enable the functionality of our Services, such as helping you to fill out forms on our Services more easily and providing you with features, insights and customized content in conjunction with our plugins. We also use these technologies to remember information about your browser and your preferences.</p>
                            <p>For example, cookies can tell us which language you prefer and what your communications preferences are. We may also use local storage to speed up site functionality.</p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">The Cookies We Set</h3>
                            <p>·       Account related cookies<br/><br/>
                                If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out.<br/><br/>
                                ·       Login related cookies<br/><br/>
                                We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.<br/><br/>
                                ·       Orders processing related cookies<br/><br/>
                                This site offers e-commerce or payment facilities and some cookies are essential to ensure that your order is remembered between pages so that we can process it properly.<br/><br/>
                                ·       Forms related cookies<br/><br/>
                                When you submit data to through a form such as those found on contact pages or comment forms cookies may be set to remember your user details for future correspondence.<br/><br/>
                                ·       Site preferences cookies<br/><br/>
                                In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences, we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.
                            </p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">Customized Content</h3>
                            <p>We use cookies and similar technologies to customize your experience on our Services. For example, we may use cookies to remember previous searches so that when you return to our services, we can offer additional information that relates to your previous search.</p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">Analytics and Research</h3>
                            <p>Cookies and similar technologies help us learn more about how well our Services and plugins perform in different locations. We or our service providers use these technologies to understand, improve, and research products, features and services, including as you navigate through our sites or when you access GIGFACTORY from other sites, applications or devices. We or our service providers, use these technologies to determine and measure the performance of ads or posts on and off and to learn whether you have interacted with our websites, content or emails and provide analytics based on those interactions.</p>
                            <p>We also use these technologies to provide aggregated information to our customers and partners as part of our Services. If you are a GIGFACTORY user but logged out of your account on a browser, GIGFACTORY may still continue to log your interaction with our Services on that browser until the expiration of the cookie in order to generate usage analytics for our Services. We may share these analytics in aggregate form with our customers.</p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">Advertising, recommendations, insights and measurement</h3>
                            <p>We use cookies to help us show ads and to make recommendations for businesses and other organisations to people who may be interested in the products, services or causes they promote.</p>
                            <p>Cookies help us serve and measure ads across different browsers and devices used by the same person.</p>
                            <p>We may also work with our customers and partners to show you an ad on or off GIGFACTORY, such as after you’ve visited a customer’s or partner’s site or application. These technologies help us provide aggregated information to our customers and partners.</p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">Site features and services</h3>
                            <p>We use cookies to enable the functionality that helps us provide the GIGFACTORY services.</p>
                            <p>For example: Cookies help us store preferences, know when you&apos;ve seen or interacted with any member of GIGFACTORY and provide you with customised content and experiences. For instance, cookies allow us to make suggestions to you and others, and to customise content on third-party sites that integrate our social plugins.</p>
                            <p>We also use cookies to help provide you with content relevant to your locale.</p>
                            <p>For example: We store information in a cookie that is placed on your browser or device so that you will see the site in your preferred language.</p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">Performance</h3>
                            <p>We use cookies to provide you with the best experience possible.</p>
                            <p>For example: Cookies help us route traffic between servers and understand how quickly website load for different people. Cookies also help us record the ratio and dimensions of your screen and windows and know whether you&apos;ve enabled high-contrast mode, so that we can render our sites and apps correctly.</p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">Analytics and research</h3>
                            <p>We use cookies to better understand how people use the GIGFACTORY website so that we can improve them.</p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">Where do we use cookies?</h3>
                            <p>We may place cookies on your computer or device, and receive information stored in cookies, when you use or visit our website.</p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">Disabling Cookies</h3>
                            <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore, it is recommended that you do not disable cookies.</p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">More information about online advertising:</h3>
                            <p>The advertising companies we work with generally use cookies and similar technologies as part of their services.</p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">Browser cookie controls:</h3>
                            <p>In addition, your browser or device may offer settings that allow you to choose whether browser cookies are set and to delete them. For more information about these controls, visit your browser or device&apos;s help material. Certain parts of the website may not work properly if you have disabled browser cookie use.</p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">What is Do Not Track (DNT)?</h3>
                            <p>DNT is a concept that has been promoted by regulatory agencies such as the U.S. Federal Trade Commission (FTC), for the Internet industry to develop and implement a mechanism for allowing Internet users to control the tracking of their online activities across websites by using browser settings. As such, GIGFACTORY does not generally respond to “do not track” signals.</p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">More Information</h3>
                            <p>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren&apos;t sure whether you need or not it&apos;s usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.</p>
                            <p>However, if you are still looking for more information, then you can contact us through one of our preferred contact methods.</p>
                        </PolicyBlock>

                    </div>
                </div>
            </div>
        </main>
    )
}