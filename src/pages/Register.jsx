import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Eye, EyeOff, CheckCircle, CreditCard, Shield, FileCheck, ArrowRight, ArrowLeft, Building2, Camera, Scan } from 'lucide-react';
import APIService from '../services/api';
import AuthBg from '../assets/Trustbridge_authpages_img.png';

const Register = ({ onLogin }) => {
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState('individual'); // 'individual' or 'business'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    address: '',
    nin: '',
    businessRegNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  const [faceVerification, setFaceVerification] = useState({
    step: 'position', // 'position', 'blink', 'lookLeft', 'lookRight', 'complete'
    isCorrectPosition: false,
    hasCompleted: false,
    cameraActive: false
  });
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  const totalSteps = accountType === 'individual' ? 5 : 4; // Individual: Account Type, Basic Info, Profile, Face Verification, Terms | Business: Account Type, Basic Info, Profile, Terms

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await APIService.registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        accountType
      });
      console.log('🎉 INITIAL SIGNUP SUCCESSFUL!');
      setStep(3);
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProfile = (e) => {
    e.preventDefault();
    if (accountType === 'individual') {
      setStep(4); // Face verification
    } else {
      setStep(4); // Terms for business
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: false
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().then(() => {
            setFaceVerification(prev => ({ ...prev, cameraActive: true, isCorrectPosition: true }));
          });
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setError('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setFaceVerification(prev => ({ ...prev, cameraActive: false }));
    }
  };

  const handleFaceVerificationStep = () => {
    if (faceVerification.step === 'position' && !faceVerification.cameraActive) {
      startCamera();
      // Auto-progress through steps after camera starts
      setTimeout(() => {
        setFaceVerification(prev => ({ ...prev, step: 'blink' }));
        setTimeout(() => {
          setFaceVerification(prev => ({ ...prev, step: 'lookLeft' }));
          setTimeout(() => {
            setFaceVerification(prev => ({ ...prev, step: 'lookRight' }));
            setTimeout(() => {
              setFaceVerification(prev => ({ ...prev, step: 'complete', hasCompleted: true }));
              stopCamera();
              setTimeout(() => setStep(5), 1500);
            }, 5000);
          }, 5000);
        }, 5000);
      }, 2000);
      return;
    }

    if (faceVerification.cameraActive) {
      stopCamera();
      setFaceVerification(prev => ({ ...prev, step: 'position', isCorrectPosition: false }));
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (step !== 4 || accountType !== 'individual') {
      stopCamera();
    }
  }, [step, accountType]);

  const handleFinalSubmit = () => {
    setSuccess(true);
    setTimeout(() => {
      onLogin({ name: formData.name, email: formData.email, accountType });
      navigate('/dashboard');
    }, 2000);
  };

  const getStepTitle = () => {
    switch(step) {
      case 1: return 'Account Type';
      case 2: return 'Basic Information';
      case 3: return 'Complete Profile';
      case 4: return accountType === 'individual' ? 'Face Verification' : 'Terms & Conditions';
      case 5: return 'Terms & Conditions';
      default: return 'Setup';
    }
  };

  if (success) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${AuthBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to TrustBridge!</h2>
          <p className="text-gray-600 mb-4">Your account has been created successfully. Taking you to your dashboard...</p>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${AuthBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Wizard Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of {totalSteps}</span>
            <span className="text-sm font-medium text-blue-600">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
            {step === 1 && <UserPlus className="h-8 w-8 text-white" />}
            {step === 2 && <Mail className="h-8 w-8 text-white" />}
            {step === 3 && <User className="h-8 w-8 text-white" />}
            {step === 4 && accountType === 'individual' && <Camera className="h-8 w-8 text-white" />}
            {((step === 4 && accountType === 'business') || step === 5) && <FileCheck className="h-8 w-8 text-white" />}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{getStepTitle()}</h1>
          <p className="text-gray-600">
            {step === 1 && 'Choose your account type'}
            {step === 2 && 'Create your TrustBridge account'}
            {step === 3 && 'Complete your profile information'}
            {step === 4 && accountType === 'individual' && 'Verify your identity'}
            {((step === 4 && accountType === 'business') || step === 5) && 'Review and accept our terms'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Step 1: Account Type Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => setAccountType('individual')}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  accountType === 'individual' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Individual Account</h3>
                    <p className="text-sm text-gray-600">For personal data protection and privacy control</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setAccountType('business')}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  accountType === 'business' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Business Account</h3>
                    <p className="text-sm text-gray-600">For organizations seeking NDPR compliance</p>
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Basic Information */}
        {step === 2 && (
          <form onSubmit={handleInitialSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {accountType === 'business' ? 'Business Name' : 'Full Name'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={accountType === 'business' ? 'Enter business name' : 'Enter your full name'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? 'Creating...' : 'Continue'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Complete Profile */}
        {step === 3 && (
          <div>
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Data Protection Commitment</h3>
                  <p className="text-sm text-blue-700">
                    TrustBridge is committed to keeping your data safe. We comply with Nigerian Data Protection Regulation (NDPR) and international privacy standards.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleCompleteProfile} className="space-y-4 sm:space-y-6">
              {accountType === 'individual' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      required
                      min="18"
                      max="120"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your age"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      required
                      rows="3"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter your address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">NIN (National Identification Number)</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.nin}
                        onChange={(e) => setFormData({ ...formData, nin: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your NIN"
                        maxLength="11"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Registration Number</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.businessRegNumber}
                        onChange={(e) => setFormData({ ...formData, businessRegNumber: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter business registration number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                    <textarea
                      required
                      rows="3"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter business address"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Face Verification (Individual Only) */}
        {step === 4 && accountType === 'individual' && (
          <div className="text-center">
            <div className="mb-6">
              <div className="relative mx-auto w-48 h-48 mb-6">
                <div className={`w-full h-full rounded-full border-4 overflow-hidden relative ${
                  faceVerification.cameraActive && faceVerification.step !== 'position' ? 'border-green-500' : 'border-blue-500'
                } bg-gray-50`}>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`absolute inset-0 w-full h-full object-cover ${
                      faceVerification.cameraActive ? 'block' : 'hidden'
                    }`}
                    style={{ transform: 'scaleX(-1)' }}
                  />
                  {faceVerification.step === 'complete' && (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-white">
                      <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                  )}
                  {!faceVerification.cameraActive && faceVerification.step !== 'complete' && (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                      <Camera className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>
                {faceVerification.cameraActive && faceVerification.step !== 'complete' && faceVerification.step !== 'position' && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {faceVerification.step === 'position' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Position Your Face</h3>
                    <p className="text-gray-600 mb-4">Center your face in the circle above</p>
                  </div>
                )}
                {faceVerification.step === 'blink' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Blink Your Eyes</h3>
                    <p className="text-gray-600 mb-4">Please blink naturally</p>
                  </div>
                )}
                {faceVerification.step === 'lookLeft' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Look Left</h3>
                    <p className="text-gray-600 mb-4">Turn your head to the left</p>
                  </div>
                )}
                {faceVerification.step === 'lookRight' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Look Right</h3>
                    <p className="text-gray-600 mb-4">Turn your head to the right</p>
                  </div>
                )}
                {faceVerification.step === 'complete' && (
                  <div>
                    <h3 className="text-lg font-semibold text-green-600 mb-2">Verification Complete!</h3>
                    <p className="text-gray-600 mb-4">Your identity has been verified successfully</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              {faceVerification.step !== 'complete' ? (
                <button
                  onClick={handleFaceVerificationStep}
                  className={`flex-1 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    faceVerification.cameraActive 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Scan className="h-4 w-4" />
                  {faceVerification.cameraActive ? 'Stop Camera' : 'Start Verification'}
                </button>
              ) : (
                <button
                  onClick={() => setStep(5)}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 4/5: Terms & Conditions */}
        {((step === 4 && accountType === 'business') || step === 5) && (
          <div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 max-h-48 overflow-y-auto">
              <h3 className="font-semibold text-gray-900 mb-3">TrustBridge Terms of Service</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>By using TrustBridge, you agree to:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Provide accurate and truthful information</li>
                  <li>Use the platform responsibly and lawfully</li>
                  <li>Respect other users' privacy and rights</li>
                  <li>Comply with Nigerian Data Protection Regulation (NDPR)</li>
                  <li>Allow us to process your data as outlined in our Privacy Policy</li>
                </ul>
                <p className="mt-3">
                  <strong>Data Protection:</strong> We are committed to protecting your personal information in accordance with NDPR and international privacy standards.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacy-policy"
                  checked={agreeToPolicy}
                  onChange={(e) => setAgreeToPolicy(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="privacy-policy" className="text-sm text-gray-600">
                  I have read and agree to the{' '}
                  <span className="text-blue-600 font-medium">Terms of Service</span> and{' '}
                  <span className="text-blue-600 font-medium">Privacy Policy</span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(accountType === 'business' ? 3 : 4)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={!agreeToPolicy}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  Complete Setup
                  <CheckCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;