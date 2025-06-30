"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import AIChatWidget from '@/components/ai/AIChatWidget';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface AIChatContextType {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

interface AIChatProviderProps {
  children: ReactNode;
}

export function AIChatProvider({ children }: AIChatProviderProps) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!session?.user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: 'Sorry, there was an error processing your message.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const value = {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };

  return (
    <AIChatContext.Provider value={value}>
      {children}
    </AIChatContext.Provider>
  );
}

export function useAIChat() {
  const context = useContext(AIChatContext);
  if (context === undefined) {
    throw new Error('useAIChat must be used within an AIChatProvider');
  }
  return context;
}

export default function AIChatProvider() {
  const pathname = usePathname();

  // Get context based on current path
  const getContext = () => {
    if (pathname.startsWith('/edr')) {
      return {
        module: 'edr' as const,
        page: pathname.split('/').pop(),
        filters: new URLSearchParams(window.location.search),
      };
    }
    if (pathname.startsWith('/emo')) {
      return {
        module: 'emo' as const,
        page: pathname.split('/').pop(),
        filters: new URLSearchParams(window.location.search),
      };
    }
    if (pathname.startsWith('/gosellr')) {
      return {
        module: 'gosellr' as const,
        page: pathname.split('/').pop(),
        filters: new URLSearchParams(window.location.search),
      };
    }
    if (pathname.startsWith('/wallet')) {
      return {
        module: 'wallet' as const,
        page: pathname.split('/').pop(),
      };
    }
    if (pathname.startsWith('/franchise')) {
      return {
        module: 'franchise' as const,
        page: pathname.split('/').pop(),
      };
    }
    return undefined;
  };

  return <AIChatWidget context={getContext()} />;
}
