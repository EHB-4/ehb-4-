"use client";

import { useEffect, useState } from 'react';

const activities = [
  'Ali from Lahore just joined EHB!',
  'Sara upgraded to VIP.',
  'New franchise opened in Karachi.',
  '45K+ users now verified.',
  'EHB AI answered 1,000+ questions today.',
  'New service: EHB Health launched.',
];

export default function LiveActivityFeed() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % activities.length), 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg animate-pulse">
      {activities[index]}
    </div>
  );
}
