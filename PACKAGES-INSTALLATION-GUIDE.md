# 📦 EHB Packages Installation Guide

## ✅ Successfully Installed Packages

### 🎨 **Bannerbear SDK** - For Banners/Videos

```bash
npm install bannerbear
```

**Usage:**

```javascript
import Bannerbear from 'bannerbear';

const bb = new Bannerbear('YOUR_API_KEY');

// Create a banner
const result = await bb.create_image({
  template: 'template_id',
  modifications: [
    {
      name: 'text',
      text: 'Hello World',
    },
  ],
});
```

### 🎭 **Framer Motion** - For Animations

```bash
npm install framer-motion
```

**Usage:**

```javascript
import { motion } from 'framer-motion';

function AnimatedComponent() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      Animated Content
    </motion.div>
  );
}
```

### 🎤 **Speech-to-Text** - For Voice Complaints

```bash
npm install speech-to-text react-hook-speech-to-text
```

**Usage:**

```javascript
import { useSpeechToText } from 'react-hook-speech-to-text';

function VoiceInput() {
  const { transcript, isListening, startListening, stopListening } = useSpeechToText();

  return (
    <div>
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? 'Stop' : 'Start'} Listening
      </button>
      <p>{transcript}</p>
    </div>
  );
}
```

### 🖼️ **Pexels API Wrapper** - For AI-Picked Stock Photos

```bash
npm install pexels-api-wrapper
```

**Usage:**

```javascript
import PexelsAPI from 'pexels-api-wrapper';

const pexelsClient = new PexelsAPI('YOUR_PEXELS_API_KEY');

// Search for photos
const result = await pexelsClient.search('nature', 1, 10);
console.log(result.photos);
```

### 🎨 **Canva Platform** - For Graphic Embeds

```bash
npm install @canva/platform
```

**Usage:**

```javascript
import { init } from '@canva/platform';

// Initialize Canva platform
await init({
  apiKey: 'YOUR_CANVA_API_KEY',
});

// Embed Canva designs
const design = await canva.design.getCurrentDesign();
```

## 🚀 Quick Start Examples

### 1. **Banner Creation with Bannerbear**

```javascript
// components/BannerCreator.jsx
import { useState } from 'react';
import Bannerbear from 'bannerbear';

export function BannerCreator() {
  const [bannerUrl, setBannerUrl] = useState('');

  const createBanner = async () => {
    const bb = new Bannerbear(process.env.NEXT_PUBLIC_BANNERBEAR_API_KEY);

    try {
      const result = await bb.create_image({
        template: 'your_template_id',
        modifications: [
          { name: 'title', text: 'EHB Next.js 04' },
          { name: 'subtitle', text: 'Amazing Project' },
        ],
      });

      setBannerUrl(result.image_url);
    } catch (error) {
      console.error('Banner creation failed:', error);
    }
  };

  return (
    <div>
      <button onClick={createBanner}>Create Banner</button>
      {bannerUrl && <img src={bannerUrl} alt="Generated Banner" />}
    </div>
  );
}
```

### 2. **Animated Components with Framer Motion**

```javascript
// components/AnimatedCard.jsx
import { motion } from 'framer-motion';

export function AnimatedCard({ children }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      {children}
    </motion.div>
  );
}
```

### 3. **Voice Input Component**

```javascript
// components/VoiceInput.jsx
import { useSpeechToText } from 'react-hook-speech-to-text';

export function VoiceInput({ onTranscriptChange }) {
  const { transcript, isListening, startListening, stopListening, error } = useSpeechToText({
    onResult: result => {
      onTranscriptChange(result.transcript);
    },
  });

  return (
    <div className="voice-input">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`px-4 py-2 rounded ${isListening ? 'bg-red-500' : 'bg-blue-500'} text-white`}
      >
        {isListening ? '🛑 Stop' : '🎤 Start'} Voice Input
      </button>

      {error && <p className="text-red-500">Error: {error}</p>}
      {transcript && <p className="mt-2">Transcript: {transcript}</p>}
    </div>
  );
}
```

### 4. **Stock Photo Gallery**

