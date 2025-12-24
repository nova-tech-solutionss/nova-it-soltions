// components/MobileHeader.tsx
'use client'
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export default function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide when scrolling down
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`lg:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-40 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <Image src={'/images/nova_logo.png'} alt="Nova Suite" width={32} height={32} />
          <span className="text-xl font-medium text-gray-900">Nova</span>
        </div>
        
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={24} className="text-gray-700" />
        </button>
      </div>
    </header>
  );
}