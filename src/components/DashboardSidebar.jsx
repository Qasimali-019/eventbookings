import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Menu, X } from 'lucide-react';
import './DashboardSidebar.css';

const DashboardSidebar = ({ role, activeTab, setActiveTab }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const userMenu = [
    { name: 'Overview', id: 'dashboard' },
    { name: 'Browse Events', id: 'browse' },
    { name: 'My Bookings', id: 'mybookings' },
    { name: 'Profile Settings', id: 'profile' }
  ];

  const adminMenu = [
    { name: 'Admin Overview', id: 'dashboard' },
    { name: 'Manage Events', id: 'events' },
    { name: 'Registrations', id: 'bookings' },
    { name: 'Analytics', id: 'analytics' },
    { name: 'Automation Rules', id: 'automation' },
    { name: 'Users List', id: 'users' },
    { name: 'Platform Settings', id: 'settings' }
  ];

  const menu = role === 'admin' ? adminMenu : userMenu;

  const handleLogout = () => {
    logout(navigate);
  };

  const handleTabClick = (id) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="sidebar-menu-toggle"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {/* Mobile overlay */}
      <div
        className={`sidebar-mobile-overlay ${mobileOpen ? 'active' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <div className={`dashboard-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <img src="/logo.png" alt="EventBookings" className="sidebar-logo" />
          </Link>
        </div>
        <nav className="sidebar-nav">
          {menu.map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => handleTabClick(item.id)}
              className={`sidebar-link ${activeTab === item.id ? 'active' : ''}`}
              style={{ 
                background: 'none', 
                border: 'none', 
                width: '100%', 
                textAlign: 'left', 
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              <span className="sidebar-text">{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} />
            <span className="sidebar-text">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
