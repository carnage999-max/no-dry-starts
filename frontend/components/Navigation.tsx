"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-[var(--color-graphite-950)] border-b border-[var(--color-graphite-800)] backdrop-blur-sm bg-opacity-90 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
              <Image src="/images/nodrystarts.jpeg" alt="NO DRY STARTS Logo" width={40} height={40} className="rounded" />
              <span className="text-2xl font-bold text-[var(--color-tiger-orange-500)]">NO DRY STARTS<span className="text-xs align-super">®</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/how-it-works" className="text-[var(--color-white-200)] hover:text-[var(--color-white-500)] transition-colors">
              How It Works
            </Link>
            <Link href="/the-problem" className="text-[var(--color-white-200)] hover:text-[var(--color-white-500)] transition-colors">
              The Problem
            </Link>
            <Link href="/the-solution" className="text-[var(--color-white-200)] hover:text-[var(--color-white-500)] transition-colors">
              The Solution
            </Link>
            <Link href="/partners" className="text-[var(--color-white-200)] hover:text-[var(--color-white-500)] transition-colors">
              Partners
            </Link>
            <Link href="/investors" className="text-[var(--color-white-200)] hover:text-[var(--color-white-500)] transition-colors">
              Investors
            </Link>
            <Link href="/contact" className="text-[var(--color-white-200)] hover:text-[var(--color-white-500)] transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[var(--color-white-200)] hover:text-[var(--color-white-500)] transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[var(--color-graphite-950)] border-t border-[var(--color-graphite-800)]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/how-it-works"
                className="block px-3 py-2 text-[var(--color-white-200)] hover:text-[var(--color-white-500)] hover:bg-[var(--color-graphite-800)] rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/the-problem"
                className="block px-3 py-2 text-[var(--color-white-200)] hover:text-[var(--color-white-500)] hover:bg-[var(--color-graphite-800)] rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                The Problem
              </Link>
              <Link
                href="/the-solution"
                className="block px-3 py-2 text-[var(--color-white-200)] hover:text-[var(--color-white-500)] hover:bg-[var(--color-graphite-800)] rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                The Solution
              </Link>
              <Link
                href="/partners"
                className="block px-3 py-2 text-[var(--color-white-200)] hover:text-[var(--color-white-500)] hover:bg-[var(--color-graphite-800)] rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Partners
              </Link>
              <Link
                href="/investors"
                className="block px-3 py-2 text-[var(--color-white-200)] hover:text-[var(--color-white-500)] hover:bg-[var(--color-graphite-800)] rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Investors
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-[var(--color-white-200)] hover:text-[var(--color-white-500)] hover:bg-[var(--color-graphite-800)] rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
