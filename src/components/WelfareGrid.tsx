import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WelfareItem, welfareInitiatives } from '../data/welfare';
import {
  Building2,
  Users,
  Sparkles,
  ArrowUpRight,
  X,
  Tag,
  Image as ImageIcon,
  CheckCircle2,
} from 'lucide-react';

interface WelfareGridProps {
  items?: WelfareItem[];
}

export const WelfareGrid: React.FC<WelfareGridProps> = ({ 
  items = welfareInitiatives,
}) => {
  const [selectedWelfare, setSelectedWelfare] = useState<WelfareItem | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Take the primary single social initiative
  const initiative = items[0] || welfareInitiatives[0];

  return (
    <section id="welfare" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#E8E2D8] relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8A35F] font-bold">
              Institutional Social Action
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F382C] mt-1 mb-4">
            Social Initiative & Partnerships
          </h2>
          <p className="text-base text-[#1A535C]/80">
            Empowering youth across Mumbai through strategic educational drives, civic leadership forums, and diplomatic simulations.
          </p>
          <div className="gold-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* Featured Single Initiative Card */}
        {initiative && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#FAF8F5] rounded-3xl border-2 border-[#C8A35F]/40 overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 relative group"
          >
            {/* Header Accent Bar */}
            <div className="h-2 w-full bg-gradient-to-r from-[#0F382C] via-[#C8A35F] to-[#0F382C]" />

            <div className="p-8 sm:p-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E8E2D8]">
                {/* School & Partner Info */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9E7C3B] uppercase tracking-wider mb-2">
                    <Building2 size={16} className="text-[#C8A35F]" />
                    <span>{initiative.school_name}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F382C] leading-snug">
                    {initiative.project_title}
                  </h3>
                </div>

                {/* Impact Metric Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#C8A35F]/60 font-bold text-xs text-[#0F382C] shadow-sm shrink-0 self-start md:self-auto">
                  <Sparkles size={14} className="text-[#C8A35F]" />
                  <span>{initiative.impact_metrics}</span>
                </div>
              </div>

              {/* Tags */}
              {initiative.partner_tags && initiative.partner_tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {initiative.partner_tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-full bg-white border border-[#E8E2D8] text-xs font-semibold text-[#1A535C] flex items-center gap-1.5"
                    >
                      <Tag size={12} className="text-[#C8A35F]" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Initiative Narrative */}
              <p className="text-sm sm:text-base text-[#1A535C]/90 leading-relaxed mb-8">
                {initiative.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-[#E8E2D8]/70">
                <button
                  onClick={() => setSelectedWelfare(initiative)}
                  className="w-full sm:w-auto px-6 py-3 bg-[#0F382C] text-[#FAF8F5] font-semibold text-xs rounded-full hover:bg-[#1A535C] transition-all flex items-center justify-center gap-2 shadow-sm group/btn"
                >
                  <span>View Initiative Dossier & Details</span>
                  <ArrowUpRight size={15} className="text-[#C8A35F] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-2 text-xs text-[#9E7C3B] font-medium">
                  <CheckCircle2 size={15} className="text-[#C8A35F]" />
                  <span>Active Institutional Partnership</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
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
                aria-label="Close dossier"
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

              {/* Hero Image if available */}
              {selectedWelfare.cover_image && selectedWelfare.cover_image !== '/images/logo.png' && (
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-[#C8A35F] transition-colors"
                aria-label="Close image preview"
              >
                <X size={28} />
              </button>
              <img
                src={lightboxImage}
                alt="Enlarged preview"
                className="max-w-full max-h-[85vh] object-contain rounded-xl border border-white/20 shadow-2xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
