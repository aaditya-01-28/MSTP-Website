import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
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

const Navbar = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [forceCloseMegaMenu, setForceCloseMegaMenu] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
          <li 
            className="nav-item-dropdown"
            onMouseLeave={() => setForceCloseMegaMenu(false)}
          >
            <Link to="/services/it-services" className={location.pathname.startsWith('/services') ? 'active' : ''} onClick={closeMobileMenu}>Services</Link>
            <div className={`mega-menu ${forceCloseMegaMenu ? 'force-close' : ''}`}>
              <div className="mega-menu-grid" onClick={handleServiceClick}>
                
                <div className="mega-menu-col">
                  <h4>FOUNDATION</h4>
                  <ul>
                    <li><Link to="/services/it-services"><img src={iconIT} className="mega-icon" alt=""/> IT Services</Link></li>
                    <li><Link to="/services/salesforce-services"><img src={iconSalesforce} className="mega-icon" alt=""/> Salesforce Services</Link></li>
                    <li><Link to="/services/web-development"><img src={iconWebDev} className="mega-icon" alt=""/> Web Development</Link></li>
                    <li><Link to="/services/mobile-app"><img src={iconMobile} className="mega-icon" alt=""/> Mobile App Development</Link></li>
                    <li><Link to="/services/digital-marketing"><img src={iconDigital} className="mega-icon" alt=""/> Digital Marketing Services</Link></li>
                    <li><Link to="/services/software-development"><img src={iconSoftware} className="mega-icon" alt=""/> Software Development</Link></li>
                  </ul>
                </div>

                <div className="mega-menu-col">
                  <h4>INNOVATION</h4>
                  <ul>
                    <li><Link to="/services/ai-services"><img src={iconAI} className="mega-icon" alt=""/> Artificial Intelligence</Link></li>
                    <li><Link to="/services/iot"><img src={iconIoT} className="mega-icon" alt=""/> Internet Of Things</Link></li>
                    <li><Link to="/services/database-design"><img src={iconDatabase} className="mega-icon" alt=""/> Database Design</Link></li>
                    <li><Link to="/services/data-analytics"><img src={iconDataAnalytics} className="mega-icon" alt=""/> Data Analytics</Link></li>
                    <li><Link to="/services/industrial-automation"><img src={iconIndustrial} className="mega-icon" alt=""/> Industrial Automation</Link></li>
                    <li><Link to="/services/software-testing"><img src={iconTesting} className="mega-icon" alt=""/> Software Testing</Link></li>
                  </ul>
                </div>

                <div className="mega-menu-col">
                  <h4>ENTERPRISE</h4>
                  <ul>
                    <li><Link to="/services/staffing"><img src={iconStaffing} className="mega-icon" alt=""/> Staffing & Payroll</Link></li>
                    <li><Link to="/services/payment-gateway"><img src={iconPayment} className="mega-icon" alt=""/> Payment Gateway Service</Link></li>
                    <li><Link to="/services/cloud-hosting"><img src={iconCloud} className="mega-icon" alt=""/> Cloud & Hosting Service</Link></li>
                    <li><Link to="/services/shopify-wordpress"><img src={iconShopify} className="mega-icon" alt=""/> Shopify & Wordpress Development</Link></li>
                    <li><Link to="/services/oracle"><img src={iconOracle} className="mega-icon" alt=""/> Oracle Development & Consulting</Link></li>
                  </ul>
                </div>

                <div className="mega-menu-col">
                  <h4>WEB3 SERVICES</h4>
                  <ul>
                    <li><Link to="/services/ico"><img src={iconICO} className="mega-icon" alt=""/> ICO Development</Link></li>
                    <li><Link to="/services/token"><img src={iconToken} className="mega-icon" alt=""/> Token Development</Link></li>
                    <li><Link to="/services/web3"><img src={iconWeb3} className="mega-icon" alt=""/> Web3 Development</Link></li>
                    <li><Link to="/services/dapp"><img src={iconDApp} className="mega-icon" alt=""/> DApp Development</Link></li>
                    <li><Link to="/services/wallet"><img src={iconWallet} className="mega-icon" alt=""/> Wallet Development</Link></li>
                    <li><Link to="/services/exchange"><img src={iconExchange} className="mega-icon" alt=""/> Exchange Development</Link></li>
                    <li><Link to="/services/mlm"><img src={iconMLM} className="mega-icon" alt=""/> MLM Software Development</Link></li>
                    <li><Link to="/services/dex"><img src={iconDex} className="mega-icon" alt=""/> Dex Platform</Link></li>
                  </ul>
                </div>

              </div>
            </div>
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
