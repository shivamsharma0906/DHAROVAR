import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WelfareGrid } from './components/WelfareGrid';
import { PublicationsGrid } from './components/PublicationsGrid';
import { SocialsContact } from './components/SocialsContact';
import { Footer } from './components/Footer';

import { welfareInitiatives } from './data/welfare';
import { publications } from './data/publications';

export function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

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
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] relative">
      <Navbar />
      <Hero />
      <About />
      <WelfareGrid 
        items={welfareInitiatives} 
        isAdminMode={isAdminMode} 
        onAdminControlsToggle={handleAdminControlsClick}
        onLogout={handleLogout}
      />
      <PublicationsGrid 
        items={publications} 
        isAdminMode={isAdminMode} 
        onAdminControlsToggle={handleAdminControlsClick}
        onLogout={handleLogout}
      />
      <SocialsContact />
      <Footer />

      {/* Global Notification Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#0F382C] text-[#C8A35F] border border-[#C8A35F] text-xs font-bold shadow-lg flex items-center gap-2"
          >
            <span>{toastMsg}</span>
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
    </div>
  );
}

export default App;
