import { useState } from 'react';
import { Heart, DollarSign, Users, Clock, Shield, CheckCircle, AlertTriangle } from 'lucide-react';

const QardHasan = () => {
  const [activeTab, setActiveTab] = useState('borrow');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');

  const loans = [
    {
      id: 1,
      borrower: 'Ahmad K.',
      amount: 5000,
      purpose: 'Small business expansion',
      duration: '12 months',
      verified: true,
      funded: 3200,
      supporters: 8
    },
    {
      id: 2,
      borrower: 'Fatima S.',
      amount: 2500,
      purpose: 'Medical treatment',
      duration: '6 months',
      verified: true,
      funded: 2500,
      supporters: 12
    },
    {
      id: 3,
      borrower: 'Omar M.',
      amount: 8000,
      purpose: 'Education expenses',
      duration: '18 months',
      verified: true,
      funded: 1200,
      supporters: 3
    }
  ];

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
              <h1 className="text-4xl font-black text-gray-900">Qard Hasan</h1>
              <p className="text-gray-600 font-semibold">Interest-Free Community Lending</p>
            </div>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Connect with fellow Muslims for benevolent loans based on mutual assistance and Islamic principles.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-3xl shadow-xl p-2 mb-8 max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveTab('borrow')}
              className={`px-6 py-3 rounded-2xl font-bold transition-all duration-200 ${
                activeTab === 'borrow'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Request Loan
            </button>
            <button
              onClick={() => setActiveTab('lend')}
              className={`px-6 py-3 rounded-2xl font-bold transition-all duration-200 ${
                activeTab === 'lend'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Offer Help
            </button>
          </div>
        </div>

        {activeTab === 'borrow' ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Request Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Request Qard Hasan</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">Amount Needed (USD)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-lg"
                    placeholder="5000"
                  />
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">Purpose</label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-lg"
                  >
                    <option value="">Select purpose</option>
                    <option value="business">Business expansion</option>
                    <option value="education">Education expenses</option>
                    <option value="medical">Medical treatment</option>
                    <option value="emergency">Emergency needs</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">Repayment Period</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-lg">
                    <option>6 months</option>
                    <option>12 months</option>
                    <option>18 months</option>
                    <option>24 months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">Description</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-lg resize-none"
                    placeholder="Explain your situation and how this loan will help..."
                  />
                </div>

                <button className="w-full px-6 py-4 bg-green-600 text-white rounded-2xl font-bold text-lg hover:bg-green-700 transition-colors">
                  Submit Request
                </button>
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Islamic Guidelines</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-xl">
                  <h3 className="font-bold text-green-800 mb-2">Qard Hasan Principles</h3>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• No interest or profit for the lender</li>
                    <li>• Repay only the principal amount</li>
                    <li>• Based on mutual trust and assistance</li>
                    <li>• Flexible repayment in case of hardship</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h3 className="font-bold text-blue-800 mb-2">Borrower Responsibilities</h3>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Honest about financial situation</li>
                    <li>• Use funds for stated purpose only</li>
                    <li>• Make sincere effort to repay</li>
                    <li>• Communicate if facing difficulties</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-xl">
                  <h3 className="font-bold text-purple-800 mb-2">Verification Process</h3>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• Identity verification required</li>
                    <li>• Income documentation</li>
                    <li>• Community references</li>
                    <li>• Islamic character assessment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Active Requests */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Active Requests</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loans.map((loan) => (
                  <div key={loan.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-green-300 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                          {loan.borrower.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{loan.borrower}</div>
                          {loan.verified && (
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <CheckCircle className="h-3 w-3" />
                              Verified
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-2xl font-black text-gray-900 mb-1">${loan.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 mb-2">{loan.purpose}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {loan.duration}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Funded: ${loan.funded.toLocaleString()}</span>
                        <span>{Math.round((loan.funded / loan.amount) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(loan.funded / loan.amount) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                        <Users className="h-3 w-3" />
                        {loan.supporters} supporters
                      </div>
                    </div>

                    <button className="w-full px-4 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors">
                      Contribute
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Lender Benefits */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Rewards of Qard Hasan</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-2xl">
                  <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Spiritual Reward</h3>
                  <p className="text-gray-600 text-sm">
                    "Whoever relieves a believer's distress, Allah will relieve his distress in this world and the Hereafter."
                  </p>
                </div>
                
                <div className="text-center p-6 bg-blue-50 rounded-2xl">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Divine Protection</h3>
                  <p className="text-gray-600 text-sm">
                    Allah's protection and blessings for those who help others in their time of need.
                  </p>
                </div>
                
                <div className="text-center p-6 bg-purple-50 rounded-2xl">
                  <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Community Building</h3>
                  <p className="text-gray-600 text-sm">
                    Strengthen bonds within the Muslim community through mutual assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-800 mb-2">Important Notice</h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                Qard Hasan is a form of charitable lending in Islam. Lenders should not expect any return beyond the principal amount. 
                All transactions are based on trust and Islamic principles. Please ensure you understand your obligations before participating.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QardHasan;