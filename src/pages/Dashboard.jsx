import { Link } from 'react-router-dom';
import { Calculator, Award, Shield, AlertTriangle, CheckCircle, Clock, FileText, Building2, TrendingUp, Users, Zap, Eye, Bell, Activity, Calendar, Globe, Heart, Star, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [userName] = useState('Ahmad');
  const halalScore = 92;
  const productsAnalyzed = 8;
  const zakatDue = 1250;
  const certificateStatus = 'Active';
  
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({ halal: 0, needsReview: 0, haram: 0 });
  const [animatedQuickStats, setAnimatedQuickStats] = useState({ score: 0, products: 0, zakat: 0 });
  const [notifications] = useState(2);

  useEffect(() => {
    // Animate halal score
    const scoreTimer = setTimeout(() => {
      let current = 0;
      const increment = halalScore / 60;
      const scoreInterval = setInterval(() => {
        current += increment;
        if (current >= halalScore) {
          setAnimatedScore(halalScore);
          clearInterval(scoreInterval);
        } else {
          setAnimatedScore(current);
        }
      }, 25);
    }, 500);

    // Animate overview stats
    const statsTimer = setTimeout(() => {
      const statsInterval = setInterval(() => {
        setAnimatedStats(prev => {
          const newStats = {
            halal: Math.min(prev.halal + 1, 6),
            needsReview: Math.min(prev.needsReview + 1, 2),
            haram: Math.min(prev.haram + 1, 0)
          };
          if (newStats.halal === 6 && newStats.needsReview === 2 && newStats.haram === 0) {
            clearInterval(statsInterval);
          }
          return newStats;
        });
      }, 100);
    }, 1000);

    // Animate quick stats cards
    const quickStatsTimer = setTimeout(() => {
      const quickInterval = setInterval(() => {
        setAnimatedQuickStats(prev => {
          const newStats = {
            score: Math.min(prev.score + 2, halalScore),
            products: Math.min(prev.products + 1, productsAnalyzed),
            zakat: Math.min(prev.zakat + 50, zakatDue)
          };
          if (newStats.score === halalScore && newStats.products === productsAnalyzed && newStats.zakat === zakatDue) {
            clearInterval(quickInterval);
          }
          return newStats;
        });
      }, 50);
    }, 200);

    return () => {
      clearTimeout(scoreTimer);
      clearTimeout(statsTimer);
      clearTimeout(quickStatsTimer);
    };
  }, [halalScore, productsAnalyzed, zakatDue]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 px-3 sm:px-6 py-4 sm:py-8">
        {/* Welcome Header */}
        <div className="mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-1 sm:mb-2">
                Assalamu Alaikum, <span className="text-green-600">{userName}</span>
              </h1>
              <p className="text-sm sm:text-lg text-gray-600">Manage your <span className="text-green-600 font-semibold">Shariah</span> <span className="text-green-600 font-semibold">compliance</span></p>
            </div>
            <Link to="/notifications" className="relative p-2 sm:p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 self-start sm:self-auto">
              <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8">
          <div className="premium-card rounded-xl sm:rounded-2xl p-3 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 border-l-2 sm:border-l-4 border-green-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-green-600 rounded-lg sm:rounded-xl mb-2 sm:mb-0 self-start">
                <Shield className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-left sm:text-right">
                <div className="text-lg sm:text-2xl lg:text-3xl font-black text-gray-900">{Math.round(animatedQuickStats.score)}%</div>
                <div className="text-xs sm:text-sm font-semibold text-green-600">Halal Score</div>
              </div>
            </div>
            <div className="w-full bg-green-200 rounded-full h-1 sm:h-2">
              <div 
                className="bg-green-600 h-1 sm:h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${animatedQuickStats.score}%` }}
              ></div>
            </div>
          </div>
          
          <div className="premium-card rounded-xl sm:rounded-2xl p-3 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-l-2 sm:border-l-4 border-blue-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-blue-600 rounded-lg sm:rounded-xl mb-2 sm:mb-0 self-start">
                <FileText className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-left sm:text-right">
                <div className="text-lg sm:text-2xl lg:text-3xl font-black text-gray-900">{animatedQuickStats.products}</div>
                <div className="text-xs sm:text-sm font-semibold text-blue-600">Products</div>
              </div>
            </div>
          </div>

          <div className="premium-card rounded-xl sm:rounded-2xl p-3 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-l-2 sm:border-l-4 border-purple-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-purple-600 rounded-lg sm:rounded-xl mb-2 sm:mb-0 self-start">
                <Calculator className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-left sm:text-right">
                <div className="text-lg sm:text-2xl lg:text-3xl font-black text-gray-900">${animatedQuickStats.zakat}</div>
                <div className="text-xs sm:text-sm font-semibold text-purple-600">Zakat Due</div>
              </div>
            </div>
          </div>

          <div className="premium-card rounded-xl sm:rounded-2xl p-3 sm:p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-l-2 sm:border-l-4 border-yellow-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-yellow-600 rounded-lg sm:rounded-xl mb-2 sm:mb-0 self-start">
                <Award className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-left sm:text-right">
                <div className="text-sm sm:text-lg lg:text-xl font-black text-gray-900">{certificateStatus}</div>
                <div className="text-xs sm:text-sm font-semibold text-yellow-600">Certificate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-3 sm:gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-6">
            {/* Recent Activity */}
            <div className="premium-card rounded-xl sm:rounded-2xl p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6">
                Recent <span className="text-green-600">Activity</span>
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: Shield,
                    title: 'Product Analysis Completed',
                    description: 'Shariah compliance analysis finished for Islamic Investment Fund',
                    time: '1 hour ago',
                    color: 'green'
                  },
                  {
                    icon: Calculator,
                    title: 'Zakat Calculated',
                    description: 'Annual zakat obligation calculated: $1,250 due',
                    time: '3 hours ago',
                    color: 'purple'
                  },
                  {
                    icon: Heart,
                    title: 'Halal Alternative Found',
                    description: 'Recommended Amana Mutual Funds as compliant alternative',
                    time: '1 day ago',
                    color: 'red'
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activity.color === 'green' ? 'bg-green-100 text-green-600' :
                      activity.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      <activity.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{activity.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                to="/action-history" 
                className="block mt-6 text-center px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors"
              >
                View Full History
              </Link>
            </div>

            {/* Shariah Compliance Overview */}
            <div className="premium-card rounded-xl sm:rounded-2xl p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6">
                Shariah <span className="text-green-600">Compliance</span>
              </h2>
              
              <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-8 mb-4 sm:mb-8">
                <div className="relative w-20 h-20 sm:w-32 sm:h-32 mx-auto">
                  <svg className="w-20 h-20 sm:w-32 sm:h-32 transform -rotate-90" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#16a34a"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - animatedScore / 100)}`}
                      className="transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-white rounded-full w-16 h-16 sm:w-24 sm:h-24 flex flex-col items-center justify-center shadow-lg">
                      <span className="text-sm sm:text-xl font-black text-green-600">{Math.round(animatedScore)}</span>
                      <span className="text-xs text-gray-500 font-semibold">/100</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-lg sm:text-xl font-black text-green-600 mb-2">Excellent Compliance!</h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4">Your portfolio is highly Shariah-compliant. Keep up the good work!</p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <Link 
                      to="/product-analysis" 
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <FileText className="h-4 w-4" />
                      Analyze Product
                    </Link>
                    <Link 
                      to="/halal-alternatives" 
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-white border-2 border-green-600 text-green-600 rounded-xl font-bold hover:bg-green-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <Heart className="h-4 w-4" />
                      Find Alternatives
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="text-center p-3 sm:p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mx-auto mb-2" />
                  <div className="text-lg sm:text-2xl font-black text-gray-900 mb-1">{animatedStats.halal}</div>
                  <div className="text-xs sm:text-sm font-semibold text-emerald-600">Halal</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 mx-auto mb-2" />
                  <div className="text-lg sm:text-2xl font-black text-gray-900 mb-1">{animatedStats.needsReview}</div>
                  <div className="text-xs sm:text-sm font-semibold text-amber-600">Review</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-red-50 rounded-xl border border-red-200">
                  <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 mx-auto mb-2" />
                  <div className="text-lg sm:text-2xl font-black text-gray-900 mb-1">{animatedStats.haram}</div>
                  <div className="text-xs sm:text-sm font-semibold text-red-600">Haram</div>
                </div>
              </div>
            </div>

            {/* Islamic Finance Insights */}
            <div className="premium-card rounded-xl sm:rounded-2xl p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6">
                Islamic Finance <span className="text-green-600">Insights</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="h-6 w-6 text-green-600" />
                    <h3 className="font-bold text-gray-900">Top Halal Investment</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-green-600 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Amana Mutual Funds</div>
                      <div className="text-sm text-gray-600">95% Halal Score</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Calculator className="h-6 w-6 text-purple-600" />
                    <h3 className="font-bold text-gray-900">Zakat Status</h3>
                  </div>
                  <div className="text-2xl font-black text-purple-600 mb-1">$1,250</div>
                  <div className="text-sm text-gray-600">Due this month</div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">Scholar Consultation Available</h4>
                    <p className="text-blue-700 text-sm">Dr. Ahmed Al-Rashid is available for consultation on complex financial products. Book a session for detailed guidance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-3 sm:space-y-6">
            {/* Quick Actions */}
            <div className="premium-card rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-4">
                Quick <span className="text-green-600">Actions</span>
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <Link 
                  to="/product-analysis" 
                  className="w-full flex items-center gap-3 p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-xl text-gray-900 font-semibold transition-all duration-200 border border-green-200 text-sm sm:text-base"
                >
                  <div className="p-2 bg-green-600 rounded-lg">
                    <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <span>Check Product</span>
                </Link>
                <Link 
                  to="/zakat-calculator" 
                  className="w-full flex items-center gap-3 p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-xl text-gray-900 font-semibold transition-all duration-200 border border-green-200 text-sm sm:text-base"
                >
                  <div className="p-2 bg-green-600 rounded-lg">
                    <Calculator className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <span>Calculate Zakat</span>
                </Link>
                <Link 
                  to="/scholar-network" 
                  className="w-full flex items-center gap-3 p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-xl text-gray-900 font-semibold transition-all duration-200 border border-green-200 text-sm sm:text-base"
                >
                  <div className="p-2 bg-green-600 rounded-lg">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <span>Consult Scholar</span>
                </Link>
              </div>
            </div>

            {/* Recent Products */}
            <div className="premium-card rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-4">
                Recent <span className="text-green-600">Products</span>
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Islamic Investment Fund', score: 95, status: 'Halal' },
                  { name: 'Sukuk Bond Portfolio', score: 92, status: 'Halal' },
                  { name: 'Takaful Insurance', score: 88, status: 'Halal' },
                  { name: 'Mixed Equity Fund', score: 65, status: 'Review' },
                  { name: 'Crypto Investment', score: 45, status: 'Haram' }
                ].map((product, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      product.status === 'Halal' ? 'bg-green-100 text-green-600' :
                      product.status === 'Review' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {product.status === 'Halal' ? <CheckCircle className="h-5 w-5" /> :
                       product.status === 'Review' ? <AlertTriangle className="h-5 w-5" /> :
                       <AlertTriangle className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">{product.name}</div>
                      <div className="text-xs text-gray-600">{product.score}% Score</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      product.status === 'Halal' ? 'bg-green-500' :
                      product.status === 'Review' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                  </div>
                ))}
              </div>
              <Link 
                to="/halal-score" 
                className="block mt-4 text-center text-green-600 hover:text-green-700 font-semibold text-sm"
              >
                View All Analyses
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;