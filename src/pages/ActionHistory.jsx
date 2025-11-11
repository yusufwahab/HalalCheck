import { useState, useEffect } from 'react';
import { Clock, Shield, Building2, User, FileText, AlertTriangle } from 'lucide-react';
import APIService from '../services/api';

const ActionHistory = ({ user }) => {
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  const [actions, setActions] = useState([]);
  const [ledger, setLedger] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('actions');

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      if (user?.role === 'admin') {
        const [actionsData, ledgerData] = await Promise.all([
          APIService.getActions(),
          APIService.getFullLedger()
        ]);
        setActions(actionsData);
        setLedger(ledgerData);
      } else {
        const userLedger = await APIService.getUserLedger(user?.id);
        setLedger(userLedger);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (actionType) => {
    switch (actionType) {
      case 'revoke_consent':
        return <Shield className="h-5 w-5 text-red-500" />;
      case 'grant_consent':
        return <Shield className="h-5 w-5 text-green-500" />;
      case 'data_request':
        return <FileText className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Action <span className="text-blue-600">History</span>
          </h1>
          <p className="text-gray-600">Track all data protection activities</p>
        </div>

        {user.role === 'admin' && (
          <div className="mb-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
              <button
                onClick={() => setActiveTab('actions')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'actions'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Actions
              </button>
              <button
                onClick={() => setActiveTab('ledger')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'ledger'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Full Ledger
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {(activeTab === 'actions' ? actions : ledger).map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getActionIcon(item.actionType || item.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.actionType || item.type || 'Unknown Action'}
                      </h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {item.actorRole || 'Unknown Role'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      {item.action || item.details?.text || 'No description available'}
                    </p>
                    {item.aiReport && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 font-medium">AI Analysis:</p>
                        <p className="text-sm text-blue-700">{item.aiReport}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatDate(item.timestamp || item.createdAt)}
                  </div>
                  {item.company && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Building2 className="h-4 w-4 mr-1" />
                      Company ID: {item.company}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {(activeTab === 'actions' ? actions : ledger).length === 0 && (
          <div className="text-center py-12">
            <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No History Found</h3>
            <p className="text-gray-600">No actions have been recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionHistory;