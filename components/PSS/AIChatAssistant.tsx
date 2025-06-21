'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  HelpCircle,
  FileText,
  Shield,
  Clock,
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'help';
}

const quickSuggestions = [
  'What documents do I need?',
  'How long does verification take?',
  'What if my documents are rejected?',
  'Can I edit my application?',
  'What are the verification requirements?',
];

const adminQuickSuggestions = [
  'How do I approve a request?',
  'What does the risk level mean?',
  'How do I handle rejected applications?',
  'What are the verification guidelines?',
  'How do I search for specific requests?',
];

const aiResponses: { [key: string]: string } = {
  'What documents do I need?':
    "For verification, you'll need:\n• Valid government ID (passport, national ID)\n• Proof of address (utility bill, bank statement)\n• Professional license (if applicable)\n• Recent photo (passport-style)\n\nAll documents should be clear, unexpired, and in English or Arabic.",
  'How long does verification take?':
    "Verification typically takes 24-48 hours for standard applications. High-risk or complex cases may take up to 5 business days. You'll receive email notifications at each step of the process.",
  'What if my documents are rejected?':
    "If documents are rejected, you'll receive a detailed explanation and can resubmit. Common reasons include:\n• Blurry or unclear images\n• Expired documents\n• Missing information\n• Unsupported file formats\n\nYou can upload new documents anytime.",
  'Can I edit my application?':
    'Yes! You can edit your application before submission. Once submitted, you can still update documents if needed. After approval, major changes require a new verification request.',
  'What are the verification requirements?':
    'Our verification ensures patient safety by:\n• Validating identity and credentials\n• Checking professional licenses\n• Verifying contact information\n• Assessing risk factors\n• Confirming compliance with healthcare standards',
  // Admin-specific responses
  'How do I approve a request?':
    "To approve a verification request:\n1. Click the 'View' button on the request\n2. Review all submitted documents\n3. Check AI risk assessment\n4. Click 'Approve' if everything looks good\n5. Add any notes if needed\n\nApproved users will receive immediate access.",
  'What does the risk level mean?':
    'Risk levels are AI-assessed:\n• Low: Standard verification, usually approved quickly\n• Medium: Requires additional review, may need extra documents\n• High: High-risk case, requires manual review and possibly additional verification steps',
  'How do I handle rejected applications?':
    'When rejecting an application:\n1. Provide clear, specific reasons for rejection\n2. Suggest what documents or information are needed\n3. Allow resubmission with corrections\n4. Document the rejection reason for audit purposes',
  'What are the verification guidelines?':
    'Follow these guidelines:\n• Verify all documents are authentic and current\n• Check professional licenses with issuing authorities\n• Ensure photos match submitted documents\n• Review for any suspicious patterns\n• Maintain consistent standards across all applications',
};

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect if we're on admin page
  const isAdminPage = typeof window !== 'undefined' && window.location.pathname.includes('/admin');

  // Initialize messages based on context
  React.useEffect(() => {
    const welcomeMessage = isAdminPage
      ? "Hello! I'm your PSS admin assistant. I can help you with:\n\n• Request approval workflows\n• Risk assessment guidelines\n• Verification standards\n• Admin dashboard features\n\nHow can I assist you today?"
      : "Hello! I'm your PSS verification assistant. I can help you with:\n\n• Document requirements\n• Application process\n• Status updates\n• Troubleshooting\n\nHow can I assist you today?";

    setMessages([
      {
        id: '1',
        text: welcomeMessage,
        sender: 'assistant',
        timestamp: new Date(),
        type: 'help',
      },
    ]);
  }, [isAdminPage]);

  const currentQuickSuggestions = isAdminPage ? adminQuickSuggestions : quickSuggestions;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(
      () => {
        const response =
          aiResponses[text] ||
          'I understand your question. Let me help you with that. Could you please provide more specific details about what you need assistance with regarding the PSS verification process?';

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: 'assistant',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      },
      1000 + Math.random() * 2000
    );
  };

  const handleQuickSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end p-4">
          <Card className="w-full max-w-md h-[600px] flex flex-col shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Bot className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">PSS Assistant</CardTitle>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.sender === 'assistant' && (
                            <Bot className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                        </div>
                        <div
                          className={`text-xs mt-2 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-4 w-4 text-blue-600" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: '0.1s' }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: '0.2s' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Quick Suggestions */}
              {messages.length === 1 && (
                <div className="p-4 border-t bg-gray-50 dark:bg-gray-900">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentQuickSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickSuggestion(suggestion)}
                        className="text-xs h-8"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about verification..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    size="icon"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
