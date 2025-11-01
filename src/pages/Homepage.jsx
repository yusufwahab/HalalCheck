import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Play, Star, CheckCircle } from 'lucide-react';
import { leaderboardCompanies, platformStats } from '../data/mockData';

const Homepage = ({ user, setUser }) => {
  const handleLogin = () => {
    setUser({ ...user, isLoggedIn: true });
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="bg-dark-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-brand-green" />
              <span className="text-xl font-bold text-dark-text">TrustBridge</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-dark-text-secondary hover:text-dark-text">Features</a>
              <a href="#pricing" className="text-dark-text-secondary hover:text-dark-text">Pricing</a>
              <Link to="/dashboard" onClick={handleLogin} className="text-dark-text-secondary hover:text-dark-text">Login</Link>
              <Link to="/dashboard" onClick={handleLogin} className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-black rounded-lg font-semibold hover:bg-lemon-green transition-colors">Sign Up</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark-card to-dark-bg text-dark-text py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Nigerian Data Compliance,<br />
            <span className="text-brand-green">Simplified</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-dark-text-secondary max-w-3xl mx-auto">
            Automate NDPR compliance & empower citizens to control their data rights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to="/dashboard" onClick={handleLogin} className="inline-flex items-center gap-2 bg-brand-green text-black hover:bg-lemon-green text-lg px-8 py-4 rounded-lg font-semibold transition-colors">
              Get Started Free <ArrowRight className="h-5 w-5" />
            </Link>
            <button className="inline-flex items-center gap-2 bg-transparent border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-black text-lg px-8 py-4 rounded-lg font-semibold transition-colors">
              <Play className="h-5 w-5" /> Watch 2min Demo
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 text-dark-text-secondary">
            <Star className="h-5 w-5 text-brand-green" />
            <span>Trusted by {platformStats.totalCompanies.toLocaleString()} businesses</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-dark-text">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-lemon-green p-6 rounded-lg">
              <div className="w-16 h-16 bg-dark-card rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-black">Upload Policy</h3>
              <p className="text-gray-800">Upload your privacy policy and let our AI analyze it for NDPR compliance</p>
            </div>
            <div className="text-center bg-lemon-green p-6 rounded-lg">
              <div className="w-16 h-16 bg-dark-card rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-black">AI Analyzes</h3>
              <p className="text-gray-800">Get instant analysis with detailed compliance scoring and recommendations</p>
            </div>
            <div className="text-center bg-lemon-green p-6 rounded-lg">
              <div className="w-16 h-16 bg-dark-card rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-black">Get Score & Fixes</h3>
              <p className="text-gray-800">Receive actionable steps to improve compliance and avoid penalties</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-dark-text-secondary">Takes 60 seconds • Instant results</p>
          </div>
        </div>
      </section>

      {/* Live Leaderboard */}
      <section className="py-20 bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-dark-text">Live Compliance Leaderboard</h2>
          <div className="bg-dark-bg rounded-xl shadow-lg p-8">
            {leaderboardCompanies.slice(0, 5).map((company, index) => (
              <div key={company.id} className="flex items-center justify-between py-4 border-b border-dark-border last:border-b-0">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}️⃣`}
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark-text">{company.name}</h3>
                    <p className="text-sm text-dark-text-secondary">{company.industry} • {company.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold text-lg text-dark-text">{company.score}/100</div>
                    <div className="w-32 h-2 bg-dark-border rounded-full">
                      <div 
                        className={`h-full rounded-full ${
                          company.score >= 80 ? 'bg-green-500' : 
                          company.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${company.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <CheckCircle className={`h-6 w-6 ${company.score >= 80 ? 'text-green-500' : 'text-yellow-500'}`} />
                </div>
              </div>
            ))}
            <div className="text-center mt-6">
              <Link to="/explore" className="text-brand-green hover:text-lemon-green font-medium">
                View Full Leaderboard →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12 text-dark-text-secondary">Trusted By</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            {['Flutterwave', 'Paystack', 'Kuda Bank', 'Interswitch', 'GTBank'].map((company) => (
              <div key={company} className="text-center">
                <div className="h-12 bg-dark-card rounded flex items-center justify-center">
                  <span className="font-semibold text-dark-text">{company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-card text-dark-text py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="text-lg font-bold">TrustBridge</span>
              </div>
              <p className="text-dark-text-secondary">Making Nigerian data compliance simple and transparent.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-dark-text-secondary">
                <li>NDPR Compliance</li>
                <li>AI Policy Analysis</li>
                <li>Citizen Data Rights</li>
                <li>Compliance Scoring</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-dark-text-secondary">
                <li>About</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-dark-text-secondary">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-border mt-8 pt-8 text-center text-dark-text-secondary">
            <p>© 2025 TrustBridge • Made in Nigeria</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;