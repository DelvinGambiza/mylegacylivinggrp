import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavLink from '@/components/NavLink'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Legacy Living Group',
  description: 'Dignified, respectful support and safe, structured housing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FAFAF7]`}>
        {/* Modern Fixed Navbar - Clean White with subtle shadow */}
        <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-[#E5E7EB]/20">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Modern Logo - Minimalist */}
              <div className="flex-shrink-0">
                <a href="/" className="flex items-center space-x-3 group">
                  {/* Abstract house icon */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8FAF9B] to-[#8FAF9B]/80 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      {/* Door */}
                      <div className="w-4 h-6 bg-[#C6A75E] rounded-lg relative">
                        {/* Door handle */}
                        <div className="absolute top-2 -right-1 w-2 h-2 rounded-full bg-white/80"></div>
                      </div>
                    </div>
                    {/* Roof accent */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-[#C6A75E]"></div>
                  </div>
                  
                  
                  {/* Text logo - stacked for modern look */}
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-[#2E2E2E] tracking-tight">My Legacy</span>
                    <span className="text-sm text-[#2E2E2E]/70 tracking-wider uppercase letter-spacing-2">Living Group</span>
                  </div>
                </a>
              </div>
              
              {/* Desktop Navigation - Clean with subtle hover effects */}
<div className="hidden md:flex items-center space-x-1">
  <NavLink href="/">
    <span className="flex items-center space-x-2">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      <span>Home</span>
    </span>
  </NavLink>
  <NavLink href="/rooms">
    <span className="flex items-center space-x-2">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
      <span>Rooms</span>
    </span>
  </NavLink>
  <NavLink href="/apply">
    <span className="flex items-center space-x-2">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span>Apply</span>
    </span>
  </NavLink>
  
  {/* Add Contact Link */}
  <NavLink href="/contact">
    <span className="flex items-center space-x-2">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <span>Contact</span>
    </span>
  </NavLink>
  
  <NavLink href="/admin/dashboard">
    <span className="flex items-center space-x-2">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span>Admin</span>
    </span>
  </NavLink>
  
  {/* CTA Button */}
  <a 
    href="/apply" 
    className="ml-6 px-6 py-2.5 bg-gradient-to-r from-[#8FAF9B] to-[#8FAF9B]/90 text-white rounded-lg font-medium hover:shadow-md hover:scale-105 transition-all duration-200 shadow-sm"
  >
    Get Started
  </a>
</div>
              
              {/* Mobile menu button - Modern */}
              <div className="md:hidden">
                <button className="p-2 rounded-lg hover:bg-[#FAFAF7] transition-colors">
                  <svg className="w-6 h-6 text-[#2E2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        </header>

        {/* Main content with top padding */}
        <main className="pt-20">
          {children}
        </main>

        {/* Modern Footer */}
        <footer className="bg-[#1F3A5F] text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            {/* Footer Grid */}
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Brand Column */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8FAF9B] to-[#8FAF9B]/80 flex items-center justify-center">
                    <div className="w-5 h-3 bg-[#C6A75E] rounded-t-lg"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold">My Legacy</span>
                    <span className="text-sm text-white/60">Living Group</span>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Providing dignified, trauma-informed housing solutions that empower individuals to rebuild their legacy with stability and support.
                </p>
              </div>

              {/* Quick Links */}
<div>
  <h4 className="font-semibold mb-3">Quick Links</h4>
  <div className="space-y-2">
    <a href="/apply" className="block text-[#E5E7EB] hover:text-white transition-colors">Apply Now</a>
    <a href="/rooms" className="block text-[#E5E7EB] hover:text-white transition-colors">View Rooms</a>
    <a href="/contact" className="block text-[#E5E7EB] hover:text-white transition-colors">Contact Us</a>
  </div>
</div>

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold mb-6 text-lg relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-[#8FAF9B]">
                  Contact
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-[#8FAF9B] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-white/70">info@mylegacylivinggroup.com</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-[#8FAF9B] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-white/70">(217) 766-1995</span>
                  </li>
                </ul>
              </div>

              {/* Locations */}
              <div>
                <h4 className="font-semibold mb-6 text-lg relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-[#8FAF9B]">
                  Locations
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#8FAF9B] rounded-full"></div>
                    <span className="text-white/70">Maryland</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#8FAF9B] rounded-full"></div>
                    <span className="text-white/70">Indiana</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#8FAF9B] rounded-full"></div>
                    <span className="text-white/70">Illinois</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-white/60 text-sm">
                  © {new Date().getFullYear()} My Legacy Living Group. All rights reserved.
                </p>
                <div className="flex items-center space-x-6">
                  <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Privacy Policy</a>
                  <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Terms of Service</a>
                  <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Accessibility</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

