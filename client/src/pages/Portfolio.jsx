import React, { useState, useEffect } from 'react';
import { ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Portfolio.css';
import { API_BASE_URL } from '../apiConfig';

import ekatrGif from '../assets/portfolio/एkatr Events.gif';
import constaGif from '../assets/portfolio/Consta AI Solutions.gif';
import aquaGif from '../assets/portfolio/myaquaplus.gif';
import satoshiGif from '../assets/portfolio/STF Gold.gif';
import rccmGif from '../assets/portfolio/BCCM Global_A2.gif';
import samraatGif from '../assets/portfolio/SAMRAAT LOGS_ A1.gif';

const localPortfolioImages = {
  'ekatr': ekatrGif,
  'consta': constaGif,
  'samraat-logs': samraatGif,
  'aquaplus': aquaGif,
  'satoshifx': satoshiGif,
  'rccm-global': rccmGif
};

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/portfolios`)
      .then(res => res.json())
      .then(data => setPortfolios(data))
      .catch(console.error);
  }, []);

  return (
    <div className="portfolio-page">
      <div className="container" style={{paddingTop: '4rem', paddingBottom: '4rem'}}>
        <h2 className="portfolio-main-title">Delivered by MAATRSHRI Group</h2>
        
        <div className="portfolio-grid">
          {portfolios.map((project) => {
            const projectImg = project.image || localPortfolioImages[project.id];
            return (
              <div className="portfolio-item" key={project.id || project._id}>
                <h3 className="portfolio-item-title">{project.title}</h3>
                <Link to={`/portfolio/${project.id}`} className="portfolio-image-link">
                  <img src={projectImg} alt={project.title} className="portfolio-image" />
                  <div className="portfolio-overlay">
                    <span className="view-case-study">View Case Study <ArrowRight size={16} /></span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="portfolio-cta-section">
          <div className="cta-content">
            <h2 className="cta-heading">
              Let's turn your idea into<br />a <span className="highlight-green">real-life product.</span>
            </h2>
            <Link to="/contact" className="btn btn-green">
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--bg-primary)', padding: '0.3rem', borderRadius: '50%', color: 'var(--accent-primary)'}}>
                <ArrowRight size={16} />
              </div>
              Get In Touch
              <ArrowRight size={16} style={{marginLeft: 'auto'}} />
            </Link>
          </div>
          <div className="cta-graphic">
            <div className="idea-illustration">
              <div className="idea-card-inner">
                <div className="idea-glow-circle"></div>
                <div className="idea-icon-badge">
                  <Lightbulb size={40} className="bulb-glow" />
                </div>
                <div className="idea-card-content">
                  <span className="idea-pill">
                    <Sparkles size={14} /> Innovate & Scale
                  </span>
                  <h3>Turn Ideas Into Reality</h3>
                  <p>Custom IT, AI & Cloud solutions engineered for continuous growth.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
           <Link to="/book" className="btn btn-primary" style={{padding: '0.8rem 2rem'}}>Book Consultation</Link>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
