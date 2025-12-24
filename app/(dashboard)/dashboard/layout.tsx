// app/dashboard/layout.tsx
"use client"
import '../../globals.css';
import Sidebar from '../../components/Sidebar';
import MobileHeader from '../../components/MobileHeader';
import Header from '../../components/Header';
import { AuthProvider } from './AuthContext';
import { useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  


  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);


  return (

      <AuthProvider>
        <div className='h-full bg-gray-100 p-4'>
          {/** Mobile Header - only visible on mobile */}
          <MobileHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />

          <div className="flex h-full gap-4">

            {/* Desktop Sidebar - hidden on mobile */}
            <div className="hidden lg:block lg:w-64 ">
              <Sidebar isOpen={true} onClose={undefined}/>
            </div>

            {/* Mobile Sidebar - shown as overlay */}
            <div className="lg:hidden">
              <Sidebar 
                isOpen={isMobileSidebarOpen} 
                onClose={() => setIsMobileSidebarOpen(false)} 
              />
            </div>

            <main className="flex-1 flex flex-col">
              
              <section className="flex-1 overflow-auto p-6 bg-white rounded-xl shadow-sm">
                {children}
              </section>
            </main>
          </div>
          
        </div>
      </AuthProvider>
  
    
      
  )
}
