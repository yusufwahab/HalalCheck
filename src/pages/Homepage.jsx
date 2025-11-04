import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Play, Star, CheckCircle, Users, Building2, TrendingUp, Award } from 'lucide-react';

const Homepage = ({ user, setUser }) => {
  const handleLogin = () => {
    setUser({ ...user, isLoggedIn: true });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="glass-effect fixed w-full top-0 z-50 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-2xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-3xl font-black text-blue-600">TrustBridge</span>
                <div className="text-xs text-gray-500 font-semibold -mt-1">NDPR COMPLIANCE</div>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">Features</a>
              <a href="#companies" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">Companies</a>
              <Link to="/mode-selection" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">Login</Link>
              <Link to="/dashboard" className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all">Get Started</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-blue-100 rounded-full text-blue-800 text-sm font-bold mb-8">
              <Shield className="h-4 w-4 mr-2 text-blue-600" />
              Now supporting NDPR 2024 updates
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Nigerian Data<br />
              <span className="text-blue-600">Compliance</span><br />
              <span className="text-4xl md:text-5xl text-gray-600 font-light">Simplified</span>
            </h1>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Automate <span className="text-blue-600 font-semibold">NDPR compliance</span> with AI-powered analysis. 
              Empower <span className="text-blue-600 font-semibold">citizens</span> to control their data rights with transparency and trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link 
                to="/dashboard" 
                className="inline-flex items-center px-10 py-5 bg-blue-600 text-white text-xl rounded-2xl font-bold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Start Free Compliance Check
                <ArrowRight className="h-6 w-6 ml-3 text-white" />
              </Link>
              <button className="inline-flex items-center px-10 py-5 bg-white border-2 border-blue-600 text-blue-600 text-xl rounded-2xl font-bold hover:bg-blue-50 transition-all duration-200">
                <Play className="h-6 w-6 mr-3 text-blue-600" />
                Watch Demo
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-bold">{i}</div>
                  ))}
                </div>
                <Star className="h-6 w-6 text-blue-600 fill-current" />
                <span className="font-semibold">Trusted by <span className="text-blue-600">1,247+</span> businesses</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6">How It Works</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">Three simple steps to achieve <span className="text-blue-600 font-semibold">NDPR compliance</span></p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center premium-card p-10 rounded-3xl bg-white">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <span className="text-4xl">📄</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Upload Policy</h3>
              <p className="text-gray-600 leading-relaxed">Upload your <span className="text-blue-600 font-semibold">privacy policy</span> and let our advanced AI analyze it for comprehensive NDPR compliance</p>
              <div className="mt-6 text-sm text-blue-600 font-bold">Step 1</div>
            </div>
            
            <div className="text-center premium-card p-10 rounded-3xl bg-white">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <span className="text-4xl">🤖</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">AI Analysis</h3>
              <p className="text-gray-600 leading-relaxed">Get <span className="text-blue-600 font-semibold">instant, detailed analysis</span> with compliance scoring and personalized recommendations</p>
              <div className="mt-6 text-sm text-blue-600 font-bold">Step 2</div>
            </div>
            
            <div className="text-center premium-card p-10 rounded-3xl bg-white">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <span className="text-4xl">✅</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Get Results</h3>
              <p className="text-gray-600 leading-relaxed">Receive <span className="text-blue-600 font-semibold">actionable insights</span> and step-by-step guidance to achieve full compliance</p>
              <div className="mt-6 text-sm text-blue-600 font-bold">Step 3</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-6">Platform <span className="text-blue-600">Statistics</span></h2>
            <p className="text-2xl text-gray-600">Real numbers from our growing community</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-blue-600 mb-3">1,247</div>
              <div className="text-gray-600 font-semibold">Companies Registered</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-blue-600 mb-3">89%</div>
              <div className="text-gray-600 font-semibold">Average Compliance</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-blue-600 mb-3">2.4M</div>
              <div className="text-gray-600 font-semibold">Data Connections</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-blue-600 mb-3">24/7</div>
              <div className="text-gray-600 font-semibold">Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section id="companies" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-6">Trusted by <span className="text-blue-600">Industry Leaders</span></h2>
            <p className="text-2xl text-gray-600">Join companies ensuring <span className="text-blue-600 font-semibold">NDPR compliance</span></p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center mb-12">
            {['Flutterwave', 'Paystack', 'Kuda Bank', 'Interswitch', 'GTBank'].map((company) => (
              <div key={company} className="text-center">
                <div className="premium-card h-20 rounded-2xl flex items-center justify-center bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <span className="font-black text-gray-900 text-lg">{company}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link 
              to="/companies" 
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
            >
              View All Companies
              <ArrowRight className="h-6 w-6 ml-3 text-white" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6">Why Choose <span className="text-blue-600">TrustBridge</span></h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">Everything you need for complete NDPR compliance</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="premium-card p-8 rounded-3xl text-center bg-white">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">AI-Powered Analysis</h3>
              <p className="text-gray-600">Advanced AI scans your policies against NDPR requirements with 99% accuracy</p>
            </div>
            
            <div className="premium-card p-8 rounded-3xl text-center bg-white">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">Citizen Empowerment</h3>
              <p className="text-gray-600">Give citizens control over their data with transparent request management</p>
            </div>
            
            <div className="premium-card p-8 rounded-3xl text-center bg-white">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">Compliance Certificates</h3>
              <p className="text-gray-600">Generate official NDPR compliance certificates and website badges</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-2xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of Nigerian businesses ensuring NDPR compliance with TrustBridge
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/mode-selection"
              className="inline-flex items-center px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
            >
              <Building2 className="h-6 w-6 mr-3 text-blue-600" />
              Start Free Trial
            </Link>
            <Link 
              to="/companies"
              className="inline-flex items-center px-10 py-5 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              <TrendingUp className="h-6 w-6 mr-3" />
              View Companies
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-600 rounded-2xl">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <span className="text-3xl font-black text-white">TrustBridge</span>
                  <div className="text-xs text-gray-400 font-semibold -mt-1">NDPR COMPLIANCE</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Making <span className="text-blue-400 font-semibold">Nigerian data compliance</span> simple, transparent, and accessible for everyone.
              </p>
            </div>
            
            <div>
              <h3 className="font-black text-white mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/companies" className="text-gray-400 hover:text-blue-400 transition-colors">Companies</Link></li>
                <li><Link to="/register-company" className="text-gray-400 hover:text-blue-400 transition-colors">Register Company</Link></li>
                <li><Link to="/citizen-request" className="text-gray-400 hover:text-blue-400 transition-colors">Data Rights</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-black text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors">About Us</li>
                <li className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors">Contact</li>
                <li className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400">
                © 2024 <span className="text-blue-400 font-semibold">TrustBridge</span>. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;