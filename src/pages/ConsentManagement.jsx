import { useState, useEffect } from 'react';
import { Shield, Building2, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import APIService from '../services/api';

const ConsentManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const data = await APIService.getCompanies();
      setCompanies(data);
    } catch (error) {
      console.error('Failed to load companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConsentAction = async (companyId, action, reason = '') => {
    setActionLoading(companyId);
    try {
      await APIService.manageConsent(companyId, action, { reason });
      // Refresh companies or update local state
      loadCompanies();
    } catch (error) {
      console.error('Consent action failed:', error);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Consent <span className="text-blue-600">Management</span>
          </h1>
          <p className="text-gray-600">Manage your data consent across companies</p>
        </div>

        <div className="grid gap-6">
          {companies.map((company) => (
            <div key={company.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                    <p className="text-gray-600">{company.description}</p>
                    <p className="text-sm text-gray-500">{company.contactEmail}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-600">Consent Active</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <a
                  href={company.policies}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Privacy Policy →
                </a>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleConsentAction(company.id, 'revoke', 'User requested revocation')}
                    disabled={actionLoading === company.id}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 text-sm font-medium transition-colors"
                  >
                    {actionLoading === company.id ? 'Processing...' : 'Revoke Consent'}
                  </button>
                  <button
                    onClick={() => handleConsentAction(company.id, 'grant')}
                    disabled={actionLoading === company.id}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium transition-colors"
                  >
                    {actionLoading === company.id ? 'Processing...' : 'Grant Consent'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {companies.length === 0 && (
          <div className="text-center py-12">
            <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Companies Found</h3>
            <p className="text-gray-600">No companies are currently registered in the system.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsentManagement;