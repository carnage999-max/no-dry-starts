'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import apiClient, { Manufacturer } from '@/lib/api-client';

export default function ManufacturersPage() {
  const router = useRouter();
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [detailModal, setDetailModal] = useState<Manufacturer | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    active: true,
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
      router.push('/');
      return;
    }

    fetchManufacturers();
  }, [router]);

  const fetchManufacturers = async () => {
    try {
      const data = await apiClient.getManufacturers();
      console.log('Fetched manufacturers:', data);
      setManufacturers(data);
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
      setManufacturers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiClient.updateManufacturer(editingId, formData);
      } else {
        const result = await apiClient.createManufacturer(formData);
        console.log('Created manufacturer:', result);
      }
      setShowForm(false);
      setEditingId(null);
      resetForm();
      // Small delay to ensure backend flushed the data
      await new Promise(resolve => setTimeout(resolve, 500));
      await fetchManufacturers();
    } catch (error) {
      console.error('Error saving manufacturer:', error);
      alert('Error saving manufacturer');
    }
  };

  const handleEdit = async (mfr: Manufacturer) => {
    try {
      // Fetch full manufacturer details to get address field
      const fullDetails = await apiClient.getManufacturer(mfr.id);
      setFormData({
        name: fullDetails.name,
        description: fullDetails.description,
        address: fullDetails.address || '',
        phone: fullDetails.phone,
        email: fullDetails.email,
        website: fullDetails.website || '',
        active: fullDetails.active !== false,
      });
      setEditingId(mfr.id);
      setShowForm(true);
    } catch (error) {
      console.error('Error fetching manufacturer details:', error);
      alert('Error loading manufacturer details');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this manufacturer?')) {
      try {
        await apiClient.deleteManufacturer(id);
        fetchManufacturers();
      } catch (error) {
        console.error('Error deleting manufacturer:', error);
        alert('Error deleting manufacturer');
      }
    }
  };

  const handleViewDetails = async (mfr: Manufacturer) => {
    try {
      // Fetch full manufacturer details for modal
      const fullDetails = await apiClient.getManufacturer(mfr.id);
      setDetailModal(fullDetails);
    } catch (error) {
      console.error('Error fetching manufacturer details:', error);
      alert('Error loading manufacturer details');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      active: true,
    });
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="bg-[var(--color-graphite-900)] border-b border-[var(--color-graphite-700)]">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            <Link href="/dashboard" className="text-lg sm:text-2xl font-bold text-[var(--color-tiger-orange-500)] truncate">
              NO DRY STARTS® Admin
            </Link>
            <div className="flex items-center gap-2 sm:gap-6">
              <Link href="/dashboard" className="text-xs sm:text-base text-[var(--color-white-300)] hover:text-[var(--color-white-100)] whitespace-nowrap">
                Dashboard
              </Link>
              <button
                onClick={() => {
                  apiClient.clearToken();
                  router.push('/');
                }}
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
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-white-100)] mb-4">Manufacturers</h1>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => {
                resetForm();
                setEditingId(null);
                setShowForm(!showForm);
              }}
              className="w-full sm:w-auto bg-[var(--color-tiger-orange-500)] hover:bg-[var(--color-tiger-orange-600)] text-white px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base"
            >
              {showForm ? 'Cancel' : '+ Add Manufacturer'}
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-[var(--color-graphite-800)] text-[var(--color-white-200)] rounded-lg hover:bg-[var(--color-graphite-700)] text-sm sm:text-base"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-white-100)] mb-4 sm:mb-6">
              {editingId ? 'Edit Manufacturer' : 'Add New Manufacturer'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[var(--color-white-200)] mb-1 sm:mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 bg-[var(--color-graphite-900)] border border-[var(--color-graphite-600)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[var(--color-white-200)] mb-1 sm:mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 bg-[var(--color-graphite-900)] border border-[var(--color-graphite-600)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[var(--color-white-200)] mb-1 sm:mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 bg-[var(--color-graphite-900)] border border-[var(--color-graphite-600)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[var(--color-white-200)] mb-1 sm:mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 bg-[var(--color-graphite-900)] border border-[var(--color-graphite-600)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[var(--color-white-200)] mb-1 sm:mb-2">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 bg-[var(--color-graphite-900)] border border-[var(--color-graphite-600)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] resize-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[var(--color-white-200)] mb-1 sm:mb-2">
                  Address *
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 bg-[var(--color-graphite-900)] border border-[var(--color-graphite-600)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-tiger-orange-500)] resize-none text-sm"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 rounded border-[var(--color-graphite-600)] bg-[var(--color-graphite-900)]"
                />
                <label htmlFor="active" className="text-xs sm:text-sm text-[var(--color-white-200)]">
                  Active (visible to public)
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button
                  type="submit"
                  className="w-full sm:flex-1 bg-[var(--color-tiger-orange-500)] hover:bg-[var(--color-tiger-orange-600)] text-white px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    resetForm();
                  }}
                  className="w-full sm:flex-1 bg-[var(--color-graphite-700)] hover:bg-[var(--color-graphite-600)] text-[var(--color-white-200)] px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className="text-center text-[var(--color-white-300)]">Loading manufacturers...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {manufacturers.length > 0 ? (
              manufacturers.map((mfr) => (
                <div key={mfr.id} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[var(--color-white-100)]">{mfr.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      mfr.active ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                    }`}>
                      {mfr.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-[var(--color-white-400)] mb-4 text-sm">{mfr.description}</p>
                  <div className="space-y-2 text-sm text-[var(--color-white-300)] mb-4">
                    <p><strong>Phone:</strong> {mfr.phone}</p>
                    <p><strong>Email:</strong> {mfr.email}</p>
                    {mfr.website && <p><strong>Website:</strong> <a href={mfr.website} target="_blank" rel="noopener noreferrer" className="text-[var(--color-tiger-orange-400)] hover:underline">Link</a></p>}
                  </div>
                  <div className="flex flex-col xs:flex-row gap-2">
                    <button
                      onClick={() => handleViewDetails(mfr)}
                      className="w-full xs:flex-1 bg-[var(--color-tiger-orange-700)] hover:bg-[var(--color-tiger-orange-600)] text-white px-2 xs:px-4 py-2 rounded text-xs xs:text-sm transition-colors truncate"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(mfr)}
                      className="w-full xs:flex-1 bg-[var(--color-graphite-700)] hover:bg-[var(--color-graphite-600)] text-[var(--color-white-200)] px-2 xs:px-4 py-2 rounded text-xs xs:text-sm transition-colors truncate"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(mfr.id)}
                      className="w-full xs:flex-1 bg-red-900 hover:bg-red-800 text-red-200 px-2 xs:px-4 py-2 rounded text-xs xs:text-sm transition-colors truncate"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-[var(--color-white-400)]">
                No manufacturers found. Click "Add Manufacturer" to create one.
              </div>
            )}
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {detailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[var(--color-graphite-900)] border-b border-[var(--color-graphite-700)] px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center gap-2">
              <h2 className="text-lg sm:text-2xl font-bold text-[var(--color-white-100)] truncate">{detailModal.name}</h2>
              <button
                onClick={() => setDetailModal(null)}
                className="text-[var(--color-white-400)] hover:text-[var(--color-white-100)] text-2xl leading-none flex-shrink-0"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[var(--color-white-300)] mb-1 sm:mb-2">Status</label>
                <span className={`inline-block px-3 py-1 rounded-lg text-xs sm:text-sm font-medium ${
                  detailModal.active ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                }`}>
                  {detailModal.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[var(--color-white-300)] mb-1 sm:mb-2">Description</label>
                <p className="text-xs sm:text-sm text-[var(--color-white-200)] break-words">{detailModal.description}</p>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-[var(--color-white-300)] mb-1 sm:mb-2">Address</label>
                <p className="text-xs sm:text-sm text-[var(--color-white-200)] whitespace-pre-line break-words">{detailModal.address}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[var(--color-white-300)] mb-1 sm:mb-2">Phone</label>
                  <p className="text-xs sm:text-sm text-[var(--color-white-200)] break-words">{detailModal.phone}</p>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[var(--color-white-300)] mb-1 sm:mb-2">Email</label>
                  <p className="text-xs sm:text-sm text-[var(--color-white-200)]">
                    <a href={`mailto:${detailModal.email}`} className="text-[var(--color-tiger-orange-400)] hover:underline break-words">
                      {detailModal.email}
                    </a>
                  </p>
                </div>
              </div>

              {detailModal.website && (
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[var(--color-white-300)] mb-1 sm:mb-2">Website</label>
                  <p className="text-xs sm:text-sm text-[var(--color-white-200)]">
                    <a href={detailModal.website} target="_blank" rel="noopener noreferrer" className="text-[var(--color-tiger-orange-400)] hover:underline break-words">
                      {detailModal.website}
                    </a>
                  </p>
                </div>
              )}

              {detailModal.created_at && (
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[var(--color-white-300)] mb-1 sm:mb-2">Created</label>
                  <p className="text-xs text-[var(--color-white-400)]">
                    {new Date(detailModal.created_at).toLocaleDateString()} {new Date(detailModal.created_at).toLocaleTimeString()}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-[var(--color-graphite-900)] border-t border-[var(--color-graphite-700)] px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row gap-2 justify-end">
              <button
                onClick={() => setDetailModal(null)}
                className="w-full sm:w-auto px-4 py-2 bg-[var(--color-graphite-700)] hover:bg-[var(--color-graphite-600)] text-[var(--color-white-200)] rounded-lg transition-colors text-sm"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleEdit(detailModal);
                  setDetailModal(null);
                }}
                className="w-full sm:w-auto px-4 py-2 bg-[var(--color-tiger-orange-600)] hover:bg-[var(--color-tiger-orange-700)] text-white rounded-lg transition-colors text-sm"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
