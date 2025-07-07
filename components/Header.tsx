'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Mic, Bell, ShoppingCart, User, Menu } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Voice Command to open modal
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    const triggerVoice = () => {
      recognition.start();
      recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase();
        if (command.includes('open jps')) setShowModal(true);
      };
    };

    const btn = document.getElementById('voiceBtn');
    if (btn) btn.addEventListener('click', triggerVoice);
    return () => {
      if (btn) btn.removeEventListener('click', triggerVoice);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b shadow-sm">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo - Left */}
        <div
          className="text-xl font-bold text-blue-700 whitespace-nowrap cursor-pointer"
          title="Go to EHB Home Page"
        >
          <Link href="/">EHB | EDUCATION HEALTH BUSINESS</Link>
        </div>
        {/* Search - Center */}
        <div className="hidden md:block w-1/2">
          <input
            type="text"
            placeholder="Search services, products, departments..."
            className="w-full px-4 py-2 rounded-md border dark:bg-gray-800"
            aria-label="Search"
          />
        </div>
        {/* Icons - Right */}
        <div className="hidden md:flex items-center gap-4">
          <Bell size={20} aria-label="Notifications" />
          <ShoppingCart size={20} aria-label="Cart" />
          <User size={20} aria-label="Profile" />
          <button id="voiceBtn" aria-label="Voice Command">
            <Mic size={20} />
          </button>
          {/* JPS Access Card */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full shadow hover:scale-105 transition"
            aria-label="Access JPS"
          >
            🔑 JPS Access
          </button>
        </div>
        {/* Hamburger on Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenu(!mobileMenu)} aria-label="Open Menu">
            <Menu size={24} />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden px-4 pb-2 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-md border dark:bg-gray-800"
            aria-label="Search"
          />
          <button className="flex items-center gap-2" onClick={() => setShowModal(true)}>
            🔑 Access JPS
          </button>
        </div>
      )}
      {/* Login/Register Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded shadow-lg">
            <Dialog.Title className="text-lg font-bold mb-2">🔐 Access JPS</Dialog.Title>
            <p className="text-sm text-gray-500 mb-4">Please login or register to continue.</p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                className="px-3 py-2 rounded border"
                aria-label="Email"
              />
              <input
                type="password"
                placeholder="Password"
                className="px-3 py-2 rounded border"
                aria-label="Password"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
                Login
              </button>
              <Link href="/auth/register" className="text-blue-600 text-sm hover:underline">
                Don't have an account? Register
              </Link>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </header>
  );
}
