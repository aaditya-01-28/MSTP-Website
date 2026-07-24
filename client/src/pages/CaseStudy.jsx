import { useParams, Navigate, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './CaseStudy.css';
import { API_BASE_URL } from '../apiConfig';
import { 
  FileText, Search, Layout, Code, PlayCircle, Rocket, 
  Monitor, RefreshCw, XCircle, Users, Quote
} from 'lucide-react';

import ekatrGif from '../assets/portfolio/एkatr Events.gif';
import constaGif from '../assets/portfolio/Consta AI Solutions.gif';
import aquaGif from '../assets/portfolio/myaquaplus.gif';
import satoshiGif from '../assets/portfolio/STF Gold.gif';
import rccmGif from '../assets/portfolio/BCCM Global_A2.gif';
import samraatGif from '../assets/portfolio/SAMRAAT LOGS_ A1.gif';

import figmaImg from '../assets/tech_logo/figma.png';
import reactImg from '../assets/tech_logo/react.png';
import nodeImg from '../assets/tech_logo/node.png';
import mongoImg from '../assets/tech_logo/mongodb.png';
import awsImg from '../assets/tech_logo/aws.png';
import dockerImg from '../assets/tech_logo/docker.png';
import defaultUserImg from '../assets/contactus/user.png';

const localTechIcons = {
  'figma': figmaImg,
  'react': reactImg,
  'node': nodeImg,
  'node.js': nodeImg,
  'nodejs': nodeImg,
  'mongodb': mongoImg,
  'aws': awsImg,
  'docker': dockerImg
};

const localPortfolioImages = {
  'ekatr': ekatrGif,
  'consta': constaGif,
  'samraat-logs': samraatGif,
  'aquaplus': aquaGif,
  'satoshifx': satoshiGif,
  'rccm-global': rccmGif
};

const CaseStudy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/portfolios`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === id);
        if (found) {
          setProject(found);
        } else {
          navigate('/portfolio');
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <div style={{paddingTop: '100px', textAlign: 'center'}}>Loading case study...</div>;
  if (!project) return null;

  // Icons for Challenge section
  const challengeIcons = [
    <Monitor size={32} strokeWidth={1.5} />,
    <RefreshCw size={32} strokeWidth={1.5} />,
    <XCircle size={32} strokeWidth={1.5} />,
    <Users size={32} strokeWidth={1.5} />
  ];

  // Icons for Process section
  const processSteps = [
    { name: 'Gathering Information', icon: <FileText size={24} /> },
    { name: 'Research', icon: <Search size={24} /> },
    { name: 'Design', icon: <Layout size={24} /> },
    { name: 'Development', icon: <Code size={24} /> },
    { name: 'Testing', icon: <PlayCircle size={24} /> },
    { name: 'Deploy', icon: <Rocket size={24} /> }
  ];

  const heroImage = project.image || localPortfolioImages[project.id];

  return (
    <div className="case-study-page">
      <div className="container" style={{paddingTop: '6rem', paddingBottom: '4rem'}}>
        
        {/* Header Section */}
        <div className="cs-header-grid">
          <div className="cs-header-text">
            <h1 className="cs-title">
              <span className="highlight-green">Case Study:</span> {project.title.split(' - ')[0]}
            </h1>
            <p className="cs-description">{project.description}</p>
          </div>
          <div className="cs-header-image">
            <img src={heroImage} alt={project.title} className="cs-hero-img" />
          </div>
        </div>

        {/* 01. Challenge */}
        <div className="cs-section">
          <h2 className="cs-section-title"><span className="highlight-green">01.</span> Challenge</h2>
          <div className="cs-challenge-grid">
            <div className="cs-challenge-text">
              <p>{project.challengeDescription}</p>
            </div>
            <div className="cs-challenge-icons">
              {project.challenges && project.challenges.map((challenge, idx) => (
                <div className="challenge-item" key={idx}>
                  <div className="challenge-icon-box">
                    {challengeIcons[idx % challengeIcons.length]}
                  </div>
                  <span>{challenge.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 02. Process */}
        <div className="cs-section">
          <h2 className="cs-section-title"><span className="highlight-green">02.</span> Process</h2>
          <div className="cs-process-flow">
            {processSteps.map((step, idx) => (
              <div className="process-step" key={idx}>
                <div className="process-icon-circle">
                  {step.icon}
                </div>
                <span className="process-name">{step.name}</span>
                {idx < processSteps.length - 1 && (
                  <div className="process-arrow">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 03. Tools Used */}
        <div className="cs-section">
          <h2 className="cs-section-title"><span className="highlight-green">03.</span> Tools Used</h2>
          <div className="cs-tools-grid">
            {project.tools && project.tools.map((tool, idx) => {
              const toolIcon = tool.icon || localTechIcons[tool.name?.toLowerCase()];
              return (
                <div className="tool-box" key={idx}>
                  {toolIcon ? (
                    <img src={toolIcon} alt={tool.name} style={{width: '60px', height: '60px', objectFit: 'contain', marginBottom: '0.5rem'}} />
                  ) : (
                    <div className="tool-logo-placeholder">
                      {tool.name ? tool.name.charAt(0) : 'T'}
                    </div>
                  )}
                  <span>{tool.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 04. Testimonial */}
        {project.testimonial && project.testimonial.text && (
          <div className="cs-section">
            <h2 className="cs-section-title"><span className="highlight-green">04.</span> Testimonial</h2>
            <div className="cs-testimonial-box">
              <div className="quote-icon-large">
                <Quote size={48} color="var(--accent-primary)" />
              </div>
              <p className="cs-testimonial-text">
                "{project.testimonial.text}"
              </p>
              <div className="cs-testimonial-author">
                <img 
                  src={(project.testimonial.avatar && project.testimonial.avatar.trim() !== '') ? project.testimonial.avatar : defaultUserImg} 
                  alt={project.testimonial.author} 
                  className="author-avatar" 
                />
                <div className="author-info">
                  <h4>{project.testimonial.author}</h4>
                  <span>{project.testimonial.role}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CaseStudy;
