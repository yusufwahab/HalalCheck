import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import RegisterCompany from './pages/RegisterCompany';
import DataConnections from './pages/DataConnections';
import ConnectCompany from './pages/ConnectCompany';
import CompanyDetail from './pages/CompanyDetail';
import Explore from './pages/Explore';
import CompanyProfile from './pages/CompanyProfile';
import RequestDetail from './pages/RequestDetail';
import Onboarding from './pages/Onboarding';
import PolicyUpload from './pages/PolicyUpload';
import ComplianceScore from './pages/ComplianceScore';
import Remediation from './pages/Remediation';
import Certificate from './pages/Certificate';
import DSRManagement from './pages/DSRManagement';
import CitizenRequest from './pages/CitizenRequest';
import NITDAComplaint from './pages/NITDAComplaint';
import QuickCompliance from './pages/QuickCompliance';
import SystemStatus from './pages/SystemStatus';
import ConsentManagement from './pages/ConsentManagement';
import ActionHistory from './pages/ActionHistory';
import DataUsageMonitor from './pages/DataUsageMonitor';
import RealTimeDataUsage from './pages/RealTimeDataUsage';
import History from './pages/History';
import Settings from './pages/Settings';
import UserProfile from './pages/UserProfile';
import ConsentHub from './pages/ConsentHub';
import DataFlowVisualization from './pages/DataFlowVisualization';
import BreachResponse from './pages/BreachResponse';
import PrivacyRiskCalculator from './pages/PrivacyRiskCalculator';
import ZakatCalculator from './pages/ZakatCalculator';
import ProductAnalysis from './pages/ProductAnalysis';
import HalalScore from './pages/HalalScore';
import TrackingPage from './pages/TrackingPage';
import Notifications from './pages/Notifications';
import AIChatbot from './components/AIChatbot';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { UserProvider } from './contexts/UserContext';
import ScholarNetwork from './pages/ScholarNetwork';
import HalalAlternatives from './pages/HalalAlternatives';
import IncomePurification from './pages/IncomePurification';
import BusinessDashboard from './pages/BusinessDashboard';
import QardHasan from './pages/QardHasan';
import BusinessValidator from './pages/BusinessValidator';
import NavigationLoader from './components/NavigationLoader';

const ChatbotWrapper = () => {
  const location = useLocation();
  const excludedPaths = ['/'];
  
  if (excludedPaths.includes(location.pathname)) {
    return null;
  }
  
  return <AIChatbot />;
};

const AppContent = () => {
  const { isNavigating } = useNavigation();
  const [user] = useState({ name: 'User' }); // Mock user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogout = () => {
    setSidebarOpen(false);
  };
  
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        {isNavigating && <NavigationLoader />}
        <Routes>
          <Route path="/" element={<Homepage />} />
          
          {/* Routes with Sidebar */}
          <Route path="/dashboard" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <Dashboard user={user} />
              </Layout>
            </>
          } />
          
          <Route path="/zakat-calculator" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <ZakatCalculator />
              </Layout>
            </>
          } />
          
          <Route path="/product-analysis" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <ProductAnalysis />
              </Layout>
            </>
          } />
          
          <Route path="/halal-score" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <HalalScore />
              </Layout>
            </>
          } />
          
          <Route path="/notifications" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <Notifications />
              </Layout>
            </>
          } />
          
          <Route path="/companies" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <Companies />
              </Layout>
            </>
          } />
          
          <Route path="/settings" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <Settings />
              </Layout>
            </>
          } />
          
          <Route path="/user-profile" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <UserProfile />
              </Layout>
            </>
          } />
          
          <Route path="/scholar-network" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <ScholarNetwork />
              </Layout>
            </>
          } />
          
          <Route path="/halal-alternatives" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <HalalAlternatives />
              </Layout>
            </>
          } />
          
          <Route path="/income-purification" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <IncomePurification />
              </Layout>
            </>
          } />
          
          <Route path="/business-validator" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <BusinessValidator />
              </Layout>
            </>
          } />
          
          <Route path="/business-dashboard" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <BusinessDashboard />
              </Layout>
            </>
          } />
          
          <Route path="/qard-hasan" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <QardHasan />
              </Layout>
            </>
          } />
          
          <Route path="/action-history" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <ActionHistory user={user} />
              </Layout>
            </>
          } />

          {/* Standalone routes */}
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/compliance-score" element={<ComplianceScore />} />
          <Route path="/remediation" element={<Remediation />} />
          <Route path="/certificate" element={<Certificate />} />
        </Routes>
        
        <ChatbotWrapper />
      </div>
    </Router>
  );
};

function App() {
  return (
    <UserProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </UserProvider>
  );
}

export default App;