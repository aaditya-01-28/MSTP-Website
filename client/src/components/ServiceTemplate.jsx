import { useParams, useNavigate } from 'react';
import { CheckCircle2, Code2, MessageSquare, LayoutList, TestTube, Rocket, Settings, Cpu } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import './ServiceTemplate.css';
import { API_BASE_URL } from '../apiConfig';
import { servicesData } from '../data/servicesData';

import gifIT from '../assets/services/it service F.gif';
import gifSalesforce from '../assets/services/Salesforce-F.gif';
import gifWebDev from '../assets/services/WEB_D_F.gif';
import gifDigital from '../assets/services/Digital_ F.gif';
import gifSoftwareDev from '../assets/services/Software dev-F.gif';
import gifAI from '../assets/services/AI F.gif';
import gifIOT from '../assets/services/IOT-F.gif';
import gifDatabase from '../assets/services/Database F.gif';
import gifDataAnalytics from '../assets/services/Data analytics-F.gif';
import gifIndustrial from '../assets/services/industrial_auto F.gif';
import gifSoftwareTesting from '../assets/services/software testing F.gif';
import gifStaffing from '../assets/services/Staffing Payroll F.gif';
import gifPayment from '../assets/services/Payment Gateway F.gif';
import gifCloud from '../assets/services/cloud F.gif';
import gifWordpress from '../assets/services/Wordpress F.gif';
import gifOracle from '../assets/services/Oracle F.gif';
import gifICO from '../assets/services/ico dev F.gif';
import gifToken from '../assets/services/Token F.gif';
import gifWeb3 from '../assets/services/Web3 F.gif';
import gifDApp from '../assets/services/Decentralized app F.gif';
import gifWallet from '../assets/services/Wallet F.gif';
import gifExchange from '../assets/services/Exchange F.gif';
import gifMLM from '../assets/services/MLM F.gif';
import gifDex from '../assets/services/Dex Plat F.gif';

const localServiceIcons = {
  'it-services': gifIT,
  'salesforce-services': gifSalesforce,
  'web-development': gifWebDev,
  'mobile-app': gifSoftwareDev,
  'digital-marketing': gifDigital,
  'software-development': gifSoftwareDev,
  'ai-services': gifAI,
  'iot': gifIOT,
  'database-design': gifDatabase,
  'data-analytics': gifDataAnalytics,
  'industrial-automation': gifIndustrial,
  'software-testing': gifSoftwareTesting,
  'staffing': gifStaffing,
  'payment-gateway': gifPayment,
  'cloud-hosting': gifCloud,
  'shopify-wordpress': gifWordpress,
  'oracle': gifOracle,
  'ico': gifICO,
  'token': gifToken,
  'web3': gifWeb3,
  'dapp': gifDApp,
  'wallet': gifWallet,
  'exchange': gifExchange,
  'mlm': gifMLM,
  'dex': gifDex
};

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

const localTechIcons = {
  'react': reactImg,
  'reactjs': reactImg,
  'react.js': reactImg,
  'react native': reactImg,
  'nextjs': reactImg,
  'next.js': reactImg,
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
  'microsoft azure': azureImg
};

const processIcons = [
  <MessageSquare size={48} strokeWidth={1.5} />,
  <LayoutList size={48} strokeWidth={1.5} />,
  <Code2 size={48} strokeWidth={1.5} />,
  <TestTube size={48} strokeWidth={1.5} />,
  <Rocket size={48} strokeWidth={1.5} />,
  <Settings size={48} strokeWidth={1.5} />
];

const ServiceTemplate = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/services`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(s => s.id === serviceId);
        if (found) {
          setService(found);
        } else if (servicesData[serviceId]) {
          setService({ id: serviceId, ...servicesData[serviceId] });
        } else {
          navigate('/services');
        }
      })
      .catch(() => {
        if (servicesData[serviceId]) {
          setService({ id: serviceId, ...servicesData[serviceId] });
        } else {
          navigate('/services');
        }
      })
      .finally(() => setLoading(false));
  }, [serviceId, navigate]);

  if (loading) return <div style={{paddingTop: '120px', textAlign: 'center', minHeight: '60vh'}}>Loading service details...</div>;
  if (!service) return null;

  const heroImage = service.icon || localServiceIcons[service.id];

  return (
    <div className="service-page">
      {/* Hero Section */}
      <section className="service-hero" style={{ padding: 0, borderBottom: 'none' }}>
        {heroImage ? (
          <div style={{ width: '100%', height: '380px', overflow: 'hidden', backgroundColor: 'var(--bg-tertiary)' }}>
            <img src={heroImage} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
          </div>
        ) : (
          <div className="container service-hero-content" style={{ padding: '5rem 0' }}>
            <div className="service-hero-graphic">
              <Code2 size={64} />
            </div>
          </div>
        )}
        
        <div className="container" style={{ padding: '2.5rem 1rem 1rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.8rem', color: 'var(--accent-primary)', marginBottom: '1.2rem', fontWeight: 800 }}>{service.title}</h1>
          <p className="service-description" style={{ maxWidth: '850px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.75' }}>{service.description}</p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="service-features">
        <div className="container">
          <h2 className="section-title">What We Offer</h2>
          <div className="features-grid">
            {service.features && service.features.map((feature, idx) => (
              <div className="feature-card" key={idx}>
                <div className="feature-icon-wrapper">
                  <CheckCircle2 size={30} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Cycle */}
      <section className="service-process">
        <div className="container">
          <h2 className="section-title">Our Process</h2>
          <div className="process-cycle">
            {service.processSteps && service.processSteps.map((step, idx) => (
              <div className="process-step" key={idx}>
                <div className="process-circle" style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  {processIcons[idx % processIcons.length]}
                </div>
                <span>{typeof step === 'object' ? step.title : step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Grid */}
      <section className="service-tech">
        <div className="container">
          <h2 className="section-title">Technologies & Tools</h2>
          <div className="tech-grid">
            {(service.technologies && service.technologies.length > 0 ? service.technologies : ['React', 'NodeJS', 'AWS', 'Docker']).map((tech, idx) => {
              const techName = typeof tech === 'object' ? tech.name : tech;
              const techIcon = (typeof tech === 'object' && tech.icon) 
                ? tech.icon 
                : localTechIcons[techName?.toLowerCase()];

              return (
                <div className="tech-item" key={idx}>
                  {techIcon ? (
                    <img src={techIcon} alt={techName} style={{width: '36px', height: '36px', objectFit: 'contain'}} />
                  ) : (
                    <Cpu size={32} color="var(--accent-primary)" />
                  )}
                  <span>{techName}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceTemplate;
