import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import './globals.css'; // Make sure this path is correct based on your folder structure

export const metadata = {
  title: 'GigFactory - Construction Services',
  description: 'Global Capability Center for Construction Services',
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