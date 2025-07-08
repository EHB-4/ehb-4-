import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, Float, Text3D, Center } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import * as THREE from 'three'

interface Scene3DProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

// Animated 3D Box Component
function AnimatedBox({ position = [0, 0, 0], color = '#00ff88' }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </Float>
  )
}

// Animated 3D Sphere Component
function AnimatedSphere({ position = [2, 0, 0], color = '#ff0088' }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </Float>
  )
}

// 3D Text Component
function AnimatedText({ text = "EHB", position = [0, 2, 0] }) {
  return (
    <Center position={position}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.2}
        curveSegments={12}
      >
        {text}
        <meshStandardMaterial color="#ffffff" />
      </Text3D>
    </Center>
  )
}

// Main 3D Scene Component
export function Scene3D({ children, className, style }: Scene3DProps) {
  return (
    <div className={`w-full h-full ${className}`} style={style}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={1} />

          {/* Environment */}
          <Environment preset="sunset" />

          {/* 3D Objects */}
          <AnimatedBox position={[-2, 0, 0]} color="#00ff88" />
          <AnimatedSphere position={[2, 0, 0]} color="#ff0088" />
          <AnimatedText text="EHB" position={[0, 2, 0]} />

          {/* Custom Children */}
          {children}

          {/* Controls */}
          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Interactive 3D Card Component
export function Interactive3DCard({ 
  title, 
  description, 
  className 
}: { 
  title: string
  description: string
  className?: string 
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <Scene3D className="h-64">
        <AnimatedBox position={[0, 0, 0]} color="#3b82f6" />
      </Scene3D>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <h3 className="text-white text-xl font-bold">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>
      </div>
    </div>
  )
}

// 3D Loading Component
export function Loading3D() {
  return (
    <div className="w-full h-64 flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedBox position={[0, 0, 0]} color="#3b82f6" />
      </Canvas>
    </div>
  )
} 