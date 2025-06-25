'use client';

import React from 'react';

// Minimal static company info for roadmap
const mission = {
  title: 'Our Mission',
  text: 'To deliver innovative, reliable, and scalable technology solutions that empower businesses and individuals worldwide.',
};

const vision = {
  title: 'Our Vision',
  text: 'To be a global leader in technology, setting standards for excellence, integrity, and impact.',
};

const coreValues = [
  { title: 'Integrity', text: 'We uphold the highest standards of integrity in all our actions.' },
  {
    title: 'Teamwork',
    text: 'We work together, across boundaries, to meet the needs of our customers.',
  },
  {
    title: 'Accountability',
    text: 'We are personally accountable for delivering on our commitments.',
  },
  { title: 'Innovation', text: 'We foster innovation to drive growth and success.' },
  {
    title: 'Customer Focus',
    text: 'We value our customers and strive to exceed their expectations.',
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo-placeholder.svg" alt="EHB Logo" className="h-10 w-auto mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">EHB Company Roadmap</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Mission Section */}
        <section className="mb-16 p-8 bg-white rounded-xl shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center mb-4">
            <span className="text-4xl text-blue-500 mr-4">🎯</span>
            <h2 className="text-4xl font-extrabold text-gray-900">{mission.title}</h2>
          </div>
          <p className="text-lg leading-relaxed">{mission.text}</p>
        </section>

        {/* Vision Section */}
        <section className="mb-16 p-8 bg-white rounded-xl shadow-lg border-l-4 border-purple-500">
          <div className="flex items-center mb-4">
            <span className="text-4xl text-purple-500 mr-4">👁️</span>
            <h2 className="text-4xl font-extrabold text-gray-900">{vision.title}</h2>
          </div>
          <p className="text-lg leading-relaxed">{vision.text}</p>
        </section>

        {/* Core Values Section */}
        <section>
          <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={value.title}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-start"
              >
                <div className="flex-shrink-0 text-3xl text-green-500 mr-4 mt-1">💡</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{value.title}</h3>
                  <p className="text-md">{value.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
