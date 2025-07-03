'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Paperclip,
  Image,
  Smile,
  Phone,
  Video,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Minimize2,
  Maximize2,
} from 'lucide-react';

// ========================================
// 1. LIVE CHAT COMPONENT
// ========================================

interface Message {
  id: string;
  sender: 'user' | 'seller' | 'support';
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  status: 'sent' | 'delivered' | 'read';
  attachments?: string[];
}

interface LiveChatProps {
  sellerId?: string;
  productId?: string;
  orderId?: string;
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
}

export default function LiveChat({
  sellerId,
  productId,
  orderId,
  isOpen,
  onClose,
  onMinimize,
  isMinimized,
}: LiveChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sellerTyping, setSellerTyping] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [chatStatus, setChatStatus] = useState<'connecting' | 'connected' | 'disconnected'>(
    'connecting'
  );
  const [sellerInfo, setSellerInfo] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ========================================
  // 2. INITIALIZATION
  // ========================================

  useEffect(() => {
    if (isOpen) {
      initializeChat();
    }
  }, [isOpen, sellerId, productId, orderId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = async () => {
    try {
      setChatStatus('connecting');

      const seller = await loadSellerInfo(sellerId);
      setSellerInfo(seller);

      const history = await loadChatHistory();
      setMessages(history);

      await new Promise(resolve => setTimeout(resolve, 1000));
      setChatStatus('connected');

      setTimeout(() => {
        setSellerTyping(true);
        setTimeout(() => {
          setSellerTyping(false);
          addMessage({
            id: Date.now().toString(),
            sender: 'seller',
            content: 'Hello! How can I help you today?',
            timestamp: new Date(),
            type: 'text',
            status: 'read',
          });
        }, 2000);
      }, 1500);
    } catch (error) {
      console.error('Error initializing chat:', error);
      setChatStatus('disconnected');
    }
  };

  // ========================================
  // 3. DATA LOADING FUNCTIONS
  // ========================================

  const loadSellerInfo = async (sellerId?: string) => {
    return {
      id: sellerId || 'seller-1',
      name: 'AudioTech Store',
      avatar: '/api/placeholder/40/40',
      rating: 4.9,
      responseTime: '2-5 minutes',
      online: true,
      verified: true,
    };
  };

  const loadChatHistory = async (): Promise<Message[]> => {
    return [
      {
        id: '1',
        sender: 'seller',
        content: 'Welcome to AudioTech Store! How can I assist you today?',
        timestamp: new Date(Date.now() - 300000),
        type: 'text',
        status: 'read',
      },
      {
        id: '2',
        sender: 'user',
        content: 'Hi! I have a question about the wireless headphones.',
        timestamp: new Date(Date.now() - 240000),
        type: 'text',
        status: 'read',
      },
    ];
  };

  // ========================================
  // 4. MESSAGE HANDLING
  // ========================================

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() && attachments.length === 0) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
      status: 'sent',
      attachments: attachments.map(file => file.name),
    };

    addMessage(message);
    setNewMessage('');
    setAttachments([]);

    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsTyping(false);

    setMessages(prev =>
      prev.map(msg => (msg.id === message.id ? { ...msg, status: 'delivered' as const } : msg))
    );

    setTimeout(() => {
      setSellerTyping(true);
      setTimeout(() => {
        setSellerTyping(false);
        addMessage({
          id: (Date.now() + 1).toString(),
          sender: 'seller',
          content: "Thank you for your message! I'll get back to you shortly.",
          timestamp: new Date(),
          type: 'text',
          status: 'read',
        });
      }, 2000);
    }, 1500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ========================================
  // 5. RENDER FUNCTIONS
  // ========================================

  const renderMessage = (message: Message) => (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-xs lg:max-w-md ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
        {message.sender !== 'user' && (
          <div className="flex items-center gap-2 mb-1">
            <img
              src={sellerInfo?.avatar || '/api/placeholder/24/24'}
              alt={sellerInfo?.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs text-gray-500">{sellerInfo?.name}</span>
          </div>
        )}

        <div
          className={`rounded-lg px-4 py-2 ${
            message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
          }`}
        >
          <p className="text-sm">{message.content}</p>

          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-1">
              {message.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center gap-2 text-xs opacity-75">
                  <Paperclip className="w-3 h-3" />
                  <span>{attachment}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-gray-400">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {message.sender === 'user' && (
            <div className="flex items-center gap-1">
              {message.status === 'sent' && <Clock className="w-3 h-3 text-gray-400" />}
              {message.status === 'delivered' && <CheckCircle className="w-3 h-3 text-blue-400" />}
              {message.status === 'read' && <CheckCircle className="w-3 h-3 text-green-400" />}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={sellerInfo?.avatar || '/api/placeholder/32/32'}
                alt={sellerInfo?.name}
                className="w-8 h-8 rounded-full"
              />
              <div
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  sellerInfo?.online ? 'bg-green-500' : 'bg-gray-400'
                }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {sellerInfo?.name || 'Seller'}
              </p>
              <p className="text-xs text-gray-500">{sellerInfo?.online ? 'Online' : 'Offline'}</p>
            </div>
            <button
              onClick={onMinimize}
              className="p-1 hover:bg-gray-100 rounded"
              title="Maximize chat"
              aria-label="Maximize chat window"
            >
              <Maximize2 className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded"
              title="Close chat"
              aria-label="Close chat window"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={sellerInfo?.avatar || '/api/placeholder/32/32'}
                  alt={sellerInfo?.name}
                  className="w-8 h-8 rounded-full"
                />
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    sellerInfo?.online ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{sellerInfo?.name || 'Seller'}</p>
                <p className="text-xs text-gray-500">
                  {chatStatus === 'connecting' && 'Connecting...'}
                  {chatStatus === 'connected' && sellerInfo?.online ? 'Online' : 'Offline'}
                  {chatStatus === 'disconnected' && 'Disconnected'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={onMinimize}
                className="p-1 hover:bg-gray-200 rounded"
                title="Minimize chat"
                aria-label="Minimize chat window"
              >
                <Minimize2 className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-200 rounded"
                title="Close chat"
                aria-label="Close chat window"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(renderMessage)}

            {sellerTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <div className="flex items-center gap-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 ml-2">Typing...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1"
                  >
                    <Paperclip className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-700">{file.name}</span>
                    <button
                      onClick={() => removeAttachment(index)}
                      className="ml-1 hover:text-red-500"
                      title="Remove attachment"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={1}
                  aria-label="Message input"
                />
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Attach file"
                  aria-label="Attach file to message"
                >
                  <Paperclip className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() && attachments.length === 0}
                  className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Send message"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
              aria-label="File upload"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
