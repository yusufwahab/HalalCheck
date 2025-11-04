import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, Shield, Eye, Download } from 'lucide-react';

const PolicyUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setIsAnalyzing(true);
      // Simulate analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 3000);
    }
  };

  const complianceIssues = [
    { type: 'critical', title: 'Missing Data Subject Rights', description: 'Policy lacks clear information about citizen rights under NDPR' },
    { type: 'warning', title: 'Vague Data Retention', description: 'Data retention periods are not clearly specified' },
    { type: 'info', title: 'Contact Information', description: 'Consider adding dedicated privacy contact details' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900 mb-4">
              Policy <span className="text-blue-600">Analysis</span>
            </h1>
            <p className="text-xl text-gray-600">Upload your privacy policy for AI-powered NDPR compliance analysis</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-2">
              <div className="premium-card rounded-3xl p-10">
                {!uploadedFile ? (
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                      <Upload className="h-12 w-12 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">
                      Upload Privacy <span className="text-blue-600">Policy</span>
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                      Drag and drop your privacy policy document or click to browse
                    </p>
                    
                    <div className="border-2 border-dashed border-blue-300 rounded-3xl p-12 mb-8 bg-blue-50">
                      <input
                        type="file"
                        id="policy-upload"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                      />
                      <label
                        htmlFor="policy-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <FileText className="h-16 w-16 text-blue-600 mb-4" />
                        <span className="text-xl font-bold text-blue-600 mb-2">Choose File</span>
                        <span className="text-gray-500">PDF, DOC, DOCX, TXT up to 10MB</span>
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* File Info */}
                    <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-2xl border border-blue-200 mb-8">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-black text-gray-900 text-lg">{uploadedFile.name}</h3>
                        <p className="text-gray-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      {analysisComplete && (
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      )}
                    </div>

                    {/* Analysis Progress */}
                    {isAnalyzing && (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                          <Shield className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-4">Analyzing Policy...</h3>
                        <p className="text-gray-600 mb-6">Our AI is reviewing your policy against NDPR requirements</p>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-blue-600 h-3 rounded-full animate-pulse" style={{width: '60%'}}></div>
                        </div>
                      </div>
                    )}

                    {/* Analysis Results */}
                    {analysisComplete && (
                      <div>
                        <div className="text-center mb-8">
                          <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                          </div>
                          <h3 className="text-3xl font-black text-gray-900 mb-4">
                            Analysis <span className="text-blue-600">Complete</span>
                          </h3>
                          <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="text-center">
                              <div className="text-4xl font-black text-blue-600">78%</div>
                              <div className="text-sm font-semibold text-gray-600">Compliance Score</div>
                            </div>
                          </div>
                        </div>

                        {/* Issues Found */}
                        <div className="space-y-4 mb-8">
                          <h4 className="text-xl font-black text-gray-900">Issues Found</h4>
                          {complianceIssues.map((issue, index) => (
                            <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-200">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                issue.type === 'critical' ? 'bg-red-100' :
                                issue.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                              }`}>
                                <AlertTriangle className={`h-4 w-4 ${
                                  issue.type === 'critical' ? 'text-red-600' :
                                  issue.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                                }`} />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-bold text-gray-900 mb-1">{issue.title}</h5>
                                <p className="text-gray-600 text-sm">{issue.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                          <button className="flex-1 flex items-center justify-center gap-3 p-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all duration-200">
                            <Eye className="h-5 w-5" />
                            View Detailed Report
                          </button>
                          <button className="flex items-center justify-center gap-3 p-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all duration-200">
                            <Download className="h-5 w-5" />
                            Download Report
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Analysis Features */}
              <div className="premium-card rounded-3xl p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-6">
                  AI <span className="text-blue-600">Analysis</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">NDPR Compliance</h4>
                      <p className="text-sm text-gray-600">Check against all NDPR requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Data Subject Rights</h4>
                      <p className="text-sm text-gray-600">Verify citizen rights coverage</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Legal Language</h4>
                      <p className="text-sm text-gray-600">Ensure clear, understandable terms</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supported Formats */}
              <div className="premium-card rounded-3xl p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
                <h3 className="text-xl font-black text-gray-900 mb-4">
                  📄 Supported <span className="text-blue-600">Formats</span>
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm font-semibold text-gray-700">PDF Documents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm font-semibold text-gray-700">Word Documents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm font-semibold text-gray-700">Text Files</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default PolicyUpload;