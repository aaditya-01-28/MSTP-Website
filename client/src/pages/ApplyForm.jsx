import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Briefcase, MapPin, Calendar, Clock, UploadCloud, 
  CheckCircle2, Info, User, Mail, Phone, Globe, Building, 
  FileText, ArrowLeft 
} from 'lucide-react';
import './ApplyForm.css';
import { API_BASE_URL } from '../apiConfig';

const GithubIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const formatExperience = (exp) => {
  if (!exp) return '';
  const trimmed = exp.toString().trim();
  if (/\b(year|years|yr|yrs)\b/i.test(trimmed)) {
    return trimmed;
  }
  const num = parseFloat(trimmed);
  if (!isNaN(num)) {
    return `${num} ${num === 1 ? 'Year' : 'Years'}`;
  }
  return `${trimmed} Years`;
};

const defaultJob = {
  id: '100',
  title: 'Software developer (SDE-1)',
  department: 'Product and Platform Engineering',
  type: 'Full-time',
  experience: '0-2 years',
  location: 'Bhopal, India',
  date: '30/06/2026',
  description: 'Extensive experience in Java programming, demonstrating advanced proficiency in developing scalable applications. You will be responsible for building robust backend systems and integrating with microservices.',
  primarySkills: 'Java Backend, Java, Python',
  secondarySkills: 'Java + spring boot + Microservices, SQL',
  overview: 'JD Focus: Strong CS fundamentals, coding, and data structures skills - Freshers from IITs, NITs, BITS, IIITs, and Other Premier Institutes only.',
  eligibility: 'Candidates must have a CGPA of 7.5 and above. CGPA score is mandatory on the resume. Profiles without CGPA mentioned will not be considered.'
};

const countryCodes = [
  { code: '+91', label: '🇮🇳 +91 (India)' },
  { code: '+1', label: '🇺🇸 +1 (USA/Canada)' },
  { code: '+44', label: '🇬🇧 +44 (UK)' },
  { code: '+971', label: '🇦🇪 +971 (UAE)' },
  { code: '+61', label: '🇦🇺 +61 (Australia)' },
  { code: '+49', label: '🇩🇪 +49 (Germany)' },
  { code: '+33', label: '🇫🇷 +33 (France)' },
  { code: '+65', label: '🇸🇬 +65 (Singapore)' }
];

const ApplyForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedJob = location.state?.job || {
    id: '100',
    title: 'Software developer (SDE-1)',
    department: 'Product and Platform Engineering',
    type: 'Full-time',
    experience: '0-2 years',
    location: 'Bhopal, India',
    date: '30/06/2026',
    description: 'Extensive experience in Java programming, demonstrating advanced proficiency in developing scalable applications. You will be responsible for building robust backend systems and integrating with microservices.',
    primarySkills: 'Java Backend, Java, Python',
    secondarySkills: 'Java + spring boot + Microservices, SQL',
    overview: 'JD Focus: Strong CS fundamentals, coding, and data structures skills - Freshers from IITs, NITs, BITS, IIITs, and Other Premier Institutes only.',
    eligibility: 'Candidates must have a CGPA of 7.5 and above. CGPA score is mandatory on the resume. Profiles without CGPA mentioned will not be considered.'
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    country: 'India',
    city: '',
    coverLetter: '',
    githubUrl: '',
    linkedinUrl: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrorMsg('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Validations
    const nameRegex = /^[a-zA-Z\s.'-]+$/;
    const cityRegex = /^[a-zA-Z\s.'-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanPhone = (formData.phone || '').toString().replace(/[\s-]/g, '');

    if (!formData.firstName.trim() || !nameRegex.test(formData.firstName.trim())) {
      setErrorMsg('Please enter a valid First Name without numbers or special characters.');
      return;
    }

    if (!formData.lastName.trim() || !nameRegex.test(formData.lastName.trim())) {
      setErrorMsg('Please enter a valid Last Name without numbers or special characters.');
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

    if (!formData.country.trim() || !nameRegex.test(formData.country.trim())) {
      setErrorMsg('Please enter a valid Country name without numbers or special characters.');
      return;
    }

    if (!formData.city.trim() || !cityRegex.test(formData.city.trim())) {
      setErrorMsg('Please enter a valid City name without numbers or special characters.');
      return;
    }

    if (!file) {
      setErrorMsg('Please upload your CV/Resume to proceed.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        jobTitle: selectedJob.title,
        jobId: selectedJob.id,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.toLowerCase().trim(),
        countryCode: formData.countryCode,
        phone: cleanPhone,
        country: formData.country.trim(),
        city: formData.city.trim(),
        resumeName: file.name,
        coverLetter: formData.coverLetter ? formData.coverLetter.trim() : '',
        githubUrl: formData.githubUrl ? formData.githubUrl.trim() : '',
        linkedinUrl: formData.linkedinUrl ? formData.linkedinUrl.trim() : ''
      };

      const response = await fetch(`${API_BASE_URL}/api/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/success', {
          state: {
            title: 'Application Submitted Successfully!',
            message: `Thank you ${formData.firstName}! Your application for "${selectedJob.title}" has been submitted successfully and saved to our database. A confirmation email has been sent to ${formData.email}.`,
            returnLink: '/careers',
            returnText: 'Back to Careers'
          }
        });
      } else {
        setErrorMsg(data.error || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMsg('Network error. Please make sure the server is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="apply-page">
      <div className="container">
        
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate('/careers')}>
          <ArrowLeft size={18} /> Back to Open Roles
        </button>

        {/* Job Header & Details Layout */}
        <div className="job-detail-layout">
          
          {/* Left Main Column: Full Job Description */}
          <div className="job-main-content">
            
            {/* Header Title */}
            <div className="job-title-card">
              <h1 className="job-title-header">
                J{selectedJob.id} - {selectedJob.title}
              </h1>
              <div className="job-meta-bar">
                <span className="job-meta-tag"><Briefcase size={15} /> {selectedJob.department}</span>
                <span className="job-meta-tag"><Clock size={15} /> {formatExperience(selectedJob.experience)}</span>
                <span className="job-meta-tag"><MapPin size={15} /> {selectedJob.location}</span>
                <span className="job-meta-tag"><Calendar size={15} /> {selectedJob.date}</span>
              </div>
            </div>

            {/* About Us */}
            <div className="jd-section">
              <h3 className="jd-section-title">About Us</h3>
              <p className="jd-text">
                At MAATRSHRI, we are more than just a technology provider; we are architects of the digital future. We have partnered with global enterprises to solve complex business challenges through cutting-edge IT solutions, strategic consulting, and robust engineering. We foster a culture of continuous innovation, where bold ideas are encouraged and talent is nurtured. Join us to build a career that truly matters.
              </p>
            </div>

            {/* Job Description */}
            <div className="jd-section">
              <h3 className="jd-section-title">Job Description</h3>
              <p className="jd-text">{selectedJob.description}</p>
            </div>

            {/* Primary Skills */}
            {selectedJob.primarySkills && (
              <div className="jd-section">
                <h3 className="jd-section-title">Primary Skills</h3>
                <p className="jd-text">{selectedJob.primarySkills}</p>
              </div>
            )}

            {/* Secondary Skills */}
            {selectedJob.secondarySkills && (
              <div className="jd-section">
                <h3 className="jd-section-title">Secondary Skills</h3>
                <p className="jd-text">{selectedJob.secondarySkills}</p>
              </div>
            )}

            {/* Job Overview */}
            {selectedJob.overview && (
              <div className="jd-section">
                <h3 className="jd-section-title">Job Overview</h3>
                <p className="jd-text">{selectedJob.overview}</p>
              </div>
            )}

            {/* Eligibility Criteria */}
            {selectedJob.eligibility && (
              <div className="jd-section">
                <h3 className="jd-section-title">Eligibility Criteria</h3>
                <p className="jd-text">{selectedJob.eligibility}</p>
              </div>
            )}

          </div>

          {/* Right Column: Key Information Card */}
          <div className="job-sidebar">
            <div className="key-info-card">
              <div className="key-info-header">
                <Info size={20} className="key-info-icon" />
                <h2>Key Information</h2>
              </div>

              <div className="key-info-body">
                <div className="key-info-item">
                  <span className="key-label">Job Role</span>
                  <span className="key-value">{selectedJob.title}</span>
                </div>

                <div className="key-info-item">
                  <span className="key-label">Job Type</span>
                  <span className="key-value badge-type">{selectedJob.type}</span>
                </div>

                <div className="key-info-item">
                  <span className="key-label">Location</span>
                  <span className="key-value">{selectedJob.location}</span>
                </div>

                <div className="key-info-item">
                  <span className="key-label">Experience</span>
                  <span className="key-value">{formatExperience(selectedJob.experience)}</span>
                </div>

                <div className="key-info-item">
                  <span className="key-label">Department</span>
                  <span className="key-value">{selectedJob.department}</span>
                </div>

                <div className="key-info-item">
                  <span className="key-label">Deadline / Date</span>
                  <span className="key-value">{selectedJob.date}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Below Job Description: Application Form */}
        <div className="apply-form-wrapper">
          <div className="apply-form-card">
            
            <div className="form-header-banner">
              <h2 className="form-banner-title">JOB APPLICATION FORM</h2>
              <p className="form-banner-sub">Please fill out the form below to submit your application for <strong>{selectedJob.title}</strong>.</p>
            </div>

            {errorMsg && (
              <div className="form-error-alert">
                {errorMsg}
              </div>
            )}

            <form className="redesigned-apply-form" onSubmit={handleSubmit}>
              
              {/* Row 1: First Name & Last Name */}
              <div className="form-row-2col">
                <div className="form-field">
                  <label>First Name <span className="req-star">*</span></label>
                  <div className="input-with-icon">
                    <User size={18} className="field-icon" />
                    <input 
                      type="text" 
                      name="firstName" 
                      required 
                      value={formData.firstName}
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Last Name <span className="req-star">*</span></label>
                  <div className="input-with-icon">
                    <User size={18} className="field-icon" />
                    <input 
                      type="text" 
                      name="lastName" 
                      required 
                      value={formData.lastName}
                      onChange={handleChange} 
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Email & Phone Number with Country Code */}
              <div className="form-row-2col">
                <div className="form-field">
                  <label>Email Address <span className="req-star">*</span></label>
                  <div className="input-with-icon">
                    <Mail size={18} className="field-icon" />
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Phone Number <span className="req-star">*</span></label>
                  <div className="phone-input-group">
                    <select 
                      name="countryCode" 
                      value={formData.countryCode} 
                      onChange={handleChange}
                      className="country-code-select"
                    >
                      {countryCodes.map((c, idx) => (
                        <option key={idx} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone}
                      onChange={handleChange} 
                      className="phone-number-input"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Country & City */}
              <div className="form-row-2col">
                <div className="form-field">
                  <label>Country <span className="req-star">*</span></label>
                  <div className="input-with-icon">
                    <Globe size={18} className="field-icon" />
                    <input 
                      type="text" 
                      name="country" 
                      required 
                      value={formData.country}
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>City <span className="req-star">*</span></label>
                  <div className="input-with-icon">
                    <Building size={18} className="field-icon" />
                    <input 
                      type="text" 
                      name="city" 
                      required 
                      value={formData.city}
                      onChange={handleChange} 
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Upload CV / Resume */}
              <div className="form-field full-width">
                <label>Upload CV / Resume <span className="req-star">*</span></label>
                <div className="upload-dropzone">
                  <UploadCloud size={36} className="dropzone-icon" />
                  {file ? (
                    <div className="file-success-preview">
                      <CheckCircle2 size={24} color="#10b981" />
                      <span className="file-name-text">{file.name}</span>
                      <span className="file-size-text">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                    </div>
                  ) : (
                    <>
                      <p className="dropzone-title">Drag & drop your CV/Resume here or click to browse</p>
                      <span className="dropzone-hint">Supported formats: PDF, DOC, DOCX (Max 5MB)</span>
                    </>
                  )}
                  <input 
                    type="file" 
                    required={!file} 
                    accept=".pdf,.doc,.docx" 
                    className="dropzone-file-input" 
                    onChange={handleFileChange} 
                  />
                </div>
              </div>

              {/* Row 5: Cover Letter (Optional) */}
              <div className="form-field full-width">
                <label>Cover Letter <span className="opt-tag">(Optional)</span></label>
                <div className="textarea-with-icon">
                  <FileText size={18} className="textarea-icon" />
                  <textarea 
                    name="coverLetter" 
                    rows={4} 
                    value={formData.coverLetter}
                    onChange={handleChange} 
                  />
                </div>
              </div>

              {/* Row 6: GitHub & LinkedIn URLs (Optional) */}
              <div className="form-row-2col">
                <div className="form-field">
                  <label>GitHub URL <span className="opt-tag">(Optional)</span></label>
                  <div className="input-with-icon">
                    <GithubIcon size={18} className="field-icon" />
                    <input 
                      type="url" 
                      name="githubUrl" 
                      value={formData.githubUrl}
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>LinkedIn URL <span className="opt-tag">(Optional)</span></label>
                  <div className="input-with-icon">
                    <LinkedinIcon size={18} className="field-icon" />
                    <input 
                      type="url" 
                      name="linkedinUrl" 
                      value={formData.linkedinUrl}
                      onChange={handleChange} 
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="submit-btn-wrapper">
                <button 
                  type="submit" 
                  className="btn-submit-application" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <span>Submit Application</span>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ApplyForm;
