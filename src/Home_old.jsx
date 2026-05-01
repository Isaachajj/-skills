import React from 'react';

function Home({ onNavigate, onRegisterClick }) {
  const experts = [
    { id: 1, name: "Sarah Mkamba", skill: "Web Development", icon: "💻" },
    { id: 2, name: "David Juma", skill: "Data Science", icon: "📊" },
    { id: 3, name: "Amina Hassan", skill: "UI/UX Design", icon: "🎨" },
    { id: 4, name: "Michael Sanga", skill: "Cyber Security", icon: "🔒" }
  ];

  const categories = [
    { id: 1, icon: "💻", name: "Tech", color: "#3b82f6" },
    { id: 2, icon: "🎨", name: "Art", color: "#ec4899" },
    { id: 3, icon: "💼", name: "Business", color: "#f59e0b" },
    { id: 4, icon: "📱", name: "Mobile Dev", color: "#8b5cf6" },
    { id: 5, icon: "📊", name: "Marketing", color: "#10b981" },
    { id: 6, icon: "🎵", name: "Music", color: "#ef4444" }
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
    <div style={styles.wrapper}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Learn Skills.<br />
            <span style={styles.heroAccent}>Share Knowledge.</span><br />
            Grow Together.
          </h1>
          <p style={styles.heroSubtitle}>
            Connect with Tanzania's top experts and swap skills to advance your career
          </p>
          <div style={styles.heroButtons}>
            <button style={styles.primaryBtn} onClick={() => onRegisterClick?.()}>
              Get Started
            </button>
            <button style={styles.secondaryBtn} onClick={() => onNavigate?.('Explore')}>
              Explore Skills
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar - Full Width White Bar */}
      <section style={styles.statsBar}>
        <div style={styles.statsContainer}>
          {stats.map((stat, i) => (
            <div key={i} style={styles.statItem}>
              <span style={styles.statIcon}>{stat.icon}</span>
              <span style={styles.statNumber}>{stat.number}</span>
              <span style={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Browse by Category</h2>
        <div style={styles.categoryGrid}>
          {categories.map((cat) => (
            <div key={cat.id} style={styles.categoryCard}>
              <span style={{ ...styles.categoryIcon, color: cat.color }}>{cat.icon}</span>
              <span style={styles.categoryName}>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Expert Grid Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Top Rated Experts</h2>
        <p style={styles.sectionSubtitle}>Meet the best talent in Tanzania</p>
        <div style={styles.expertGrid}>
          {experts.map((expert) => (
            <div key={expert.id} style={styles.expertCard}>
              <div style={styles.expertAvatar}>
                <span style={styles.avatarIcon}>👤</span>
              </div>
              <h3 style={styles.expertName}>{expert.name}</h3>
              <span style={styles.expertSkill}>{expert.skill}</span>
              <a href="#" style={styles.viewProfileLink}>View Profile</a>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <p style={styles.sectionSubtitle}>Join the skill exchange in 3 simple steps</p>
        <div style={styles.processGrid}>
          {steps.map((step, i) => (
            <div key={i} style={styles.processCard}>
              <span style={styles.processNumber}>{step.number}</span>
              <h3 style={styles.processTitle}>{step.title}</h3>
              <p style={styles.processDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section style={styles.section}>
        <div style={styles.newsletterCard}>
          <h2 style={styles.newsletterTitle}>Join SkillHub Tanzania</h2>
          <p style={styles.newsletterText}>Create your account today and start sharing your knowledge with others</p>
          <button style={styles.primaryBtn} onClick={() => onRegisterClick?.()}>
            Join Now - It's Free
          </button>
        </div>
      </section>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px 120px',
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#F8FAFC'
  },
  heroSection: {
    padding: '120px 0',
    background: 'white',
    borderRadius: '0 0 32px 32px',
    marginBottom: '0'
  },
  heroContent: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto'
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '700',
    color: '#1e3a8a',
    lineHeight: '1.2',
    marginBottom: '24px'
  },
  heroAccent: {
    color: '#0ea5e9'
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: '#64748b',
    marginBottom: '32px',
    lineHeight: '1.6'
  },
  heroButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center'
  },
  primaryBtn: {
    background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    border: 'none',
    padding: '16px 40px',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(14, 165, 233, 0.3)'
  },
  secondaryBtn: {
    background: 'transparent',
    border: '2px solid #0ea5e9',
    padding: '14px 38px',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#0ea5e9',
    cursor: 'pointer'
  },
  statsBar: {
    background: 'white',
    padding: '40px 0',
    marginTop: '-40px',
    marginBottom: '40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    marginLeft: '20px',
    marginRight: '20px'
  },
  statsContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  statIcon: {
    fontSize: '1.5rem'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#0ea5e9'
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#94a3b8',
    fontWeight: '500'
  },
  section: {
    padding: '120px 0',
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: '2.25rem',
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: '12px'
  },
  sectionSubtitle: {
    fontSize: '1.125rem',
    color: '#64748b',
    marginBottom: '48px'
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '20px'
  },
  categoryCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px 24px',
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid #f1f5f9'
  },
  categoryIcon: {
    fontSize: '2rem',
    marginBottom: '12px'
  },
  categoryName: {
    fontSize: '1rem',
    color: '#1e3a8a',
    fontWeight: '600'
  },
  expertGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px'
  },
  expertCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px 24px',
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    border: '1px solid #f1f5f9'
  },
  expertAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: '#e0f2fe',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  avatarIcon: {
    fontSize: '2.5rem'
  },
  expertName: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: '8px'
  },
  expertSkill: {
    padding: '6px 14px',
    background: '#e0f2fe',
    borderRadius: '50px',
    fontSize: '0.8125rem',
    color: '#0284c7',
    fontWeight: '600',
    marginBottom: '16px'
  },
  viewProfileLink: {
    color: '#0ea5e9',
    fontSize: '0.875rem',
    fontWeight: '600',
    textDecoration: 'none'
  },
  processGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px'
  },
  processCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 32px',
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    border: '1px solid #f1f5f9'
  },
  processNumber: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#e0f2fe',
    marginBottom: '16px'
  },
  processTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: '12px'
  },
  processDesc: {
    fontSize: '1rem',
    color: '#64748b'
  },
  newsletterCard: {
    textAlign: 'center',
    padding: '64px',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    border: '1px solid #f1f5f9'
  },
  newsletterTitle: {
    fontSize: '2.25rem',
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: '16px'
  },
  newsletterText: {
    fontSize: '1.125rem',
    color: '#64748b',
    marginBottom: '32px'
  }
};

export default Home;
