# TrustBridge - NDPR Compliance Platform

TrustBridge is an AI-powered platform that simplifies Nigerian Data Protection Regulation (NDPR) compliance for businesses and empowers citizens to control their data rights.

## 🚀 Features

### Phase 1: Business Compliance (MVP)
- **Quick Onboarding**: Business registration with CAC verification
- **AI Policy Analysis**: Automated privacy policy scanning against NDPR requirements
- **Compliance Scoring**: Real-time compliance assessment with detailed breakdown
- **Remediation Assistant**: Step-by-step guidance to fix compliance issues
- **Compliance Certificate**: Downloadable certificates and website badges
- **DSR Management**: Handle citizen data requests efficiently
- **Evidence Vault**: Maintain audit-ready compliance records

### Phase 2: Citizen Empowerment (Planned)
- **Transparency Directory**: Search companies by compliance score
- **Consent Control**: Manage data permissions across platforms
- **Breach Notifications**: Automatic alerts for data breaches

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📋 User Flows

### Business Compliance Flow
1. **Onboarding** → Business registration and verification
2. **Policy Upload** → AI analysis of privacy policies
3. **Compliance Score** → Instant NDPR compliance assessment
4. **Remediation** → Fix issues with guided assistance
5. **Certificate** → Generate compliance certificates
6. **DSR Management** → Handle citizen data requests
7. **Monitoring** → Ongoing compliance tracking

### Citizen Request Flow
1. **Submit Request** → Access, correction, or erasure requests
2. **Company Processing** → 30-day response timeline
3. **Fulfillment** → Secure data delivery and proof generation

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
│   ├── Onboarding.jsx  # Business registration
│   ├── PolicyUpload.jsx # AI policy analysis
│   ├── ComplianceScore.jsx # Results display
│   ├── Remediation.jsx # Issue fixing
│   ├── Certificate.jsx # Compliance certificates
│   ├── DSRManagement.jsx # Data subject requests
│   └── CitizenRequest.jsx # Citizen request form
├── data/               # Mock data and constants
└── App.jsx            # Main application component
```

## 🎯 Key Routes

- `/` - Homepage with platform overview
- `/onboarding` - Business registration flow
- `/policy-upload` - Privacy policy analysis
- `/compliance-score` - NDPR compliance results
- `/remediation` - Issue remediation assistant
- `/certificate` - Compliance certificate generation
- `/dsr-management` - Data subject request management
- `/citizen-request` - Citizen data request form

## 🔧 Development

The application uses React 19 with Vite for fast development and hot module replacement. Tailwind CSS provides utility-first styling with a custom dark theme.

## 📜 License

MIT License - see LICENSE file for details.