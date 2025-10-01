'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const categories = [
		{ id: 'Home', label: 'सभी', value: '', href: '/' },
	{ id: 'cricket', label: 'क्रिकेट', value: 'क्रिकेट', href: '/category/cricket' },
	{ id: 'country', label: 'देश', value: 'देश', href: '/category/desh' },
	{ id: 'general', label: 'सामान्य', value: 'सामान्य', href: '/category/general' },
	{ id: 'business', label: 'व्यापार समाचार', value: 'व्यापार समाचार', href: '/category/business' },
	{ id: 'national', label: 'राष्ट्रीय समाचार', value: 'राष्ट्रीय समाचार', href: '/category/national' },
	{ id: 'stock', label: 'शेयर बाज़ार', value: 'शेयर बाज़ार', href: '/category/stock' },
];

const additionalPages = [
	{ id: 'about', label: 'हमारे बारे में', href: '/about' },
	{ id: 'privacy', label: 'गोपनीयता नीति', href: '/privacy' },
	{ id: 'terms', label: 'सेवा की शर्तें', href: '/terms' },
];

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
	const hamburgerRef = useRef<HTMLDivElement>(null);

	// Close hamburger menu when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (hamburgerRef.current && !hamburgerRef.current.contains(event.target as Node)) {
				setIsHamburgerOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
										<div className="flex items-center min-h-[80px] py-2 w-full gap-4 justify-between">
											<div className="flex items-center flex-shrink-0 min-w-[120px]">
                                            <Link href="/">
                                                                    <Image
                                                                        src="/logo.png"
                                                                        alt="Desh Aaj Logo"
                                                                        width={250}
                                                                        height={60}
                                                                        className="h-[60px] w-auto object-contain md:h-[60px] lg:h-[60px]"
                                                                        priority
                                                                    />
                                                                </Link>
															</div>
					<div className="hidden lg:flex items-center gap-2">
						{categories.map((category) => (
							<Link
								key={category.id}
								href={category.href}
                                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-gray-100 text-gray-700 hover:bg-red-600 hover:text-white"
								style={{ fontFamily: 'var(--font-open-sans)' }}
							>
								{category.label}
							</Link>
						))}
					</div>
                    {/* Hamburger icon for desktop at end */}
                    <div className="hidden lg:block relative" ref={hamburgerRef}>
                        <button
                            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                            aria-label="Desktop hamburger menu"
                            type="button"
                            onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
                        >
                            <Menu size={28} />
                        </button>
                        
                        {/* Desktop hamburger dropdown */}
                        {isHamburgerOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                <div className="py-1">
                                    {additionalPages.map((page) => (
                                        <Link
                                            key={page.id}
                                            href={page.href}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
                                            onClick={() => setIsHamburgerOpen(false)}
                                        >
                                            {page.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
					{/* Hamburger icon for mobile */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
						aria-label="Toggle menu"
					>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
				{isMenuOpen && (
					<div className="lg:hidden pb-4">
						<div className="flex flex-col gap-2">
							{categories.map((category) => (
								<Link
									key={category.id}
									href={category.href}
									onClick={() => setIsMenuOpen(false)}
                                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-red-600 hover:text-white"
									style={{ fontFamily: 'var(--font-open-sans)' }}
								>
									{category.label}
								</Link>
							))}
							
							{/* Additional pages section */}
							<div className="border-t border-gray-200 mt-4 pt-4">
								<h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
									अन्य पेज
								</h3>
								{additionalPages.map((page) => (
									<Link
										key={page.id}
										href={page.href}
										onClick={() => setIsMenuOpen(false)}
										className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-50 text-gray-600 hover:bg-red-600 hover:text-white"
										style={{ fontFamily: 'var(--font-open-sans)' }}
									>
										{page.label}
									</Link>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
