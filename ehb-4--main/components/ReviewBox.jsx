import React from 'react';

/**
 * ReviewBox Component
 * Props:
 * - reviews: Array of review objects (reviewer_name, reviewer_type, rating, comment, date, verified, sql_level, flagged)
 * - showStars: Boolean (show star rating)
 * - limit: Number (optional, how many reviews to show)
 * - reviewerType: String (User, Franchise, Lawyer) (optional, for filtering/tag)
 */

function getStarIcons(rating) {
  // Returns array of star SVGs (full, half, empty)
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<svg key={i} className="h-5 w-5 text-yellow-400 inline" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>);
    } else if (rating >= i - 0.5) {
      stars.push(<svg key={i} className="h-5 w-5 text-yellow-400 inline" fill="currentColor" viewBox="0 0 20 20"><defs><linearGradient id={`half${i}`}><stop offset="50%" stopColor="#facc15"/><stop offset="50%" stopColor="#e5e7eb"/></linearGradient></defs><path fill={`url(#half${i})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>);
    } else {
      stars.push(<svg key={i} className="h-5 w-5 text-gray-300 inline" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>);
    }
  }
  return stars;
}

const sortReviews = (reviews, sortBy = 'recent') => {
  if (sortBy === 'top') {
    return [...reviews].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'low') {
    return [...reviews].sort((a, b) => a.rating - b.rating);
  }
  // Default: most recent
  return [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
};

const ReviewBox = ({ reviews = [], showStars = true, limit, reviewerType, sortBy = 'recent' }) => {
  // Only show verified and not flagged reviews
  const filtered = reviews.filter(r => r.verified && !r.flagged && (!reviewerType || r.reviewer_type === reviewerType));
  const sorted = sortReviews(filtered, sortBy);
  const displayReviews = limit ? sorted.slice(0, limit) : sorted;

  return (
    <section className="my-6" itemScope itemType="https://schema.org/Review">
      <h3 className="text-xl font-bold mb-4" itemProp="name">Client Testimonials</h3>
      <meta name="keywords" content="Lawyer reviews, Public legal service feedback, Verified testimonials" />
      <div className="grid gap-4 md:grid-cols-2">
        {displayReviews.length === 0 && <div className="text-gray-500">No reviews yet.</div>}
        {displayReviews.map((r, idx) => (
          <article
            key={idx}
            className={`border p-4 rounded-lg shadow-sm bg-white flex flex-col gap-2 ${r.sql_level === 'VIP' ? 'border-yellow-400' : 'border-gray-200'}`}
            itemScope
            itemType="https://schema.org/Review"
          >
            {/* Reviewer Name & Type */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900" itemProp="author" itemScope itemType="https://schema.org/Person">{r.reviewer_name}</span>
              <span className="ml-2 px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">{r.reviewer_type}</span>
              {r.sql_level === 'VIP' && <span className="ml-2 px-2 py-0.5 rounded text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-300">VIP</span>}
              {r.rating < 2 && <span className="ml-2 px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-700 border border-red-300">Reported</span>}
            </div>
            {/* Comment */}
            <div className="text-gray-700 mb-1" itemProp="reviewBody">{r.comment}</div>
            {/* Stars & Date */}
            <div className="flex items-center gap-2 mt-auto">
              {showStars && (
                <span className="flex items-center" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                  {getStarIcons(r.rating)}
                  <meta itemProp="ratingValue" content={r.rating} />
                  <meta itemProp="bestRating" content="5" />
                </span>
              )}
              <span className="text-xs text-gray-400 ml-auto" itemProp="datePublished">{new Date(r.date).toLocaleDateString()}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ReviewBox; 