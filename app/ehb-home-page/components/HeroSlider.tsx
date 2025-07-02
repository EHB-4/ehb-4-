"use client";

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Users,
  Award,
  MapPin,
  Share2,
  TrendingUp,
  Shield,
  BookOpen,
  Briefcase,
} from 'lucide-react';

const userImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
];
const franchiseImages = [
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
];
const affiliateImages = [
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
];

function useSlideshow(images) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, [images]);
  return images[idx];
}

export default function HeroSlider() {
  const userImg = useSlideshow(userImages);
  const franchiseImg = useSlideshow(franchiseImages);
  const affiliateImg = useSlideshow(affiliateImages);

  return (
    <section className="w-full px-4 mt-8">
      <div className="grid md:grid-cols-2 gap-4 w-full">
        {/* Big Card: What You Get as a User */}
        <div
          className="md:col-span-2 h-[280px] relative rounded-xl overflow-hidden shadow-lg group"
          style={{
            backgroundImage: `url(${userImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          title="Auto-generated images based on card content"
          tabIndex={0}
          aria-label="What You Get as a User"
        >
          <div className="bg-black/40 h-full w-full flex flex-col justify-between p-5 text-white">
            <div>
              <h2 className="text-lg font-bold mb-1">What You Get as a User</h2>
              <ul className="text-sm list-disc list-inside">
                <li>Save up to 80% via Verified Services</li>
                <li>AI-learning, remote jobs, verified shops</li>
                <li>Upgrade your SQL level for global access</li>
              </ul>
            </div>
            <a
              href="/benefits"
              className="bg-blue-600 hover:bg-blue-700 mt-3 w-fit px-4 py-2 text-xs rounded-full transition"
            >
              See Benefits
            </a>
          </div>
        </div>
        {/* Small Card: Franchise */}
        <div
          className="h-[200px] relative rounded-xl overflow-hidden shadow-lg group"
          style={{
            backgroundImage: `url(${franchiseImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          title="Auto-generated images based on card content"
          tabIndex={0}
          aria-label="Own a Franchise, Control a Region"
        >
          <div className="bg-black/40 h-full w-full flex flex-col justify-between p-5 text-white">
            <div>
              <h2 className="text-base font-bold mb-1">Own a Franchise, Control a Region</h2>
              <ul className="text-xs list-disc list-inside">
                <li>Earn from orders, services, complaints</li>
                <li>Sub, Master, Corporate Franchise Tiers</li>
                <li>Real-time earnings dashboard</li>
              </ul>
            </div>
            <a
              href="/franchise"
              className="bg-orange-600 hover:bg-orange-700 mt-3 w-fit px-4 py-2 text-xs rounded-full transition"
            >
              Franchise Info
            </a>
          </div>
        </div>
        {/* Small Card: Affiliate */}
        <div
          className="h-[200px] relative rounded-xl overflow-hidden shadow-lg group"
          style={{
            backgroundImage: `url(${affiliateImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          title="Auto-generated images based on card content"
          tabIndex={0}
          aria-label="Refer & Earn with EHB"
        >
          <div className="bg-black/40 h-full w-full flex flex-col justify-between p-5 text-white">
            <div>
              <h2 className="text-base font-bold mb-1">Refer & Earn with EHB</h2>
              <ul className="text-xs list-disc list-inside">
                <li>Verified by PSS, EMO, EDR, JPS</li>
                <li>Real-time updates, AI search, global expansion</li>
              </ul>
            </div>
            <a
              href="/affiliate"
              className="bg-purple-600 hover:bg-purple-700 mt-3 w-fit px-4 py-2 text-xs rounded-full transition"
            >
              Affiliate Info
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
