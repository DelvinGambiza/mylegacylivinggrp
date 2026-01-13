// components/AdminNavLink.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AdminNavLinkProps {
  href: string
  children: React.ReactNode
}

export default function AdminNavLink({ href, children }: AdminNavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname?.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={`relative px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
        isActive
          ? 'text-[#1F3A5F] bg-gradient-to-r from-[#FAFAF7] to-[#F0F4F1]'
          : 'text-[#2E2E2E] hover:text-[#1F3A5F] hover:bg-[#FAFAF7]'
      }`}
    >
      {children}
      {isActive && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-[#8FAF9B] to-[#C6A75E] rounded-full"></div>
      )}
    </Link>
  )
}