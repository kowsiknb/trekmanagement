import React from 'react';
import { Mountain, User, LogIn, LogOut, UserPlus } from 'lucide-react';
import { UserProfile } from '../types/trek';

interface NavbarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  currentUser: UserProfile | null;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  currentUser,
  onOpenAuth,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-[800] bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold">
            <Mountain className="w-4 h-4" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors">
            TrekSafe
          </span>
        </button>

        {/* Zone 2: 4-6 Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-stone-600">
          <button
            onClick={() => onNavigate('explore')}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap ${
              activeView === 'explore' ? 'text-emerald-800 font-bold' : ''
            }`}
          >
            Explore Treks
          </button>

          <button
            onClick={() => onNavigate('google-maps')}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap ${
              activeView === 'google-maps' ? 'text-emerald-800 font-bold' : ''
            }`}
          >
            Map
          </button>

          <button
            onClick={() => onNavigate('safety')}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap ${
              activeView === 'safety' ? 'text-emerald-800 font-bold' : ''
            }`}
          >
            Safety AI & ML
          </button>

          <button
            onClick={() => onNavigate('compare')}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap ${
              activeView === 'compare' ? 'text-emerald-800 font-bold' : ''
            }`}
          >
            Compare
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap ${
              activeView === 'dashboard' ? 'text-emerald-800 font-bold' : ''
            }`}
          >
            Dashboard
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-2.5">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px] font-mono overflow-hidden">
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    currentUser.name.charAt(0)
                  )}
                </div>
                <span className="hidden sm:inline truncate max-w-[100px]">{currentUser.name.split(' ')[0]}</span>
              </button>
              <button
                onClick={onLogout}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 rounded-lg transition-colors whitespace-nowrap"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors whitespace-nowrap flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Subnavigation Strip */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-stone-100 text-xs text-stone-600 bg-stone-50">
        <button
          onClick={() => onNavigate('explore')}
          className={`px-2 py-1 rounded ${activeView === 'explore' ? 'text-emerald-800 font-bold' : ''}`}
        >
          Explore
        </button>
        <button
          onClick={() => onNavigate('google-maps')}
          className={`px-2 py-1 rounded ${activeView === 'google-maps' ? 'text-emerald-800 font-bold' : ''}`}
        >
          Map
        </button>
        <button
          onClick={() => onNavigate('safety')}
          className={`px-2 py-1 rounded ${activeView === 'safety' ? 'text-emerald-800 font-bold' : ''}`}
        >
          Safety AI
        </button>
        <button
          onClick={() => onNavigate('compare')}
          className={`px-2 py-1 rounded ${activeView === 'compare' ? 'text-emerald-800 font-bold' : ''}`}
        >
          Compare
        </button>
        <button
          onClick={() => onNavigate('dashboard')}
          className={`px-2 py-1 rounded ${activeView === 'dashboard' ? 'text-emerald-800 font-bold' : ''}`}
        >
          Dashboard
        </button>
      </div>
    </header>
  );
};
