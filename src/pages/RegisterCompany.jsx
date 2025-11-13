import React, { useState } from 'react';
import { Building2, CheckCircle, Upload, Shield, Users, FileText, Globe, Phone, Mail, MapPin } from 'lucide-react';

const RegisterCompany = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    cacNumber: '',
    industry: '',
    companySize: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    dataOfficer: '',
    dataOfficerEmail: '',
    privacyPolicy: null,
    dataTypes: [],
    consentMechanism: ''
  });

  const industries = [
    'E-commerce', 'Financial Services', 'Healthcare', 'Technology', 'Education',
    'Telecommunications', 'Manufacturing', 'Real Estate', 'Transportation', 'Other'
  ];

  const companySizes = [
    '1-10 employees', '11-50 employees', '51-200 employees', '201-1000 employees', '1000+ employees'
  ];

  const dataTypeOptions = [
    'Personal Information', 'Contact Details', 'Financial Data', 'Health Records',
    'Location Data', 'Behavioral Data', 'Biometric Data', 'Employment Records'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDataTypeToggle = (dataType) => {
    setFormData(prev => ({
      ...prev,
      dataTypes: prev.dataTypes.includes(dataType)
        ? prev.dataTypes.filter(type => type !== dataType)
        : [...prev.dataTypes, dataType]
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const steps = [
    { number: 1, title: 'Company Info', icon: Building2 },
    { number: 2, title: 'Data Officer', icon: Users },
    { number: 3, title: 'Data Processing', icon: Shield },
    { number: 4, title: 'Review & Submit', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900 mb-4">
              Register <span className="text-blue-600">Company</span>
            </h1>
            <p className="text-xl text-gray-600">Join TrustBridge and ensure NDPR compliance for your business</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Progress Steps */}
            <div className="lg:col-span-1">
              <div className="premium-card rounded-3xl p-6 sticky top-8">
                <h3 className="text-xl font-black text-gray-900 mb-6">Registration Steps</h3>
                <div className="space-y-4">
                  {steps.map((step) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.number;
                    const isCompleted = currentStep > step.number;
                    
                    return (
                      <div key={step.number} className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 ${
                        isActive ? 'bg-blue-50 border border-blue-200' : 
                        isCompleted ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                      }`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isActive ? 'bg-blue-600 text-white' :
                          isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                        </div>
                        <div>
                          <div className={`font-bold ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                            Step {step.number}
                          </div>
                          <div className="text-sm text-gray-600">{step.title}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="lg:col-span-3">
              <div className="premium-card rounded-3xl p-10">
                {/* Step 1: Company Information */}
                {currentStep === 1 && (
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900">Company Information</h2>
                        <p className="text-gray-600">Tell us about your business</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Company Name *</label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">CAC Registration Number *</label>
                        <input
                          type="text"
                          value={formData.cacNumber}
                          onChange={(e) => handleInputChange('cacNumber', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="RC1234567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Industry *</label>
                        <select
                          value={formData.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select industry</option>
                          {industries.map(industry => (
                            <option key={industry} value={industry}>{industry}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Company Size *</label>
                        <select
                          value={formData.companySize}
                          onChange={(e) => handleInputChange('companySize', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select company size</option>
                          {companySizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Website</label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="url"
                            value={formData.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://yourcompany.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Business Email *</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="contact@yourcompany.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="+234 xxx xxx xxxx"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Business Address *</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                          <textarea
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            rows={3}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter complete business address"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Data Protection Officer */}
                {currentStep === 2 && (
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900">Data Protection Officer</h2>
                        <p className="text-gray-600">Designate your DPO as required by NDPR</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                      <div className="flex items-start gap-3">
                        <Shield className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="font-bold text-blue-900 mb-2">NDPR Requirement</h3>
                          <p className="text-blue-800 text-sm">
                            Under the Nigerian Data Protection Regulation, organizations processing personal data must appoint a Data Protection Officer (DPO) to ensure compliance with data protection laws.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">DPO Full Name *</label>
                        <input
                          type="text"
                          value={formData.dataOfficer}
                          onChange={(e) => handleInputChange('dataOfficer', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter DPO full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">DPO Email Address *</label>
                        <input
                          type="email"
                          value={formData.dataOfficerEmail}
                          onChange={(e) => handleInputChange('dataOfficerEmail', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="dpo@yourcompany.com"
                        />
                      </div>
                    </div>

                    <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
                      <h4 className="font-bold text-gray-900 mb-4">DPO Responsibilities</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                          <span className="text-sm text-gray-700">Monitor NDPR compliance</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                          <span className="text-sm text-gray-700">Handle data subject requests</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                          <span className="text-sm text-gray-700">Conduct privacy impact assessments</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                          <span className="text-sm text-gray-700">Provide data protection training</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Data Processing */}
                {currentStep === 3 && (
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900">Data Processing Details</h2>
                        <p className="text-gray-600">Specify what data you collect and how</p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-bold text-gray-700 mb-4">Types of Personal Data Processed *</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {dataTypeOptions.map(dataType => (
                          <label key={dataType} className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl cursor-pointer hover:bg-blue-50 transition-all duration-200">
                            <input
                              type="checkbox"
                              checked={formData.dataTypes.includes(dataType)}
                              onChange={() => handleDataTypeToggle(dataType)}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm font-semibold text-gray-700">{dataType}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Consent Mechanism *</label>
                      <select
                        value={formData.consentMechanism}
                        onChange={(e) => handleInputChange('consentMechanism', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select consent mechanism</option>
                        <option value="opt-in">Opt-in (Explicit consent required)</option>
                        <option value="opt-out">Opt-out (Consent assumed unless declined)</option>
                        <option value="legitimate-interest">Legitimate Interest</option>
                        <option value="contractual">Contractual Necessity</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Privacy Policy Document</label>
                      <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center bg-blue-50">
                        <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                        <p className="text-blue-600 font-semibold mb-2">Upload your current privacy policy</p>
                        <p className="text-gray-600 text-sm">PDF, DOC, DOCX up to 10MB</p>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleInputChange('privacyPolicy', e.target.files[0])}
                          className="hidden"
                          id="privacy-policy-upload"
                        />
                        <label
                          htmlFor="privacy-policy-upload"
                          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold cursor-pointer hover:bg-blue-700 transition-all duration-200"
                        >
                          Choose File
                        </label>
                      </div>
                      {formData.privacyPolicy && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-green-600" />
                            <span className="text-sm font-semibold text-green-800">
                              {formData.privacyPolicy.name}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-gray-900">Review & Submit</h2>
                        <p className="text-gray-600">Confirm your information before submission</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200">
                        <h3 className="font-bold text-blue-900 mb-4">Company Information</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div><span className="font-semibold">Company:</span> {formData.companyName}</div>
                          <div><span className="font-semibold">CAC Number:</span> {formData.cacNumber}</div>
                          <div><span className="font-semibold">Industry:</span> {formData.industry}</div>
                          <div><span className="font-semibold">Size:</span> {formData.companySize}</div>
                        </div>
                      </div>

                      <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
                        <h3 className="font-bold text-green-900 mb-4">Data Protection Officer</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div><span className="font-semibold">DPO Name:</span> {formData.dataOfficer}</div>
                          <div><span className="font-semibold">DPO Email:</span> {formData.dataOfficerEmail}</div>
                        </div>
                      </div>

                      <div className="p-6 bg-purple-50 rounded-2xl border border-purple-200">
                        <h3 className="font-bold text-purple-900 mb-4">Data Processing</h3>
                        <div className="text-sm">
                          <div className="mb-2"><span className="font-semibold">Data Types:</span> {formData.dataTypes.join(', ')}</div>
                          <div><span className="font-semibold">Consent Mechanism:</span> {formData.consentMechanism}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-2xl">
                      <div className="flex items-start gap-3">
                        <Shield className="h-6 w-6 text-yellow-600 mt-1" />
                        <div>
                          <h4 className="font-bold text-yellow-900 mb-2">Next Steps</h4>
                          <ul className="text-yellow-800 text-sm space-y-1">
                            <li>• Your registration will be reviewed within 24-48 hours</li>
                            <li>• You'll receive an email confirmation once approved</li>
                            <li>• Access to compliance tools will be granted immediately</li>
                            <li>• Your DPO will receive onboarding materials</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`px-4 sm:px-6 py-3 rounded-xl sm:rounded-2xl font-bold transition-all duration-200 text-sm sm:text-base ${
                      currentStep === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {currentStep < 4 ? (
                    <button
                      onClick={nextStep}
                      className="px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-xl sm:rounded-2xl font-bold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button 
                      onClick={() => setShowModal(true)}
                      className="px-4 sm:px-8 py-3 bg-green-600 text-white rounded-xl sm:rounded-2xl font-bold hover:bg-green-700 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                    >
                      Submit Registration
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* Registration Review Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4">
                Registration Submitted Successfully
              </h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Your company registration is being reviewed by our compliance team. You will receive a response within <strong>24-48 hours</strong> via email.
              </p>
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>What happens next:</strong><br/>
                  • Verification of company documents<br/>
                  • NDPR compliance assessment<br/>
                  • Account activation email
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterCompany;