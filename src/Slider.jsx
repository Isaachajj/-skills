import { useState, useEffect, useCallback } from 'react';
import './Slider.css';

// Slide Data
const slides = [
  {
    id: 1,
    headline: "Master New Skills with Expert Mentors",
    subHeadline: "Connect with industry professionals and transform your career through personalized learning experiences.",
    ctaPrimary: "Start Learning",
    ctaSecondary: "Explore Courses",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    headline: "Share Your Knowledge with the World",
    subHeadline: "Become a mentor and help others achieve their dreams while building your professional reputation.",
    ctaPrimary: "Become a Mentor",
    ctaSecondary: "Teach Online",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    headline: "Join a Thriving Tech Community",
    subHeadline: "Connect with like-minded learners and professionals across Tanzania and beyond.",
    ctaPrimary: "Join Community",
    ctaSecondary: "View Events",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
  }
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback((index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  // Auto-play logic with pause on hover
  useEffect(() => {
    if (isPaused || isAnimating) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, isAnimating]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section 
      className="slider-section"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="slider-container">
        {/* Previous Arrow */}
        <button 
          className="slider-nav-arrow slider-nav-prev" 
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Slide Content */}
        <div className="slider-wrapper">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`slider-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="split-layout">
                {/* Left Side - Content */}
                <div className="slide-content">
                  <div className="content-animate-wrapper">
                    <h1 className="slide-headline">{slide.headline}</h1>
                    <p className="slide-subheadline">{slide.subHeadline}</p>
                    <div className="cta-buttons">
                      <button className="cta-button cta-primary">{slide.ctaPrimary}</button>
                      <button className="cta-button cta-secondary">{slide.ctaSecondary}</button>
                    </div>
                  </div>
                </div>

                {/* Right Side - Image */}
                <div className="slide-image-wrapper">
                  <div className="image-float-wrapper">
                    <img 
                      src={slide.image} 
                      alt={slide.headline}
                      className="slide-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Arrow */}
        <button 
          className="slider-nav-arrow slider-nav-next" 
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Pagination Dots */}
        <div className="pagination-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`pagination-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;
