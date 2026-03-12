
import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  WalletIcon, 
  UserIcon, 
  ShareIcon 
} from '@heroicons/react/24/outline';
import { useApp } from '../App';

const Layout: React.FC = () => {
  const { user } = useApp();
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pullRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const isAtTop = useRef(true);

  // Handle Pull to Refresh Logic
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Only start tracking if we are at the very top of the page
      isAtTop.current = window.scrollY === 0;
      startY.current = e.touches[0].pageY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isAtTop.current || isRefreshing) return;

      const currentY = e.touches[0].pageY;
      const distance = currentY - startY.current;

      if (distance > 0 && distance < 150) {
        // Resistance factor to make it feel natural
        setPullDistance(distance * 0.5);
        // Prevent default browser behavior (like overscroll)
        if (distance > 10) e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance > 60) {
        triggerRefresh();
      } else {
        setPullDistance(0);
      }
    };

    const triggerRefresh = () => {
      setIsRefreshing(true);
      setPullDistance(60); // Keep it visible at the threshold

      // Simulate API Refresh
      setTimeout(() => {
        setIsRefreshing(false);
        setPullDistance(0);
        console.log("Data Refreshed");
      }, 1500);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance, isRefreshing]);

  return (
    <div className="min-h-screen pb-20 bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden">
      {/* Pull to Refresh Indicator */}
      <div 
        className="absolute left-0 right-0 flex justify-center pointer-events-none z-[60] transition-all duration-200"
        style={{ 
          top: `${pullDistance - 40}px`,
          opacity: pullDistance > 20 ? 1 : 0,
          transform: `rotate(${pullDistance * 2}deg)`
        }}
      >
        <div className="bg-orange-600 p-2 rounded-full shadow-xl border border-orange-400/30 flex items-center justify-center">
          <svg 
            className={`w-5 h-5 text-white ${isRefreshing ? 'animate-spin' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>

      {/* Top Header */}
      <header className="sticky top-0 z-50 glass-panel px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg ff-gradient flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/20">
            FF
          </div>
          <span className="gaming-font text-xl font-bold tracking-wider">Tourney Pro</span>
        </div>
        <div className="flex items-center gap-3">
          <NavLink to="/wallet" className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800 hover:border-orange-500 transition-colors">
            <span className="text-sm font-bold text-orange-400">₹{user?.walletBalance.toFixed(2)}</span>
            <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">
              <span className="text-orange-500 text-xs">+</span>
            </div>
          </NavLink>
          {user?.role === 'admin' && (
             <NavLink to="/admin" className="text-xs font-bold px-2 py-1 bg-red-600 rounded text-white hover:bg-red-700">ADMIN</NavLink>
          )}
        </div>
      </header>

      {/* Main Content with dynamic offset for Pull-to-Refresh */}
      <main 
        className="flex-1 w-full max-w-2xl mx-auto px-4 py-6 transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${pullDistance}px)` }}
      >
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-slate-800 px-6 py-2 flex items-center justify-between max-w-2xl mx-auto rounded-t-2xl shadow-2xl">
        <NavLink to="/" className={({isActive}) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-orange-500' : 'text-slate-400'}`}>
          <HomeIcon className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>
        <NavLink to="/wallet" className={({isActive}) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-orange-500' : 'text-slate-400'}`}>
          <WalletIcon className="w-6 h-6" />
          <span className="text-[10px] font-medium">Wallet</span>
        </NavLink>
        <NavLink to="/referral" className={({isActive}) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-orange-500' : 'text-slate-400'}`}>
          <ShareIcon className="w-6 h-6" />
          <span className="text-[10px] font-medium">Refer</span>
        </NavLink>
        <NavLink to="/profile" className={({isActive}) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-orange-500' : 'text-slate-400'}`}>
          <UserIcon className="w-6 h-6" />
          <span className="text-[10px] font-medium">Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Layout;
