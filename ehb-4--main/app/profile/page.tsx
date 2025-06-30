import React, { useState } from 'react';
import Link from 'next/link';

// Placeholder user data (in a real app, fetch from backend)
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
};

export default function ProfilePage() {
  const [user, setUser] = useState(userData);

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-lg">{user.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-lg">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <p className="mt-1 text-lg">{user.phone}</p>
          </div>
        </div>
        <div className="mt-6">
          <Link href="/profile/edit">
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
      {/* AI Guidance: In a real app, this page fetches user data from the backend and allows editing. */}
    </div>
  );
} 