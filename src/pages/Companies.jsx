import { Link } from 'react-router-dom';
import { Building2, MapPin, Star, Shield, TrendingUp, Users, Award, CheckCircle } from 'lucide-react';

const Companies = () => {
  const companies = [
    {
      id: 1,
      name: 'Jumia Nigeria',
      description: 'Africa\'s leading e-commerce platform connecting millions of consumers and sellers',
      industry: 'E-commerce',
      location: 'Lagos, Nigeria',
      complianceScore: 92,
      logo: 'https://via.placeholder.com/80x80/FF6B35/FFFFFF?text=J',
      employees: '5,000+',
      founded: '2012',
      verified: true,
      bgColor: 'from-orange-50 to-orange-100'
    },
    {
      id: 2,
      name: 'Flutterwave',
      description: 'Leading fintech company providing payment infrastructure for global merchants',
      industry: 'Fintech',
      location: 'Lagos, Nigeria',
      complianceScore: 95,
      logo: 'https://via.placeholder.com/80x80/F5A623/FFFFFF?text=F',
      employees: '1,000+',
      founded: '2016',
      verified: true,
      bgColor: 'from-yellow-50 to-yellow-100'
    },
    {
      id: 3,
      name: 'Paystack',
      description: 'Modern online and offline payments for Africa, now part of Stripe',
      industry: 'Fintech',
      location: 'Lagos, Nigeria',
      complianceScore: 94,
      logo: 'https://via.placeholder.com/80x80/00C9FF/FFFFFF?text=P',
      employees: '500+',
      founded: '2015',
      verified: true,
      bgColor: 'from-cyan-50 to-cyan-100'
    },
    {
      id: 4,
      name: 'Kuda Bank',
      description: 'Digital-first bank built for Africans, offering seamless banking experience',
      industry: 'Banking',
      location: 'Lagos, Nigeria',
      complianceScore: 89,
      logo: 'https://via.placeholder.com/80x80/40E0D0/FFFFFF?text=K',
      employees: '300+',
      founded: '2019',
      verified: true,
      bgColor: 'from-teal-50 to-teal-100'
    },
    {
      id: 5,
      name: 'Interswitch',
      description: 'Integrated digital payments and commerce company across Africa',
      industry: 'Fintech',
      location: 'Lagos, Nigeria',
      complianceScore: 87,
      logo: 'https://via.placeholder.com/80x80/8B5CF6/FFFFFF?text=I',
      employees: '2,000+',
      founded: '2002',
      verified: true,
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      id: 6,
      name: 'GTBank',
      description: 'Leading financial institution providing innovative banking solutions',
      industry: 'Banking',
      location: 'Lagos, Nigeria',
      complianceScore: 91,
      logo: 'https://via.placeholder.com/80x80/EF4444/FFFFFF?text=GT',
      employees: '10,000+',
      founded: '1990',
      verified: true,
      bgColor: 'from-red-50 to-red-100'
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-emerald-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-amber-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 ml-64">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <Shield className="h-4 w-4 mr-2" />
              NDPR Compliant Companies
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Trusted <span className="text-yellow-300">Companies</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Discover Nigerian companies committed to data protection and transparency. 
              Connect with businesses that respect your privacy rights.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register-company"
                className="inline-flex items-center px-8 py-4 bg-yellow-400 text-gray-900 rounded-2xl font-bold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Building2 className="h-5 w-5 mr-2" />
                Register Your Company
              </Link>
              <Link 
                to="/connect-company"
                className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-semibold hover:bg-white/30 transition-all duration-200 border border-white/30"
              >
                <Users className="h-5 w-5 mr-2" />
                Connect to Company
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-black text-blue-600 mb-2">1,247</div>
            <div className="text-gray-600 font-medium">Registered Companies</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-emerald-600 mb-2">89%</div>
            <div className="text-gray-600 font-medium">Average Compliance</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-purple-600 mb-2">2.4M</div>
            <div className="text-gray-600 font-medium">Data Connections</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600 font-medium">Monitoring</div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="premium-card rounded-3xl p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search companies by name, industry, or location..."
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white transition-all duration-200 text-lg"
                />
                <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              </div>
            </div>
            <div className="flex gap-3">
              <select className="px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 font-medium">
                <option>All Industries</option>
                <option>Fintech</option>
                <option>Banking</option>
                <option>E-commerce</option>
              </select>
              <select className="px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 font-medium">
                <option>All Locations</option>
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Port Harcourt</option>
              </select>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <div key={company.id} className="group premium-card rounded-3xl overflow-hidden">
              {/* Company Header with Gradient */}
              <div className={`bg-gradient-to-br ${company.bgColor} p-8 relative`}>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg bg-white p-2">
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {company.verified && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-700">Verified</span>
                      </div>
                    )}
                  </div>
                  <div className={`px-4 py-2 ${getScoreBg(company.complianceScore)} rounded-2xl`}>
                    <div className={`text-2xl font-black ${getScoreColor(company.complianceScore)}`}>
                      {company.complianceScore}%
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 mb-2">{company.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {company.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {company.employees}
                  </div>
                </div>
              </div>

              {/* Company Details */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                    {company.industry}
                  </span>
                  <span className="text-sm text-gray-500">Founded {company.founded}</span>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-6">{company.description}</p>
                
                {/* Compliance Indicators */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <Shield className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold text-gray-600">NDPR Ready</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <Award className="h-6 w-6 text-emerald-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold text-gray-600">Certified</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold text-gray-600">Monitored</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link 
                    to={`/company/${company.id}`}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white text-center rounded-2xl font-bold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
                  >
                    View Details
                  </Link>
                  <button className="px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all duration-200">
                    <Star className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="premium-card rounded-3xl p-12 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 floating">
                <Building2 className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Ready to Join the Platform?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Register your company on TrustBridge and showcase your commitment to data protection and transparency.
              </p>
              <Link 
                to="/register-company"
                className="inline-flex items-center px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Building2 className="h-6 w-6 mr-3" />
                Register Your Company
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;