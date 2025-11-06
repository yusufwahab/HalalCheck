import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Play, Star, CheckCircle, Users, Building2, TrendingUp, Award, AlertTriangle, Clock, Zap, Target, Globe, Lock, FileCheck, BarChart3 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import trustBridgeLogo from "../assets/TrustBridgeLogo.png";
import AuthBg from '../assets/Trustbridge_authpages_img.png';

// Import company logos
import FlutterwaveLogo from '../assets/Flutterwave_logo.png';
import PaystackLogo from '../assets/Paystack_logo.png';
import KudaLogo from '../assets/Kuda_logo.png';
import InterswitchLogo from '../assets/interswitch_logo.jpg';
import GTBankLogo from '../assets/Gtbank_logo.png';

const Homepage = ({ user, setUser }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ companies: 0, compliance: 0, connections: 0 });
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    setIsVisible(true);
    
    const statsTimer = setTimeout(() => {
      let companies = 0, compliance = 0, connections = 0;
      const interval = setInterval(() => {
        companies = Math.min(companies + 25, 1247);
        compliance = Math.min(compliance + 2, 89);
        connections = Math.min(connections + 50000, 2400000);
        
        setAnimatedStats({ companies, compliance, connections });
        
        if (companies === 1247 && compliance === 89 && connections === 2400000) {
          clearInterval(interval);
        }
      }, 50);
    }, 1000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      clearTimeout(statsTimer);
      observer.disconnect();
    };
  }, []);

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
              <img src={trustBridgeLogo} alt="TrustBridge Logo" className="h-16 w-auto" />
              <div>
                <span className="text-3xl font-black text-blue-600">TrustBridge</span>
                <div className="text-xs text-gray-500 font-semibold -mt-1">NDPR COMPLIANCE</div>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">Features</a>
              <a href="#companies" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">Companies</a>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">Login</Link>
              <Link to="/login" className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all">Get Started</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${AuthBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`inline-flex items-center px-6 py-3 bg-blue-100 rounded-full text-blue-800 text-sm font-bold mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <Shield className="h-4 w-4 mr-2 text-blue-600 animate-pulse" />
              Now supporting NDPR 2024 updates
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-8 leading-tight">
              Nigerian Data<br />
              <span className="text-blue-400">Compliance</span><br />
              <span className="text-4xl md:text-5xl text-gray-200 font-light">Simplified</span>
            </h1>
            <p className="text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-12">
              Automate <span className="text-blue-400 font-semibold">NDPR compliance</span> with AI-powered analysis. 
              Empower <span className="text-blue-400 font-semibold">citizens</span> to control their data rights with transparency and trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link 
                to="/login" 
                className="inline-flex items-center px-10 py-5 bg-blue-600 text-white text-xl rounded-2xl font-bold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Start Free Compliance Check
                <ArrowRight className="h-6 w-6 ml-3 text-white" />
              </Link>
              <button 
                onClick={() => alert('Sorry, the video is not available now')}
                className="inline-flex items-center px-10 py-5 bg-white border-2 border-blue-600 text-blue-600 text-xl rounded-2xl font-bold hover:bg-blue-50 transition-all duration-200"
              >
                <Play className="h-6 w-6 mr-3 text-blue-600" />
                Watch Demo
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-bold transform hover:scale-110 animate-pulse" style={{animationDelay: `${i * 200}ms`}}>
                      <Users className="h-4 w-4" />
                    </div>
                  ))}
                </div>
                <Star className="h-6 w-6 text-blue-600 fill-current" />
                <span className="font-semibold">Trusted by <span className="text-blue-400 animate-pulse">{animatedStats.companies.toLocaleString()}+</span> businesses</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="problem" ref={el => sectionRefs.current.problem = el} className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${visibleSections.has('problem') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              The <span className="text-blue-600">Problem</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Nigerian businesses face <span className="text-blue-600 font-semibold">complex compliance challenges</span> with severe consequences
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`premium-card p-8 rounded-3xl text-center bg-white border-2 border-blue-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('problem') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '200ms'}}>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:rotate-12 transition-transform duration-300">
                <AlertTriangle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">Heavy Penalties</h3>
              <p className="text-gray-600 leading-relaxed">
                NITDA can impose fines up to <span className="text-blue-600 font-semibold">₦10 million</span> or 2% of annual revenue for non-compliance with NDPR regulations
              </p>
            </div>
            
            <div className={`premium-card p-8 rounded-3xl text-center bg-white border-2 border-blue-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('problem') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '400ms'}}>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:rotate-12 transition-transform duration-300">
                <FileCheck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">Complex Requirements</h3>
              <p className="text-gray-600 leading-relaxed">
                Understanding and implementing <span className="text-blue-600 font-semibold">NDPR Articles 2.1-4.5</span> requires legal expertise most businesses lack
              </p>
            </div>
            
            <div className={`premium-card p-8 rounded-3xl text-center bg-white border-2 border-blue-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('problem') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '600ms'}}>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:rotate-12 transition-transform duration-300">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">Time Pressure</h3>
              <p className="text-gray-600 leading-relaxed">
                Companies have only <span className="text-blue-600 font-semibold">30 days</span> to respond to citizen data requests or face regulatory action
              </p>
            </div>
          </div>
          
          <div className={`text-center mt-16 transform transition-all duration-1000 ${visibleSections.has('problem') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '800ms'}}>
            <div className="premium-card px-8 py-6 rounded-2xl inline-block bg-white border-2 border-blue-200">
              <p className="text-gray-600 mb-2">
                <span className="text-4xl font-black text-red-600">85%</span> of Nigerian businesses are non-compliant
              </p>
              <p className="text-sm text-gray-500">Source: NITDA Compliance Report 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" ref={el => sectionRefs.current.solution = el} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${visibleSections.has('solution') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Our <span className="text-blue-600">Solution</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              AI-powered compliance automation that makes <span className="text-blue-600 font-semibold">NDPR compliance simple and affordable</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`premium-card p-8 rounded-3xl text-center bg-blue-50 border-2 border-blue-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('solution') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '200ms'}}>
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">AI-Powered Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI scans your privacy policies and identifies <span className="text-blue-600 font-semibold">compliance gaps in seconds</span>, not weeks
              </p>
            </div>
            
            <div className={`premium-card p-8 rounded-3xl text-center bg-blue-50 border-2 border-blue-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('solution') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '400ms'}}>
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse" style={{animationDelay: '200ms'}}>
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">Step-by-Step Guidance</h3>
              <p className="text-gray-600 leading-relaxed">
                Get <span className="text-blue-600 font-semibold">actionable remediation steps</span> with templates and examples to fix issues quickly
              </p>
            </div>
            
            <div className={`premium-card p-8 rounded-3xl text-center bg-blue-50 border-2 border-blue-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('solution') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '600ms'}}>
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse" style={{animationDelay: '400ms'}}>
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4">Compliance Certificate</h3>
              <p className="text-gray-600 leading-relaxed">
                Earn <span className="text-blue-600 font-semibold">verified compliance certificates</span> and website badges to build customer trust
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section id="companies" ref={el => sectionRefs.current.companies = el} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${visibleSections.has('companies') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Trusted by <span className="text-blue-600">Leading Companies</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Join Nigeria's top companies in achieving <span className="text-blue-600 font-semibold">NDPR compliance</span>
            </p>
          </div>
          
          <div className={`grid grid-cols-2 md:grid-cols-5 gap-8 items-center transform transition-all duration-1000 ${visibleSections.has('companies') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '300ms'}}>
            {[
              { logo: FlutterwaveLogo, name: 'Flutterwave' },
              { logo: PaystackLogo, name: 'Paystack' },
              { logo: KudaLogo, name: 'Kuda Bank' },
              { logo: InterswitchLogo, name: 'Interswitch' },
              { logo: GTBankLogo, name: 'GTBank' }
            ].map((company, index) => (
              <div key={company.name} className={`bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${visibleSections.has('companies') ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: `${400 + index * 100}ms`}}>
                <img src={company.logo} alt={`${company.name} logo`} className="h-12 w-auto mx-auto object-contain" />
              </div>
            ))}
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
              to="/login"
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
                <img src={trustBridgeLogo} alt="TrustBridge Logo" className="h-12 w-auto" />
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