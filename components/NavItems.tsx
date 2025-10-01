"use client"
import React from 'react'
import { NAV_ITEMS } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavItems = () => {
    const pathname: string = usePathname();

    const isActive = (path:string) => pathname === path;

  return (
    <div>
        <ul className='flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 space-x-6 foont-medium'>
            {NAV_ITEMS.map(({href,label}) => (
                <li key={href}>
                    <Link href={href} className={`hover:text-yellow-500 transition-colors ${isActive(href) ? 'text-grey-100' : ''}`}>
                        {label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default NavItems