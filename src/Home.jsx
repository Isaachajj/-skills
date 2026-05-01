import React from 'react';
import './Home.css';

function Home({ onNavigate, onRegisterClick }) {
  const experts = [
    { id: 1, name: "Sarah Mkamba", skill: "Web Development", avatar: "👩‍💻" },
    { id: 2, name: "David Juma", skill: "Data Science", avatar: "👨‍🔬" },
    { id: 3, name: "Amina Hassan", skill: "UI/UX Design", avatar: "👩‍🎨" },
    { id: 4, name: "Michael Sanga", skill: "Cyber Security", avatar: "👨‍💼" }
  ];

  const categories = [
    { id: 1, icon: "💻", name: "Tech" },
    { id: 2, icon: "🎨", name: "Art" },
    { id: 3, icon: "💼", name: "Business" },
    { id: 4, icon: "📱", name: "Mobile Dev" },
    { id: 5, icon: "📊", name: "Marketing" },
    { id: 6, icon: "🎵", name: "Music" },
    { id: 7, icon: "📹", name: "Video" },
    { id: 8, icon: "🌐", name: "Languages" }
  ];

  const steps = [
    { number: "01", title: "Create Account", desc: "Sign up with your details and skills" },
    { number: "02", title: "Connect & Learn", desc: "Find experts and start learning" },
    { number: "03", title: "Share Skills", desc: "Teach others what you know" }
  ];

  const stats = [
    { number: "500+", label: "Experts", icon: "👥" },
    { number: "200+", label: "Skills", icon: "⚡" },
    { number: "1000+", label: "Students", icon: "🎓" },
    { number: "50+", label: "Partners", icon: "🤝" }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Learn Skills.<br />
            <span className="hero-title-accent">Share Knowledge.</span><br />
            Grow Together.
          </h1>
          <p className="hero-subtitle">
            Connect with Tanzania's top experts and swap skills to advance your career
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => onRegisterClick?.()}
            >
              Get Started
            </button>
            <button
              className="btn-secondary"
              onClick={() => onNavigate?.('Explore')}
            >
              Explore Skills
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="categories-container">
          <h2 className="section-title">Browse by Category</h2>
          <div className="categories-grid">
            {categories.map((cat) => (
              <div key={cat.id} className="category-card">
                <span className="category-icon">{cat.icon}</span>
                <span className="category-name">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Grid Section */}
      <section className="experts-section">
        <div className="experts-container">
          <h2 className="section-title">Top Rated Experts</h2>
          <p className="hero-subtitle" style={{ textAlign: 'center', marginBottom: '48px' }}>Meet the best talent in Tanzania</p>
          <div className="experts-grid">
            {experts.map((expert) => (
              <div key={expert.id} className="expert-card">
                <div className="expert-avatar">
                  <span>{expert.avatar}</span>
                </div>
                <h3 className="expert-name">{expert.name}</h3>
                <span className="expert-skill">{expert.skill}</span>
                <a href="#" className="expert-link">View Profile</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="process-container">
          <h2 className="section-title">How It Works</h2>
          <p className="hero-subtitle" style={{ textAlign: 'center', marginBottom: '48px' }}>Join the skill exchange in 3 simple steps</p>
          <div className="process-grid">
            {steps.map((step, i) => (
              <div key={i} className="process-card">
                <span className="process-number">{step.number}</span>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-card">
            <h2 className="newsletter-title">Join SkillHub Tanzania</h2>
            <p className="newsletter-desc">Create your account today and start sharing your knowledge with others</p>
            <button
              className="btn-primary"
              onClick={() => onRegisterClick?.()}
            >
              Join Now - It's Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
