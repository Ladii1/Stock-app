import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavItems from './NavItems'
import DropdownMenu from './UserDropdown'

const Header = () => {
  return (
    <header className='sticky top-0 header'>
        <div className='container header-wrapper'>
            <Link href="/">
                <Image src="logo.svg" alt="Stock" width={140} height={32} className='h-8 w-auto cursor-pointer'></Image>
            </Link>
            <nav className='hidden sm:block'>
                <NavItems />
            </nav>

            <DropdownMenu />
        </div>
    </header>
  )
}

export default Header