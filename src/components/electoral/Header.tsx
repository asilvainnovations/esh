import React, { useState, useRef, useEffect } from 'react';
import { Vote, Bell, Search, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth, ROLE_LABELS } from '@/contexts/AuthContext';

// Logo configuration - centralized for easy updates
const LOGO_URL = 'https://sjbdpedlfwwszvsnrspi.databasepad.com/storage/v1/object/public/next-tasks/public/asilva%20-iinvations-app_logo.png';
const LOGO_ALT = 'Electoral Strategy Hub Logo';

interface HeaderProps {
  onSignIn: () => void;
  onSearch: (q: string) => void;
  searchQuery: string;
  onOpenProfile: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignIn, onSearch, searchQuery, onOpenProfile }) => {
  const { user, profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Generate user initials for avatar fallback
  const initials = profile
    ? (profile.full_name || profile.email)
        .split(' ')
        .map((s) => s[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '';

  // Handle logo image load error with graceful fallback
  const handleLogoError = () => {
    setLogoError(true);
    console.warn('Logo failed to load, falling back to icon');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo & Brand Section */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.href = '/'}>
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Circular transparent container */}
            {!logoError ? (
              <img
                src={LOGO_URL}
                alt={LOGO_ALT}
                className="w-10 h-10 rounded-full object-contain bg-transparent transition-transform group-hover:scale-105"
                onError={handleLogoError}
                loading="eager"
              />
            ) : (
              // Fallback icon with circular transparent background
              <div className="w-10 h-10 rounded-full bg-transparent border border-slate-200 flex items-center justify-center text-blue-900">
                <Vote size={20} strokeWidth={2} />
              </div>
            )}
          </div>
          
          <div className="min-w-0">
            <h1 className="font-bold text-slate-900 text-lg leading-tight truncate">Electoral Strategy Hub</h1>
            <p className="text-xs text-slate-500 leading-tight hidden sm:block">Electoral Assessment & Strategy</p>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" 
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search frameworks, programs, case studies..."
            aria-label="Search electoral strategies and resources"
            className="w-full pl-10 pr-4 py-2 bg-slate-100/80 border border-transparent rounded-lg 
                      focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
                      focus:outline-none transition-all text-sm placeholder:text-slate-400"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          {/* Mobile Search Toggle (optional enhancement) */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
            aria-label="Open search"
          >
            <Search size={20} />
          </button>

          {/* Notifications */}
          <button 
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg relative transition"
            aria-label="View notifications"
            aria-describedby="notification-count"
          >
            <Bell size={20} />
            <span 
              id="notification-count"
              className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white"
            />
          </button>

          {/* Auth Section */}
          {user && profile ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 pl-1 pr-1.5 py-1.5 hover:bg-slate-100 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-expanded={menuOpen}
                aria-haspopup="true"
                aria-label={`User menu for ${profile.full_name || 'User'}`}
              >
                {/* User Avatar - Circular with transparent bg */}
                <div className="w-8 h-8 rounded-full bg-transparent border border-slate-200 overflow-hidden flex items-center justify-center">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={`${profile.full_name || 'User'} avatar`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <span className={`text-xs font-bold text-slate-700 bg-slate-100 w-full h-full flex items-center justify-center ${profile.avatar_url ? 'hidden' : ''}`}>
                    {initials}
                  </span>
                </div>
                
                {/* User Info */}
                <div className="hidden sm:block text-left min-w-0">
                  <p className="text-sm font-semibold text-slate-900 leading-tight truncate max-w-[120px]">
                    {profile.full_name || 'User'}
                  </p>
                  <p className="text-xs text-slate-500 leading-tight">{ROLE_LABELS[profile.role]}</p>
                </div>
                <ChevronDown 
                  size={14} 
                  className={`text-slate-500 transition-transform ${menuOpen ? 'rotate-180' : ''}`} 
                  aria-hidden="true"
                />
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg 
                            shadow-slate-200/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2"
                  role="menu"
                >
                  {/* User Header */}
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-sm font-semibold text-slate-900 truncate">{profile.full_name || 'User'}</p>
                    <p className="text-xs text-slate-500 truncate">{profile.email}</p>
                  </div>
                  
                  {/* Menu Items */}
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenProfile();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 
                              hover:bg-slate-50 hover:text-slate-900 text-left transition-colors"
                    role="menuitem"
                  >
                    <Settings size={16} className="text-slate-400" />
                    Profile & Settings
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      signOut();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 
                              hover:bg-red-50 text-left border-t border-slate-100 transition-colors"
                    role="menuitem"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onSignIn}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg 
                        hover:bg-blue-800 active:bg-blue-950 transition-colors text-sm font-medium
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <User size={16} />
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;