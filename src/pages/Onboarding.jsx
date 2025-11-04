import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Upload, FileText, CheckCircle, ArrowRight } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    rcNumber: '',
    sector: '',
    website: '',
    email: '',
    password: '',
    logo: null
  });

  const sectors = ['Fintech', 'E-commerce', 'Healthtech', 'Edtech', 'Logistics', 'Other'];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/policy-upload');
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-brand-green to-brand-purple rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">TrustBridge</span>
          </div>
          <h1 className="text-2xl font-bold text-dark-text mb-2">Start Free Compliance Check</h1>
          <p className="text-dark-text-secondary">Step {step} of 3</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i <= step ? 'bg-brand-green text-white' : 'bg-dark-surface text-dark-text-secondary'
              }`}>
                {i < step ? <CheckCircle className="h-4 w-4" /> : i}
              </div>
            ))}
          </div>
          <div className="w-full bg-dark-surface rounded-full h-2">
            <div className="bg-gradient-to-r from-brand-green to-brand-blue h-2 rounded-full transition-all duration-300" 
                 style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
        </div>

        {/* Form */}
        <div className="glass-effect rounded-2xl p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-dark-text mb-4">Account Setup</h2>
              <input
                type="email"
                name="email"
                placeholder="Business Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 bg-dark-surface border border-dark-border rounded-xl text-dark-text focus:border-brand-green focus:outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 bg-dark-surface border border-dark-border rounded-xl text-dark-text focus:border-brand-green focus:outline-none"
              />
              <div className="text-center">
                <p className="text-dark-text-secondary text-sm mb-4">Or</p>
                <button className="w-full p-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  Sign in with Paystack
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-dark-text mb-4">Business Information</h2>
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full p-3 bg-dark-surface border border-dark-border rounded-xl text-dark-text focus:border-brand-green focus:outline-none"
              />
              <input
                type="text"
                name="rcNumber"
                placeholder="RC Number (CAC)"
                value={formData.rcNumber}
                onChange={handleInputChange}
                className="w-full p-3 bg-dark-surface border border-dark-border rounded-xl text-dark-text focus:border-brand-green focus:outline-none"
              />
              <select
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
                className="w-full p-3 bg-dark-surface border border-dark-border rounded-xl text-dark-text focus:border-brand-green focus:outline-none"
              >
                <option value="">Select Sector</option>
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
              <input
                type="url"
                name="website"
                placeholder="Website URL"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full p-3 bg-dark-surface border border-dark-border rounded-xl text-dark-text focus:border-brand-green focus:outline-none"
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-dark-text mb-4">Company Logo (Optional)</h2>
              <div className="border-2 border-dashed border-dark-border rounded-xl p-8 text-center">
                <Upload className="h-12 w-12 text-dark-text-secondary mx-auto mb-4" />
                <p className="text-dark-text-secondary mb-2">Upload your company logo</p>
                <input type="file" accept="image/*" className="hidden" id="logo-upload" />
                <label htmlFor="logo-upload" className="inline-block px-4 py-2 bg-brand-green text-white rounded-lg cursor-pointer hover:bg-brand-green/80 transition-colors">
                  Choose File
                </label>
              </div>
            </div>
          )}

          <button
            onClick={handleNext}
            className="w-full mt-6 bg-gradient-to-r from-brand-green to-brand-blue text-white p-3 rounded-xl font-semibold hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2"
          >
            {step === 3 ? 'Complete Setup' : 'Continue'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;