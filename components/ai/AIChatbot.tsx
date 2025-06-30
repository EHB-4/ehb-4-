'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Send,
  Mic,
  MicOff,
  Paperclip,
  Image as ImageIcon,
  Video,
  File,
  Smile,
  MoreHorizontal,
  Settings,
  RefreshCw,
  Download,
  Share,
  Copy,
  Edit,
  Trash2,
  User,
  Bot,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  HelpCircle,
  FileText,
  Image,
  Music,
  Folder,
  FolderOpen,
  FolderPlus,
  FolderMinus,
  FolderX,
  FilePlus,
  FileMinus,
  FileX,
  FileCheck,
  FileSearch,
  FileEdit,
  FileCode,
  FileJson,
  FileCsv,
  FilePdf,
  FileWord,
  FileExcel,
  FilePowerpoint,
  FileArchive,
  FileAudio,
  FileVideo,
  FileImage,
  Database,
  Server,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudOff,
  CloudDrizzle,
  CloudFog,
  Sun,
  Moon,
  Star as StarIcon,
  Sunrise,
  Sunset,
  Thermometer,
  Droplets,
  Wind,
  Umbrella,
  Snowflake,
  Cloudy,
  PartlyCloudy,
  Clear,
  Rain,
  Thunderstorm,
  Fog,
  Haze,
  Dust,
  Sandstorm,
  Tornado,
  Hurricane,
  Earthquake,
  Volcano,
  Tsunami,
  Flood,
  Drought,
  Wildfire,
  Avalanche,
  Landslide,
  Sinkhole,
  Meteor,
  Comet,
  Asteroid,
  Planet,
  Galaxy,
  Universe,
  Telescope,
  Satellite,
  Rocket,
  SpaceShuttle,
  SpaceStation,
  Moon as MoonIcon,
  Mars,
  Venus,
  Mercury,
  Jupiter,
  Saturn,
  Uranus,
  Neptune,
  Pluto,
  Sun as SunIcon,
  Star as StarIcon2,
  Constellation,
  Zodiac,
  Horoscope,
  Astrology,
  Astronomy,
  Physics,
  Chemistry,
  Biology,
  Mathematics,
  Geometry,
  Algebra,
  Calculus,
  Statistics,
  Probability,
  Logic,
  Philosophy,
  Psychology,
  Sociology,
  Anthropology,
  Archaeology,
  History,
  Geography,
  Geology,
  Meteorology,
  Oceanography,
  Ecology,
  Botany,
  Zoology,
  Microbiology,
  Genetics,
  Evolution,
  Medicine,
  Healthcare,
  Hospital,
  Doctor,
  Nurse,
  Patient,
  Ambulance,
  FirstAid,
  Bandage,
  Pill,
  Syringe,
  Stethoscope,
  Thermometer as ThermometerIcon,
  Heart as HeartIcon,
  Brain,
  Eye as EyeIcon,
  Ear,
  Nose,
  Mouth,
  Tooth,
  Bone,
  Muscle,
  Skin,
  Hair,
  Nail,
  Blood,
  Dna,
  Cell,
  Virus,
  Bacteria,
  Parasite,
  Vaccine,
  Antibiotic,
  Antiviral,
  Painkiller,
  Sedative,
  Stimulant,
  Depressant,
  Hallucinogen,
  Narcotic,
  Opioid,
  Cannabis,
  Alcohol,
  Tobacco,
  Caffeine,
  Sugar,
  Salt,
  Fat,
  Protein,
  Carbohydrate,
  Vitamin,
  Mineral,
  Fiber,
  Water,
  Oxygen,
  Carbon,
  Nitrogen,
  Hydrogen,
  Helium,
  Lithium,
  Beryllium,
  Boron,
  Carbon as CarbonIcon,
  Nitrogen as NitrogenIcon,
  Oxygen as OxygenIcon,
  Fluorine,
  Neon,
  Sodium,
  Magnesium,
  Aluminum,
  Silicon,
  Phosphorus,
  Sulfur,
  Chlorine,
  Argon,
  Potassium,
  Calcium,
  Scandium,
  Titanium,
  Vanadium,
  Chromium,
  Manganese,
  Iron,
  Cobalt,
  Nickel,
  Copper,
  Zinc,
  Gallium,
  Germanium,
  Arsenic,
  Selenium,
  Bromine,
  Krypton,
  Rubidium,
  Strontium,
  Yttrium,
  Zirconium,
  Niobium,
  Molybdenum,
  Technetium,
  Ruthenium,
  Rhodium,
  Palladium,
  Silver,
  Cadmium,
  Indium,
  Tin,
  Antimony,
  Tellurium,
  Iodine,
  Xenon,
  Cesium,
  Barium,
  Lanthanum,
  Cerium,
  Praseodymium,
  Neodymium,
  Promethium,
  Samarium,
  Europium,
  Gadolinium,
  Terbium,
  Dysprosium,
  Holmium,
  Erbium,
  Thulium,
  Ytterbium,
  Lutetium,
  Hafnium,
  Tantalum,
  Tungsten,
  Rhenium,
  Osmium,
  Iridium,
  Platinum,
  Gold,
  Mercury,
  Thallium,
  Lead,
  Bismuth,
  Polonium,
  Astatine,
  Radon,
  Francium,
  Radium,
  Actinium,
  Thorium,
  Protactinium,
  Uranium,
  Neptunium,
  Plutonium,
  Americium,
  Curium,
  Berkelium,
  Californium,
  Einsteinium,
  Fermium,
  Mendelevium,
  Nobelium,
  Lawrencium,
  Rutherfordium,
  Dubnium,
  Seaborgium,
  Bohrium,
  Hassium,
  Meitnerium,
  Darmstadtium,
  Roentgenium,
  Copernicium,
  Nihonium,
  Flerovium,
  Moscovium,
  Livermorium,
  Tennessine,
  Oganesson,
} from 'lucide-react';

