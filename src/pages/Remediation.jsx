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
    <div className="min-h-screen bg-dark-bg p-4">
      <div className="max-w-6xl mx-auto pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark-text mb-4">Remediation Assistant</h1>
          <p className="text-dark-text-secondary">Fix NDPR compliance issues with step-by-step guidance</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Issues Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-lg font-bold text-dark-text mb-4">Issues to Fix</h3>
              <div className="space-y-3">
                {issues.map((issue, index) => (
                  <button
                    key={issue.id}
                    onClick={() => setSelectedIssue(index)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedIssue === index
                        ? 'border-brand-green bg-brand-green/10'
                        : 'border-dark-border hover:border-brand-green/50'
                    } ${fixedIssues.has(issue.id) ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-dark-text">{issue.title}</span>
                      {fixedIssues.has(issue.id) && (
                        <Check className="h-5 w-5 text-success" />
                      )}
                    </div>
                    <p className="text-dark-text-secondary text-sm">{issue.article}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="glass-effect rounded-2xl p-8">
              {/* Issue Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-dark-text mb-4">{currentIssue.title}</h2>
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-error/20 text-error rounded-full text-sm font-medium">
                    Critical
                  </span>
                  <span className="text-brand-green font-medium">{currentIssue.article}</span>
                </div>
                <p className="text-dark-text-secondary">{currentIssue.description}</p>
              </div>

              {/* Explanation */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-brand-green" />
                  <h3 className="text-lg font-semibold text-dark-text">Plain Explanation</h3>
                </div>
                <div className="bg-dark-surface rounded-xl p-6">
                  <p className="text-dark-text-secondary">{currentIssue.explanation}</p>
                </div>
              </div>

              {/* Recommended Fix */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-dark-text">Recommended Fix</h3>
                  <button
                    onClick={() => handleCopy(currentIssue.fix, 'fix')}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-green/10 text-brand-green rounded-lg hover:bg-brand-green hover:text-white transition-colors"
                  >
                    {copiedText === 'fix' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copiedText === 'fix' ? 'Copied!' : 'Copy Text'}
                  </button>
                </div>
                <div className="bg-dark-surface rounded-xl p-6">
                  <pre className="text-dark-text whitespace-pre-wrap font-mono text-sm">
                    {currentIssue.fix}
                  </pre>
                </div>
              </div>

              {/* Code Example */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-brand-purple" />
                    <h3 className="text-lg font-semibold text-dark-text">Code Example</h3>
                  </div>
                  <button
                    onClick={() => handleCopy(currentIssue.codeExample, 'code')}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-purple/10 text-brand-purple rounded-lg hover:bg-brand-purple hover:text-white transition-colors"
                  >
                    {copiedText === 'code' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copiedText === 'code' ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <div className="bg-dark-surface rounded-xl p-6 overflow-x-auto">
                  <pre className="text-dark-text font-mono text-sm">
                    <code>{currentIssue.codeExample}</code>
                  </pre>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => markAsFixed(currentIssue.id)}
                  disabled={fixedIssues.has(currentIssue.id)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-success text-white rounded-xl font-semibold hover:bg-success/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check className="h-5 w-5" />
                  {fixedIssues.has(currentIssue.id) ? 'Fixed' : 'Mark as Fixed'}
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-dark-surface border border-dark-border text-dark-text rounded-xl hover:border-brand-green transition-colors">
                  <RefreshCw className="h-5 w-5" />
                  Reanalyze Policy
                </button>
                {fixedIssues.size === issues.length && (
                  <button
                    onClick={() => navigate('/certificate')}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-green to-brand-blue text-white rounded-xl font-semibold hover:shadow-glow transition-all"
                  >
                    Generate Certificate
                    <ArrowRight className="h-5 w-5" />
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