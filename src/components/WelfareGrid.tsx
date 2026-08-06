import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WelfareItem } from '../data/welfare';
import { supabase } from '../lib/supabase';
import {
  Building2,
  Users,
  Sparkles,
  ArrowUpRight,
  X,
  PlusCircle,
  CheckCircle,
  Trash2,
  Lock,
  Unlock,
  ShieldAlert,
  Edit3,
  Upload,
  Image as ImageIcon,
  Tag,
} from 'lucide-react';

interface WelfareGridProps {
  items: WelfareItem[];
}

export const WelfareGrid: React.FC<WelfareGridProps> = ({ items: initialItems }) => {
  const [welfareList, setWelfareList] = useState<WelfareItem[]>(() => {
    const saved = localStorage.getItem('dharovar_welfare');
    return saved ? JSON.parse(saved) : initialItems;
  });
  const [selectedWelfare, setSelectedWelfare] = useState<WelfareItem | null>(null);

  // Admin URL & Mode state
  const [hasAdminAccess] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [welfareToEdit, setWelfareToEdit] = useState<WelfareItem | null>(null);
  const [welfareToDelete, setWelfareToDelete] = useState<WelfareItem | null>(null);

  // Authentication states
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchWelfare = async () => {
      try {
        const { data, error } = await supabase
          .from('welfare')
          .select('*')
          .order('id', { ascending: true });
        if (error) throw error;

        if (data && data.length > 0) {
          setWelfareList(data);
          localStorage.setItem('dharovar_welfare', JSON.stringify(data));
        } else {
          // Database is empty, let's insert seed data
          const { error: insertError } = await supabase
            .from('welfare')
            .insert(initialItems);
          if (insertError) {
            console.error('Failed to seed welfare data:', insertError);
          } else {
            console.log('Seeded welfare data successfully!');
          }
          setWelfareList(initialItems);
          localStorage.setItem('dharovar_welfare', JSON.stringify(initialItems));
        }
      } catch (err) {
        console.error('Failed to fetch welfare from Supabase, falling back to local storage:', err);
      }
    };
    fetchWelfare();
  }, [initialItems]);

  React.useEffect(() => {
    localStorage.setItem('dharovar_welfare', JSON.stringify(welfareList));
  }, [welfareList]);

  // Form state
  const [formSchoolName, setFormSchoolName] = useState('');
  const [formProjectTitle, setFormProjectTitle] = useState('');
  const [formImpactMetrics, setFormImpactMetrics] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCoverImage, setFormCoverImage] = useState('/images/logo.png');
  const [formPartnerTags, setFormPartnerTags] = useState('');
  const [formGallery, setFormGallery] = useState<string[]>([]);

  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const loadPromises = Array.from(files).map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(loadPromises).then((base64Images) => {
        setFormGallery([...formGallery, ...base64Images]);
      });
    }
  };

  const openAddModal = () => {
    setWelfareToEdit(null);
    setFormSchoolName('');
    setFormProjectTitle('');
    setFormImpactMetrics('');
    setFormDescription('');
    setFormCoverImage('/images/logo.png');
    setFormPartnerTags('');
    setFormGallery([]);
    setIsAddModalOpen(true);
  };

  const openEditModal = (item: WelfareItem) => {
    setWelfareToEdit(item);
    setFormSchoolName(item.school_name);
    setFormProjectTitle(item.project_title);
    setFormImpactMetrics(item.impact_metrics);
    setFormDescription(item.description);
    setFormCoverImage(item.cover_image || '/images/logo.png');
    setFormPartnerTags(item.partner_tags ? item.partner_tags.join(', ') : '');
    setFormGallery(item.event_photos || []);
    setIsAddModalOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSchoolName.trim() || !formProjectTitle.trim()) return;

    const tagsArray = formPartnerTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const saveToSupabase = async () => {
      try {
        if (welfareToEdit) {
          const updatedItem = {
            school_name: formSchoolName,
            project_title: formProjectTitle,
            impact_metrics: formImpactMetrics,
            description: formDescription,
            cover_image: formCoverImage,
            partner_tags: tagsArray,
            event_photos: formGallery,
          };
          const { error } = await supabase
            .from('welfare')
            .update(updatedItem)
            .eq('id', welfareToEdit.id);
          if (error) throw error;

          const updated = welfareList.map((w) =>
            w.id === welfareToEdit.id ? { ...w, ...updatedItem } : w
          );
          setWelfareList(updated);
          showToast('Welfare initiative updated successfully!');
        } else {
          const newItem: WelfareItem = {
            id: `welfare-${Date.now()}`,
            school_name: formSchoolName,
            project_title: formProjectTitle,
            impact_metrics: formImpactMetrics || '500+ Students Impacted',
            description: formDescription,
            cover_image: formCoverImage,
            partner_tags: tagsArray.length > 0 ? tagsArray : ['Youth Leadership', 'Social Welfare'],
            event_photos: formGallery,
          };
          const { error } = await supabase
            .from('welfare')
            .insert(newItem);
          if (error) throw error;

          setWelfareList([newItem, ...welfareList]);
          showToast('New Welfare initiative added successfully!');
        }
      } catch (err) {
        console.error('Failed to save to Supabase:', err);
        showToast('Error: Failed to save changes.');
      }
    };
    saveToSupabase();

    setIsAddModalOpen(false);
    setWelfareToEdit(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('welfare')
        .delete()
        .eq('id', id);
      if (error) throw error;

      setWelfareList(welfareList.filter((item) => item.id !== id));
      setWelfareToDelete(null);
      showToast('Welfare initiative deleted successfully!');
    } catch (err) {
      console.error('Failed to delete from Supabase:', err);
      showToast('Error: Failed to delete initiative.');
    }
  };

  const handleAdminControlsClick = () => {
    const isAuth = sessionStorage.getItem('dharovar_admin_auth') === 'true';
    if (isAuth) {
      setIsAdminMode(!isAdminMode);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctId = import.meta.env.VITE_ADMIN_ID || 'admin';
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'dharovar2026';

    if (loginId === correctId && loginPassword === correctPassword) {
      sessionStorage.setItem('dharovar_admin_auth', 'true');
      setIsLoginModalOpen(false);
      setIsAdminMode(true);
      setLoginError(null);
      setLoginId('');
      setLoginPassword('');
      showToast('Admin authenticated successfully!');
    } else {
      setLoginError('Invalid Admin ID or Password!');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dharovar_admin_auth');
    setIsAdminMode(false);
    showToast('Admin session logged out.');
  };

  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  return (
    <section id="welfare" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8A35F] font-bold">
              Institutional Social Action
            </span>
            {hasAdminAccess && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleAdminControlsClick}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all shadow-sm ${
                    isAdminMode
                      ? 'bg-[#C8A35F] text-[#FAF8F5] border border-[#C8A35F]'
                      : 'bg-[#FAF8F5] text-[#9E7C3B] border border-[#C8A35F]/40 hover:border-[#C8A35F]'
                  }`}
                  title="Toggle Admin Access for Managing Welfare Initiatives"
                >
                  {isAdminMode ? <Unlock size={12} /> : <Lock size={12} />}
                  <span>{isAdminMode ? 'Admin Mode ON' : 'Admin Controls'}</span>
                </button>
                {sessionStorage.getItem('dharovar_admin_auth') === 'true' && (
                  <button
                    onClick={handleLogout}
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
            International School Partnerships
          </h2>
          <p className="text-base text-[#1A535C]/80">
            Empowering youth across Mumbai through strategic educational drives, civic leadership forums, and resource redistribution initiatives.
          </p>
          <div className="gold-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* Admin Bar Banner when active */}
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
                <p className="text-xs text-white/80">Add, edit, or remove welfare initiatives and upload seminar photos directly.</p>
              </div>
            </div>

            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#C8A35F] text-[#0F382C] text-xs font-bold shadow-md hover:bg-[#B88E3E] transition-all"
            >
              <PlusCircle size={15} />
              <span>+ Add Welfare Initiative</span>
            </button>
          </motion.div>
        )}

        {/* Toast Message */}
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

        {/* Grid Container */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {welfareList.map((item, idx) => (
              <motion.div
                layout
                key={item.id || idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-[#FAF8F5] rounded-2xl border border-[#E8E2D8] overflow-hidden flex flex-col justify-between shadow-soft hover:shadow-hover transition-all duration-300 group relative"
              >
                {/* Admin Action Buttons */}
                {isAdminMode && (
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(item);
                      }}
                      className="p-2 rounded-full bg-[#0F382C] text-[#C8A35F] shadow-md hover:bg-[#1A535C] transition-colors"
                      title="Edit Welfare Initiative"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setWelfareToDelete(item);
                      }}
                      className="p-2 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition-colors"
                      title="Delete Welfare Initiative"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}

                <div className="cursor-pointer" onClick={() => setSelectedWelfare(item)}>
                  {/* Cover Header Image (Only rendered if custom photo uploaded) */}
                  {item.cover_image && item.cover_image !== '/images/logo.png' && (
                    <div className="h-44 w-full overflow-hidden bg-[#FAF8F5] relative border-b border-[#E8E2D8]">
                      <img
                        src={item.cover_image}
                        alt={item.school_name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Impact Metric Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#C8A35F]/40 font-bold text-[11px] text-[#9E7C3B] mb-3">
                      <Sparkles size={12} className="text-[#C8A35F]" />
                      <span>{item.impact_metrics}</span>
                    </div>
                    {/* Partner School Header */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#9E7C3B] uppercase tracking-wider mb-2">
                      <Building2 size={14} className="text-[#C8A35F]" />
                      <span>{item.school_name}</span>
                    </div>

                    {/* Initiative Title */}
                    <h3 className="font-serif text-lg font-bold text-[#0F382C] group-hover:text-[#C8A35F] transition-colors leading-snug mb-3">
                      {item.project_title}
                    </h3>

                    {/* Partner Tags */}
                    {item.partner_tags && item.partner_tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {item.partner_tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-full bg-white border border-[#E8E2D8] text-[10px] font-semibold text-[#1A535C]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Short Description */}
                    <p className="text-xs text-[#1A535C]/80 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div
                  className="px-6 py-3.5 bg-white border-t border-[#E8E2D8]/60 flex items-center justify-between text-xs font-bold text-[#0F382C] cursor-pointer"
                  onClick={() => setSelectedWelfare(item)}
                >
                  <span>View Initiative Dossier</span>
                  <ArrowUpRight size={15} className="text-[#C8A35F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedWelfare && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F382C]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl border-2 border-[#C8A35F] max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-10 relative text-[#0F382C]"
            >
              <button
                onClick={() => setSelectedWelfare(null)}
                className="absolute top-4 right-4 p-2 text-[#0F382C]/60 hover:text-[#0F382C] rounded-full hover:bg-[#FAF8F5] transition-colors"
              >
                <X size={22} />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-[#C8A35F] uppercase tracking-widest mb-2">
                <Building2 size={14} />
                <span>{selectedWelfare.school_name}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0F382C] leading-snug mb-4">
                {selectedWelfare.project_title}
              </h2>

              {/* Impact Metric Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8F5] border border-[#C8A35F]/40 font-bold text-xs text-[#9E7C3B] mb-6">
                <Users size={14} className="text-[#C8A35F]" />
                <span>Impact Metric: {selectedWelfare.impact_metrics}</span>
              </div>

              {/* Hero Image */}
              {selectedWelfare.cover_image && (
                <div
                  className="mb-6 rounded-xl overflow-hidden border border-[#E8E2D8] bg-[#FAF8F5] flex justify-center cursor-zoom-in hover:opacity-95 transition-opacity"
                  onClick={() => selectedWelfare.cover_image && setLightboxImage(selectedWelfare.cover_image)}
                  title="Click to view full image"
                >
                  <img src={selectedWelfare.cover_image} alt={selectedWelfare.project_title} className="w-full h-auto max-h-[450px] object-contain block" />
                </div>
              )}

              {/* Partner Tags */}
              {selectedWelfare.partner_tags && selectedWelfare.partner_tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedWelfare.partner_tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D8] text-xs font-semibold text-[#0F382C] flex items-center gap-1">
                      <Tag size={12} className="text-[#C8A35F]" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="gold-divider my-6" />

              {/* Full Description */}
              <div className="text-base text-[#1A535C] leading-relaxed space-y-4">
                <p>{selectedWelfare.description}</p>
              </div>

              {/* Event Photos Gallery */}
              {selectedWelfare.event_photos && selectedWelfare.event_photos.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[#E8E2D8]">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[#9E7C3B] mb-4 flex items-center gap-2">
                    <ImageIcon size={16} />
                    <span>Seminar & Event Gallery</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedWelfare.event_photos.map((photoUrl, pIdx) => (
                      <div
                        key={pIdx}
                        className="rounded-xl overflow-hidden border border-[#E8E2D8] h-32 bg-[#FAF8F5] cursor-zoom-in hover:opacity-90 transition-opacity"
                        onClick={() => setLightboxImage(photoUrl)}
                        title="Click to view full image"
                      >
                        <img src={photoUrl} alt={`Seminar Photo ${pIdx + 1}`} className="w-full h-full object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10 pt-6 border-t border-[#E8E2D8] flex justify-between items-center">
                <span className="text-xs text-[#9E7C3B] font-serif italic">
                  Dharovar House Social Action Secretariat • Mumbai, India
                </span>
                <button
                  onClick={() => setSelectedWelfare(null)}
                  className="px-6 py-2.5 bg-[#0F382C] text-[#FAF8F5] rounded-full text-xs font-semibold hover:bg-[#1A535C] transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Admin Add / Edit Welfare Initiative */}
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
                <Building2 size={14} />
                <span>{welfareToEdit ? 'Edit Welfare Initiative' : 'New Welfare Initiative'}</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#0F382C] mb-6">
                {welfareToEdit ? 'Edit School Partnership' : '+ Add Welfare Initiative'}
              </h3>

              <form onSubmit={handleSubmitForm} className="space-y-4 text-xs font-medium text-[#0F382C]">
                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Partner School Name *</label>
                  <input
                    type="text"
                    required
                    value={formSchoolName}
                    onChange={(e) => setFormSchoolName(e.target.value)}
                    placeholder="e.g. Dhirubhai Ambani International School"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] bg-white text-sm focus:outline-none focus:border-[#C8A35F]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formProjectTitle}
                    onChange={(e) => setFormProjectTitle(e.target.value)}
                    placeholder="e.g. Global Policy & Model Diplomacy Workshop"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] bg-white text-sm focus:outline-none focus:border-[#C8A35F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider mb-1">Impact Metric Badge *</label>
                    <input
                      type="text"
                      required
                      value={formImpactMetrics}
                      onChange={(e) => setFormImpactMetrics(e.target.value)}
                      placeholder="e.g. 1,200+ Students Mentored"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] bg-white text-sm focus:outline-none focus:border-[#C8A35F]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider mb-1">Partner Tags (Comma Separated)</label>
                    <input
                      type="text"
                      value={formPartnerTags}
                      onChange={(e) => setFormPartnerTags(e.target.value)}
                      placeholder="Policy, Equity, Leadership"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] bg-white text-sm focus:outline-none focus:border-[#C8A35F]"
                    />
                  </div>
                </div>

                {/* Replace / Upload Cover Image */}
                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Cover Image (Upload from Device)</label>
                  <div className="flex items-start gap-4">
                    <label className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8E2D8] rounded-xl cursor-pointer hover:border-[#C8A35F] transition-colors">
                      <Upload size={14} className="text-[#C8A35F]" />
                      <span>Select Cover Photo</span>
                      <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                    </label>
                    {formCoverImage && formCoverImage !== '/images/logo.png' && (
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#E8E2D8] bg-white group/preview shadow-sm">
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

                {/* Upload Seminar & Event Gallery */}
                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Upload Seminar & Event Gallery Photos</label>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8E2D8] rounded-xl cursor-pointer hover:border-[#C8A35F] transition-colors">
                        <ImageIcon size={14} className="text-[#C8A35F]" />
                        <span>Select Gallery Photos</span>
                        <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
                      </label>
                      {formGallery.length > 0 && (
                        <span className="text-[11px] text-[#1A535C]/70 font-semibold">
                          {formGallery.length} photo{formGallery.length > 1 ? 's' : ''} added
                        </span>
                      )}
                    </div>
                    {formGallery.length > 0 && (
                      <div className="flex flex-wrap gap-2.5 p-2 bg-[#FAF8F5] border border-[#E8E2D8] rounded-xl max-h-36 overflow-y-auto">
                        {formGallery.map((imgUrl, idx) => (
                          <div key={idx} className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#E8E2D8] bg-white group/preview">
                            <img src={imgUrl} alt={`Gallery Preview ${idx + 1}`} className="w-full h-full object-contain" />
                            <button
                              type="button"
                              onClick={() => setFormGallery(formGallery.filter((_, i) => i !== idx))}
                              className="absolute -top-1 -right-1 p-0.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow"
                            >
                              <X size={8} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">Detailed Description *</label>
                  <textarea
                    required
                    rows={4}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Enter full initiative description..."
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
                    {welfareToEdit ? 'Save Changes' : 'Publish Initiative'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Confirm Delete */}
      <AnimatePresence>
        {welfareToDelete && (
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
              <h3 className="font-serif text-xl font-bold text-red-600">Delete Initiative?</h3>
              <p className="text-xs text-[#1A535C] leading-relaxed">
                Are you sure you want to delete <span className="font-bold text-[#0F382C]">"{welfareToDelete.project_title}"</span> ({welfareToDelete.school_name})?
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setWelfareToDelete(null)}
                  className="px-5 py-2 rounded-full border border-[#E8E2D8] text-xs font-semibold text-[#0F382C] hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(welfareToDelete.id)}
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

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F382C]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FAF8F5] rounded-2xl border-2 border-[#C8A35F] max-w-md w-full p-6 sm:p-8 text-[#0F382C] shadow-2xl relative"
            >
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#0F382C]/60 hover:text-[#0F382C] rounded-full hover:bg-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#C8A35F]/10 text-[#C8A35F] flex items-center justify-center mx-auto mb-3">
                  <Lock size={22} />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0F382C]">Admin Access Required</h3>
                <p className="text-xs text-[#1A535C] mt-1">Please enter your credentials to enable admin options.</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-semibold">
                {loginError && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-xl text-center font-bold">
                    {loginError}
                  </div>
                )}
                <div>
                  <label className="block uppercase tracking-wider mb-1">Admin ID</label>
                  <input
                    type="text"
                    required
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="Enter Admin ID"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] bg-white text-sm focus:outline-none focus:border-[#C8A35F]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D8] bg-white text-sm focus:outline-none focus:border-[#C8A35F]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#0F382C] text-[#FAF8F5] font-bold rounded-full hover:bg-[#1A535C] transition-colors mt-2 text-sm"
                >
                  Verify Access
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
