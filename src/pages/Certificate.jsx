import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Share2, Copy, Check, Shield, Calendar, Building } from 'lucide-react';

const Certificate = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  const certificateData = {
    businessName: 'Emeka\'s Fintech Solutions',
    score: 78,
    date: new Date().toLocaleDateString(),
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    certificateId: 'TB-' + Math.random().toString(36).substr(2, 9).toUpperCase()
  };

  const badgeCode = `<div style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 16px; background: linear-gradient(135deg, #10B981, #3B82F6); color: white; border-radius: 12px; font-family: Arial, sans-serif; font-size: 14px; font-weight: 600; text-decoration: none;">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
  </svg>
  NDPR Verified by TrustBridge
</div>`;

  const handleCopyBadge = () => {
    navigator.clipboard.writeText(badgeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-dark-bg p-4">
      <div className="max-w-4xl mx-auto pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-success to-brand-green rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl font-bold gradient-text">Congratulations! 🎉</span>
          </div>
          <h1 className="text-2xl font-bold text-dark-text mb-2">You're now NDPR-ready!</h1>
          <p className="text-dark-text-secondary">Your compliance certificate is ready for download and sharing</p>
        </div>

        {/* Certificate Preview */}
        <div className="glass-effect rounded-2xl p-8 mb-8">
          <div className="bg-white rounded-xl p-8 text-black" id="certificate">
            {/* Certificate Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  TrustBridge
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-2">NDPR Compliance Certificate</h2>
              <p className="text-gray-600">AI-Assisted Self-Assessment</p>
            </div>

            {/* Certificate Body */}
            <div className="border-2 border-gray-200 rounded-lg p-6 mb-6">
              <div className="text-center mb-6">
                <p className="text-lg mb-4">This certifies that</p>
                <h3 className="text-2xl font-bold text-blue-600 mb-4">{certificateData.businessName}</h3>
                <p className="text-lg mb-4">has completed an AI-assisted NDPR compliance assessment and achieved a score of</p>
                <div className="inline-flex items-center gap-4 bg-green-50 px-6 py-3 rounded-lg">
                  <span className="text-4xl font-bold text-green-600">{certificateData.score}</span>
                  <span className="text-gray-600">/100</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <Calendar className="h-6 w-6 text-gray-500 mb-2" />
                  <span className="text-sm text-gray-500">Issue Date</span>
                  <span className="font-semibold">{certificateData.date}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Building className="h-6 w-6 text-gray-500 mb-2" />
                  <span className="text-sm text-gray-500">Certificate ID</span>
                  <span className="font-semibold">{certificateData.certificateId}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Shield className="h-6 w-6 text-gray-500 mb-2" />
                  <span className="text-sm text-gray-500">Valid Until</span>
                  <span className="font-semibold">{certificateData.validUntil}</span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">
                <strong>Disclaimer:</strong> This is an AI-assisted NDPR self-assessment certificate. 
                It is not a substitute for legal advice or official compliance certification.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Download & Share */}
          <div className="glass-effect rounded-xl p-6">
            <h3 className="text-lg font-bold text-dark-text mb-4">Download & Share</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-brand-green to-brand-blue text-white rounded-xl font-semibold hover:shadow-glow transition-all">
                <Download className="h-5 w-5" />
                Download PDF Certificate
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-dark-surface border border-dark-border text-dark-text rounded-xl hover:border-brand-green transition-colors">
                <Share2 className="h-5 w-5" />
                Share on LinkedIn
              </button>
            </div>
          </div>

          {/* Website Badge */}
          <div className="glass-effect rounded-xl p-6">
            <h3 className="text-lg font-bold text-dark-text mb-4">Website Badge</h3>
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-brand-green to-brand-blue text-white rounded-xl font-semibold text-sm">
                <Shield className="h-4 w-4" />
                NDPR Verified by TrustBridge
              </div>
            </div>
            <button
              onClick={handleCopyBadge}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-dark-surface border border-dark-border text-dark-text rounded-xl hover:border-brand-green transition-colors"
            >
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              {copied ? 'Copied!' : 'Copy HTML Code'}
            </button>
          </div>
        </div>

        {/* Next Steps */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-bold text-dark-text mb-4">What's Next?</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-dark-surface rounded-xl">
              <div className="w-12 h-12 bg-brand-green/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="font-semibold text-dark-text mb-2">Monitor Compliance</h4>
              <p className="text-dark-text-secondary text-sm">Set up ongoing monitoring for policy changes</p>
            </div>
            <div className="text-center p-4 bg-dark-surface rounded-xl">
              <div className="w-12 h-12 bg-brand-purple/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📋</span>
              </div>
              <h4 className="font-semibold text-dark-text mb-2">Manage DSRs</h4>
              <p className="text-dark-text-secondary text-sm">Handle data subject requests efficiently</p>
            </div>
            <div className="text-center p-4 bg-dark-surface rounded-xl">
              <div className="w-12 h-12 bg-accent-orange/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏆</span>
              </div>
              <h4 className="font-semibold text-dark-text mb-2">Join Leaderboard</h4>
              <p className="text-dark-text-secondary text-sm">Showcase your compliance publicly</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-brand-green to-brand-blue text-white px-8 py-3 rounded-xl font-semibold hover:shadow-glow transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;