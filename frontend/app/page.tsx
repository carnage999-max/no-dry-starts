'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CheckCircle } from 'lucide-react';
import apiClient, { ContentBlock } from '@/lib/api-client';

export default function Home() {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContentBlocks = async () => {
      try {
        const blocks = await apiClient.getContentBlocks();
        // Filter for homepage blocks and sort by order
        const homeBlocks = blocks
          .filter(block => block.page === 'home')
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setContentBlocks(homeBlocks);
      } catch (error) {
        console.error('Error fetching content blocks:', error);
        // Fallback to hardcoded content if API fails
        setContentBlocks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContentBlocks();
  }, []);

  // Helper function to get content block by slug
  const getContentBlock = (slug: string): ContentBlock | null => {
    return contentBlocks.find(block => block.slug === slug) || null;
  };

  // Helper function to render HTML content safely
  const renderContentBlock = (block: ContentBlock | null, fallback: React.ReactNode) => {
    if (block && block.html_content) {
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: block.html_content }}
          className="prose prose-invert max-w-none"
        />
      );
    }
    return fallback;
  };
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[var(--color-graphite-900)] to-[var(--background)]">
        <div className="max-w-7xl mx-auto">
          {renderContentBlock(getContentBlock('homepage_hero'), (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Image - First on mobile, second on desktop */}
              <div className="relative flex items-center justify-center order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[var(--color-tiger-orange-500)] max-w-md lg:max-w-lg">
                  <img 
                    src="/images/engine-hero.png" 
                    alt="Engine - The worst thing you can do to your engine is to start it. We fix that." 
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Hero Content - Second on mobile, first on desktop */}
              <div className="order-2 lg:order-1">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--color-white-100)] mb-6 leading-tight">
                  NO DRY STARTS<span className="text-2xl md:text-3xl lg:text-4xl align-super">®</span>
                </h1>
                <p className="text-2xl md:text-3xl text-[var(--color-tiger-orange-500)] mb-6 font-semibold">
                  Electric Engine Pre-Primer System
                </p>
                <p className="text-lg md:text-xl text-[var(--color-white-300)] mb-4 leading-relaxed">
                  The First System to Eliminate Cold-Start Engine Wear
                </p>
                <p className="text-base text-[var(--color-khaki-400)] mb-8">
                  Build Full Oil Pressure Before Ignition
                </p>
                <div className="bg-[var(--color-graphite-900)] bg-opacity-80 border border-[var(--color-tiger-orange-500)] rounded-lg p-6 mt-8">
                  <p className="text-lg md:text-xl lg:text-2xl font-semibold text-[var(--color-white-100)] leading-relaxed">
                    By eliminating dry starts and maintaining full oil circulation, the{' '}
                    <span className="text-[var(--color-tiger-orange-400)]">No Dry Starts<span className="text-xs md:text-sm lg:text-base align-super">®</span></span> system can{' '}
                    <span className="text-[var(--color-tiger-orange-400)]">reduce start-up wear by up to 60%</span> and{' '}
                    <span className="text-[var(--color-tiger-orange-400)]">extend engine longevity by as much as 500,000 additional miles</span> under optimal conditions.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Problem Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-graphite-900)]">
        <div className="max-w-7xl mx-auto">
          {renderContentBlock(getContentBlock('homepage_problem'), (
            <>
              <h2 className="text-4xl font-bold text-[var(--color-tiger-orange-500)] mb-8 text-center">
                The Problem: Cold Start Wear
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-[var(--color-graphite-800)] p-6 rounded-lg border border-[var(--color-graphite-700)]">
                  <div className="text-5xl font-bold text-[var(--color-tiger-orange-500)] mb-4">80%</div>
                  <h3 className="text-xl font-semibold text-[var(--color-white-200)] mb-3">Engine Wear</h3>
                  <p className="text-[var(--color-white-400)]">
                    Up to 80% of all engine wear occurs during cold starts when oil pressure is zero.
                  </p>
                </div>
                <div className="bg-[var(--color-graphite-800)] p-6 rounded-lg border border-[var(--color-graphite-700)]">
                  <div className="text-5xl font-bold text-[var(--color-tiger-orange-500)] mb-4">1-3s</div>
                  <h3 className="text-xl font-semibold text-[var(--color-white-200)] mb-3">Critical Window</h3>
                  <p className="text-[var(--color-white-400)]">
                    Metal-to-metal contact occurs in the first 1-3 seconds before oil pressure builds.
                  </p>
                </div>
                <div className="bg-[var(--color-graphite-800)] p-6 rounded-lg border border-[var(--color-graphite-700)]">
                  <div className="text-5xl font-bold text-[var(--color-tiger-orange-500)] mb-4">2x</div>
                  <h3 className="text-xl font-semibold text-[var(--color-white-200)] mb-3">Life Extension</h3>
                  <p className="text-[var(--color-white-400)]">
                    Eliminate dry starts and double your engine's useful life expectancy.
                  </p>
                </div>
              </div>
              <div className="text-center mt-12">
                <Link href="/the-problem">
                  <Button variant="secondary" size="lg">
                    Learn More About The Problem
                  </Button>
                </Link>
              </div>
            </>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {renderContentBlock(getContentBlock('homepage_how_it_works'), (
            <>
              <h2 className="text-4xl font-bold text-[var(--color-white-100)] mb-8 text-center">
                How It Works
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-[var(--color-tiger-orange-500)] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--color-white-200)] mb-2">Driver Turns Key</h3>
                        <p className="text-[var(--color-white-400)]">The No Dry Starts® system activates immediately when you turn the key or press START.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-[var(--color-tiger-orange-500)] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--color-white-200)] mb-2">Electric Pump Activates</h3>
                        <p className="text-[var(--color-white-400)]">Our integrated electric oil pump floods engine galleries and fills all bearings.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-[var(--color-tiger-orange-500)] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--color-white-200)] mb-2">Pressure Builds</h3>
                        <p className="text-[var(--color-white-400)]">Full hydrodynamic oil pressure is achieved before the starter engages.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-[var(--color-tiger-orange-500)] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--color-white-200)] mb-2">Engine Starts Protected</h3>
                        <p className="text-[var(--color-white-400)]">The engine starts fully lubricated with zero metal-to-metal contact.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[var(--color-graphite-900)] p-8 rounded-lg border border-[var(--color-graphite-800)]">
                  <h3 className="text-2xl font-bold text-[var(--color-white-100)] mb-6">Key Features</h3>
                  <ul className="space-y-4 text-[var(--color-white-300)]">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-[var(--color-tiger-orange-500)] w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Fully self-contained sandwich-mount assembly</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-[var(--color-tiger-orange-500)] w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Integrated electric pump and pressure sensor</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-[var(--color-tiger-orange-500)] w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Integrated ignition lockout controller</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-[var(--color-tiger-orange-500)] w-5 h-5 mt-1 flex-shrink-0" />
                      <span>No external hoses, tanks, or complex plumbing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-[var(--color-tiger-orange-500)] w-5 h-5 mt-1 flex-shrink-0" />
                      <span>Universal: fits cars, trucks, diesel, performance engines</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-center mt-12">
                <Link href="/how-it-works">
                  <Button variant="primary" size="lg">
                    View Complete Technical Details
                  </Button>
                </Link>
              </div>
            </>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-tiger-orange-800)] to-[var(--color-tiger-orange-950)]">
        <div className="max-w-4xl mx-auto text-center">
          {renderContentBlock(getContentBlock('homepage_cta'), (
            <>
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Eliminate Engine Wear?
              </h2>
              <p className="text-xl text-[var(--color-tiger-orange-100)] mb-8">
                Join manufacturers, investors, and engine builders revolutionizing automotive reliability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Get a Quote
                  </Button>
                </Link>
                <Link href="/investors">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[var(--color-tiger-orange-900)]">
                    Investor Information
                  </Button>
                </Link>
              </div>
            </>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
