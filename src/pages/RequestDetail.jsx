import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, AlertTriangle, Download, Star, MessageSquare } from 'lucide-react';
import { requests } from '../data/mockData';

const RequestDetail = ({ user }) => {
  const { id } = useParams();
  const request = requests.find(r => r.id === parseInt(id));

  if (!request) {
    return <div className="p-8 bg-dark-bg text-dark-text">Request not found</div>;
  }

  const isBusinessView = request.companyId && user.id === 1; // Mock check for business owner
  const isCitizenView = request.requesterId === user.id;

  // Mock response data
  const response = {
    status: 'completed',
    respondedDate: 'Jan 26, 2025',
    responseTime: '3 days',
    message: `Dear ${request.requesterName},\n\nThank you for your data access request. We have prepared a complete copy of your personal data.\n\nPlease download the attached file which includes:\n- Account information\n- Purchase history (24 orders)\n- Communication logs\n- Delivery addresses\n\nBest regards,\n${request.companyName} Data Protection Team`,
    attachments: [
      {
        name: 'chidi_okonkwo_data_export.zip',
        size: '2.4 MB',
        uploadDate: 'Jan 26, 2025'
      }
    ]
  };

  const timeline = [
    { date: 'Jan 23, 3:45 PM', event: 'Request submitted', status: 'completed' },
    { date: 'Jan 23, 3:46 PM', event: 'Company notified', status: 'completed' },
    { date: 'Jan 23, 4:12 PM', event: 'Request viewed by company', status: 'completed' },
    { date: 'Jan 26, 2:30 PM', event: 'Company responded', status: 'completed' }
  ];

  if (isCitizenView) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/dashboard" className="text-dark-text-secondary hover:text-dark-text">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <span className="text-dark-text-secondary">Back to My Data</span>
          </div>

          {/* Request Header */}
          <div className="bg-dark-card rounded-xl border border-dark-border p-8 mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-dark-text mb-2">
                  My Data Request to {request.companyName}
                </h1>
                <p className="text-dark-text-secondary">Request ID: #REQ-2025-{String(request.id).padStart(6, '0')}</p>
              </div>
              <div className="text-center">
                <div className={`px-4 py-2 rounded-full font-medium ${
                  response.status === 'completed' 
                    ? 'bg-green-50 text-green-600' 
                    : 'bg-yellow-50 text-yellow-600'
                }`}>
                  {response.status === 'completed' ? '✅ Completed' : '⏳ Pending'}
                </div>
                <p className="text-sm text-dark-text-secondary mt-2">
                  {response.status === 'completed' 
                    ? `Responded: ${response.respondedDate}` 
                    : `Expected response: Within ${request.deadline}`}
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Request Details */}
              <div className="bg-dark-card rounded-xl border border-dark-border p-6">
                <h2 className="text-xl font-semibold mb-4 text-dark-text">Request Details</h2>
                <div className="space-y-4">
                  <div>
                    <span className="font-medium text-dark-text">Type:</span> <span className="text-dark-text-secondary">📥 Data Access Request</span>
                  </div>
                  <div>
                    <span className="font-medium text-dark-text">Legal basis:</span> <span className="text-dark-text-secondary">{request.legalBasis}</span>
                  </div>
                  {request.message && (
                    <div>
                      <span className="font-medium text-dark-text">Your message:</span>
                      <div className="mt-2 p-4 bg-dark-bg rounded-lg">
                        <p className="text-dark-text-secondary">"{request.message}"</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="bg-dark-card rounded-xl border border-dark-border p-6">
                <h2 className="text-xl font-semibold mb-6 text-dark-text">Progress Tracker</h2>
                <div className="space-y-4">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        item.status === 'completed' ? 'bg-green-500' : 'bg-dark-border'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {item.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                          <span className="font-medium text-dark-text">{item.event}</span>
                        </div>
                        <p className="text-sm text-dark-text-secondary">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {response.status === 'completed' && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-green-700 font-medium">
                      ⏱️ Response time: {response.responseTime} (Excellent! 🎉)
                    </p>
                  </div>
                )}
              </div>

              {/* Company Response */}
              {response.status === 'completed' && (
                <div className="bg-dark-card rounded-xl border border-dark-border p-6">
                  <h2 className="text-xl font-semibold mb-4 text-dark-text">Company Response</h2>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-3 text-dark-text">Message from {request.companyName}:</h3>
                    <div className="bg-dark-bg rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-sm text-dark-text-secondary">{response.message}</pre>
                    </div>
                  </div>

                  {response.attachments && (
                    <div className="mb-6">
                      <h3 className="font-medium mb-3 text-dark-text">📎 Attached files:</h3>
                      {response.attachments.map((file, index) => (
                        <div key={index} className="border border-dark-border rounded-lg p-4 bg-dark-bg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-dark-text">📄 {file.name}</p>
                              <p className="text-sm text-dark-text-secondary">Size: {file.size} • Uploaded: {file.uploadDate}</p>
                            </div>
                            <div className="flex gap-2">
                              <button className="px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg hover:bg-brand-green hover:text-black transition-colors text-sm">Preview Contents</button>
                              <button className="px-4 py-2 bg-brand-green text-black rounded-lg hover:bg-lemon-green transition-colors text-sm">
                                <Download className="h-4 w-4 inline mr-1" />
                                Download File
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-dark-border pt-6">
                    <h3 className="font-medium mb-3 text-dark-text">How was your experience?</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-dark-text">Rate {request.companyName}'s response:</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(star => (
                          <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400 cursor-pointer" />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg hover:bg-brand-green hover:text-black transition-colors">
                        <MessageSquare className="h-4 w-4 inline mr-1" />
                        Leave Feedback
                      </button>
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">Mark as Resolved</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Track Record */}
              <div className="bg-dark-card rounded-xl border border-dark-border p-6">
                <h3 className="text-lg font-semibold mb-4 text-dark-text">Company Track Record</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-dark-text-secondary">Typical response time:</span>
                    <span className="font-medium text-dark-text">7 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-text-secondary">Completion rate:</span>
                    <span className="font-medium text-green-600">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-text-secondary">Average rating:</span>
                    <span className="font-medium text-dark-text">⭐ 4.6/5.0</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-lemon-green rounded-lg">
                  <p className="text-sm text-black">
                    💡 Based on their history, you'll likely hear back within 7 days.
                  </p>
                </div>
              </div>

              {/* Your Actions */}
              <div className="bg-dark-card rounded-xl border border-dark-border p-6">
                <h3 className="text-lg font-semibold mb-4 text-dark-text">Your Actions</h3>
                <div className="space-y-3">
                  {response.status !== 'completed' && (
                    <>
                      <button className="w-full px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg hover:bg-brand-green hover:text-black transition-colors text-sm">Send Reminder</button>
                      <button className="w-full px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg hover:bg-brand-green hover:text-black transition-colors text-sm">Cancel Request</button>
                    </>
                  )}
                  <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">File Complaint</button>
                </div>
                
                <div className="mt-6 p-4 bg-dark-bg rounded-lg">
                  <h4 className="font-medium text-sm mb-2 text-dark-text">💬 Need help with this request?</h4>
                  <div className="space-y-2">
                    <button className="text-brand-green hover:text-lemon-green text-sm block">View Your Rights</button>
                    <button className="text-brand-green hover:text-lemon-green text-sm block">Contact Support</button>
                    <button className="text-brand-green hover:text-lemon-green text-sm block">Legal Resources</button>
                  </div>
                </div>

                {response.status !== 'completed' && (
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-sm text-yellow-700 mb-2">⚠️ What if they don't respond?</h4>
                    <p className="text-sm text-yellow-700 mb-2">
                      If {request.companyName} doesn't respond by the deadline, we'll help you escalate this complaint to NITDA (the regulator).
                    </p>
                    <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                      Learn more about escalation →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Business view for handling requests
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to={`/company/${request.companyId}`} className="text-dark-text-secondary hover:text-dark-text">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <span className="text-dark-text-secondary">Back to {request.companyName}</span>
        </div>

        {/* Request Header */}
        <div className="bg-dark-card rounded-xl border border-dark-border p-8 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-dark-text mb-2">
                Data Access Request from {request.requesterName}
              </h1>
              <p className="text-dark-text-secondary">Request ID: #REQ-2025-{String(request.id).padStart(6, '0')}</p>
            </div>
            <div className="text-center">
              <div className="px-4 py-2 rounded-full font-medium bg-yellow-50 text-yellow-600 mb-2">
                ⏳ PENDING • ⚠️ REQUIRES ACTION
              </div>
              <p className="text-sm text-dark-text-secondary">⏰ Deadline: {request.deadline}</p>
              <div className="w-48 h-2 bg-dark-border rounded-full mt-2">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '13%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Requester Information */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h2 className="text-xl font-semibold mb-4 text-dark-text">Requester Information</h2>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-lemon-green rounded-full flex items-center justify-center">
                  <span className="font-bold text-black">
                    {request.requesterName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-dark-text">{request.requesterName}</h3>
                  <p className="text-dark-text-secondary">{request.requesterEmail}</p>
                  <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-dark-text-secondary">User ID:</span> <span className="text-dark-text">#45231</span>
                    </div>
                    <div>
                      <span className="text-dark-text-secondary">Customer since:</span> <span className="text-dark-text">Jan 15, 2025</span>
                    </div>
                    <div>
                      <span className="text-dark-text-secondary">Last activity:</span> <span className="text-dark-text">Jan 20, 2025</span>
                    </div>
                    <div>
                      <span className="text-dark-text-secondary">Total orders:</span> <span className="text-dark-text">3</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">✅ Active Consent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI-Generated Checklist */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-dark-text">
                🤖 AI-Generated Checklist
              </h2>
              <p className="text-dark-text-secondary mb-4">Based on {request.requesterName}'s account, you should provide:</p>
              
              <div className="space-y-4">
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <div className="font-medium text-dark-text">Account details</div>
                    <div className="text-sm text-dark-text-secondary">• Name, email, phone number • Account creation date</div>
                  </div>
                </label>
                
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <div className="font-medium text-dark-text">Purchase history</div>
                    <div className="text-sm text-dark-text-secondary">• 3 orders from Jan 15 - Jan 20, 2025 • Order details, amounts, dates</div>
                  </div>
                </label>
                
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <div className="font-medium text-dark-text">Payment information</div>
                    <div className="text-sm text-dark-text-secondary">• Payment method (last 4 digits only) • ⚠️ DO NOT include full card numbers</div>
                  </div>
                </label>
                
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <div className="font-medium text-dark-text">Communication logs</div>
                    <div className="text-sm text-dark-text-secondary">• 2 support tickets • Email correspondence</div>
                  </div>
                </label>
              </div>

              <div className="mt-6 p-4 bg-lemon-green rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-black">💡 Recommended format: JSON or CSV</span>
                </div>
                <div className="text-sm text-black">💡 Estimated time to compile: 15-30 minutes</div>
              </div>

              <div className="flex gap-3 mt-4">
                <button className="px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg hover:bg-brand-green hover:text-black transition-colors">Download Data Template</button>
                <button className="px-4 py-2 bg-brand-green text-black rounded-lg hover:bg-lemon-green transition-colors">Auto-Generate Export →</button>
              </div>
            </div>

            {/* Respond to Request */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h2 className="text-xl font-semibold mb-4 text-dark-text">Respond to Request</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Upload data package for {request.requesterName}:
                </label>
                <div className="border-2 border-dashed border-dark-border rounded-lg p-8 text-center bg-dark-bg">
                  <div className="text-4xl mb-4">📎</div>
                  <p className="text-dark-text-secondary mb-2">Drag & drop file here or <button className="text-brand-green">Browse Files</button></p>
                  <p className="text-sm text-dark-text-secondary">Accepted: ZIP, PDF, CSV, JSON • Max size: 50 MB</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Optional message to {request.requesterName}:
                </label>
                <textarea 
                  className="w-full border border-dark-border bg-dark-bg text-dark-text rounded-lg p-3"
                  rows="4"
                  defaultValue={`Dear ${request.requesterName},\n\nThank you for your data access request. Attached is a complete copy of your personal data...`}
                ></textarea>
                <div className="flex gap-2 mt-2">
                  <button className="px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg hover:bg-brand-green hover:text-black transition-colors text-sm">Use Template</button>
                  <button className="px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg hover:bg-brand-green hover:text-black transition-colors text-sm">Save Draft</button>
                </div>
              </div>

              <div className="flex gap-3 mb-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  <CheckCircle className="h-4 w-4 inline mr-1" />
                  Mark as Completed
                </button>
                <button className="px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg hover:bg-brand-green hover:text-black transition-colors">Request More Info</button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">Decline</button>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-700">
                  ⚠️ Note: Declining requires legal justification under NDPR Article 2.1(h). 
                  Unjustified refusal may result in penalties up to ₦10 million.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Request Details */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h3 className="text-lg font-semibold mb-4 text-dark-text">Request Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-dark-text">Type:</span> <span className="text-dark-text-secondary">📥 Data Access Request</span>
                </div>
                <div>
                  <span className="font-medium text-dark-text">Legal basis:</span> <span className="text-dark-text-secondary">{request.legalBasis}</span>
                </div>
                <div>
                  <span className="font-medium text-dark-text">Submitted:</span> <span className="text-dark-text-secondary">{request.submittedDate}</span>
                </div>
              </div>
              
              {request.message && (
                <div className="mt-4">
                  <span className="font-medium text-sm text-dark-text">Message:</span>
                  <div className="mt-2 p-3 bg-dark-bg rounded-lg">
                    <p className="text-sm text-dark-text-secondary">"{request.message}"</p>
                  </div>
                </div>
              )}
            </div>

            {/* Audit Trail */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h3 className="text-lg font-semibold mb-4 text-dark-text">Audit Trail</h3>
              <div className="space-y-3 text-sm">
                {timeline.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-dark-text">{item.event}</p>
                      <p className="text-dark-text-secondary">{item.date}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-dark-text">Awaiting your response...</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-dark-text-secondary mt-4">
                All actions are permanently logged for regulatory compliance and can be used as evidence if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;