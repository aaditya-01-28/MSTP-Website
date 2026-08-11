import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';
import { API_BASE_URL } from '../apiConfig';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState(null); // 'submitting', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const nameRegex = /^[a-zA-Z\s.'-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim() || !nameRegex.test(formData.name.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid Name without numbers or special characters.');
      return;
    }

    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid Email address.');
      return;
    }

    if (!formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your message.');
      return;
    }

    setStatus('submitting');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          subject: formData.subject ? formData.subject.trim() : 'General Inquiry',
          message: formData.message.trim()
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // reset
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Contact submit error:', error);
      setStatus('error');
      setErrorMessage('Failed to connect to the server. Please check your connection.');
    }
  };

  return (
    <div className="contact-page">
      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            
            {/* Contact Info (Left Column) */}
            <div className="contact-info-panel">
              <h2 className="section-title" style={{textAlign: 'left', marginBottom: '1.5rem'}}>Get In <span>Touch</span></h2>
              <p className="contact-subtitle">
                Have questions about our services? Ready to start your digital transformation? Contact our team today.
              </p>
              
              <div className="map-container">
                <iframe 
                  src="https://maps.google.com/maps?q=White+Circle+Group,Shahdol&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="250" 
                  style={{border: 0, borderRadius: '8px', marginBottom: '2rem'}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="White Circle Group Office Location"
                ></iframe>
              </div>

              <ul className="contact-details">
                <li>
                  <div className="contact-icon-wrapper"><Phone size={20} /></div>
                  <div>
                    <p>+91 78987 69872</p>
                  </div>
                </li>
                <li>
                  <div className="contact-icon-wrapper"><Mail size={20} /></div>
                  <div>
                    <p>hr@maatrshrigroup.in</p>
                  </div>
                </li>
                <li>
                  <div className="contact-icon-wrapper"><MapPin size={20} /></div>
                  <div>
                    <p>Swastik Galaxy A Block, 1st Floor, Near Indra Square, Shahdol, MP</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Contact Form (Right Column) */}
            <div className="contact-form-panel">
              <div className="form-card" style={{backgroundColor: 'rgba(59, 130, 246, 0.05)', border: 'none'}}>
                <h3 style={{marginBottom: '1.5rem'}}>Get In Touch</h3>
                
                {status === 'success' && (
                  <div className="alert success">
                    Thank you! Your message has been sent successfully. We will get back to you soon.
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="alert error">
                    {errorMessage}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row" style={{display: 'flex', gap: '1rem'}}>
                    <div className="form-group" style={{flex: 1}}>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Name" />
                    </div>
                    <div className="form-group" style={{flex: 1}}>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" />
                  </div>
                  
                  <div className="form-group">
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" placeholder="Your message here..."></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary submit-btn" style={{border: 'none'}} disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
