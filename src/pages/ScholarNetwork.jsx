import { useState } from 'react';
import { BookOpen, Star, Calendar, MessageCircle, Award, Clock } from 'lucide-react';

const ScholarNetwork = () => {
  const [selectedScholar, setSelectedScholar] = useState(null);

  const scholars = [
    {
      id: 1,
      name: 'Dr. Ahmed Al-Rashid',
      title: 'Senior Islamic Finance Scholar',
      specialization: 'Banking & Investment',
      rating: 4.9,
      consultations: 1250,
      languages: ['English', 'Arabic'],
      price: '$99/hour',
      image: '/api/placeholder/100/100'
    },
    {
      id: 2,
      name: 'Sheikh Muhammad Hassan',
      title: 'Certified Shariah Advisor',
      specialization: 'Fintech & Crypto',
      rating: 4.8,
      consultations: 890,
      languages: ['English', 'Urdu'],
      price: '$79/hour',
      image: '/api/placeholder/100/100'
    },
    {
      id: 3,
      name: 'Dr. Fatima Al-Zahra',
      title: 'Islamic Economics Expert',
      specialization: 'Insurance & Takaful',
      rating: 4.9,
      consultations: 1100,
      languages: ['English', 'Arabic', 'French'],
      price: '$89/hour',
      image: '/api/placeholder/100/100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900">Scholar Network</h1>
              <p className="text-gray-600 font-semibold">Consult with Certified Islamic Finance Experts</p>
            </div>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Get personalized guidance from qualified Shariah scholars and Islamic finance experts for complex financial decisions.
          </p>
        </div>

        {/* Scholars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {scholars.map((scholar) => (
            <div key={scholar.id} className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-1">{scholar.name}</h3>
                <p className="text-green-600 font-semibold mb-2">{scholar.title}</p>
                <p className="text-gray-600 text-sm">{scholar.specialization}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{scholar.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">{scholar.consultations} consultations</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-600">{scholar.languages.join(', ')}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">Available today</span>
                  </div>
                  <span className="font-bold text-green-600">{scholar.price}</span>
                </div>
              </div>

              <button 
                onClick={() => setSelectedScholar(scholar)}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-colors"
              >
                Book Consultation
              </button>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Why Consult Our Scholars?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Certified Experts</h3>
              <p className="text-gray-600 text-sm">All scholars are certified by recognized Islamic institutions</p>
            </div>
            
            <div className="text-center">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600 text-sm">Book consultations at your convenience, 24/7 availability</p>
            </div>
            
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Multiple Languages</h3>
              <p className="text-gray-600 text-sm">Consultations available in Arabic, English, Urdu, and more</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarNetwork;