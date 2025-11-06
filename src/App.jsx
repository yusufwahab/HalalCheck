import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
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
import Login from './pages/Login';
import Signup from './pages/Signup';
import Notifications from './pages/Notifications';
import ProtectedRoute from './components/ProtectedRoute';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import NavigationLoader from './components/NavigationLoader';

const AppContent = () => {
  const { isNavigating } = useNavigation();
  const [user, setUser] = useState({
    id: 1,
    name: 'Chidi Okonkwo',
    email: 'chidi@example.com',
    isLoggedIn: false
  });
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  




  return (
    <Router>
      <div className="app">
        {isNavigating && <NavigationLoader />}
        <Routes>
          <Route path="/" element={<Homepage user={user} setUser={setUser} />} />
          <Route path="/login" element={<Login onLogin={(data) => setUser({...user, ...data, isLoggedIn: true})} />} />
          <Route path="/signup" element={<Signup onSignup={(data) => setUser({...user, ...data, isLoggedIn: true})} />} />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <Notifications />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/companies" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <Companies />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/register-company" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <RegisterCompany />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/data-connections" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <DataConnections />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/connect-company" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <ConnectCompany />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/policy-upload" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <PolicyUpload />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/compliance-score" element={<ComplianceScore />} />
          <Route path="/remediation" element={<Remediation />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/citizen-request" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <CitizenRequest />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/dsr-management" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <DSRManagement user={user} />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <Dashboard user={user} />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/company/:id" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <CompanyDetail user={user} />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/explore" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <Explore user={user} />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/profile/:companyId" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <CompanyProfile user={user} />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/request/:id" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <RequestDetail user={user} />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;