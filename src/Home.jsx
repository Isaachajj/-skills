import React from 'react';
import ImageSlider from './ImageSlider';

function Home() {
  const colors = {
    accent: '#0ea5e9',
    accentGlow: 'rgba(14, 165, 233, 0.4)',
    darkBg: '#020617', 
    cardBg: 'rgba(30, 41, 59, 0.5)', 
    textMain: '#f8fafc',
    textMuted: '#94a3b8'
  };

const categories = [
    // 🌐 Web & Mobile (The Essentials)
    { title: 'Full-Stack Web Development', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80', experts: '12k+ Experts', badge: 'Web' },
    { title: 'React & Next.js Mastery', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80', experts: '9.5k+ Experts', badge: 'React' },
    { title: 'Mobile App Development', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80', experts: '6.5k+ Experts', badge: 'Mobile' },
    { title: 'UI/UX Product Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80', experts: '5k+ Experts', badge: 'Design' },
    { title: 'API Development & Integration', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc34?w=600&q=80', experts: '7k+ Experts', badge: 'API' },
    
    // 🔐 Cybersecurity & OS (Hapa ndio kwako)
    { title: 'Ethical Hacking & Pentesting', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80', experts: '3.5k+ Experts', badge: 'Security' },
    { title: 'Cyber Security Defense', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80', experts: '4.2k+ Experts', badge: 'Security' },
    { title: 'Linux System Administration', image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&q=80', experts: '5.5k+ Experts', badge: 'Linux' },
    { title: 'Cloud Architecture (AWS)', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80', experts: '3k+ Experts', badge: 'Cloud' },
    
    // 🤖 Intelligence & Data (The Future)
    { title: 'Artificial Intelligence (AI)', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80', experts: '8k+ Experts', badge: 'AI' },
    { title: 'Machine Learning Fundamentals', image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&q=80', experts: '6.2k+ Experts', badge: 'ML' },
    { title: 'Data Science & Analytics', image: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?w=600&q=80', experts: '9k+ Experts', badge: 'Data' },
    { title: 'Big Data Engineering', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80', experts: '4k+ Experts', badge: 'Big Data' },
    
    // 🚀 Business & Trade (Financial Growth)
    { title: 'Advanced Forex Trading', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80', experts: '3.8k+ Experts', badge: 'Finance' },
    { title: 'Blockchain & Web3 Dev', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80', experts: '2.5k+ Experts', badge: 'Web3' },
    { title: 'Digital Marketing Strategy', image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80', experts: '11k+ Experts', badge: 'Marketing' },
    { title: 'Software Project Management', image: 'https://images.unsplash.com/photo-1552664730-307a78c2e22b?w=600&q=80', experts: '5.8k+ Experts', badge: 'Product' },
    
// 🎓 Academic & Specialized (Pro Skills)
    { title: 'Advanced Academic English', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80', experts: '4.5k+ Experts', badge: 'Academic' },
    { title: 'Financial Accounting', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80', experts: '6k+ Experts', badge: 'Finance' },
    { title: 'Game Development (Unity)', image: 'https://images.unsplash.com/photo-1556438158-8d8116ae21c4?w=600&q=80', experts: '4.8k+ Experts', badge: 'Gaming' }
  ];

  return (
    <div style={{ backgroundColor: colors.darkBg, minHeight: '100vh', color: colors.textMain, fontFamily: "'Inter', sans-serif" }}>
      
      {/* 1. HERO SLIDER */}
<ImageSlider />

      {/* 2. CATEGORIES SECTION - Imeongezewa Spacing ya kutosha (120px) */}
      <section style={{ padding: '120px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Heading iliyoboreshwa na Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '60px' }}>
          <div style={{ flex: 'none' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px', margin: 0 }}>
              Popular Categories
            </h2>
            <p style={{ color: colors.textMuted, marginTop: '5px', fontSize: '1.1rem' }}>
              Learn directly from world-class industry experts.
            </p>
          </div>
          
          {/* Glowing Divider Line */}
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

        {/* 3. GRID YA KADI 4 KILA MSTARI */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '30px' 
        }}>
          {categories.map((cat, index) => (
            <div 
              key={index} 
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                backgroundColor: colors.cardBg,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.4s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.borderColor = colors.accent;
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.6), 0 0 20px ${colors.accentGlow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Image with Badge */}
              <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ 
                  position: 'absolute', top: '15px', right: '15px', 
                  backgroundColor: 'rgba(0,0,0,0.7)', padding: '5px 12px', 
                  borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600'
                }}>
                  {cat.badge}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '10px' }}>{cat.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: colors.textMuted, fontSize: '0.9rem' }}>{cat.experts}</span>
                  <div style={{ 
                    width: '32px', height: '32px', borderRadius: '50%', 
                    backgroundColor: 'rgba(14, 165, 233, 0.1)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: colors.accent
                  }}>
                    →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer style={{ textAlign: 'center', padding: '60px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ color: colors.textMuted }}>© 2024 Skills Hub Global. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;