import { useState } from 'react';
import { User, Building2, Shield, FileText } from 'lucide-react';

const UserModeSelection = ({ onModeSelect }) => {
  const [selectedMode, setSelectedMode] = useState(null);

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    onModeSelect(mode);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Welcome to <span className="text-primary-blue">TrustBridge</span>
          </h1>
          <p className="text-text-secondary text-lg">
            Choose how you'd like to use the platform
          </p>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Citizen Mode */}
          <div 
            className={`blue-card rounded-2xl p-8 cursor-pointer transition-all hover:shadow-blue-glow ${
              selectedMode === 'citizen' ? 'ring-4 ring-primary-blue' : ''
            }`}
            onClick={() => handleModeSelect('citizen')}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                <User className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">I'm a Citizen</h2>
              <p className="text-text-secondary mb-6">
                Exercise your data rights and control how companies use your personal information
              </p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary-blue" />
                  <span className="text-text-primary">Submit data requests</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary-blue" />
                  <span className="text-text-primary">Track request status</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-primary-blue" />
                  <span className="text-text-primary">Browse company compliance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Business Mode */}
          <div 
            className={`blue-card rounded-2xl p-8 cursor-pointer transition-all hover:shadow-blue-glow ${
              selectedMode === 'business' ? 'ring-4 ring-primary-blue' : ''
            }`}
            onClick={() => handleModeSelect('business')}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building2 className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">I'm a Business</h2>
              <p className="text-text-secondary mb-6">
                Manage your NDPR compliance and handle data subject requests efficiently
              </p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary-blue" />
                  <span className="text-text-primary">Compliance assessment</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary-blue" />
                  <span className="text-text-primary">Policy analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary-blue" />
                  <span className="text-text-primary">DSR management</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        {selectedMode && (
          <div className="text-center">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="px-8 py-3 bg-primary-blue text-white rounded-xl font-semibold hover:bg-blue-dark transition-all"
            >
              Continue as {selectedMode === 'citizen' ? 'Citizen' : 'Business'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserModeSelection;