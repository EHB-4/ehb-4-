'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error, reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <h2>⚠️ Koi error aa gaya hai!</h2>
        <p>{error.message}</p>
        <button onClick={() => reset()}>🔁 Dobara koshish karo</button>
      </body>
    </html>
  );
} 