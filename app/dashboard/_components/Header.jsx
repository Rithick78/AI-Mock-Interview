'use client'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { usePathname } from 'next/navigation'

function Header() {

  const pathname = usePathname()
  const navItem = [
    { name: "Home", href: '/' },
    { name: "Dashboard", href: '/dashboard' },
    { name: "Upgrade", href: '/dashboard/section' }
  ]

  return (
    <div className="md:p-[3px] p-[2px] bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 ">
      <div className='md:py-4 py-2 bg-gray-700 xl:px-17 md:px-7 sm:px-7 flex justify-between items-center px-4'>
        <div className='order-2 md:order-1 flex items-center justify-between sm:gap-2 '>
          <Image src="/mockIcon.webp" alt="Logo" className='sm:w-15' width={50} height={60} />
          <h1 className='flex items-center gap-2 text-white font-bold text-2xl sm:text-[22px] text-[15px]'>Mock Interview <span className='md:text-[16px] text-[8px] border md:border-2 p-1 pb-1.5 rounded-full border-blue-400 text-blue-400 '>AI</span></h1>
        </div>
        <div className='md:hidden order-1 md:order-2'>

          <NavigationMenu >
            <NavigationMenuList > 
              <NavigationMenuItem>
                <NavigationMenuTrigger className='text-[9px] sm:text-[16px] px-2 '>Menu</NavigationMenuTrigger>
                <NavigationMenuContent className=' md:px-15 px-12 py-7' >
                    <div className='flex flex-col items-center gap-5'>
                      {navItem.map((item, index) => (
                        <Link key={index} href={item?.href}>
                          <p className={` ${pathname === item.href ? 'text-blue-600' : 'text-black'} font-bold  md:text-[18px] text-[13px]  `}>{item?.name}</p>
                        </Link>
                      ))}
                      <HoverCard >
                        <HoverCardTrigger> <p className='font-bold md:text-[18px] text-[13px]'> Works</p></HoverCardTrigger>
                        <HoverCardContent>
                          <h1 className='font-semibold '>This section is for UI display proposes</h1>
                        </HoverCardContent>
                      </HoverCard>

                       <div className='flex flex-col-reverse md:flex-row items-center md:gap-2 gap-1'>
                        <p className='font-bold md:text-[18px] text-[12px]'> Log out </p>
                        <UserButton/> 
                      </div>
                    </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

        </div>

        <div className='md:flex order-2 xl:gap-15 lg:gap-8 sm:gap:4 hidden'>

          <div className='flex gap-10 sm:gap-5 justify-center items-center'>
            {navItem.map((item, index) => (
              <Link key={index} href={item?.href}>
                <p key={index} className={` ${pathname === item.href ? 'text-blue-600 xl:text-[21px] sm:text-[15px] ' : 'text-white xl:text-[17px] sm:text-[15px]'} transition-all hover:border-b-2 border-blue-600 font-semibold cursor-pointer pb-2`}>{item?.name}</p>
              </Link>
            ))}
            <HoverCard className=''>
              <HoverCardTrigger> <p className=' text-white font-semibold hover:border-b-2 border-blue-600 cursor-pointer pb-2 sm:text-[15px] hidden lg:block'>How It Works</p></HoverCardTrigger>
              <HoverCardContent>
                <h1 className='font-semibold '>This section is for UI display proposes</h1>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className=' xl:gap-5 sm:gap-3 hidden md:flex'>

            <Link href={'/dashboard'}>
              <Button className='bg-blue-700 hover:border-2 border-blue-700 font-semibold sm:text-[15px]'>Get Started</Button>
            </Link>
            <UserButton />
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Header