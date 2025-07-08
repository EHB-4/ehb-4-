import React, { useState, useCallback } from 'react'
import { Button } from './button'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { Progress } from './progress'
import { cn } from '@/lib/utils'
import { 
  Wand2, 
  Download, 
  Share2, 
  Heart, 
  RefreshCw, 
  Image as ImageIcon,
  Sparkles,
  Palette,
  Camera
} from 'lucide-react'

interface AIImageGeneratorProps {
  className?: string
  onImageGenerated?: (imageUrl: string) => void
  apiKey?: string
}

interface GenerationStyle {
  id: string
  name: string
  description: string
  prompt: string
  icon: React.ReactNode
}

const generationStyles: GenerationStyle[] = [
  {
    id: 'realistic',
    name: 'Realistic',
    description: 'Photorealistic images',
    prompt: 'photorealistic, high quality, detailed',
    icon: <Camera className="w-4 h-4" />
  },
  {
    id: 'artistic',
    name: 'Artistic',
    description: 'Creative and artistic',
    prompt: 'artistic, creative, vibrant colors',
    icon: <Palette className="w-4 h-4" />
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    description: 'Magical and fantastical',
    prompt: 'fantasy, magical, ethereal',
    icon: <Sparkles className="w-4 h-4" />
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean and simple',
    prompt: 'minimalist, clean, simple',
    icon: <ImageIcon className="w-4 h-4" />
  }
]

export function AIImageGenerator({
  className,
  onImageGenerated,
  apiKey
}: AIImageGeneratorProps) {
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<GenerationStyle>(generationStyles[0])
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateImage = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setIsGenerating(true)
    setProgress(0)
    setError(null)

    try {
      // Simulate AI image generation process
      const fullPrompt = `${prompt}, ${selectedStyle.prompt}`
      
      // Progress simulation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000))

      clearInterval(progressInterval)
      setProgress(100)

      // Mock generated image URL (replace with actual AI service)
      const mockImageUrl = `https://picsum.photos/512/512?random=${Date.now()}`
      
      setGeneratedImage(mockImageUrl)
      onImageGenerated?.(mockImageUrl)

    } catch (err) {
      setError('Failed to generate image. Please try again.')
    } finally {
      setIsGenerating(false)
      setProgress(0)
    }
  }, [prompt, selectedStyle, onImageGenerated])

  const downloadImage = useCallback(async () => {
    if (!generatedImage) return

    try {
      const response = await fetch(generatedImage)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ai-generated-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      setError('Failed to download image')
    }
  }, [generatedImage])

  const shareImage = useCallback(async () => {
    if (!generatedImage) return

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'AI Generated Image',
          text: `Check out this AI-generated image: ${prompt}`,
          url: generatedImage
        })
      } else {
        await navigator.clipboard.writeText(generatedImage)
        // Show toast notification
        alert('Image URL copied to clipboard!')
      }
    } catch (err) {
      setError('Failed to share image')
    }
  }, [generatedImage, prompt])

  return (
    <Card className={cn("w-full max-w-2xl", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5" />
          AI Image Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Style Selection */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Choose Style</h4>
          <div className="grid grid-cols-2 gap-3">
            {generationStyles.map((style) => (
              <button
                key={style.id}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all",
                  selectedStyle.id === style.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => setSelectedStyle(style)}
              >
                <div className="flex items-center gap-2 mb-2">
                  {style.icon}
                  <span className="font-medium">{style.name}</span>
                </div>
                <p className="text-xs text-gray-600">{style.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Input */}
        <div className="space-y-3">
          <label htmlFor="prompt" className="text-sm font-medium">
            Describe your image
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A beautiful sunset over mountains with purple clouds..."
            className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isGenerating}
          />
        </div>

        {/* Generate Button */}
        <Button
          onClick={generateImage}
          disabled={isGenerating || !prompt.trim()}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Image
            </>
          )}
        </Button>

        {/* Progress Bar */}
        {isGenerating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Generating image...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} variant="gradient" />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Generated Image */}
        {generatedImage && (
          <div className="space-y-4">
            <div className="relative group">
              <img
                src={generatedImage}
                alt="AI Generated"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={downloadImage}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={shareImage}
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                >
                  <Heart className="w-4 h-4 mr-1" />
                  Like
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setGeneratedImage(null)
                  setPrompt('')
                }}
              >
                Generate Another
              </Button>
              <Button
                variant="outline"
                onClick={downloadImage}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// AI Image Gallery Component
export function AIImageGallery({ 
  images, 
  onImageSelect,
  className 
}: { 
  images: Array<{ id: string; url: string; prompt: string; createdAt: string }>
  onImageSelect?: (image: any) => void
  className?: string 
}) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", className)}>
      {images.map((image) => (
        <div
          key={image.id}
          className="group cursor-pointer"
          onClick={() => onImageSelect?.(image)}
        >
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <img
              src={image.url}
              alt={image.prompt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p className="text-white text-xs line-clamp-2">{image.prompt}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 