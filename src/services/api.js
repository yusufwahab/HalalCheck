const BACKEND_URL = 'https://trustbridge-backend-v75r.onrender.com';
const AI_ENGINE_URL = 'https://trustbridge-ai-engine.onrender.com';

class APIService {
  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  setAuthToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearAuthToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  async request(endpoint, options = {}) {
    const url = `${BACKEND_URL}${endpoint}`;
    const config = {
      mode: 'cors',
      credentials: 'omit',
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async registerUser(userData) {
    return this.request('/registerUser', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(email, password) {
    const response = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setAuthToken(response.access_token);
    return response;
  }

  async getCurrentUser() {
    return this.request('/users/me');
  }

  // Company endpoints
  async getCompanies() {
    return this.request('/companies');
  }

  async getCompany(companyId) {
    return this.request(`/companies/${companyId}`);
  }

  // Policy analysis
  async analyzePolicy(policyData) {
    const url = `${AI_ENGINE_URL}/api/v1/analyze/policy`;
    const config = {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: this.getHeaders(),
      body: JSON.stringify(policyData),
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI Engine Error:', response.status, errorText);
        throw new Error(`AI Engine Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('AI analysis failed:', error);
      throw error;
    }
  }

  // Consent management
  async manageConsent(companyId, action, details) {
    return this.request(`/companies/${companyId}/consent`, {
      method: 'POST',
      body: JSON.stringify({ action, details }),
    });
  }

  // Action recording
  async recordAction(type, details, companyId) {
    return this.request('/recordAction', {
      method: 'POST',
      body: JSON.stringify({ type, details, companyId }),
    });
  }

  // Ledger endpoints
  async getUserLedger(userId) {
    return this.request(`/users/${userId}/ledger`);
  }

  async getFullLedger() {
    return this.request('/getLedger');
  }

  async getActions() {
    return this.request('/actions');
  }
}

export default new APIService();