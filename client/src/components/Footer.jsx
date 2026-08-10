import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import { API_BASE_URL } from '../apiConfig';
import './Footer.css';
import instaIcon from '../assets/home/insta.png';
import linkedinIcon from '../assets/home/linkdin.png';
import whatsappIcon from '../assets/home/whatsapp.png';

const Footer = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/settings`)
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(console.error);
  }, []);
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col">
          <h3 className="footer-heading">About MAATRSHRI</h3>
          <p className="footer-text">
            We are a trusted technology and business solutions company that helps organizations grow in the digital era through IT Services, IT Consulting, Staffing, Payroll, Outsourcing, and Digital Marketing solutions. The company also works across B2B markets and focuses on innovation and software development to meet global business needs.
          </p>
          <div className="social-links" style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
            <a href={settings?.socialLinks?.instagram || "https://www.instagram.com/_whitecirclegroup?igsh=dWljbTVoMnFlcXRq"} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src={instaIcon} alt="Instagram" style={{width: '32px', height: '32px', objectFit: 'contain'}} />
            </a>
            <a href={settings?.socialLinks?.linkedin || "https://www.linkedin.com/company/whitecircle-group/"} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src={linkedinIcon} alt="LinkedIn" style={{width: '32px', height: '32px', objectFit: 'contain'}} />
            </a>
            <a href={settings?.socialLinks?.whatsapp || "https://wa.me/message/4BLHTNLKXWDKG1"} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <img src={whatsappIcon} alt="WhatsApp" style={{width: '32px', height: '32px', objectFit: 'contain'}} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services/it-services">Services</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-heading">Connect With Us</h3>
          <ul className="contact-info">
            <li>
              <MapPin className="contact-icon" size={20} />
              <span>{settings?.contactAddress || 'Headquarter: Swastik Galaxy A Block, 1st Floor, Near Indra Square, Shahdol, MP'}</span>
            </li>
            <li>
              <Mail className="contact-icon" size={20} />
              <span>{settings?.contactEmail || 'hr@maatrshrigroup.in'}</span>
            </li>
            <li>
              <Phone className="contact-icon" size={20} />
              <span>{settings?.contactPhone || '+91 78987 69872'}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MAATRSHRI Group. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
