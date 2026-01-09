import React, { useState } from 'react';
import { Calendar, Filter, Download, Eye, FileText, Shield, Clock, CheckCircle, Calculator, Award, Heart, Star } from 'lucide-react';

const ActionHistory = () => {
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('month');

  const historyData = [
    {
      id: 1,
      type: 'product_analysis',
      title: 'Product Analysis Completed',
      description: 'Analyzed Islamic Investment Fund for Shariah compliance',
      timestamp: new Date('2024-01-15T10:30:00'),
      status: 'completed',
      score: 95,
      icon: Shield
    },
    {
      id: 2,
      type: 'zakat_calculation',
      title: 'Zakat Calculated',
      description: 'Annual zakat obligation calculated: $1,250 due',
      timestamp: new Date('2024-01-14T14:20:00'),
      status: 'completed',
      amount: '$1,250',
      icon: Calculator
    },
    {
      id: 3,
      type: 'scholar_consultation',
      title: 'Scholar Consultation',
      description: 'Consulted with Dr. Ahmed Al-Rashid about crypto investments',
      timestamp: new Date('2024-01-13T09:15:00'),
      status: 'completed',
      icon: Eye
    },
    {
      id: 4,
      type: 'certificate_generated',
      title: 'Halal Certificate Generated',
      description: 'Generated Shariah compliance certificate for portfolio',
      timestamp: new Date('2024-01-12T16:45:00'),
      status: 'completed',
      icon: Award
    },
    {
      id: 5,
      type: 'alternative_found',
      title: 'Halal Alternative Recommended',
      description: 'Found Amana Mutual Funds as compliant alternative',
      timestamp: new Date('2024-01-10T11:00:00'),
      status: 'completed',
      score: 92,
      icon: Heart
    },
    {
      id: 6,
      type: 'income_purification',
      title: 'Income Purification',
      description: 'Calculated purification amount for mixed income: $150',
      timestamp: new Date('2024-01-08T13:30:00'),
      status: 'completed',
      amount: '$150',
      icon: Shield
    },
    {
      id: 7,
      type: 'business_validation',
      title: 'Business Validation',
      description: 'Validated halal status of e-commerce business model',
      timestamp: new Date('2024-01-07T16:20:00'),
      status: 'completed',
      score: 88,
      icon: Star
    },
    {
      id: 8,
      type: 'qard_hasan',
      title: 'Qard Hasan Request',
      description: 'Submitted interest-free loan request for $5,000',
      timestamp: new Date('2024-01-05T09:00:00'),
      status: 'pending',
      amount: '$5,000',
      icon: Heart
    },
    {
      id: 9,
      type: 'product_analysis',
      title: 'Crypto Analysis',
      description: 'Analyzed Bitcoin investment for Shariah compliance',
      timestamp: new Date('2024-01-03T14:15:00'),
      status: 'completed',
      score: 25,
      icon: Shield
    },
    {
      id: 10,
      type: 'zakat_payment',
      title: 'Zakat Payment Processed',
      description: 'Successfully distributed $1,200 zakat to verified recipients',
      timestamp: new Date('2024-01-01T11:30:00'),
      status: 'completed',
      amount: '$1,200',
      icon: Calculator
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'delivered':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'product_analysis':
        return 'bg-green-100 text-green-600';
      case 'zakat_calculation':
        return 'bg-purple-100 text-purple-600';
      case 'scholar_consultation':
        return 'bg-blue-100 text-blue-600';
      case 'certificate_generated':
        return 'bg-yellow-100 text-yellow-600';
      case 'alternative_found':
        return 'bg-red-100 text-red-600';
      case 'income_purification':
        return 'bg-emerald-100 text-emerald-600';
      case 'business_validation':
        return 'bg-indigo-100 text-indigo-600';
      case 'qard_hasan':
        return 'bg-pink-100 text-pink-600';
      case 'zakat_payment':
        return 'bg-teal-100 text-teal-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredHistory = historyData.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Activity <span className="text-green-600">History</span>
          </h1>
          <p className="text-gray-600">
            Complete history of your Shariah compliance activities and Islamic finance transactions
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-2xl font-black text-gray-900">
                {historyData.filter(item => item.type === 'product_analysis').length}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">Product Analyses</h3>
            <p className="text-sm text-gray-600">Shariah assessments</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Calculator className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-2xl font-black text-gray-900">
                {historyData.filter(item => item.type === 'zakat_calculation' || item.type === 'zakat_payment').length}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">Zakat Activities</h3>
            <p className="text-sm text-gray-600">Islamic obligations</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-2xl font-black text-gray-900">
                {historyData.filter(item => item.type === 'scholar_consultation').length}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">Consultations</h3>
            <p className="text-sm text-gray-600">Scholar sessions</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-2xl font-black text-gray-900">
                {historyData.filter(item => item.type === 'certificate_generated').length}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">Certificates</h3>
            <p className="text-sm text-gray-600">Halal certifications</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-xl mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Activities</option>
                <option value="product_analysis">Product Analysis</option>
                <option value="zakat_calculation">Zakat Calculations</option>
                <option value="scholar_consultation">Consultations</option>
                <option value="certificate_generated">Certificates</option>
                <option value="alternative_found">Alternatives</option>
                <option value="income_purification">Income Purification</option>
                <option value="business_validation">Business Validation</option>
                <option value="qard_hasan">Qard Hasan</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <Calendar className="h-5 w-5 text-gray-600" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>

              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* History Timeline */}
        <div className="space-y-4">
          {filteredHistory.map((item, index) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${getTypeColor(item.type)}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {item.score && (
                        <div className="text-right">
                          <div className="text-lg font-black text-green-600">{item.score}%</div>
                          <div className="text-xs text-gray-500">Halal Score</div>
                        </div>
                      )}
                      {item.amount && (
                        <div className="text-right">
                          <div className="text-lg font-black text-purple-600">{item.amount}</div>
                          <div className="text-xs text-gray-500">Amount</div>
                        </div>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {item.timestamp.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="bg-white p-12 rounded-2xl shadow-xl text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No activities found</h3>
            <p className="text-gray-600">No activities match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionHistory;