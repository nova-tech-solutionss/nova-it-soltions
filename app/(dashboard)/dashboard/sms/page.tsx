'use client';
import React, { useState, useEffect, useCallback, useMemo} from 'react';
import { useRouter } from 'next/navigation';
import ConversationList from './components/ConversationList';
import ChatThread from './components/ChatThread';
import SearchBar from './components/SearchBar';
import { Conversation, Message } from '@/app/lib/types';
import { MessageSquare, LogOut, RefreshCw, Menu, X, Settings } from 'lucide-react';
import { createBrowserClient } from '@/app/lib/supabaseClient';
import { createFetchWithAuth } from '@/app/lib/api';
import { useAuth } from '../AuthContext';

export default function SMSDashboardPage() {
  const router = useRouter();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const { accessToken ,  logout} = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * 🔐 Authenticated fetch (NEW — replaces cookie-based version)
   * Logic unchanged, only token source changed
   */
  const fetchWithAuth = useMemo(
    () => createFetchWithAuth(accessToken),
    [accessToken]
  );

  /**
   * 📡 APIs (moved here, logic identical to before)
   */
  const conversationsAPI = useMemo(() => ({
    async list(search?: string) {
      const params = new URLSearchParams();
      if (search) params.append('search', search);

      const res = await fetchWithAuth(
        `/api/sms/conversations/${params.toString() ? `?${params}` : ''}`
      );
      if (!res.ok) throw new Error('Failed to fetch conversations');
      return res.json();
    },

    async close(id: string) {
      const res = await fetchWithAuth(
        `/api/sms/conversations/${id}/close/`,
        { method: 'POST' }
      );
      if (!res.ok) throw new Error('Failed to close conversation');
      return res.json();
    },
  }), [fetchWithAuth]);

  const messagesAPI = useMemo(() => ({
    async getThread(customerNumber: string) {
      const res = await fetchWithAuth(
        `/api/sms/messages/thread/?with=${encodeURIComponent(customerNumber)}`
      );
      if (!res.ok) throw new Error('Failed to fetch messages');
      return res.json();
    },

    async send(to: string, body: string) {
      const res = await fetchWithAuth('/api/sms/telnyx/send/', {
        method: 'POST',
        body: JSON.stringify({ to, body }),
      });
      if (!res.ok) throw new Error('Failed to send message');
      return res.json();
    },
  }), [fetchWithAuth]);

  /**
   * =========================
   * ORIGINAL HANDLERS (UNCHANGED)
   * =========================
   */

  const fetchConversations = useCallback(async () => {
    try {
      const data = await conversationsAPI.list(searchQuery);
      const convList = Array.isArray(data) ? data : data.results || [];
      setConversations(convList);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingConversations(false);
    }
  }, [searchQuery, conversationsAPI]);

  const fetchMessages = useCallback(async (customerNumber: string) => {
    if (!accessToken) return;

    setIsLoadingMessages(true);
    try {
      const data = await messagesAPI.getThread(customerNumber);
      const msgList = data.messages || data.results || data;
      setMessages(Array.isArray(msgList) ? msgList : []);
    } finally {
      setIsLoadingMessages(false);
    }
  }, [accessToken, messagesAPI]);

  const handleSendMessage = async (body: string) => {
    if (!accessToken || !selectedConversation) return;

    await messagesAPI.send(selectedConversation, body);
    await fetchMessages(selectedConversation);
    await fetchConversations();
  };

  const handleCloseConversation = async () => {
    if (!accessToken || !selectedConversation) return;

    const convo = conversations.find(
      c => c.customer_number === selectedConversation
    );
    if (!convo) return;

    await conversationsAPI.close(convo.id);
    await fetchConversations();
  };

  const handleSelectConversation = (customerNumber: string) => {
    setSelectedConversation(customerNumber);
    fetchMessages(customerNumber);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  /**
   * =========================
   * Effects (unchanged)
   * =========================
   */



  useEffect(() => {
    if (!accessToken) return;

    fetchConversations();
    const i = setInterval(fetchConversations, 5000);
    return () => clearInterval(i);
  }, [accessToken, fetchConversations]);

  useEffect(() => {
    if (!accessToken || !selectedConversation) return;

    const i = setInterval(() => {
      fetchMessages(selectedConversation);
    }, 3000);
    return () => clearInterval(i);
  }, [accessToken, selectedConversation, fetchMessages]);

  useEffect(() => {
    if (!accessToken) return;

    const supabase = createBrowserClient();
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        () => {
          fetchConversations();
          if (selectedConversation) {
            fetchMessages(selectedConversation);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [accessToken, selectedConversation, fetchConversations, fetchMessages]);

  if (!accessToken) return null;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            
            
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/dashboard/settings')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Settings"
          >
            <Settings className='w-5 h-5 text-gray-600' />
          </button>
          <button
            onClick={fetchConversations}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations Sidebar */}
        <div
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } lg:block w-full lg:w-96 bg-white border-r border-gray-200 flex flex-col absolute lg:relative z-10 h-full lg:h-auto shadow-lg lg:shadow-none`}
        >
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by phone or message..."
            />
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {isLoadingConversations && conversations.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            ) : (
              <ConversationList
                conversations={conversations}
                selectedConversation={selectedConversation}
                onSelectConversation={handleSelectConversation}
              />
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedConversation ? (
            <ChatThread
              customerNumber={selectedConversation}
              messages={messages}
              onSendMessage={handleSendMessage}
              onCloseConversation={handleCloseConversation}
              isLoading={isLoadingMessages}
              telnyxNumber={process.env.NEXT_PUBLIC_TELNYX_NUMBER || '+1234567890'}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Select a conversation to start messaging</p>
                <p className="text-sm mt-2">
                  {conversations.length} conversation{conversations.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}