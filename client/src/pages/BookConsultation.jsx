import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookConsultation.css';
import { API_BASE_URL } from '../apiConfig';

const BookConsultation = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const nameRegex = /^[a-zA-Z\s.'-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanPhone = (formData.phone || '').toString().replace(/[\s-]/g, '');

    if (!formData.name.trim() || !nameRegex.test(formData.name.trim())) {
      setErrorMsg('Please enter a valid Full Name without numbers or special characters.');
      return;
    }

    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMsg('Please enter a valid Email address.');
      return;
    }

    if (!cleanPhone || !/^[0-9]{7,15}$/.test(cleanPhone)) {
      setErrorMsg('Please enter a valid Phone Number containing only 7 to 15 digits.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          phone: cleanPhone,
          company: formData.company ? formData.company.trim() : '',
          service: formData.subject || 'General Consultation',
          date: new Date().toISOString().split('T')[0]
        })
      });

      const data = await res.json();
      if (res.ok) {
        navigate('/success', {
          state: {
            title: 'Consultation Booked',
            message: 'Thank you for reaching out! One of our experts will contact you shortly to schedule your free consultation.',
            returnLink: '/',
            returnText: 'Back to Home'
          }
        });
      } else {
        setErrorMsg(data.error || 'Failed to submit consultation request.');
      }
    } catch (err) {
      console.error('Error booking consultation:', err);
      setErrorMsg('Failed to connect to the server. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="book-page">
      <div className="container">
        <div className="book-form-container">
          <div className="book-header">
            <h1 className="section-title">Book a <span>Free Consultation</span></h1>
            <p>Ready to transform your business? Let's discuss your project.</p>
          </div>

          {errorMsg && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#ef4444',
              padding: '0.85rem 1.2rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontSize: '0.95rem'
            }}>
              {errorMsg}
            </div>
          )}

          <form className="book-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group half">
                <label>Full Name *</label>
                <input type="text" name="name" required onChange={handleChange} />
              </div>
              <div className="form-group half">
                <label>Email Address *</label>
                <input type="email" name="email" required onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>Company Name</label>
                <input type="text" name="company" onChange={handleChange} />
              </div>
              <div className="form-group half">
                <label>Phone Number *</label>
                <input type="tel" name="phone" required onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>What services are you interested in? *</label>
              <select name="subject" required onChange={handleChange}>
                <option value="">Select a service...</option>
                <option value="IT Consulting">IT Consulting</option>
                <option value="Salesforce Development">Salesforce Development</option>
                <option value="Web Development">Web Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-submit-wrapper">
              <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Booking...' : 'Book Consultation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookConsultation;
