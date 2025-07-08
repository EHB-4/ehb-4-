import React, { useState, useCallback } from 'react'
import { HexColorPicker, RgbaColorPicker, HslaColorPicker } from 'react-colorful'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { Card, CardContent, CardHeader, CardTitle } from './card'

interface ColorPickerProps {
  value?: string
  onChange?: (color: string) => void
  className?: string
  showAlpha?: boolean
  showPalette?: boolean
  format?: 'hex' | 'rgb' | 'hsl'
}

// Predefined color palettes
const colorPalettes = {
  modern: [
    '#3B82F6', '#8B5CF6', '#EC4899', '#EF4444', '#F59E0B',
    '#10B981', '#06B6D4', '#6366F1', '#F97316', '#84CC16'
  ],
  pastel: [
    '#FECACA', '#FED7AA', '#FEF3C7', '#D1FAE5', '#DBEAFE',
    '#E0E7FF', '#F3E8FF', '#FCE7F3', '#FEF2F2', '#FFFBEB'
  ],
  neon: [
    '#00FF88', '#00FFFF', '#FF00FF', '#FFFF00', '#FF0088',
    '#8800FF', '#0088FF', '#88FF00', '#FF8800', '#FF0080'
  ],
  grayscale: [
    '#000000', '#1A1A1A', '#333333', '#4D4D4D', '#666666',
    '#808080', '#999999', '#B3B3B3', '#CCCCCC', '#FFFFFF'
  ]
}

export function ColorPicker({
  value = '#3B82F6',
  onChange,
  className,
  showAlpha = false,
  showPalette = true,
  format = 'hex'
}: ColorPickerProps) {
  const [currentColor, setCurrentColor] = useState(value)
  const [selectedPalette, setSelectedPalette] = useState<'modern' | 'pastel' | 'neon' | 'grayscale'>('modern')

  const handleColorChange = useCallback((color: any) => {
    let colorString = ''
    
    if (format === 'hex') {
      colorString = typeof color === 'string' ? color : color.hex
    } else if (format === 'rgb') {
      const { r, g, b, a } = color
      colorString = a !== undefined ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`
    } else if (format === 'hsl') {
      const { h, s, l, a } = color
      colorString = a !== undefined ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`
    }
    
    setCurrentColor(colorString)
    onChange?.(colorString)
  }, [format, onChange])

  const handleFormatChange = useCallback((newFormat: 'hex' | 'rgb' | 'hsl') => {
    // Convert current color to new format
    if (newFormat !== format) {
      // For now, just reset to a default color when changing format
      const defaultColors = {
        hex: '#3B82F6',
        rgb: 'rgb(59, 130, 246)',
        hsl: 'hsl(217, 91%, 60%)'
      }
      setCurrentColor(defaultColors[newFormat])
      onChange?.(defaultColors[newFormat])
    }
  }, [format, onChange])

  const renderColorPicker = () => {
    if (format === 'hex') {
      return (
        <HexColorPicker
          color={currentColor}
          onChange={handleColorChange}
          className="w-full h-64"
        />
      )
    } else if (format === 'rgb') {
      return (
        <RgbaColorPicker
          color={{ r: 59, g: 130, b: 246, a: 1 }}
          onChange={handleColorChange}
          className="w-full h-64"
        />
      )
    } else if (format === 'hsl') {
      return (
        <HslaColorPicker
          color={{ h: 217, s: 91, l: 60, a: 1 }}
          onChange={handleColorChange}
          className="w-full h-64"
        />
      )
    }
  }

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Color Picker
          <div className="flex gap-2">
            <Button
              variant={format === 'hex' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFormatChange('hex')}
            >
              HEX
            </Button>
            <Button
              variant={format === 'rgb' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFormatChange('rgb')}
            >
              RGB
            </Button>
            <Button
              variant={format === 'hsl' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFormatChange('hsl')}
            >
              HSL
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Color Display */}
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-lg border-2 border-gray-200"
            style={{ backgroundColor: currentColor }}
          />
          <div className="flex-1">
            <input
              type="text"
              value={currentColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Color Picker */}
        <div className="flex justify-center">
          {renderColorPicker()}
        </div>

        {/* Color Palettes */}
        {showPalette && (
          <div className="space-y-3">
            <div className="flex gap-2">
              {Object.keys(colorPalettes).map((palette) => (
                <Button
                  key={palette}
                  variant={selectedPalette === palette ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPalette(palette as any)}
                >
                  {palette.charAt(0).toUpperCase() + palette.slice(1)}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {colorPalettes[selectedPalette].map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded border-2 border-gray-200 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recent Colors */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Recent Colors</h4>
          <div className="flex gap-2">
            {['#3B82F6', '#8B5CF6', '#EC4899', '#EF4444', '#F59E0B'].map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
                aria-label={`Select recent color ${color}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Color Palette Component
export function ColorPalette({ 
  colors, 
  onColorSelect,
  className 
}: { 
  colors: string[]
  onColorSelect?: (color: string) => void
  className?: string 
}) {
  return (
    <div className={cn("grid grid-cols-5 gap-2", className)}>
      {colors.map((color, index) => (
        <button
          key={index}
          className="w-8 h-8 rounded border-2 border-gray-200 hover:scale-110 transition-transform shadow-sm"
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect?.(color)}
          title={color}
        />
      ))}
    </div>
  )
}

// Color Swatch Component
export function ColorSwatch({ 
  color, 
  size = 'md',
  className 
}: { 
  color: string
  size?: 'sm' | 'md' | 'lg'
  className?: string 
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div
      className={cn(
        "rounded border border-gray-200 shadow-sm",
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: color }}
      title={color}
    />
  )
} 