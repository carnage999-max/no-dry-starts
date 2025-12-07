'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Download } from 'lucide-react';
import apiClient, { Lead } from '@/lib/api-client';

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
      router.push('/');
      return;
    }

    fetchLeads();
  }, [router]);

  const fetchLeads = async () => {
    try {
      const data = await apiClient.getLeads();
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = filter === 'all' 
    ? leads 
    : leads.filter(lead => lead.inquiry_type === filter);

  const handleExportCSV = async () => {
    try {
      const blob = await apiClient.exportLeadsCSV();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Failed to export CSV. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="bg-[var(--color-graphite-900)] border-b border-[var(--color-graphite-700)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="text-2xl font-bold text-[var(--color-tiger-orange-500)]">
              NO DRY STARTS® Admin
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="text-[var(--color-white-300)] hover:text-[var(--color-white-100)]">
                Dashboard
              </Link>
              <button
                onClick={() => {
                  apiClient.clearToken();
                  router.push('/');
                }}
                className="text-[var(--color-white-300)] hover:text-[var(--color-white-100)]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-white-100)] mb-4">Leads Management</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
            >
              <Download size={18} />
              Export CSV
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full sm:w-auto px-4 py-2 bg-[var(--color-graphite-800)] text-[var(--color-white-200)] rounded-lg hover:bg-[var(--color-graphite-700)] text-sm sm:text-base"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
        
        <div className="flex flex-col xs:flex-row justify-end mb-6 gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 xs:flex-none px-2 xs:px-4 py-2 rounded text-xs xs:text-base ${filter === 'all' ? 'bg-[var(--color-tiger-orange-500)] text-white' : 'bg-[var(--color-graphite-800)] text-[var(--color-white-300)]'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('contact')}
              className={`flex-1 xs:flex-none px-2 xs:px-4 py-2 rounded text-xs xs:text-base ${filter === 'contact' ? 'bg-[var(--color-tiger-orange-500)] text-white' : 'bg-[var(--color-graphite-800)] text-[var(--color-white-300)]'}`}
            >
              Contact
            </button>
            <button
              onClick={() => setFilter('investor')}
              className={`flex-1 xs:flex-none px-2 xs:px-4 py-2 rounded text-xs xs:text-base ${filter === 'investor' ? 'bg-[var(--color-tiger-orange-500)] text-white' : 'bg-[var(--color-graphite-800)] text-[var(--color-white-300)]'}`}
            >
              Investor
            </button>
            <button
              onClick={() => setFilter('manufacturer')}
              className={`px-4 py-2 rounded ${filter === 'manufacturer' ? 'bg-[var(--color-tiger-orange-500)] text-white' : 'bg-[var(--color-graphite-800)] text-[var(--color-white-300)]'}`}
            >
              Manufacturer
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-[var(--color-white-300)]">Loading leads...</div>
        ) : (
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--color-graphite-800)]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-white-300)] uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-white-300)] uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-white-300)] uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-white-300)] uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-white-300)] uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-white-300)] uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-[var(--color-graphite-900)]">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-white-200)]">
                          {lead.full_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-white-200)]">
                          <a href={`mailto:${lead.email}`} className="text-[var(--color-tiger-orange-400)] hover:underline">
                            {lead.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-white-200)]">
                          {lead.phone || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            lead.inquiry_type === 'investor' ? 'bg-green-900 text-green-200' :
                            lead.inquiry_type === 'manufacturer' ? 'bg-blue-900 text-blue-200' :
                            'bg-[var(--color-graphite-700)] text-[var(--color-white-300)]'
                          }`}>
                            {lead.inquiry_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[var(--color-white-300)] max-w-xs truncate">
                          {lead.message}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-white-300)]">
                          {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : 'N/A'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-[var(--color-white-400)]">
                        No leads found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-[var(--color-white-400)]">
            Total leads: {filteredLeads.length}
          </p>
        </div>
      </main>
    </div>
  );
}
