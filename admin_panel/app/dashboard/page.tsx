'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Users, ClipboardList, Building, FileText } from 'lucide-react';
import apiClient from '@/lib/api-client';

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    leads: 0,
    rfqs: 0,
    manufacturers: 0,
    documents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/');
        return;
      }
    }

    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const [leads, rfqs, manufacturers, documents] = await Promise.all([
          apiClient.getLeads(),
          apiClient.getRFQSubmissions(),
          apiClient.getManufacturers(),
          apiClient.getDocuments(),
        ]);

        setStats({
          leads: leads.length,
          rfqs: rfqs.length,
          manufacturers: manufacturers.length,
          documents: documents.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [router]);

  const handleLogout = () => {
    apiClient.clearToken();
    router.push('/');
  };



  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="bg-[var(--color-graphite-900)] border-b border-[var(--color-graphite-700)]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            <div className="flex items-center min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-[var(--color-tiger-orange-500)] truncate">
                NO DRY STARTS® Admin
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-6">
              <Link href="/dashboard" className="text-xs sm:text-base text-[var(--color-white-300)] hover:text-[var(--color-white-100)] whitespace-nowrap">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs sm:text-base text-[var(--color-white-300)] hover:text-[var(--color-white-100)] whitespace-nowrap"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-white-100)] mb-4 sm:mb-8">Dashboard</h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--color-white-400)] text-sm font-medium">Total Leads</p>
                <p className="text-3xl font-bold text-[var(--color-white-100)] mt-2">
                  {loading ? '...' : stats.leads}
                </p>
              </div>
              <div className="bg-[var(--color-tiger-orange-500)] bg-opacity-20 p-3 rounded-lg">
                <Users className="w-8 h-8 text-[var(--color-tiger-orange-500)]" />
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--color-white-400)] text-sm font-medium">RFQ Submissions</p>
                <p className="text-3xl font-bold text-[var(--color-white-100)] mt-2">
                  {loading ? '...' : stats.rfqs}
                </p>
              </div>
              <div className="bg-[var(--color-white-500)] bg-opacity-20 p-3 rounded-lg">
                <ClipboardList className="w-8 h-8 text-[var(--color-white-500)]" />
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--color-white-400)] text-sm font-medium">Manufacturers</p>
                <p className="text-3xl font-bold text-[var(--color-white-100)] mt-2">
                  {loading ? '...' : stats.manufacturers}
                </p>
              </div>
              <div className="bg-[var(--color-tiger-orange-500)] bg-opacity-20 p-3 rounded-lg">
                <Building className="w-8 h-8 text-[var(--color-tiger-orange-500)]" />
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--color-white-400)] text-sm font-medium">Documents</p>
                <p className="text-3xl font-bold text-[var(--color-white-100)] mt-2">
                  {loading ? '...' : stats.documents}
                </p>
              </div>
              <div className="bg-[var(--color-white-500)] bg-opacity-20 p-3 rounded-lg">
                <FileText className="w-8 h-8 text-[var(--color-white-500)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/dashboard/leads"
            className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6 hover:border-[var(--color-tiger-orange-500)] transition-colors"
          >
            <h3 className="text-xl font-semibold text-[var(--color-white-100)] mb-2">Manage Leads</h3>
            <p className="text-[var(--color-white-400)] text-sm">View and manage contact inquiries</p>
          </Link>

          <Link
            href="/dashboard/rfqs"
            className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6 hover:border-[var(--color-tiger-orange-500)] transition-colors"
          >
            <h3 className="text-xl font-semibold text-[var(--color-white-100)] mb-2">RFQ Submissions</h3>
            <p className="text-[var(--color-white-400)] text-sm">Review quote requests and attachments</p>
          </Link>

          <Link
            href="/dashboard/manufacturers"
            className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6 hover:border-[var(--color-tiger-orange-500)] transition-colors"
          >
            <h3 className="text-xl font-semibold text-[var(--color-white-100)] mb-2">Manufacturers</h3>
            <p className="text-[var(--color-white-400)] text-sm">Manage prototype partners directory</p>
          </Link>

          <Link
            href="/dashboard/documents"
            className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6 hover:border-[var(--color-tiger-orange-500)] transition-colors"
          >
            <h3 className="text-xl font-semibold text-[var(--color-white-100)] mb-2">Documents</h3>
            <p className="text-[var(--color-white-400)] text-sm">Upload and manage patents, diagrams, docs</p>
          </Link>

          <Link
            href="/dashboard/content"
            className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6 hover:border-[var(--color-tiger-orange-500)] transition-colors"
          >
            <h3 className="text-xl font-semibold text-[var(--color-white-100)] mb-2">Content Blocks</h3>
            <p className="text-[var(--color-white-400)] text-sm">Edit website content sections</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
