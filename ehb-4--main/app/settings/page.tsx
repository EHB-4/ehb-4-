import React, { useState } from 'react';

// Placeholder settings data (in a real app, fetch from backend)
const settingsData = {
  notifications: true,
  language: 'en',
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(settingsData);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send settings to backend here
    setSuccess('Settings updated successfully!');
    setError('');
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      {success && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">{success}</div>}
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Notifications</label>
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
            className="mt-1"
            aria-label="Enable notifications"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Language</label>
          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            aria-label="Select language"
          >
            <option value="en">English</option>
            <option value="ur">Urdu</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </form>
      {/* AI Guidance: In a real app, this page fetches user settings from the backend and allows updating. */}
    </div>
  );
} 