import { Link, useLocation } from 'react-router-dom';
import { Home, Building2, FileText, BarChart3, Shield, Users, LogOut, X } from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ user, isOpen = true, onToggle }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/companies', label: 'Companies', icon: Building2 },
    { path: '/data-connections', label: 'My Data', icon: Shield },
    { path: '/register-company', label: 'Register Company', icon: FileText },
    { path: '/policy-upload', label: 'Policy Upload', icon: FileText },
    { path: '/citizen-request', label: 'Data Rights', icon: Users },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-black text-blue-600">TrustBridge</span>
            <div className="text-xs text-gray-500 font-semibold -mt-1">NDPR COMPLIANCE</div>
          </div>
        </Link>
        <button 
          onClick={onToggle}
          className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-gray-900">{user?.name || 'User'}</div>
            <div className="text-xs text-gray-500">NDPR Platform</div>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl font-semibold transition-all duration-200">
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;