import { useState } from 'react';
import { Heart, Star, TrendingUp, Shield, DollarSign, Award } from 'lucide-react';

const HalalAlternatives = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const alternatives = [
    {
      id: 1,
      name: 'Amana Mutual Funds',
      category: 'investment',
      halalScore: 95,
      type: 'Investment Fund',
      description: 'Shariah-compliant mutual funds with diversified portfolio',
      features: ['No interest-based investments', 'Regular purification', 'Shariah board oversight'],
      minInvestment: '$250',
      expectedReturn: '8-12%'
    },
    {
      id: 2,
      name: 'Wahed Invest',
      category: 'investment',
      halalScore: 92,
      type: 'Robo-Advisor',
      description: 'Automated halal investing with AI-powered portfolio management',
      features: ['Automated rebalancing', 'Zakat calculation', 'Halal screening'],
      minInvestment: '$100',
      expectedReturn: '7-10%'
    },
    {
      id: 3,
      name: 'Islamic Bank Personal Finance',
      category: 'banking',
      halalScore: 88,
      type: 'Personal Banking',
      description: 'Interest-free banking with profit-sharing accounts',
      features: ['No interest charges', 'Profit-sharing deposits', 'Shariah-compliant cards'],
      minInvestment: '$0',
      expectedReturn: '3-5%'
    },
    {
      id: 4,
      name: 'Takaful Insurance',
      category: 'insurance',
      halalScore: 90,
      type: 'Islamic Insurance',
      description: 'Cooperative insurance based on mutual assistance principles',
      features: ['No gharar', 'Mutual cooperation', 'Surplus sharing'],
      minInvestment: '$50/month',
      expectedReturn: 'Protection + Surplus'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: Heart },
    { id: 'investment', name: 'Investments', icon: TrendingUp },
    { id: 'banking', name: 'Banking', icon: DollarSign },
    { id: 'insurance', name: 'Insurance', icon: Shield }
  ];

  const filteredAlternatives = selectedCategory === 'all' 
    ? alternatives 
    : alternatives.filter(alt => alt.category === selectedCategory);

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900">Halal Alternatives</h1>
              <p className="text-gray-600 font-semibold">Discover Shariah-Compliant Financial Products</p>
            </div>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Find verified halal alternatives to conventional financial products, all screened for Shariah compliance.
          </p>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
          <h2 className="text-xl font-black text-gray-900 mb-4">Filter by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <category.icon className={`h-8 w-8 mx-auto mb-2 ${
                  selectedCategory === category.id ? 'text-green-600' : 'text-gray-400'
                }`} />
                <span className="font-semibold text-gray-900">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Alternatives Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredAlternatives.map((alternative) => (
            <div key={alternative.id} className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-1">{alternative.name}</h3>
                  <p className="text-green-600 font-semibold">{alternative.type}</p>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-black ${getScoreColor(alternative.halalScore)}`}>
                    {alternative.halalScore}
                  </div>
                  <div className="text-xs text-gray-500">Halal Score</div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{alternative.description}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-600">Minimum Investment:</span>
                  <span className="font-bold text-green-600">{alternative.minInvestment}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-600">Expected Return:</span>
                  <span className="font-bold text-blue-600">{alternative.expectedReturn}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-2">Key Features:</h4>
                <ul className="space-y-1">
                  {alternative.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <Award className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-colors">
                  Learn More
                </button>
                <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-white rounded-3xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-gray-700 mb-6">
            Submit a request and our team will help you find Shariah-compliant alternatives for any financial product.
          </p>
          <button className="px-8 py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-colors">
            Request Custom Alternative
          </button>
        </div>
      </div>
    </div>
  );
};

export default HalalAlternatives;