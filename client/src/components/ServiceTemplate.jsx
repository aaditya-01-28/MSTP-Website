import { useParams, useNavigate } from 'react-router-dom';
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

// Import MP4 Videos
import videoAI from '../assets/services/AI_service.mp4';
import videoICO from '../assets/services/ICO_deve.mp4';
import videoIT from '../assets/services/IT_servic.mp4';
import videoSoftwareDev from '../assets/services/Software dev.mp4';
import videoWeb3 from '../assets/services/WEB3 serv.mp4';
import videoWebDev from '../assets/services/Website_dev.mp4';
import videoCloud from '../assets/services/cloud_service.mp4';
import videoDataAnalytics from '../assets/services/data_analy.mp4';
import videoDatabase from '../assets/services/db_database.mp4';
import videoDex from '../assets/services/decentralized_exchange.mp4';
import videoDigital from '../assets/services/digital_market.mp4';
import videoExchange from '../assets/services/exchange-deve.mp4';
import videoIndustrial from '../assets/services/industrial auto.mp4';
import videoIOT from '../assets/services/iot_serv.mp4';
import videoMobileApp from '../assets/services/mobile app.mp4';
import videoOracle from '../assets/services/oracle serv.mp4';
import videoPayment from '../assets/services/payment_gateway_serv.mp4';
import videoStaffing from '../assets/services/payroll_staffing.mp4';
import videoSalesforce from '../assets/services/salesforce_serv.mp4';
import videoShopify from '../assets/services/shopify.mp4';
import videoSoftwareTesting from '../assets/services/soft_testing.mp4';
import videoToken from '../assets/services/token dev.mp4';
import videoDApp from '../assets/services/Dapp_decentralized appp.mp4';
import videoMLM from '../assets/services/MLM- servicee.mp4';
import videoWallet from '../assets/services/wallet-service.mp4';

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

const localServiceVideos = {
  'it-services': videoIT,
  'salesforce-services': videoSalesforce,
  'web-development': videoWebDev,
  'mobile-app': videoMobileApp,
  'digital-marketing': videoDigital,
  'software-development': videoSoftwareDev,
  'ai-services': videoAI,
  'iot': videoIOT,
  'database-design': videoDatabase,
  'data-analytics': videoDataAnalytics,
  'industrial-automation': videoIndustrial,
  'software-testing': videoSoftwareTesting,
  'staffing': videoStaffing,
  'payment-gateway': videoPayment,
  'cloud-hosting': videoCloud,
  'shopify-wordpress': videoShopify,
  'oracle': videoOracle,
  'ico': videoICO,
  'token': videoToken,
  'web3': videoWeb3,
  'dapp': videoDApp,
  'wallet': videoWallet,
  'exchange': videoExchange,
  'mlm': videoMLM,
  'dex': videoDex
};

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

const processIconsMap = {
  'consultation': consultationImg,
  'info': consultationImg,
  'information': consultationImg,
  'planning': planningImg,
  'research': planningImg,
  'design': planningImg,
  'development': developmentImg,
  'dev': developmentImg,
  'testing': testingImg,
  'test': testingImg,
  'deployment': deploymentImg,
  'deploy': deploymentImg,
  'support': supportImg
};

const defaultProcessIcons = [
  consultationImg,
  planningImg,
  developmentImg,
  testingImg,
  deploymentImg,
  supportImg
];

const ServiceTemplate = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const getInitialService = (id) => {
    return servicesData[id] ? { id, ...servicesData[id] } : null;
  };

  const [service, setService] = useState(() => getInitialService(serviceId));
  const [loading, setLoading] = useState(!service);

  useEffect(() => {
    const localData = getInitialService(serviceId);
    if (localData) {
      setService(localData);
      setLoading(false);
    }

    fetch(`${API_BASE_URL}/api/services`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const found = data.find(s => s.id === serviceId || s._id === serviceId);
          if (found) {
            setService({
              ...localData,
              ...found,
              title: found.title || localData?.title,
              description: found.description || localData?.description,
              features: (found.features && found.features.length > 0) ? found.features : (localData?.features || []),
              processSteps: (found.processSteps && found.processSteps.length > 0) ? found.processSteps : (localData?.processSteps || []),
              technologies: (found.technologies && found.technologies.length > 0) ? found.technologies : (localData?.technologies || [])
            });
          } else if (!localData) {
            navigate('/services');
          }
        }
      })
      .catch(err => {
        console.error('API fetch error:', err);
        if (!localData) {
          navigate('/services');
        }
      })
      .finally(() => setLoading(false));
  }, [serviceId, navigate]);

  if (loading) return <div style={{paddingTop: '120px', textAlign: 'center', minHeight: '60vh'}}>Loading service details...</div>;
  if (!service) return <div style={{paddingTop: '120px', textAlign: 'center', minHeight: '60vh'}}>Service not found.</div>;

  const heroVideo = service.video || localServiceVideos[service.id] || (service.icon && typeof service.icon === 'string' && service.icon.endsWith('.mp4') ? service.icon : null);
  const heroImage = service.icon || localServiceIcons[service.id];

  return (
    <div className="service-page">
      {/* Hero Section */}
      <section className="service-hero-media-wrapper">
        <div className="service-hero-media-container">
          {heroVideo ? (
            <video
              src={heroVideo}
              autoPlay
              loop
              muted
              playsInline
              className="service-hero-video"
            />
          ) : heroImage ? (
            <img src={heroImage} alt={service.title} className="service-hero-image" />
          ) : (
            <div className="service-hero-fallback">
              <Code2 size={72} color="var(--accent-primary)" />
            </div>
          )}

          {/* Dark Overlay with Animated Title */}
          <div className="service-hero-overlay">
            <div className="service-hero-overlay-content">
              <span className="service-hero-badge">MAATRSHRI SERVICES</span>
              <h1 key={`title-${service.id}`} className="service-hero-title-animated">{service.title}</h1>
              <div key={`line-${service.id}`} className="service-hero-title-line"></div>
              <p key={`desc-${service.id}`} className="service-hero-desc-animated">{service.description}</p>
            </div>
          </div>
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
            {service.processSteps && service.processSteps.map((step, idx) => {
              const stepTitle = typeof step === 'object' ? step.title : step;
              const stepName = (stepTitle || '').toLowerCase();
              const matchedKey = Object.keys(processIconsMap).find(k => stepName.includes(k));
              const processImg = matchedKey ? processIconsMap[matchedKey] : defaultProcessIcons[idx % defaultProcessIcons.length];

              return (
                <div className="process-step" key={idx}>
                  <div className="process-circle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', border: '2px solid var(--accent-primary)', width: '84px', height: '84px', borderRadius: '50%', padding: '14px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                    <img src={processImg} alt={stepTitle} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                  </div>
                  <span>{stepTitle}</span>
                </div>
              );
            })}
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
                    <img 
                      src={techIcon} 
                      alt={techName} 
                      className="tech-logo-img" 
                      style={{ maxHeight: '48px', maxWidth: '85px', minHeight: '36px', objectFit: 'contain' }} 
                    />
                  ) : (
                    <div className="tech-icon-fallback">
                      <Cpu size={32} color="var(--accent-primary)" />
                    </div>
                  )}
                  <span className="tech-name-label">{techName}</span>
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
