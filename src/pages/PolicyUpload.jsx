import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, Shield, Eye, Download, ArrowRight, Volume2, VolumeX, Mic, Square, Trash2, Play, Search, FileCheck, Brain, Award, Clock } from 'lucide-react';
import APIService from '../services/api';
import MockAuthService from '../services/mockAuth';

const AnalysisProgress = ({ onTimeout, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  const steps = [
    { icon: Search, title: 'Scanning Document', description: 'Reading and parsing your privacy policy' },
    { icon: FileCheck, title: 'NDPR Compliance Check', description: 'Analyzing against Nigerian data protection requirements' },
    { icon: Brain, title: 'AI Analysis', description: 'Identifying gaps and compliance issues' },
    { icon: Award, title: 'Generating Report', description: 'Compiling recommendations and score' }
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 750);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 90) {
          return prev + Math.random() * 5 + 2;
        }
        return prev;
      });
    }, 200);

    const timeInterval = setInterval(() => {
      setTimeElapsed(prev => {
        const newTime = prev + 0.1;
        return newTime;
      });
    }, 100);

    const timeoutCheck = setInterval(() => {
      if (timeElapsed >= 3 && onTimeout) {
        onTimeout();
      }
    }, 100);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearInterval(timeInterval);
      clearInterval(timeoutCheck);
    };
  }, [onTimeout]);

  return (
    <div className="py-8">
      {/* Header with Title/Icon and Cancel Button */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900">
              AI Analysis <span className="text-blue-600">in Progress</span>
            </h3>
            <p className="text-gray-600">NDPR compliance analysis</p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-colors"
        >
          Cancel
        </button>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500 ease-out relative"
          style={{ width: `${Math.min(progress, 95)}%` }}
        >
          <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold text-blue-600">{Math.round(progress)}% Complete</span>
        <span className="text-sm text-gray-500">This may take 30-60 seconds</span>
      </div>
      
      {/* Current Step */}
      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          {React.createElement(steps[currentStep].icon, { 
            className: "h-6 w-6 text-blue-600 animate-bounce" 
          })}
          <div>
            <h4 className="font-bold text-gray-900">{steps[currentStep].title}</h4>
            <p className="text-gray-600 text-sm">{steps[currentStep].description}</p>
          </div>
        </div>
      </div>
      
      {/* Step Indicators */}
      <div className="flex justify-center gap-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
              index <= currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-400'
            }`}>
              {React.createElement(step.icon, { className: "h-6 w-6" })}
            </div>
            <span className={`text-xs font-medium text-center ${
              index <= currentStep ? 'text-blue-600' : 'text-gray-400'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PolicyUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [policyText, setPolicyText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showTimeout, setShowTimeout] = useState(false);
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setIsAnalyzing(true);
      setError(null);
      
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const text = e.target.result;
          const analysisData = {
            company_name: 'User Company',
            company_size: 'medium',
            document_text: text,
            document_type: 'privacy_policy',
            industry: 'Technology',
            processing_scope: 'Standard data processing',
            target_users: 'General Public'
          };
          
          try {
            const result = await APIService.analyzePolicy(analysisData);
            setAnalysisResult(result);
            setIsAnalyzing(false);
            setAnalysisComplete(true);
          } catch (error) {
            console.error('Analysis failed:', error);
            setError('Failed to analyze policy. Please try again.');
            setIsAnalyzing(false);
          }
        };
        reader.readAsText(file);
      } catch (error) {
        console.error('File reading failed:', error);
        setError('Failed to read file. Please try again.');
        setIsAnalyzing(false);
      }
    }
  };

  const handleTextSubmit = async () => {
    if (policyText.trim()) {
      setIsAnalyzing(true);
      setError(null);
      setShowTimeout(false);
      const startTime = Date.now();
      
      try {
        const analysisData = {
          company_name: 'User Company',
          company_size: 'medium',
          document_text: policyText.trim(),
          document_type: 'privacy_policy',
          industry: 'Technology',
          processing_scope: 'Standard data processing',
          target_users: 'General Public'
        };
        const result = await APIService.analyzePolicy(analysisData);
        const processingTime = Date.now() - startTime;
        console.log(`Analysis completed in ${processingTime}ms`);
        setAnalysisResult(result);
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      } catch (error) {
        console.error('Analysis failed:', error);
        setError('Failed to analyze policy. Please try again.');
        setIsAnalyzing(false);
      }
    }
  };

  const handleTimeout = () => {
    setShowTimeout(true);
  };

  const cancelAnalysis = () => {
    setIsAnalyzing(false);
    setShowTimeout(false);
    setError('Analysis cancelled by user.');
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const getAnalysisText = () => {
    if (!analysisResult) return 'Analysis not available.';
    const issues = getComplianceIssues();
    return `Your policy has a compliance score of ${getComplianceScore()}%. We found ${issues.length} issues that need attention. ${issues.map(issue => `${issue.title}: ${issue.description}`).join('. ')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
  };

  const analyzeVoice = async () => {
    if (audioBlob) {
      setIsAnalyzing(true);
      setError(null);
      
      try {
        // For now, use placeholder text since voice-to-text requires additional setup
        const placeholderText = 'Voice recording analyzed. This is a placeholder for voice-to-text conversion.';
        
        const analysisData = {
          company_name: 'User Company',
          company_size: 'medium',
          document_text: placeholderText,
          document_type: 'privacy_policy',
          industry: 'Technology',
          processing_scope: 'Standard data processing',
          target_users: 'General Public'
        };
        
        const result = await APIService.analyzePolicy(analysisData);
        setAnalysisResult(result);
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      } catch (error) {
        console.error('Voice analysis failed:', error);
        setError('Failed to analyze voice recording. Please try again.');
        setIsAnalyzing(false);
      }
    }
  };

  const playRecording = () => {
    if (audioBlob) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.play();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getComplianceIssues = () => {
    if (analysisResult?.issues) {
      return analysisResult.issues.map(issue => ({
        type: issue.severity === 'high' ? 'critical' : issue.severity === 'medium' ? 'warning' : 'info',
        title: issue.type.replace('_', ' ').toUpperCase(),
        description: issue.description
      }));
    }
    if (analysisResult?.gaps) {
      return analysisResult.gaps.map(gap => ({
        type: gap.severity === 'high' ? 'critical' : gap.severity === 'medium' ? 'warning' : 'info',
        title: gap.title,
        description: gap.description
      }));
    }
    return [];
  };

  const getComplianceScore = () => {
    return analysisResult?.compliance_score || analysisResult?.complianceScore || analysisResult?.score || 0;
  };

  const getComplianceLevel = (score) => {
    if (score < 50) return { level: 'High Risk', color: 'red', description: 'Serious non-compliance concerns. Immediate corrective actions required.' };
    if (score < 70) return { level: 'Moderate Compliance', color: 'yellow', description: 'Acceptable but below optimal. Some controls in place, improvements needed.' };
    if (score < 80) return { level: 'Good Compliance', color: 'blue', description: 'Generally compliant with minor gaps. Solid adherence with room for refinement.' };
    return { level: 'Excellent Compliance', color: 'green', description: 'Exemplary performance with strong governance and best practices.' };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
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
                {!uploadedFile && !analysisComplete && !audioBlob ? (
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
                    
                    <div className="space-y-8">
                      {/* File Upload */}
                      <div className="border-2 border-dashed border-blue-300 rounded-3xl p-12 bg-blue-50">
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

                      {/* Divider */}
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="text-gray-500 font-semibold">OR</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                      </div>

                      {/* Text Area */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900">Enter Policy Text</h3>
                        <div className="space-y-4">
                          <textarea
                            value={policyText}
                            onChange={(e) => setPolicyText(e.target.value)}
                            placeholder="Type or paste your privacy policy text here..."
                            className="w-full h-64 p-6 border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:outline-none resize-none text-gray-700"
                          />
                          <button
                            type="button"
                            onClick={handleTextSubmit}
                            disabled={!policyText.trim()}
                            className="w-full flex items-center justify-center gap-3 p-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
                          >
                            <Shield className="h-5 w-5" />
                            Analyze Policy with AI
                            <ArrowRight className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => speakText(policyText)}
                            disabled={!policyText.trim()}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                          >
                            {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                            {isSpeaking ? 'Stop Reading' : 'Read Policy'}
                          </button>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="text-gray-500 font-semibold">OR</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                      </div>

                      {/* Voice Recording */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900">Record Your Policy</h3>
                        <div className="border-2 border-dashed border-green-300 rounded-2xl p-8 bg-green-50 text-center">
                          {!isRecording && !audioBlob ? (
                            <div>
                              <Mic className="h-16 w-16 text-green-600 mx-auto mb-4" />
                              <button
                                onClick={startRecording}
                                className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all duration-200"
                              >
                                Start Recording
                              </button>
                              <p className="text-sm text-gray-600 mt-2">Click to start recording your policy</p>
                            </div>
                          ) : isRecording ? (
                            <div>
                              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                <Mic className="h-8 w-8 text-white" />
                              </div>
                              <div className="text-2xl font-bold text-red-600 mb-2">{formatTime(recordingTime)}</div>
                              <button
                                onClick={stopRecording}
                                className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all duration-200"
                              >
                                <Square className="h-4 w-4 inline mr-2" />
                                Stop Recording
                              </button>
                              <p className="text-sm text-gray-600 mt-2">Recording in progress...</p>
                            </div>
                          ) : (
                            <div>
                              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="h-8 w-8 text-white" />
                              </div>
                              <div className="text-lg font-bold text-gray-900 mb-4">Recording Complete ({formatTime(recordingTime)})</div>
                              <div className="flex justify-center gap-3">
                                <button
                                  onClick={playRecording}
                                  className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all duration-200"
                                >
                                  <Play className="h-4 w-4 inline mr-2" />
                                  Play
                                </button>
                                <button
                                  onClick={analyzeVoice}
                                  className="px-4 py-2 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all duration-200"
                                >
                                  <ArrowRight className="h-4 w-4 inline mr-2" />
                                  Analyze
                                </button>
                                <button
                                  onClick={deleteRecording}
                                  className="px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all duration-200"
                                >
                                  <Trash2 className="h-4 w-4 inline mr-2" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* File/Text Info */}
                    <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-2xl border border-blue-200 mb-8">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-black text-gray-900 text-lg">
                          {uploadedFile ? uploadedFile.name : audioBlob ? 'Voice Recording' : 'Policy Text'}
                        </h3>
                        <p className="text-gray-600">
                          {uploadedFile ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB` : 
                           audioBlob ? `${formatTime(recordingTime)} audio` : 
                           `${policyText.length} characters`}
                        </p>
                      </div>
                      {analysisComplete && (
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      )}
                    </div>



                    {/* Error Display */}
                    {error && (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <AlertTriangle className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-4">Analysis Failed</h3>
                        <p className="text-red-600 mb-6">{error}</p>
                        <button
                          onClick={() => {
                            setError(null);
                            setAnalysisComplete(false);
                            setUploadedFile(null);
                            setPolicyText('');
                            setAudioBlob(null);
                          }}
                          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all duration-200"
                        >
                          Try Again
                        </button>
                      </div>
                    )}

                    {/* Analysis Results */}
                    {analysisComplete && !error && analysisResult && (
                      <div>
                        <div className="text-center mb-8">
                          <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                          </div>
                          <h3 className="text-3xl font-black text-gray-900 mb-4">
                            AI Analysis <span className="text-blue-600">Complete</span>
                          </h3>
                          <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="text-center">
                              <div className="text-4xl font-black text-blue-600">{getComplianceScore()}%</div>
                              <div className="text-sm font-semibold text-gray-600">NDPR Compliance Score</div>
                            </div>
                            <div className="text-center">
                              <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                                analysisResult.risk_level === 'low' ? 'bg-green-100 text-green-800' :
                                analysisResult.risk_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {analysisResult.risk_level?.toUpperCase() || 'UNKNOWN'} RISK
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Issues Found */}
                        <div className="space-y-4 mb-8">
                          <h4 className="text-xl font-black text-gray-900">AI-Identified Issues</h4>
                          {getComplianceIssues().length > 0 ? (
                            getComplianceIssues().map((issue, index) => (
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
                            ))
                          ) : (
                            <div className="text-center py-8 bg-green-50 rounded-2xl border border-green-200">
                              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                              <h5 className="font-bold text-green-800 mb-2">No Critical Issues Found</h5>
                              <p className="text-green-600 text-sm">Your policy appears to be well-structured for NDPR compliance.</p>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-6">
                          <button 
                            onClick={() => setShowDetailedReport(true)}
                            className="flex-1 flex items-center justify-center gap-3 p-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all duration-200"
                          >
                            <Eye className="h-5 w-5" />
                            View Detailed Report
                          </button>
                          <button className="flex items-center justify-center gap-3 p-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all duration-200">
                            <Download className="h-5 w-5" />
                            Download Report
                          </button>
                        </div>

                        {/* Text-to-Speech for Results */}
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => speakText(getAnalysisText())}
                            className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-2xl font-bold hover:bg-green-200 transition-all duration-200"
                          >
                            {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                            {isSpeaking ? 'Stop Reading Results' : 'Read Analysis Results'}
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

          {/* Processing Popup Modal */}
          {isAnalyzing && (
            <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
              <div className="bg-white rounded-3xl p-8 max-w-4xl w-full mx-4 animate-slideUp shadow-2xl">
                <AnalysisProgress onTimeout={handleTimeout} onCancel={cancelAnalysis} />
                {showTimeout && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl animate-slideDown">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <div>
                        <h4 className="font-bold text-yellow-800">Still Processing...</h4>
                        <p className="text-sm text-yellow-700">Analysis is taking longer than expected. Please wait while our AI completes the comprehensive review.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Detailed Report Modal */}
          {showDetailedReport && analysisResult && (
            <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn p-4">
              <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-900">Detailed NDPR Compliance Report</h2>
                    <button 
                      onClick={() => setShowDetailedReport(false)}
                      className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Executive Summary */}
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="h-6 w-6 text-blue-600" />
                      Executive Summary
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {analysisResult.executive_summary || 'Your privacy policy has been analyzed against NDPR requirements. The analysis reveals key areas for improvement to ensure full compliance with Nigerian data protection regulations.'}
                    </p>
                  </div>

                  {/* Compliance Score Breakdown */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Shield className="h-6 w-6 text-blue-600" />
                      Compliance Score: {getComplianceScore()}%
                    </h3>
                    
                    {(() => {
                      const level = getComplianceLevel(getComplianceScore());
                      return (
                        <div className={`p-4 rounded-xl mb-4 ${
                          level.color === 'red' ? 'bg-red-50 border border-red-200' :
                          level.color === 'yellow' ? 'bg-yellow-50 border border-yellow-200' :
                          level.color === 'blue' ? 'bg-blue-50 border border-blue-200' :
                          'bg-green-50 border border-green-200'
                        }`}>
                          <div className={`text-lg font-bold mb-2 ${
                            level.color === 'red' ? 'text-red-800' :
                            level.color === 'yellow' ? 'text-yellow-800' :
                            level.color === 'blue' ? 'text-blue-800' :
                            'text-green-800'
                          }`}>
                            {level.level}
                          </div>
                          <div className={`text-sm ${
                            level.color === 'red' ? 'text-red-700' :
                            level.color === 'yellow' ? 'text-yellow-700' :
                            level.color === 'blue' ? 'text-blue-700' :
                            'text-green-700'
                          }`}>
                            {level.description}
                          </div>
                        </div>
                      );
                    })()}
                    
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                      <div 
                        className={`h-4 rounded-full transition-all duration-1000 ${
                          getComplianceScore() < 50 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                          getComplianceScore() < 70 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                          getComplianceScore() < 80 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                          'bg-gradient-to-r from-green-500 to-green-600'
                        }`}
                        style={{ width: `${getComplianceScore()}%` }}
                      ></div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-green-50 rounded-xl">
                        <div className="text-2xl font-bold text-green-600">{analysisResult.gaps?.filter(g => g.severity === 'low').length || 0}</div>
                        <div className="text-sm text-green-700">Low Risk</div>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-xl">
                        <div className="text-2xl font-bold text-yellow-600">{analysisResult.gaps?.filter(g => g.severity === 'medium').length || 0}</div>
                        <div className="text-sm text-yellow-700">Medium Risk</div>
                      </div>
                      <div className="p-3 bg-red-50 rounded-xl">
                        <div className="text-2xl font-bold text-red-600">{analysisResult.gaps?.filter(g => g.severity === 'high').length || 0}</div>
                        <div className="text-sm text-red-700">High Risk</div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Analysis */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Brain className="h-6 w-6 text-blue-600" />
                      Detailed Analysis
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {analysisResult.detailed_analysis || 'Comprehensive analysis of your privacy policy against NDPR requirements has been completed. The assessment covers data collection practices, consent mechanisms, data subject rights, and security measures.'}
                    </p>
                  </div>

                  {/* Compliance Gaps */}
                  {analysisResult.gaps && analysisResult.gaps.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                        Compliance Gaps
                      </h3>
                      <div className="space-y-4">
                        {analysisResult.gaps.map((gap, index) => (
                          <div key={index} className="border border-gray-200 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                              <div className={`w-3 h-3 rounded-full mt-2 ${
                                gap.severity === 'high' ? 'bg-red-500' :
                                gap.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                              }`}></div>
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-900 mb-2">{gap.title}</h4>
                                <p className="text-gray-600 mb-3">{gap.description}</p>
                                <div className="text-sm text-blue-600 font-medium">
                                  Impact: {gap.impact}
                                </div>
                                {gap.recommendation && (
                                  <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                                    <div className="text-sm font-medium text-blue-800">Recommendation:</div>
                                    <div className="text-sm text-blue-700">{gap.recommendation}</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Legal Context */}
                  {analysisResult.legal_context && (
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="h-6 w-6 text-gray-600" />
                        Legal Context
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {analysisResult.legal_context}
                      </p>
                    </div>
                  )}

                  {/* Legal References */}
                  {analysisResult.legal_references && analysisResult.legal_references.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Legal References</h3>
                      <div className="space-y-3">
                        {analysisResult.legal_references.map((ref, index) => (
                          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                            <div className="font-semibold text-gray-900">{ref.regulation} - {ref.article}</div>
                            <div className="text-sm text-gray-600">{ref.title}</div>
                            <div className="text-sm text-gray-500 mt-1">{ref.summary}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
    </div>
  );
};

export default PolicyUpload;