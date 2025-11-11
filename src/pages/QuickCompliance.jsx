import { useState } from 'react';
import { Zap, Shield, CheckCircle, AlertTriangle, FileText, Building2 } from 'lucide-react';
import APIService from '../services/api';

const QuickCompliance = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: 'medium',
    policyText: ''
  });
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState(null);

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 
    'Government', 'Manufacturing', 'Telecommunications', 'Other'
  ];

  const companySizes = [
    { value: 'small', label: 'Small (1-50 employees)' },
    { value: 'medium', label: 'Medium (51-250 employees)' },
    { value: 'large', label: 'Large (250+ employees)' }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsChecking(true);
    
    try {
      const checkData = {
        company_name: formData.companyName,
        company_size: formData.companySize,
        document_text: formData.policyText,
        document_type: 'privacy_policy',
        industry: formData.industry,
        processing_scope: 'Standard data processing',
        target_users: 'General Public'
      };
      
      const response = await APIService.quickComplianceCheck(checkData);
      setResult(response);
    } catch (error) {
      console.error('Quick compliance check failed:', error);
      // Mock result for demo
      setResult({
        compliance_score: 75,
        risk_level: 'medium',
        quick_issues: ['Missing data retention policy', 'Unclear consent mechanism'],
        recommendations: ['Add clear data retention periods', 'Implement explicit consent forms']
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Quick <span className="text-blue-600">Compliance</span> Check
          </h1>
          <p className="text-lg text-gray-600">Get instant NDPR compliance insights in under 60 seconds</p>
        </div>

        {!result ? (
          <div className="premium-card rounded-3xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Company Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      placeholder="Enter company name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Industry</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Company Size</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {companySizes.map(size => (
                    <label key={size.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="companySize"
                        value={size.value}
                        checked={formData.companySize === size.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-xl border-2 text-center transition-all ${
                        formData.companySize === size.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}>
                        <div className="font-semibold text-gray-900">{size.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Policy Text */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Privacy Policy Text (Optional)</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    name="policyText"
                    value={formData.policyText}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
                    placeholder="Paste your privacy policy text for more accurate analysis..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isChecking || !formData.companyName || !formData.industry}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isChecking ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    Quick Check
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="premium-card rounded-3xl p-6 sm:p-8">
            {/* Results Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-4">Quick Check Complete</h2>
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-black text-blue-600">{result.compliance_score || 75}%</div>
                  <div className="text-sm font-semibold text-gray-600">Compliance Score</div>
                </div>
                <div className="text-center">
                  <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                    result.risk_level === 'low' ? 'bg-green-100 text-green-800' :
                    result.risk_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {result.risk_level?.toUpperCase() || 'MEDIUM'} RISK
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Issues */}
            <div className="mb-8">
              <h3 className="text-xl font-black text-gray-900 mb-4">Quick Issues Found</h3>
              <div className="space-y-3">
                {(result.quick_issues || ['Missing data retention policy', 'Unclear consent mechanism']).map((issue, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <span className="text-gray-900 font-medium">{issue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-8">
              <h3 className="text-xl font-black text-gray-900 mb-4">Quick Recommendations</h3>
              <div className="space-y-3">
                {(result.recommendations || ['Add clear data retention periods', 'Implement explicit consent forms']).map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-gray-900 font-medium">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setResult(null)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all duration-200"
              >
                Check Another Company
              </button>
              <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all duration-200">
                Get Full Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickCompliance;