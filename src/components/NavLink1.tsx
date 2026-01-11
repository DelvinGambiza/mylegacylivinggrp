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
      className={`px-3 py-2 text-sm font-medium transition-colors ${
        isActive 
          ? 'text-[#8FAF9B] border-b-2 border-[#8FAF9B]' 
          : 'text-[#2E2E2E] hover:text-[#8FAF9B]'
      }`}
    >
      {children}
    </Link>
  )
}