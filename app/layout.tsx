'use client'

import { NextUIProvider } from '@nextui-org/react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { usePathname } from 'next/navigation';
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/home') {
      return pathname === '/' || pathname === '/home';
    }
    return pathname === path;
  };

  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          <Navbar className="bg-white">
            <NavbarBrand>
              <Link href="/" color="foreground" className="font-bold text-2xl">
                Custom Print Paper
              </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-8" justify="center">
              {['Home', 'Designer', 'Contact', 'FAQ'].map((item) => (
                <NavbarItem key={item} isActive={isActive(`/${item.toLowerCase()}`)}>
                  <Link 
                    color="foreground" 
                    href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                    className={`
                      text-xl 
                      ${isActive(`/${item.toLowerCase()}`) ? "font-bold" : ""}
                      relative
                      after:content-['']
                      after:absolute
                      after:w-full
                      after:h-0.5
                      after:bg-black
                      after:bottom-[-4px]
                      after:left-0
                      after:scale-x-0
                      after:transition-transform
                      after:duration-300
                      hover:after:scale-x-100
                    `}
                  >
                    {item}
                  </Link>
                </NavbarItem>
              ))}
            </NavbarContent>
          </Navbar>
          {children}
        </NextUIProvider>
      </body>
    </html>
  )
}
