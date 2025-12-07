'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Navigation } from '@/components/Navigation';
import apiClient, { Document } from '@/lib/api-client';
import { Footer } from '@/components/Footer';
import { CheckCircle, FileText, Mail, Download, AlertCircle } from 'lucide-react';

export default function InvestorsPage() {
  const [investorDocs, setInvestorDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailFormVisible, setEmailFormVisible] = useState(true);
  const [emailFormData, setEmailFormData] = useState({
    email: '',
    name: '',
  });
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadToken, setDownloadToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const docs = await apiClient.getDocuments('investor');
        setInvestorDocs(docs);
      } catch (error) {
        console.error('Error fetching investor documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  // Check if there's a download token in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setDownloadToken(token);
      setEmailFormVisible(false);
      handleDownloadWithToken(token);
    }
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDownloadStatus('loading');
    setErrorMessage('');

    try {
      const response = await apiClient.requestInvestorDownload(emailFormData.email, emailFormData.name);
      setDownloadStatus('success');
      setEmailFormVisible(false);
    } catch (error) {
      setDownloadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to request download. Please try again.');
    }
  };

  const handleDownloadWithToken = async (token: string) => {
    try {
      const blob = await apiClient.downloadInvestorDocument(token);
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'No_Dry_Starts_Investor_Deck.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Download failed');
      setDownloadStatus('error');
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-graphite-950)] to-[var(--color-graphite-900)]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-white-100)] mb-6">Investor Information</h1>
          <p className="text-xl text-[var(--color-white-300)] max-w-3xl mx-auto">
            Market opportunity for the first consumer-friendly engine pre-primer system
          </p>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[var(--color-white-100)] mb-12 text-center">Market Opportunity</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[var(--color-graphite-900)] p-8 rounded-lg border border-[var(--color-graphite-800)] text-center">
              <div className="text-5xl font-bold text-[var(--color-tiger-orange-400)] mb-4">1.4B+</div>
              <h3 className="text-xl font-semibold text-[var(--color-white-200)] mb-3">Vehicles Worldwide</h3>
              <p className="text-[var(--color-white-400)]">Every vehicle suffers from cold-start wear</p>
            </div>
            <div className="bg-[var(--color-graphite-900)] p-8 rounded-lg border border-[var(--color-graphite-800)] text-center">
              <div className="text-5xl font-bold text-[var(--color-tiger-orange-400)] mb-4">$100B+</div>
              <h3 className="text-xl font-semibold text-[var(--color-white-200)] mb-3">Engine Rebuild Market</h3>
              <p className="text-[var(--color-white-400)]">Annual global engine repair and rebuild costs</p>
            </div>
            <div className="bg-[var(--color-graphite-900)] p-8 rounded-lg border border-[var(--color-graphite-800)] text-center">
              <div className="text-5xl font-bold text-[var(--color-tiger-orange-400)] mb-4">Zero</div>
              <h3 className="text-xl font-semibold text-[var(--color-white-200)] mb-3">Direct Competitors</h3>
              <p className="text-[var(--color-white-400)]">First consumer-ready solution to this problem</p>
            </div>
          </div>

          <h3 className="text-3xl font-bold text-[var(--color-white-100)] mb-8 text-center">Target Markets</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[var(--color-graphite-900)] p-6 rounded-lg border border-[var(--color-graphite-800)]">
              <h4 className="text-2xl font-bold text-[var(--color-tiger-orange-400)] mb-4">Fleet & Commercial</h4>
              <ul className="space-y-3 text-[var(--color-white-400)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Delivery companies (UPS, FedEx, Amazon)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Municipal vehicles and emergency services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Taxi and ride-share fleets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Construction and agricultural equipment</span>
                </li>
              </ul>
            </div>

            <div className="bg-[var(--color-graphite-900)] p-6 rounded-lg border border-[var(--color-graphite-800)]">
              <h4 className="text-2xl font-bold text-[var(--color-tiger-orange-400)] mb-4">Performance & Specialty</h4>
              <ul className="space-y-3 text-[var(--color-white-400)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Racing and high-performance engines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Luxury and exotic car owners</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Cold-climate regions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Marine and aviation applications</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-graphite-900)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[var(--color-white-100)] mb-12 text-center">Why Invest</h2>
          <div className="space-y-6">
            <div className="bg-[var(--color-graphite-800)] p-6 rounded-lg border border-[var(--color-graphite-700)]">
              <h3 className="text-xl font-semibold text-[var(--color-tiger-orange-400)] mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Novel Technology
              </h3>
              <p className="text-[var(--color-white-400)]">
                Patent-pending solution to a century-old problem affecting every internal combustion engine
              </p>
            </div>
            <div className="bg-[var(--color-graphite-800)] p-6 rounded-lg border border-[var(--color-graphite-700)]">
              <h3 className="text-xl font-semibold text-[var(--color-tiger-orange-400)] mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Universal Application
              </h3>
              <p className="text-[var(--color-white-400)]">
                Works on gasoline, diesel, turbocharged, and naturally aspirated engines—cars, trucks, marine, industrial
              </p>
            </div>
            <div className="bg-[var(--color-graphite-800)] p-6 rounded-lg border border-[var(--color-graphite-700)]">
              <h3 className="text-xl font-semibold text-[var(--color-tiger-orange-400)] mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Massive TAM
              </h3>
              <p className="text-[var(--color-white-400)]">
                1.4 billion vehicles globally, $100B+ engine maintenance market
              </p>
            </div>
            <div className="bg-[var(--color-graphite-800)] p-6 rounded-lg border border-[var(--color-graphite-700)]">
              <h3 className="text-xl font-semibold text-[var(--color-tiger-orange-400)] mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Clear Value Proposition
              </h3>
              <p className="text-[var(--color-white-400)]">
                2× engine life extension = significant cost savings for fleet operators and consumers
              </p>
            </div>
            <div className="bg-[var(--color-graphite-800)] p-6 rounded-lg border border-[var(--color-graphite-700)]">
              <h3 className="text-xl font-semibold text-[var(--color-tiger-orange-400)] mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Multiple Revenue Streams
              </h3>
              <p className="text-[var(--color-white-400)]">
                Direct sales, OEM partnerships, fleet contracts, aftermarket distribution, licensing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Secure Download Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-[var(--color-white-100)] mb-8 text-center">Investment Documents</h2>
          
          {emailFormVisible && (
            <div className="bg-[var(--color-graphite-900)] border border-[var(--color-graphite-800)] rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-8 h-8 text-[var(--color-tiger-orange-400)]" />
                <h3 className="text-2xl font-bold text-[var(--color-white-100)]">Request Secure Download</h3>
              </div>
              <p className="text-[var(--color-white-300)] mb-6">
                To access our investor deck and detailed financial information, please provide your email address. 
                We'll send you a secure, time-limited download link.
              </p>

              {downloadStatus === 'error' && (
                <div className="bg-red-900 bg-opacity-50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Error</p>
                    <p className="text-sm">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                    Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={emailFormData.name}
                    onChange={(e) => setEmailFormData({ ...emailFormData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={emailFormData.email}
                    onChange={(e) => setEmailFormData({ ...emailFormData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] focus:border-transparent"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={downloadStatus === 'loading'}
                  className="w-full"
                >
                  {downloadStatus === 'loading' ? 'Sending...' : 'Request Download Link'}
                </Button>
              </form>

              <p className="text-sm text-[var(--color-white-500)] mt-4 text-center">
                Your download link will be valid for 48 hours and can be used up to 3 times.
              </p>
            </div>
          )}

          {downloadStatus === 'success' && !emailFormVisible && (
            <div className="bg-green-900 bg-opacity-50 border border-green-700 text-green-200 px-6 py-4 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Download Link Sent!</h3>
                  <p className="text-sm">
                    We've sent a secure download link to <strong>{emailFormData.email}</strong>. 
                    Please check your email (including spam folder) and click the link to download the investor documents.
                  </p>
                  <p className="text-sm mt-2">
                    The link will expire in 48 hours and can be used up to 3 times.
                  </p>
                </div>
              </div>
            </div>
          )}

          {downloadToken && downloadStatus !== 'success' && (
            <div className="bg-[var(--color-graphite-900)] border border-[var(--color-graphite-800)] rounded-lg p-8 text-center">
              <Download className="w-12 h-12 text-[var(--color-tiger-orange-400)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[var(--color-white-100)] mb-4">Preparing Download...</h3>
              {downloadStatus === 'error' && (
                <div className="bg-red-900 bg-opacity-50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-4">
                  <p>{errorMessage}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-tiger-orange-800)] to-[var(--color-tiger-orange-950)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Interested in Learning More?</h2>
          <p className="text-xl text-[var(--color-tiger-orange-100)] mb-8">
            Contact us to discuss investment opportunities and receive detailed information.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg">Contact Investor Relations</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
