import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CourseCategory = ({ onNavigate, categoryId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const colors = {
    accent: '#0ea5e9',
    accentGlow: 'rgba(14, 165, 233, 0.4)',
    purple: '#8b5cf6',
    pink: '#ec4899',
    orange: '#f59e0b',
    green: '#10b981',
    darkBg: '#020617',
    cardBg: 'rgba(30, 41, 59, 0.5)',
    textMain: '#f8fafc',
    textMuted: '#94a3b8',
    border: 'rgba(255,255,255,0.08)'
  };

  const categoryMap = {
    'web-development': { title: 'Web Development', icon: '🌐', color: colors.accent, description: 'Build modern websites and web applications' },
    'frontend': { title: 'Frontend Development', icon: '🎨', color: colors.purple, description: 'Create beautiful user interfaces' },
    'backend': { title: 'Backend Development', icon: '⚙️', color: colors.green, description: 'Build robust server-side applications' },
    'mobile-development': { title: 'Mobile Development', icon: '📱', color: colors.orange, description: 'Create iOS and Android apps' },
    'design': { title: 'UI/UX Design', icon: '🎨', color: colors.pink, description: 'Design beautiful user experiences' },
    'cybersecurity': { title: 'Cybersecurity', icon: '🔒', color: colors.accent, description: 'Protect systems and networks' },
    'devops': { title: 'DevOps', icon: '🚀', color: colors.purple, description: 'Automate deployment and operations' },
    'cloud': { title: 'Cloud Computing', icon: '☁️', color: colors.accent, description: 'Master cloud platforms' },
    'ai-ml': { title: 'AI & Machine Learning', icon: '🧠', color: colors.purple, description: 'Build intelligent systems' },
    'data-science': { title: 'Data Science', icon: '📊', color: colors.green, description: 'Extract insights from data' },
    'data-engineering': { title: 'Data Engineering', icon: '🗄️', color: colors.orange, description: 'Build data pipelines' },
    'trading': { title: 'Forex & Trading', icon: '💰', color: colors.green, description: 'Master financial markets' },
    'blockchain': { title: 'Blockchain & Web3', icon: '⛓️', color: colors.accent, description: 'Build decentralized apps' },
    'marketing': { title: 'Digital Marketing', icon: '📈', color: colors.pink, description: 'Grow your online presence' },
    'management': { title: 'Project Management', icon: '📋', color: colors.orange, description: 'Lead teams effectively' },
    'languages': { title: 'Language Learning', icon: '🗣️', color: colors.purple, description: 'Learn new languages' },
    'finance': { title: 'Finance & Accounting', icon: '🏦', color: colors.green, description: 'Master financial skills' },
    'game-development': { title: 'Game Development', icon: '🎮', color: colors.pink, description: 'Create amazing games' }
  };

  useEffect(() => {
    const category = categoryId || localStorage.getItem('selectedCategory') || 'web-development';
    const catInfo = categoryMap[category] || { title: category, icon: '📚', color: colors.accent, description: 'Explore courses' };
    setCategoryInfo(catInfo);
    loadCourses(category);
  }, [categoryId]);

  const loadCourses = (category) => {
    setLoading(true);
    
    const storedCourses = localStorage.getItem('skillhubCourses');
    const storedPublicCourses = localStorage.getItem('skillhubPublicCourses');
    
    let allCourses = [];
    
    if (storedCourses) {
      allCourses = [...allCourses, ...JSON.parse(storedCourses)];
    }
    if (storedPublicCourses) {
      allCourses = [...allCourses, ...JSON.parse(storedPublicCourses)];
    }
    
    const filteredByCategory = allCourses.filter(course => {
      const courseCategory = course.category?.toLowerCase().replace(/\s+/g, '-');
      return courseCategory === category || 
             course.category?.toLowerCase().includes(category.replace('-', ' ')) ||
             course.subcategory?.toLowerCase().includes(category.replace('-', ' '));
    });
    
    if (filteredByCategory.length === 0) {
      const mockCourses = generateMockCourses(category);
      setCourses(mockCourses);
    } else {
      setCourses(filteredByCategory);
    }
    
    setLoading(false);
  };

  const generateMockCourses = (category) => {
    const catTitle = categoryMap[category]?.title || category;
    // Sample tutorial videos (working URLs)
    const tutorialVideos = [
      {
        id: 1,
        title: "Introduction to Programming",
        duration: "05:30",
        description: "Learn the basics of programming",
        videoUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
        thumbnail: "https://cdn.pixabay.com/video/2024/03/01/203910-919007456_large.jpg"
      },
      {
        id: 2,
        title: "Variables and Data Types",
        duration: "08:15",
        description: "Understanding variables in programming",
        videoUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
        thumbnail: "https://cdn.pixabay.com/video/2023/07/15/172347-844199290_large.jpg"
      },
      {
        id: 3,
        title: "Control Flow and Loops",
        duration: "12:45",
        description: "Master loops and conditionals",
        videoUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
        thumbnail: "https://cdn.pixabay.com/video/2022/11/15/139490-770963929_large.jpg"
      }
    ];

    return [
      {
        id: Date.now() + 1,
        title: `${catTitle} Mastery: Complete Course`,
        description: `Learn everything you need to know about ${catTitle} from beginner to expert level. Build real-world projects and get certified.`,
        thumbnail: `https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&q=80`,
        authorName: 'Dr. Sarah Johnson',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80',
        category: catTitle,
        level: 'beginner',
        isPaid: false,
        price: 0,
        freeVideos: tutorialVideos.map((v, idx) => ({ 
          ...v, 
          order: idx + 1, 
          stepNumber: idx + 1,
          isFree: true 
        })),
        paidVideos: [],
        totalVideos: tutorialVideos.length,
        freeVideoCount: tutorialVideos.length,
        paidVideoCount: 0,
        students: 12453,
        views: 45678,
        likes: 2345,
        rating: 4.8
      },
      {
        id: Date.now() + 2,
        title: `Advanced ${catTitle} Techniques`,
        description: `Take your ${catTitle} skills to the next level with advanced techniques and best practices from industry experts.`,
        thumbnail: `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&q=80`,
        authorName: 'Prof. Michael Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
        category: catTitle,
        level: 'advanced',
        isPaid: true,
        price: 49.99,
        freeVideos: [{
          id: 101,
          title: "Advanced Introduction",
          duration: "15:20",
          description: "Overview of advanced concepts",
          videoUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
          thumbnail: "https://cdn.pixabay.com/video/2024/03/01/203910-919007456_large.jpg",
          order: 1,
          stepNumber: 1,
          isFree: true
        }],
        paidVideos: [
          { id: 102, title: "Deep Dive Part 1", duration: "28:45", order: 2, stepNumber: 2, isFree: false, price: "$49.99", videoUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail: "https://cdn.pixabay.com/video/2023/07/15/172347-844199290_large.jpg" },
          { id: 103, title: "Deep Dive Part 2", duration: "32:10", order: 3, stepNumber: 3, isFree: false, price: "$49.99", videoUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", thumbnail: "https://cdn.pixabay.com/video/2022/11/15/139490-770963929_large.jpg" }
        ],
        totalVideos: 3,
        freeVideoCount: 1,
        paidVideoCount: 2,
        students: 8456,
        views: 28765,
        likes: 1876,
        rating: 4.9
      },
      {
        id: Date.now() + 3,
        title: `${catTitle} for Beginners`,
        description: `Start your journey in ${catTitle} with this comprehensive beginner-friendly course. No prior experience needed.`,
        thumbnail: `https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=500&q=80`,
        authorName: 'Emma Wilson',
        authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
        category: catTitle,
        level: 'beginner',
        isPaid: false,
        price: 0,
        freeVideos: tutorialVideos.map((v, idx) => ({ 
          ...v, 
          order: idx + 1, 
          stepNumber: idx + 1,
          isFree: true 
        })),
        paidVideos: [],
        totalVideos: tutorialVideos.length,
        freeVideoCount: tutorialVideos.length,
        paidVideoCount: 0,
        students: 15678,
        views: 62345,
        likes: 4123,
        rating: 4.7
      }
    ];
  };

  const handleCourseClick = (course) => {
    // Store selected course in localStorage with full details including video URLs
    localStorage.setItem('selectedCourse', JSON.stringify(course));
    localStorage.setItem('selectedCourseId', course.id);
    
    // Navigate to VideoPage
    if (onNavigate) {
      onNavigate('videopage');
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' ? true :
                          filterType === 'free' ? !course.isPaid :
                          filterType === 'paid' ? course.isPaid : true;
    return matchesSearch && matchesFilter;
  });

  const StarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#f5c518" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  const PlayIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.darkBg} 0%, #0a0f1c 100%)`,
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Back Button */}
      <div style={{ padding: '20px 24px 0', maxWidth: '1400px', margin: '0 auto' }}>
        <button
          onClick={() => onNavigate && onNavigate('home')}
          style={{
            backgroundColor: colors.cardBg,
            color: colors.textMain,
            border: `1px solid ${colors.border}`,
            borderRadius: '40px',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.accent;
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.cardBg;
            e.currentTarget.style.color = colors.textMain;
          }}
        >
          ← Back to Home
        </button>
      </div>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', padding: '40px 20px 20px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>{categoryInfo.icon}</div>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          background: `linear-gradient(135deg, ${categoryInfo.color}, ${colors.purple})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px'
        }}>
          {categoryInfo.title} Courses
        </h1>
        <p style={{ color: colors.textMuted, fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          {categoryInfo.description}
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px' }}>
        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <div style={{
            flex: 1,
            minWidth: '250px',
            display: 'flex',
            alignItems: 'center',
            background: colors.cardBg,
            border: `1px solid ${colors.border}`,
            borderRadius: '40px',
            padding: '8px 20px',
            gap: '12px'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.textMuted} strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                padding: '10px 0',
                color: 'white',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setFilterType('all')}
              style={{
                padding: '8px 20px',
                borderRadius: '30px',
                background: filterType === 'all' ? colors.accent : colors.cardBg,
                border: `1px solid ${filterType === 'all' ? colors.accent : colors.border}`,
                color: filterType === 'all' ? 'white' : colors.textMuted,
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500
              }}
            >
              All Courses
            </button>
            <button
              onClick={() => setFilterType('free')}
              style={{
                padding: '8px 20px',
                borderRadius: '30px',
                background: filterType === 'free' ? colors.green : colors.cardBg,
                border: `1px solid ${filterType === 'free' ? colors.green : colors.border}`,
                color: filterType === 'free' ? 'white' : colors.textMuted,
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500
              }}
            >
              Free Courses
            </button>
            <button
              onClick={() => setFilterType('paid')}
              style={{
                padding: '8px 20px',
                borderRadius: '30px',
                background: filterType === 'paid' ? colors.orange : colors.cardBg,
                border: `1px solid ${filterType === 'paid' ? colors.orange : colors.border}`,
                color: filterType === 'paid' ? 'white' : colors.textMuted,
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500
              }}
            >
              Premium Courses
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px' }}>
            <div style={{ width: '50px', height: '50px', border: `3px solid ${colors.border}`, borderTop: `3px solid ${colors.accent}`, borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ color: colors.textMuted }}>Loading courses...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', background: colors.cardBg, borderRadius: '28px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📚</div>
            <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '12px' }}>No courses found</h3>
            <p style={{ color: colors.textMuted }}>Try adjusting your search or filter</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: colors.cardBg,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${colors.border}`,
                  transition: 'all 0.4s ease',
                  cursor: 'pointer'
                }}
                onClick={() => handleCourseClick(course)}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '60%',
                    background: 'linear-gradient(to top, rgba(2, 6, 23, 0.9), transparent)'
                  }}></div>

                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: course.isPaid ? colors.orange : colors.green,
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: 'white'
                  }}>
                    {course.isPaid ? `$${course.price}` : 'FREE'}
                  </div>

                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(4px)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '10px',
                    fontWeight: '600',
                    color: 'white',
                    textTransform: 'capitalize'
                  }}>
                    {course.level}
                  </div>

                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(14, 165, 233, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}>
                    <PlayIcon />
                  </div>
                </div>

                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <img
                      src={course.authorAvatar}
                      alt=""
                      style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: '13px', color: colors.textMuted }}>{course.authorName}</span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '10px', lineHeight: '1.4' }}>
                    {course.title}
                  </h3>

                  <p style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '16px', lineHeight: '1.5' }}>
                    {course.description?.slice(0, 100)}...
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <span style={{ fontSize: '12px', color: colors.textMuted, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        📹 {course.totalVideos} videos
                      </span>
                      <span style={{ fontSize: '12px', color: colors.textMuted, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        👥 {course.students?.toLocaleString() || 0}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <StarIcon />
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#f5c518' }}>{course.rating || 4.8}</span>
                    </div>
                  </div>

                  <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: `1px solid ${colors.border}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <span style={{ color: colors.green }}>🎬 {course.freeVideoCount} Free Videos</span>
                      {course.paidVideoCount > 0 && (
                        <span style={{ color: colors.orange }}>🔒 {course.paidVideoCount} Premium Videos</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1e293b; }
        ::-webkit-scrollbar-thumb { background: #0ea5e9; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default CourseCategory;