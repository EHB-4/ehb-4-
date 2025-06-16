'use client';

import { useSession } from 'next-auth/react';
import AIChatWidget from '@/components/ai/AIChatWidget';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to EHB Next.js</h1>
    </main>
  );
} 