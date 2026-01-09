import { useState } from 'react';
import { Building2, CheckCircle, AlertTriangle, FileText, DollarSign, Users, Shield } from 'lucide-react';

const BusinessValidator = () => {
  const [businessType, setBusinessType] = useState('');
  const [revenueModel, setRevenueModel] = useState('');
  const [result, setResult] = useState(null);

  const validateBusiness = () => {
    // Mock validation logic
    const score = Math.floor(Math.random() * 40) + 60; // 60-100
    const issues = [];
    const recommendations = [];

    if (revenueModel.includes('interest')) {
      issues.push('Interest-based revenue detected');
      recommendations.push('Replace interest with profit-sharing or fee-based model');
    }

    setResult({
      score,
      status: score >= 80 ? 'Compliant' : 'Needs Review',
      issues,
      recommendations
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900">Business Validator</h1>
              <p className="text-gray-600 font-semibold">Shariah Compliance for Entrepreneurs</p>
            </div>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Validate your business model against Islamic principles before launch or investment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Validation Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Business Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3">Business Type</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                >
                  <option value="">Select business type</option>
                  <option value="fintech">Fintech</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="consulting">Consulting</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="food">Food & Beverage</option>
                  <option value="technology">Technology</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3">Revenue Model</label>
                <textarea
                  value={revenueModel}
                  onChange={(e) => setRevenueModel(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none resize-none"
                  placeholder="Describe how your business generates revenue..."
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3">Target Market</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  placeholder="e.g., Small businesses, consumers, enterprises"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3">Key Partnerships</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none resize-none"
                  placeholder="Describe your key business partnerships..."
                />
              </div>

              <button
                onClick={validateBusiness}
                className="w-full px-6 py-4 bg-green-600 text-white rounded-2xl font-bold text-lg hover:bg-green-700 transition-colors"
              >
                Validate Business Model
              </button>
            </div>
          </div>

          {/* Results or Guidelines */}
          <div className="space-y-6">
            {result ? (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Validation Results</h2>
                
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 mb-4 ${
                    result.status === 'Compliant' ? 'border-green-300 bg-green-100' : 'border-yellow-300 bg-yellow-100'
                  }`}>
                    <span className={`text-2xl font-black ${
                      result.status === 'Compliant' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {result.score}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    result.status === 'Compliant' ? 'text-green-800' : 'text-yellow-800'
                  }`}>
                    {result.status}
                  </h3>
                </div>

                {result.issues.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-bold text-red-800 mb-3">Issues Found:</h4>
                    <div className="space-y-2">
                      {result.issues.map((issue, index) => (
                        <div key={index} className="flex items-center gap-2 text-red-700">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-sm">{issue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-bold text-blue-800 mb-3">Recommendations:</h4>
                    <div className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-2 text-blue-700">
                          <CheckCircle className="h-4 w-4 mt-0.5" />
                          <span className="text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Validation Criteria</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-xl">
                    <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Halal Revenue Sources
                    </h3>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Product sales and services</li>
                      <li>• Profit-sharing partnerships</li>
                      <li>• Fee-based consulting</li>
                      <li>• Rental income (halal assets)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-xl">
                    <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Prohibited Elements
                    </h3>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Interest-based lending</li>
                      <li>• Gambling or speculation</li>
                      <li>• Alcohol or pork products</li>
                      <li>• Excessive uncertainty (gharar)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Partnership Guidelines
                    </h3>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Transparent profit sharing</li>
                      <li>• Mutual risk and reward</li>
                      <li>• Clear contract terms</li>
                      <li>• Ethical business practices</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Common Business Models */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Halal Business Models</h2>
              
              <div className="space-y-4">
                {[
                  { name: 'Murabaha Trading', description: 'Cost-plus profit sales model' },
                  { name: 'Musharaka Partnership', description: 'Joint venture with shared profits/losses' },
                  { name: 'Ijarah Leasing', description: 'Asset leasing with ownership transfer option' },
                  { name: 'Service-Based', description: 'Fee-for-service consulting or solutions' }
                ].map((model, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-1">{model.name}</h3>
                    <p className="text-gray-600 text-sm">{model.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessValidator;