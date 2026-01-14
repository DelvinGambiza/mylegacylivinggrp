'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { 
      href: '/', 
      label: 'Home', 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
    },
    { 
      href: '/rooms', 
      label: 'Rooms', 
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' 
    },
    { 
      href: '/apply', 
      label: 'Apply', 
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' 
    },
    { 
      href: '/contact', 
      label: 'Contact', 
      icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' 
    },
    { 
      href: '/admin/dashboard', 
      label: 'Admin', 
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' 
    },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === href
    return pathname?.startsWith(href)
  }

  return (
    <>
      {/* Modern Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-[#E5E7EB]/20">
        <nav className="max-w-8xl mx-auto px-4 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="flex-shrink-0">
                  <div className="flex items-center">
                    <img 
                      src="/logo_full.png"
                      alt="My Legacy Living Group"
                      className="h-12 w-auto object-contain sm:h-16"
                    />
                  </div>
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-xl font-bold text-[#2E2E2E] tracking-tight sm:text-2xl">My Legacy</span>
                  <span className="text-xs text-[#2E2E2E]/70 tracking-wider uppercase letter-spacing-2 sm:text-sm">Living Group</span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.slice(0, -1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-[#1F3A5F] bg-gradient-to-r from-[#FAFAF7] to-[#F0F4F1]'
                      : 'text-[#2E2E2E] hover:text-[#1F3A5F] hover:bg-[#FAFAF7]'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                    </svg>
                    <span>{link.label}</span>
                  </span>
                  {isActive(link.href) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-[#8FAF9B] to-[#C6A75E] rounded-full"></div>
                  )}
                </Link>
              ))}
              
              {/* CTA Button */}
              <Link
                href="/apply"
                className="ml-6 px-6 py-2.5 bg-gradient-to-r from-[#8FAF9B] to-[#8FAF9B]/90 text-white rounded-lg font-medium hover:shadow-md hover:scale-105 transition-all duration-200 shadow-sm"
              >
                Get Started
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <Link
                href="/apply"
                className="px-4 py-2 bg-gradient-to-r from-[#8FAF9B] to-[#8FAF9B]/90 text-white rounded-lg font-medium hover:shadow-md hover:scale-105 transition-all duration-200 shadow-sm text-sm"
              >
                Apply
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 rounded-lg hover:bg-[#FAFAF7] transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6 text-[#2E2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-[#2E2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/30 z-40 md:hidden backdrop-blur-sm animate-fadeIn"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 md:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="h-full overflow-y-auto">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]/20">
                <div className="flex items-center space-x-3">
                  <img 
                    src="/logo_full.png"
                    alt="My Legacy Living Group"
                    className="h-10 w-auto"
                  />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-[#2E2E2E]">My Legacy</span>
                    <span className="text-sm text-[#2E2E2E]/70">Living Group</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-[#FAFAF7]"
                >
                  <svg className="w-6 h-6 text-[#2E2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Links */}
              <div className="p-6">
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive(link.href)
                          ? 'bg-gradient-to-r from-[#FAFAF7] to-[#F0F4F1] text-[#1F3A5F]'
                          : 'text-[#2E2E2E] hover:bg-[#FAFAF7]'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                      </svg>
                      <span className="font-medium">{link.label}</span>
                      {isActive(link.href) && (
                        <div className="ml-auto w-2 h-2 bg-gradient-to-r from-[#8FAF9B] to-[#C6A75E] rounded-full"></div>
                      )}
                    </Link>
                  ))}
                </div>

                {/* Mobile CTA Button */}
                <div className="mt-8 pt-6 border-t border-[#E5E7EB]/20">
                  <Link
                    href="/apply"
                    className="block w-full text-center px-6 py-3.5 bg-gradient-to-r from-[#8FAF9B] to-[#8FAF9B]/90 text-white rounded-lg font-semibold hover:shadow-md transition-all duration-200 shadow-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started Now
                  </Link>
                  <p className="text-center text-sm text-[#2E2E2E]/60 mt-3">
                    Start your supportive housing journey today
                  </p>
                </div>

                {/* Contact Info in Mobile Menu */}
                <div className="mt-8 p-4 bg-gradient-to-br from-[#FAFAF7] to-[#F0F4F1] rounded-xl">
                  <h4 className="font-semibold text-[#1F3A5F] mb-3">Need Help?</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <svg className="w-4 h-4 text-[#8FAF9B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-sm text-[#2E2E2E]">(217) 766-1995</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg className="w-4 h-4 text-[#8FAF9B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-[#2E2E2E]">info@mylegacylivinggroup.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}