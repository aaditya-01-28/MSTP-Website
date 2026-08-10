import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, Layers, Folder, MessageSquare, Users, Settings, LogOut, 
  FileText, Mail, Globe, ChevronDown, ChevronRight, Sun, Moon, Send, CalendarCheck 
} from 'lucide-react';
import './AdminPanel.css';

import CareersTab from './tabs/CareersTab';
import ServicesTab from './tabs/ServicesTab';
import PortfolioTab from './tabs/PortfolioTab';
import TestimonialsTab from './tabs/TestimonialsTab';
import TeamTab from './tabs/TeamTab';
import SettingsTab from './tabs/SettingsTab';
import ApplicationsTab from './tabs/ApplicationsTab';
import ContactsTab from './tabs/ContactsTab';
import ConsultationsTab from './tabs/ConsultationsTab';
import PrivacyTab from './tabs/PrivacyTab';
import BulkReplyTab from './tabs/BulkReplyTab';

const AdminPanel = ({ theme, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState('applications');
  const [isWebsiteMgmtOpen, setIsWebsiteMgmtOpen] = useState(true);
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

  const isWebsiteMgmtTab = ['careers', 'services', 'portfolio', 'testimonials', 'team', 'settings', 'privacy'].includes(activeTab);

  const websiteSubTabs = [
    { id: 'careers', name: 'Careers', icon: <Briefcase size={16}/>, component: CareersTab },
    { id: 'services', name: 'Services', icon: <Layers size={16}/>, component: ServicesTab },
    { id: 'portfolio', name: 'Portfolio', icon: <Folder size={16}/>, component: PortfolioTab },
    { id: 'testimonials', name: 'Testimonials', icon: <MessageSquare size={16}/>, component: TestimonialsTab },
    { id: 'team', name: 'Leadership Team', icon: <Users size={16}/>, component: TeamTab },
    { id: 'settings', name: 'Site Settings', icon: <Settings size={16}/>, component: SettingsTab },
    { id: 'privacy', name: 'Privacy Policy', icon: <FileText size={16}/>, component: PrivacyTab },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'applications':
        return <ApplicationsTab />;
      case 'contacts':
        return <ContactsTab />;
      case 'consultations':
        return <ConsultationsTab />;
      case 'bulk-reply':
        return <BulkReplyTab />;
      case 'careers':
        return <CareersTab />;
      case 'services':
        return <ServicesTab />;
      case 'portfolio':
        return <PortfolioTab />;
      case 'testimonials':
        return <TestimonialsTab />;
      case 'team':
        return <TeamTab />;
      case 'settings':
        return <SettingsTab />;
      case 'privacy':
        return <PrivacyTab />;
      default:
        return <ApplicationsTab />;
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.jpeg" alt="MAATRSHRI Logo" className="admin-sidebar-logo" />
            <h2>Admin</h2>
          </div>
          {toggleTheme && (
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle Light/Dark Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          )}
        </div>

        <nav className="admin-nav">
          {/* 1. Job Applications Tab */}
          <button
            className={`admin-nav-btn ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            <FileText size={18} /> Job Applications
          </button>

          {/* 2. Contact Inquiries Tab */}
          <button
            className={`admin-nav-btn ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            <Mail size={18} /> Contact Inquiries
          </button>

          {/* 3. Book Consultations Tab */}
          <button
            className={`admin-nav-btn ${activeTab === 'consultations' ? 'active' : ''}`}
            onClick={() => setActiveTab('consultations')}
          >
            <CalendarCheck size={18} /> Book Consultations
          </button>

          {/* 4. Bulk Custom Reply Tab */}
          <button
            className={`admin-nav-btn ${activeTab === 'bulk-reply' ? 'active' : ''}`}
            onClick={() => setActiveTab('bulk-reply')}
          >
            <Send size={18} /> Bulk Custom Reply
          </button>

          {/* 3. Website Management Group */}
          <div className="nav-group">
            <button
              className={`admin-nav-btn nav-group-btn ${isWebsiteMgmtTab ? 'active-group' : ''}`}
              onClick={() => {
                setIsWebsiteMgmtOpen(!isWebsiteMgmtOpen);
                if (!isWebsiteMgmtTab) {
                  setActiveTab('careers');
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                <Globe size={18} /> Website Management
              </div>
              {isWebsiteMgmtOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {isWebsiteMgmtOpen && (
              <div className="sub-nav-list">
                {websiteSubTabs.map(subTab => (
                  <button
                    key={subTab.id}
                    className={`sub-nav-btn ${activeTab === subTab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(subTab.id)}
                  >
                    {subTab.icon} {subTab.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <button className="admin-logout-btn" onClick={handleLogout}>
          <LogOut size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        {/* If inside Website Management, render sub-tab navigation bar */}
        {isWebsiteMgmtTab && (
          <div className="website-mgmt-bar">
            <div className="mgmt-title">
              <span>🌐 Website Management</span>
            </div>
            <div className="mgmt-subtabs">
              {websiteSubTabs.map(tab => (
                <button
                  key={tab.id}
                  className={`mgmt-subtab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon} {tab.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="admin-tab-body">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
