'use client';

import React from 'react';
import { Message } from '@/app/lib/types';
import { format } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isOutbound: boolean;
  telnyxNumber: string;
}

export default function MessageBubble({
  message,
  isOutbound,
  telnyxNumber,
}: MessageBubbleProps) {
  return (
    <div
      className={`flex ${isOutbound ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isOutbound
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-900 border border-gray-200'
        }`}
      >
        {/* Message Body */}
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.body || '(empty message)'}
        </p>

        {/* Timestamp and Status */}
        <div
          className={`flex items-center gap-1 mt-1 text-xs ${
            isOutbound ? 'text-blue-100' : 'text-gray-500'
          }`}
        >
          <span>
            {format(new Date(message.created_at), 'h:mm a')}
          </span>
          
          {isOutbound && (
            <CheckCheck className="w-3 h-3 ml-1" />
          )}
        </div>

        {/* Phone Number Label (for debugging) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-xs opacity-50 mt-1">
            {isOutbound ? `To: ${message.to_number}` : `From: ${message.from_number}`}
          </div>
        )}
      </div>
    </div>
  );
}