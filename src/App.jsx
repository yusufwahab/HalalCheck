import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
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
          <Route path="/companies" element={
            <>
              <Sidebar user={user} />
              <Navbar user={user} />
              <Companies />
            </>
          } />
          <Route path="/register-company" element={
            <>
              <Sidebar user={user} />
              <Navbar user={user} />
              <RegisterCompany />
            </>
          } />
          <Route path="/data-connections" element={
            <>
              <Sidebar user={user} />
              <Navbar user={user} />
              <DataConnections />
            </>
          } />
          <Route path="/connect-company" element={
            <>
              <Sidebar user={user} />
              <Navbar user={user} />
              <ConnectCompany />
            </>
          } />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/policy-upload" element={
            <>
              <Sidebar user={user} />
              <Navbar user={user} />
              <PolicyUpload />
            </>
          } />
          <Route path="/compliance-score" element={<ComplianceScore />} />
          <Route path="/remediation" element={<Remediation />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/citizen-request" element={
            <>
              <Sidebar user={user} />
              <Navbar user={user} />
              <CitizenRequest />
            </>
          } />
          <Route path="/dsr-management" element={
            <>
              <Sidebar user={user} />
              <Navbar user={user} />
              <DSRManagement user={user} />
            </>
          } />
          <Route path="/dashboard" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Navbar user={user} onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
              <Dashboard user={user} />
            </>
          } />
          <Route path="/company/:id" element={
            <>
              <Sidebar user={user} />
              <Navbar user={user} />
              <CompanyDetail user={user} />
            </>
          } />
          <Route path="/explore" element={
            <>
              <Sidebar user={user} />
              <Navbar user={user} />
              <Explore user={user} />
            </>
          } />
          <Route path="/profile/:companyId" element={
            <>
              <Sidebar user={user} />
              <Navbar user={user} />
              <CompanyProfile user={user} />
            </>
          } />
          <Route path="/request/:id" element={
            <>
              <Sidebar user={user} />
              <Navbar user={user} />
              <RequestDetail user={user} />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;