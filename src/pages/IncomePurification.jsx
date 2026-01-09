import { useState } from 'react';
import { Shield, Calculator, Heart, AlertTriangle, CheckCircle } from 'lucide-react';

const IncomePurification = () => {
  const [income, setIncome] = useState({
    totalIncome: '',
    halalPercentage: '',
    haramSources: ''
  });
  
  const [result, setResult] = useState(null);

  const calculatePurification = () => {
    const total = parseFloat(income.totalIncome || 0);
    const halalPercent = parseFloat(income.halalPercentage || 0);
    const haramAmount = parseFloat(income.haramSources || 0);
    
    const halalFromPercentage = (total * halalPercent) / 100;
    const totalHaram = (total - halalFromPercentage) + haramAmount;
    const purificationAmount = totalHaram;
    const cleanIncome = total - purificationAmount;
    
    setResult({
      totalIncome: total,
      halalIncome: halalFromPercentage,
      haramIncome: totalHaram,
      purificationAmount,
      cleanIncome,
      purificationPercentage: (purificationAmount / total) * 100
    });
  };

  const charities = [
    'Islamic Relief Worldwide',
    'Muslim Aid',
    'Penny Appeal',
    'Human Appeal International',
    'Local Mosque Fund'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900">Income Purification</h1>
              <p className="text-gray-600 font-semibold">Cleanse Mixed Income According to Islamic Law</p>
            </div>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Calculate the exact amount you need to donate as charity to purify income from mixed sources containing both halal and haram elements.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <Calculator className="h-6 w-6 text-green-600" />
              Income Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3">Total Monthly Income (USD)</label>
                <input
                  type="number"
                  value={income.totalIncome}
                  onChange={(e) => setIncome(prev => ({...prev, totalIncome: e.target.value}))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-lg"
                  placeholder="5000"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3">Estimated Halal Percentage (%)</label>
                <input
                  type="number"
                  value={income.halalPercentage}
                  onChange={(e) => setIncome(prev => ({...prev, halalPercentage: e.target.value}))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-lg"
                  placeholder="85"
                  max="100"
                />
                <p className="text-sm text-gray-600 mt-2">
                  For mixed investments, use AAOIFI standard: companies with &lt;5% haram revenue are typically 95% halal
                </p>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3">Known Haram Sources (USD)</label>
                <input
                  type="number"
                  value={income.haramSources}
                  onChange={(e) => setIncome(prev => ({...prev, haramSources: e.target.value}))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-lg"
                  placeholder="0"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Direct interest, gambling winnings, or other clearly prohibited income
                </p>
              </div>

              <button
                onClick={calculatePurification}
                className="w-full px-6 py-4 bg-green-600 text-white rounded-2xl font-bold text-lg hover:bg-green-700 transition-colors"
              >
                Calculate Purification Amount
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result && (
              <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Purification Results
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                    <span className="font-semibold text-gray-700">Total Income</span>
                    <span className="font-black text-blue-600">${result.totalIncome.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                    <span className="font-semibold text-gray-700">Halal Income</span>
                    <span className="font-black text-green-600">${result.halalIncome.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                    <span className="font-semibold text-gray-700">Haram Income</span>
                    <span className="font-black text-red-600">${result.haramIncome.toLocaleString()}</span>
                  </div>
                  
                  <div className="p-6 bg-yellow-100 border-2 border-yellow-300 rounded-2xl">
                    <div className="text-center">
                      <AlertTriangle className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
                      <h3 className="text-xl font-black text-yellow-800 mb-2">Purification Required</h3>
                      <div className="text-3xl font-black text-yellow-600 mb-2">
                        ${result.purificationAmount.toLocaleString()}
                      </div>
                      <p className="text-sm text-yellow-700">
                        {result.purificationPercentage.toFixed(1)}% of total income
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl">
                    <span className="font-semibold text-gray-700">Clean Income After Purification</span>
                    <span className="font-black text-emerald-600">${result.cleanIncome.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Charity Recommendations */}
            {result && (
              <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <Heart className="h-6 w-6 text-red-500" />
                  Recommended Charities
                </h2>
                
                <div className="space-y-3">
                  {charities.map((charity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors cursor-pointer">
                      <span className="font-semibold text-gray-700">{charity}</span>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                        Donate ${result.purificationAmount.toLocaleString()}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guidelines */}
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Islamic Guidelines</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h3 className="font-bold text-blue-800 mb-2">Intention (Niyyah)</h3>
                  <p className="text-blue-700 text-sm">
                    The purification must be done with the intention of cleansing haram income, not as regular charity.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-xl">
                  <h3 className="font-bold text-green-800 mb-2">No Reward Expected</h3>
                  <p className="text-green-700 text-sm">
                    This purification is obligatory and does not carry the same reward as voluntary charity (sadaqah).
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-xl">
                  <h3 className="font-bold text-purple-800 mb-2">Regular Monitoring</h3>
                  <p className="text-purple-700 text-sm">
                    Review and purify your income regularly, ideally monthly or quarterly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomePurification;