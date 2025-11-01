import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertTriangle, Star, Clock, Users, FileText, Shield } from 'lucide-react';
import { useState } from 'react';

const CompanyProfile = ({ user }) => {
  const { companyId } = useParams();
  const [isConnected, setIsConnected] = useState(false);
  
  // Mock company data - in real app this would come from API
  const company = {
    id: companyId,
    name: 'Jumia Nigeria',
    website: 'www.jumia.com.ng',
    industry: 'E-commerce',
    location: 'Lagos, Nigeria',
    memberSince: '2024',
    complianceScore: 85,
    lastVerified: '1 week ago',
    trustedUsers: 45230,
    avgResponseTime: 7,
    completionRate: 98,
    avgRating: 4.6,
    strengths: [
      'Has designated Data Protection Officer',
      'Clear data retention policy (2 years)',
      'Cookie consent properly implemented',
      'User rights clearly explained',
      'Security measures documented'
    ],
    improvements: [
      '2 minor issues identified (not user-facing)'
    ]
  };

  const userConnection = {
    dataTypes: [
      'Email: chidi@example.com',
      'Phone: +234 801 234 5678',
      'Purchase history (24 orders since 2023)',
      '3 Delivery addresses',
      'Payment info (last 4 digits only)'
    ],
    purpose: 'Order fulfillment & marketing',
    consentDate: 'Jan 15, 2025'
  };

  const reviews = [
    {
      id: 1,
      rating: 5,
      text: 'Quick response to my data request',
      author: 'Oluwaseun A.',
      date: '2 weeks ago'
    },
    {
      id: 2,
      rating: 4,
      text: 'Clear privacy policy, easy to understand',
      author: 'Amina K.',
      date: '1 month ago'
    }
  ];

  const RequestModal = ({ isOpen, onClose, type }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-dark-card rounded-xl p-8 max-w-md w-full mx-4 border border-dark-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-dark-text">Request Your Data from {company.name}</h3>
            <button onClick={onClose} className="text-dark-text-secondary hover:text-dark-text">✕</button>
          </div>
          
          <div className="space-y-4 mb-6">
            <label className="flex items-start gap-3 p-4 border border-dark-border rounded-lg cursor-pointer hover:bg-dark-bg">
              <input type="radio" name="requestType" value="access" className="mt-1" />
              <div>
                <div className="font-medium text-dark-text">Access my data</div>
                <div className="text-sm text-dark-text-secondary">Get a complete copy of all data they hold about you</div>
                <div className="text-sm text-dark-text-secondary">⏰ Response time: Usually 7 days</div>
              </div>
            </label>
            
            <label className="flex items-start gap-3 p-4 border border-dark-border rounded-lg cursor-pointer hover:bg-dark-bg">
              <input type="radio" name="requestType" value="delete" className="mt-1" />
              <div>
                <div className="font-medium text-dark-text">Delete my data</div>
                <div className="text-sm text-dark-text-secondary">Permanently erase your data from their systems</div>
                <div className="text-sm text-yellow-600">⚠️ May close your account</div>
              </div>
            </label>
            
            <label className="flex items-start gap-3 p-4 border border-dark-border rounded-lg cursor-pointer hover:bg-dark-bg">
              <input type="radio" name="requestType" value="correct" className="mt-1" />
              <div>
                <div className="font-medium text-dark-text">Correct my data</div>
                <div className="text-sm text-dark-text-secondary">Update inaccurate information</div>
              </div>
            </label>
            
            <label className="flex items-start gap-3 p-4 border border-dark-border rounded-lg cursor-pointer hover:bg-dark-bg">
              <input type="radio" name="requestType" value="complaint" className="mt-1" />
              <div>
                <div className="font-medium text-dark-text">File a complaint</div>
                <div className="text-sm text-dark-text-secondary">Report privacy concerns or violations</div>
              </div>
            </label>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-dark-text mb-2">
              Add details (optional):
            </label>
            <textarea 
              className="w-full border border-dark-border bg-dark-bg text-dark-text rounded-lg p-3 text-sm"
              rows="3"
              placeholder="Tell them more about your request..."
            ></textarea>
          </div>
          
          <div className="bg-lemon-green p-4 rounded-lg mb-6">
            <h4 className="font-medium mb-2 text-black">📋 What happens next?</h4>
            <ol className="text-sm text-gray-800 space-y-1">
              <li>1. Your request is sent to {company.name} immediately</li>
              <li>2. They have 30 days to respond (NDPR requirement)</li>
              <li>3. You'll get notified when they respond</li>
              <li>4. All actions are logged for legal purposes</li>
            </ol>
          </div>
          
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg hover:bg-brand-green hover:text-black transition-colors flex-1">Cancel</button>
            <button className="px-4 py-2 bg-brand-green text-black rounded-lg hover:bg-lemon-green transition-colors flex-1">Submit Request →</button>
          </div>
        </div>
      </div>
    );
  };

  const [showRequestModal, setShowRequestModal] = useState(false);

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/explore" className="text-dark-text-secondary hover:text-dark-text">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <span className="text-dark-text-secondary">Back to Search</span>
        </div>

        {/* Company Header */}
        <div className="bg-dark-card rounded-xl border border-dark-border p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-lemon-green rounded-xl flex items-center justify-center">
                <span className="text-3xl font-bold text-black">J</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-dark-text">{company.name}</h1>
                <p className="text-dark-text-secondary">{company.website}</p>
                <p className="text-dark-text-secondary">{company.industry} • {company.location}</p>
                <p className="text-sm text-dark-text-secondary">Member since {company.memberSince}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-green-50 flex flex-col items-center justify-center mb-2">
                <span className="text-2xl font-bold text-green-600">{company.complianceScore}</span>
                <span className="text-sm text-green-600">/100</span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Compliant</span>
              </div>
              <p className="text-xs text-dark-text-secondary mt-1">Last verified: {company.lastVerified}</p>
              <p className="text-xs text-dark-text-secondary">{company.trustedUsers.toLocaleString()} users trust this company</p>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="bg-dark-card rounded-xl border border-dark-border p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-dark-text">Your Connection Status</h2>
          
          {isConnected ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium text-green-600">Connected</span>
              </div>
              <p className="text-dark-text-secondary mb-6">You're currently tracking this company's use of your data</p>
              
              <div className="border border-dark-border rounded-lg p-6 mb-6 bg-dark-bg">
                <h3 className="font-medium mb-4 text-dark-text">Data they hold about you:</h3>
                <ul className="space-y-2 mb-4">
                  {userConnection.dataTypes.map((type, index) => (
                    <li key={index} className="text-sm text-dark-text-secondary">• {type}</li>
                  ))}
                </ul>
                <div className="text-sm text-dark-text-secondary space-y-1">
                  <p><span className="font-medium text-dark-text">Purpose:</span> {userConnection.purpose}</p>
                  <p><span className="font-medium text-dark-text">Consent given:</span> {userConnection.consentDate}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg hover:bg-brand-green hover:text-black transition-colors text-sm">Edit Data Types</button>
                  <button className="px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg hover:bg-brand-green hover:text-black transition-colors text-sm">Update Purpose</button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border border-dark-border rounded-lg hover:bg-lemon-green hover:text-black text-center transition-colors">
                  <div className="text-2xl mb-2">🚫</div>
                  <div className="font-medium text-dark-text">Revoke Consent</div>
                  <div className="text-sm text-dark-text-secondary">Stop them from using your data</div>
                </button>
                <button 
                  onClick={() => setShowRequestModal(true)}
                  className="p-4 border border-dark-border rounded-lg hover:bg-lemon-green hover:text-black text-center transition-colors"
                >
                  <div className="text-2xl mb-2">📥</div>
                  <div className="font-medium text-dark-text">Request My Data</div>
                  <div className="text-sm text-dark-text-secondary">Download a copy of all your data</div>
                </button>
                <button className="p-4 border border-dark-border rounded-lg hover:bg-lemon-green hover:text-black text-center transition-colors">
                  <div className="text-2xl mb-2">🗑️</div>
                  <div className="font-medium text-dark-text">Request Deletion</div>
                  <div className="text-sm text-dark-text-secondary">Permanent data removal</div>
                </button>
                <button className="p-4 border border-dark-border rounded-lg hover:bg-lemon-green hover:text-black text-center transition-colors">
                  <div className="text-2xl mb-2">⚠️</div>
                  <div className="font-medium text-dark-text">File Complaint</div>
                  <div className="text-sm text-dark-text-secondary">Report privacy violations</div>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium mb-2 text-dark-text">Not Connected Yet</h3>
              <p className="text-dark-text-secondary mb-6">Are you a customer or user of {company.name}?</p>
              
              <div className="border border-dark-border rounded-lg p-6 mb-6 max-w-md mx-auto bg-dark-bg">
                <h4 className="font-medium mb-3 text-dark-text">Start tracking your data with this company</h4>
                <div className="text-sm text-dark-text-secondary space-y-2 mb-4">
                  <p>✓ See what data they hold about you</p>
                  <p>✓ Revoke consent anytime</p>
                  <p>✓ Request data access or deletion</p>
                  <p>✓ File complaints if needed</p>
                </div>
                <button 
                  onClick={() => setIsConnected(true)}
                  className="px-6 py-3 bg-brand-green text-black rounded-lg hover:bg-lemon-green transition-colors w-full"
                >
                  I Have an Account Here →
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Compliance Summary */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h2 className="text-xl font-semibold mb-4 text-dark-text">Compliance Summary</h2>
              
              <div className="mb-6">
                <h3 className="font-medium text-dark-text mb-3">What they're doing right:</h3>
                <ul className="space-y-2">
                  {company.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-dark-text">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-dark-text mb-3">Areas for improvement:</h3>
                <ul className="space-y-2">
                  {company.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="text-dark-text">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="text-brand-green hover:text-lemon-green font-medium">
                View Full Compliance Report →
              </button>
            </div>

            {/* Company Responsiveness */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h2 className="text-xl font-semibold mb-4 text-dark-text">Company Responsiveness</h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-dark-text">How quickly do they respond to requests?</h3>
                <div className="border border-dark-border rounded-lg p-4 bg-dark-bg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-dark-text">Average Response Time: {company.avgResponseTime} days</span>
                    <span className="text-sm text-dark-text-secondary">(NDPR requires response within 30 days)</span>
                  </div>
                  <div className="w-full h-3 bg-dark-border rounded-full mb-2">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(company.avgResponseTime / 30) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-dark-text">Performance:</span>
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm font-medium text-dark-text">Excellent</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-dark-text">2,345</div>
                  <div className="text-sm text-dark-text-secondary">Total requests</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{company.completionRate}%</div>
                  <div className="text-sm text-dark-text-secondary">On time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-dark-text">{company.avgRating}/5.0</div>
                  <div className="text-sm text-dark-text-secondary">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* User Reviews */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h2 className="text-xl font-semibold mb-4 text-dark-text">User Reviews</h2>
              <p className="text-dark-text-secondary mb-4">What other citizens are saying:</p>
              
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-dark-border pb-4 last:border-b-0">
                    <div className="flex items-center gap-1 mb-2">
                      {[1,2,3,4,5].map(star => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-dark-text mb-1">"{review.text}"</p>
                    <p className="text-sm text-dark-text-secondary">- {review.author}, {review.date}</p>
                  </div>
                ))}
              </div>
              
              <button className="text-brand-green hover:text-lemon-green font-medium mt-4">
                View All Reviews
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Privacy Policy */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-dark-text">
                <FileText className="h-5 w-5" />
                Privacy Policy
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-dark-text-secondary">Last updated: Jan 1, 2025</p>
                <button className="px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg hover:bg-brand-green hover:text-black transition-colors w-full">
                  📄 View Full Privacy Policy →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RequestModal 
        isOpen={showRequestModal} 
        onClose={() => setShowRequestModal(false)} 
      />
    </div>
  );
};

export default CompanyProfile;