"use client";

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMessageSquare } from 'react-icons/fi';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { useAIChat } from '../layout/AIChatProvider';
import { cn } from '@/lib/utils';

export default function AI_Agent_Chat() {
  const { messages, isLoading, sendMessage } = useAIChat();
  const [input, setInput] = useState('');
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-slate-700 flex-shrink-0">
        <h2 className="text-lg font-bold flex items-center">
          <FiMessageSquare className="mr-2" /> AI Assistant
        </h2>
      </div>

      <ScrollArea ref={scrollRef} className="flex-1 my-4">
        <div className="space-y-4 pr-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={cn(
                'flex flex-col space-y-2',
                message.role === 'user' ? 'items-end' : 'items-start'
              )}
            >
              <div
                className={cn(
                  'rounded-lg px-4 py-2 max-w-[90%]',
                  message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-200'
                )}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              <span className="text-xs text-slate-400">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start space-x-2 text-slate-400">
              <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200" />
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="border-t border-slate-700 pt-4">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask the AI assistant..."
            disabled={isLoading}
            className="flex-1 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            size="icon"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <FiSend className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
