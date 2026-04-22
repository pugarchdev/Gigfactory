import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Script from 'next/script'; // Import the Next.js Script component

import './globals.css'; 

export const metadata = {
  title: 'GigFactory - Construction Services',
  description: 'Global Capability Center for Construction Services',
  icons: {
    icon: '/icon.png', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* FontAwesome CDN for Icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="antialiased bg-[#050505] text-slate-50 selection:bg-emerald-500/30 overflow-x-hidden">

        {/* --- Google Analytics Scripts --- */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-4NBF7RBYVE`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4NBF7RBYVE');
            `,
          }}
        />
        {/* ------------------------------ */}

        {/* Top Navigation Bar */}
        <Navbar />

        {/* Main Content Area where your page.jsx content will be injected */}
        <main className="min-h-[80vh] pt-20">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />

      </body>
    </html>
  );
}