'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient, { Document } from '@/lib/api-client';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [formData, setFormData] = useState({
    file_name: '',
    file_type: 'patent' as 'patent' | 'diagram' | 'investor' | 'technical' | 'other',
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    fetchDocuments();
  }, [router]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      if ((error as any)?.message?.includes('401')) {
        router.push('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingDoc) {
        // Update metadata only
        await apiClient.updateDocument(editingDoc.id, formData);
      } else {
        // Upload new document with file
        if (!selectedFile) {
          alert('Please select a file to upload');
          return;
        }
        const uploadFormData = new FormData();
        uploadFormData.append('file', selectedFile);
        uploadFormData.append('file_name', formData.file_name || selectedFile.name);
        uploadFormData.append('category', formData.file_type);
        if (formData.description) {
          uploadFormData.append('description', formData.description);
        }
        await apiClient.uploadDocument(uploadFormData);
      }
      setFormData({ file_name: '', file_type: 'patent', description: '' });
      setSelectedFile(null);
      setEditingDoc(null);
      setIsFormVisible(false);
      fetchDocuments();
    } catch (error) {
      console.error('Error saving document:', error);
      alert('Error saving document. Please try again.');
    }
  };

  const handleEdit = (doc: Document) => {
    setEditingDoc(doc);
    setFormData({
      file_name: doc.file_name,
      file_type: doc.category as any,
      description: doc.description || ''
    });
    setIsFormVisible(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    try {
      await apiClient.deleteDocument(id);
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Error deleting document. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingDoc(null);
    setFormData({ file_name: '', file_type: 'patent', description: '' });
    setIsFormVisible(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-[var(--color-white-200)]">Loading documents...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-[var(--color-white-100)]">Documents Management</h1>
          {!isFormVisible && (
            <button
              onClick={() => setIsFormVisible(true)}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-[var(--color-tiger-orange-700)] text-white rounded-lg hover:bg-[var(--color-tiger-orange-600)] text-sm sm:text-base"
            >
              + Add Document
            </button>
          )}
        </div>
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="px-3 sm:px-4 py-2 bg-[var(--color-graphite-800)] text-[var(--color-white-200)] rounded-lg hover:bg-[var(--color-graphite-700)] text-sm sm:text-base"
          >
            ← Back to Dashboard
          </button>
        </div>

        {isFormVisible && (
          <div className="mb-8 bg-[var(--color-graphite-900)] p-6 rounded-lg border border-[var(--color-graphite-800)]">
            <h2 className="text-2xl font-bold text-[var(--color-white-100)] mb-6">
              {editingDoc ? 'Edit Document' : 'Add New Document'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                  File Name
                </label>
                <input
                  type="text"
                  value={formData.file_name}
                  onChange={(e) => setFormData({ ...formData, file_name: e.target.value })}
                  className="w-full px-4 py-2 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:border-[var(--color-tiger-orange-500)]"
                  required
                />
              </div>

              {!editingDoc && (
                <div>
                  <label className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                    File Upload *
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="w-full px-4 py-2 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:border-[var(--color-tiger-orange-500)]"
                    required
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.dwg,.dxf"
                  />
                  <p className="text-xs text-[var(--color-white-400)] mt-1">
                    Accepted formats: PDF, DOC, DOCX, PNG, JPG, DWG, DXF
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                  Category
                </label>
                <select
                  value={formData.file_type}
                  onChange={(e) => setFormData({ ...formData, file_type: e.target.value as any })}
                  className="w-full px-4 py-2 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:border-[var(--color-tiger-orange-500)]"
                  required
                >
                  <option value="patent">Patent</option>
                  <option value="diagram">Diagram</option>
                  <option value="investor">Investor Deck</option>
                  <option value="technical">Technical Documentation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:border-[var(--color-tiger-orange-500)] min-h-[100px]"
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[var(--color-tiger-orange-700)] text-white rounded-lg hover:bg-[var(--color-tiger-orange-600)]"
                >
                  {editingDoc ? 'Update Document' : 'Add Document'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 py-2 bg-[var(--color-graphite-800)] text-[var(--color-white-200)] rounded-lg hover:bg-[var(--color-graphite-700)]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-[var(--color-graphite-900)] rounded-lg border border-[var(--color-graphite-800)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--color-graphite-800)] border-b border-[var(--color-graphite-700)]">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-[var(--color-white-200)]">File Name</th>
                  <th className="text-left p-4 text-sm font-semibold text-[var(--color-white-200)]">Type</th>
                  <th className="text-left p-4 text-sm font-semibold text-[var(--color-white-200)]">Description</th>
                  <th className="text-left p-4 text-sm font-semibold text-[var(--color-white-200)]">Uploaded</th>
                  <th className="text-left p-4 text-sm font-semibold text-[var(--color-white-200)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[var(--color-white-300)]">
                      No documents yet. Click &quot;Add Document&quot; to create one.
                    </td>
                  </tr>
                ) : (
                  documents.map((doc) => (
                    <tr key={doc.id} className="border-b border-[var(--color-graphite-800)] hover:bg-[var(--color-graphite-850)]">
                      <td className="p-4 text-[var(--color-white-200)] font-medium">{doc.file_name}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-[var(--color-graphite-800)] text-[var(--color-white-300)] rounded text-sm">
                          {doc.category}
                        </span>
                      </td>
                      <td className="p-4 text-[var(--color-white-300)] text-sm max-w-md truncate">
                        {doc.description || '-'}
                      </td>
                      <td className="p-4 text-[var(--color-white-400)] text-sm">
                        {doc.created_at && new Date(doc.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-2 xs:p-4">
                        <div className="flex flex-col xs:flex-row gap-1 xs:gap-2">
                          <button
                            onClick={() => handleEdit(doc)}
                            className="w-full xs:w-auto px-2 xs:px-3 py-1 bg-[var(--color-graphite-800)] text-[var(--color-white-200)] rounded hover:bg-[var(--color-graphite-700)] text-xs xs:text-sm truncate"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(doc.id)}
                            className="w-full xs:w-auto px-2 xs:px-3 py-1 bg-red-900 text-white rounded hover:bg-red-800 text-xs xs:text-sm truncate"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
