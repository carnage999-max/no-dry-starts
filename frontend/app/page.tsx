import Link from 'next/link';
import { Button } from '@/components/Button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[var(--color-graphite-900)] to-[var(--background)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--color-white-100)] mb-6 leading-tight">
                NO DRY STARTS®
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
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/patents">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Download Patent Filing
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Request Prototype Quote
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative flex items-center justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[var(--color-tiger-orange-500)] max-w-md lg:max-w-lg">
                <img 
                  src="/images/engine-hero.png" 
                  alt="Engine - The worst thing you can do to your engine is to start it. We fix that." 
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-graphite-900)]">
        <div className="max-w-7xl mx-auto">
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
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-tiger-orange-800)] to-[var(--color-tiger-orange-950)]">
        <div className="max-w-4xl mx-auto text-center">
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
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
