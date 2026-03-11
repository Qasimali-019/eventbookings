import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import ExploreEvents from './pages/ExploreEvents';
import EventDetail from './pages/EventDetail';
import Enterprise from './pages/Enterprise';
import IndustryDetail from './pages/IndustryDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CreateEvent from './pages/CreateEvent';
import ContactUs from './pages/ContactUs';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavAndFooter = location.pathname.startsWith('/dashboard') || 
                           location.pathname.startsWith('/admin-dashboard') ||
                           location.pathname.startsWith('/login') ||
                           location.pathname.startsWith('/signup');

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <main>
        {children}
      </main>
      {!hideNavAndFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/explore" element={<ExploreEvents />} />
            <Route path="/event/:eventId" element={<EventDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<ProtectedRoute requiredRole="user"><UserDashboard /></ProtectedRoute>} />
            <Route path="/admin-dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin-dashboard/create-event" element={<ProtectedRoute requiredRole="admin"><CreateEvent /></ProtectedRoute>} />
            <Route path="/enterprise" element={<Enterprise />} />
            <Route path="/industry/:industryId" element={<IndustryDetail />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
