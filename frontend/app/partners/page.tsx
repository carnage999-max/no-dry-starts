'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import apiClient, { Manufacturer } from '@/lib/api-client';

export default function PartnersPage() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const data = await apiClient.getManufacturers();
        setManufacturers(data);
      } catch (error) {
        console.error('Error fetching manufacturers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchManufacturers();
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-graphite-950)] to-[var(--color-graphite-900)]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-white-100)] mb-6">
            Prototype Partners
          </h1>
          <p className="text-xl text-[var(--color-white-300)] max-w-3xl mx-auto">
            Recommended manufacturers for No Dry Starts® prototype development
          </p>
        </div>
      </section>

      {/* Manufacturers List */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-[var(--color-white-300)]">Loading partners...</div>
          ) : manufacturers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {manufacturers.map((mfr) => (
                <div key={mfr.id} className="bg-[var(--color-graphite-900)] p-6 rounded-lg border border-[var(--color-graphite-800)]">
                  <h3 className="text-2xl font-bold text-[var(--color-white-100)] mb-4">{mfr.name}</h3>
                  <p className="text-[var(--color-white-400)] mb-4">{mfr.description}</p>
                  <div className="space-y-2 text-sm text-[var(--color-white-300)]">
                    <p><strong>Phone:</strong> {mfr.phone}</p>
                    <p><strong>Email:</strong> <a href={`mailto:${mfr.email}`} className="text-[var(--color-tiger-orange-400)] hover:underline">{mfr.email}</a></p>
                    {mfr.website && (
                      <p><strong>Website:</strong> <a href={mfr.website} target="_blank" rel="noopener noreferrer" className="text-[var(--color-tiger-orange-400)] hover:underline">Visit Site</a></p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-[var(--color-white-400)] mb-8">Manufacturing partners will be listed here soon.</p>
              <Link href="/contact" className="text-[var(--color-tiger-orange-400)] hover:underline">
                Interested in becoming a partner? Contact us.
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
