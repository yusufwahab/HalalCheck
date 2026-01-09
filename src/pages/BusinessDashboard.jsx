import { useState } from 'react';
import { Building2, Key, BarChart3, Users, DollarSign, Award, Copy, Eye, EyeOff } from 'lucide-react';

const BusinessDashboard = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const apiKey = 'hc_live_sk_1234567890abcdef';

  const stats = [
    { label: 'API Calls This Month', value: '12,450', icon: BarChart3, color: 'blue' },
    { label: 'Products Analyzed', value: '3,200', icon: Building2, color: 'green' },
    { label: 'Revenue Generated', value: '$2,850', icon: DollarSign, color: 'purple' },
    { label: 'Active Users', value: '890', icon: Users, color: 'orange' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900">Business Dashboard</h1>
              <p className="text-gray-600 font-semibold">API Integration & Analytics</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="text-3xl font-black text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* API Configuration */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <Key className="h-6 w-6 text-green-600" />
              API Configuration
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">API Key</label>
                <div className="flex items-center gap-2">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    readOnly
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="p-3 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  <button className="p-3 text-gray-600 hover:text-green-600 transition-colors">
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Webhook URL</label>
                <input
                  type="url"
                  placeholder="https://your-app.com/webhook"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rate Limit</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none">
                  <option>1000 requests/hour</option>
                  <option>5000 requests/hour</option>
                  <option>10000 requests/hour</option>
                </select>
              </div>

              <button className="w-full px-6 py-3 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-colors">
                Update Configuration
              </button>
            </div>
          </div>

          {/* Integration Guide */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Integration Guide</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-4">
                <h3 className="font-bold text-gray-900 mb-2">Quick Start</h3>
                <code className="text-sm text-gray-700 block">
                  curl -X POST https://api.halalcheck.com/analyze<br/>
                  -H "Authorization: Bearer {apiKey}"<br/>
                  -d '{{"product": "investment-fund"}}'
                </code>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Available Endpoints</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">POST</span>
                    <span className="font-mono text-sm">/analyze</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">GET</span>
                    <span className="font-mono text-sm">/score/{id}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                    <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">GET</span>
                    <span className="font-mono text-sm">/alternatives</span>
                  </div>
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors">
                View Full Documentation
              </button>
            </div>
          </div>
        </div>

        {/* Certification */}
        <div className="mt-8 bg-white rounded-3xl shadow-xl p-8 text-center">
          <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-gray-900 mb-4">HalalCheck Certified</h2>
          <p className="text-gray-700 mb-6">
            Display the HalalCheck Certified badge on your website to build trust with Muslim customers.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-colors">
              Download Badge
            </button>
            <button className="px-6 py-3 bg-gray-600 text-white rounded-2xl font-bold hover:bg-gray-700 transition-colors">
              Get Embed Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;