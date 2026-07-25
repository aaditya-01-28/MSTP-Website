import { useState, useEffect } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import { API_BASE_URL } from '../apiConfig';
import './About.css';

import missionImg from '../assets/aboutus/image 661.png';
import nitinImg from '../assets/aboutus/nitin.png';
import nikhilImg from '../assets/aboutus/nikhil.png';
import dharmendraImg from '../assets/aboutus/dharmendra.png';
import omImg from '../assets/aboutus/om.png';
import sauravImg from '../assets/aboutus/saurav.png';

const localTeamImages = {
  'Nitin Kumar Tiwari': nitinImg,
  'Nikhil Raj Soni': nikhilImg,
  'Dharmendra Chakrawarti': dharmendraImg,
  'Om Hardaha': omImg,
  'Saurabh Namdev': sauravImg
};

const About = () => {
  const [currentLeader, setCurrentLeader] = useState(0);
  const [leadershipTeam, setLeadershipTeam] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/team`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setLeadershipTeam(data);
        } else {
          // Fallback if empty
          setLeadershipTeam([
            { name: 'Nitin Kumar Tiwari', role: 'Founder', image: nitinImg },
            { name: 'Nikhil Raj Soni', role: 'Managing Director', image: nikhilImg },
            { name: 'Dharmendra Chakrawarti', role: 'Head Designer', image: dharmendraImg },
            { name: 'Om Hardaha', role: 'Website Designer', image: omImg },
            { name: 'Saurabh Namdev', role: 'Technical Relationship Manager', image: sauravImg }
          ]);
        }
      })
      .catch(console.error);
  }, []);

  const nextLeader = () => {
    setCurrentLeader((prev) => (prev === leadershipTeam.length - 1 ? 0 : prev + 1));
  };

  const prevLeader = () => {
    setCurrentLeader((prev) => (prev === 0 ? leadershipTeam.length - 1 : prev - 1));
  };

  if (leadershipTeam.length === 0) return <div>Loading...</div>;

  return (
    <div className="about-page">
      {/* Story Section */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-image">
              <img src={missionImg} alt="MAATRSHRI Mission" className="mission-graphic" />
            </div>
            <div className="story-content">
              <h2 className="section-title" style={{textAlign: 'left'}}>Our Story: Who We Are</h2>
              <p className="story-text">
                <strong>MAATRSHRI Group</strong> is a trusted technology and business solutions company that helps organizations grow in the digital era through IT Services, IT Consulting, Staffing, Payroll, Outsourcing, and Digital Marketing solutions. The company also works across B2B markets and focuses on innovation and software development to meet global business needs.
              </p>
              <p className="story-text">
                With expertise in platforms like Salesforce, Oracle, Microsoft Dynamics 365, and AWS, along with technologies such as AI, ML, and Blockchain, MAATRSHRI Group helps businesses improve efficiency, boost productivity, and achieve sustainable digital growth through innovative, client-focused solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, & Values */}
      <section className="section vision-mission">
        <div className="container">
          <div className="vm-grid">
            <div className="vm-card">
              <h3 className="vm-title">Our Vision</h3>
              <ul className="vm-list">
                <li><CheckCircle2 className="vm-icon" size={20} /> To let a globally trusted partner that empowers organizations to adopt innovative technologies and digital solutions with complete confidence.</li>
                <li><CheckCircle2 className="vm-icon" size={20} /> To drive a future where businesses are more efficient, highly adaptable to market shifts, and capable of achieving long-term sustainable growth.</li>
              </ul>
            </div>
            <div className="vm-card">
              <h3 className="vm-title">Our Mission</h3>
              <ul className="vm-list">
                <li><CheckCircle2 className="vm-icon" size={20} /> To help businesses grow and adapt in the digital world by providing reliable, innovative, and technology-driven solutions.</li>
                <li><CheckCircle2 className="vm-icon" size={20} /> To empower organizations with smarter and faster ways of working through use of AI, Machine Learning, Blockchain and other advanced technologies.</li>
                <li><CheckCircle2 className="vm-icon" size={20} /> To help clients improve productivity, streamline workflows, and achieve long-term sustainable growth by combining technology with strategy.</li>
              </ul>
            </div>
            <div className="vm-card values-card">
              <h3 className="vm-title">Our Values</h3>
              <ul className="values-list">
                <li><strong>Innovation</strong> - We embrace modern technologies and digital transformation.</li>
                <li><strong>Client-focused Approach</strong> - We deliver solutions tailored to business needs within the deadline.</li>
                <li><strong>Growth & Excellence</strong> - We help businesses improve productivity and efficiency.</li>
                <li><strong>Collaboration</strong> - We build strong partnerships with clients and teams.</li>
                <li><strong>Technology-driven Mindset</strong> - We combine strategy with advanced digital solutions.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section leadership-section">
        <div className="container">
          <h2 className="section-title">Leadership Team</h2>
          
          <div className="slider-container" style={{maxWidth: '600px', margin: '0 auto', position: 'relative', padding: '2rem 0'}}>
            <button onClick={prevLeader} className="slider-btn prev-btn" aria-label="Previous leader">
              <ChevronLeft size={24} />
            </button>
            
            <div className="leader-card" style={{margin: '0 auto'}}>
              {(() => {
                const member = leadershipTeam[currentLeader];
                const img = member.image || localTeamImages[member.name];
                return (
                  <>
                    <div className="leader-image-wrapper">
                      {img ? (
                        <img src={img} alt={member.name} className="leader-img" style={{width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%'}} />
                      ) : (
                        <div className="leader-image-placeholder" style={{width: '200px', height: '200px', margin: '0 auto'}}>
                          <span>{member.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="leader-name" style={{fontSize: '1.8rem'}}>{member.name}</h3>
                    <p className="leader-role" style={{fontSize: '1.2rem'}}>{member.role}</p>
                  </>
                );
              })()}
            </div>
            
            <button onClick={nextLeader} className="slider-btn next-btn" aria-label="Next leader">
              <ChevronRight size={24} />
            </button>
            
            <div className="slider-dots">
              {leadershipTeam.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`slider-dot ${idx === currentLeader ? 'active' : ''}`}
                  onClick={() => setCurrentLeader(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="consultation-action" style={{textAlign: 'center', marginTop: '3rem'}}>
            <Link to="/book" className="btn btn-primary" style={{display: 'inline-block'}}>Book Consultation</Link>
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
};

export default About;
