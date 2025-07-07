'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Scene3D, Interactive3DCard, Loading3D } from '@/components/ui/3d-scene'
import { ColorPicker, ColorPalette, ColorSwatch } from '@/components/ui/color-picker'
import { AIImageGenerator, AIImageGallery } from '@/components/ui/ai-image-generator'
import { 
  Palette, 
  Box, 
  Wand2, 
  BarChart3, 
  Layers, 
  Sparkles,
  ArrowRight,
  Star,
  Zap,
  Globe
} from 'lucide-react'

export default function UIShowcasePage() {
  const [selectedColor, setSelectedColor] = useState('#3B82F6')
  const [progressValue, setProgressValue] = useState(65)
  const [generatedImages, setGeneratedImages] = useState([
    {
      id: '1',
      url: 'https://picsum.photos/400/400?random=1',
      prompt: 'Beautiful sunset over mountains',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      url: 'https://picsum.photos/400/400?random=2',
      prompt: 'Futuristic city skyline',
      createdAt: '2024-01-14'
    }
  ])

  const handleImageGenerated = (imageUrl: string) => {
    const newImage = {
      id: Date.now().toString(),
      url: imageUrl,
      prompt: 'AI Generated Image',
      createdAt: new Date().toISOString().split('T')[0]
    }
    setGeneratedImages(prev => [newImage, ...prev])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold text-white">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                EHB
              </span>
              {' '}UI Showcase
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              World-class frontend development tools and components for creating stunning, 
              modern, and interactive user interfaces
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600">
                <Sparkles className="w-5 h-5 mr-2" />
                Explore Components
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white/20">
                <ArrowRight className="w-5 h-5 mr-2" />
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 3D Graphics */}
          <Card variant="glass" className="backdrop-blur-md">
            <CardHeader>
                             <CardTitle className="flex items-center gap-2">
                 <Box className="w-5 h-5 text-blue-400" />
                 3D Graphics
               </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Interactive 3D scenes with React Three Fiber
              </p>
              <div className="h-48 rounded-lg overflow-hidden">
                <Scene3D />
              </div>
            </CardContent>
          </Card>

          {/* AI Image Generation */}
          <Card variant="glass" className="backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-purple-400" />
                AI Image Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Generate stunning images with AI
              </p>
              <AIImageGenerator 
                onImageGenerated={handleImageGenerated}
                className="max-w-none"
              />
            </CardContent>
          </Card>

          {/* Color Tools */}
          <Card variant="glass" className="backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-pink-400" />
                Color Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Advanced color picker and palettes
              </p>
              <ColorPicker 
                value={selectedColor}
                onChange={setSelectedColor}
                className="max-w-none"
              />
            </CardContent>
          </Card>

          {/* Modern Buttons */}
          <Card variant="glass" className="backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Modern Buttons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="gradient">Gradient</Button>
                <Button variant="glass">Glass</Button>
                <Button variant="neon">Neon</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </CardContent>
          </Card>

          {/* Progress Indicators */}
          <Card variant="glass" className="backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                Progress Indicators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Default Progress</span>
                  <span>{progressValue}%</span>
                </div>
                <Progress value={progressValue} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Gradient Progress</span>
                  <span>75%</span>
                </div>
                <Progress value={75} variant="gradient" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Neon Progress</span>
                  <span>90%</span>
                </div>
                <Progress value={90} variant="neon" />
              </div>
            </CardContent>
          </Card>

          {/* Interactive 3D Card */}
          <Card variant="glass" className="backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                3D Interactive Card
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Interactive3DCard
                title="Interactive 3D"
                description="Hover and interact with 3D elements"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Generated Gallery */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            AI Generated Gallery
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore images generated by our AI system
          </p>
        </div>
        <AIImageGallery 
          images={generatedImages}
          className="max-w-6xl mx-auto"
        />
      </div>

      {/* Color Palettes */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Color Palettes
          </h2>
          <p className="text-gray-300">
            Beautiful color combinations for your designs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card variant="glass" className="backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Modern Palette</CardTitle>
            </CardHeader>
            <CardContent>
              <ColorPalette 
                colors={['#3B82F6', '#8B5CF6', '#EC4899', '#EF4444', '#F59E0B']}
                onColorSelect={setSelectedColor}
              />
            </CardContent>
          </Card>
          <Card variant="glass" className="backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Pastel Palette</CardTitle>
            </CardHeader>
            <CardContent>
              <ColorPalette 
                colors={['#FECACA', '#FED7AA', '#FEF3C7', '#D1FAE5', '#DBEAFE']}
                onColorSelect={setSelectedColor}
              />
            </CardContent>
          </Card>
          <Card variant="glass" className="backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Neon Palette</CardTitle>
            </CardHeader>
            <CardContent>
              <ColorPalette 
                colors={['#00FF88', '#00FFFF', '#FF00FF', '#FFFF00', '#FF0088']}
                onColorSelect={setSelectedColor}
              />
            </CardContent>
          </Card>
          <Card variant="glass" className="backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Selected Color</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <ColorSwatch color={selectedColor} size="lg" />
                <span className="text-white font-mono">{selectedColor}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">Powered by EHB</span>
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-gray-400">
            World-class frontend development tools and components
          </p>
        </div>
      </div>
    </div>
  )
} 