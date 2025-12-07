'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Download } from 'lucide-react';
import apiClient, { RFQSubmission } from '@/lib/api-client';

export default function RFQsPage() {
  const [rfqs, setRfqs] = useState<RFQSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRfq, setSelectedRfq] = useState<RFQSubmission | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    fetchRfqs();
  }, [router]);

  const fetchRfqs = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getRFQSubmissions();
      setRfqs(data);
    } catch (error) {
      console.error('Error fetching RFQs:', error);
      if ((error as any)?.message?.includes('401')) {
        router.push('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (rfq: RFQSubmission) => {
    setSelectedRfq(rfq);
  };

  const handleCloseDetails = () => {
    setSelectedRfq(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleExportCSV = async () => {
    try {
      const blob = await apiClient.exportRFQsCSV();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rfq_submissions_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Failed to export CSV. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-[var(--color-white-200)]">Loading RFQs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-[var(--color-white-100)] mb-4">RFQ Submissions</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
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

        {rfqs.length === 0 ? (
          <div className="text-center py-12 bg-[var(--color-graphite-900)] rounded-lg border border-[var(--color-graphite-800)]">
            <p className="text-[var(--color-white-300)]">No RFQ submissions yet.</p>
          </div>
        ) : (
          <div className="bg-[var(--color-graphite-900)] rounded-lg border border-[var(--color-graphite-800)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--color-graphite-800)] border-b border-[var(--color-graphite-700)]">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-[var(--color-white-200)]">Company</th>
                    <th className="text-left p-4 text-sm font-semibold text-[var(--color-white-200)]">Contact</th>
                    <th className="text-left p-4 text-sm font-semibold text-[var(--color-white-200)]">Message Preview</th>
                    <th className="text-left p-4 text-sm font-semibold text-[var(--color-white-200)]">Attachment</th>
                    <th className="text-left p-4 text-sm font-semibold text-[var(--color-white-200)]">Submitted</th>
                    <th className="text-left p-4 text-sm font-semibold text-[var(--color-white-200)]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rfqs.map((rfq) => (
                    <tr key={rfq.id} className="border-b border-[var(--color-graphite-800)] hover:bg-[var(--color-graphite-850)]">
                      <td className="p-4">
                        <div className="text-[var(--color-white-200)] font-medium">{rfq.company || 'N/A'}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-[var(--color-white-300)] text-sm">{rfq.full_name}</div>
                        <div className="text-[var(--color-white-400)] text-xs">{rfq.email}</div>
                        {rfq.phone && (
                          <div className="text-[var(--color-white-400)] text-xs">{rfq.phone}</div>
                        )}
                      </td>
                      <td className="p-4 text-[var(--color-white-300)] text-sm truncate max-w-xs">
                        {rfq.message.substring(0, 50)}...
                      </td>
                      <td className="p-4">
                        {rfq.attachment_url ? (
                          <a href={rfq.attachment_url} className="text-[var(--color-tiger-orange-500)] text-sm hover:underline">
                            View
                          </a>
                        ) : (
                          <span className="text-[var(--color-white-500)] text-sm">None</span>
                        )}
                      </td>
                      <td className="p-4 text-[var(--color-white-400)] text-sm">{rfq.created_at && formatDate(rfq.created_at)}</td>
                      <td className="p-2 xs:p-4">
                        <button
                          onClick={() => handleViewDetails(rfq)}
                          className="w-full xs:w-auto px-2 xs:px-3 py-1 bg-[var(--color-tiger-orange-700)] text-white rounded hover:bg-[var(--color-tiger-orange-600)] text-xs xs:text-sm truncate"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedRfq && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--color-graphite-900)] rounded-lg border border-[var(--color-graphite-700)] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--color-graphite-800)] flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[var(--color-white-100)]">RFQ Details</h2>
              <button
                onClick={handleCloseDetails}
                className="text-[var(--color-white-300)] hover:text-[var(--color-white-100)] text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-white-300)] mb-2">Company Information</h3>
                <p className="text-[var(--color-white-100)] text-lg font-medium">{selectedRfq.company || 'N/A'}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[var(--color-white-300)] mb-2">Contact Information</h3>
                <p className="text-[var(--color-white-200)]">{selectedRfq.full_name}</p>
                <p className="text-[var(--color-white-300)] text-sm">{selectedRfq.email}</p>
                {selectedRfq.phone && (
                  <p className="text-[var(--color-white-300)] text-sm">{selectedRfq.phone}</p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[var(--color-white-300)] mb-2">Message</h3>
                <p className="text-[var(--color-white-200)] whitespace-pre-wrap bg-[var(--color-graphite-800)] p-4 rounded-lg">
                  {selectedRfq.message}
                </p>
              </div>

              {selectedRfq.attachment_url && (
                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-white-300)] mb-2">Attachment</h3>
                  <a 
                    href={selectedRfq.attachment_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[var(--color-tiger-orange-500)] hover:underline"
                  >
                    View Attachment
                  </a>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-[var(--color-white-300)] mb-2">Submitted</h3>
                <p className="text-[var(--color-white-200)]">{selectedRfq.created_at && formatDate(selectedRfq.created_at)}</p>
              </div>
            </div>
            <div className="p-6 border-t border-[var(--color-graphite-800)]">
              <button
                onClick={handleCloseDetails}
                className="w-full px-4 py-2 bg-[var(--color-graphite-800)] text-[var(--color-white-200)] rounded-lg hover:bg-[var(--color-graphite-700)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
