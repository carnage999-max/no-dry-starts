import Link from 'next/link';
import { Button } from '@/components/Button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CheckCircle, Wrench, Zap, Shield, Car, Truck, Gauge, Anchor, XCircle } from 'lucide-react';

export default function TheSolutionPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-graphite-950)] to-[var(--color-graphite-900)]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-white-100)] mb-6">
            The Solution
          </h1>
          <p className="text-2xl text-[var(--color-tiger-orange-400)] font-semibold mb-4">
            NO DRY STARTS®️ Electric Engine Pre-Primer System
          </p>
          <p className="text-xl text-[var(--color-white-300)] max-w-4xl mx-auto">
            The first consumer-friendly system to eliminate cold-start wear by building full oil pressure before ignition
          </p>
        </div>
      </section>

      {/* Core Innovation */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-[var(--color-white-100)] mb-6">
                Root Cause Solution
              </h2>
              <p className="text-lg text-[var(--color-white-300)] mb-6">
                No Dry Starts® doesn't mask the problem—it eliminates it entirely. By building full hydrodynamic oil pressure <strong>before</strong> the starter engages, we remove the single biggest source of engine wear.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--color-tiger-orange-500)] w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-[var(--color-white-200)]">Zero metal-to-metal contact</strong>
                    <p className="text-[var(--color-white-400)]">All bearing surfaces are fully lubricated before rotation begins</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--color-tiger-orange-500)] w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-[var(--color-white-200)]">Hydrodynamic film established</strong>
                    <p className="text-[var(--color-white-400)]">Crankshaft journals lifted on oil before first revolution</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-[var(--color-tiger-orange-500)] w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-[var(--color-white-200)]">Turbos protected from dry spin</strong>
                    <p className="text-[var(--color-white-400)]">Turbocharger bearings receive oil before spool-up</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <img 
                src="/images/engine-eliminate.jpeg" 
                alt="NO DRY STARTS system eliminating cold-start wear" 
                className="w-full rounded-lg border-2 border-[var(--color-tiger-orange-500)] shadow-xl mb-6"
              />
              <div className="bg-gradient-to-br from-[var(--color-tiger-orange-900)] to-[var(--color-tiger-orange-950)] p-8 rounded-lg border-2 border-[var(--color-tiger-orange-500)]">
              <h3 className="text-3xl font-bold text-white mb-6">Expected Life Extension</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[var(--color-tiger-orange-100)]">Main Bearings</span>
                    <span className="text-3xl font-bold text-white">2-3×</span>
                  </div>
                  <div className="bg-[var(--color-tiger-orange-700)] h-2 rounded-full overflow-hidden">
                    <div className="bg-white h-full w-3/4"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[var(--color-tiger-orange-100)]">Rod Bearings</span>
                    <span className="text-3xl font-bold text-white">2×</span>
                  </div>
                  <div className="bg-[var(--color-tiger-orange-700)] h-2 rounded-full overflow-hidden">
                    <div className="bg-white h-full w-2/3"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[var(--color-tiger-orange-100)]">Turbochargers</span>
                    <span className="text-3xl font-bold text-white">2-4×</span>
                  </div>
                  <div className="bg-[var(--color-tiger-orange-700)] h-2 rounded-full overflow-hidden">
                    <div className="bg-white h-full w-5/6"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[var(--color-tiger-orange-100)]">Cam/Lifters</span>
                    <span className="text-3xl font-bold text-white">1.5-2×</span>
                  </div>
                  <div className="bg-[var(--color-tiger-orange-700)] h-2 rounded-full overflow-hidden">
                    <div className="bg-white h-full w-1/2"></div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-graphite-900)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[var(--color-white-100)] mb-12 text-center">
            Why No Dry Starts® Is Different
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[var(--color-graphite-800)] p-8 rounded-lg border border-[var(--color-graphite-700)]">
              <Wrench className="w-12 h-12 text-[var(--color-tiger-orange-400)] mb-4" />
              <h3 className="text-2xl font-bold text-[var(--color-tiger-orange-400)] mb-4">Self-Contained Design</h3>
              <p className="text-[var(--color-white-300)] mb-4">
                Fully integrated sandwich-mount assembly installs like an oil filter adapter. No external hoses, tanks, or failure-prone plumbing.
              </p>
              <ul className="space-y-2 text-sm text-[var(--color-white-400)]">
                <li>• Single-piece construction</li>
                <li>• Factory-sealed unit</li>
                <li>• No maintenance required</li>
              </ul>
            </div>

            <div className="bg-[var(--color-graphite-800)] p-8 rounded-lg border border-[var(--color-graphite-700)]">
              <Zap className="w-12 h-12 text-[var(--color-tiger-orange-400)] mb-4" />
              <h3 className="text-2xl font-bold text-[var(--color-tiger-orange-400)] mb-4">Electric Pump Technology</h3>
              <p className="text-[var(--color-white-300)] mb-4">
                High-flow electric pump delivers immediate oil pressure—not dependent on engine rotation like mechanical pumps.
              </p>
              <ul className="space-y-2 text-sm text-[var(--color-white-400)]">
                <li>• Instant activation</li>
                <li>• Pressure before crank</li>
                <li>• Precise control</li>
              </ul>
            </div>

            <div className="bg-[var(--color-graphite-800)] p-8 rounded-lg border border-[var(--color-graphite-700)]">
              <Shield className="w-12 h-12 text-[var(--color-tiger-orange-400)] mb-4" />
              <h3 className="text-2xl font-bold text-[var(--color-tiger-orange-400)] mb-4">Intelligent Controller</h3>
              <p className="text-[var(--color-white-300)] mb-4">
                Integrated pressure sensor and lockout controller ensure safe oil pressure is achieved before allowing ignition.
              </p>
              <ul className="space-y-2 text-sm text-[var(--color-white-400)]">
                <li>• Real-time monitoring</li>
                <li>• Fail-safe operation</li>
                <li>• OEM integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Universal Compatibility */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[var(--color-white-100)] mb-12 text-center">
            Universal Application
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[var(--color-graphite-900)] p-6 rounded-lg border border-[var(--color-graphite-800)] text-center">
              <Car className="w-10 h-10 text-[var(--color-tiger-orange-400)] mb-3 mx-auto" />
              <h3 className="text-lg font-semibold text-[var(--color-white-200)] mb-2">Passenger Cars</h3>
              <p className="text-sm text-[var(--color-white-400)]">Gas, diesel, hybrid powertrains</p>
            </div>
            <div className="bg-[var(--color-graphite-900)] p-6 rounded-lg border border-[var(--color-graphite-800)] text-center">
              <Truck className="w-10 h-10 text-[var(--color-tiger-orange-400)] mb-3 mx-auto" />
              <h3 className="text-lg font-semibold text-[var(--color-white-200)] mb-2">Trucks & Fleets</h3>
              <p className="text-sm text-[var(--color-white-400)]">Commercial, delivery, municipal</p>
            </div>
            <div className="bg-[var(--color-graphite-900)] p-6 rounded-lg border border-[var(--color-graphite-800)] text-center">
              <Gauge className="w-10 h-10 text-[var(--color-tiger-orange-400)] mb-3 mx-auto" />
              <h3 className="text-lg font-semibold text-[var(--color-white-200)] mb-2">Performance</h3>
              <p className="text-sm text-[var(--color-white-400)]">Turbocharged, high-output engines</p>
            </div>
            <div className="bg-[var(--color-graphite-900)] p-6 rounded-lg border border-[var(--color-graphite-800)] text-center">
              <Anchor className="w-10 h-10 text-[var(--color-tiger-orange-400)] mb-3 mx-auto" />
              <h3 className="text-lg font-semibold text-[var(--color-white-200)] mb-2">Marine & Industrial</h3>
              <p className="text-sm text-[var(--color-white-400)]">Stationary and mobile equipment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Basis */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-graphite-900)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[var(--color-white-100)] mb-8 text-center">
            Proven Tribology Science
          </h2>
          <div className="bg-[var(--color-graphite-800)] p-8 rounded-lg border border-[var(--color-graphite-700)]">
            <p className="text-lg text-[var(--color-white-300)] mb-6">
              Hydrodynamic lubrication theory has been understood for over a century. Modern engines rely on a thin oil film to separate bearing surfaces—but this film only exists when oil pressure is present.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-semibold text-[var(--color-tiger-orange-400)] mb-3">Without Pre-Priming</h4>
                <ul className="space-y-2 text-[var(--color-white-400)]">
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" /> Zero hydrodynamic film</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" /> Metal-to-metal contact</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" /> Bearing overlay sheds particles</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" /> Clearances increase over time</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[var(--color-tiger-orange-400)] mb-3">With No Dry Starts®</h4>
                <ul className="space-y-2 text-[var(--color-white-400)]">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[var(--color-tiger-orange-400)] mt-1 flex-shrink-0" /> Full oil film before rotation</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[var(--color-tiger-orange-400)] mt-1 flex-shrink-0" /> No metal contact at startup</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[var(--color-tiger-orange-400)] mt-1 flex-shrink-0" /> Bearing surfaces protected</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[var(--color-tiger-orange-400)] mt-1 flex-shrink-0" /> Clearances maintained</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-tiger-orange-800)] to-[var(--color-tiger-orange-950)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Stop Destroying Your Engine Every Time You Start It
          </h2>
          <p className="text-xl text-[var(--color-tiger-orange-100)] mb-8">
            Request a prototype quote or explore investment opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Request Quote
              </Button>
            </Link>
            <Link href="/investors">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[var(--color-tiger-orange-900)]">
                Investor Info
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
