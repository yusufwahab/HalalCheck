import { useState } from 'react';
import { Building2, Mail, Phone, CreditCard, MapPin, User, Send } from 'lucide-react';

const ConnectCompany = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    verificationType: '',
    verificationValue: '',
    dataTypes: [],
    message: ''
  });

  const verificationMethods = [
    { id: 'email', label: 'Email Verification', icon: Mail, description: 'We\'ll send a code to your registered email' },
    { id: 'phone', label: 'Phone Verification', icon: Phone, description: 'We\'ll send SMS to your registered phone' },
    { id: 'order', label: 'Order ID', icon: CreditCard, description: 'Enter a recent order/transaction number' },
    { id: 'account', label: 'Account ID', icon: User, description: 'Your customer/account number' }
  ];

  const dataTypeOptions = [
    'Email address',
    'Phone number',
    'Full name',
    'Date of birth',
    'Physical addresses',
    'Purchase history',
    'Payment information',
    'Account preferences',
    'Communication history',
    'Other personal data'
  ];

  const handleDataTypeToggle = (dataType) => {
    setFormData(prev => ({
      ...prev,
      dataTypes: prev.dataTypes.includes(dataType)
        ? prev.dataTypes.filter(type => type !== dataType)
        : [...prev.dataTypes, dataType]
    }));
  };

  const handleSubmit = () => {
    console.log('Connection request submitted:', formData);
    setStep(4); // Success step
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            Connect to <span className="text-primary-blue">Company</span>
          </h1>
          <p className="text-text-secondary">Request access to track your personal data</p>
        </div>

        {/* Progress Steps */}
        <div className="blue-card rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= stepNum ? 'bg-primary-blue text-white' : 'bg-surface text-text-secondary'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-20 h-1 mx-4 ${
                    step > stepNum ? 'bg-primary-blue' : 'bg-surface'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <span className={step >= 1 ? 'text-primary-blue font-medium' : 'text-text-secondary'}>Company Info</span>
            <span className={step >= 2 ? 'text-primary-blue font-medium' : 'text-text-secondary'}>Verification</span>
            <span className={step >= 3 ? 'text-primary-blue font-medium' : 'text-text-secondary'}>Data Types</span>
          </div>
        </div>

        {/* Step 1: Company Selection */}
        {step === 1 && (
          <div className="blue-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Select Company</h2>
            
            <div className="mb-6">
              <label className="block text-text-primary font-medium mb-2">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                placeholder="e.g., Jumia Nigeria, GTBank, Flutterwave"
                className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary-blue focus:outline-none"
              />
            </div>

            {/* Company Search Results */}
            {formData.companyName && (
              <div className="mb-6">
                <h3 className="font-medium text-text-primary mb-4">Search Results:</h3>
                <div className="space-y-3">
                  <div className="p-4 border-2 border-primary-blue rounded-xl cursor-pointer hover:bg-surface">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-blue rounded-xl flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-text-primary">Jumia Nigeria</h4>
                        <p className="text-text-secondary text-sm">E-commerce • Lagos • Compliance: 85%</p>
                        <span className="inline-block px-2 py-1 bg-success text-white text-xs rounded-full mt-1">
                          On TrustBridge
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-2 border-border rounded-xl cursor-pointer hover:bg-surface">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-text-secondary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-text-primary">Konga Nigeria</h4>
                        <p className="text-text-secondary text-sm">E-commerce • Lagos</p>
                        <span className="inline-block px-2 py-1 bg-warning text-white text-xs rounded-full mt-1">
                          Not on TrustBridge
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!formData.companyName}
                className="px-6 py-3 bg-primary-blue text-white rounded-xl font-semibold hover:bg-blue-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Verification */}
        {step === 2 && (
          <div className="blue-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Verify Your Account</h2>
            <p className="text-text-secondary mb-6">Choose how to verify you're a customer of {formData.companyName}</p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {verificationMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setFormData(prev => ({ ...prev, verificationType: method.id }))}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.verificationType === method.id
                      ? 'border-primary-blue bg-blue-50'
                      : 'border-border hover:border-primary-blue'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <method.icon className="h-5 w-5 text-primary-blue" />
                    <span className="font-medium text-text-primary">{method.label}</span>
                  </div>
                  <p className="text-sm text-text-secondary">{method.description}</p>
                </div>
              ))}
            </div>

            {formData.verificationType && (
              <div className="mb-6">
                <label className="block text-text-primary font-medium mb-2">
                  {formData.verificationType === 'email' && 'Your Email Address'}
                  {formData.verificationType === 'phone' && 'Your Phone Number'}
                  {formData.verificationType === 'order' && 'Recent Order ID'}
                  {formData.verificationType === 'account' && 'Account Number/ID'}
                </label>
                <input
                  type="text"
                  value={formData.verificationValue}
                  onChange={(e) => setFormData(prev => ({ ...prev, verificationValue: e.target.value }))}
                  placeholder={
                    formData.verificationType === 'email' ? 'your@email.com' :
                    formData.verificationType === 'phone' ? '+234 801 234 5678' :
                    formData.verificationType === 'order' ? 'JM-2024-123456' :
                    'Your account ID'
                  }
                  className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary-blue focus:outline-none"
                />
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-surface text-text-primary rounded-xl font-semibold hover:bg-border transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.verificationType || !formData.verificationValue}
                className="px-6 py-3 bg-primary-blue text-white rounded-xl font-semibold hover:bg-blue-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Data Types */}
        {step === 3 && (
          <div className="blue-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-6">What Data Do They Hold?</h2>
            <p className="text-text-secondary mb-6">Select all types of personal data that {formData.companyName} has about you</p>

            <div className="grid md:grid-cols-2 gap-3 mb-6">
              {dataTypeOptions.map((dataType) => (
                <label key={dataType} className="flex items-center gap-3 p-3 border-2 border-border rounded-xl cursor-pointer hover:border-primary-blue transition-all">
                  <input
                    type="checkbox"
                    checked={formData.dataTypes.includes(dataType)}
                    onChange={() => handleDataTypeToggle(dataType)}
                    className="w-5 h-5 text-primary-blue rounded focus:ring-primary-blue"
                  />
                  <span className="text-text-primary">{dataType}</span>
                </label>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-text-primary font-medium mb-2">Optional Message to Company</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                placeholder="Hi, I'd like to track my personal data and exercise my NDPR rights through TrustBridge. Please approve this connection request."
                className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary-blue focus:outline-none resize-none"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-surface text-text-primary rounded-xl font-semibold hover:bg-border transition-all"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={formData.dataTypes.length === 0}
                className="px-6 py-3 bg-primary-blue text-white rounded-xl font-semibold hover:bg-blue-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="h-5 w-5" />
                Send Request
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="blue-card rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Request Sent Successfully!</h2>
            <p className="text-text-secondary mb-6">
              Your connection request has been sent to {formData.companyName}. They typically respond within 1-2 business days.
            </p>
            
            <div className="bg-surface rounded-xl p-6 mb-6">
              <h3 className="font-bold text-text-primary mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary-blue rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <span className="text-text-secondary">{formData.companyName} receives your request</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary-blue rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <span className="text-text-secondary">They verify you're a real customer</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary-blue rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <span className="text-text-secondary">You get notified when approved</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary-blue rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  <span className="text-text-secondary">Start tracking your data!</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/data-connections'}
                className="px-6 py-3 bg-primary-blue text-white rounded-xl font-semibold hover:bg-blue-dark transition-all"
              >
                View My Connections
              </button>
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-surface text-text-primary rounded-xl font-semibold hover:bg-border transition-all"
              >
                Connect Another Company
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectCompany;