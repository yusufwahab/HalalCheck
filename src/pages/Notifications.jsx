import { Bell, CheckCircle, AlertTriangle, Clock, FileText, Shield, Users, Calculator, Award, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'zakat_reminder',
      title: 'Zakat Payment Due',
      message: 'Your annual zakat obligation of $1,250 is due this month. Calculate and pay your zakat to fulfill this pillar of Islam.',
      time: '2 hours ago',
      icon: Calculator,
      color: 'purple',
      amount: '$1,250'
    },
    {
      id: 2,
      type: 'success',
      title: 'Halal Certificate Generated',
      message: 'Your Shariah compliance certificate has been successfully generated and is ready for download.',
      time: '5 minutes ago',
      icon: Award,
      color: 'green'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Product Review Required',
      message: 'Your Mixed Equity Fund needs review due to increased haram revenue percentage. Current halal score: 65%.',
      time: '1 hour ago',
      icon: AlertTriangle,
      color: 'yellow'
    },
    {
      id: 4,
      type: 'info',
      title: 'New Halal Alternative Found',
      message: 'We found a Shariah-compliant alternative to your conventional investment with 95% halal score.',
      time: '3 hours ago',
      icon: Heart,
      color: 'red'
    },
    {
      id: 5,
      type: 'info',
      title: 'Scholar Consultation Available',
      message: 'Dr. Ahmed Al-Rashid is available for consultation on complex financial products.',
      time: '1 day ago',
      icon: Users,
      color: 'blue'
    },
    {
      id: 6,
      type: 'info',
      title: 'Halal Score Updated',
      message: 'Your portfolio halal score has improved to 92% after recent product analysis.',
      time: '2 days ago',
      icon: Shield,
      color: 'green'
    }
  ];

  const getIconColor = (color) => {
    switch (color) {
      case 'green': return 'text-green-600 bg-green-100';
      case 'yellow': return 'text-yellow-600 bg-yellow-100';
      case 'blue': return 'text-blue-600 bg-blue-100';
      case 'purple': return 'text-purple-600 bg-purple-100';
      case 'red': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-2xl flex items-center justify-center">
              <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">Notifications</h1>
              <p className="text-gray-600 text-sm sm:text-base">Stay updated with your Shariah compliance activities</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <span className="px-3 sm:px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold">
              {notifications.length} notifications
            </span>
            <button className="text-green-600 hover:text-green-700 font-semibold text-sm">
              Mark all as read
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div key={notification.id} className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-200">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getIconColor(notification.color)}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{notification.title}</h3>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {notification.time}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {notification.message}
                    </p>
                    
                    {notification.type === 'zakat_reminder' ? (
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <Link 
                          to="/zakat-calculator"
                          className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base text-center"
                        >
                          Calculate Zakat
                        </Link>
                        <button className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm sm:text-base">
                          Remind Later
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <button className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base">
                          View Details
                        </button>
                        <button className="px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm sm:text-base">
                          Dismiss
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State (if no notifications) */}
        {notifications.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Bell className="h-12 w-12 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;