'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import apiClient from '@/lib/api-client';
import { Button } from '@/components/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    message: '',
    inquiry_type: 'contact' as const,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await apiClient.createLead(formData);
      setStatus('success');
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        message: '',
        inquiry_type: 'contact',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Founder Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-graphite-900)]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[var(--color-graphite-950)] rounded-lg p-8 md:p-12 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Left Side - Portrait */}
              <div className="flex justify-center md:justify-start order-2 md:order-1">
                <div className="relative">
                  <img 
                    src="/images/nathan.jpeg" 
                    alt="Nathan Reardon - Founder of No Dry Starts" 
                    className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-lg border-4 border-[var(--color-tiger-orange-500)] shadow-xl"
                  />
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="space-y-4 order-1 md:order-2 relative">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-white-100)]">
                  Founder - Nathan Reardon
                </h2>
                <p className="text-xl md:text-2xl text-[var(--color-tiger-orange-400)] font-semibold">
                  The No Dry Starts<span className="text-sm md:text-base align-super">®</span> system was founded by
                </p>
                <div className="relative mt-8">
                  {/* ASE Badge - Positioned like in the image */}
                  <div className="absolute -right-8 -top-8 md:-right-12 md:-top-12 opacity-20 md:opacity-30">
                    <img 
                      src="/images/ase.png" 
                      alt="ASE Certification" 
                      className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain"
                    />
                  </div>
                  <p className="text-lg md:text-xl text-[var(--color-white-100)] leading-relaxed relative z-10">
                    automotive veteran and ASE Triple Master Nathan Reardon, who graduated top of his class from Universal Technical Institute in Phoenix, Arizona.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <main className="pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-[var(--color-white-100)] mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-[var(--color-white-300)] mb-12">
            Have questions about No Dry Starts®? We're here to help.
          </p>

          {status === 'success' ? (
            <div className="bg-green-900 bg-opacity-50 border border-green-700 text-green-200 px-6 py-4 rounded-lg mb-8">
              <h3 className="font-semibold mb-2">Message Sent!</h3>
              <p>Thank you for contacting us. We'll get back to you soon.</p>
            </div>
          ) : null}

          {status === 'error' ? (
            <div className="bg-red-900 bg-opacity-50 border border-red-700 text-red-200 px-6 py-4 rounded-lg mb-8">
              <h3 className="font-semibold mb-2">Error</h3>
              <p>{errorMessage}</p>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="bg-[var(--color-graphite-900)] border border-[var(--color-graphite-800)] rounded-lg p-8 space-y-6">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-4 py-3 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="inquiry_type" className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                Inquiry Type *
              </label>
              <select
                id="inquiry_type"
                value={formData.inquiry_type}
                onChange={(e) => setFormData({ ...formData, inquiry_type: e.target.value as any })}
                className="w-full px-4 py-3 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] focus:border-transparent"
                required
              >
                <option value="contact">General Contact</option>
                <option value="investor">Investor Inquiry</option>
                <option value="manufacturer">Manufacturer Application</option>
              </select>
              <p className="text-sm text-[var(--color-white-500)] mt-2">
                Need a prototype quote? <Link href="/rfq" className="text-[var(--color-tiger-orange-400)] hover:underline">Use our dedicated RFQ form</Link>
              </p>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                Message *
              </label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] focus:border-transparent resize-none"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === 'loading'}
              className="w-full"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </Button>
          </form>

          {/* Additional Contact Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-[var(--color-graphite-900)] border border-[var(--color-graphite-800)] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[var(--color-white-100)] mb-4">For Manufacturers</h3>
              <p className="text-[var(--color-white-400)] mb-4">
                Interested in becoming a prototype partner? We're actively seeking manufacturing partners.
              </p>
              <Link href="/partners">
                <Button variant="secondary">View Partners Program</Button>
              </Link>
            </div>

            <div className="bg-[var(--color-graphite-900)] border border-[var(--color-graphite-800)] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[var(--color-white-100)] mb-4">For Investors</h3>
              <p className="text-[var(--color-white-400)] mb-4">
                Explore investment opportunities and download our investor deck.
              </p>
              <Link href="/investors">
                <Button variant="secondary">Investor Information</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
