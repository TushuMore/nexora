'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Lobster } from 'next/font/google';

const lobster = Lobster({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

const links = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-50 w-full transition-all duration-300',
          scrolled && 'backdrop-blur-sm bg-background/50'
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'text-4xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-primary to-primary/50 bg-clip-text',
              lobster.className
            )}
          >
            Nexora
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'text-md font-medium transition-colors hover:text-primary',
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="transition p-2 rounded-md hover:bg-muted"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
          </nav>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-2 cursor-pointer">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="transition p-2 rounded-md hover:bg-muted"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="transition p-2 rounded-md hover:bg-muted"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Darker backdrop behind mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Darker mobile dropdown menu */}
      <div
        className={cn(
          'md:hidden fixed top-20 left-0 w-full z-50 px-4 pt-4 pb-6 space-y-4 transition-all duration-300',
          'backdrop-blur-md bg-background/50 shadow-2xl',
          menuOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        )}
      >
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={cn(
              'block text-base font-medium transition-colors duration-200',
              pathname === link.href
                ? 'text-primary'
                : 'text-foreground hover:text-primary'
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </>
  );
}
