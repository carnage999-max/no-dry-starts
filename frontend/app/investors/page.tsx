'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Navigation } from '@/components/Navigation';
import apiClient, { Document } from '@/lib/api-client';
import { Footer } from '@/components/Footer';
import { CheckCircle, FileText } from 'lucide-react';

export default function InvestorsPage() {
  const [investorDocs, setInvestorDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

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

      {/* Documents */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[var(--color-white-100)] mb-8 text-center">Investment Documents</h2>
          {loading ? (
            <div className="text-center text-[var(--color-white-300)]">Loading documents...</div>
          ) : investorDocs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {investorDocs.map((doc) => (
                <div key={doc.id} className="bg-[var(--color-graphite-900)] p-6 rounded-lg border border-[var(--color-graphite-800)]">
                  <FileText className="w-10 h-10 text-[var(--color-tiger-orange-400)] mb-4" />
                  <h3 className="text-xl font-semibold text-[var(--color-white-100)] mb-2">{doc.file_name}</h3>
                  {doc.description && (
                    <p className="text-[var(--color-white-400)] text-sm mb-4">{doc.description}</p>
                  )}
                  <a href={doc.file_url} download className="inline-block">
                    <Button variant="primary" size="sm">Download</Button>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-[var(--color-graphite-900)] p-8 rounded-lg border border-[var(--color-graphite-800)]">
              <p className="text-[var(--color-white-400)] mb-4">Investment documents will be available soon.</p>
              <p className="text-[var(--color-white-500)] text-sm">For more information, please contact us directly.</p>
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
