'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/about-us', label: 'INSPIRATION' },
  { 
    href: '/projects', 
    label: 'PROJECTS',
    submenu: [
      { href: '/ark', label: 'Ark' },
      { href: '/eden', label: 'Eden' },
      { href: '/embrace', label: 'Embrace' },
      { href: '/invicta', label: 'Invicta' },
      { href: '/keystone', label: 'Keystone' },
      { href: '/metamorphosis', label: 'Metamorphosis' },
    ]
  },
  { href: '/get-involved', label: 'GET-INVOLVED' },
  { href: '/welearn', label: 'WE-LEARN' },
  { href: '/contact-us', label: 'CONTACT US' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="https://weresl.org/wp-content/uploads/2024/10/logo.png"
            alt="WE'RE SL"
            width={60}
            height={60}
            className="object-contain"
          />
          <span className="text-2xl font-heading font-bold text-gray-800">
            WE'RE SL
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className="text-sm font-semibold text-gray-800 uppercase transition-colors hover:text-primary"
                onMouseEnter={() => item.submenu && setProjectsOpen(true)}
                onMouseLeave={() => item.submenu && setProjectsOpen(false)}
              >
                {item.label}
                {item.submenu && <span className="ml-1">▼</span>}
              </Link>
              {item.submenu && projectsOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50"
                  onMouseEnter={() => setProjectsOpen(true)}
                  onMouseLeave={() => setProjectsOpen(false)}
                >
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <Button 
            asChild 
            className="bg-orange-500 hover:bg-orange-600 text-white hidden md:flex"
          >
            <Link href="/give">GIVE</Link>
          </Button>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 hover:bg-gray-100 rounded"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="border-t bg-white p-4">
          <div className="container">
            <form className="flex gap-2">
              <input
                type="search"
                placeholder="Search this website..."
                className="flex-1 px-4 py-2 border rounded-md"
              />
              <Button type="submit">Search</Button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t bg-white">
          <div className="container py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 text-sm font-semibold text-gray-800 uppercase hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <div className="pl-4 space-y-1">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block py-1 text-sm text-gray-600 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button asChild className="w-full mt-4 bg-orange-500 hover:bg-orange-600">
              <Link href="/give">GIVE</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}

