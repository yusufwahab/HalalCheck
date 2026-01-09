import { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, Heart, Info, CheckCircle, AlertCircle } from 'lucide-react';

const ZakatCalculator = () => {
  const [assets, setAssets] = useState({
    cash: '',
    bankBalance: '',
    gold: '',
    silver: '',
    investments: '',
    businessAssets: '',
    debtsOwed: '',
    debtsOwing: ''
  });

  const [goldPrice, setGoldPrice] = useState(2050); // USD per ounce
  const [silverPrice, setSilverPrice] = useState(24); // USD per ounce
  const [zakatResult, setZakatResult] = useState(null);

  // Nisab thresholds
  const goldNisab = 87.48; // grams (equivalent to 85 grams of gold)
  const silverNisab = 612.36; // grams (equivalent to 595 grams of silver)

  const calculateZakat = () => {
    const totalAssets = 
      parseFloat(assets.cash || 0) +
      parseFloat(assets.bankBalance || 0) +
      parseFloat(assets.gold || 0) +
      parseFloat(assets.silver || 0) +
      parseFloat(assets.investments || 0) +
      parseFloat(assets.businessAssets || 0) +
      parseFloat(assets.debtsOwed || 0);

    const totalDebts = parseFloat(assets.debtsOwing || 0);
    const netAssets = totalAssets - totalDebts;

    // Calculate nisab in USD
    const goldNisabUSD = (goldNisab / 31.1035) * goldPrice; // Convert grams to ounces
    const silverNisabUSD = (silverNisab / 31.1035) * silverPrice;
    const nisabThreshold = Math.min(goldNisabUSD, silverNisabUSD); // Use lower threshold

    const isZakatDue = netAssets >= nisabThreshold;
    const zakatAmount = isZakatDue ? netAssets * 0.025 : 0; // 2.5%

    setZakatResult({
      totalAssets,
      totalDebts,
      netAssets,
      nisabThreshold,
      isZakatDue,
      zakatAmount,
      goldNisabUSD,
      silverNisabUSD
    });
  };

  const handleInputChange = (field, value) => {
    setAssets(prev => ({
      ...prev,
      [field]: value
    }));
  };

  useEffect(() => {
    // Auto-calculate when inputs change
    const timer = setTimeout(() => {
      calculateZakat();
    }, 500);

    return () => clearTimeout(timer);
  }, [assets, goldPrice, silverPrice]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900">Zakat Calculator</h1>
              <p className="text-gray-600 font-semibold">Calculate your Islamic wealth tax obligation</p>
            </div>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Zakat is one of the Five Pillars of Islam. Calculate your annual zakat obligation based on current nisab thresholds and live gold/silver prices.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-green-600" />
              Your Assets (USD)
            </h2>

            <div className="space-y-6">
              {/* Cash & Bank */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Cash & Bank Accounts</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cash in Hand</label>
                    <input
                      type="number"
                      value={assets.cash}
                      onChange={(e) => handleInputChange('cash', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Balance</label>
                    <input
                      type="number"
                      value={assets.bankBalance}
                      onChange={(e) => handleInputChange('bankBalance', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* Precious Metals */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Precious Metals (USD Value)</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gold</label>
                    <input
                      type="number"
                      value={assets.gold}
                      onChange={(e) => handleInputChange('gold', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Silver</label>
                    <input
                      type="number"
                      value={assets.silver}
                      onChange={(e) => handleInputChange('silver', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* Investments & Business */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Investments & Business</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Investments/Stocks</label>
                    <input
                      type="number"
                      value={assets.investments}
                      onChange={(e) => handleInputChange('investments', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Business Assets</label>
                    <input
                      type="number"
                      value={assets.businessAssets}
                      onChange={(e) => handleInputChange('businessAssets', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* Debts */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Debts</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Money Owed to You</label>
                    <input
                      type="number"
                      value={assets.debtsOwed}
                      onChange={(e) => handleInputChange('debtsOwed', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Debts/Loans</label>
                    <input
                      type="number"
                      value={assets.debtsOwing}
                      onChange={(e) => handleInputChange('debtsOwing', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Nisab Information */}
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <Info className="h-6 w-6 text-blue-600" />
                Current Nisab Thresholds
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-xl">
                  <span className="font-semibold text-gray-700">Gold Nisab (87.48g)</span>
                  <span className="font-black text-yellow-600">${zakatResult?.goldNisabUSD.toLocaleString() || '0'}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <span className="font-semibold text-gray-700">Silver Nisab (612.36g)</span>
                  <span className="font-black text-gray-600">${zakatResult?.silverNisabUSD.toLocaleString() || '0'}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                  <span className="font-semibold text-gray-700">Applicable Nisab (Lower)</span>
                  <span className="font-black text-green-600">${zakatResult?.nisabThreshold.toLocaleString() || '0'}</span>
                </div>
              </div>
            </div>

            {/* Zakat Calculation Result */}
            {zakatResult && (
              <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  {zakatResult.isZakatDue ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-orange-500" />
                  )}
                  Zakat Calculation
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                    <span className="font-semibold text-gray-700">Total Assets</span>
                    <span className="font-black text-blue-600">${zakatResult.totalAssets.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                    <span className="font-semibold text-gray-700">Total Debts</span>
                    <span className="font-black text-red-600">-${zakatResult.totalDebts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="font-semibold text-gray-700">Net Zakatable Assets</span>
                    <span className="font-black text-gray-800">${zakatResult.netAssets.toLocaleString()}</span>
                  </div>
                  
                  <div className={`p-6 rounded-2xl ${zakatResult.isZakatDue ? 'bg-green-100 border-2 border-green-300' : 'bg-orange-100 border-2 border-orange-300'}`}>
                    {zakatResult.isZakatDue ? (
                      <div className="text-center">
                        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                        <h3 className="text-xl font-black text-green-800 mb-2">Zakat is Due</h3>
                        <p className="text-green-700 mb-4">Your wealth exceeds the nisab threshold</p>
                        <div className="text-3xl font-black text-green-600 mb-2">
                          ${zakatResult.zakatAmount.toLocaleString()}
                        </div>
                        <p className="text-sm text-green-600 font-semibold">Annual Zakat Obligation (2.5%)</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-3" />
                        <h3 className="text-xl font-black text-orange-800 mb-2">No Zakat Due</h3>
                        <p className="text-orange-700">Your wealth is below the nisab threshold</p>
                        <div className="text-lg font-semibold text-orange-600 mt-2">
                          Need ${(zakatResult.nisabThreshold - zakatResult.netAssets).toLocaleString()} more to reach nisab
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Charity Recommendations */}
            {zakatResult?.isZakatDue && (
              <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <Heart className="h-6 w-6 text-red-500" />
                  Recommended Charities
                </h2>
                
                <div className="space-y-3">
                  {[
                    'Islamic Relief Worldwide',
                    'Muslim Aid',
                    'Penny Appeal',
                    'Human Appeal',
                    'Local Mosque Zakat Fund'
                  ].map((charity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors cursor-pointer">
                      <span className="font-semibold text-gray-700">{charity}</span>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                        Donate
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Islamic Guidelines */}
        <div className="mt-12 bg-white rounded-3xl shadow-xl p-6 sm:p-8">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Islamic Guidelines for Zakat</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-green-600 mb-3">Conditions for Zakat</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Must be a Muslim</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Wealth must reach nisab threshold</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Wealth must be held for one lunar year</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Must have full ownership of the wealth</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-600 mb-3">Who Can Receive Zakat</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Heart className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>The poor (Al-Fuqara)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>The needy (Al-Masakin)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Zakat administrators</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Those whose hearts are to be reconciled</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculator;