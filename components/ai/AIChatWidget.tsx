'use client';

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaMinus, FaExpand } from 'react-icons/fa';

import { useAIChat } from '@/components/layout/AIChatProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface AIChatWidgetProps {
  context?: string;
}

export default function AIChatWidget({ context }: AIChatWidgetProps) {
  const { messages, isLoading, sendMessage, clearMessages } = useAIChat();
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    await sendMessage(message);
  };

  // Get context-aware title
  const getTitle = () => {
    if (!context) return 'EHB Assistant';

    return 'EHB Assistant';
  };

  // Get context-aware welcome message
  const getWelcomeMessage = () => {
    if (!context) return 'How can I help you today?';

    return 'How can I help you today?';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`bg-white rounded-lg shadow-xl ${isExpanded ? 'w-[800px]' : 'w-[400px]'}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <FaRobot className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">{getTitle()}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                  title="Minimize chat"
                >
                  <FaMinus className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                  title="Expand chat"
                >
                  <FaExpand className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                  title="Close chat"
                >
                  <FaTimes className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Chat Interface */}
            {!isMinimized && (
              <div className={`${isExpanded ? 'h-[600px]' : 'h-[400px]'}`}>
                <ScrollArea ref={scrollRef} className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message: Message) => (
                      <div
                        key={message.id}
                        className={cn(
                          'flex flex-col space-y-2',
                          message.role === 'user' ? 'items-end' : 'items-start'
                        )}
                      >
                        <div
                          className={cn(
                            'rounded-lg px-4 py-2 max-w-[80%]',
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          )}
                        >
                          {message.content}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200" />
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <form onSubmit={handleSubmit} className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={isLoading || !input.trim()}>
                      Send
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <FaRobot className="w-5 h-5" />
          <span>Ask EHB</span>
        </motion.button>
      )}
    </div>
  );
}
