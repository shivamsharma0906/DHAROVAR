'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Send, CheckCircle, Mail, MapPin, Building2, User } from 'lucide-react';

export const SocialsContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/dharovar_house/' },
  ];

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.organization.trim()) newErrors.organization = 'School or organization is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: `New Institutional Inquiry from ${formData.name}`,
          organization: formData.organization,
          message: formData.message,
          from_name: 'Dharovar House Website'
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setErrors({ submit: result.message || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      console.error('Inquiry submission error:', err);
      setErrors({ submit: 'Failed to connect to the mail server. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8A35F] font-bold">
            Connect & Collaborate
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F382C] mt-2 mb-4">
            Socials & Institutional Inquiry
          </h2>
          <p className="text-base text-[#1A535C]/80">
            For school partnerships, publication inquiries, or welfare collaboration across Mumbai.
          </p>
          <div className="gold-divider max-w-xs mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Socials & Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#FAF8F5] rounded-2xl p-8 border border-[#E8E2D8] shadow-soft">
              <h3 className="font-serif text-2xl font-bold text-[#0F382C] mb-4">
                Official Channels
              </h3>
              <p className="text-sm text-[#1A535C]/90 mb-6 leading-relaxed">
                Connect with our student delegates and leadership committee across official media channels.
              </p>

              {/* Social Pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-[#C8A35F] text-[#0F382C] text-xs font-semibold hover:bg-[#C8A35F] hover:text-white transition-all shadow-sm group"
                    >
                      <Icon size={16} className="text-[#C8A35F] group-hover:text-white transition-colors" />
                      <span>{social.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* Headquarters Details */}
              <div className="space-y-4 pt-6 border-t border-[#E8E2D8] text-xs text-[#1A535C]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#C8A35F]/30 flex items-center justify-center text-[#C8A35F]">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-[#0F382C]">Secretariat Headquarters</span>
                    <p className="text-[#1A535C]/70">Mumbai, Maharashtra, India</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#C8A35F]/30 flex items-center justify-center text-[#C8A35F]">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-[#0F382C]">Direct Institutional Email</span>
                    <p className="text-[#1A535C]/70">secretariat@dharovarhouse.org</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F5] rounded-2xl p-8 sm:p-10 border border-[#E8E2D8] shadow-soft">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#0F382C] text-[#C8A35F] flex items-center justify-center mx-auto mb-4 border-2 border-[#C8A35F]">
                    <CheckCircle size={36} />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-[#0F382C]">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-[#1A535C] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Dharovar House. Our executive committee will review your request and respond within 24 to 48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', organization: '', message: '' });
                    }}
                    className="mt-6 px-6 py-2.5 bg-[#0F382C] text-[#FAF8F5] text-xs font-semibold rounded-full hover:bg-[#1A535C] transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-serif text-2xl font-bold text-[#0F382C] mb-2">
                    Submit an Inquiry
                  </h3>

                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-[#0F382C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <User size={13} className="text-[#C8A35F]" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Sharma"
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[#0F382C] focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500' : 'border-[#E8E2D8] focus:border-[#C8A35F]'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-[#0F382C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Mail size={13} className="text-[#C8A35F]" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ananya@school.edu.in"
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[#0F382C] focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-[#E8E2D8] focus:border-[#C8A35F]'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  {/* School / Organization Input */}
                  <div>
                    <label htmlFor="organization" className="block text-xs font-bold text-[#0F382C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Building2 size={13} className="text-[#C8A35F]" />
                      School / Organization *
                    </label>
                    <input
                      type="text"
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Bombay International School"
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[#0F382C] focus:outline-none transition-colors ${
                        errors.organization ? 'border-red-500' : 'border-[#E8E2D8] focus:border-[#C8A35F]'
                      }`}
                    />
                    {errors.organization && <p className="text-xs text-red-500 mt-1">{errors.organization}</p>}
                  </div>

                  {/* Message Input */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-[#0F382C] uppercase tracking-wider mb-2">
                      Message / Proposal *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding your school partnership, welfare initiative, or publication request..."
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[#0F382C] focus:outline-none transition-colors ${
                        errors.message ? 'border-red-500' : 'border-[#E8E2D8] focus:border-[#C8A35F]'
                      }`}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  {errors.submit && (
                    <p className="text-sm text-red-500 text-center font-semibold bg-red-50 p-3 rounded-xl border border-red-200">
                      {errors.submit}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 bg-[#0F382C] text-[#FAF8F5] text-sm font-semibold rounded-full shadow-md hover:bg-[#1A535C] transition-all flex items-center justify-center gap-2 group ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    <span>{isSubmitting ? 'Submitting Inquiry...' : 'Submit Formal Inquiry'}</span>
                    {!isSubmitting && <Send size={16} className="group-hover:translate-x-1 transition-transform text-[#C8A35F]" />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
