import React, { useState } from 'react';

function Datascience({ onNavigate }) {
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
      title: "Data Science Mastery: Python, Stats & Machine Learning",
      category: "Data Science",
      duration: "52h 45m",
      lessons: 156,
      rating: 4.9,
      students: "28.5K",
      image: "https://images.unsplash.com/photo-1723239274164-49b01c7b8d6b?w=800&q=90",
      instructor: {
        name: "Prof. Elena Vasquez",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
      }
    },
    {
      title: "Advanced Data Analytics with SQL & Tableau",
      category: "Data Analytics",
      duration: "38h 20m",
      lessons: 112,
      rating: 4.8,
      students: "19.2K",
      image: "https://images.unsplash.com/photo-1551288049-bebda5e38f9d?w=800&q=90",
      instructor: {
        name: "Dr. Marcus Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      }
    },
    {
      title: "Big Data Engineering with Spark & Hadoop",
      category: "Big Data",
      duration: "46h 10m",
      lessons: 134,
      rating: 4.7,
      students: "15.8K",
      image: "https://images.unsplash.com/photo-1554224154-800eed6ee26c?w=800&q=90",
      instructor: {
        name: "Sarah Khan",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
      }
    },
    {
      title: "Data Visualization Mastery: Power BI & D3.js",
      category: "Data Visualization",
      duration: "29h 55m",
      lessons: 89,
      rating: 4.9,
      students: "22.1K",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=90",
      instructor: {
        name: "Liam Patel",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
      }
    }
  ];

  const StarIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#f5c518" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
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

      {/* Courses Grid */}
      <div style={{ padding: '0 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(370px, 1fr))', gap: '30px', marginTop: '40px' }}>
          {courseData.map((data, index) => (
            <div key={index} style={{ borderRadius: '24px', overflow: 'hidden', backgroundColor: colors.cardBg, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'all 0.4s ease' }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
              e.currentTarget.style.borderColor = colors.accent;
              e.currentTarget.style.boxShadow = `0 30px 60px rgba(0,0,0,0.7), 0 0 20px ${colors.accentGlow}`;
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                <img src={data.image} alt={data.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to top, rgba(2, 6, 23, 0.8), transparent)' }} />
                <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(0,0,0,0.8)', padding: '5px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '800', color: 'white' }}>
                  {data.category}
                </div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.3)' }}>
                  <PlayIcon />
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', color: colors.textMuted }}> {data.duration} • {data.lessons} lessons </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <StarIcon />
                    <span style={{ fontSize: '0.85rem', color: '#f5c518' }}>{data.rating}</span>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '16px', lineHeight: '1.4' }}>{data.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: colors.textMuted }}>
                  <img src={data.instructor.avatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                  <span>{data.instructor.name}</span>
                  <span style={{ marginLeft: 'auto', color: colors.accent, fontWeight: '600', cursor: 'pointer' }} >{data.students} students →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Datascience;
