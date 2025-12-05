import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AlertCircle, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Problem - NO DRY STARTS®',
  description: 'Cold-start engine wear costs billions annually. Engines lose 40% of their lifespan before oil pressure builds.',
  openGraph: {
    type: 'website',
    url: 'https://nodrystarts.com/the-problem',
    title: 'The Problem - NO DRY STARTS®',
    description: 'Understanding cold-start engine wear and its devastating impact on engine longevity.',
    images: [
      {
        url: '/images/nodrystarts.jpeg',
        width: 1200,
        height: 630,
        alt: 'The Cold-Start Engine Problem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Problem - NO DRY STARTS®',
    description: 'Cold-start wear causes 40% engine damage before oil pressure builds.',
    images: ['/images/nodrystarts.jpeg'],
  },
};

export default function TheProblemPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-graphite-950)] to-[var(--color-graphite-900)]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-white-100)] mb-6">
            The Problem
          </h1>
          <p className="text-2xl text-[var(--color-tiger-orange-400)] font-semibold mb-4">
            Cold Start Wear Is The #1 Source of Engine Damage
          </p>
          <p className="text-xl text-[var(--color-white-300)] max-w-4xl mx-auto">
            Every engine ever built suffers from the same fatal flaw:<br/>
            It starts <span className="text-[var(--color-tiger-orange-400)] font-bold">without oil pressure</span>
          </p>
        </div>
      </section>

      {/* Main Statistics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-gradient-to-br from-red-900 to-red-950 p-8 rounded-lg border-2 border-red-600 text-center">
              <div className="text-7xl font-bold text-red-400 mb-4">80%</div>
              <h3 className="text-2xl font-semibold text-white mb-3">Of All Engine Wear</h3>
              <p className="text-red-100">
                Occurs during cold starts when there is zero hydrodynamic oil film protection
              </p>
            </div>

            <div className="bg-gradient-to-br from-[var(--color-tiger-orange-900)] to-[var(--color-tiger-orange-950)] p-8 rounded-lg border-2 border-[var(--color-tiger-orange-600)] text-center">
              <div className="text-7xl font-bold text-[var(--color-tiger-orange-400)] mb-4">1-3s</div>
              <h3 className="text-2xl font-semibold text-white mb-3">Critical Window</h3>
              <p className="text-[var(--color-tiger-orange-100)]">
                Metal-to-metal contact happens in the first 1-3 seconds before oil pressure builds
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-900 to-red-950 p-8 rounded-lg border-2 border-red-600 text-center">
              <div className="text-7xl font-bold text-red-400 mb-4">0 PSI</div>
              <h3 className="text-2xl font-semibold text-white mb-3">Oil Pressure At Start</h3>
              <p className="text-red-100">
                The crankshaft rests directly on bearings with zero hydrodynamic lift
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-[var(--color-white-100)] mb-12 text-center">
            What Happens During A Cold Start
          </h2>

          {/* Journal Bearing Image */}
          <div className="mb-12 max-w-3xl mx-auto">
            <img 
              src="/images/journal-bearing.jpeg" 
              alt="Journal bearing showing metal-to-metal contact and wear during cold starts" 
              className="w-full rounded-lg border-2 border-[var(--color-tiger-orange-500)] shadow-xl"
            />
            <p className="text-center text-[var(--color-white-400)] mt-4 text-sm">
              Journal bearing surface showing damage from repeated cold-start wear
            </p>
          </div>

          <div className="space-y-12">
            <div className="bg-[var(--color-graphite-900)] p-8 rounded-lg border border-[var(--color-graphite-800)]">
              <h3 className="text-2xl font-bold text-[var(--color-tiger-orange-400)] mb-4">1. Engine Is At Rest</h3>
              <p className="text-[var(--color-white-300)] text-lg mb-4">
                When an engine sits idle, oil drains back to the pan. The crankshaft, camshaft, and connecting rods settle onto their bearing surfaces with no separation.
              </p>
              <ul className="space-y-2 text-[var(--color-white-400)]">
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>No hydrodynamic oil film exists</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Journal surfaces in direct contact with bearing overlay</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Oil pressure gauge reads zero</span>
                </li>
              </ul>
            </div>

            <div className="bg-[var(--color-graphite-900)] p-8 rounded-lg border border-[var(--color-graphite-800)]">
              <h3 className="text-2xl font-bold text-[var(--color-tiger-orange-400)] mb-4">2. Starter Motor Engages</h3>
              <p className="text-[var(--color-white-300)] text-lg mb-4">
                The starter begins rotating the crankshaft. But there's still no oil pressure—the mechanical pump can't build pressure until the engine is already spinning.
              </p>
              <ul className="space-y-2 text-[var(--color-white-400)]">
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Crankshaft journals grind against bearing surfaces</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Cam lobes scrape lifters and followers</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Connecting rod bearings experience metal-to-metal contact</span>
                </li>
              </ul>
            </div>

            <div className="bg-[var(--color-graphite-900)] p-8 rounded-lg border border-[var(--color-graphite-800)]">
              <h3 className="text-2xl font-bold text-[var(--color-tiger-orange-400)] mb-4">3. Oil Pressure Builds Slowly</h3>
              <p className="text-[var(--color-white-300)] text-lg mb-4">
                After 1-3 seconds of unprotected rotation, oil finally reaches critical bearing surfaces. But the damage is already happening.
              </p>
              <ul className="space-y-2 text-[var(--color-white-400)]">
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Bearing overlay material sheds microscopic particles</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Clearances increase over thousands of starts</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Metal contamination enters the oil</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-900 to-red-950 p-8 rounded-lg border-2 border-red-600">
              <h3 className="text-2xl font-bold text-white mb-4">4. Cumulative Damage</h3>
              <p className="text-red-100 text-lg mb-4">
                This process repeats <strong>every single time</strong> the engine starts. Over tens of thousands of cold starts:
              </p>
              <ul className="space-y-2 text-red-100">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Bearing clearances increase beyond specification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Oil pressure drops at idle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Timing chains stretch</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Cam lobes flatten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Turbos develop shaft play</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Engine life is dramatically shortened</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What Gets Damaged */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-graphite-900)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[var(--color-white-100)] mb-12 text-center">
            What Cold Starts Destroy
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[var(--color-graphite-800)] p-6 rounded-lg border border-[var(--color-graphite-700)]">
              <h3 className="text-xl font-bold text-[var(--color-tiger-orange-400)] mb-3">Main Bearings</h3>
              <p className="text-[var(--color-white-400)]">
                The crankshaft journals grind the soft bearing overlay layer, creating metal particles and increasing clearance.
              </p>
            </div>

            <div className="bg-[var(--color-graphite-800)] p-6 rounded-lg border border-[var(--color-graphite-700)]">
              <h3 className="text-xl font-bold text-[var(--color-tiger-orange-400)] mb-3">Rod Bearings</h3>
              <p className="text-[var(--color-white-400)]">
                Connecting rod journals experience the highest loads during combustion—without oil film, micro-scuffing is inevitable.
              </p>
            </div>

            <div className="bg-[var(--color-graphite-800)] p-6 rounded-lg border border-[var(--color-graphite-700)]">
              <h3 className="text-xl font-bold text-[var(--color-tiger-orange-400)] mb-3">Cam Lobes & Lifters</h3>
              <p className="text-[var(--color-white-400)]">
                Overhead cam engines are especially vulnerable. High spring pressure + no oil = accelerated lobe wear.
              </p>
            </div>

            <div className="bg-[var(--color-graphite-800)] p-6 rounded-lg border border-[var(--color-graphite-700)]">
              <h3 className="text-xl font-bold text-[var(--color-tiger-orange-400)] mb-3">Turbochargers</h3>
              <p className="text-[var(--color-white-400)]">
                Turbo bearings rely on hydrodynamic lift. Dry startup is the #1 cause of turbo failure—bearings scuff and develop shaft play.
              </p>
            </div>

            <div className="bg-[var(--color-graphite-800)] p-6 rounded-lg border border-[var(--color-graphite-700)]">
              <h3 className="text-xl font-bold text-[var(--color-tiger-orange-400)] mb-3">Timing Chains</h3>
              <p className="text-[var(--color-white-400)]">
                Dry startup delays proper lubrication to chain guides and tensioners, accelerating stretch and wear.
              </p>
            </div>

            <div className="bg-[var(--color-graphite-800)] p-6 rounded-lg border border-[var(--color-graphite-700)]">
              <h3 className="text-xl font-bold text-[var(--color-tiger-orange-400)] mb-3">Piston Rings</h3>
              <p className="text-[var(--color-white-400)]">
                Without cylinder wall lubrication, rings scrape dry metal, leading to blow-by and oil consumption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cold Weather Impact */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[var(--color-white-100)] mb-8 text-center">
            Cold Weather Makes It Worse
          </h2>
          <div className="bg-[var(--color-graphite-900)] p-8 rounded-lg border border-[var(--color-graphite-800)]">
            <p className="text-[var(--color-white-300)] text-lg mb-6">
              At low temperatures, oil viscosity increases dramatically. Thick, cold oil takes even longer to reach critical bearing surfaces.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-tiger-orange-400)] mb-3">0°F (-18°C)</h3>
                <p className="text-[var(--color-white-400)]">
                  Oil is 10x more viscous. It can take 5-10 seconds for proper oil pressure to stabilize.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-tiger-orange-400)] mb-3">-20°F (-29°C)</h3>
                <p className="text-[var(--color-white-400)]">
                  Extreme cold makes oil flow like honey. Wear rate can be 20x higher than a warm start.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Industry's Acceptance */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-graphite-900)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[var(--color-white-100)] mb-8">
            The Industry Has Accepted This Failure
          </h2>
          <p className="text-xl text-[var(--color-white-300)] mb-8">
            For over a century, automakers have known about cold-start wear. But no consumer-friendly solution has ever existed—until now.
          </p>
          <div className="bg-[var(--color-graphite-800)] p-8 rounded-lg border border-[var(--color-graphite-700)]">
            <h3 className="text-2xl font-semibold text-[var(--color-tiger-orange-400)] mb-4">
              Every Vehicle Ever Built Suffers From This
            </h3>
            <ul className="space-y-3 text-[var(--color-white-400)] text-left max-w-2xl mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-tiger-orange-500)]">•</span>
                <span>Fleet vehicles with frequent starts experience shortened engine life</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-tiger-orange-500)]">•</span>
                <span>Municipal trucks, delivery vehicles, taxis—all suffer accelerated wear</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-tiger-orange-500)]">•</span>
                <span>Performance engines with tight clearances fail even faster</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-tiger-orange-500)]">•</span>
                <span>Cold-climate operation dramatically reduces engine longevity</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--color-tiger-orange-800)] to-[var(--color-tiger-orange-950)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            There Is A Solution
          </h2>
          <p className="text-xl text-[var(--color-tiger-orange-100)] mb-8">
            No Dry Starts® eliminates cold-start wear by building full oil pressure before the engine ever cranks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/the-solution">
              <Button variant="secondary" size="lg">
                See The Solution
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[var(--color-tiger-orange-900)]">
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
