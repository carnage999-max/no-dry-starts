'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';
import apiClient, { ContentBlock } from '@/lib/api-client';

export default function ContentPage() {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    html_content: '',
    page: 'home',
    order: 0
  });
  const [selectedPage, setSelectedPage] = useState<string>('home');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    fetchContentBlocks();
  }, [router]);

  const fetchContentBlocks = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getContentBlocks();
      setContentBlocks(data);
    } catch (error) {
      console.error('Error fetching content blocks:', error);
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
      if (editingBlock) {
        await apiClient.updateContentBlock(editingBlock.slug, formData);
      } else {
        await apiClient.createContentBlock(formData);
      }
      setFormData({ slug: '', title: '', html_content: '', page: 'home', order: 0 });
      setEditingBlock(null);
      setIsFormVisible(false);
      fetchContentBlocks();
    } catch (error) {
      console.error('Error saving content block:', error);
      alert('Error saving content block. Please try again.');
    }
  };

  const handleEdit = (block: ContentBlock) => {
    setEditingBlock(block);
    setFormData({
      slug: block.slug,
      title: block.title,
      html_content: block.html_content,
      page: block.page || 'home',
      order: block.order || 0
    });
    setIsFormVisible(true);
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const filteredBlocks = contentBlocks.filter(b => b.page === selectedPage);
    const items = Array.from(filteredBlocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order values
    const updatedBlocks = items.map((item, index) => ({
      ...item,
      order: index
    }));

    // Optimistically update UI
    const newContentBlocks = contentBlocks.map(block => {
      if (block.page !== selectedPage) return block;
      const updated = updatedBlocks.find(b => b.slug === block.slug);
      return updated || block;
    });
    setContentBlocks(newContentBlocks);

    // Save to backend
    try {
      await apiClient.reorderContentBlocks(
        updatedBlocks.map(b => ({ slug: b.slug, order: b.order }))
      );
    } catch (error) {
      console.error('Error reordering blocks:', error);
      alert('Failed to save new order. Please try again.');
      // Revert on error
      fetchContentBlocks();
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this content block?')) return;
    
    try {
      await apiClient.deleteContentBlock(slug);
      fetchContentBlocks();
    } catch (error) {
      console.error('Error deleting content block:', error);
      alert('Error deleting content block. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingBlock(null);
    setFormData({ slug: '', title: '', html_content: '', page: 'home', order: 0 });
    setIsFormVisible(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-[var(--color-white-200)]">Loading content blocks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-[var(--color-white-100)] mb-4">Content Management</h1>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {!isFormVisible && (
              <button
                onClick={() => setIsFormVisible(true)}
                className="w-full sm:w-auto px-4 py-2 bg-[var(--color-tiger-orange-700)] text-white rounded-lg hover:bg-[var(--color-tiger-orange-600)] text-sm sm:text-base"
              >
                + Add Content Block
              </button>
            )}
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full sm:w-auto px-4 py-2 bg-[var(--color-graphite-800)] text-[var(--color-white-200)] rounded-lg hover:bg-[var(--color-graphite-700)] text-sm sm:text-base"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>

        {isFormVisible && (
          <div className="mb-8 bg-[var(--color-graphite-900)] p-6 rounded-lg border border-[var(--color-graphite-800)]">
            <h2 className="text-2xl font-bold text-[var(--color-white-100)] mb-6">
              {editingBlock ? 'Edit Content Block' : 'Add New Content Block'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g., home-hero, about-intro"
                  className="w-full px-4 py-2 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:border-[var(--color-tiger-orange-500)]"
                  required
                  disabled={!!editingBlock}
                />
                <p className="text-xs text-[var(--color-white-500)] mt-1">Unique identifier (can't be changed after creation)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Homepage Hero Section"
                  className="w-full px-4 py-2 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:border-[var(--color-tiger-orange-500)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                  Page
                </label>
                <select
                  value={formData.page}
                  onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                  className="w-full px-4 py-2 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:border-[var(--color-tiger-orange-500)]"
                  required
                >
                  <option value="home">Home</option>
                  <option value="how-it-works">How It Works</option>
                  <option value="problem">The Problem</option>
                  <option value="solution">The Solution</option>
                  <option value="patents">Patents</option>
                  <option value="partners">Partners</option>
                  <option value="investors">Investors</option>
                  <option value="contact">Contact</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                  Order (Lower numbers appear first)
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:border-[var(--color-tiger-orange-500)]"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-white-200)] mb-2">
                  HTML Content
                </label>
                <textarea
                  value={formData.html_content}
                  onChange={(e) => setFormData({ ...formData, html_content: e.target.value })}
                  className="w-full px-4 py-2 bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg text-[var(--color-white-100)] focus:outline-none focus:border-[var(--color-tiger-orange-500)] min-h-[200px] font-mono text-sm"
                  rows={10}
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[var(--color-tiger-orange-700)] text-white rounded-lg hover:bg-[var(--color-tiger-orange-600)]"
                >
                  {editingBlock ? 'Update Content Block' : 'Add Content Block'}
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

        {/* Page Filter */}
        <div className="mb-6 flex gap-2">
          {['home', 'how-it-works', 'problem', 'solution', 'patents', 'partners', 'investors', 'contact'].map((page) => (
            <button
              key={page}
              onClick={() => setSelectedPage(page)}
              className={`px-4 py-2 rounded ${
                selectedPage === page
                  ? 'bg-[var(--color-tiger-orange-500)] text-white'
                  : 'bg-[var(--color-graphite-800)] text-[var(--color-white-300)]'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <div className="bg-[var(--color-graphite-900)] rounded-lg border border-[var(--color-graphite-800)] p-6">
          <div className="mb-4 text-sm text-[var(--color-white-400)]">
            💡 Drag and drop blocks to reorder them
          </div>
          
          {contentBlocks.filter(b => b.page === selectedPage).length === 0 ? (
            <div className="p-8 text-center text-[var(--color-white-300)]">
              No content blocks for this page yet. Click &quot;Add Content Block&quot; to create one.
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="content-blocks">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                    {contentBlocks
                      .filter(b => b.page === selectedPage)
                      .sort((a, b) => a.order - b.order)
                      .map((block, index) => (
                        <Draggable key={block.id} draggableId={block.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`bg-[var(--color-graphite-800)] border border-[var(--color-graphite-700)] rounded-lg p-4 ${
                                snapshot.isDragging ? 'shadow-lg opacity-80' : ''
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <div {...provided.dragHandleProps} className="mt-1 cursor-grab active:cursor-grabbing">
                                  <GripVertical size={20} className="text-[var(--color-white-400)]" />
                                </div>
                                
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-bold text-[var(--color-white-100)]">{block.title}</h3>
                                    <span className="text-sm text-[var(--color-white-400)] font-mono">{block.slug}</span>
                                  </div>
                                  <div className="text-sm text-[var(--color-white-300)] mb-3 line-clamp-2">
                                    {block.html_content.substring(0, 150)}...
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs text-[var(--color-white-500)]">
                                      Order: {block.order}
                                    </span>
                                    <span className="text-xs text-[var(--color-white-500)]">
                                      Updated: {block.updated_at && new Date(block.updated_at).toLocaleDateString()}
                                    </span>
                                    <div className="ml-auto flex flex-col xs:flex-row gap-1 xs:gap-2 min-w-fit">
                                      <button
                                        onClick={() => handleEdit(block)}
                                        className="px-2 xs:px-3 py-1 bg-[var(--color-graphite-700)] text-[var(--color-white-200)] rounded hover:bg-[var(--color-graphite-600)] text-xs xs:text-sm whitespace-nowrap"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => handleDelete(block.slug)}
                                        className="px-2 xs:px-3 py-1 bg-red-900 text-white rounded hover:bg-red-800 text-xs xs:text-sm whitespace-nowrap"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>
    </div>
  );
}
