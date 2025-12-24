'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Message } from '@/app/lib/types';
import MessageBubble from './MessageBubble';
import { Send, Loader2, CheckCircle } from 'lucide-react';

interface ChatThreadProps {
  customerNumber: string;
  messages: Message[];
  onSendMessage: (body: string) => Promise<void>;
  onCloseConversation: () => Promise<void>;
  isLoading: boolean;
  telnyxNumber: string;
}

export default function ChatThread({
  customerNumber,
  messages,
  onSendMessage,
  onCloseConversation,
  isLoading,
  telnyxNumber,
}: ChatThreadProps) {
  const [messageInput, setMessageInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [previousMessagesLength, setPreviousMessagesLength] = useState(0);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Check if user is near bottom of scroll
  const isNearBottom = () => {
    if (!messagesContainerRef.current) return true;
    
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    
    // If within 100px of bottom, consider "near bottom"
    return distanceFromBottom < 100;
  };

  // Handle scroll events to determine if we should auto-scroll
  const handleScroll = () => {
    setShouldAutoScroll(isNearBottom());
  };

  // Auto-scroll only when:
  // 1. New messages arrive AND user is already at bottom
  // 2. User sends a message
  useEffect(() => {
    const hasNewMessages = messages.length > previousMessagesLength;
    
    if (hasNewMessages && shouldAutoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    
    setPreviousMessagesLength(messages.length);
  }, [messages.length, shouldAutoScroll]);

  // Always scroll to bottom when conversation changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    setShouldAutoScroll(true);
    setPreviousMessagesLength(messages.length);
  }, [customerNumber]);

  const handleSend = async () => {
    if (!messageInput.trim() || isSending) return;

    const body = messageInput.trim();
    setMessageInput('');
    setIsSending(true);

    try {
      await onSendMessage(body);
      // Force scroll after sending
      setShouldAutoScroll(true);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Error sending message:', error);
      // Restore message on error
      setMessageInput(body);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClose = async () => {
    setIsClosing(true);
    try {
      await onCloseConversation();
    } finally {
      setIsClosing(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-10 flex items-center justify-between flex-shrink-0">
        <div>
          <h2 className="font-semibold text-gray-900">{customerNumber}</h2>
          <p className="text-xs text-gray-500">
            {messages.length} message{messages.length !== 1 ? 's' : ''}
          </p>
        </div>

        <button
          onClick={handleClose}
          disabled={isClosing}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          {isClosing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <CheckCircle className="w-4 h-4" />
          )}
          Close
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {isLoading && messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOutbound={message.direction === 'outbound'}
                telnyxNumber={telnyxNumber}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={isSending}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={!messageInput.trim() || isSending}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}