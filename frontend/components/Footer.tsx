import Link from 'next/link';
import { Button } from '@/components/Button';
import { Mail, Phone, MapPin, FileText, Users, TrendingUp, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[var(--color-graphite-950)] border-t border-[var(--color-graphite-800)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[var(--color-tiger-orange-500)]">NO DRY STARTS®</h3>
            <p className="text-[var(--color-white-400)] text-sm">
              The first consumer-friendly system to eliminate cold-start engine wear by building full oil pressure before ignition.
            </p>
            <div className="flex space-x-4">
              <a href="https://mylibertysocial.com" className="text-[var(--color-white-400)] hover:text-[var(--color-tiger-orange-500)] transition-colors">
                <Globe size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--color-white-200)]">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/how-it-works" className="block text-[var(--color-white-400)] hover:text-[var(--color-white-200)] transition-colors text-sm">
                How It Works
              </Link>
              <Link href="/the-problem" className="block text-[var(--color-white-400)] hover:text-[var(--color-white-200)] transition-colors text-sm">
                The Problem
              </Link>
              <Link href="/the-solution" className="block text-[var(--color-white-400)] hover:text-[var(--color-white-200)] transition-colors text-sm">
                The Solution
              </Link>
              <Link href="/patents" className="block text-[var(--color-white-400)] hover:text-[var(--color-white-200)] transition-colors text-sm">
                Patents
              </Link>
              <Link href="/partners" className="block text-[var(--color-white-400)] hover:text-[var(--color-white-200)] transition-colors text-sm">
                Partners
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--color-white-200)]">Resources</h4>
            <div className="space-y-2">
              <Link href="/investors" className="block text-[var(--color-white-400)] hover:text-[var(--color-white-200)] transition-colors text-sm">
                Investor Information
              </Link>
              <Link href="/contact" className="block text-[var(--color-white-400)] hover:text-[var(--color-white-200)] transition-colors text-sm">
                Request Prototype Quote
              </Link>
              <a href="#" className="flex items-center gap-2 text-[var(--color-white-400)] hover:text-[var(--color-white-200)] transition-colors text-sm">
                <FileText size={16} />
                Technical Documentation
              </a>
              <a href="#" className="flex items-center gap-2 text-[var(--color-white-400)] hover:text-[var(--color-white-200)] transition-colors text-sm">
                <Users size={16} />
                Partner Portal
              </a>
              <a href="#" className="flex items-center gap-2 text-[var(--color-white-400)] hover:text-[var(--color-white-200)] transition-colors text-sm">
                <TrendingUp size={16} />
                Market Analysis
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--color-white-200)]">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-[var(--color-white-400)] text-sm">
                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p>info@nodrystarts.com</p>
                  <p>sales@nodrystarts.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[var(--color-white-400)] text-sm">
                <Phone size={16} className="flex-shrink-0" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-start gap-3 text-[var(--color-white-400)] text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <p>
                  123 Innovation Drive<br />
                  Tech Valley, CA 94043
                </p>
              </div>
            </div>
            <div className="pt-4">
              <Link href="/contact">
                <Button variant="primary" size="sm">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--color-graphite-800)] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--color-white-400)] text-sm">
              &copy; {new Date().getFullYear()} No Dry Starts®. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-[var(--color-white-400)] hover:text-[var(--color-white-200)] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-[var(--color-white-400)] hover:text-[var(--color-white-200)] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-[var(--color-white-400)] hover:text-[var(--color-white-200)] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};