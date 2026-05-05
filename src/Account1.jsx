import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Settings, LogOut, PlusCircle, Video, Lock, Unlock, 
  Eye, ThumbsUp, MessageCircle, Share2, BookOpen, Clock, 
  TrendingUp, Users, Heart, ChevronRight, Menu, X, 
  Upload, Edit, Trash2, Play, Star, Award, Calendar,
  Filter, Search, MoreVertical, Save, DollarSign
} from 'lucide-react';

const Account1 = ({ userData, onNavigate, onLogout }) => {
  const [activeTab, setActiveTab] = useState('my-courses');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userCourses, setUserCourses] = useState([]);
  const [publicCourses, setPublicCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalViews: 0,
    totalLikes: 0,
    totalCourses: 0,
    totalRevenue: 0
  });

  // Load user data and courses from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('skillhubUser');
    const storedCourses = localStorage.getItem('skillhubCourses');
    const storedPublicCourses = localStorage.getItem('skillhubPublicCourses');
    
    if (storedUser && !userData) {
      const parsed = JSON.parse(storedUser);
      if (parsed.courses) setUserCourses(parsed.courses);
      if (parsed.stats) setStats(parsed.stats);
    }
    
    if (storedCourses) {
      const allCourses = JSON.parse(storedCourses);
      const myCourses = allCourses.filter(c => c.authorId === (userData?.id || 'current-user'));
      setUserCourses(myCourses);
      
      const publicCoursesList = allCourses.filter(c => c.isPublic === true);
      setPublicCourses(publicCoursesList);
      
      // Calculate stats
      const totalStudents = myCourses.reduce((sum, c) => sum + (c.students || 0), 0);
      const totalViews = myCourses.reduce((sum, c) => sum + (c.views || 0), 0);
      const totalLikes = myCourses.reduce((sum, c) => sum + (c.likes || 0), 0);
      const totalRevenue = myCourses.reduce((sum, c) => sum + (c.revenue || 0), 0);
      
      setStats({
        totalStudents,
        totalViews,
        totalLikes,
        totalCourses: myCourses.length,
        totalRevenue
      });
    }
    
    if (storedPublicCourses) {
      setPublicCourses(JSON.parse(storedPublicCourses));
    }
  }, [userData]);

  const currentUser = userData || JSON.parse(localStorage.getItem('skillhubUser') || '{}');
  const userName = currentUser.fullName || currentUser.name || 'Learner';
  const userAvatar = currentUser.profilePhoto || currentUser.passport || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80';

  const handleCreateCourse = () => {
    setShowCreateModal(true);
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const updatedCourses = userCourses.filter(c => c.id !== courseId);
      setUserCourses(updatedCourses);
      
      const allCourses = JSON.parse(localStorage.getItem('skillhubCourses') || '[]');
      const filtered = allCourses.filter(c => c.id !== courseId);
      localStorage.setItem('skillhubCourses', JSON.stringify(filtered));
      
      setStats(prev => ({ ...prev, totalCourses: prev.totalCourses - 1 }));
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Color palette
  const colors = {
    accent: '#0ea5e9',
    accentDark: '#0284c7',
    accentLight: '#38bdf8',
    purple: '#8b5cf6',
    pink: '#ec4899',
    orange: '#f59e0b',
    green: '#10b981',
    darkBg: '#0f172a',
    cardBg: 'rgba(30, 41, 59, 0.7)',
    textMain: '#f1f5f9',
    textMuted: '#94a3b8',
    border: 'rgba(255,255,255,0.08)',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444'
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: `linear-gradient(135deg, ${colors.darkBg} 0%, #0a0f1c 100%)`,
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Top Navigation Bar */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${colors.border}`,
        padding: '16px 24px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo removed as per instruction */}
          <div />

          {/* User Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button
              onClick={handleCreateCourse}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`,
                border: 'none',
                padding: '10px 20px',
                borderRadius: '40px',
                color: 'white',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <PlusCircle size={18} />
              Create Course
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, color: 'white', fontSize: '14px' }}>{userName.split(' ')[0]}</div>
                <div style={{ fontSize: '11px', color: colors.textMuted }}>Expert Educator</div>
              </div>
              <img 
                src={userAvatar} 
                alt="Profile" 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: `2px solid ${colors.accent}`,
                  objectFit: 'cover',
                  cursor: 'pointer'
                }}
                onClick={() => onNavigate?.('account')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: `linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(139, 92, 246, 0.1))`,
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '32px',
            border: `1px solid ${colors.border}`
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
                {getGreeting()}, <span style={{ color: colors.accent }}>{userName.split(' ')[0]}</span>! 👋
              </h1>
              <p style={{ color: colors.textMuted, fontSize: '16px' }}>
                Welcome back to your teaching dashboard. Your impact on the community is growing!
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ 
                background: colors.cardBg, 
                padding: '12px 20px', 
                borderRadius: '16px',
                textAlign: 'center',
                border: `1px solid ${colors.border}`
              }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: colors.accent }}>{stats.totalCourses}</div>
                <div style={{ fontSize: '12px', color: colors.textMuted }}>Courses</div>
              </div>
              <div style={{ 
                background: colors.cardBg, 
                padding: '12px 20px', 
                borderRadius: '16px',
                textAlign: 'center',
                border: `1px solid ${colors.border}`
              }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: colors.green }}>{stats.totalStudents.toLocaleString()}</div>
                <div style={{ fontSize: '12px', color: colors.textMuted }}>Students</div>
              </div>
              <div style={{ 
                background: colors.cardBg, 
                padding: '12px 20px', 
                borderRadius: '16px',
                textAlign: 'center',
                border: `1px solid ${colors.border}`
              }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: colors.orange }}>${stats.totalRevenue.toLocaleString()}</div>
                <div style={{ fontSize: '12px', color: colors.textMuted }}>Revenue</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {[
            { icon: <Eye size={24} />, label: 'Total Views', value: stats.totalViews.toLocaleString(), color: colors.accent },
            { icon: <ThumbsUp size={24} />, label: 'Total Likes', value: stats.totalLikes.toLocaleString(), color: colors.pink },
            { icon: <Users size={24} />, label: 'Active Students', value: stats.totalStudents.toLocaleString(), color: colors.green },
            { icon: <TrendingUp size={24} />, label: 'Growth Rate', value: '+47%', color: colors.orange }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: colors.cardBg,
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '24px',
                border: `1px solid ${colors.border}`,
                transition: 'all 0.3s ease'
              }}
              whileHover={{ y: -5, borderColor: stat.color }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ color: stat.color }}>{stat.icon}</div>
                <ChevronRight size={18} color={colors.textMuted} />
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: colors.textMuted }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs Navigation */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: `1px solid ${colors.border}`, marginBottom: '24px' }}>
          {[
            { id: 'my-courses', label: '📚 My Courses', icon: <BookOpen size={16} /> },
            { id: 'public-courses', label: '🌍 Public Feed', icon: <Users size={16} /> },
            { id: 'analytics', label: '📊 Analytics', icon: <TrendingUp size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: activeTab === tab.id ? `linear-gradient(135deg, ${colors.accent}, ${colors.purple})` : 'transparent',
                border: 'none',
                borderRadius: '40px',
                color: activeTab === tab.id ? 'white' : colors.textMuted,
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* My Courses Tab */}
        {activeTab === 'my-courses' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {userCourses.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 20px',
                background: colors.cardBg,
                borderRadius: '24px',
                border: `1px solid ${colors.border}`
              }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>📹</div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>No Courses Yet</h3>
                <p style={{ color: colors.textMuted, marginBottom: '24px' }}>Start sharing your knowledge with the world!</p>
                <button
                  onClick={handleCreateCourse}
                  style={{
                    background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`,
                    border: 'none',
                    padding: '14px 32px',
                    borderRadius: '40px',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Create Your First Course
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '20px' }}>
                {userCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      background: colors.cardBg,
                      borderRadius: '20px',
                      overflow: 'hidden',
                      border: `1px solid ${colors.border}`,
                      transition: 'all 0.3s ease'
                    }}
                    whileHover={{ y: -3 }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {/* Thumbnail */}
                      <div style={{ width: '240px', height: '160px', position: 'relative', overflow: 'hidden' }}>
                        <img 
                          src={course.thumbnail || 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80'} 
                          alt={course.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {course.isPaid ? (
                          <div style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            background: colors.orange,
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontWeight: 700,
                            color: 'white'
                          }}>PREMIUM</div>
                        ) : (
                          <div style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            background: colors.green,
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontWeight: 700,
                            color: 'white'
                          }}>FREE</div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div style={{ flex: 1, padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                          <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>{course.title}</h3>
                            <p style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '12px' }}>{course.description}</p>
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '12px', color: colors.textMuted }}>📹 {course.totalVideos} videos</span>
                              <span style={{ fontSize: '12px', color: colors.textMuted }}>👥 {course.students || 0} students</span>
                              <span style={{ fontSize: '12px', color: colors.textMuted }}>👁️ {course.views || 0} views</span>
                              <span style={{ fontSize: '12px', color: colors.textMuted }}>❤️ {course.likes || 0} likes</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              style={{
                                background: 'rgba(255,255,255,0.1)',
                                border: `1px solid ${colors.border}`,
                                padding: '8px 16px',
                                borderRadius: '12px',
                                color: 'white',
                                fontSize: '13px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <Edit size={14} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course.id)}
                              style={{
                                background: 'rgba(239, 68, 68, 0.2)',
                                border: `1px solid ${colors.danger}`,
                                padding: '8px 16px',
                                borderRadius: '12px',
                                color: colors.danger,
                                fontSize: '13px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </div>
                        
                        {/* Video List Preview */}
                        <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {course.freeVideos?.slice(0, 3).map((video, idx) => (
                            <div key={idx} style={{
                              background: 'rgba(255,255,255,0.05)',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '11px',
                              color: colors.textMuted,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <Play size={10} />
                              {video.title}
                            </div>
                          ))}
                          {course.paidVideos?.length > 0 && (
                            <div style={{
                              background: `rgba(245, 158, 11, 0.15)`,
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '11px',
                              color: colors.orange,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <Lock size={10} />
                              {course.paidVideos.length} premium videos
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Public Feed Tab */}
        {activeTab === 'public-courses' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>Community Courses</h2>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: colors.cardBg,
                  borderRadius: '40px',
                  padding: '8px 16px',
                  border: `1px solid ${colors.border}`
                }}>
                  <Search size={16} color={colors.textMuted} />
                  <input 
                    type="text" 
                    placeholder="Search courses..."
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '6px 12px',
                      color: 'white',
                      outline: 'none',
                      fontSize: '13px'
                    }}
                  />
                </div>
                <button style={{
                  background: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  padding: '8px 16px',
                  borderRadius: '40px',
                  color: colors.textMuted,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}>
                  <Filter size={14} />
                  Filter
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {publicCourses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px', background: colors.cardBg, borderRadius: '24px', gridColumn: '1/-1' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌍</div>
                  <p style={{ color: colors.textMuted }}>No public courses available yet</p>
                </div>
              ) : (
                publicCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      background: colors.cardBg,
                      borderRadius: '20px',
                      overflow: 'hidden',
                      border: `1px solid ${colors.border}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                      <img 
                        src={course.thumbnail || 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&q=80'} 
                        alt={course.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {course.isPaid ? (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: colors.orange,
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: 'white'
                        }}>${course.price || 9.99}</div>
                      ) : (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: colors.green,
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: 'white'
                        }}>FREE</div>
                      )}
                      <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(0,0,0,0.6)',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        color: 'white'
                      }}>
                        <Users size={12} />
                        {course.students || 0} students
                      </div>
                    </div>
                    <div style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <img 
                          src={course.authorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&q=80'} 
                          alt="Author"
                          style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <span style={{ fontSize: '12px', color: colors.textMuted }}>{course.authorName}</span>
                      </div>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>{course.title}</h3>
                      <p style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '16px', lineHeight: '1.5' }}>{course.description?.slice(0, 80)}...</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <span style={{ fontSize: '12px', color: colors.textMuted, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Eye size={12} /> {course.views || 0}
                          </span>
                          <span style={{ fontSize: '12px', color: colors.textMuted, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Heart size={12} /> {course.likes || 0}
                          </span>
                        </div>
                        <button style={{
                          background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`,
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '30px',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}>
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {/* Chart placeholder - you can integrate a real chart library here */}
              <div style={{
                background: colors.cardBg,
                borderRadius: '20px',
                padding: '24px',
                border: `1px solid ${colors.border}`,
                gridColumn: 'span 2'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '20px' }}>Course Performance</h3>
                <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '20px 0' }}>
                  {userCourses.slice(0, 6).map((course, i) => (
                    <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{
                        height: `${Math.min(150, (course.views || 0) / 100)}px`,
                        background: `linear-gradient(to top, ${colors.accent}, ${colors.purple})`,
                        borderRadius: '8px 8px 0 0',
                        transition: 'height 0.5s ease'
                      }}></div>
                      <div style={{ fontSize: '10px', color: colors.textMuted, marginTop: '8px', transform: 'rotate(-45deg)', transformOrigin: 'top left', width: '60px' }}>
                        {course.title?.slice(0, 10)}...
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{
                background: colors.cardBg,
                borderRadius: '20px',
                padding: '24px',
                border: `1px solid ${colors.border}`
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '20px' }}>Top Performing Course</h3>
                {userCourses[0] ? (
                  <>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: colors.accent, marginBottom: '12px' }}>{userCourses[0].title}</div>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '13px', color: colors.textMuted }}>👁️ {userCourses[0].views || 0} views</span>
                      <span style={{ fontSize: '13px', color: colors.textMuted }}>❤️ {userCourses[0].likes || 0} likes</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '75%', height: '100%', background: colors.green, borderRadius: '4px' }}></div>
                    </div>
                  </>
                ) : (
                  <p style={{ color: colors.textMuted }}>No data available</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Create Course Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: colors.darkBg,
                borderRadius: '28px',
                maxWidth: '500px',
                width: '90%',
                padding: '32px',
                border: `1px solid ${colors.border}`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Create New Course</h2>
              <p style={{ color: colors.textMuted, marginBottom: '24px' }}>Share your knowledge with the world</p>
              
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  onNavigate?.('postskills');
                }}
                style={{
                  width: '100%',
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`,
                  border: 'none',
                  padding: '16px',
                  borderRadius: '16px',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <PlusCircle size={20} />
                Go to Course Creator
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default Account1;