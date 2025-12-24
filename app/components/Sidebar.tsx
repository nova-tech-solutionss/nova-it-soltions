// components/Sidebar.tsx
'use client'
import { Home, ListTodo, CalendarDays, Settings, HelpCircle, LogOut, Plus, MessageCircle, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ModalPanel from './ModalPanel';
import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '../(dashboard)/dashboard/AuthContext';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function SidebarContent({ isOpen = true, onClose }: SidebarProps) {
  const [showNewTask, setShowNewTask] = useState(false);
  const { logout } = useAuth();

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen && onClose) { // Mobile mode
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  function plus_button() {
    return (
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setShowNewTask(true);
        }}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
      >
        <Plus className="w-4 h-4 text-gray-600" />
      </button>
    );
  }

  const handleLinkClick = () => {
    // Close mobile sidebar when a link is clicked
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {onClose && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        bg-white rounded-xl shadow-md p-4 w-64 flex flex-col justify-between h-full
        ${onClose !== undefined ? 'fixed top-0 left-0 bottom-0 z-50 transition-transform duration-300 lg:hidden' : 'hidden lg:flex'}
        ${onClose !== undefined && !isOpen ? '-translate-x-full' : 'translate-x-0'}
      `}>
        <div>
          {/* Mobile close button - only show when onClose is provided */}
          {onClose !== undefined && (
            <button
              onClick={onClose}
              className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} className="text-gray-600" />
            </button>
          )}

          <div className="flex items-center space-x-2 mb-6">
            <Image src={'/images/nova_logo.png'} alt="Nova Suite" width={34} height={34} />
            <span className="text-2xl font-medium text-gray-900">Nova</span>
          </div>

          <nav className="space-y-4">
            <SidebarLink 
              icon={<Home size={18} />} 
              text="Dashboard" 
              href="/dashboard" 
              onClick={handleLinkClick}
            />
            <SidebarLink 
              icon={<ListTodo size={18} />} 
              text="Tasks" 
              href="/dashboard/tasks" 
              extra={plus_button()}
              onClick={handleLinkClick}
            />
            <SidebarLink 
              icon={<CalendarDays size={18} />} 
              text="Calendar" 
              href="/dashboard/calendar"
              onClick={handleLinkClick}
            />
            <SidebarLink 
              icon={<MessageCircle size={18} />} 
              text="SMS" 
              href="/dashboard/sms"
              onClick={handleLinkClick}
            />
          </nav>

          <div className="mt-8 space-y-4 border-t pt-4 text-sm text-gray-600">
            <SidebarLink 
              icon={<Settings size={18} />} 
              text="Settings" 
              href="/dashboard/settings"
              onClick={handleLinkClick}
            />
            <SidebarLink 
              icon={<HelpCircle size={18} />} 
              text="Help" 
              href="/dashboard/help"
              onClick={handleLinkClick}
            />
            <button
              onClick={() => {
                logout();
                handleLinkClick();
              }}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors px-2 py-2 w-full"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* New Task Modal */}
      <ModalPanel isOpen={showNewTask} onClose={() => setShowNewTask(false)}>
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
        {/* New task form here */}
      </ModalPanel>
    </>
  );
}

function SidebarLink({
  icon,
  text,
  href,
  extra,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
  extra?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div className="flex items-center justify-between group">
      <Link
        href={href}
        onClick={onClick}
        className="flex items-center justify-between text-gray-800 hover:text-blue-600 transition flex-1 px-2 py-2 rounded-lg hover:bg-gray-50"
      >
        <span className="flex items-center gap-2">
          {icon}
          {text}
        </span>
      </Link>
      {extra && <div className="text-blue-500">{extra}</div>}
    </div>
  );
}

// Main Sidebar component with Suspense wrapper
export default function Sidebar(props: SidebarProps) {
  return (
    <Suspense fallback={
      <aside className="bg-white rounded-xl shadow-md p-4 w-64 flex flex-col justify-between h-full">
        <div className="animate-pulse">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="w-20 h-6 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </aside>
    }>
      <SidebarContent {...props} />
    </Suspense>
  );
}