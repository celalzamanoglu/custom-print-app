'use client';

import { useState } from 'react';
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';

import { FaUser, FaShoppingCart } from 'react-icons/fa';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/home') {
      return pathname === '/' || pathname === '/home';
    }
    return pathname === path;
  };

  const menuItems = ['Home', 'Designer', 'Contact', 'FAQ'];

  const renderNavLink = (item: string) => (
    <Link
      color="foreground"
      href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
      className={`
        text-xl 
        ${isActive(`/${item.toLowerCase()}`) ? 'font-bold' : ''}
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
  );

  return (
    <NextUINavbar className="bg-white" shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" color="foreground" className="font-bold text-xl">
            Custom Print Paper
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item} isActive={isActive(`/${item.toLowerCase()}`)}>
            {renderNavLink(item)}
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/login">
            <Button isIconOnly variant="light" aria-label="Account">
              <FaUser size={20} />
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/cart">
            <Button isIconOnly variant="light" aria-label="Cart">
              <FaShoppingCart size={20} />
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>{renderNavLink(item)}</NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
};
