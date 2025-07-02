"use client";

'use client';

import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

import AIChatWidget from '@/components/ai/AIChatWidget';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type: 'text' | 'file' | 'image';
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface AIChatContextType {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  isLoading: boolean;
  createSession: (title?: string) => void;
  sendMessage: (text: string, sessionId?: string) => Promise<void>;
  deleteSession: (sessionId: string) => void;
  setCurrentSession: (sessionId: string) => void;
  clearCurrentSession: () => void;
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

interface AIChatProviderProps {
  children: ReactNode;
}

export function AIChatProvider({ children }: AIChatProviderProps) {
  const { data: session } = useSession();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSessionState] = useState<ChatSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createSession = useCallback(
    (title?: string) => {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: title || `Chat ${sessions.length + 1}`,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setSessions(prev => [...prev, newSession]);
      setCurrentSessionState(newSession);
    },
    [sessions.length]
  );

  const sendMessage = useCallback(
    async (text: string, sessionId?: string) => {
      setIsLoading(true);

      const targetSessionId = sessionId || currentSession?.id;
      if (!targetSessionId) {
        createSession();
        return;
      }

      const userMessage: Message = {
        id: Date.now().toString(),
        text,
        isUser: true,
        timestamp: new Date(),
        type: 'text',
      };

      // Update sessions with user message
      setSessions(prev =>
        prev.map(session => {
          if (session.id === targetSessionId) {
            return {
              ...session,
              messages: [...session.messages, userMessage],
              updatedAt: new Date(),
            };
          }
          return session;
        })
      );

      // Update current session if it's the active one
      if (currentSession?.id === targetSessionId) {
        setCurrentSessionState(prev =>
          prev
            ? {
                ...prev,
                messages: [...prev.messages, userMessage],
                updatedAt: new Date(),
              }
            : null
        );
      }

      try {
        // Simulate AI response
        await new Promise(resolve => setTimeout(resolve, 1000));

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: generateAIResponse(text),
          isUser: false,
          timestamp: new Date(),
          type: 'text',
        };

        // Update sessions with AI response
        setSessions(prev =>
          prev.map(session => {
            if (session.id === targetSessionId) {
              return {
                ...session,
                messages: [...session.messages, aiMessage],
                updatedAt: new Date(),
              };
            }
            return session;
          })
        );

        // Update current session if it's the active one
        if (currentSession?.id === targetSessionId) {
          setCurrentSessionState(prev =>
            prev
              ? {
                  ...prev,
                  messages: [...prev.messages, aiMessage],
                  updatedAt: new Date(),
                }
              : null
          );
        }
      } catch (error) {
        console.error('Failed to send message:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [currentSession, createSession]
  );

  const deleteSession = useCallback(
    (sessionId: string) => {
      setSessions(prev => prev.filter(session => session.id !== sessionId));

      if (currentSession?.id === sessionId) {
        setCurrentSessionState(null);
      }
    },
    [currentSession]
  );

  const setCurrentSession = useCallback(
    (sessionId: string) => {
      const session = sessions.find(s => s.id === sessionId);
      if (session) {
        setCurrentSessionState(session);
      }
    },
    [sessions]
  );

  const clearCurrentSession = useCallback(() => {
    setCurrentSessionState(null);
  }, []);

  // Simple AI response generator
  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      'I understand your question about development. Let me help you with that.',
      "That's an interesting point about software development. Here's what I think...",
      "For your development needs, I'd recommend considering the following approach...",
      'Based on your query, here are some best practices you should consider...',
      'I can help you with that development challenge. Let me break it down...',
      "That's a common development scenario. Here's how we typically handle it...",
      'For optimal results in development, I suggest the following strategy...',
      "I see you're working on a development project. Here are some insights...",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const value: AIChatContextType = {
    sessions,
    currentSession,
    isLoading,
    createSession,
    sendMessage,
    deleteSession,
    setCurrentSession,
    clearCurrentSession,
  };

  return <AIChatContext.Provider value={value}>{children}</AIChatContext.Provider>;
}

export function useAIChat() {
  const context = useContext(AIChatContext);
  if (context === undefined) {
    throw new Error('useAIChat must be used within an AIChatProvider');
  }
  return context;
}

export default function AIChatWidgetProvider() {
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
