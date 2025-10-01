'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const categories = [
		{ id: 'Home', label: 'सभी', value: '', href: '/' },
	{ id: 'cricket', label: 'क्रिकेट', value: 'क्रिकेट', href: '/category/cricket' },
	{ id: 'country', label: 'देश', value: 'देश', href: '/category/desh' },
	{ id: 'current', label: 'हालात', value: 'हालात', href: '/category/halat' },
	{ id: 'general', label: 'सामान्य', value: 'सामान्य', href: '/category/general' },
	{ id: 'business', label: 'व्यापार समाचार', value: 'व्यापार समाचार', href: '/category/business' },
	{ id: 'national', label: 'राष्ट्रीय समाचार', value: 'राष्ट्रीय समाचार', href: '/category/national' },
	{ id: 'stock', label: 'शेयर बाज़ार', value: 'शेयर बाज़ार', href: '/category/stock' },
];

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
										<div className="flex items-center min-h-[80px] py-2 w-full gap-4 justify-between">
											<div className="flex items-center flex-shrink-0 min-w-[120px]">
                                            <Link href="/">
                                                                    <Image
                                                                        src="/logo.png"
                                                                        alt="Desh Aaj Logo"
                                                                        width={320}
                                                                        height={96}
                                                                        className="h-20 w-auto max-w-[340px] min-w-[120px] object-contain"
                                                                        priority
                                                                    />
                                                                </Link>
															</div>
					<div className="hidden lg:flex items-center gap-2">
						{categories.map((category) => (
							<Link
								key={category.id}
								href={category.href}
								className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white"
								style={{ fontFamily: 'var(--font-open-sans)' }}
							>
								{category.label}
							</Link>
						))}
					</div>
                    {/* Hamburger icon for desktop at end */}
                    <button
                        className="hidden lg:inline-flex p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                        aria-label="Desktop hamburger menu"
                        type="button"
                        onClick={() => {}}
                    >
                        <Menu size={28} />
                    </button>
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
									className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white"
									style={{ fontFamily: 'var(--font-open-sans)' }}
								>
									{category.label}
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
