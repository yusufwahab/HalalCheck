import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle, Clock, FileText, Users, Download, Calendar, Eye } from 'lucide-react';
import { companies, requests } from '../data/mockData';

const CompanyDetail = ({ user }) => {
  const { id } = useParams();
  const company = companies.find(c => c.id === parseInt(id));
  const companyRequests = requests.filter(r => r.companyId === parseInt(id));

  if (!company) {
    return <div className="p-8 bg-dark-bg text-dark-text">Company not found</div>;
  }

  const getViolationIcon = (type) => {
    return type === 'critical' ? 
      <AlertTriangle className="h-5 w-5 text-red-500" /> :
      <AlertTriangle className="h-5 w-5 text-yellow-500" />;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400 bg-green-900/20 border-green-500/30';
    if (score >= 60) return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
    return 'text-red-400 bg-red-900/20 border-red-500/30';
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/dashboard" className="text-dark-text-secondary hover:text-dark-text">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold text-dark-text">{company.name}</h1>
        </div>

        {/* Company Header */}
        <div className="glass-effect rounded-2xl border border-dark-border/30 p-8 mb-8 shadow-2xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-green to-brand-blue rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-white">
                  {company.name.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-bold gradient-text">{company.name}</h2>
                <p className="text-dark-text-secondary text-lg">{company.website} • {company.industry}</p>
                <p className="text-sm text-dark-text-secondary">Member since Jan 2025</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/policy-upload" className="px-6 py-3 bg-transparent text-brand-green border border-brand-green rounded-xl hover:bg-brand-green hover:text-white transition-all duration-300 font-semibold">Upload Policy</Link>
              <Link to="/dsr-management" className="px-6 py-3 bg-gradient-to-r from-brand-green to-brand-blue text-white rounded-xl hover:shadow-glow transition-all duration-300 font-semibold">Manage DSRs</Link>
            </div>
          </div>
        </div>

        {/* Compliance Overview */}
        <div className="glass-effect rounded-2xl border border-dark-border/30 p-8 mb-8 shadow-2xl">
          <h3 className="text-2xl font-bold gradient-text mb-8">Compliance Overview</h3>
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-8 border-dark-surface flex items-center justify-center relative">
                <div className={`absolute inset-0 rounded-full border-8 ${
                  company.complianceScore >= 80 ? 'border-success' : company.complianceScore >= 60 ? 'border-warning' : 'border-error'
                }`} style={{
                  background: `conic-gradient(${company.complianceScore >= 80 ? '#10B981' : company.complianceScore >= 60 ? '#F59E0B' : '#EF4444'} ${company.complianceScore * 3.6}deg, transparent 0deg)`
                }}></div>
                <div className="text-center z-10 bg-dark-bg rounded-full w-24 h-24 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-bold ${company.complianceScore >= 80 ? 'text-success' : company.complianceScore >= 60 ? 'text-warning' : 'text-error'}`}>{company.complianceScore}</span>
                  <span className="text-dark-text-secondary text-sm">/100</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {company.complianceScore >= 80 ? 
                  <CheckCircle className="h-8 w-8 text-success" /> :
                  <AlertTriangle className="h-8 w-8 text-warning" />
                }
                <span className={`text-2xl font-bold ${
                  company.complianceScore >= 80 ? 'text-success' : company.complianceScore >= 60 ? 'text-warning' : 'text-error'
                }`}>
                  {company.complianceScore >= 80 ? 'Fully Compliant' : company.complianceScore >= 60 ? 'Moderate Risk' : 'High Risk'}
                </span>
              </div>
              <p className="text-dark-text-secondary mb-6 text-lg">Last scan: {company.lastScan}</p>
              <div className="flex gap-3">
                <Link to="/policy-upload" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-green to-brand-blue text-white rounded-xl hover:shadow-glow transition-all duration-300 font-semibold">
                  <Eye className="h-5 w-5" />
                  Rescan Policy
                </Link>
                <Link to="/remediation" className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-brand-green border border-brand-green rounded-xl hover:bg-brand-green hover:text-white transition-all duration-300 font-semibold">
                  Fix Issues
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-6">
            <div className="text-center p-4 bg-success/10 rounded-xl border border-success/30">
              <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-success">7</div>
              <div className="text-success text-sm">Checks Passed</div>
            </div>
            <div className="text-center p-4 bg-warning/10 rounded-xl border border-warning/30">
              <AlertTriangle className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-warning">2</div>
              <div className="text-warning text-sm">Warnings</div>
            </div>
            <div className="text-center p-4 bg-error/10 rounded-xl border border-error/30">
              <AlertTriangle className="h-8 w-8 text-error mx-auto mb-2" />
              <div className="text-2xl font-bold text-error">3</div>
              <div className="text-error text-sm">Critical Issues</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Violations & Fixes */}
            <div className="glass-effect rounded-2xl border border-dark-border/30 shadow-2xl">
              <div className="p-8 border-b border-dark-border/30">
                <h3 className="text-2xl font-bold gradient-text">Violations & Fixes</h3>
                <div className="flex gap-4 mt-4">
                  <button className="px-4 py-2 bg-red-900/20 text-red-400 border border-red-500/30 rounded-lg font-medium">
                    ❌ Critical (2)
                  </button>
                  <button className="px-4 py-2 bg-yellow-900/20 text-yellow-400 border border-yellow-500/30 rounded-lg font-medium">
                    ⚠️ Warnings (1)
                  </button>
                  <button className="px-4 py-2 bg-green-900/20 text-green-400 border border-green-500/30 rounded-lg font-medium">
                    ✅ Passed (7)
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {company.violations.map((violation) => (
                  <div key={violation.id} className="border border-red-500/30 rounded-lg p-6 bg-red-900/10">
                    <div className="flex items-start gap-3 mb-4">
                      {getViolationIcon(violation.type)}
                      <div className="flex-1">
                        <h4 className="font-semibold text-dark-text mb-1">{violation.title}</h4>
                        <p className="text-sm text-dark-text-secondary mb-2">📖 Violates: {violation.article}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="font-medium text-dark-text mb-2">💬 What this means:</h5>
                      <p className="text-sm text-dark-text-secondary mb-4">{violation.description}</p>
                      
                      <h5 className="font-medium text-dark-text mb-2">🤖 AI Recommendation:</h5>
                      <div className="bg-dark-bg border border-dark-border rounded-lg p-4">
                        <p className="text-sm text-dark-text-secondary">{violation.recommendation}</p>
                        <div className="flex gap-2 mt-3">
                          <button className="px-4 py-2 bg-brand-green text-black rounded-lg hover:bg-lemon-green transition-colors text-sm">Copy Text</button>
                          <button className="px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg hover:bg-brand-green hover:text-black transition-colors text-sm">Customize</button>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">Generate Full Template</button>
                      <button className="px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg hover:bg-brand-green hover:text-black transition-colors text-sm">Mark as Fixed</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Citizens & Data Requests */}
            <div className="glass-effect rounded-2xl border border-dark-border/30 shadow-2xl">
              <div className="p-8 border-b border-dark-border/30">
                <h3 className="text-2xl font-bold gradient-text mb-6">Citizens & Data Requests</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-2xl font-bold text-dark-text">{company.connectedUsers.toLocaleString()}</p>
                    <p className="text-dark-text-secondary">Connected Citizens</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">95%</p>
                    <p className="text-dark-text-secondary">Active Consents</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-600">{company.pendingRequests}</p>
                    <p className="text-dark-text-secondary">Pending Requests</p>
                  </div>
                </div>
              </div>
              
              {companyRequests.length > 0 && (
                <div className="p-6">
                  <h4 className="font-semibold mb-4 text-dark-text">⏳ PENDING REQUESTS ({companyRequests.length})</h4>
                  <div className="space-y-4">
                    {companyRequests.map((request) => (
                      <div key={request.id} className="border border-dark-border rounded-lg p-4 bg-dark-bg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h5 className="font-medium text-dark-text">👤 {request.requesterName}</h5>
                            <p className="text-sm text-dark-text-secondary">
                              Request: {request.type === 'access' ? 'Data Access (Right to Portability)' : 'Data Deletion'}
                            </p>
                            <p className="text-sm text-dark-text-secondary">
                              Submitted: {request.submittedDate} • ⏰ Deadline: {request.deadline}
                            </p>
                          </div>
                        </div>
                        {request.message && (
                          <p className="text-sm text-dark-text mb-3 italic">"{request.message}"</p>
                        )}
                        <div className="flex gap-2">
                          <Link to={`/request/${request.id}`} className="px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg hover:bg-brand-green hover:text-black transition-colors text-sm">
                            View Details
                          </Link>
                          <button className="px-4 py-2 bg-brand-green text-black rounded-lg hover:bg-lemon-green transition-colors text-sm">Respond Now</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Privacy Policy */}
            <div className="glass-effect rounded-xl border border-dark-border/30 p-6 shadow-lg">
              <h3 className="text-xl font-bold gradient-text mb-6">Privacy Policy</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-dark-text-secondary" />
                  <div>
                    <p className="font-medium text-dark-text">privacy-policy-v2.pdf</p>
                    <p className="text-sm text-dark-text-secondary">245 KB • Jan 15, 2025</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg hover:bg-brand-green hover:text-black transition-colors text-sm">View Policy</button>
                  <button className="px-4 py-2 bg-brand-green text-black rounded-lg hover:bg-lemon-green transition-colors text-sm">Upload New</button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-effect rounded-xl border border-dark-border/30 p-6 shadow-lg">
              <h3 className="text-xl font-bold gradient-text mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text hover:border-brand-green hover:bg-lemon-green hover:text-black transition-all duration-200 text-sm">
                  <Download className="h-4 w-4 text-brand-green" />
                  Download Certificate
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text hover:border-brand-green hover:bg-lemon-green hover:text-black transition-all duration-200 text-sm">
                  <FileText className="h-4 w-4 text-brand-green" />
                  Generate Report
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text hover:border-brand-green hover:bg-lemon-green hover:text-black transition-all duration-200 text-sm">
                  <Calendar className="h-4 w-4 text-brand-green" />
                  Schedule Auto-Scans
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text hover:border-brand-green hover:bg-lemon-green hover:text-black transition-all duration-200 text-sm">
                  <Users className="h-4 w-4 text-brand-green" />
                  View Analytics
                </button>
              </div>
            </div>

            {/* Audit Trail */}
            <div className="glass-effect rounded-xl border border-dark-border/30 p-6 shadow-lg">
              <h3 className="text-xl font-bold gradient-text mb-6">Recent Actions</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-green rounded-full mt-2"></div>
                  <div>
                    <p className="text-dark-text">DPO contact added</p>
                    <p className="text-dark-text-secondary">Jan 20, 2025 14:32</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-dark-text">Privacy policy v2 uploaded</p>
                    <p className="text-dark-text-secondary">Jan 15, 2025 09:15</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-dark-text">Consent revoked by user</p>
                    <p className="text-dark-text-secondary">Jan 10, 2025 16:45</p>
                  </div>
                </div>
              </div>
              <button className="text-brand-green hover:text-lemon-green text-sm font-medium mt-4">
                View Full Log →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;