// ========================================
// 1. AI CHATBOT SYSTEM
// ========================================

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'error';
  attachments?: Attachment[];
  metadata?: {
    intent?: string;
    confidence?: number;
    entities?: any[];
    suggestions?: string[];
  };
}

interface Attachment {
  id: string;
  type: 'image' | 'video' | 'file' | 'audio';
  name: string;
  url: string;
  size: number;
}

interface ChatbotSettings {
  language: string;
  voiceEnabled: boolean;
  autoRespond: boolean;
  suggestionsEnabled: boolean;
  contextAware: boolean;
  personality: 'professional' | 'friendly' | 'casual' | 'formal';
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
      status: 'sent',
      metadata: {
        suggestions: [
          'Help with orders',
          'Account issues',
          'Product information',
          'Technical support',
        ],
      },
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [settings, setSettings] = useState<ChatbotSettings>({
    language: 'en',
    voiceEnabled: false,
    autoRespond: true,
    suggestionsEnabled: true,
    contextAware: true,
    personality: 'friendly',
  });
  const [showSettings, setShowSettings] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mock AI responses
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    setIsTyping(true);

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const responses = {
      greeting: [
        'Hello! How can I assist you today?',
        'Hi there! What can I help you with?',
        'Welcome! How may I be of service?',
      ],
      help: [
        "I'm here to help! What specific issue are you facing?",
        "I'd be happy to assist you. Could you provide more details?",
        'Let me help you with that. What exactly do you need?',
      ],
      order: [
        "I can help you with your order. What's your order number?",
        'For order-related issues, please provide your order ID.',
        "I'll help you track or modify your order. What do you need?",
      ],
      technical: [
        'I can help with technical issues. What problem are you experiencing?',
        'Let me assist you with the technical problem. Can you describe it?',
        "I'm here to help with technical support. What's the issue?",
      ],
      default: [
        'I understand. How can I help you further?',
        "That's interesting. What would you like to know more about?",
        'I see. Is there anything specific I can assist you with?',
      ],
    };

