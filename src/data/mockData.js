// Mock data for the application
export const companies = [
  {
    id: 1,
    name: 'TechHub Nigeria',
    website: 'www.techhub.ng',
    industry: 'Technology Services',
    ownerId: 1,
    complianceScore: 78,
    lastScan: '2 days ago',
    status: 'warning',
    violations: [
      {
        id: 1,
        type: 'critical',
        title: 'No Data Retention Policy',
        description: 'You must specify how long you keep user data and why. Without this, you\'re non-compliant and risk fines up to ₦10 million.',
        article: 'NDPR Article 2.5',
        recommendation: 'Add this clause to your privacy policy: "We retain personal data for 2 years from your last activity to fulfill our service obligations. After this period, data is securely deleted."'
      },
      {
        id: 2,
        type: 'critical',
        title: 'Missing Data Protection Officer Contact',
        description: 'Every organization must designate a DPO and provide their contact details in the policy.',
        article: 'NDPR Article 2.4',
        recommendation: '1. Appoint someone as your DPO (can be internal staff or outsourced) 2. Add their contact info to your policy 3. Register with NITDA if required'
      }
    ],
    connectedUsers: 1243,
    pendingRequests: 2
  },
  {
    id: 2,
    name: 'ShopEasy Ltd',
    website: 'www.shopeasy.ng',
    industry: 'E-commerce',
    ownerId: 1,
    complianceScore: 92,
    lastScan: '1 week ago',
    status: 'compliant',
    violations: [],
    connectedUsers: 5678,
    pendingRequests: 0
  }
];

export const leaderboardCompanies = [
  {
    id: 101,
    name: 'Flutterwave',
    industry: 'Fintech',
    location: 'Lagos',
    score: 94,
    connectedUsers: 15432,
    strengths: ['Full NDPR compliance', 'Fast request response (avg 3 days)', 'Transparent data practices']
  },
  {
    id: 102,
    name: 'Paystack',
    industry: 'Fintech',
    location: 'Lagos',
    score: 91,
    connectedUsers: 12890,
    strengths: ['Clear privacy policy', 'Active DPO'],
    warnings: ['Minor cookie consent issues']
  },
  {
    id: 103,
    name: 'Interswitch',
    industry: 'Fintech',
    location: 'Lagos',
    score: 89,
    connectedUsers: 23445
  },
  {
    id: 104,
    name: 'Kuda Bank',
    industry: 'Fintech',
    location: 'Lagos',
    score: 87,
    connectedUsers: 8234,
    improvement: '+15 points (Added DPO)'
  }
];

export const dataConnections = [
  {
    id: 1,
    userId: 1,
    companyId: 201,
    companyName: 'Jumia Nigeria',
    companyLogo: '🏪',
    dataTypes: ['Email: chidi@example.com', 'Phone: +234 801 234 5678', 'Purchase history (24 orders)', '3 Delivery addresses'],
    purpose: 'Orders & Marketing',
    consentDate: 'Jan 15, 2025',
    consentStatus: 'active',
    complianceScore: 85
  },
  {
    id: 2,
    userId: 1,
    companyId: 202,
    companyName: 'GTBank PLC',
    companyLogo: '🏦',
    dataTypes: ['Full KYC information', 'Transaction history', 'Account statements'],
    purpose: 'Banking Services',
    consentDate: '2020',
    consentStatus: 'active',
    complianceScore: 76
  }
];

export const requests = [
  {
    id: 1,
    requesterId: 2,
    requesterName: 'Jane Doe',
    requesterEmail: 'jane.doe@example.com',
    companyId: 1,
    companyName: 'TechHub Nigeria',
    type: 'access',
    status: 'pending',
    message: 'I need a copy of all my personal data for my records. Please include purchase history and any communications we\'ve had.',
    submittedDate: '2 days ago',
    deadline: '26 days remaining',
    legalBasis: 'NDPR Article 2.1(f) - Right to Portability'
  },
  {
    id: 2,
    requesterId: 3,
    requesterName: 'John Smith',
    companyId: 1,
    companyName: 'TechHub Nigeria',
    type: 'deletion',
    status: 'pending',
    submittedDate: '5 hours ago',
    deadline: '29 days remaining'
  }
];

export const activities = [
  {
    id: 1,
    type: 'response',
    message: 'Jumia responded to your data request',
    time: '2h ago',
    status: 'success'
  },
  {
    id: 2,
    type: 'violation',
    message: 'TechHub: New violation detected',
    time: 'Yesterday',
    status: 'warning'
  },
  {
    id: 3,
    type: 'consent',
    message: 'Consent revoked for ShopEasy',
    time: '3 days ago',
    status: 'info'
  },
  {
    id: 4,
    type: 'improvement',
    message: 'GTBank compliance improved to 76%',
    time: '1 week ago',
    status: 'success'
  }
];

export const industryStats = [
  { name: 'Fintech', score: 82, companies: 236 },
  { name: 'Banking', score: 79, companies: 89 },
  { name: 'Telecom', score: 73, companies: 45 },
  { name: 'Healthcare', score: 71, companies: 123 },
  { name: 'E-commerce', score: 67, companies: 567 },
  { name: 'Government', score: 58, companies: 34 }
];

export const platformStats = {
  totalCompanies: 1247,
  totalCitizens: 156789,
  totalRequests: 45892,
  averageScore: 68
};