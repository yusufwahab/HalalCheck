import { Link } from 'react-router-dom';
import { Upload, Award, Shield, AlertTriangle, CheckCircle, Clock, FileText, Building2, TrendingUp, Users, Zap, Eye } from 'lucide-react';

const Dashboard = ({ user }) => {
  const complianceScore = 78;
  const pendingRequests = 3;
  const totalCompanies = 2;
  const certificateStatus = 'Active';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 ml-64">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-black text-gray-900 mb-3">
                Welcome back, <span className="text-blue-600">{user.name}</span>
              </h1>
              <p className="text-xl text-gray-600">Manage your <span className="text-blue-600 font-semibold">NDPR compliance</span> and data protection requirements</p>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center floating">
                <Shield className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="premium-card rounded-3xl p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-blue-600 rounded-2xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-gray-900">{complianceScore}%</div>
                <div className="text-sm font-semibold text-blue-600">Compliance Score</div>
              </div>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-1000" 
                style={{ width: `${complianceScore}%` }}
              ></div>
            </div>
          </div>
          
          <div className="premium-card rounded-3xl p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-blue-600 rounded-2xl">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-gray-900">{totalCompanies}</div>
                <div className="text-sm font-semibold text-blue-600">Connected Companies</div>
              </div>
            </div>
            <div className="flex items-center text-sm text-blue-600 font-medium">
              <TrendingUp className="h-4 w-4 mr-1" />
              +2 this month
            </div>
          </div>

          <div className="premium-card rounded-3xl p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-blue-600 rounded-2xl">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-gray-900">{pendingRequests}</div>
                <div className="text-sm font-semibold text-blue-600">Pending Requests</div>
              </div>
            </div>
            <div className="flex items-center text-sm text-blue-600 font-medium">
              <Clock className="h-4 w-4 mr-1" />
              2 due today
            </div>
          </div>

          <div className="premium-card rounded-3xl p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-blue-600 rounded-2xl">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-gray-900">{certificateStatus}</div>
                <div className="text-sm font-semibold text-blue-600">Certificate Status</div>
              </div>
            </div>
            <div className="flex items-center text-sm text-blue-600 font-medium">
              <CheckCircle className="h-4 w-4 mr-1" />
              Valid until Dec 2025
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Compliance Overview */}
            <div className="premium-card rounded-3xl p-10">
              <h2 className="text-3xl font-black text-gray-900 mb-8">
                Compliance <span className="text-blue-600">Overview</span>
              </h2>
              
              <div className="flex flex-col lg:flex-row items-center gap-10 mb-10">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full border-8 border-gray-100 flex items-center justify-center relative">
                    <div 
                      className="absolute inset-0 rounded-full border-8 border-blue-500" 
                      style={{
                        background: `conic-gradient(#3b82f6 ${complianceScore * 3.6}deg, transparent 0deg)`
                      }}
                    ></div>
                    <div className="text-center z-10 bg-white rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-lg">
                      <span className="text-4xl font-black text-blue-600">{complianceScore}</span>
                      <span className="text-lg text-gray-500 font-semibold">/100</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-black text-blue-600 mb-3">Excellent Progress!</h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">Your compliance score is above average. Address the remaining issues to achieve full NDPR compliance.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      to="/policy-upload" 
                      className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Upload className="h-5 w-5" />
                      Upload Policy
                    </Link>
                    <Link 
                      to="/remediation" 
                      className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Zap className="h-5 w-5" />
                      Fix Issues
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto mb-3" />
                  <div className="text-3xl font-black text-gray-900 mb-1">12</div>
                  <div className="text-sm font-semibold text-emerald-600">Checks Passed</div>
                </div>
                <div className="text-center p-6 bg-amber-50 rounded-2xl border border-amber-200">
                  <AlertTriangle className="h-12 w-12 text-amber-600 mx-auto mb-3" />
                  <div className="text-3xl font-black text-gray-900 mb-1">3</div>
                  <div className="text-sm font-semibold text-amber-600">Warnings</div>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-2xl border border-red-200">
                  <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-3" />
                  <div className="text-3xl font-black text-gray-900 mb-1">2</div>
                  <div className="text-sm font-semibold text-red-600">Critical Issues</div>
                </div>
              </div>
            </div>

            {/* Data Connections Overview */}
            <div className="premium-card rounded-3xl p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-gray-900">
                  My <span className="text-blue-600">Data Connections</span>
                </h2>
                <Link to="/data-connections" className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  View All
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-blue-50 rounded-2xl">
                  <div className="text-3xl font-black text-blue-600 mb-2">3</div>
                  <div className="text-sm font-semibold text-gray-600">Connected</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-2xl">
                  <div className="text-3xl font-black text-blue-600 mb-2">2</div>
                  <div className="text-sm font-semibold text-gray-600">Pending</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-2xl">
                  <div className="text-3xl font-black text-blue-600 mb-2">1</div>
                  <div className="text-sm font-semibold text-gray-600">Invited</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-6 bg-blue-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-black text-gray-900 text-lg">Jumia Nigeria</div>
                      <div className="text-sm text-gray-600">Email, Phone, Purchase History</div>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full">Connected</span>
                </div>
                
                <div className="flex items-center justify-between p-6 bg-blue-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-black text-gray-900 text-lg">GTBank</div>
                      <div className="text-sm text-gray-600">Account Info, Transaction History</div>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full">Pending</span>
                </div>
              </div>
              
              <Link 
                to="/connect-company" 
                className="w-full flex items-center justify-center gap-3 p-6 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
              >
                <Building2 className="h-6 w-6" />
                Connect New Company
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="premium-card rounded-3xl p-10">
              <h2 className="text-3xl font-black text-gray-900 mb-8">
                Recent <span className="text-blue-600">Activity</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-3"></div>
                  <div className="flex-1">
                    <p className="font-black text-gray-900 text-lg">Policy analysis completed</p>
                    <p className="text-gray-600 mb-2">Compliance score updated to 78%</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-3"></div>
                  <div className="flex-1">
                    <p className="font-black text-gray-900 text-lg">New DSR request received</p>
                    <p className="text-gray-600 mb-2">Data access request from Ada Okafor</p>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-3"></div>
                  <div className="flex-1">
                    <p className="font-black text-gray-900 text-lg">Certificate generated</p>
                    <p className="text-gray-600 mb-2">NDPR compliance certificate issued</p>
                    <p className="text-sm text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="premium-card rounded-3xl p-8">
              <h3 className="text-2xl font-black text-gray-900 mb-6">
                Quick <span className="text-blue-600">Actions</span>
              </h3>
              <div className="space-y-4">
                <Link 
                  to="/policy-upload" 
                  className="w-full flex items-center gap-4 p-5 bg-blue-50 hover:bg-blue-100 rounded-2xl text-gray-900 font-semibold transition-all duration-200 border border-blue-200"
                >
                  <div className="p-3 bg-blue-600 rounded-xl">
                    <Upload className="h-5 w-5 text-white" />
                  </div>
                  <span>Upload Policy</span>
                </Link>
                <Link 
                  to="/companies" 
                  className="w-full flex items-center gap-4 p-5 bg-blue-50 hover:bg-blue-100 rounded-2xl text-gray-900 font-semibold transition-all duration-200 border border-blue-200"
                >
                  <div className="p-3 bg-blue-600 rounded-xl">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <span>View Companies</span>
                </Link>
                <Link 
                  to="/data-connections" 
                  className="w-full flex items-center gap-4 p-5 bg-blue-50 hover:bg-blue-100 rounded-2xl text-gray-900 font-semibold transition-all duration-200 border border-blue-200"
                >
                  <div className="p-3 bg-blue-600 rounded-xl">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <span>My Data Connections</span>
                </Link>
                <Link 
                  to="/register-company" 
                  className="w-full flex items-center gap-4 p-5 bg-blue-50 hover:bg-blue-100 rounded-2xl text-gray-900 font-semibold transition-all duration-200 border border-blue-200"
                >
                  <div className="p-3 bg-blue-600 rounded-xl">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <span>Register Company</span>
                </Link>
              </div>
            </div>

            {/* Compliance Tips */}
            <div className="premium-card rounded-3xl p-8 bg-gradient-to-br from-indigo-50 to-purple-50">
              <h3 className="text-2xl font-black text-gray-900 mb-6">
                💡 <span className="text-indigo-600">Compliance Tips</span>
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-xl border border-indigo-200">
                  <h4 className="font-bold text-gray-900 mb-2">Update Privacy Policy</h4>
                  <p className="text-sm text-gray-600">Ensure your privacy policy reflects current data practices</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-indigo-200">
                  <h4 className="font-bold text-gray-900 mb-2">Appoint Data Officer</h4>
                  <p className="text-sm text-gray-600">Designate a Data Protection Officer for NDPR compliance</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-indigo-200">
                  <h4 className="font-bold text-gray-900 mb-2">Regular Audits</h4>
                  <p className="text-sm text-gray-600">Conduct quarterly data protection impact assessments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;