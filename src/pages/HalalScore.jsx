import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Award, AlertTriangle, CheckCircle, XCircle, BookOpen, Download, Share2, RefreshCw, Eye, DollarSign, Shield, Heart, TrendingUp } from 'lucide-react';

const HalalScore = () => {
  const location = useLocation();
  const [score, setScore] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);
  
  // Mock analysis results - in real app, this would come from AI analysis
  const analysisResult = {
    overallScore: 85,
    productName: 'Islamic Investment Fund',
    productType: 'Investment Product',
    analysisDate: new Date().toLocaleDateString(),
    
    categories: [
      {
        name: 'Riba (Interest) Check',
        score: 95,
        status: 'compliant',
        details: 'No interest-based transactions detected',
        quranicRef: 'Quran 2:275 - Allah has permitted trade and forbidden riba'
      },
      {
        name: 'Gharar (Uncertainty) Assessment',
        score: 80,
        status: 'minor_issues',
        details: 'Some uncertainty in profit distribution terms',
        quranicRef: 'Hadith: Prophet (PBUH) forbade gharar transactions'
      },
      {
        name: 'Haram Sectors Screening',
        score: 90,
        status: 'compliant',
        details: 'No investment in prohibited industries',
        quranicRef: 'Quran 5:90 - Intoxicants and gambling are abominations'
      },
      {
        name: 'Shariah Governance',
        score: 75,
        status: 'needs_improvement',
        details: 'Shariah board present but limited oversight',
        quranicRef: 'Quran 4:59 - Obey Allah, the Messenger, and those in authority'
      }
    ],
    
    issues: [
      {
        severity: 'medium',
        title: 'Profit Distribution Clarity',
        description: 'The profit-sharing mechanism needs clearer documentation to avoid gharar',
        solution: 'Request detailed profit distribution methodology from the provider'
      }
    ],
    
    positives: [
      'No interest-based components',
      'Shariah-compliant investment sectors',
      'Regular purification of mixed income',
      'Transparent fee structure'
    ],
    
    alternatives: [
      {
        name: 'Amana Mutual Funds',
        score: 92,
        type: 'Investment Fund'
      },
      {
        name: 'Wahed Invest',
        score: 88,
        type: 'Robo-Advisor'
      },
      {
        name: 'Halal ETFs',
        score: 90,
        type: 'Exchange Traded Fund'
      }
    ]
  };

  useEffect(() => {
    // Animate score counter
    const targetScore = analysisResult.overallScore;
    const duration = 2000;
    const steps = 60;
    const increment = targetScore / steps;
    
    let currentScore = 0;
    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= targetScore) {
        setAnimatedScore(targetScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(currentScore));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'bg-green-100 border-green-300';
    if (score >= 60) return 'bg-yellow-100 border-yellow-300';
    return 'bg-red-100 border-red-300';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'minor_issues':
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
      case 'needs_improvement':
        return <XCircle className="h-6 w-6 text-red-600" />;
      default:
        return <AlertTriangle className="h-6 w-6 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center">
              <Award className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900">Halal Score</h1>
              <p className="text-gray-600 font-semibold">Shariah Compliance Analysis Results</p>
            </div>
          </div>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full border-8 ${getScoreBackground(analysisResult.overallScore)} mb-6`}>
              <span className={`text-4xl font-black ${getScoreColor(analysisResult.overallScore)}`}>
                {animatedScore}
              </span>
            </div>
            
            <h2 className="text-3xl font-black text-gray-900 mb-2">{analysisResult.productName}</h2>
            <p className="text-lg text-gray-600 mb-4">{analysisResult.productType}</p>
            
            <div className={`inline-block px-6 py-3 rounded-2xl font-bold text-lg ${
              analysisResult.overallScore >= 80 
                ? 'bg-green-100 text-green-800' 
                : analysisResult.overallScore >= 60 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {analysisResult.overallScore >= 80 ? 'Shariah Compliant' : 
               analysisResult.overallScore >= 60 ? 'Needs Review' : 'Not Compliant'}
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              Analysis completed on {analysisResult.analysisDate}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Detailed Analysis */}
          <div className="space-y-6">
            {/* Category Scores */}
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-600" />
                Detailed Analysis
              </h2>
              
              <div className="space-y-6">
                {analysisResult.categories.map((category, index) => (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(category.status)}
                        <h3 className="font-bold text-gray-900">{category.name}</h3>
                      </div>
                      <span className={`font-black text-lg ${getScoreColor(category.score)}`}>
                        {category.score}%
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{category.details}</p>
                    
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="flex items-start gap-2">
                        <BookOpen className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-blue-800 mb-1">Islamic Reference</h4>
                          <p className="text-sm text-blue-700">{category.quranicRef}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Issues Found */}
            {analysisResult.issues.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  Issues to Address
                </h2>
                
                <div className="space-y-4">
                  {analysisResult.issues.map((issue, index) => (
                    <div key={index} className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-bold text-yellow-800 mb-2">{issue.title}</h3>
                          <p className="text-yellow-700 mb-3">{issue.description}</p>
                          <div className="bg-white rounded-xl p-3">
                            <h4 className="font-semibold text-gray-800 mb-1">Recommended Action:</h4>
                            <p className="text-gray-700 text-sm">{issue.solution}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Positive Aspects */}
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                Positive Aspects
              </h2>
              
              <div className="space-y-3">
                {analysisResult.positives.map((positive, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-green-800 font-semibold">{positive}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions & Alternatives */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Actions</h2>
              
              <div className="space-y-4">
                <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-colors">
                  <Download className="h-5 w-5" />
                  Download Certificate
                </button>
                
                <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors">
                  <Share2 className="h-5 w-5" />
                  Share Results
                </button>
                
                <Link 
                  to="/scholar-network"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 transition-colors"
                >
                  <BookOpen className="h-5 w-5" />
                  Consult Scholar
                </Link>
                
                <Link 
                  to="/product-analysis"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gray-600 text-white rounded-2xl font-bold hover:bg-gray-700 transition-colors"
                >
                  <RefreshCw className="h-5 w-5" />
                  Analyze Another Product
                </Link>
              </div>
            </div>

            {/* Halal Alternatives */}
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <Heart className="h-6 w-6 text-red-500" />
                Halal Alternatives
              </h2>
              
              <div className="space-y-4">
                {analysisResult.alternatives.map((alternative, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-2xl hover:bg-green-50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{alternative.name}</h3>
                      <span className={`font-black ${getScoreColor(alternative.score)}`}>
                        {alternative.score}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{alternative.type}</p>
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors">
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/halal-alternatives"
                className="block w-full text-center px-6 py-3 bg-green-100 text-green-700 rounded-2xl font-bold hover:bg-green-200 transition-colors mt-4"
              >
                View All Alternatives
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Analysis Summary</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-black text-blue-600">4</div>
                  <div className="text-sm text-blue-700 font-semibold">Categories Checked</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-black text-green-600">3</div>
                  <div className="text-sm text-green-700 font-semibold">Compliant Areas</div>
                </div>
                
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-black text-yellow-600">1</div>
                  <div className="text-sm text-yellow-700 font-semibold">Issues Found</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-black text-purple-600">5</div>
                  <div className="text-sm text-purple-700 font-semibold">References Used</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-800 mb-2">Important Disclaimer</h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                This analysis is based on available information and Islamic finance principles. For complex financial decisions or if you have specific concerns, please consult with qualified Islamic scholars through our Scholar Network. Individual circumstances may affect the applicability of this analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalalScore;