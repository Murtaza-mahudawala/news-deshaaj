"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Cat = { id: string; label: string; value: string; href: string };

export default function NavbarClient({ categories, loading, error }: { categories: Cat[]; loading?: boolean; error?: string | null }) {
  const additionalPages = [
    { id: 'about', label: 'हमारे बारे में', href: '/about' },
    { id: 'media', label: 'मीडिया गैलरी', href: '/media-gallery' },
    { id: 'contact', label: 'संपर्क करें', href: '/contact' },
    { id: 'privacy', label: 'गोपनीयता नीति', href: '/privacy' },
    { id: 'terms', label: 'सेवा की शर्तें', href: '/terms' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (hamburgerRef.current && !hamburgerRef.current.contains(event.target as Node)) {
        setIsHamburgerOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center min-h-[80px] py-2 w-full gap-4 justify-between">
          <div className="flex items-center flex-shrink-0 min-w-[120px]">
            <Link href="/">
              <Image src="/logo.png" alt="Desh Aaj Logo" width={250} height={60} className="h-[60px] w-auto object-contain" priority />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {loading ? (
              // skeleton pills
              Array.from({ length: 6 }).map((_, i) => (
                <div key={`s-${i}`} className="h-8 w-20 rounded-full bg-gray-200 animate-pulse" />
              ))
            ) : (
                // show a fixed number of categories, rest go into the 'More' dropdown
                (() => {
                  const VISIBLE_COUNT = 6; // show first 6 categories, rest in More
                  const visible = categories.slice(0, VISIBLE_COUNT);
                  const overflow = categories.slice(VISIBLE_COUNT);

                  return (
                    <>
                      {visible.map((category) => {
                // Defensive: skip rendering categories that would link to '/category' or have empty hrefs
                        if (!category || !category.href || category.href === '/category' || category.href === '/category/') {
                          try {
                            console.warn('NavbarClient: skipping invalid category href', category);
                          } catch {}
                          return null;
                        }
                        return (
                          <a
                            key={category.id}
                            href={category.href}
                            onClick={(e) => {
                              e.preventDefault();
                              try {
                                console.info('Navbar click -> href=', category.href);
                              } catch (err) {}
                              router.push(category.href);
                            }}
                            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-gray-100 text-gray-700 hover:bg-red-600 hover:text-white"
                            style={{ fontFamily: 'var(--font-open-sans)' }}
                          >
                            {category.label}
                          </a>
                        );
                      })}

                      {/* More dropdown - always visible on desktop */}
                      <div className="relative" ref={moreRef}>
                        <button
                          type="button"
                          aria-haspopup="menu"
                          aria-expanded={isMoreOpen}
                          onClick={() => setIsMoreOpen((s) => !s)}
                          className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-gray-100 text-gray-700 hover:bg-red-600 hover:text-white"
                          style={{ fontFamily: 'var(--font-open-sans)' }}
                        >
                          अधिक
                        </button>

                        {isMoreOpen && (
                          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                            <div className="py-1">
                              {overflow.length === 0 ? (
                                <div className="px-4 py-2 text-sm text-gray-500">कोई श्रेणियाँ नहीं</div>
                              ) : (
                                overflow.map((c) => (
                                  <a key={c.id} href={c.href} onClick={(e) => { e.preventDefault(); setIsMoreOpen(false); try { console.info('More menu click -> href=', c.href); } catch {} ; router.push(c.href); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors">
                                    {c.label}
                                  </a>
                                ))
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()
            )}
          </div>

          <div className="hidden lg:block relative" ref={hamburgerRef}>
            <button className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none" aria-label="Desktop hamburger menu" type="button" onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}>
              <Menu size={28} />
            </button>
            {isHamburgerOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  {additionalPages.map((page) => (
                      <a key={page.id} href={page.href} onClick={(e) => { e.preventDefault(); setIsHamburgerOpen(false); router.push(page.href); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors">
                        {page.label}
                      </a>
                    ))}
                </div>
              </div>
            )}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none" aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setIsMenuOpen(false)} />
            <div className="absolute top-0 right-0 w-full sm:w-3/4 max-w-sm h-full bg-white shadow-lg p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold">मेनू</div>
                <button className="p-2 rounded-md text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)} aria-label="बंद करें">
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={`m-s-${i}`} className="h-4 bg-gray-200 rounded mb-3 animate-pulse" />
                  ))
                ) : (
                  categories.map((category) => (
                    <a key={category.id} href={category.href} onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); try { console.info('Mobile menu click -> href=', category.href); } catch {} ; router.push(category.href); }} className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-red-600 hover:text-white" style={{ fontFamily: 'var(--font-open-sans)' }}>
                      {category.label}
                    </a>
                  ))
                )}

                <div className="border-t border-gray-200 mt-4 pt-4">
                  <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">अन्य पेज</h3>
                  {additionalPages.map((page) => (
                    <Link key={page.id} href={page.href} onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors bg-gray-50 text-gray-600 hover:bg-red-600 hover:text-white" style={{ fontFamily: 'var(--font-open-sans)' }}>
                      {page.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
