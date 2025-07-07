import React from 'react';

/**
 * TailwindTestCard
 * Ek simple responsive card jo Tailwind CSS ki theme, dark mode, aur utility classes ka demo deta hai.
 */
const TailwindTestCard: React.FC = () => {
  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-card text-card-foreground rounded-lg shadow-lg border border-border transition-colors dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-2 text-primary">Tailwind Test Card</h2>
      <p className="mb-4 text-muted-foreground">
        Agar aap yeh card dekh rahe hain to Tailwind CSS sahi kaam kar raha hai!
        <br />
        <span className="font-semibold">Dark mode</span> aur{' '}
        <span className="font-semibold">theme colors</span> bhi active hain.
      </p>
      <button className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/80 transition">
        Test Button
      </button>
    </div>
  );
};

export default TailwindTestCard;
