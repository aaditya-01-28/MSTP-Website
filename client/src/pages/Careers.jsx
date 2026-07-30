import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, HeartPulse, Laptop, TrendingUp, DollarSign, Search, Calendar, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import './Careers.css';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../apiConfig';

const Careers = () => {
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/careers`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(console.error);

    fetch(`${API_BASE_URL}/api/settings`)
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(console.error);
  }, []);

  const benefits = [
    {
      icon: <DollarSign size={24} />,
      title: 'Competitive Salary',
      desc: 'We offer industry-standard compensation with performance bonuses.'
    },
    {
      icon: <HeartPulse size={24} />,
      title: 'Health & Wellness',
      desc: 'Comprehensive medical insurance and wellness programs for you and your family.'
    },
    {
      icon: <Laptop size={24} />,
      title: 'Flexible Work',
      desc: 'Work from anywhere with our flexible remote and hybrid policies.'
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Career Growth',
      desc: 'Continuous learning opportunities, certifications, and clear career paths.'
    }
  ];

  const toggleJob = (id) => {
    setExpandedJobId(prev => prev === id ? null : id);
  };

  const publishedJobs = jobs.filter(job => job.status !== 'Draft');

  const filteredJobs = publishedJobs.filter(job => 
    job.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero section">
        <div className="container">
          <h1 className="section-title">Shape Your Future with <span>MAATRSHRI</span></h1>
          <p className="careers-subtitle">
            Be part of a global team that drives digital innovation, embraces challenges, and delivers excellence.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section section">
        <div className="container">
          <h2 className="section-title" style={{fontSize: '2rem'}}>Why work with us?</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, idx) => (
              <div className="benefit-card" key={idx}>
                <div className="benefit-icon">
                  {benefit.icon}
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles Section - Theme Aware Grid Layout */}
      <section className="jobs-section section">
        <div className="container">
          <h2 className="section-title" style={{fontSize: '2.5rem', marginBottom: '1rem'}}>Open Roles!</h2>
          
          <div className="jobs-search-bar">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search for job postings..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="jobs-search-input"
            />
          </div>

          <div className="job-boxes-grid">
            {filteredJobs.map((job) => {
              const uniqueKey = job._id || job.id;
              const displayId = job.id || job._id?.substring(0, 6) || '101';
              const isExpanded = expandedJobId === uniqueKey;

              return (
                <React.Fragment key={uniqueKey}>
                  {/* Unexpanded Dark Box */}
                  <div className={`job-box-card ${isExpanded ? 'active-box' : ''}`}>
                    <div className="job-box-header">
                      <span className="job-box-id"><Briefcase size={14} style={{marginRight: '6px'}}/> Job ID: <span style={{color: 'var(--accent-primary)'}}>{displayId}</span></span>
                      <span className="job-box-badge">{job.type}</span>
                    </div>
                    <h3 className="job-box-title">{job.title}</h3>
                    <div className="job-box-meta">
                      <span className="job-box-meta-item"><MapPin size={16}/> {job.location}</span>
                      <span className="job-box-meta-item"><Briefcase size={16}/> <span style={{color: 'var(--accent-primary)', marginRight: '4px'}}>{job.experience}</span> experience</span>
                    </div>
                    <div className="job-box-footer">
                      <button className="view-details-btn" onClick={() => toggleJob(uniqueKey)}>
                        {isExpanded ? 'Hide details' : 'View details'} <ArrowRight size={16} style={{marginLeft: '4px'}}/>
                      </button>
                      <Link to="/apply" state={{ job }} className="apply-now-btn-small">
                        Apply Now <ArrowRight size={16} style={{marginLeft: '4px'}}/>
                      </Link>
                    </div>
                  </div>

                  {/* Expanded Details Accordion */}
                  {isExpanded && (
                    <div className="job-expanded-view">
                      
                      <div className="job-list-header-expanded">
                        <div className="job-list-title-area">
                          <h3 className="job-list-title-exp">J{displayId} - {job.title}</h3>
                          <div className="job-list-department-exp">
                            <Briefcase size={14} style={{marginRight: '6px'}} /> 
                            {job.department}
                          </div>
                        </div>
                        <div className="job-list-meta-area-exp">
                          <span className="meta-badge-exp"><Briefcase size={14} /> {job.experience}</span>
                          <span className="meta-badge-exp"><MapPin size={14} /> {job.location}</span>
                          <span className="meta-badge-exp"><Calendar size={14} /> {job.date}</span>
                          <button className="collapse-btn" onClick={() => setExpandedJobId(null)}>
                             <ChevronUp size={20} className="expand-icon-exp" />
                          </button>
                        </div>
                      </div>

                    <div className="job-list-details-exp">
                      
                      {/* About Us Inside Job */}
                      <div className="details-section">
                        <h4>About Us</h4>
                        <p>
                          {settings.aboutUsText || 'At MAATRSHRI, we are more than just a technology provider; we are architects of the digital future...'}
                        </p>
                      </div>

                      <div className="details-section">
                        <h4>Job Details</h4>
                        <p>{job.title}</p>
                        <p>{job.department}</p>
                        <p>{job.experience}</p>
                        <p>{job.location}</p>
                        <p>{job.date}</p>
                      </div>

                      <div className="details-section">
                        <h4>Job Description</h4>
                        <p>{job.description}</p>
                      </div>

                      <div className="details-section">
                        <h4>Primary Skills</h4>
                        <p>{job.primarySkills}</p>
                      </div>

                      <div className="details-section">
                        <h4>Secondary Skills</h4>
                        <p>{job.secondarySkills}</p>
                      </div>

                      <div className="details-section">
                        <h4>Job Overview</h4>
                        <p>{job.overview}</p>
                      </div>

                      <div className="details-section">
                        <h4>Eligibility Criteria</h4>
                        <p>{job.eligibility}</p>
                      </div>

                      <div className="job-action-buttons">
                        <button className="btn btn-outline" onClick={() => setExpandedJobId(null)}>Cancel</button>
                        <Link to="/apply" state={{ job }} className="btn btn-primary" style={{textDecoration: 'none'}}>Apply</Link>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
            
            {filteredJobs.length === 0 && (
              <div style={{textAlign: 'center', padding: '3rem', color: '#94a3b8', gridColumn: '1 / -1'}}>
                No jobs found matching your search.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
