import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

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
        {/* Use the Navbar component */}
        <Navbar />

        {/* Main content with top padding */}
        <main className="pt-20">
          {children}
        </main>

        {/* Modern Footer - Keep your existing footer */}
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
                <h4 className="font-semibold mb-6 text-lg relative pb-3 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-[#8FAF9B]">Quick Links</h4>
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