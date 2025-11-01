import { useState } from 'react';
import { Search, Trophy, TrendingUp, MapPin, Filter, Star, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import { leaderboardCompanies, industryStats, platformStats } from '../data/mockData';

const Explore = ({ user }) => {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');

  const filteredCompanies = leaderboardCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'All Industries' || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-500" />;
    return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
  };

  const getMedalEmoji = (index) => {
    switch(index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `${index + 1}️⃣`;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark-text mb-4">Explore Companies & Compliance</h1>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-text-secondary" />
              <input
                type="text"
                placeholder="Search companies, industries, regulations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark-card border border-dark-border text-dark-text rounded-xl focus:ring-2 focus:ring-brand-green focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-dark-card rounded-xl p-1 border border-dark-border">
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'leaderboard' 
                  ? 'bg-brand-green text-black' 
                  : 'text-dark-text-secondary hover:text-dark-text'
              }`}
            >
              🏆 Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('industry')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'industry' 
                  ? 'bg-brand-green text-black' 
                  : 'text-dark-text-secondary hover:text-dark-text'
              }`}
            >
              📊 By Industry
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'map' 
                  ? 'bg-brand-green text-black' 
                  : 'text-dark-text-secondary hover:text-dark-text'
              }`}
            >
              🗺️ Map View
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'stats' 
                  ? 'bg-brand-green text-black' 
                  : 'text-dark-text-secondary hover:text-dark-text'
              }`}
            >
              📈 Stats
            </button>
          </div>
        </div>

        {activeTab === 'leaderboard' && (
          <div className="space-y-8">
            {/* Filters */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-dark-text-secondary" />
                  <span className="font-medium text-dark-text">Filter:</span>
                </div>
                <select 
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="bg-dark-bg border border-dark-border text-dark-text rounded-lg px-3 py-2"
                >
                  <option>All Industries</option>
                  <option>Fintech</option>
                  <option>Banking</option>
                  <option>E-commerce</option>
                  <option>Healthcare</option>
                </select>
                <select className="bg-dark-bg border border-dark-border text-dark-text rounded-lg px-3 py-2">
                  <option>All Locations</option>
                  <option>Lagos</option>
                  <option>Abuja</option>
                  <option>Port Harcourt</option>
                </select>
                <select className="bg-dark-bg border border-dark-border text-dark-text rounded-lg px-3 py-2">
                  <option>Score: All</option>
                  <option>80-100 (Compliant)</option>
                  <option>60-79 (Warning)</option>
                  <option>0-59 (Critical)</option>
                </select>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-dark-card rounded-xl border border-dark-border">
              <div className="p-6 border-b border-dark-border">
                <h2 className="text-2xl font-bold text-dark-text flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  Nigerian Compliance Leaderboard
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {filteredCompanies.map((company, index) => (
                    <div key={company.id} className="border border-dark-border rounded-lg p-6 hover:border-brand-green transition-colors bg-dark-bg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="text-3xl">{getMedalEmoji(index)}</div>
                          <div className="w-16 h-16 bg-lemon-green rounded-lg flex items-center justify-center">
                            <span className="font-bold text-black">{company.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-dark-text">{company.name}</h3>
                            <p className="text-dark-text-secondary">{company.industry} • {company.location}</p>
                            <p className="text-sm text-dark-text-secondary">{company.connectedUsers.toLocaleString()} users connected</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${getScoreColor(company.score)}`}>
                              {company.score}/100
                            </div>
                            <div className="w-32 h-3 bg-dark-border rounded-full mt-2">
                              <div 
                                className={`h-full rounded-full ${
                                  company.score >= 80 ? 'bg-green-500' : 
                                  company.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${company.score}%` }}
                              ></div>
                            </div>
                          </div>
                          {getScoreIcon(company.score)}
                        </div>
                      </div>
                      
                      {(company.strengths || company.warnings || company.improvement) && (
                        <div className="mt-4 pt-4 border-t border-dark-border">
                          <div className="grid md:grid-cols-2 gap-4">
                            {company.strengths && (
                              <div>
                                <p className="font-medium text-dark-text mb-2">Strengths:</p>
                                <ul className="text-sm text-dark-text-secondary space-y-1">
                                  {company.strengths.map((strength, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                      {strength}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {company.warnings && (
                              <div>
                                <p className="font-medium text-dark-text mb-2">Areas for improvement:</p>
                                <ul className="text-sm text-dark-text-secondary space-y-1">
                                  {company.warnings.map((warning, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                      {warning}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {company.improvement && (
                              <div className="md:col-span-2">
                                <p className="text-sm text-green-600 font-medium">
                                  <TrendingUp className="h-4 w-4 inline mr-1" />
                                  Recent: {company.improvement}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-3 mt-4">
                        <button className="px-4 py-2 bg-transparent text-brand-green border border-brand-green rounded-lg hover:bg-brand-green hover:text-black transition-colors">View Profile</button>
                        <button className="px-4 py-2 bg-brand-green text-black rounded-lg hover:bg-lemon-green transition-colors">I'm a Customer</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'industry' && (
          <div className="space-y-8">
            {/* Industry Stats */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h2 className="text-2xl font-bold text-dark-text mb-6">Average Compliance Score by Industry</h2>
              <div className="space-y-4">
                {industryStats.map((industry) => (
                  <div key={industry.name} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-dark-text w-24">{industry.name}</span>
                      <div className="flex-1 max-w-md">
                        <div className="w-full h-3 bg-dark-border rounded-full">
                          <div 
                            className={`h-full rounded-full ${
                              industry.score >= 80 ? 'bg-green-500' : 
                              industry.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${industry.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lg text-dark-text">{industry.score}/100</span>
                      <span className="text-sm text-dark-text-secondary">{industry.companies} cos.</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Improved */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h2 className="text-2xl font-bold text-dark-text mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-500" />
                Most Improved This Month
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-dark-border">
                  <div>
                    <h3 className="font-semibold text-dark-text">🔥 Kuda Bank</h3>
                    <p className="text-sm text-dark-text-secondary">Achievement: Added DPO, updated retention policy</p>
                  </div>
                  <div className="text-right">
                    <span className="text-green-600 font-bold">+15 points</span>
                    <p className="text-sm text-dark-text-secondary">(72 → 87)</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-dark-border">
                  <div>
                    <h3 className="font-semibold text-dark-text">📈 Piggyvest</h3>
                    <p className="text-sm text-dark-text-secondary">Achievement: Implemented cookie consent</p>
                  </div>
                  <div className="text-right">
                    <span className="text-green-600 font-bold">+12 points</span>
                    <p className="text-sm text-dark-text-secondary">(73 → 85)</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="font-semibold text-dark-text">⬆️ Jumia</h3>
                    <p className="text-sm text-dark-text-secondary">Achievement: Enhanced privacy policy clarity</p>
                  </div>
                  <div className="text-right">
                    <span className="text-green-600 font-bold">+8 points</span>
                    <p className="text-sm text-dark-text-secondary">(77 → 85)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-8">
            {/* Platform Statistics */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h2 className="text-2xl font-bold text-dark-text mb-6">Platform Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-green">{platformStats.totalCompanies.toLocaleString()}</div>
                  <div className="text-dark-text-secondary">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{platformStats.totalCitizens.toLocaleString()}</div>
                  <div className="text-dark-text-secondary">Citizens Connected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">{platformStats.totalRequests.toLocaleString()}</div>
                  <div className="text-dark-text-secondary">Requests Processed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-dark-text">{platformStats.averageScore}%</div>
                  <div className="text-dark-text-secondary">Avg Score</div>
                </div>
              </div>
            </div>

            {/* Trends */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h2 className="text-2xl font-bold text-dark-text mb-6">📈 Trends</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span className="text-dark-text">+34 new companies this week</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span className="text-dark-text">Average score improved by 3% this month</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-dark-text">97% of requests completed within deadline</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="bg-dark-card rounded-xl border border-dark-border p-6">
            <h2 className="text-2xl font-bold text-dark-text mb-6 flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              Map View
            </h2>
            <div className="h-96 bg-dark-bg rounded-lg flex items-center justify-center">
              <p className="text-dark-text-secondary">Interactive map coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;