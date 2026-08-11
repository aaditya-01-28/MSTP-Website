import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

// Import 25 icons mapped to Services
import iconIT from '../assets/services/new25 8.png';
import iconSalesforce from '../assets/services/new25 3.png';
import iconWebDev from '../assets/services/new25 9.png';
import iconMobile from '../assets/services/mobile.png';
import iconDigital from '../assets/services/digital.png';
import iconSoftware from '../assets/services/software.png';

import iconAI from '../assets/services/ai.png';
import iconIoT from '../assets/services/iot 3.png';
import iconDatabase from '../assets/services/database.png';
import iconDataAnalytics from '../assets/services/new25 23.png';
import iconIndustrial from '../assets/services/new25 24.png';
import iconTesting from '../assets/services/new25 14.png';

import iconStaffing from '../assets/services/new25 21.png';
import iconPayment from '../assets/services/payment.png';
import iconCloud from '../assets/services/cloudhost.png';
import iconShopify from '../assets/services/shopify.png';
import iconOracle from '../assets/services/oracle.png';

import iconICO from '../assets/services/ico 2.png';
import iconToken from '../assets/services/token.png';
import iconWeb3 from '../assets/services/web3.png';
import iconDApp from '../assets/services/dapp.png';
import iconWallet from '../assets/services/wallet.png';
import iconExchange from '../assets/services/exchange.png';
import iconMLM from '../assets/services/mlm.png';
import iconDex from '../assets/services/dex 2.png';

const serviceCategories = [
  {
    title: 'FOUNDATION',
    items: [
      { path: '/services/it-services', name: 'IT Services', icon: iconIT },
      { path: '/services/salesforce-services', name: 'Salesforce Services', icon: iconSalesforce },
      { path: '/services/web-development', name: 'Web Development', icon: iconWebDev },
      { path: '/services/mobile-app', name: 'Mobile App Development', icon: iconMobile },
      { path: '/services/digital-marketing', name: 'Digital Marketing Services', icon: iconDigital },
      { path: '/services/software-development', name: 'Software Development', icon: iconSoftware }
    ]
  },
  {
    title: 'INNOVATION',
    items: [
      { path: '/services/ai-services', name: 'Artificial Intelligence', icon: iconAI },
      { path: '/services/iot', name: 'Internet Of Things', icon: iconIoT },
      { path: '/services/database-design', name: 'Database Design', icon: iconDatabase },
      { path: '/services/data-analytics', name: 'Data Analytics', icon: iconDataAnalytics },
      { path: '/services/industrial-automation', name: 'Industrial Automation', icon: iconIndustrial },
      { path: '/services/software-testing', name: 'Software Testing', icon: iconTesting }
    ]
  },
  {
    title: 'ENTERPRISE',
    items: [
      { path: '/services/staffing', name: 'Staffing & Payroll', icon: iconStaffing },
      { path: '/services/payment-gateway', name: 'Payment Gateway Service', icon: iconPayment },
      { path: '/services/cloud-hosting', name: 'Cloud & Hosting Service', icon: iconCloud },
      { path: '/services/shopify-wordpress', name: 'Shopify & Wordpress Development', icon: iconShopify },
      { path: '/services/oracle', name: 'Oracle Development & Consulting', icon: iconOracle }
    ]
  },
  {
    title: 'WEB3 SERVICES',
    items: [
      { path: '/services/ico', name: 'ICO Development', icon: iconICO },
      { path: '/services/token', name: 'Token Development', icon: iconToken },
      { path: '/services/web3', name: 'Web3 Development', icon: iconWeb3 },
      { path: '/services/dapp', name: 'DApp Development', icon: iconDApp },
      { path: '/services/wallet', name: 'Wallet Development', icon: iconWallet },
      { path: '/services/exchange', name: 'Exchange Development', icon: iconExchange },
      { path: '/services/mlm', name: 'MLM Software Development', icon: iconMLM },
      { path: '/services/dex', name: 'Dex Platform', icon: iconDex }
    ]
  }
];

const Navbar = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [forceCloseMegaMenu, setForceCloseMegaMenu] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  const handleServiceClick = () => {
    closeMobileMenu();
    setForceCloseMegaMenu(true);
    setTimeout(() => setForceCloseMegaMenu(false), 300);
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo">
          <Link to="/" onClick={closeMobileMenu}>
            <img src="/logo.jpeg" alt="MAATRSHRI Logo" className="logo-img" />
          </Link>
        </div>
        
        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMobileMenu}>Home</Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={closeMobileMenu}>About Us</Link>
          </li>
          
          {/* Desktop Services Dropdown */}
          <li 
            className="nav-item-dropdown desktop-services-item"
            onMouseLeave={() => setForceCloseMegaMenu(false)}
          >
            <Link to="/services/it-services" className={location.pathname.startsWith('/services') ? 'active' : ''} onClick={closeMobileMenu}>Services</Link>
            <div className={`mega-menu ${forceCloseMegaMenu ? 'force-close' : ''}`}>
              <div className="mega-menu-grid" onClick={handleServiceClick}>
                {serviceCategories.map((category, idx) => (
                  <div className="mega-menu-col" key={idx}>
                    <h4>{category.title}</h4>
                    <ul>
                      {category.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <Link to={item.path}>
                            <img src={item.icon} className="mega-icon" alt=""/> {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </li>

          {/* Mobile Services Accordion */}
          <li className="mobile-services-item">
            <button 
              type="button" 
              className={`mobile-services-toggle ${location.pathname.startsWith('/services') ? 'active' : ''}`}
              onClick={() => setIsMobileServicesOpen(prev => !prev)}
              aria-expanded={isMobileServicesOpen}
            >
              <span>Services</span>
              <ChevronDown 
                size={20} 
                className={`mobile-services-chevron ${isMobileServicesOpen ? 'rotated' : ''}`} 
              />
            </button>

            {isMobileServicesOpen && (
              <div className="mobile-services-accordion">
                {serviceCategories.map((category, catIdx) => (
                  <div className="mobile-category-group" key={catIdx}>
                    <div className="mobile-category-title">{category.title}</div>
                    <div className="mobile-category-list">
                      {category.items.map((item, itemIdx) => (
                        <Link 
                          key={itemIdx}
                          to={item.path}
                          className={`mobile-service-link ${location.pathname === item.path ? 'active' : ''}`}
                          onClick={closeMobileMenu}
                        >
                          <img src={item.icon} className="mega-icon" alt="" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </li>

          <li>
            <Link to="/portfolio" className={location.pathname.startsWith('/portfolio') ? 'active' : ''} onClick={closeMobileMenu}>Portfolio</Link>
          </li>
          <li>
            <Link to="/careers" className={location.pathname === '/careers' ? 'active' : ''} onClick={closeMobileMenu}>Careers</Link>
          </li>
          <li className="mobile-only-action">
            <Link to="/contact" className="btn btn-primary mobile-drawer-btn" onClick={closeMobileMenu}>Contact us</Link>
          </li>
        </ul>

        <div className="nav-action">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
          <Link to="/contact" className="btn btn-outline" onClick={closeMobileMenu}>Contact us</Link>
          <button 
            className="mobile-toggle-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
