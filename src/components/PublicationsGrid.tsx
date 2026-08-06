import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PublicationItem, PublicationCategory } from '../data/publications';
import { supabase } from '../lib/supabase';
import {
  BookOpen,
  Calendar,
  ArrowUpRight,
  X,
  FileText,
  Video,
  Play,
  Image as ImageIcon,
  PlusCircle,
  CheckCircle,
  Trash2,
  Lock,
  Unlock,
  ShieldAlert,
  Edit3,
  Upload,
  Globe,
  Landmark,
  Compass,
} from 'lucide-react';

interface PublicationsGridProps {
  items: PublicationItem[];
  isAdminMode: boolean;
  onAdminControlsToggle: () => void;
  onLogout: () => void;
}

type CategoryFilter = 'All' | PublicationCategory;

export const PublicationsGrid: React.FC<PublicationsGridProps> = ({ 
  items: initialItems,
  isAdminMode,
  onAdminControlsToggle,
  onLogout
}) => {
  const [itemsList, setItemsList] = useState<PublicationItem[]>(() => {
    const saved = localStorage.getItem('dharovar_publications');
    return saved ? JSON.parse(saved) : initialItems;
  });
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [selectedPub, setSelectedPub] = useState<PublicationItem | null>(null);

  // Admin URL & Mode state
  const [hasAdminAccess] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [pubToEdit, setPubToEdit] = useState<PublicationItem | null>(null);
  const [pubToDelete, setPubToDelete] = useState<PublicationItem | null>(null);

  React.useEffect(() => {
    const fetchPublications = async () => {
      try {
        const { data, error } = await supabase
          .from('publications')
          .select('*')
          .order('date', { ascending: false });
        if (error) throw error;

        if (data && data.length > 0) {
          const mapped = data.map((p) => ({
            id: p.id,
            title: p.title,
            date: p.date,
            category: p.category,
            cover_image: p.cover_image,
            video_file: p.video_file,
            excerpt: p.excerpt,
            author: p.author,
            bodyHtml: p.body_html || p.bodyHtml || '',
          }));
          setItemsList(mapped);
          localStorage.setItem('dharovar_publications', JSON.stringify(mapped));
        } else {
          // Database is empty, let's insert seed data
          const dbItems = initialItems.map((p) => ({
            id: p.id,
            title: p.title,
            date: p.date,
            category: p.category,
            cover_image: p.cover_image,
            video_file: p.video_file,
            excerpt: p.excerpt,
            author: p.author,
            body_html: p.bodyHtml,
          }));
          const { error: insertError } = await supabase
            .from('publications')
            .insert(dbItems);
          if (insertError) {
            console.error('Failed to seed publications:', insertError);
          } else {
            console.log('Seeded publications successfully!');
          }
          setItemsList(initialItems);
          localStorage.setItem('dharovar_publications', JSON.stringify(initialItems));
        }
      } catch (err) {
        console.error('Failed to fetch publications from Supabase, falling back to local storage:', err);
      }
    };
    fetchPublications();
  }, [initialItems]);

  React.useEffect(() => {
    localStorage.setItem('dharovar_publications', JSON.stringify(itemsList));
  }, [itemsList]);

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Form states for Add / Edit
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<PublicationCategory>('Domestic Policy & Governance');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formBodyHtml, setFormBodyHtml] = useState('');
  const [formAuthor, setFormAuthor] = useState('Dharovar House Secretariat');
  const [formCoverImage, setFormCoverImage] = useState('/images/logo.png');
  const [formVideoFile, setFormVideoFile] = useState<string | undefined>(undefined);

  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const categories: CategoryFilter[] = [
    'All',
    'Domestic Policy & Governance',
    'External Relations',
    'Geopolitics & Multipolar Order',
  ];

  const filteredItems = itemsList.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const getCategoryIcon = (category: PublicationCategory) => {
    switch (category) {
      case 'Domestic Policy & Governance':
        return Landmark;
      case 'External Relations':
        return Globe;
      case 'Geopolitics & Multipolar Order':
        return Compass;
      default:
        return FileText;
    }
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormCoverImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setFormVideoFile(videoUrl);
    }
  };

  const openAddModal = () => {
    setFormTitle('');
    setFormCategory('Domestic Policy & Governance');
    setFormExcerpt('');
    setFormBodyHtml('');
    setFormAuthor('Dharovar House Secretariat');
    setFormCoverImage('/images/logo.png');
    setFormVideoFile(undefined);
    setPubToEdit(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (pub: PublicationItem) => {
    setPubToEdit(pub);
    setFormTitle(pub.title);
    setFormCategory(pub.category);
    setFormExcerpt(pub.excerpt);
    setFormBodyHtml(pub.bodyHtml);
    setFormAuthor(pub.author || 'Dharovar House Secretariat');
    setFormCoverImage(pub.cover_image || '/images/logo.png');
    setFormVideoFile(pub.video_file);
    setIsAddModalOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formExcerpt.trim()) return;

    const saveToSupabase = async () => {
      try {
        if (pubToEdit) {
          const updatedItem = {
            title: formTitle,
            category: formCategory,
            excerpt: formExcerpt,
            body_html: formBodyHtml.trim() ? formBodyHtml : `<p>${formExcerpt}</p>`,
            author: formAuthor,
            cover_image: formCoverImage,
            video_file: formVideoFile,
          };
          const { error } = await supabase
            .from('publications')
            .update(updatedItem)
            .eq('id', pubToEdit.id);
          if (error) throw error;

          const updatedList = itemsList.map((p) =>
            p.id === pubToEdit.id
              ? {
                  ...p,
                  title: formTitle,
                  category: formCategory,
                  excerpt: formExcerpt,
                  bodyHtml: updatedItem.body_html,
                  author: formAuthor,
                  cover_image: formCoverImage,
                  video_file: formVideoFile,
                }
              : p
          );
          setItemsList(updatedList);
          showToast('Publication updated successfully!');
        } else {
          // Create new publication
          const newPub: PublicationItem = {
            id: `pub-${Date.now()}`,
            title: formTitle,
            date: new Date().toISOString(),
            category: formCategory,
            cover_image: formCoverImage,
            video_file: formVideoFile,
            excerpt: formExcerpt,
            author: formAuthor,
            bodyHtml: formBodyHtml.trim()
              ? `<h3>${formTitle}</h3><p>${formBodyHtml}</p>`
              : `<h3>${formTitle}</h3><p>${formExcerpt}</p>`,
          };

          const dbItem = {
            id: newPub.id,
            title: newPub.title,
            date: newPub.date,
            category: newPub.category,
            cover_image: newPub.cover_image,
            video_file: newPub.video_file,
            excerpt: newPub.excerpt,
            author: newPub.author,
            body_html: newPub.bodyHtml,
          };

          const { error } = await supabase
            .from('publications')
            .insert(dbItem);
          if (error) throw error;

          setItemsList([newPub, ...itemsList]);
          showToast('New Publication added to archives!');
        }
      } catch (err) {
        console.error('Failed to save publication to Supabase:', err);
        showToast('Error: Failed to save changes.');
      }
    };
    saveToSupabase();

    setIsAddModalOpen(false);
    setPubToEdit(null);
  };

  const handleDeletePublication = async (id: string) => {
    try {
      const { error } = await supabase
        .from('publications')
        .delete()
        .eq('id', id);
      if (error) throw error;

      setItemsList(itemsList.filter((item) => item.id !== id));
      setPubToDelete(null);
      showToast('Publication deleted successfully!');
    } catch (err) {
      console.error('Failed to delete publication from Supabase:', err);
      showToast('Error: Failed to delete publication.');
    }
  };

  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  return (
    <section id="publications" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8A35F] font-bold">
              Archival Journals & Research
            </span>
            {hasAdminAccess && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onAdminControlsToggle}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all shadow-sm ${
                    isAdminMode
                      ? 'bg-[#C8A35F] text-[#FAF8F5] border border-[#C8A35F]'
                      : 'bg-white text-[#9E7C3B] border border-[#C8A35F]/40 hover:border-[#C8A35F]'
                  }`}
                  title="Toggle Admin Access for Managing Publications"
                >
                  {isAdminMode ? <Unlock size={12} /> : <Lock size={12} />}
                  <span>{isAdminMode ? 'Admin Mode ON' : 'Admin Controls'}</span>
                </button>
                {sessionStorage.getItem('dharovar_admin_auth') === 'true' && (
                  <button
                    onClick={onLogout}
                    className="flex items-center justify-center p-1 rounded-full bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-colors"
                    title="Log Out Admin Session"
                  >
                    <X size={10} />
                  </button>
                )}
              </div>
            )}
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F382C] mt-1 mb-4">
            Publications & Insights
          </h2>
          <p className="text-base text-[#1A535C]/80">
            Student-led policy essays, educational briefs, and video speeches published by Dharovar House.
          </p>
          <div className="gold-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* Admin Control Banner when active */}
        {isAdminMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-2xl bg-[#0F382C] text-[#FAF8F5] border-2 border-[#C8A35F] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert size={20} className="text-[#C8A35F]" />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#C8A35F]">Admin Management Active</h4>
                <p className="text-xs text-white/80">Add, edit, or delete institutional publications with local image & video upload capabilities.</p>
              </div>
            </div>

            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#C8A35F] text-[#0F382C] text-xs font-bold shadow-md hover:bg-[#B88E3E] transition-all"
            >
              <PlusCircle size={15} />
              <span>+ Add Publication</span>
            </button>
          </motion.div>
        )}

        {/* Category Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 border-b border-[#E8E2D8] pb-6">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 relative ${
                  activeCategory === cat
                    ? 'bg-[#0F382C] text-[#FAF8F5] shadow-sm'
                    : 'bg-white text-[#1A535C] border border-[#E8E2D8] hover:border-[#C8A35F]'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute -bottom-1 left-4 right-4 h-[2px] bg-[#C8A35F] rounded-full" />
                )}
              </button>
            ))}
          </div>

          <span className="text-xs font-semibold text-[#1A535C]/70">
            Showing {filteredItems.length} Publication{filteredItems.length !== 1 && 's'}
          </span>
        </div>

        {/* Notification Toast */}
        {notificationMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-[#0F382C] text-[#C8A35F] border border-[#C8A35F] text-xs font-bold text-center flex items-center justify-center gap-2 shadow-lg"
          >
            <CheckCircle size={18} />
            <span>{notificationMsg}</span>
          </motion.div>
        )}

        {/* Publication Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((pub, idx) => {
              const CategoryIcon = getCategoryIcon(pub.category);
              const formattedDate = new Date(pub.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              return (
                <motion.div
                  layout
                  key={pub.id || idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden flex flex-col justify-between shadow-soft hover:shadow-hover transition-all duration-300 group relative"
                >
                  {/* Admin Action Buttons (Visible only in Admin Mode) */}
                  {isAdminMode && (
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(pub);
                        }}
                        className="p-2 rounded-full bg-[#0F382C] text-[#C8A35F] shadow-md hover:bg-[#1A535C] transition-colors"
                        title="Edit Publication"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPubToDelete(pub);
                        }}
                        className="p-2 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition-colors"
                        title="Delete Publication"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}

                  <div className="cursor-pointer" onClick={() => setSelectedPub(pub)}>
                    {/* Cover Image (Only rendered if custom photo uploaded) */}
                    {pub.cover_image && pub.cover_image !== '/images/logo.png' && (
                      <div className="h-44 w-full overflow-hidden bg-[#FAF8F5] relative border-b border-[#E8E2D8]">
                        <img
                          src={pub.cover_image}
                          alt={pub.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                        {pub.video_file && (
                          <div className="absolute bottom-3 left-3 bg-[#0F382C]/90 text-[#C8A35F] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                            <Play size={10} className="fill-[#C8A35F]" />
                            <span>Video Content</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-6">
                      {/* Category Badge & Date */}
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#C8A35F]/30 font-semibold text-[#9E7C3B] text-[11px]">
                          <CategoryIcon size={12} className="text-[#C8A35F]" />
                          {pub.category}
                        </span>
                        <span className="flex items-center gap-1 text-[#1A535C]/60 text-[11px]">
                          <Calendar size={11} />
                          {formattedDate}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg font-bold text-[#0F382C] group-hover:text-[#C8A35F] transition-colors leading-snug mb-3">
                        {pub.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs text-[#1A535C]/80 line-clamp-3 leading-relaxed">
                        {pub.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div
                    className="px-6 py-3.5 bg-[#FAF8F5] border-t border-[#E8E2D8]/60 flex items-center justify-between text-xs font-bold text-[#0F382C] cursor-pointer"
                    onClick={() => setSelectedPub(pub)}
                  >
                    <span>Read Publication</span>
                    <ArrowUpRight size={15} className="text-[#C8A35F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedPub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F382C]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border-2 border-[#C8A35F] max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-10 relative text-[#0F382C]"
            >
              <button
                onClick={() => setSelectedPub(null)}
                className="absolute top-4 right-4 p-2 text-[#0F382C]/60 hover:text-[#0F382C] rounded-full hover:bg-[#FAF8F5] transition-colors"
              >
                <X size={22} />
              </button>

              <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-[#C8A35F] uppercase tracking-widest mb-3">
                <span className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#C8A35F]/40">
                  {selectedPub.category}
                </span>
                <span>•</span>
                <span>
                  {new Date(selectedPub.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                {selectedPub.author && (
                  <>
                    <span>•</span>
                    <span className="text-[#0F382C]/70">{selectedPub.author}</span>
                  </>
                )}
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0F382C] leading-snug mb-6">
                {selectedPub.title}
              </h2>

              {/* Native HTML5 Video Player */}
              {selectedPub.video_file && (
                <div className="mb-8 rounded-xl overflow-hidden shadow-lg border border-[#E8E2D8] bg-black">
                  <video controls className="w-full h-auto max-h-[420px]" src={selectedPub.video_file}>
                    Your browser does not support HTML5 video.
                  </video>
                </div>
              )}

              {/* Cover Image if no video player */}
              {!selectedPub.video_file && selectedPub.cover_image && (
                <div
                  className="mb-8 rounded-xl overflow-hidden border border-[#E8E2D8] bg-[#FAF8F5] flex justify-center cursor-zoom-in hover:opacity-95 transition-opacity"
                  onClick={() => selectedPub.cover_image && setLightboxImage(selectedPub.cover_image)}
                  title="Click to view full image"
                >
                  <img src={selectedPub.cover_image} alt={selectedPub.title} className="w-full h-auto max-h-[450px] object-contain block" />
                </div>
              )}

              <div className="gold-divider my-6" />

              {/* Article Content */}
              <div
                className="prose-editorial text-base text-[#1A535C] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedPub.bodyHtml }}
              />

              <div className="mt-10 pt-6 border-t border-[#E8E2D8] flex justify-between items-center">
                <span className="text-xs text-[#9E7C3B] font-serif italic">
                  Dharovar House Archival Repository • Mumbai, India
                </span>
                <button
                  onClick={() => setSelectedPub(null)}
                  className="px-6 py-2.5 bg-[#0F382C] text-[#FAF8F5] rounded-full text-xs font-semibold hover:bg-[#1A535C] transition-colors"
                >
                  Close Publication
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Admin Add / Edit Form */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F382C]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-[#FAF8F5] rounded-2xl border-2 border-[#C8A35F] max-w-xl w-full p-6 sm:p-8 relative text-[#0F382C] shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#0F382C]/60 hover:text-[#0F382C] rounded-full hover:bg-white transition-colors"
              >
                <X size={22} />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-[#C8A35F] uppercase tracking-widest mb-1">
                <PlusCircle size={14} />
                <span>{pubToEdit ? 'Edit Publication' : 'New Publication Submission'}</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#0F382C] mb-6">
                {pubToEdit ? 'Edit Institutional Article' : '+ Add New Publication'}
              </h3>

              <form onSubmit={handleSubmitForm} className="space-y-4 text-xs font-medium text-[#0F382C]">
                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. India's Domestic Governance & Economic Infrastructure Framework"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] bg-white text-sm focus:outline-none focus:border-[#C8A35F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider mb-1">Category *</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as PublicationCategory)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] bg-white text-sm focus:outline-none focus:border-[#C8A35F]"
                    >
                      <option value="Domestic Policy & Governance">Domestic Policy & Governance</option>
                      <option value="External Relations">External Relations</option>
                      <option value="Geopolitics & Multipolar Order">Geopolitics & Multipolar Order</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider mb-1">Author / Division</label>
                    <input
                      type="text"
                      value={formAuthor}
                      onChange={(e) => setFormAuthor(e.target.value)}
                      placeholder="e.g. Strategic Affairs Desk"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] bg-white text-sm focus:outline-none focus:border-[#C8A35F]"
                    />
                  </div>
                </div>

                {/* Local Cover Image Selection */}
                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Cover Image (Upload from Computer)</label>
                  <div className="flex items-start gap-4">
                    <label className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8E2D8] rounded-xl cursor-pointer hover:border-[#C8A35F] transition-colors">
                      <Upload size={14} className="text-[#C8A35F]" />
                      <span>Choose Local Image</span>
                      <input type="file" accept="image/*" onChange={handleImageFileUpload} className="hidden" />
                    </label>
                    {formCoverImage && formCoverImage !== '/images/logo.png' && (
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#E8E2D8] bg-white shadow-sm">
                        <img src={formCoverImage} alt="Cover Preview" className="w-full h-full object-contain" />
                        <button
                          type="button"
                          onClick={() => setFormCoverImage('/images/logo.png')}
                          className="absolute -top-1.5 -right-1.5 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Local HTML5 Video Selection (.mp4) */}
                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Upload Video (.mp4 / .webm)</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8E2D8] rounded-xl cursor-pointer hover:border-[#C8A35F] transition-colors">
                      <Video size={14} className="text-[#C8A35F]" />
                      <span>Choose Video File</span>
                      <input type="file" accept="video/mp4,video/webm" onChange={handleVideoFileUpload} className="hidden" />
                    </label>
                    {formVideoFile && (
                      <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#E8E2D8] px-3 py-1.5 rounded-xl">
                        <span className="text-[11px] text-[#1A535C]/70 font-semibold truncate max-w-[120px]">
                          Video Attached
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormVideoFile(undefined)}
                          className="p-0.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Summary Excerpt *</label>
                  <textarea
                    required
                    rows={2}
                    value={formExcerpt}
                    onChange={(e) => setFormExcerpt(e.target.value)}
                    placeholder="Provide a 1-2 sentence analytical summary..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] bg-white text-sm focus:outline-none focus:border-[#C8A35F]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Article Body Content</label>
                  <textarea
                    rows={5}
                    value={formBodyHtml}
                    onChange={(e) => setFormBodyHtml(e.target.value)}
                    placeholder="Enter article text or HTML markup..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] bg-white text-sm focus:outline-none focus:border-[#C8A35F]"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 rounded-full border border-[#E8E2D8] text-[#0F382C] font-semibold hover:bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#0F382C] text-[#FAF8F5] font-bold hover:bg-[#1A535C]"
                  >
                    {pubToEdit ? 'Save Changes' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Confirm Delete */}
      <AnimatePresence>
        {pubToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F382C]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border-2 border-red-500 max-w-md w-full p-6 sm:p-8 text-center text-[#0F382C] shadow-2xl space-y-4"
            >
              <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <Trash2 size={28} />
              </div>
              <h3 className="font-serif text-xl font-bold text-red-600">Delete Publication?</h3>
              <p className="text-xs text-[#1A535C] leading-relaxed">
                Are you sure you want to delete <span className="font-bold text-[#0F382C]">"{pubToDelete.title}"</span>? This action will remove it immediately.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setPubToDelete(null)}
                  className="px-5 py-2 rounded-full border border-[#E8E2D8] text-xs font-semibold text-[#0F382C] hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeletePublication(pubToDelete.id)}
                  className="px-6 py-2 rounded-full bg-red-600 text-white text-xs font-bold hover:bg-red-700"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md cursor-zoom-out"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
              aria-label="Close image viewer"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              src={lightboxImage}
              alt="Fullscreen Preview"
              className="max-w-[95vw] max-h-[95vh] rounded-lg shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>


    </section>
  );
};
