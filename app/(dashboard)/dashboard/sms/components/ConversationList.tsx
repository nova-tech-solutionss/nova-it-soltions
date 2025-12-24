'use client';

import React from 'react';
import { Conversation } from '@/app/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, Circle } from 'lucide-react';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: string | null;
  onSelectConversation: (customerNumber: string) => void;
}

export default function ConversationList({
  conversations,
  selectedConversation,
  onSelectConversation,
}: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
        <MessageCircle className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-center">No conversations yet</p>
        <p className="text-sm text-center mt-2">
          Incoming messages will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelectConversation(conv.customer_number)}
          className={`flex items-start gap-3 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left ${
            selectedConversation === conv.customer_number
              ? 'bg-blue-50 border-l-4 border-l-blue-500'
              : ''
          }`}
        >
          {/* Avatar */}
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            {conv.customer_number.slice(-4)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-900 truncate">
                {conv.customer_number}
              </h3>
              <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                {formatDistanceToNow(new Date(conv.updated_at), {
                  addSuffix: true,
                })}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 truncate flex-1">
                {conv.last_message || 'No messages yet'}
              </p>
              
              {/* Status Badge */}
              <span
                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ml-2 flex-shrink-0 ${
                  conv.status === 'open'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Circle
                  className={`w-2 h-2 ${
                    conv.status === 'open' ? 'fill-green-500' : 'fill-gray-400'
                  }`}
                />
                {conv.status}
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}