    const lowerMessage = userMessage.toLowerCase();
    let category = 'default';

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      category = 'greeting';
    } else if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
      category = 'help';
    } else if (lowerMessage.includes('order') || lowerMessage.includes('purchase')) {
      category = 'order';
    } else if (
      lowerMessage.includes('technical') ||
      lowerMessage.includes('problem') ||
      lowerMessage.includes('issue')
    ) {
      category = 'technical';
    }

    const responseArray = responses[category as keyof typeof responses];
    const response = responseArray[Math.floor(Math.random() * responseArray.length)];

    setIsTyping(false);
    return response;
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      status: 'sending',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Update message status
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg => (msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg))
      );
    }, 500);

    // Generate AI response
    const aiResponse = await generateAIResponse(inputValue);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: aiResponse,
      timestamp: new Date(),
      status: 'sent',
      metadata: {
        suggestions: ['More help', 'Contact human', 'FAQ', 'Feedback'],
      },
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Mock voice recognition
    if (!isListening) {
      setTimeout(() => {
        setInputValue('Hello, I need help with my order');
        setIsListening(false);
      }, 2000);
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const quickSuggestions = [
    'How do I reset my password?',
    'Where is my order?',
    'How do I contact support?',
    'What are your return policies?',
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isMinimized && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsMinimized(true)}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-96 h-[500px] bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Assistant</h3>
                    <p className="text-xs text-blue-100">{isTyping ? 'Typing...' : 'Online'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsMinimized(false)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`flex items-start gap-2 ${
                        message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {message.type === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>

                      <div
                        className={`p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>

                        {message.metadata?.suggestions && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {message.metadata.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => setInputValue(suggestion)}
                                className="text-xs px-2 py-1 bg-white/20 dark:bg-slate-600 rounded hover:bg-white/30 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}

                        <div
                          className={`flex items-center gap-2 mt-2 text-xs ${
                            message.type === 'user'
                              ? 'text-blue-100'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                          {message.status === 'sending' && (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          )}
                          {message.status === 'sent' && <CheckCircle className="w-3 h-3" />}
                          {message.type === 'bot' && (
                            <button
                              onClick={() => copyMessage(message.content)}
                              className="hover:text-slate-700 dark:hover:text-slate-300"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      AI is typing...
                    </span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {settings.suggestionsEnabled && messages.length === 1 && (
              <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Quick suggestions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(suggestion)}
                      className="text-xs px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  <Paperclip className="w-4 h-4" />
                </button>

                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={toggleVoice}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full right-0 mb-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-4"
          >
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
              Chatbot Settings
            </h4>

            <div className="space-y-3">
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.voiceEnabled}
                    onChange={e =>
                      setSettings(prev => ({ ...prev, voiceEnabled: e.target.checked }))
                    }
                    className="rounded border-slate-300 dark:border-slate-600"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Voice Recognition
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.suggestionsEnabled}
                    onChange={e =>
                      setSettings(prev => ({ ...prev, suggestionsEnabled: e.target.checked }))
                    }
                    className="rounded border-slate-300 dark:border-slate-600"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Quick Suggestions
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.contextAware}
                    onChange={e =>
                      setSettings(prev => ({ ...prev, contextAware: e.target.checked }))
                    }
                    className="rounded border-slate-300 dark:border-slate-600"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Context Awareness
                  </span>
                </label>
              </div>

              <div>
                <label className="text-sm text-slate-700 dark:text-slate-300">Personality</label>
                <select
                  value={settings.personality}
                  onChange={e =>
                    setSettings(prev => ({ ...prev, personality: e.target.value as any }))
                  }
                  className="w-full mt-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                >
                  <option value="friendly">Friendly</option>
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
