"use client";

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Mic,
  Send,
  X,
  Brain,
  FileText,
  Camera,
  MapPin,
  ChevronUp,
  ChevronDown,
  Loader2,
} from 'lucide-react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hello! I'm your EHB AI Assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      message: message.trim(),
      timestamp: new Date(),
    };

    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot' as const,
        message:
          "Thank you for your message! I'm here to help you with EHB services, complaints, or any questions you might have.",
        timestamp: new Date(),
      };
      setChatHistory(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsListening(true);
      // Voice recognition logic would go here
      setTimeout(() => {
        setIsListening(false);
        setMessage('Voice input received');
      }, 3000);
    } else {
      alert('Voice input is not supported in this browser');
    }
  };

  const handleComplaint = () => {
    const complaintMessage = {
      id: Date.now(),
      type: 'bot',
      message:
        "I can help you submit a complaint. Please describe your issue and I'll guide you through the process.",
      timestamp: new Date(),
    };
    setChatHistory(prev => [...prev, complaintMessage]);
  };

  const handleProductScan = () => {
    const scanMessage = {
      id: Date.now(),
      type: 'bot',
      message:
        'Product scanning feature is available. You can upload an image or use your camera to scan product QR codes.',
      timestamp: new Date(),
    };
    setChatHistory(prev => [...prev, scanMessage]);
  };

  const handleLocationService = () => {
    const locationMessage = {
      id: Date.now(),
      type: 'bot',
      message:
        'I can help you find nearby EHB services, franchise locations, or track your orders. What would you like to locate?',
      timestamp: new Date(),
    };
    setChatHistory(prev => [...prev, locationMessage]);
  };

  return (
    <>
      {/* Chatbot Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#2452FF] hover:bg-[#8B3DFF] text-white p-4 rounded-full shadow-lg transition-colors"
        aria-label="AI Assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Chatbot Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2452FF] to-[#8B3DFF] text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">EHB AI Assistant</h3>
                    <p className="text-sm opacity-90">Always here to help</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    {isMinimized ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Chat Content */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '400px' }}
                  exit={{ height: 0 }}
                  className="flex flex-col"
                >
                  {/* Quick Actions */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleComplaint}
                        className="flex items-center space-x-2 p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">Complaint</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleProductScan}
                        className="flex items-center space-x-2 p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Camera className="h-4 w-4" />
                        <span className="text-sm">Scan Product</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLocationService}
                        className="flex items-center space-x-2 p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">Find Service</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMessage('Help me with EHB services')}
                        className="flex items-center space-x-2 p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        <Brain className="h-4 w-4" />
                        <span className="text-sm">AI Help</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-64">
                    {chatHistory.map(chat => (
                      <motion.div
                        key={chat.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs p-3 rounded-lg ${
                            chat.type === 'user'
                              ? 'bg-[#2452FF] text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{chat.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {chat.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-gray-100 text-gray-800 max-w-xs p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">AI is typing...</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Input Area */}
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleVoiceInput}
                        className={`p-2 rounded-full transition-colors ${
                          isListening
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Mic className="h-4 w-4" />
                      </motion.button>
                      <input
                        type="text"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2452FF] focus:border-transparent"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="p-2 bg-[#2452FF] text-white rounded-lg hover:bg-[#8B3DFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
