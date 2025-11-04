import { useState } from 'react';
import { Send, User, Mail, FileText } from 'lucide-react';

const CitizenRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    requestType: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const requestTypes = [
    { value: 'access', label: 'Access My Data', description: 'Get a copy of all personal data held about you' },
    { value: 'correction', label: 'Correct My Data', description: 'Update or correct inaccurate personal information' },
    { value: 'erasure', label: 'Delete My Data', description: 'Request deletion of your personal data' }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit request
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="glass-effect rounded-2xl p-8">
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-dark-text mb-4">Request Submitted!</h2>
            <p className="text-dark-text-secondary mb-6">
              Your data request has been submitted successfully. The company has 30 days to respond under NDPR regulations.
            </p>
            <div className="bg-dark-surface rounded-xl p-4 mb-6">
              <p className="text-dark-text font-semibold mb-2">Request ID: DSR-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              <p className="text-dark-text-secondary text-sm">You will receive email updates on the status of your request.</p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full bg-gradient-to-r from-brand-green to-brand-blue text-white p-3 rounded-xl font-semibold hover:shadow-glow transition-all"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg p-4">
      <div className="max-w-2xl mx-auto pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark-text mb-4">Submit NDPR Data Request</h1>
          <p className="text-dark-text-secondary">Exercise your data protection rights under the Nigeria Data Protection Regulation</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-effect rounded-2xl p-8">
          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-dark-text mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-dark-text font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-text-secondary" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-dark-surface border border-dark-border rounded-xl text-dark-text focus:border-brand-green focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-dark-text font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-text-secondary" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-dark-surface border border-dark-border rounded-xl text-dark-text focus:border-brand-green focus:outline-none"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Request Type */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-dark-text mb-4">Type of Request</h3>
            <div className="space-y-3">
              {requestTypes.map((type) => (
                <label key={type.value} className="block">
                  <input
                    type="radio"
                    name="requestType"
                    value={type.value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.requestType === type.value
                      ? 'border-brand-green bg-brand-green/10'
                      : 'border-dark-border hover:border-brand-green/50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.requestType === type.value
                          ? 'border-brand-green bg-brand-green'
                          : 'border-dark-border'
                      }`}>
                        {formData.requestType === type.value && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark-text">{type.label}</h4>
                        <p className="text-dark-text-secondary text-sm">{type.description}</p>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div className="mb-8">
            <label className="block text-dark-text font-medium mb-2">Additional Details (Optional)</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-5 w-5 text-dark-text-secondary" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full pl-10 pr-4 py-3 bg-dark-surface border border-dark-border rounded-xl text-dark-text focus:border-brand-green focus:outline-none resize-none"
                placeholder="Provide any additional details about your request..."
              />
            </div>
          </div>

          {/* Legal Notice */}
          <div className="mb-8 p-4 bg-dark-surface rounded-xl border border-dark-border">
            <h4 className="font-semibold text-dark-text mb-2">Your Rights Under NDPR</h4>
            <ul className="text-dark-text-secondary text-sm space-y-1">
              <li>• Companies must respond within 30 days</li>
              <li>• You have the right to access, correct, or delete your data</li>
              <li>• Companies cannot charge fees for legitimate requests</li>
              <li>• You can file a complaint with NITDA if unsatisfied</li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.name || !formData.email || !formData.requestType}
            className="w-full bg-gradient-to-r from-brand-green to-brand-blue text-white p-4 rounded-xl font-semibold hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CitizenRequest;