```javascript
// components/PhotoGallery.jsx
import { useState, useEffect } from 'react';
import PexelsAPI from 'pexels-api-wrapper';

export function PhotoGallery({ searchTerm = 'nature' }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const pexelsClient = new PexelsAPI(process.env.NEXT_PUBLIC_PEXELS_API_KEY);
        const result = await pexelsClient.search(searchTerm, 1, 12);
        setPhotos(result.photos);
      } catch (error) {
        console.error('Failed to fetch photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [searchTerm]);

  if (loading) return <div>Loading photos...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {photos.map(photo => (
        <img
          key={photo.id}
          src={photo.src.medium}
          alt={photo.alt}
          className="w-full h-48 object-cover rounded"
        />
      ))}
    </div>
  );
}
```

### 5. **Canva Design Embed**

```javascript
// components/CanvaEmbed.jsx
import { useEffect, useState } from 'react';
import { init } from '@canva/platform';

export function CanvaEmbed() {
  const [designUrl, setDesignUrl] = useState('');

  useEffect(() => {
    const initializeCanva = async () => {
      try {
        await init({
          apiKey: process.env.NEXT_PUBLIC_CANVA_API_KEY,
        });

        // Get current design
        const design = await canva.design.getCurrentDesign();
        setDesignUrl(design.url);
      } catch (error) {
        console.error('Canva initialization failed:', error);
      }
    };

    initializeCanva();
  }, []);

  return (
    <div>
      {designUrl && (
        <iframe src={designUrl} width="100%" height="600" frameBorder="0" allowFullScreen />
      )}
    </div>
  );
}
```

## 🔧 Environment Variables Setup

Create or update your `.env.local` file:

```env
# Bannerbear API Key
NEXT_PUBLIC_BANNERBEAR_API_KEY=your_bannerbear_api_key

# Pexels API Key
NEXT_PUBLIC_PEXELS_API_KEY=your_pexels_api_key

# Canva API Key
NEXT_PUBLIC_CANVA_API_KEY=your_canva_api_key
```

## 📋 API Keys Required

### 1. **Bannerbear API Key**

- Visit: https://app.bannerbear.com/
- Sign up and get your API key
- Use for creating banners and videos

### 2. **Pexels API Key**

- Visit: https://www.pexels.com/api/
- Sign up and get your API key
- Use for stock photos and videos

### 3. **Canva API Key**

- Visit: https://www.canva.dev/
- Sign up for Canva Apps SDK
- Get your API key for design embeds

## 🎯 Integration Examples

### **Complete EHB Dashboard with All Features**

```javascript
// pages/dashboard.jsx
import { AnimatedCard } from '../components/AnimatedCard';
import { BannerCreator } from '../components/BannerCreator';
import { VoiceInput } from '../components/VoiceInput';
import { PhotoGallery } from '../components/PhotoGallery';
import { CanvaEmbed } from '../components/CanvaEmbed';

export default function Dashboard() {
  const handleVoiceInput = transcript => {
    console.log('Voice input:', transcript);
    // Handle voice complaints or commands
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">EHB Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedCard>
          <h2 className="text-xl font-semibold mb-4">Voice Input</h2>
          <VoiceInput onTranscriptChange={handleVoiceInput} />
        </AnimatedCard>

        <AnimatedCard>
          <h2 className="text-xl font-semibold mb-4">Banner Creator</h2>
          <BannerCreator />
        </AnimatedCard>

        <AnimatedCard>
          <h2 className="text-xl font-semibold mb-4">Stock Photos</h2>
          <PhotoGallery searchTerm="business" />
        </AnimatedCard>

        <AnimatedCard>
          <h2 className="text-xl font-semibold mb-4">Canva Design</h2>
          <CanvaEmbed />
        </AnimatedCard>
      </div>
    </div>
  );
}
```

## 🚀 Next Steps

1. **Get API Keys**: Sign up for the required services
2. **Set Environment Variables**: Add your API keys to `.env.local`
3. **Test Components**: Try each component individually
4. **Integrate**: Add components to your existing pages
5. **Customize**: Modify components to match your design

## 📚 Additional Resources

- [Bannerbear Documentation](https://www.bannerbear.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Pexels API Documentation](https://www.pexels.com/api/)
- [Canva Apps SDK Documentation](https://www.canva.dev/)

---

**🎉 All packages are now installed and ready to use in your EHB Next.js 04 project!**
