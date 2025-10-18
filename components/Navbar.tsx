"use client";

import { useEffect, useState } from 'react';
import NavbarClient from './NavbarClient';

type Cat = { id: string; label: string; value: string; href: string };

import { slugify } from '@/lib/utils';

export default function Navbar() {
	const [categories, setCategories] = useState<Cat[]>([{ id: 'home', label: 'सभी', value: '', href: '/' }]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

    useEffect(() => {
		let mounted = true;
		async function load() {
			try {
				setLoading(true);
				setError(null);
				const res = await fetch('/api/content');
				if (!res.ok) {
					throw new Error(`status:${res.status}`);
				}
				const json = await res.json();
				console.info('Navbar fetched /api/content -> categories:', json.categories);
				const apiCats = Array.isArray(json.categories) ? json.categories : [];
				if (!mounted) return;
				if (apiCats.length) {
					// Normalize and filter categories coming from the API.
					// Skip any category that results in an empty slug (this would produce '/category' which 404s).
					const normalized = apiCats
						.map((c: any) => {
							const id = String(c.id || '').trim();
							let href = String(c.href || '');
							// normalize trailing slash (avoid '/category/')
							if (href.endsWith('/') && href !== '/') href = href.slice(0, -1);
							return { ...c, id, href };
						})
						.filter((c: any) => c.id && c.id !== '' && !(c.href === '/category' || c.href === '/category/'));

					if (normalized.length) {
						setCategories([{ id: 'home', label: 'सभी', value: '', href: '/' }, ...normalized]);
					} else {
						// categories were present but all normalized to empty slugs — warn and keep fallback
						console.warn('Navbar: API categories contained empty or invalid slugs; using fallback categories', apiCats);
					}
				} else {
					// no categories from API — keep fallback
					console.warn('Navbar: no categories returned from /api/content');
				}
				setLoading(false);
			} catch (err) {
				console.error('Navbar client: failed to load categories', err);
				setError(String(err));
				setLoading(false);
			}
		}
		load();
		return () => {
			mounted = false;
		};
	}, []);

	return <NavbarClient categories={categories} loading={loading} error={error} />;
}
