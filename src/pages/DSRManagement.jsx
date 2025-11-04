import { useState } from 'react';
import { Clock, User, Download, CheckCircle, AlertCircle, Eye } from 'lucide-react';

const DSRManagement = () => {
  const [requests] = useState([
    {
      id: 1,
      citizenName: 'Ada Okafor',
      email: 'ada.okafor@email.com',
      type: 'Access',
      status: 'pending',
      submitted: '2024-01-15',
      dueDate: '2024-02-14',
      daysRemaining: 25,
      description: 'Request for all personal data held by the company'
    },
    {
      id: 2,
      citizenName: 'Kemi Johnson',
      email: 'kemi.j@email.com',
      type: 'Erasure',
      status: 'in-progress',
      submitted: '2024-01-10',
      dueDate: '2024-02-09',
      daysRemaining: 20,
      description: 'Request to delete all personal data'
    },
    {
      id: 3,
      citizenName: 'Chuka Nwankwo',
      email: 'chuka.n@email.com',
      type: 'Correction',
      status: 'completed',
      submitted: '2024-01-05',
      dueDate: '2024-02-04',
      daysRemaining: 0,
      description: 'Request to correct email address in records'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-warning bg-warning/20';
      case 'in-progress': return 'text-brand-blue bg-brand-blue/20';
      case 'completed': return 'text-success bg-success/20';
      default: return 'text-dark-text-secondary bg-dark-surface';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Access': return <Eye className="h-4 w-4" />;
      case 'Erasure': return <AlertCircle className="h-4 w-4" />;
      case 'Correction': return <CheckCircle className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const handleFulfillRequest = (requestId) => {
    // Generate response template and mark as completed
    console.log('Fulfilling request:', requestId);
  };

  return (
    <div className="min-h-screen bg-dark-bg p-4">
      <div className="max-w-6xl mx-auto pt-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-text mb-4">Data Subject Requests</h1>
          <p className="text-dark-text-secondary">Manage citizen data requests in compliance with NDPR Article 3.1</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-text-secondary text-sm">Total Requests</p>
                <p className="text-2xl font-bold text-dark-text">{requests.length}</p>
              </div>
              <User className="h-8 w-8 text-brand-green" />
            </div>
          </div>
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-text-secondary text-sm">Pending</p>
                <p className="text-2xl font-bold text-warning">{requests.filter(r => r.status === 'pending').length}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </div>
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-text-secondary text-sm">In Progress</p>
                <p className="text-2xl font-bold text-brand-blue">{requests.filter(r => r.status === 'in-progress').length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-brand-blue" />
            </div>
          </div>
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-text-secondary text-sm">Completed</p>
                <p className="text-2xl font-bold text-success">{requests.filter(r => r.status === 'completed').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="glass-effect rounded-2xl p-8">
          <h2 className="text-xl font-bold text-dark-text mb-6">Recent Requests</h2>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="bg-dark-surface rounded-xl p-6 border border-dark-border hover:border-brand-green/50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Request Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(request.type)}
                        <span className="font-semibold text-dark-text">{request.type} Request</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                        {request.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-dark-text font-medium">{request.citizenName}</p>
                        <p className="text-dark-text-secondary text-sm">{request.email}</p>
                      </div>
                      <div>
                        <p className="text-dark-text-secondary text-sm">Submitted: {request.submitted}</p>
                        <p className="text-dark-text-secondary text-sm">Due: {request.dueDate}</p>
                      </div>
                    </div>
                    <p className="text-dark-text-secondary text-sm">{request.description}</p>
                  </div>

                  {/* Timer & Actions */}
                  <div className="flex flex-col items-center gap-4 lg:min-w-[200px]">
                    {request.status !== 'completed' && (
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${
                          request.daysRemaining <= 7 ? 'text-error' : 
                          request.daysRemaining <= 14 ? 'text-warning' : 'text-brand-green'
                        }`}>
                          {request.daysRemaining}
                        </div>
                        <p className="text-dark-text-secondary text-sm">days remaining</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      {request.status === 'completed' ? (
                        <button className="flex items-center gap-2 px-4 py-2 bg-success/20 text-success rounded-lg">
                          <Download className="h-4 w-4" />
                          Download Proof
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleFulfillRequest(request.id)}
                            className="px-4 py-2 bg-gradient-to-r from-brand-green to-brand-blue text-white rounded-lg hover:shadow-glow transition-all text-sm font-medium"
                          >
                            Fulfill Request
                          </button>
                          <button className="px-4 py-2 bg-dark-border text-dark-text rounded-lg hover:bg-dark-surface transition-colors text-sm">
                            View Details
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 glass-effect rounded-xl p-6">
          <h3 className="text-lg font-bold text-dark-text mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="p-4 bg-dark-surface rounded-xl text-left hover:bg-brand-green/10 hover:border-brand-green border border-dark-border transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Download className="h-5 w-5 text-brand-green" />
                <span className="font-semibold text-dark-text">Export All Data</span>
              </div>
              <p className="text-dark-text-secondary text-sm">Generate CSV export for access requests</p>
            </button>
            <button className="p-4 bg-dark-surface rounded-xl text-left hover:bg-brand-purple/10 hover:border-brand-purple border border-dark-border transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="h-5 w-5 text-brand-purple" />
                <span className="font-semibold text-dark-text">Generate Response</span>
              </div>
              <p className="text-dark-text-secondary text-sm">Auto-generate NDPR compliant responses</p>
            </button>
            <button className="p-4 bg-dark-surface rounded-xl text-left hover:bg-accent-orange/10 hover:border-accent-orange border border-dark-border transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="h-5 w-5 text-accent-orange" />
                <span className="font-semibold text-dark-text">Audit Report</span>
              </div>
              <p className="text-dark-text-secondary text-sm">Download audit-ready compliance report</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSRManagement;