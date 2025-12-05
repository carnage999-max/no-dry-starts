import Link from 'next/link';
import { Button } from '@/components/Button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CheckCircle } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-graphite-950)] to-[var(--color-graphite-900)]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-white-100)] mb-6">
            How It Works
          </h1>
          <p className="text-xl text-[var(--color-white-300)] max-w-3xl mx-auto">
            The No Dry Starts® system solves cold-start wear by building full oil pressure <br/>
            <span className="text-[var(--color-tiger-orange-400)] font-semibold">before the engine ever cranks</span>
          </p>
        </div>
      </section>

      {/* Technical Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[var(--color-white-100)] mb-12 text-center">
            The Complete Start Sequence
          </h2>

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="bg-[var(--color-graphite-900)] p-8 rounded-lg border border-[var(--color-graphite-800)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[var(--color-tiger-orange-500)] text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl">1</div>
                <h3 className="text-3xl font-bold text-[var(--color-white-100)]">Key Turn Detection</h3>
              </div>
              <p className="text-[var(--color-white-300)] text-lg leading-relaxed mb-4">
                When the driver turns the ignition key or presses the START button, our intelligent controller immediately detects the signal.
              </p>
              <ul className="space-y-2 text-[var(--color-white-400)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Instant electronic detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>No delay in driver experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Compatible with push-button and key ignition</span>
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-[var(--color-graphite-900)] p-8 rounded-lg border border-[var(--color-graphite-800)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[var(--color-tiger-orange-500)] text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl">2</div>
                <h3 className="text-3xl font-bold text-[var(--color-white-100)]">Electric Pump Activation</h3>
              </div>
              <p className="text-[var(--color-white-300)] text-lg leading-relaxed mb-4">
                Our integrated electric oil pump fires instantly, drawing oil from the pan and forcing it through the engine galleries.
              </p>
              <ul className="space-y-2 text-[var(--color-white-400)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>High-flow electric pump (not mechanical)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Fully self-contained sandwich-mount design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>No external hoses or reservoirs</span>
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-[var(--color-graphite-900)] p-8 rounded-lg border border-[var(--color-graphite-800)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[var(--color-tiger-orange-500)] text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl">3</div>
                <h3 className="text-3xl font-bold text-[var(--color-white-100)]">Oil Galleries Fill</h3>
              </div>
              <p className="text-[var(--color-white-300)] text-lg leading-relaxed mb-4">
                The pump floods all critical bearing surfaces: mains, rods, cam journals, turbo bearings, and valve train components.
              </p>
              <ul className="space-y-2 text-[var(--color-white-400)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Crankshaft journals lifted on oil film</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Camshaft bearings fully lubricated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Turbocharger bearings protected from dry spin</span>
                </li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="bg-[var(--color-graphite-900)] p-8 rounded-lg border border-[var(--color-graphite-800)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[var(--color-tiger-orange-500)] text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl">4</div>
                <h3 className="text-3xl font-bold text-[var(--color-white-100)]">Pressure Verification</h3>
              </div>
              <p className="text-[var(--color-white-300)] text-lg leading-relaxed mb-4">
                Our integrated pressure sensor monitors oil pressure in real-time, ensuring safe levels are achieved before allowing ignition.
              </p>
              <ul className="space-y-2 text-[var(--color-white-400)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Real-time pressure monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Lockout controller prevents premature start</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Typically 1-2 seconds to achieve target pressure</span>
                </li>
              </ul>
            </div>

            {/* Step 5 */}
            <div className="bg-gradient-to-br from-[var(--color-tiger-orange-900)] to-[var(--color-tiger-orange-950)] p-8 rounded-lg border-2 border-[var(--color-tiger-orange-500)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[var(--color-white-500)] text-[var(--color-graphite-950)] w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl">5</div>
                <h3 className="text-3xl font-bold text-white">Protected Start</h3>
              </div>
              <p className="text-[var(--color-tiger-orange-100)] text-lg leading-relaxed mb-4">
                Only after full pressure is confirmed does the system release the starter motor. The engine cranks with zero metal-to-metal contact.
              </p>
              <ul className="space-y-2 text-[var(--color-tiger-orange-100)]">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-[var(--color-white-500)] w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Zero dry-start wear</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-[var(--color-white-500)] w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Hydrodynamic film established before rotation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-[var(--color-white-500)] w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Engine starts as if already warmed up</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* System Components */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-graphite-900)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[var(--color-white-100)] mb-12 text-center">
            System Components
          </h2>
          
          {/* Oil Filter Image */}
          <div className="mb-12 max-w-2xl mx-auto">
            <img 
              src="/images/oil-filter.png" 
              alt="NO DRY STARTS sandwich-mount assembly - installs like an oil filter adapter" 
              className="w-full rounded-lg border-2 border-[var(--color-tiger-orange-500)] shadow-xl"
            />
            <p className="text-center text-[var(--color-white-400)] mt-4 text-sm">
              Self-contained sandwich-mount design - installs between oil filter and engine block
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[var(--color-graphite-800)] p-6 rounded-lg border border-[var(--color-graphite-700)]">
              <h3 className="text-2xl font-bold text-[var(--color-tiger-orange-400)] mb-4">Electric Pump Module</h3>
              <ul className="space-y-3 text-[var(--color-white-300)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>High-flow electric oil pump</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Sandwich-mount design (installs like oil filter adapter)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>No external plumbing required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Self-contained, sealed unit</span>
                </li>
              </ul>
            </div>

            <div className="bg-[var(--color-graphite-800)] p-6 rounded-lg border border-[var(--color-graphite-700)]">
              <h3 className="text-2xl font-bold text-[var(--color-tiger-orange-400)] mb-4">Pressure Sensor</h3>
              <ul className="space-y-3 text-[var(--color-white-300)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Integrated pressure monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Real-time feedback to controller</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Prevents premature start</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Fail-safe design</span>
                </li>
              </ul>
            </div>

            <div className="bg-[var(--color-graphite-800)] p-6 rounded-lg border border-[var(--color-graphite-700)]">
              <h3 className="text-2xl font-bold text-[var(--color-tiger-orange-400)] mb-4">Ignition Controller</h3>
              <ul className="space-y-3 text-[var(--color-white-300)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Intelligent lockout system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Integrates with OEM ignition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Releases starter only after pressure OK</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-tiger-orange-500)]">•</span>
                  <span>Universal compatibility</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[var(--color-white-100)] mb-8 text-center">
            Simple Installation
          </h2>
          <div className="bg-[var(--color-graphite-900)] p-8 rounded-lg border border-[var(--color-graphite-800)]">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-tiger-orange-400)] mb-3">Mounting</h3>
                <p className="text-[var(--color-white-300)]">
                  Installs between engine block and oil filter using a sandwich adapter—just like an oil cooler or remote filter kit. No custom fabrication required.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-tiger-orange-400)] mb-3">Wiring</h3>
                <p className="text-[var(--color-white-300)]">
                  Simple 3-wire connection: Power, Ground, and Ignition Signal. Integrates with existing starter circuit.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-tiger-orange-400)] mb-3">Compatibility</h3>
                <p className="text-[var(--color-white-300)]">
                  Universal design fits gasoline, diesel, turbocharged, naturally aspirated, and performance engines. Cars, trucks, fleets, and marine applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-tiger-orange-800)] to-[var(--color-tiger-orange-950)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Protect Your Engine?
          </h2>
          <p className="text-xl text-[var(--color-tiger-orange-100)] mb-8">
            Request a prototype quote or download our technical documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Request Quote
              </Button>
            </Link>
            <Link href="/patents">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[var(--color-tiger-orange-900)]">
                View Patents
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
