import React from 'react';
import { MapComponent } from '../../lib/maps/google-maps';

export default function MapsDemoPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Google Maps Demo</h1>
      <p className="mb-4">This is a live demo of the Google Maps API integration in your project.</p>
      <MapComponent />
    </div>
  );
} 