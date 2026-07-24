import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Monitor, Smartphone, Layout, Users, Code, Mail, Lightbulb, 
  UserCheck, ShieldCheck, ChevronLeft, ChevronRight,
  Bot, Cloud, Code2, LayoutGrid, MonitorCheck
} from 'lucide-react';
import './Home.css';

// Hero Slider Assets
import heroVideo from '../assets/home/Hero Section2.mp4';
import slider1 from '../assets/home/slider1.png';
import slider2 from '../assets/home/slider2.png';
import slider3 from '../assets/home/slider3.png';
import slider4 from '../assets/home/slider4.png';
import slider5 from '../assets/home/slider5.gif';

// Marquee Client logos
import stfLogo from '../assets/aboutus/stf.png';
import constaLogo from '../assets/aboutus/constai.png';
import radissonLogo from '../assets/aboutus/radissen.png';
import yamahaLogo from '../assets/aboutus/yamaha.png';
import upgradLogo from '../assets/aboutus/upgrad.png';
import woomaniyaLogo from '../assets/aboutus/woomaniya.png';
import madhursaLogo from '../assets/aboutus/madhursa.png';

const heroSlides = [
  { type: 'video', src: heroVideo },
  { type: 'image', src: slider1 },
  { type: 'image', src: slider2 },
  { type: 'image', src: slider3 },
  { type: 'image', src: slider4 },
  { type: 'image', src: slider5 }
];

const overlayServices = [
  {
    title: 'AI SOLUTIONS',
    icon: <Bot size={32} />,
    link: '/services/ai-services'
  },
  {
    title: 'DEVOPS & CLOUD SERVICES',
    icon: <Cloud size={32} />,
    link: '/services/cloud-hosting'
  },
  {
    title: 'APPLICATION DEVELOPMENT',
    icon: <Code2 size={32} />,
    link: '/services/software-development'
  },
  {
    title: 'PROJECT MANAGEMENT',
    icon: <LayoutGrid size={32} />,
    link: '/services/it-services'
  },
  {
    title: 'UI/UX DESIGN',
    icon: <MonitorCheck size={32} />,
    link: '/services/web-development'
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeOverlay, setActiveOverlay] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const services = [
    {
      icon: <Users size={40} />,
      title: "CONSULTING SERVICES",
      description: "We deliver expert guidance to help you navigate complex challenges, drive innovation, and unlock sustainable growth."
    },
    {
      icon: <Monitor size={40} />,
      title: "IT SERVICES",
      description: "MAATRSHRI provides streamlined IT solutions to optimize operations and accelerate digital growth."
    },
    {
      icon: <Layout size={40} />,
      title: "WEB DESIGN",
      description: "We build high-performance, responsive websites tailored to your brand and optimized for user experience."
    },
    {
      icon: <Smartphone size={40} />,
      title: "APP DEVELOPMENT",
      description: "We specialize in developing user-friendly, feature-rich mobile applications that enhance user experience and drive business growth."
    },
    {
      icon: <Code size={40} />,
      title: "SOCIAL MARKETING",
      description: "We amplify your brand, engage target audiences, and drive conversions through high-impact social media strategy."
    },
    {
      icon: <Mail size={40} />,
      title: "EMAIL MARKETING",
      description: "High-impact campaigns designed to boost visibility and drive conversions through targeted engagement."
    }
  ];

  const reasons = [
    {
      icon: <Lightbulb size={50} />,
      title: "Innovation-Driven Solutions",
      description: "We combine technology, strategy, and creativity to build scalable digital experiences tailored for modern business growth."
    },
    {
      icon: <UserCheck size={50} />,
      title: "User-Focused Approach",
      description: "Every solution is designed with usability, clarity, and seamless user experience at the core."
    },
    {
      icon: <ShieldCheck size={50} />,
      title: "Reliable Long-Term Partnership",
      description: "We focus on transparent collaboration, timely delivery, and sustainable solutions that help businesses grow confidently."
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container-full">
          {/* Hero Slider Graphic */}
          <div className="hero-graphic">
            
            {/* Slider Media Wrapper */}
            <div className="hero-slider-wrapper">
              {/* Left / Right Navigation Arrows */}
              <button className="slider-arrow arrow-left" onClick={prevSlide} aria-label="Previous Slide">
                <ChevronLeft size={28} />
              </button>
              <button className="slider-arrow arrow-right" onClick={nextSlide} aria-label="Next Slide">
                <ChevronRight size={28} />
              </button>

              {/* Slides Rendering (Video & Images) */}
              {heroSlides.map((slide, index) => (
                slide.type === 'video' ? (
                  <video 
                    key={index}
                    src={slide.src} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className={`hero-media-item ${currentSlide === index ? 'active' : ''}`}
                  />
                ) : (
                  <img 
                    key={index}
                    src={slide.src} 
                    alt={`Hero Slide ${index + 1}`} 
                    className={`hero-media-item ${currentSlide === index ? 'active' : ''}`}
                  />
                )
              ))}

              {/* Hero Text Overlay (Fixed on first slider only) */}
              {currentSlide === 0 && (
                <div className="hero-text-overlay">
                  <h1 className="hero-title">
                    MAATRSHRI AI-DRIVEN<br />IT SOLUTIONS
                  </h1>
                </div>
              )}

              {/* Navigation Dots */}
              <div className="slider-dots">
                {heroSlides.map((_, idx) => (
                  <button 
                    key={idx} 
                    className={`slider-dot ${currentSlide === idx ? 'active' : ''}`} 
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Hero Services Cards Below Slider */}
            <div className="hero-overlay-container">
              {overlayServices.map((service, idx) => (
                <Link 
                  to={service.link} 
                  key={idx} 
                  className={`hero-overlay-card ${activeOverlay === idx ? 'active' : ''}`} 
                  onClick={() => setActiveOverlay(idx)}
                >
                  <div className="overlay-icon-box">{service.icon}</div>
                  <span className="overlay-title">{service.title}</span>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services section">
        <div className="container">
          <h2 className="section-title">SERVICES WE OFFER!</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us section">
        <div className="container">
          <h2 className="section-title">Why choose us <span>?</span></h2>
          <div className="reasons-grid">
            {reasons.map((reason, index) => (
              <div className="reason-card" key={index}>
                <div className="reason-icon">{reason.icon}</div>
                <h3 className="reason-title">{reason.title}</h3>
                <p className="reason-desc">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
