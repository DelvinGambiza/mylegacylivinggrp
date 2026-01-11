'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  
  return (
    <Link 
      href={href} 
      className={`
        px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
        ${isActive 
          ? 'bg-gradient-to-r from-[#8FAF9B]/10 to-[#8FAF9B]/5 text-[#2E2E2E] border border-[#8FAF9B]/20 shadow-sm' 
          : 'text-[#2E2E2E]/70 hover:text-[#2E2E2E] hover:bg-[#FAFAF7]'
        }
      `}
    >
      {children}
    </Link>
  )
}