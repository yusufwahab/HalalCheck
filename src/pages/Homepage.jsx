import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Play, Star, CheckCircle, Users, Building2, TrendingUp, Award, AlertTriangle, Clock, Zap, Target, Globe, Lock, FileCheck, BarChart3, BookOpen, Settings, Bell, GraduationCap, Eye, HeadphonesIcon, Calculator, Heart, DollarSign } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import trustBridgeLogo from "../assets/TrustBridgeLogo.png";
import AuthBg from '../assets/Trustbridge_authpages_img.png';

// Import company logos (keeping same for now, can be replaced with Islamic finance companies)
import FlutterwaveLogo from '../assets/Flutterwave_logo.png';
import PaystackLogo from '../assets/Paystack_logo.png';
import KudaLogo from '../assets/Kuda_logo.png';
import InterswitchLogo from '../assets/interswitch_logo.jpg';
import GTBankLogo from '../assets/Gtbank_logo.png';

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ products: 0, halalScore: 0, muslims: 0 });
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    setIsVisible(true);
    
    const statsTimer = setTimeout(() => {
      let products = 0, halalScore = 0, muslims = 0;
      const interval = setInterval(() => {
        products = Math.min(products + 50, 2500);
        halalScore = Math.min(halalScore + 2, 95);
        muslims = Math.min(muslims + 100000, 1800000000);
        
        setAnimatedStats({ products, halalScore, muslims });
        
        if (products === 2500 && halalScore === 95 && muslims === 1800000000) {
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



  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="glass-effect fixed w-full top-0 z-50 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center">
                <Star className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
              </div>
              <div>
                <span className="text-lg sm:text-2xl lg:text-3xl font-black text-green-600">HalalCheck</span>
                <div className="text-xs text-gray-500 font-semibold -mt-1 hidden sm:block">SHARIAH COMPLIANCE</div>
              </div>
            </div>
            <nav className="flex items-center space-x-2 sm:space-x-4 lg:space-x-8">
              <a href="#features" className="text-gray-600 hover:text-green-600 font-semibold transition-colors text-sm sm:text-base hidden md:inline">Features</a>
              <a href="#companies" className="text-gray-600 hover:text-green-600 font-semibold transition-colors text-sm sm:text-base hidden md:inline">Partners</a>
              <Link to="/dashboard" className="text-gray-600 hover:text-green-600 font-semibold transition-colors text-sm sm:text-base hidden sm:inline">Dashboard</Link>
              <Link to="/dashboard" className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-xl sm:rounded-2xl font-bold hover:bg-green-700 transition-all text-sm sm:text-base">Get Started</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${AuthBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 sm:mb-8 leading-tight">
              Is Your Financial<br />
              <span className="text-white">Product</span><br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-emerald-300 font-light">Halal?</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
              HalalCheck <span className="font-semibold text-emerald-400">empowers</span> 1.8 billion Muslims with <span className="font-semibold text-emerald-400">instant</span> Shariah compliance analysis. Get AI-powered rulings backed by <span className="font-semibold text-emerald-400">Quran</span>, Hadith, and contemporary fatwas in <span className="font-semibold text-emerald-400">seconds</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 px-4">
              <Link to="/dashboard" className="inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-green-600 text-white text-base sm:text-lg lg:text-xl rounded-xl sm:rounded-2xl font-bold hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Check Product Now
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 ml-2 sm:ml-3 text-white" />
              </Link>
              <button 
                onClick={() => window.open('https://youtu.be/lstCbWgqU8k', '_blank')}
                className="inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-white border-2 border-green-600 text-green-600 text-base sm:text-lg lg:text-xl rounded-xl sm:rounded-2xl font-bold hover:bg-green-50 transition-all duration-200"
              >
                <Play className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 sm:mr-3 text-green-600" />
                Watch Demo
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 bg-green-600 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-bold transform hover:scale-110">
                      <Heart className="h-4 w-4" />
                    </div>
                  ))}
                </div>
                <Star className="h-6 w-6 text-green-600 fill-current" />
                <span className="font-semibold">Trusted by <span className="text-emerald-400 animate-pulse">{(animatedStats.muslims / 1000000).toFixed(0)}M+</span> Muslims worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="problem" ref={el => sectionRefs.current.problem = el} className="py-12 sm:py-16 lg:py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${visibleSections.has('problem') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
              The <span className="text-green-600">Problem</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-4">
              1.8 billion Muslims face a daily dilemma: Is this financial product halal?
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center bg-white border-2 border-green-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('problem') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '200ms'}}>
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">False Claims</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                BNPL apps claim <span className="text-green-600 font-semibold">"Shariah-compliant"</span> without proof. Crypto tokens lack credible Islamic rulings. Muslims need trustworthy verification.
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center bg-white border-2 border-green-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('problem') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '400ms'}}>
              <DollarSign className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Hidden Riba</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Loan agreements hide <span className="text-green-600 font-semibold">riba (interest)</span> in complex legal terms. Muslims unknowingly earn haram income or avoid modern finance entirely.
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center bg-white border-2 border-green-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('problem') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '600ms'}}>
              <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Expensive Consultations</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Manual scholar consultations cost <span className="text-green-600 font-semibold">$500+</span> and take weeks. Generic "Islamic banking" often lacks transparency and real-time verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" ref={el => sectionRefs.current.solution = el} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${visibleSections.has('solution') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Our <span className="text-green-600">Solution</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              HalalCheck addresses these challenges with innovative solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center bg-green-50 border-2 border-green-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('solution') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '200ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Instant AI Analysis</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                <span className="text-green-600 font-semibold">HalalCheck AI Analysis</span> scans financial products in seconds, identifying riba, gharar, and haram elements with scholarly backing.
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center bg-green-50 border-2 border-green-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('solution') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '400ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Scholarly References</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                <span className="text-green-600 font-semibold">Every Decision Backed</span> by Quran, Hadith, and contemporary fatwas from certified Islamic scholars and institutions.
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center bg-green-50 border-2 border-green-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('solution') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '600ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Halal Alternatives</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                <span className="text-green-600 font-semibold">HalalCheck Recommendations</span> suggest compliant alternatives when products fail, helping Muslims find halal financial solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={el => sectionRefs.current.features = el} className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${visibleSections.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
              Comprehensive <span className="text-green-600">Features</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Automate <span className="text-green-600 font-semibold">Shariah compliance</span> with AI-powered analysis. 
              Empower <span className="text-green-600 font-semibold">Muslims</span> to make confident halal financial decisions with transparency and trust.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '100ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Shariah Compliance Toolkit</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Complete toolkit with <span className="text-green-600 font-semibold">ready-to-use analysis</span> and comprehensive guides for Islamic finance compliance
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '200ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Product Analysis & Scoring</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <span className="text-green-600 font-semibold">Analyze and score</span> financial products with AI-powered Shariah compliance assessment and detailed reports
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '300ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Zakat Calculator</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <span className="text-green-600 font-semibold">Automated zakat calculation</span> with live gold/silver prices and charity recommendations
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '400ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Scholar Network</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <span className="text-green-600 font-semibold">Expert consultations</span> with certified Islamic scholars for complex financial decisions
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '500ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Halal Alternatives</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <span className="text-green-600 font-semibold">Discover compliant products</span> and get recommendations for Shariah-approved financial alternatives
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '600ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Income Purification</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <span className="text-green-600 font-semibold">Cleanse mixed income</span> by calculating exact charity amounts for haram elements in your earnings
              </p>
            </div>
          </div>
          
          <div className={`text-center mt-16 transform transition-all duration-1000 ${visibleSections.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '700ms'}}>
            <Link 
              to="/dashboard" 
              className="inline-flex items-center px-10 py-5 bg-green-600 text-white text-xl rounded-2xl font-bold hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Explore All Features
              <ArrowRight className="h-6 w-6 ml-3 text-white" />
            </Link>
          </div>
        </div>
      </section>



      {/* Companies Section */}
      <section id="companies" ref={el => sectionRefs.current.companies = el} className="py-12 sm:py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${visibleSections.has('companies') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
              Trusted by <span className="text-green-600">Leading Companies</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-4">
              Join global companies in achieving <span className="text-green-600 font-semibold">Shariah compliance</span>
            </p>
          </div>
          
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 items-center transform transition-all duration-1000 ${visibleSections.has('companies') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '300ms'}}>
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
      <section className="py-12 sm:py-16 lg:py-24 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-2xl text-green-100 mb-10 leading-relaxed">
            Join millions of Muslims ensuring Shariah compliance with HalalCheck
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/dashboard"
              className="inline-flex items-center px-10 py-5 bg-white text-green-600 rounded-2xl font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
            >
              <Building2 className="h-6 w-6 mr-3 text-green-600" />
              Start Free Analysis
            </Link>
            <Link 
              to="/companies"
              className="inline-flex items-center px-10 py-5 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-xl hover:bg-white hover:text-green-600 transition-all duration-200"
            >
              <TrendingUp className="h-6 w-6 mr-3" />
              View Partners
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
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div>
                  <span className="text-3xl font-black text-white">HalalCheck</span>
                  <div className="text-xs text-gray-400 font-semibold -mt-1">SHARIAH COMPLIANCE</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Making <span className="text-green-400 font-semibold">Islamic finance compliance</span> simple, transparent, and accessible for everyone.
              </p>
            </div>
            
            <div>
              <h3 className="font-black text-white mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/zakat-calculator" className="text-gray-400 hover:text-green-400 transition-colors">Zakat Calculator</Link></li>
                <li><Link to="/product-analysis" className="text-gray-400 hover:text-green-400 transition-colors">Product Analysis</Link></li>
                <li><Link to="/scholar-network" className="text-gray-400 hover:text-green-400 transition-colors">Scholar Network</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-black text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li className="text-gray-400 hover:text-green-400 cursor-pointer transition-colors">About Us</li>
                <li className="text-gray-400 hover:text-green-400 cursor-pointer transition-colors">Contact</li>
                <li className="text-gray-400 hover:text-green-400 cursor-pointer transition-colors">Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400">
                © 2024 <span className="text-green-400 font-semibold">HalalCheck</span>. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;