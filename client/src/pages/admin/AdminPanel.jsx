import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Layers, Folder, MessageSquare, Users, Settings, LogOut, FileText, Mail } from 'lucide-react';
import './AdminPanel.css';

import CareersTab from './tabs/CareersTab';
import ServicesTab from './tabs/ServicesTab';
import PortfolioTab from './tabs/PortfolioTab';
import TestimonialsTab from './tabs/TestimonialsTab';
import TeamTab from './tabs/TeamTab';
import SettingsTab from './tabs/SettingsTab';
import ApplicationsTab from './tabs/ApplicationsTab';
import ContactsTab from './tabs/ContactsTab';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'applications', name: 'Job Applications', icon: <FileText size={18}/>, component: ApplicationsTab },
    { id: 'contacts', name: 'Contact Inquiries', icon: <Mail size={18}/>, component: ContactsTab },
    { id: 'careers', name: 'Careers', icon: <Briefcase size={18}/>, component: CareersTab },
    { id: 'services', name: 'Services', icon: <Layers size={18}/>, component: ServicesTab },
    { id: 'portfolio', name: 'Portfolio', icon: <Folder size={18}/>, component: PortfolioTab },
    { id: 'testimonials', name: 'Testimonials', icon: <MessageSquare size={18}/>, component: TestimonialsTab },
    { id: 'team', name: 'Leadership Team', icon: <Users size={18}/>, component: TeamTab },
    { id: 'settings', name: 'Site Settings', icon: <Settings size={18}/>, component: SettingsTab },
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || CareersTab;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <img src="/logo.jpeg" alt="MAATRSHRI Logo" className="admin-sidebar-logo" />
          <h2>MAATRSHRI Admin</h2>
        </div>
        <nav className="admin-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`admin-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </nav>
        <button className="admin-logout-btn" onClick={handleLogout}>
          <LogOut size={16} style={{display: 'inline', marginRight: '5px', verticalAlign: 'middle'}}/> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <ActiveComponent />
      </main>
    </div>
  );
};

export default AdminPanel;
