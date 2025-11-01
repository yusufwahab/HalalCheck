import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import CompanyDetail from './pages/CompanyDetail';
import Explore from './pages/Explore';
import CompanyProfile from './pages/CompanyProfile';
import RequestDetail from './pages/RequestDetail';

function App() {
  const [user, setUser] = useState({
    id: 1,
    name: 'Chidi Okonkwo',
    email: 'chidi@example.com',
    isLoggedIn: false
  });

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Homepage user={user} setUser={setUser} />} />
          <Route path="/dashboard" element={
            <>
              <Navbar user={user} />
              <Dashboard user={user} />
            </>
          } />
          <Route path="/company/:id" element={
            <>
              <Navbar user={user} />
              <CompanyDetail user={user} />
            </>
          } />
          <Route path="/explore" element={
            <>
              <Navbar user={user} />
              <Explore user={user} />
            </>
          } />
          <Route path="/profile/:companyId" element={
            <>
              <Navbar user={user} />
              <CompanyProfile user={user} />
            </>
          } />
          <Route path="/request/:id" element={
            <>
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