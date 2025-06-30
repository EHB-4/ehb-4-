import React from 'react';

/**
 * LawyerCard Component
 * Props:
 * - name: string
 * - specialty: string
 * - license: string
 * - city: string
 * - rating: number (1-5)
 * - sql_level: string (Free, Basic, Normal, High, VIP)
 * - verified_by: array of strings (e.g., ["PSS", "EDR"])
 */

const sqlLevelColors = {
  Free: 'bg-gray-300 text-gray-800',
  Basic: 'bg-blue-200 text-blue-800',
  Normal: 'bg-green-200 text-green-800',
  High: 'bg-yellow-200 text-yellow-800',
  VIP: 'bg-purple-200 text-purple-800',
};

const LawyerCard = ({
  name,
  specialty,
  license,
  city,
  rating,
  sql_level = 'Free',
  verified_by = [],
}) => {
  return (
    <article className="rounded-lg shadow-md bg-white p-6 flex flex-col gap-3 max-w-md mx-auto" itemScope itemType="https://schema.org/LegalService">
      {/* SEO Heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-1" itemProp="name">
        {name} - Verified Legal Expert in {city}
      </h2>
      {/* SQL Level Badge */}
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${sqlLevelColors[sql_level] || sqlLevelColors['Free']}`}
        title={`SQL Level: ${sql_level}`}
        alt={`SQL Level: ${sql_level}`}
        itemProp="award"
      >
        {sql_level}
      </span>
      {/* Specialty & License */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
        <span className="text-gray-700 font-medium" itemProp="legalName">{specialty}</span>
        <span className="text-gray-400 text-xs">|</span>
        <span className="text-gray-500 text-xs">Bar License: <span itemProp="identifier">{license}</span></span>
      </div>
      {/* Location */}
      <div className="text-gray-600 text-sm" itemProp="address">{city}</div>
      {/* Star Rating */}
      <div className="flex items-center mt-1" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
        {[1,2,3,4,5].map((i) => (
          <svg key={i} className={`h-5 w-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <title>{i <= rating ? 'Filled star' : 'Empty star'}</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
          </svg>
        ))}
        <meta itemProp="ratingValue" content={rating} />
        <meta itemProp="bestRating" content="5" />
      </div>
      {/* Verified By */}
      <div className="flex gap-2 mt-2">
        {verified_by.map((v) => (
          <span key={v} className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold border border-green-300" title={`Verified by ${v}`}>{v}</span>
        ))}
      </div>
      {/* View Profile Button */}
      <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow" aria-label={`View profile of ${name}`}>View Profile</button>
    </article>
  );
};

export default LawyerCard; 