import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import ServiceTemplate from './components/ServiceTemplate';
import ApplyForm from './pages/ApplyForm';
import SuccessPage from './pages/SuccessPage';
import BookConsultation from './pages/BookConsultation';
import PrivacyPage from './pages/PrivacyPage';
import Portfolio from './pages/Portfolio';
import CaseStudy from './pages/CaseStudy';
import Testimonials from './components/Testimonials';
import { servicesData } from './data/servicesData';
import AdminLogin from './pages/admin/AdminLogin';
import AdminPanel from './pages/admin/AdminPanel';
import { API_BASE_URL } from './apiConfig';

// Component to scroll to top automatically on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

function AppContent({ theme, toggleTheme }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/services`)
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(console.error);
  }, []);

  return (
    <div className="app-container">
      {!isAdmin && <Navbar theme={theme} toggleTheme={toggleTheme} />}
      <main>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:id" element={<CaseStudy />} />
            <Route path="/services/:serviceId" element={<ServiceTemplate />} />
            <Route path="/apply" element={<ApplyForm />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/book" element={<BookConsultation />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/testimonials" element={<div style={{paddingTop: '80px', minHeight: '80vh', backgroundColor: 'var(--bg-primary)'}}><Testimonials /></div>} />
            
            {/* Index route for all services */}
            <Route path="/services" element={
              <div className="section container" style={{paddingTop: '100px', minHeight: '60vh'}}>
                <h1 className="section-title">Our Services</h1>
                <p style={{textAlign: 'center', marginBottom: '3rem', color: 'var(--text-secondary)'}}>
                  Comprehensive digital solutions to drive your business forward.
                </p>
                <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center'}}>
                  {services.map((service) => (
                    <Link key={service.id} to={`/services/${service.id}`} className="btn btn-outline" style={{margin: '0.5rem'}}>
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminPanel theme={theme} toggleTheme={toggleTheme} />} />
          </Routes>
        </main>
        {!isAdmin && <Footer />}
      </div>
  );
}

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <ScrollToTop />
      <AppContent theme={theme} toggleTheme={toggleTheme} />
    </Router>
  );
}

export default App;
