import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check, ArrowRight, BookOpen, Code, RefreshCw } from 'lucide-react';

const Remediation = () => {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState(0);
  const [copiedText, setCopiedText] = useState('');
  const [fixedIssues, setFixedIssues] = useState(new Set());

  const issues = [
    {
      id: 1,
      title: 'Missing DPO Contact',
      description: 'NDPR requires you to name a Data Protection Officer and provide contact details.',
      article: 'NDPR Article 2.6',
      explanation: 'Every organization processing personal data must designate a Data Protection Officer (DPO) who serves as the point of contact for data protection matters.',
      fix: `Add this section to your privacy policy:

**Data Protection Officer**
Our Data Protection Officer can be contacted at:
- Email: dpo@yourcompany.com
- Phone: +234-XXX-XXX-XXXX
- Address: [Your company address]

For any questions about how we handle your personal data, please contact our DPO.`,
      codeExample: `<!-- Add this to your website footer -->
<div class="dpo-contact">
  <h4>Data Protection Officer</h4>
  <p>Email: <a href="mailto:dpo@yourcompany.com">dpo@yourcompany.com</a></p>
  <p>Phone: +234-XXX-XXX-XXXX</p>
</div>`
    },
    {
      id: 2,
      title: 'Incomplete Consent Mechanism',
      description: 'Cookie consent banner missing explicit opt-in mechanism as required by NDPR.',
      article: 'NDPR Article 2.3',
      explanation: 'Users must give explicit consent before any cookies (except essential ones) are placed on their device.',
      fix: `Update your cookie policy to include:

**Cookie Consent**
We use cookies to improve your experience. By clicking "Accept All", you consent to our use of cookies. You can manage your preferences by clicking "Cookie Settings".

Essential cookies are always enabled as they are necessary for the website to function.`,
      codeExample: `<!-- Cookie Consent Banner -->
<div id="cookie-banner" class="cookie-banner">
  <p>We use cookies to improve your experience.</p>
  <button onclick="acceptAllCookies()">Accept All</button>
  <button onclick="showCookieSettings()">Cookie Settings</button>
  <button onclick="rejectCookies()">Reject Non-Essential</button>
</div>

<script>
function acceptAllCookies() {
  // Set consent for all cookies
  localStorage.setItem('cookieConsent', 'all');
  hideCookieBanner();
}
</script>`
    }
  ];

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const markAsFixed = (issueId) => {
    setFixedIssues(prev => new Set([...prev, issueId]));
  };

  const currentIssue = issues[selectedIssue];

  return (
    <div className="min-h-screen bg-blue-50 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
            Fix <span className="text-blue-600">Issues</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">Fix NDPR compliance issues with step-by-step guidance</p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Issues Sidebar */}
          <div className="w-full lg:col-span-1">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Issues to Fix</h3>
              <div className="flex lg:flex-col gap-2 lg:gap-3 overflow-x-auto lg:overflow-x-visible">
                {issues.map((issue, index) => (
                  <button
                    key={issue.id}
                    onClick={() => setSelectedIssue(index)}
                    className={`flex-shrink-0 lg:w-full w-48 text-left p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all text-sm sm:text-base ${
                      selectedIssue === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    } ${fixedIssues.has(issue.id) ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{issue.title}</span>
                      {fixedIssues.has(issue.id) && (
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                      )}
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm">{issue.article}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:col-span-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 min-w-0">
              {/* Issue Header */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{currentIssue.title}</h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs sm:text-sm font-medium w-fit">
                    Critical
                  </span>
                  <span className="text-blue-600 font-medium text-sm sm:text-base">{currentIssue.article}</span>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">{currentIssue.description}</p>
              </div>

              {/* Explanation */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Plain Explanation</h3>
                </div>
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                  <p className="text-gray-700 text-sm sm:text-base">{currentIssue.explanation}</p>
                </div>
              </div>

              {/* Recommended Fix */}
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recommended Fix</h3>
                  <button
                    onClick={() => handleCopy(currentIssue.fix, 'fix')}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm sm:text-base w-fit"
                  >
                    {copiedText === 'fix' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copiedText === 'fix' ? 'Copied!' : 'Copy Text'}
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 overflow-x-auto">
                  <pre className="text-gray-800 whitespace-pre-wrap font-mono text-xs sm:text-sm break-words">
                    {currentIssue.fix}
                  </pre>
                </div>
              </div>

              {/* Code Example */}
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Code Example</h3>
                  </div>
                  <button
                    onClick={() => handleCopy(currentIssue.codeExample, 'code')}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-colors text-sm sm:text-base w-fit"
                  >
                    {copiedText === 'code' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copiedText === 'code' ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg sm:rounded-xl p-4 sm:p-6 overflow-x-auto">
                  <pre className="text-gray-100 font-mono text-xs sm:text-sm whitespace-pre-wrap break-words">
                    <code>{currentIssue.codeExample}</code>
                  </pre>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => markAsFixed(currentIssue.id)}
                  disabled={fixedIssues.has(currentIssue.id)}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-green-600 text-white rounded-lg sm:rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                  {fixedIssues.has(currentIssue.id) ? 'Fixed' : 'Mark as Fixed'}
                </button>
                <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gray-100 border border-gray-200 text-gray-700 rounded-lg sm:rounded-xl hover:border-blue-300 transition-colors text-sm sm:text-base">
                  <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
                  Reanalyze Policy
                </button>
                {fixedIssues.size === issues.length && (
                  <button
                    onClick={() => navigate('/certificate')}
                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg transition-all text-sm sm:text-base"
                  >
                    Generate Certificate
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Remediation;