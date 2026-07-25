import { useState, useEffect } from 'react';
import { ChevronRight, Star, MessageSquare, Globe, Users } from 'lucide-react';
import { API_BASE_URL } from '../apiConfig';
import './Testimonials.css';

// Default user profile avatar
import defaultUserImg from '../assets/contactus/user.png';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [testimonials, setTestimonials] = useState([{
    _id: 1,
    content: 'Loading testimonials...',
    author: 'Loading...',
    role: '',
    rating: 5,
    avatar: defaultUserImg
  }]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/testimonials`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setTestimonials(data);
      })
      .catch(console.error);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="testimonials-wrapper">
          
          {/* Left Column */}
          <div className="testimonials-left">
            <h2 className="testimonials-title">Testimonials</h2>
            
            <div className="testimonial-slider-card">
              <p className="testimonial-text">
                {currentTestimonial.content}
              </p>
              
              <div className="testimonial-author-row">
                <img src={currentTestimonial.avatar || defaultUserImg} alt={currentTestimonial.author} className="author-avatar-img" />
                <div className="author-details">
                  <h4>{currentTestimonial.author}</h4>
                  <span>{currentTestimonial.role}</span>
                </div>
                <div className="author-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={`star-icon ${i < currentTestimonial.rating ? 'filled-star' : 'empty-star'}`} 
                      fill={i < currentTestimonial.rating ? "#fbbf24" : "transparent"}
                      color={i < currentTestimonial.rating ? "#fbbf24" : "#4b5563"}
                    />
                  ))}
                </div>
              </div>

              <button className="slider-next-btn" onClick={handleNext}>
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="slider-pagination">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`pagination-dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => handleDotClick(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="testimonials-right">
            <div className="illustration-container">
              {/* Decorative Illustration Elements */}
              <div className="illus-center-box">
                <div className="illus-stars">
                  <Star size={12} fill="#fff" color="#fff"/>
                  <Star size={12} fill="#fff" color="#fff"/>
                  <Star size={12} fill="#fff" color="#fff"/>
                  <Star size={12} fill="#fff" color="#fff"/>
                  <Star size={12} fill="#fff" color="#fff"/>
                </div>
                <div className="illus-lines">
                  <div className="illus-line long"></div>
                  <div className="illus-line long"></div>
                  <div className="illus-line short"></div>
                </div>
                <div className="illus-user-icon">
                   <Users size={16} color="#fff" />
                   <div className="illus-user-line"></div>
                </div>
                <MessageSquare className="illus-quote-icon left-quote" size={16} />
                <MessageSquare className="illus-quote-icon right-quote" size={16} />
              </div>
              
              {/* Globe/Arch effect at bottom */}
              <div className="illus-globe-arch"></div>
              
              {/* Floating Avatars */}
              <div className="floating-avatar float-1"><Users size={20} color="#a3a3a3"/></div>
              <div className="floating-avatar float-2"><Users size={20} color="#a3a3a3"/></div>
              <div className="floating-avatar float-3"><Users size={20} color="#a3a3a3"/></div>
              <div className="floating-avatar float-4"><Users size={20} color="#a3a3a3"/></div>
            </div>

            <h3 className="right-heading">
              Appreciations and iterative<br/>
              feedback motivates us<br/>
              towards perfection.
            </h3>
            <div className="right-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
