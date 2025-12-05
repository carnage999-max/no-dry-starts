'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import apiClient, { Document } from '@/lib/api-client';

export default function PatentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await apiClient.getDocuments();
        setDocuments(docs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const getCategoryDocs = (category: string) => {
    return documents.filter(doc => doc.category === category);
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-graphite-950)] to-[var(--color-graphite-900)]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-white-100)] mb-6">
            Patents & Documentation
          </h1>
          <p className="text-xl text-[var(--color-white-300)] max-w-3xl mx-auto">
            Download technical specifications, patent filings, and engineering diagrams
          </p>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-[var(--color-white-300)]">Loading documents...</div>
          ) : (
            <div className="space-y-16">
              {/* Patents */}
              <div>
                <h2 className="text-3xl font-bold text-[var(--color-white-100)] mb-8">Patent Filings</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getCategoryDocs('patent').length > 0 ? (
                    getCategoryDocs('patent').map((doc) => (
                      <div key={doc.id} className="bg-[var(--color-graphite-900)] p-6 rounded-lg border border-[var(--color-graphite-800)]">
                        <div className="text-4xl mb-4">📄</div>
                        <h3 className="text-xl font-semibold text-[var(--color-white-100)] mb-2">{doc.file_name}</h3>
                        {doc.description && (
                          <p className="text-[var(--color-white-400)] text-sm mb-4">{doc.description}</p>
                        )}
                        <a href={doc.file_url} download className="inline-block">
                          <Button variant="primary" size="sm">Download</Button>
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="text-[var(--color-white-400)] col-span-full">Patent documents will be available soon.</p>
                  )}
                </div>
              </div>

              {/* Diagrams */}
              <div>
                <h2 className="text-3xl font-bold text-[var(--color-white-100)] mb-8">Technical Diagrams</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getCategoryDocs('diagram').length > 0 ? (
                    getCategoryDocs('diagram').map((doc) => (
                      <div key={doc.id} className="bg-[var(--color-graphite-900)] p-6 rounded-lg border border-[var(--color-graphite-800)]">
                        <div className="text-4xl mb-4">📐</div>
                        <h3 className="text-xl font-semibold text-[var(--color-white-100)] mb-2">{doc.file_name}</h3>
                        {doc.description && (
                          <p className="text-[var(--color-white-400)] text-sm mb-4">{doc.description}</p>
                        )}
                        <a href={doc.file_url} download className="inline-block">
                          <Button variant="primary" size="sm">Download</Button>
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="text-[var(--color-white-400)] col-span-full">Technical diagrams will be available soon.</p>
                  )}
                </div>
              </div>

              {/* Technical Documentation */}
              <div>
                <h2 className="text-3xl font-bold text-[var(--color-white-100)] mb-8">Technical Documentation</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getCategoryDocs('technical').length > 0 ? (
                    getCategoryDocs('technical').map((doc) => (
                      <div key={doc.id} className="bg-[var(--color-graphite-900)] p-6 rounded-lg border border-[var(--color-graphite-800)]">
                        <div className="text-4xl mb-4">📋</div>
                        <h3 className="text-xl font-semibold text-[var(--color-white-100)] mb-2">{doc.file_name}</h3>
                        {doc.description && (
                          <p className="text-[var(--color-white-400)] text-sm mb-4">{doc.description}</p>
                        )}
                        <a href={doc.file_url} download className="inline-block">
                          <Button variant="primary" size="sm">Download</Button>
                        </a>
                      </div>
                    ))
                  ) : (
                    <p className="text-[var(--color-white-400)] col-span-full">Technical documentation will be available soon.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-tiger-orange-800)] to-[var(--color-tiger-orange-950)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Questions About The Technology?
          </h2>
          <p className="text-xl text-[var(--color-tiger-orange-100)] mb-8">
            Contact us for detailed technical specifications or prototype quotes.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Get In Touch
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
