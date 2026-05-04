import React from 'react';

function Education({ onNavigate }) {
  const colors = {
    accent: '#0ea5e9',
    accentGlow: 'rgba(14, 165, 233, 0.4)',
    darkBg: '#020617', 
    cardBg: 'rgba(30, 41, 59, 0.5)', 
    textMain: '#f8fafc',
    textMuted: '#94a3b8'
  };

  const courseData = [
    {
      title: "Advanced Academic English for Professionals",
      category: "English",
      duration: "36h 15m",
      lessons: 98,
      rating: 4.9,
      students: "18.7K",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=90",
      instructor: {
        name: "Prof. Emily Carter",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
      }
    },
    {
      title: "Conversational Swahili for Beginners",
      category: "Swahili",
      duration: "28h 40m",
      lessons: 76,
      rating: 4.8,
      students: "12.4K",
      image: "https://images.unsplash.com/photo-1578631613896-a3c0f12f613c?w=800&q=90",
      instructor: {
        name: "Asha Mwijage",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
      }
    },
    {
      title: "Business German A1-A2 Level",
      category: "German",
      duration: "44h 30m",
      lessons: 120,
      rating: 4.7,
      students: "9.6K",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=90",
      instructor: {
        name: "Dr. Hans Müller",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      }
    },
    {
      title: "French for Travel and Conversation B1",
      category: "French",
      duration: "32h 50m",
      lessons: 88,
      rating: 4.9,
      students: "15.3K",
      image: "https://images.unsplash.com/photo-1578631612471-70a1d6a1d9b6?w=800&q=90",
      instructor: {
        name: "Marie Dubois",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
      }
    },
    {
      title: "Spanish Immersion: Conversation & Grammar",
      category: "Spanish",
      duration: "41h 20m",
      lessons: 115,
      rating: 4.8,
      students: "21.2K",
      image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=90",
      instructor: {
        name: "Carlos Rodriguez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
      }
    },
    {
      title: "Arabic for Beginners: Read, Speak, Write",
      category: "Arabic",
      duration: "35h 10m",
      lessons: 95,
      rating: 4.6,
      students: "8.9K",
      image: "https://images.unsplash.com/photo-1582213782174-e1c29f9dd10e?w=800&q=90",
      instructor: {
        name: "Fatima Al-Sayed",
        avatar: "https://images.unsplash.com/photo-1497250688084-722aa0ddba99?w=100&q=80",
      }
    }
  ];

  const StarIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#f5c518" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  const PlayIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  return (
    <div style={{ backgroundColor: colors.darkBg, minHeight: '100vh', color: colors.textMain, fontFamily: "'Inter', sans-serif", padding: '20px 0' }}>
      {/* Back Button */}
      <div style={{ padding: '20px 20px 0', maxWidth: '1400px', margin: '0 auto' }}>
        <button 
          onClick={() => onNavigate('home')}
          style={{
            backgroundColor: colors.cardBg,
            color: colors.textMain,
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '12px 24px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = colors.accent;
            e.target.style.boxShadow = `0 0 20px ${colors.accentGlow}`;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = colors.cardBg;
            e.target.style.boxShadow = 'none';
          }}
        >
          ← Back to Home
        </button>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '1400px', margin: '40px auto 60px', padding: '0 20px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '20px', background: `linear-gradient(135deg, ${colors.accent}, #60a5fa)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Language Learning Experts
        </h1>
        <p style={{ fontSize: '1.3rem', color: colors.textMuted, maxWidth: '600px', margin: '0 auto' }}>
          Learn languages from world-class instructors with proven teaching methods.
        </p>
      </div>

      {/* Courses Grid */}
      <div style={{ padding: '0 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(370px, 1fr))', gap: '30px' }}>
          {courseData.map((data, index) => (
            <div 
              key={index} 
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                backgroundColor: colors.cardBg,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.4s ease',
                cursor: 'pointer'
              }}
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
              <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={data.image} 
                  alt={data.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease'
                  }} 
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '50%',
                  background: 'linear-gradient(to top, rgba(2, 6, 23, 0.8), transparent)'
                }}></div>
                
                <div style={{ 
                  position: 'absolute', top: '15px', right: '15px', 
                  backgroundColor: 'rgba(0,0,0,0.8)', padding: '5px 12px', 
                  borderRadius: '12px', fontSize: '0.7rem', fontWeight: '800',
                  letterSpacing: '0.5px', color: 'white', border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {data.category}
                </div>

                <div style={{ 
                  position: 'absolute', top: '50%', left: '50%', 
                  transform: 'translate(-50%, -50%)', width: '60px', height: '60px', 
                  borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  border: '1px solid rgba(255,255,255,0.3)' 
                }}>
                  <PlayIcon />
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.9rem', color: colors.textMuted }}>{data.duration} • {data.lessons} lessons</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <StarIcon />
                    <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#f5c518' }}>{data.rating}</span>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '16px', lineHeight: '1.4' }}>{data.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <img src={data.instructor.avatar} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }} />
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: '600' }}>{data.instructor.name}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: colors.textMuted, fontSize: '0.95rem' }}>{data.students} students</span>
                  <div style={{ 
                    padding: '10px 20px', 
                    backgroundColor: 'rgba(14, 165, 233, 0.2)', 
                    border: `1px solid ${colors.accentGlow}`,
                    borderRadius: '8px',
                    color: colors.accent,
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    View Courses →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Education;
