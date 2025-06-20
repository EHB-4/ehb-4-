import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

export function HeroSection() {
  return (
    <div className="relative rounded-lg overflow-hidden h-96 flex items-center justify-center text-white bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-8">
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">EHB Platform: Your Digital Universe</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Discover a seamless ecosystem of services, from healthcare and finance to AI-powered tools
          and e-commerce.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
            <Link href="/services">Explore Services</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-blue-700"
          >
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-30"></div>
    </div>
  );
}
