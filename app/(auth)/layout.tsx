import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/better-auth/auth'

const Layout = async ({children} : {children : React.ReactNode}) => {
  const session = await auth.api.getSession({headers: await headers()});

  if (session?.user) redirect('/')

  return (
    <main className='auth-layout'>
        <section className='auth-left-section scrollbar-hide-default'>
            <Link href="/" className='auth-logo'>
                <Image src="logo.svg" alt='Stock logo' width={140} height={32} className='h-8 w-auto' ></Image>
            </Link>

            <div className='pb-6 lg:pb-8 flex-1'>{children}</div>
        </section>
        
        <section className='auth-right-section'>
          <div className='z-10 relative lg:mt-4 lg:mb-16'>
            <blockquote className='auth-blockquote'>
              Stock alerts has been spot-on, and the real-time data helps me make informed decisions quickly.  
            </blockquote>
            <div className='flex items-center justify-between'>
              <div>
                <cite className='auth-testimonial-author'>- James B.</cite>
                <p className='max-md:text-xs text-gray-500'>Day Trader</p>
              </div>
              <div className='flex items-center gap-0.5'>
                {[...Array(5)].map((_,i) => (
                    <Image key={i} src="/star.svg" alt="Star" width={20} height={20} className='h-5 w-5' />
                ))}
              </div>
            </div>  
          </div>

          <div className='flex-1 relative'>
            <Image src="/dashboard.png" alt="Dashboard Preview" width={1440} height={1440} className=' auth-dashboard-preview absolute top-0'/>
          </div>
        </section>
    </main>
  )
}

export default Layout