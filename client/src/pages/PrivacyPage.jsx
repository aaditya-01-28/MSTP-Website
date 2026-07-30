import React, { useState, useEffect } from 'react';
import { FileText, Database, Settings, Shield, Mail, Link, User, RotateCw, Calendar } from 'lucide-react';
import { API_BASE_URL } from '../apiConfig';
import './PrivacyPage.css';

const sectionIcons = {
  FileText: <FileText size={24} />,
  Database: <Database size={24} />,
  Settings: <Settings size={24} />,
  Shield: <Shield size={24} />,
  Mail: <Mail size={24} />,
  Link: <Link size={24} />,
  User: <User size={24} />,
  RotateCw: <RotateCw size={24} />
};

const PrivacyPage = () => {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/privacy`)
      .then(res => res.json())
      .then(data => {
        if (data && data.title) {
          setPolicy(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '30 May';
    const date = new Date(dateStr);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formatText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('•')) {
        return (
          <li key={index} className="privacy-list-item">
            {trimmed.substring(1).trim()}
          </li>
        );
      }
      return <p key={index} className="privacy-paragraph">{line}</p>;
    });
  };

  if (loading) {
    return <div className="privacy-loading">Loading privacy policy...</div>;
  }

  // Fallback to static policy default values if fetch fails or hasn't loaded
  const displayPolicy = policy || {
    title: 'Privacy Policy',
    subtitle: 'Your data. Your consent. Your Privacy Matters.',
    introText: 'At White Circle Group, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services. Please read it carefully to understand how we handle your information.',
    sections: [
      {
        number: 1,
        iconName: 'FileText',
        title: '1. Introduction',
        content: 'White Circle Group collects, builds, and deploys professional applications for users. This policy outlines how we handle user data when you visit our website or use our products.'
      },
      {
        number: 2,
        iconName: 'Database',
        title: '2. Information We Collect',
        content: '',
        col1Title: '2.1 Personal Data',
        col1Content: 'The only personal data shared with us is:\n• Name, email address, phone number, and company details.\n• Information received through forms, emails, or inquiries.',
        col2Title: '2.2 Non-Personal Data',
        col2Content: 'We may collect non-personal data such as:\n• Browser type and device information.\n• Pages visited and interaction data.'
      },
      {
        number: 3,
        iconName: 'Settings',
        title: '3. How We Use Your Information',
        content: '• Respond to your queries and provide support.\n• Improve our products and website experience.\n• Send updates, offers, or important information related to our products.\n• Prevent fraud and protect against unauthorized access.'
      },
      {
        number: 4,
        iconName: 'Shield',
        title: '4. Data Protection',
        content: 'We use appropriate security measures to protect your personal information from loss, unauthorized access, or disclosure.'
      },
      {
        number: 5,
        iconName: 'Mail',
        title: '5. Sharing of Information',
        content: 'White Circle Group does not sell or rent your personal information to third parties. We may share data only:\n• When required by law.\n• With trustworthy partners who agree to strictly guard user privacy.'
      },
      {
        number: 6,
        iconName: 'Database', // Database / Cookie fallback
        title: '6. Cookies',
        content: 'Our website may use cookies to improve user experience and analyze website traffic. You can disable cookies through your browser settings if you prefer.'
      },
      {
        number: 7,
        iconName: 'Link',
        title: '7. Third-Party Links',
        content: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites.'
      },
      {
        number: 8,
        iconName: 'User',
        title: '8. Your Rights',
        content: 'You have the right to:\n• Request copy of your data.\n• Correct inaccurate information.\n• Delete your information from our system.\nTo make such requests, please contact us through our official website.'
      },
      {
        number: 9,
        iconName: 'RotateCw',
        title: '9. Updates to This Policy',
        content: 'White Circle Group may update this Privacy Policy from time to time. Any changes will be posted on this page.'
      },
      {
        number: 10,
        iconName: 'Mail',
        title: '10. Contact Us',
        content: 'If you have questions regarding this Privacy Policy, please contact us through our contact page.'
      }
    ]
  };

  return (
    <div className="privacy-page">
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        
        {/* Header Block */}
        <div className="privacy-header-card">
          <div className="privacy-header-info">
            <h1 className="privacy-page-title">{displayPolicy.title}</h1>
            <p className="privacy-page-subtitle">{displayPolicy.subtitle}</p>
            <div className="privacy-update-badge">
              <Calendar size={15} style={{ marginRight: '6px' }} />
              Last Updated on {formatDate(displayPolicy.updatedAt)}
            </div>
          </div>
          <div className="privacy-header-graphic">
            <svg width="200" height="150" viewBox="0 0 200 150" fill="none">
              <rect x="10" y="10" width="180" height="130" rx="10" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1.5"/>
              <circle cx="100" cy="75" r="45" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeDasharray="4 4"/>
              <path d="M100 45 C115 50 125 50 130 45 C130 75 118 95 100 105 C82 95 70 75 70 45 C75 50 85 50 100 45 Z" fill="rgba(215, 184, 137, 0.08)" stroke="var(--accent-primary)" strokeWidth="2"/>
              <path d="M93 72 L98 77 L108 67" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Separator line */}
        <hr className="privacy-divider" />

        {/* Introduction section */}
        <div className="privacy-intro-block">
          <p>{displayPolicy.introText}</p>
        </div>

        {/* Sections list */}
        <div className="privacy-sections-container">
          {displayPolicy.sections.map((section, idx) => {
            const hasCols = section.col1Title && section.col2Title;
            return (
              <div key={idx} className="privacy-section-row">
                <div className="privacy-icon-column">
                  <div className="privacy-icon-box">
                    {sectionIcons[section.iconName] || <Shield size={24} />}
                  </div>
                </div>
                <div className="privacy-text-column">
                  <h3 className="privacy-section-title">{section.title}</h3>
                  
                  {!hasCols ? (
                    <div className="privacy-section-content">
                      {formatText(section.content)}
                    </div>
                  ) : (
                    <div className="privacy-section-cols">
                      <div className="privacy-section-col">
                        <h4 className="privacy-subcol-title">{section.col1Title}</h4>
                        <div className="privacy-section-content">
                          {formatText(section.col1Content)}
                        </div>
                      </div>
                      <div className="privacy-section-col">
                        <h4 className="privacy-subcol-title">{section.col2Title}</h4>
                        <div className="privacy-section-content">
                          {formatText(section.col2Content)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default PrivacyPage;
