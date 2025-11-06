import { Bell, Search, Menu } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ user, onToggleSidebar, sidebarOpen }) => {
  const [notifications] = useState(3);

  return (
    <nav className={`glass-effect border-b border-gray-200 sticky top-4 z-30 backdrop-blur-xl transition-all duration-300 ${
      sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
    }`}>
      <div className="px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Search Bar */}
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies, regulations..."
                className="w-full pl-12 pr-6 py-3 bg-gray-50 border-2 border-gray-200 text-gray-900 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          {/* Right side - Notifications */}
          <div className="flex items-center gap-4">
            <button className="relative p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all duration-200">
              <Bell className="h-6 w-6" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;