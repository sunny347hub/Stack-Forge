import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { progressService } from '../services/progressService';
import { 
  Flame, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  Compass, 
  ChevronDown 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [streak, setStreak] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    if (user) {
      progressService.getStreakCount(user.id).then(setStreak);
    }
  }, [user, location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-dark-border bg-dark-bg/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forge-500 to-forge-700 flex items-center justify-center shadow-lg shadow-forge-500/20 group-hover:shadow-forge-500/40 transition-all">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19L12 22L20 19" />
              <path d="M4 14L12 17L20 14" />
              <path d="M4 9L12 12L20 9L12 4L4 9Z" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-forge-400 transition-colors">
              Stack<span className="text-forge-500">Forge</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/learn"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive('/learn')
                ? 'text-white bg-slate-800/80'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/learning-paths"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive('/learning-paths')
                ? 'text-white bg-slate-800/80'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            Full-Stack Path
          </Link>
        </nav>

        {/* Desktop Right Action Area */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Daily UTC Streak Indicator */}
              <div 
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-forge-500/10 border border-forge-500/30 text-forge-400 text-xs font-semibold"
                title={`${streak} Day Streak (UTC)`}
              >
                <Flame className="w-4 h-4 text-forge-500 animate-pulse-subtle fill-forge-500" />
                <span>{streak} {streak === 1 ? 'day' : 'days'}</span>
              </div>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-dark-card border border-dark-border hover:border-slate-600 transition-all text-sm"
                >
                  <span className="font-medium text-slate-200">
                    {profile?.full_name || user.email?.split('@')[0]}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-forge-600/30 border border-forge-500/50 flex items-center justify-center text-forge-300 font-bold text-xs uppercase">
                    {(profile?.full_name || user.email || 'U')[0]}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-dark-card border border-dark-border shadow-2xl py-2 z-50 animate-fade-in"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-dark-border">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-200 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      to="/learn"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
                    >
                      <Compass className="w-4 h-4 text-slate-400" />
                      <span>My Learning</span>
                    </Link>

                    <div className="border-t border-dark-border my-1" />

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-forge-600 to-forge-500 hover:from-forge-500 hover:to-forge-400 shadow-md shadow-forge-500/20 transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          {user && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-forge-500/10 border border-forge-500/30 text-forge-400 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 fill-forge-500" />
              <span>{streak}</span>
            </div>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-dark-border bg-dark-surface px-4 py-4 space-y-3">
          <Link
            to="/learn"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Dashboard
          </Link>
          <Link
            to="/learning-paths"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Full-Stack Path
          </Link>

          {user ? (
            <div className="border-t border-dark-border pt-3 space-y-2">
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
              >
                Profile ({profile?.full_name || user.email})
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-rose-400 hover:bg-rose-500/10"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="border-t border-dark-border pt-3 space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-4 py-2 rounded-lg text-sm font-medium text-slate-200 bg-slate-800"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-forge-600"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
