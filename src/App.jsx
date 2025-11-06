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

function App() {
  const [user, setUser] = useState({
    id: 1,
    name: 'Chidi Okonkwo',
    email: 'chidi@example.com',
    isLoggedIn: false
  });
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  




  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Homepage user={user} setUser={setUser} />} />
          <Route path="/login" element={<Login onLogin={(data) => setUser({...user, ...data, isLoggedIn: true})} />} />
          <Route path="/signup" element={<Signup onSignup={(data) => setUser({...user, ...data, isLoggedIn: true})} />} />
          <Route path="/companies" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <Companies />
              </Layout>
            </>
          } />
          <Route path="/register-company" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <RegisterCompany />
              </Layout>
            </>
          } />
          <Route path="/data-connections" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <DataConnections />
              </Layout>
            </>
          } />
          <Route path="/connect-company" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <ConnectCompany />
              </Layout>
            </>
          } />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/policy-upload" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <PolicyUpload />
              </Layout>
            </>
          } />
          <Route path="/compliance-score" element={<ComplianceScore />} />
          <Route path="/remediation" element={<Remediation />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/citizen-request" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <CitizenRequest />
              </Layout>
            </>
          } />
          <Route path="/dsr-management" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <DSRManagement user={user} />
              </Layout>
            </>
          } />
          <Route path="/dashboard" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <Dashboard user={user} />
              </Layout>
            </>
          } />
          <Route path="/company/:id" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <CompanyDetail user={user} />
              </Layout>
            </>
          } />
          <Route path="/explore" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <Explore user={user} />
              </Layout>
            </>
          } />
          <Route path="/profile/:companyId" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <CompanyProfile user={user} />
              </Layout>
            </>
          } />
          <Route path="/request/:id" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <RequestDetail user={user} />
              </Layout>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;