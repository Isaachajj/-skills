import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      badge: "WELCOME",
      title: "Global Expert Mentorship",
      subtitle: "Connect with world-class developers and industry leaders from across the globe.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600",
      btnText: "JOIN THE COMMUNITY"
    },
    {
      badge: "LIVE NOW",
      title: "Cyber Security Mastery",
      subtitle: "Protect the digital frontier. Learn advanced ethical hacking and defense strategies.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1600",
      btnText: "START LEARNING"
    },
    {
      badge: "TRENDING",
      title: "Full-Stack Web Development",
      subtitle: "Master the art of building scalable web applications with React, Node, and SQL.",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1600",
      btnText: "ENROLL FOR FREE"
    },
    {
      badge: "FUTURE TECH",
      title: "Artificial Intelligence & ML",
      subtitle: "Dive deep into Neural Networks and Machine Learning to build the future.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600",
      btnText: "EXPLORE AI"
    },
    {
      badge: "MOBILE FIRST",
      title: "Cross-Platform App Development",
      subtitle: "Build stunning high-performance apps for both iOS and Android platforms.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1600",
      btnText: "BUILD YOUR APP"
    },
    {
      badge: "CERTIFIED",
      title: "Cloud Architecture (AWS/Azure)",
      subtitle: "Deploy and manage enterprise-level infrastructure in the cloud.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
      btnText: "GET CERTIFIED"
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    
// This is where images are loaded every 3 seconds (3,000ms)
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000); 

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div
      className="slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
        >
          {slide.image && (
            <div
              className="slide-bg"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          )}
          <div className="slide-gradient" />
          <div className="slide-content">
            <span className="slide-badge">{slide.badge}</span>
            <h1 className="slide-title">{slide.title}</h1>
            <p className="slide-subtitle">{slide.subtitle}</p>
            <button className="slide-btn">{slide.btnText}</button>
          </div>
        </div>
      ))}

      <button className="nav-btn prev" onClick={prevSlide}>❮</button>
      <button className="nav-btn next" onClick={nextSlide}>❯</button>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'dot-active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;