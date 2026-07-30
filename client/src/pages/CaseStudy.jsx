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

// Process images
import consultationImg from '../assets/portfolio/consultation.png';
import planningImg from '../assets/portfolio/planning.png';
import developmentImg from '../assets/portfolio/development.png';
import testingImg from '../assets/portfolio/testing.png';
import deploymentImg from '../assets/portfolio/deployment.png';
import supportImg from '../assets/portfolio/support.png';

// Tech stack images
import nodeImg from '../assets/tech_logo/node.png';
import dockerImg from '../assets/tech_logo/docker.png';
import kubernetesImg from '../assets/tech_logo/kubernatives.png';
import reactImg from '../assets/tech_logo/react.png';
import awsImg from '../assets/tech_logo/aws.png';
import figmaImg from '../assets/tech_logo/figma.png';
import gcpImg from '../assets/tech_logo/gcp.png';
import linuxImg from '../assets/tech_logo/linux.png';
import mongoImg from '../assets/tech_logo/mongodb.png';
import mysqlImg from '../assets/tech_logo/mysql.png';
import phpImg from '../assets/tech_logo/php.png';
import azureImg from '../assets/tech_logo/azure.png';
import androidImg from '../assets/tech_logo/Android.png';
import appleImg from '../assets/tech_logo/Apple.png';
import arduinoImg from '../assets/tech_logo/Arduino.png';
import cppImg from '../assets/tech_logo/C++ (CPlusPlus).png';
import cypressImg from '../assets/tech_logo/Cypress.png';
import ethereumImg from '../assets/tech_logo/Ethereum.png';
import flutterImg from '../assets/tech_logo/Flutter.png';
import googleAdsImg from '../assets/tech_logo/Googleads.png';
import hardhatImg from '../assets/tech_logo/Hardhat.png';
import junitImg from '../assets/tech_logo/JUnit.png';
import javaImg from '../assets/tech_logo/Java.png';
import jestImg from '../assets/tech_logo/Jest.png';
import kotlinImg from '../assets/tech_logo/Kotlin.png';
import nginxImg from '../assets/tech_logo/NGINX.png';
import nextjsImg from '../assets/tech_logo/Next.js.png';
import oracleImg from '../assets/tech_logo/Oracle.png';
import pandasImg from '../assets/tech_logo/Pandas.png';
import paypalImg from '../assets/tech_logo/PayPal.png';
import postgresImg from '../assets/tech_logo/PostgresSQL.png';
import postmanImg from '../assets/tech_logo/Postman.png';
import pytorchImg from '../assets/tech_logo/PyTorch.png';
import pythonImg from '../assets/tech_logo/Python.png';
import raspberryImg from '../assets/tech_logo/Raspberry Pi.png';
import redisImg from '../assets/tech_logo/Redis.png';
import salesforceImg from '../assets/tech_logo/Salesforce.png';
import seleniumImg from '../assets/tech_logo/Selenium.png';
import shopifyImg from '../assets/tech_logo/Shopify.png';
import socketioImg from '../assets/tech_logo/Socket.io.png';
import solidityImg from '../assets/tech_logo/Solidity.png';
import stripeImg from '../assets/tech_logo/Stripe.png';
import swiftImg from '../assets/tech_logo/Swift.png';
import tensorflowImg from '../assets/tech_logo/TensorFlow.png';
import typescriptImg from '../assets/tech_logo/TypeScript.png';
import woocommerceImg from '../assets/tech_logo/WooCommerce.png';
import wordpressImg from '../assets/tech_logo/WordPress.png';
import githubImg from '../assets/tech_logo/github.png';
import metaAdsImg from '../assets/tech_logo/metaads.png';
import openaiImg from '../assets/tech_logo/openai.png';
import powerbiImg from '../assets/tech_logo/powerbi.png';
import cloudcomputingImg from '../assets/tech_logo/cloudcomputing.png';
import cybersecurityImg from '../assets/tech_logo/cybersecurity.png';
import sqlImg from '../assets/tech_logo/sql.png';
import pfsenseImg from '../assets/tech_logo/pfSense.png';
import clarityImg from '../assets/tech_logo/Clarity.png';
import grafanaImg from '../assets/tech_logo/Grafana.png';
import sqlalchemyImg from '../assets/tech_logo/SQLAlchemy.png';
import defaultUserImg from '../assets/contactus/user.png';

