import React from 'react';
import ImageSlider from './ImageSlider';

function Home({ onNavigate }) {
  const colors = {
    accent: '#0ea5e9',
    accentGlow: 'rgba(14, 165, 233, 0.4)',
    darkBg: '#020617', 
    cardBg: 'rgba(30, 41, 59, 0.5)', 
    textMain: '#f8fafc',
    textMuted: '#94a3b8'
  };

  const categories = [
    { id: 'web-dev', title: 'Full-Stack Web Development', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&q=80', experts: '12k+ Experts', badge: 'Web', category: 'web-development' },
    { id: 'react', title: 'React & Next.js Mastery', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80', experts: '9.5k+ Experts', badge: 'React', category: 'frontend' },
    { id: 'mobile', title: 'Mobile App Development', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80', experts: '6.5k+ Experts', badge: 'Mobile', category: 'mobile-development' },
    { id: 'ui-ux', title: 'UI/UX Product Design', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80', experts: '5k+ Experts', badge: 'Design', category: 'design' },
    { id: 'api', title: 'API Development & Integration', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc34?w=600&q=80', experts: '7k+ Experts', badge: 'API', category: 'backend' },
    { id: 'ethical-hacking', title: 'Ethical Hacking & Pentesting', image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&q=80', experts: '3.5k+ Experts', badge: 'Security', category: 'cybersecurity' },
    { id: 'cyber-security', title: 'Cyber Security Defense', image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=600&q=80', experts: '4.2k+ Experts', badge: 'Security', category: 'cybersecurity' },
    { id: 'linux', title: 'Linux System Administration', image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&q=80', experts: '5.5k+ Experts', badge: 'Linux', category: 'devops' },
    { id: 'cloud', title: 'Cloud Architecture (AWS)', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80', experts: '3k+ Experts', badge: 'Cloud', category: 'cloud' },
    { id: 'ai', title: 'Artificial Intelligence (AI)', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80', experts: '8k+ Experts', badge: 'AI', category: 'ai-ml' },
    { id: 'ml', title: 'Machine Learning Fundamentals', image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&q=80', experts: '6.2k+ Experts', badge: 'ML', category: 'ai-ml' },
    { id: 'data-science', title: 'Data Science & Analytics', image: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?w=600&q=80', experts: '9k+ Experts', badge: 'Data', category: 'data-science' },
    { id: 'big-data', title: 'Big Data Engineering', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80', experts: '4k+ Experts', badge: 'Big Data', category: 'data-engineering' },
    { id: 'forex', title: 'Advanced Forex Trading', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80', experts: '3.8k+ Experts', badge: 'Finance', category: 'trading' },
    { id: 'web3', title: 'Blockchain & Web3 Dev', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80', experts: '2.5k+ Experts', badge: 'Web3', category: 'blockchain' },
    { id: 'marketing', title: 'Digital Marketing Strategy', image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80', experts: '11k+ Experts', badge: 'Marketing', category: 'marketing' },
    { id: 'project-mgmt', title: 'Software Project Management', image: 'https://images.unsplash.com/photo-1552664730-307a78c2e22b?w=600&q=80', experts: '5.8k+ Experts', badge: 'Product', category: 'management' },
    { id: 'english', title: 'Advanced Academic English', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80', experts: '4.5k+ Experts', badge: 'Academic', category: 'languages' },
    { id: 'accounting', title: 'Financial Accounting', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80', experts: '6k+ Experts', badge: 'Finance', category: 'finance' },
    { id: 'game-dev', title: 'Game Development (Unity)', image: 'https://images.unsplash.com/photo-1556438158-8d8116ae21c4?w=600&q=80', experts: '4.8k+ Experts', badge: 'Gaming', category: 'game-development' }
  ];

  const handleCardClick = (category) => {
    console.log('Card clicked, navigating to category:', category);
    
    // Navigate to category page using onNavigate
    if (onNavigate) {
      onNavigate(`category/${category}`);
    }
    
    // Store in localStorage for the category page to read
    localStorage.setItem('selectedCategory', category);
  };

  return (
    <div style={{ backgroundColor: colors.darkBg, minHeight: '100vh', color: colors.textMain, fontFamily: "'Inter', sans-serif" }}>
      
      <ImageSlider />

      <section style={{ padding: '120px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '60px', flexWrap: 'wrap' }}>
          <div style={{ flex: 'none' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px', margin: 0, color: 'white' }}>
              Popular Categories
            </h2>
            <p style={{ color: colors.textMuted, marginTop: '5px', fontSize: '1.1rem' }}>
              Learn directly from world-class industry experts.
            </p>
          </div>
          
          <div style={{ 
            flex: 1, 
            height: '2px', 
            background: `linear-gradient(to right, ${colors.accent}, transparent)`,
            boxShadow: `0 0 10px ${colors.accentGlow}` 
          }}></div>
          
          <div style={{ color: colors.accent, fontWeight: '700', cursor: 'pointer' }}>
            View All Categories →
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          {categories.map((cat, index) => (
            <div 
              key={cat.id} 
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                backgroundColor: colors.cardBg,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.4s ease',
                cursor: 'pointer'
              }}
              onClick={() => handleCardClick(cat.category)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.borderColor = colors.accent;
                e.currentTarget.style.boxShadow = `0 30px 60px rgba(0,0,0,0.7), 0 0 20px ${colors.accentGlow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ height: '140px', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease'
                  }} 
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(2, 6, 23, 0.8), transparent)'
                }}></div>
                
                <div style={{ 
                  position: 'absolute', top: '15px', right: '15px', 
                  backgroundColor: 'rgba(0,0,0,0.8)', padding: '5px 12px', 
                  borderRadius: '12px', fontSize: '0.7rem', fontWeight: '800',
                  letterSpacing: '0.5px', color: 'white', border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {cat.badge.toUpperCase()}
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '10px', lineHeight: '1.4', color: 'white' }}>{cat.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                  <span style={{ color: colors.textMuted, fontSize: '0.9rem' }}>{cat.experts}</span>
                  <div style={{ 
                    width: '32px', height: '32px', borderRadius: '50%', 
                    backgroundColor: 'rgba(14, 165, 233, 0.1)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: colors.accent, border: `1px solid ${colors.accentGlow}`
                  }}>
                    →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '60px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ color: colors.textMuted }}>© 2024 SkillsFuture Tanzania. All rights reserved.</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1e293b; }
        ::-webkit-scrollbar-thumb { background: #0ea5e9; border-radius: 10px; }
      `}</style>
    </div>
  );
}

export default Home;