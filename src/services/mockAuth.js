// Temporary mock authentication service until CORS is fixed
class MockAuthService {
  constructor() {
    this.users = [
      { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password123' }
    ];
  }

  async registerUser(userData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = this.users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password
    };
    
    this.users.push(newUser);
    
    // Return user without password
    const { password, ...userResponse } = newUser;
    return userResponse;
  }

  async login(email, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = this.users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Generate mock token
    const token = `mock_token_${user.id}_${Date.now()}`;
    localStorage.setItem('authToken', token);
    
    return { access_token: token, token_type: 'bearer' };
  }

  async getCurrentUser() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    // Extract user ID from mock token
    const userId = token.split('_')[2];
    const user = this.users.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    const { password, ...userResponse } = user;
    return userResponse;
  }

  clearAuthToken() {
    localStorage.removeItem('authToken');
  }

  async analyzePolicy(policyText) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis result
    return {
      advice: "Your privacy policy shows good compliance with NDPR requirements. However, there are some areas that need attention.",
      risk: "medium",
      suggestions: [
        "Add explicit consent mechanisms for data collection",
        "Include data retention periods in your policy",
        "Specify data subject rights more clearly",
        "Add contact information for your Data Protection Officer"
      ],
      timestamp: new Date().toISOString(),
      complianceScore: 78,
      issues: [
        {
          type: "missing_consent",
          severity: "high",
          description: "Explicit consent mechanisms not clearly defined",
          recommendation: "Add clear opt-in checkboxes for data collection"
        },
        {
          type: "data_retention",
          severity: "medium",
          description: "Data retention periods not specified",
          recommendation: "Define how long you keep user data"
        }
      ]
    };
  }
}

export default new MockAuthService();