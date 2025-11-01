import { Link } from 'react-router-dom';
import { Plus, Eye, Scan, AlertTriangle, CheckCircle, Clock, Building2, Shield, Users, FileText, TrendingUp, Zap } from 'lucide-react';
import { companies, dataConnections, activities } from '../data/mockData';

const Dashboard = ({ user }) => {
  const userCompanies = companies.filter(c => c.ownerId === user.id);
  const userDataConnections = dataConnections.filter(d => d.userId === user.id);
  
  const totalRequests = userCompanies.reduce((sum, company) => sum + company.pendingRequests, 0);
  const avgScore = Math.round(userCompanies.reduce((sum, company) => sum + company.complianceScore, 0) / userCompanies.length) || 0;
  const totalConnected = userDataConnections.length;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-brand-green bg-brand-green/20 border-brand-green/30';
    if (score >= 60) return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/30';
    return 'text-red-500 bg-red-500/20 border-red-500/30';
  };

  const getStatusIcon = (score) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-brand-green" />;
    if (score >= 60) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <AlertTriangle className="h-5 w-5 text-red-500" />;
  };

  const getActivityIcon = (activity) => {
    const iconMap = {
      success: '✅',
      warning: '⚠️',
      info: 'ℹ️',
      danger: '❌'
    };
    return iconMap[activity.status] || activity.icon;
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-text">👋 Welcome back, <span className="text-brand-green">{user.name}</span>!</h1>
          <p className="text-dark-text-secondary mt-1">Saturday, November 01, 2025</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-dark-text">{userCompanies.length}</p>
                <p className="text-sm text-dark-text-secondary">Companies</p>
              </div>
              <Building2 className="h-8 w-8 text-brand-green" />
            </div>
          </div>
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-dark-text">{avgScore}%</p>
                <p className="text-sm text-dark-text-secondary">Avg Score</p>
              </div>
              <Shield className="h-8 w-8 text-brand-green" />
            </div>
          </div>
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-dark-text">{totalRequests}</p>
                <p className="text-sm text-dark-text-secondary">Requests</p>
              </div>
              <FileText className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-dark-text">{totalConnected}</p>
                <p className="text-sm text-dark-text-secondary">Connected</p>
              </div>
              <Users className="h-8 w-8 text-brand-green" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Companies */}
            <div className="bg-dark-card border border-dark-border rounded-xl">
              <div className="p-6 border-b border-dark-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-dark-text flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-brand-green" />
                    MY <span className="text-brand-green">COMPANIES</span>
                  </h2>
                  <Link to="/company/new" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-black rounded-xl font-bold hover:bg-lemon-green transition-all duration-200">
                    <Plus className="h-4 w-4" />
                    Register New Company
                  </Link>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {userCompanies.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-lemon-green rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Building2 className="h-8 w-8 text-black" />
                    </div>
                    <h3 className="text-lg font-semibold text-dark-text mb-2">No Companies Yet</h3>
                    <p className="text-dark-text-secondary mb-6">Register your first company to start managing NDPR compliance</p>
                    <Link to="/company/new" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-black rounded-xl font-bold hover:bg-lemon-green transition-all duration-200">
                      <Plus className="h-4 w-4" />
                      Register Company
                    </Link>
                  </div>
                ) : (
                  userCompanies.map((company) => (
                    <div key={company.id} className="bg-dark-bg border border-dark-border rounded-lg p-6 hover:border-brand-green transition-all duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-lemon-green rounded-xl flex items-center justify-center text-2xl">
                            {company.logo}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-dark-text">{company.name}</h3>
                            <p className="text-sm text-dark-text-secondary">{company.website} • {company.industry}</p>
                          </div>
                        </div>
                        <button className="text-dark-text-secondary hover:text-brand-green transition-colors">
                          <span className="text-lg">•••</span>
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-6 mb-4">
                        <div className={`w-20 h-20 rounded-full border-2 flex flex-col items-center justify-center font-bold ${getScoreColor(company.complianceScore)}`}>
                          <span className="text-xl">{company.complianceScore}</span>
                          <span className="text-xs">/100</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusIcon(company.complianceScore)}
                            <span className="font-medium text-dark-text">
                              {company.complianceScore >= 80 ? 'Fully Compliant' : 
                               company.complianceScore >= 60 ? 'Needs Attention' : 'Critical Issues'}
                            </span>
                          </div>
                          <p className="text-sm text-dark-text-secondary">Last scan: {company.lastScan}</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        {company.violations && company.violations.length > 0 ? (
                          <>
                            <p className="text-sm text-red-400">⚠️ {company.violations.length} violations to fix</p>
                            <p className="text-sm text-yellow-400">📬 {company.pendingRequests} pending citizen requests</p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm text-brand-green">✓ All checks passed</p>
                            <p className="text-sm text-brand-green">✓ No pending requests</p>
                          </>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <Link to={`/company/${company.id}`} className="inline-flex items-center gap-2 px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg font-semibold hover:bg-brand-green hover:text-black transition-all duration-200">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Link>
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green text-black rounded-lg font-semibold hover:bg-lemon-green transition-all duration-200">
                          <Scan className="h-4 w-4" />
                          Scan Now
                        </button>
                        {company.pendingRequests > 0 && (
                          <Link to={`/company/${company.id}/requests`} className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-600 transition-all duration-200">
                            View Requests
                          </Link>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* My Data */}
            <div className="bg-dark-card border border-dark-border rounded-xl">
              <div className="p-6 border-b border-dark-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-dark-text flex items-center gap-2">
                    <Shield className="h-5 w-5 text-brand-green" />
                    MY <span className="text-brand-green">DATA</span>
                  </h2>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg font-semibold hover:bg-brand-green hover:text-black transition-all duration-200">
                    <Plus className="h-4 w-4" />
                    Track Another Company
                  </button>
                </div>
              </div>
              <div className="p-6">
                {userDataConnections.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-lemon-green rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-black" />
                    </div>
                    <h3 className="text-lg font-semibold text-dark-text mb-2">No Data Connections</h3>
                    <p className="text-dark-text-secondary mb-6">Start tracking companies that hold your personal data</p>
                    <Link to="/my-data/add" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-black rounded-xl font-bold hover:bg-lemon-green transition-all duration-200">
                      <Plus className="h-4 w-4" />
                      Add Company
                    </Link>
                  </div>
                ) : (
                  <>
                    <p className="text-dark-text-secondary mb-6">Companies holding your personal data:</p>
                    <div className="space-y-6">
                      {userDataConnections.map((connection) => (
                        <div key={connection.id} className="bg-dark-bg border border-dark-border rounded-lg p-6 hover:border-brand-green transition-all duration-200">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{connection.companyLogo}</span>
                              <div>
                                <h3 className="font-semibold text-dark-text">{connection.companyName}</h3>
                                <p className="text-sm text-dark-text-secondary">Compliance: <span className="text-brand-green">{connection.complianceScore}/100</span></p>
                              </div>
                            </div>
                            <button className="text-dark-text-secondary hover:text-brand-green transition-colors">
                              <span className="text-lg">•••</span>
                            </button>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm font-medium text-dark-text mb-2">Data they hold:</p>
                            <ul className="text-sm text-dark-text-secondary space-y-1">
                              {connection.dataTypes.map((type, index) => (
                                <li key={index}>• {type}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm text-dark-text-secondary">
                              <span className="font-medium text-dark-text">Purpose:</span> {connection.purpose}
                            </p>
                            <p className="text-sm text-dark-text-secondary">
                              <span className="font-medium text-dark-text">Consent:</span> <span className="text-brand-green">✅ Active since {connection.consentDate}</span>
                            </p>
                          </div>

                          <div className="flex gap-3">
                            <button className="inline-flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-200 text-sm">
                              Revoke Consent
                            </button>
                            <button className="inline-flex items-center gap-2 px-3 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg font-semibold hover:bg-brand-green hover:text-black transition-all duration-200 text-sm">
                              Request Data
                            </button>
                            <button className="inline-flex items-center gap-2 px-3 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg font-semibold hover:bg-brand-green hover:text-black transition-all duration-200 text-sm">
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-dark-card border border-dark-border rounded-xl">
              <div className="p-6 border-b border-dark-border">
                <h3 className="text-lg font-semibold text-dark-text flex items-center gap-2">
                  <Clock className="h-5 w-5 text-brand-green" />
                  RECENT <span className="text-brand-green">ACTIVITY</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === 'success' ? 'bg-brand-green' :
                        activity.status === 'warning' ? 'bg-yellow-500' :
                        activity.status === 'info' ? 'bg-brand-green' : 'bg-dark-text-secondary'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-dark-text">{activity.message}</p>
                        <p className="text-xs text-dark-text-secondary">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link to="/activity" className="text-brand-green hover:text-lemon-green text-sm font-medium">
                    View All Activity →
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-dark-card border border-dark-border rounded-xl">
              <div className="p-6 border-b border-dark-border">
                <h3 className="text-lg font-semibold text-dark-text flex items-center gap-2">
                  <Zap className="h-5 w-5 text-brand-green" />
                  QUICK <span className="text-brand-green">ACTIONS</span>
                </h3>
              </div>
              <div className="p-6 space-y-3">
                <Link to="/company/new" className="w-full flex items-center gap-3 p-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text hover:border-brand-green hover:bg-lemon-green hover:text-black transition-all duration-200">
                  <Plus className="h-5 w-5 text-brand-green" />
                  Register Company
                </Link>
                <Link to="/scan" className="w-full flex items-center gap-3 p-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text hover:border-brand-green hover:bg-lemon-green hover:text-black transition-all duration-200">
                  <Scan className="h-5 w-5 text-brand-green" />
                  Free Compliance Scan
                </Link>
                <Link to="/explore" className="w-full flex items-center gap-3 p-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text hover:border-brand-green hover:bg-lemon-green hover:text-black transition-all duration-200">
                  <TrendingUp className="h-5 w-5 text-brand-green" />
                  View Leaderboard
                </Link>
                <Link to="/resources" className="w-full flex items-center gap-3 p-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text hover:border-brand-green hover:bg-lemon-green hover:text-black transition-all duration-200">
                  <FileText className="h-5 w-5 text-brand-green" />
                  Download Templates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;