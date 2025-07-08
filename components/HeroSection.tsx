'use client';

import { useEffect } from 'react';

export default function HeroSection() {
  // Voice Command: Scroll to register
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    const handleVoice = () => {
      recognition.start();
      recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase();
        if (command.includes('join now')) {
          const section = document.getElementById('registerSection');
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        }
      };
    };

    const btn = document.getElementById('voiceJoinBtn');
    if (btn) btn.addEventListener('click', handleVoice);
    return () => {
      if (btn) btn.removeEventListener('click', handleVoice);
    };
  }, []);

  return (
    <section className="w-full px-4 pt-4">
      {/* Hero Card */}
      <div
        className="rounded-xl overflow-hidden relative shadow-lg flex flex-col md:flex-row items-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/ehb-launch-banner.png')", // Place your image in /public
          minHeight: '320px',
        }}
      >
        <div className="w-full h-full backdrop-blur-sm bg-black/40 text-white p-6 flex flex-col justify-center text-center md:text-left md:w-2/3">
          <h2 className="text-base uppercase text-blue-300">Welcome to EHB</h2>
          <h1 className="text-3xl font-bold leading-tight">
            A Gateway to Verified Global Services
          </h1>
          <p className="mt-2 text-sm max-w-lg mx-auto md:mx-0">
            Explore 150+ services across Education, Health, Business, and AI. Join 45K+ users
            worldwide.
          </p>
          <div className="flex gap-2 mt-4 justify-center md:justify-start">
            <span className="bg-purple-600 px-3 py-1 rounded-full text-xs">SQL Verified</span>
            <span className="bg-yellow-600 px-3 py-1 rounded-full text-xs">Blockchain Future</span>
          </div>
        </div>
      </div>
      {/* Join Button */}
      <div className="mt-4 flex justify-center md:justify-start">
        <button
          id="voiceJoinBtn"
          title="This is your first step toward verified services"
          className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition"
          onClick={() => {
            const section = document.getElementById('registerSection');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          🚀 Join Now
        </button>
      </div>
    </section>
  );
}
