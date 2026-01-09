import { useState, useRef } from 'react';
import { Upload, FileText, Link as LinkIcon, Zap, AlertTriangle, CheckCircle, BookOpen, Shield, DollarSign, Eye, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductAnalysis = () => {
  const [analysisMethod, setAnalysisMethod] = useState('upload'); // 'upload', 'url', 'text'
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [textInput, setTextInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      navigate('/halal-score', { 
        state: { 
          analysisData: {
            method: analysisMethod,
            fileName: file?.name,
            url: url,
            textPreview: textInput.substring(0, 100)
          }
        }
      });
    }, 3000);
  };

  const canAnalyze = () => {
    switch (analysisMethod) {
      case 'upload':
        return file !== null;
      case 'url':
        return url.trim() !== '';
      case 'text':
        return textInput.trim() !== '';
      default:
        return false;
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="h-10 w-10 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Analyzing for Shariah Compliance</h2>
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700">Scanning for riba (interest)...</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <span className="text-gray-700">Checking for gharar (uncertainty)...</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <span className="text-gray-700">Validating against Islamic principles...</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
              <span className="text-gray-700">Consulting scholarly references...</span>
            </div>
          </div>
          <div className="mt-6 bg-green-50 rounded-xl p-4">
            <p className="text-sm text-green-700">
              <BookOpen className="h-4 w-4 inline mr-2" />
              Analysis backed by Quran, Hadith, and contemporary fatwas
            </p>
          </div>
        </div>
      </div>
    );
  }

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
              <h1 className="text-4xl font-black text-gray-900">Product Analysis</h1>
              <p className="text-gray-600 font-semibold">AI-Powered Shariah Compliance Check</p>
            </div>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Upload financial documents, paste product links, or describe any financial product to get instant Shariah compliance analysis.
          </p>
        </div>

        {/* Analysis Method Selection */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Choose Analysis Method</h2>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => setAnalysisMethod('upload')}
              className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                analysisMethod === 'upload'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <Upload className={`h-8 w-8 mx-auto mb-3 ${analysisMethod === 'upload' ? 'text-green-600' : 'text-gray-400'}`} />
              <h3 className="font-bold text-gray-900 mb-2">Upload Document</h3>
              <p className="text-sm text-gray-600">PDF, Word, or image files</p>
            </button>

            <button
              onClick={() => setAnalysisMethod('url')}
              className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                analysisMethod === 'url'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <LinkIcon className={`h-8 w-8 mx-auto mb-3 ${analysisMethod === 'url' ? 'text-green-600' : 'text-gray-400'}`} />
              <h3 className="font-bold text-gray-900 mb-2">Product URL</h3>
              <p className="text-sm text-gray-600">Website or app link</p>
            </button>

            <button
              onClick={() => setAnalysisMethod('text')}
              className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                analysisMethod === 'text'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <FileText className={`h-8 w-8 mx-auto mb-3 ${analysisMethod === 'text' ? 'text-green-600' : 'text-gray-400'}`} />
              <h3 className="font-bold text-gray-900 mb-2">Describe Product</h3>
              <p className="text-sm text-gray-600">Type or paste text</p>
            </button>
          </div>

          {/* Upload Method */}
          {analysisMethod === 'upload' && (
            <div>
              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                  dragActive
                    ? 'border-green-500 bg-green-50'
                    : file
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-300 hover:border-green-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="space-y-4">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{file.name}</h3>
                      <p className="text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button
                      onClick={() => setFile(null)}
                      className="text-red-600 hover:text-red-700 font-semibold"
                    >
                      Remove File
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Drop your file here</h3>
                      <p className="text-gray-600 mb-4">or click to browse</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                      >
                        Choose File
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Supports PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* URL Method */}
          {analysisMethod === 'url' && (
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-4">Product URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/financial-product"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none text-lg"
              />
              <p className="text-sm text-gray-600 mt-3">
                Enter the URL of any financial product, app, or service you want to check
              </p>
            </div>
          )}

          {/* Text Method */}
          {analysisMethod === 'text' && (
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-4">Describe the Financial Product</label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Describe the financial product, its terms, interest rates, fees, or any other details you want to check for Shariah compliance..."
                rows={8}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none text-lg resize-none"
              />
              <p className="text-sm text-gray-600 mt-3">
                Include details about interest rates, fees, terms, conditions, or any aspect you're unsure about
              </p>
            </div>
          )}
        </div>

        {/* Common Financial Products */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Common Products We Analyze</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: DollarSign, name: 'BNPL Apps', desc: 'Buy Now Pay Later' },
              { icon: TrendingUp, name: 'Investment Apps', desc: 'Stocks & Crypto' },
              { icon: Shield, name: 'Insurance', desc: 'Life & Health' },
              { icon: Eye, name: 'Banking Products', desc: 'Loans & Cards' }
            ].map((product, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl text-center">
                <product.icon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-bold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Button */}
        <div className="text-center">
          <button
            onClick={handleAnalysis}
            disabled={!canAnalyze()}
            className={`px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-200 ${
              canAnalyze()
                ? 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Zap className="h-6 w-6 inline mr-3" />
            Analyze for Shariah Compliance
          </button>
          
          {canAnalyze() && (
            <p className="text-sm text-gray-600 mt-4">
              Analysis typically takes 10-30 seconds
            </p>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-800 mb-2">Important Disclaimer</h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                This analysis is for educational purposes and should not replace consultation with qualified Islamic scholars. 
                For complex financial decisions, please consult with certified Shariah advisors through our Scholar Network.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalysis;