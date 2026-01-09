# HalalCheck - AI-Powered Shariah Compliance for Modern Finance

HalalCheck is an AI-powered platform that analyzes financial products for Shariah compliance, helping 1.8 billion Muslims make confident halal financial decisions.

## 🚀 Features

### Phase 1: Financial Product Analysis (MVP)
- **Instant Shariah Analysis**: Upload contracts, terms, or product links for AI analysis
- **Halal Score (0-100)**: Clear rating with breakdown of riba, gharar, and haram elements
- **Scholarly Proof**: Every decision backed by Quran, Hadith, and contemporary fatwas
- **Halal Alternatives**: Recommends compliant substitutes when products fail
- **HalalCheck Certified**: Downloadable certificates and website badges
- **Business Dashboard**: API integration for fintech companies
- **Scholar Network**: Access to certified Shariah advisors

### Phase 2: Islamic Finance Ecosystem (Planned)
- **Zakat Calculator**: Automated zakat calculation with live gold/silver prices
- **Qard Hasan Marketplace**: Interest-free peer lending community
- **Halal Income Purification**: Calculate charity amounts for mixed-income investments
- **Halal Business Validator**: Shariah screening for entrepreneurs

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📋 User Flows

### Individual User Flow
1. **Product Analysis** → Upload financial contracts or product links
2. **AI Analysis** → Instant Shariah compliance assessment
3. **Halal Score** → 0-100 rating with detailed breakdown
4. **Alternatives** → Discover compliant substitutes
5. **Scholar Consultation** → Complex cases escalated to experts

### Business Integration Flow
1. **API Integration** → Embed HalalCheck in fintech products
2. **Real-time Validation** → Continuous compliance monitoring
3. **Certification** → Earn "HalalCheck Certified" badge
4. **Analytics** → Track compliance metrics and user trust

## 🚦 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
│   ├── Homepage.jsx    # Landing page
│   ├── Onboarding.jsx  # User type selection
│   ├── ProductAnalysis.jsx # Financial product upload
│   ├── HalalScore.jsx  # Shariah compliance results
│   ├── Remediation.jsx # Product improvement guidance
│   ├── Certificate.jsx # Shariah compliance certificates
│   ├── BusinessDashboard.jsx # API management for companies
│   ├── CheckProduct.jsx # Public product search
│   ├── ZakatCalculator.jsx # Zakat calculation tool
│   └── ScholarNetwork.jsx # Scholar consultations
├── data/               # Mock data and Islamic finance constants
└── App.jsx            # Main application component
```

## 🎯 Key Routes

- `/` - Homepage with platform overview
- `/onboarding` - User type selection (Individual vs Business)
- `/product-analysis` - Financial product analysis
- `/halal-score` - Shariah compliance results
- `/remediation` - Product improvement guidance
- `/certificate` - Shariah compliance certificate generation
- `/business-dashboard` - API keys and business management
- `/check-product` - Public product search tool
- `/zakat-calculator` - Zakat calculation and tracking
- `/scholar-network` - Scholar consultations and rulings

## 🔧 Development

The application uses React 19 with Vite for fast development and hot module replacement. Tailwind CSS provides utility-first styling with Islamic design elements.

## 📜 License

MIT License - see LICENSE file for details.