'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import apiClient from '@/lib/api-client';
import { Button } from '@/components/Button';
import { FileText, Upload, CheckCircle } from 'lucide-react';

export default function RFQPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('File size must be less than 10MB');
        return;
      }
      setAttachment(file);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await apiClient.createRFQ({
        ...formData,
        attachment: attachment || undefined,
      });
      setStatus('success');
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
      setAttachment(null);
      // Reset file input
      const fileInput = document.getElementById('attachment') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-graphite-950)] to-[var(--color-graphite-900)]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-white-100)] mb-6">
            Request for Quote
          </h1>
          <p className="text-xl text-[var(--color-white-300)] max-w-3xl mx-auto">
            Get a prototype quote for the No Dry Starts® engine pre-primer system
          </p>
        </div>
      </section>

      {/* RFQ Form */}
      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {status === 'success' ? (
            <div className="bg-green-900 bg-opacity-50 border border-green-700 text-green-200 px-6 py-4 rounded-lg mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Quote Request Submitted!</h3>
                  <p>Thank you for your interest. We'll review your request and get back to you within 2-3 business days.</p>
                </div>
              </div>
            </div>
          ) : null}

          {status === 'error' ? (
            <div className="bg-red-900 bg-opacity-50 border border-red-700 text-red-200 px-6 py-4 rounded-lg mb-8">
              <h3 className="font-semibold mb-2">Error</h3>
              <p>{errorMessage}</p>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="bg-[var(--color-graphite-900)] border border-[var(--color-graphite-800)] rounded-lg p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
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
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                Project Details *
              </label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] focus:border-transparent resize-none"
                placeholder="Please describe your project requirements, engine specifications, quantity needed, timeline, and any other relevant details..."
                required
              />
            </div>

            <div>
              <label htmlFor="attachment" className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                Attachments (Optional)
              </label>
              <div className="border-2 border-dashed border-[var(--color-graphite-700)] rounded-lg p-6 bg-[var(--color-graphite-800)]">
                <input
                  type="file"
                  id="attachment"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.dwg,.dxf,.cad,.step,.stp"
                />
                <label
                  htmlFor="attachment"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="w-10 h-10 text-[var(--color-tiger-orange-400)] mb-3" />
                  <span className="text-[var(--color-white-200)] font-medium mb-1">
                    {attachment ? attachment.name : 'Click to upload or drag and drop'}
                  </span>
                  <span className="text-sm text-[var(--color-white-400)]">
                    PDF, DOC, CAD files (MAX. 10MB)
                  </span>
                </label>
              </div>
              {attachment && (
                <div className="mt-3 flex items-center gap-2 text-sm text-[var(--color-white-300)]">
                  <FileText className="w-4 h-4" />
                  <span>{attachment.name}</span>
                  <span className="text-[var(--color-white-500)]">
                    ({(attachment.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setAttachment(null);
                      const fileInput = document.getElementById('attachment') as HTMLInputElement;
                      if (fileInput) fileInput.value = '';
                    }}
                    className="ml-auto text-[var(--color-tiger-orange-400)] hover:text-[var(--color-tiger-orange-300)]"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === 'loading'}
              className="w-full"
            >
              {status === 'loading' ? 'Submitting Request...' : 'Submit RFQ Request'}
            </Button>
          </form>

          {/* Additional Info */}
          <div className="mt-12 bg-[var(--color-graphite-900)] border border-[var(--color-graphite-800)] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[var(--color-white-100)] mb-4">What Happens Next?</h3>
            <ul className="space-y-3 text-[var(--color-white-400)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-tiger-orange-500)] mt-1">•</span>
                <span>Our engineering team will review your requirements within 2-3 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-tiger-orange-500)] mt-1">•</span>
                <span>We'll contact you to discuss technical specifications and pricing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-tiger-orange-500)] mt-1">•</span>
                <span>For urgent requests, please call or email us directly</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

