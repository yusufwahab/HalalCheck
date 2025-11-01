import { Link, useLocation } from 'react-router-dom';
import { Bell, User, Search, Shield } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ user }) => {
  const location = useLocation();
  const [notifications] = useState(3);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-dark-card border-b border-dark-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-dark-text">TrustBridge</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/dashboard" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'text-brand-green border-b-2 border-brand-green' 
                  : 'text-dark-text-secondary hover:text-dark-text'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/explore" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/explore') 
                  ? 'text-brand-green border-b-2 border-brand-green' 
                  : 'text-dark-text-secondary hover:text-dark-text'
              }`}
            >
              Explore
            </Link>
            <Link 
              to="/resources" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/resources') 
                  ? 'text-brand-green border-b-2 border-brand-green' 
                  : 'text-dark-text-secondary hover:text-dark-text'
              }`}
            >
              Resources
            </Link>
            <Link 
              to="/profile" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/profile') 
                  ? 'text-brand-green border-b-2 border-brand-green' 
                  : 'text-dark-text-secondary hover:text-dark-text'
              }`}
            >
              Profile
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-dark-text-secondary" />
              <input
                type="text"
                placeholder="Search companies, regulations..."
                className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border text-dark-text rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-dark-text-secondary hover:text-dark-text">
              <Bell className="h-6 w-6" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-black" />
              </div>
              <span className="hidden md:block text-sm font-medium text-dark-text">
                {user.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;