const localTechIcons = {
  'react': reactImg,
  'reactjs': reactImg,
  'react.js': reactImg,
  'react native': reactImg,
  'nextjs': nextjsImg,
  'next.js': nextjsImg,
  'node': nodeImg,
  'nodejs': nodeImg,
  'node.js': nodeImg,
  'aws': awsImg,
  'aws iot core': awsImg,
  'docker': dockerImg,
  'kubernetes': kubernetesImg,
  'figma': figmaImg,
  'gcp': gcpImg,
  'google cloud platform': gcpImg,
  'linux': linuxImg,
  'mongodb': mongoImg,
  'mysql': mysqlImg,
  'php': phpImg,
  'azure': azureImg,
  'microsoft azure': azureImg,
  'android': androidImg,
  'ios / android': androidImg,
  'ios': appleImg,
  'apple': appleImg,
  'arduino': arduinoImg,
  'c++': cppImg,
  'cpp': cppImg,
  'cplusplus': cppImg,
  'cypress': cypressImg,
  'ethereum': ethereumImg,
  'flutter': flutterImg,
  'google ads': googleAdsImg,
  'googleads': googleAdsImg,
  'hardhat': hardhatImg,
  'junit': junitImg,
  'java': javaImg,
  'jest': jestImg,
  'kotlin': kotlinImg,
  'nginx': nginxImg,
  'oracle db': oracleImg,
  'oracle': oracleImg,
  'oracle erp cloud': oracleImg,
  'pandas': pandasImg,
  'paypal': paypalImg,
  'postgresql': postgresImg,
  'postgres': postgresImg,
  'postman': postmanImg,
  'pytorch': pytorchImg,
  'python': pythonImg,
  'raspberry pi': raspberryImg,
  'redis': redisImg,
  'salesforce': salesforceImg,
  'sales cloud': salesforceImg,
  'selenium': seleniumImg,
  'shopify': shopifyImg,
  'socket.io': socketioImg,
  'solidity': solidityImg,
  'stripe': stripeImg,
  'swift': swiftImg,
  'tensorflow': tensorflowImg,
  'typescript': typescriptImg,
  'woocommerce': woocommerceImg,
  'wordpress': wordpressImg,
  'github': githubImg,
  'meta ads': metaAdsImg,
  'metaads': metaAdsImg,
  'openai': openaiImg,
  'powerbi': powerbiImg,
  'tableau': powerbiImg,
  'cloud computing': cloudcomputingImg,
  'cloud': cloudcomputingImg,
  'cyber security': cybersecurityImg,
  'cybersecurity': cybersecurityImg,
  'sql': sqlImg,
  'pfsense': pfsenseImg,
  'clarity': clarityImg,
  'grafana': grafanaImg,
  'sqlalchemy': sqlalchemyImg
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
    { name: 'Consultation', icon: <img src={consultationImg} alt="Consultation" style={{ width: '32px', height: '32px', objectFit: 'contain' }} /> },
    { name: 'Planning', icon: <img src={planningImg} alt="Planning" style={{ width: '32px', height: '32px', objectFit: 'contain' }} /> },
    { name: 'Development', icon: <img src={developmentImg} alt="Development" style={{ width: '32px', height: '32px', objectFit: 'contain' }} /> },
    { name: 'Testing', icon: <img src={testingImg} alt="Testing" style={{ width: '32px', height: '32px', objectFit: 'contain' }} /> },
    { name: 'Deployment', icon: <img src={deploymentImg} alt="Deployment" style={{ width: '32px', height: '32px', objectFit: 'contain' }} /> },
    { name: 'Support', icon: <img src={supportImg} alt="Support" style={{ width: '32px', height: '32px', objectFit: 'contain' }} /> }
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
