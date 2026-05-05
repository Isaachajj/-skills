import { useState, useRef, useEffect } from "react";

const VideoPage = ({ onNavigate, selectedCourse }) => {
  const [search, setSearch] = useState("");
  const [activeLesson, setActiveLesson] = useState(null);
  const [showDL, setShowDL] = useState(false);
  const [commentsActive, setCommentsActive] = useState(false);
  const [notesActive, setNotesActive] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(1247);
  const [likesCount, setLikesCount] = useState(3456);
  const [isLiked, setIsLiked] = useState(false);
  const [viewsCount, setViewsCount] = useState(28943);
  const [commentsCount, setCommentsCount] = useState(47);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  
  const videoRef = useRef(null);
  const dlRef = useRef(null);

  const [courseData, setCourseData] = useState(null);
  const [allVideos, setAllVideos] = useState([]);

  // Valid working thumbnail URLs
  const workingThumbnails = [
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&q=80",
    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=200&q=80",
    "https://images.unsplash.com/photo-1547658719-da2b848c1ad1?w=200&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=80",
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24f?w=200&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&q=80",
    "https://images.unsplash.com/photo-1515973819979-b5c9d39bb7d0?w=200&q=80",
    "https://images.unsplash.com/photo-1578506505549-44f64ee6e273?w=200&q=80"
  ];

  // Working instructor profile images
  const instructorImages = [
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/women/45.jpg",
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/men/75.jpg",
    "https://randomuser.me/api/portraits/women/12.jpg"
  ];

  // Graphic Designers Data
  const graphicDesigners = [
    {
      id: 1,
      name: "Sarah Kimani",
      role: "UI/UX Designer",
      company: "Creative Studio",
      image: "https://randomuser.me/api/portraits/women/88.jpg",
      followers: "12.5K",
      rating: 4.9
    },
    {
      id: 2,
      name: "Michael Otieno",
      role: "Graphic Designer",
      company: "Brand Masters",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      followers: "8.2K",
      rating: 4.8
    },
    {
      id: 3,
      name: "Aisha Hussein",
      role: "Motion Designer",
      company: "Animation Hub",
      image: "https://randomuser.me/api/portraits/women/23.jpg",
      followers: "15.3K",
      rating: 4.9
    },
    {
      id: 4,
      name: "John Mwangi",
      role: "Brand Identity Designer",
      company: "Logo Masters",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      followers: "6.8K",
      rating: 4.7
    },
    {
      id: 5,
      name: "Grace Wanjiku",
      role: "Illustrator",
      company: "Art Studio",
      image: "https://randomuser.me/api/portraits/women/56.jpg",
      followers: "9.4K",
      rating: 4.8
    },
    {
      id: 6,
      name: "Peter Omondi",
      role: "UI Designer",
      company: "Design Wave",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      followers: "7.2K",
      rating: 4.6
    }
  ];

  // Load course data
  useEffect(() => {
    let isMounted = true;
    
    const loadCourse = () => {
      if (selectedCourse) {
        if (isMounted) {
          setCourseData(selectedCourse);
          setupVideos(selectedCourse);
        }
      } else {
        const storedCourse = localStorage.getItem('selectedCourse');
        if (storedCourse && isMounted) {
          const parsed = JSON.parse(storedCourse);
          setCourseData(parsed);
          setupVideos(parsed);
        } else {
          // Mock course with working data and working instructor image
          const mockCourse = {
            id: 1,
            title: "Complete Web Development Course",
            description: "Learn web development from scratch with hands-on projects. Master HTML, CSS, JavaScript, React, and Node.js.",
            authorName: "Dr. Sarah Johnson",
            authorAvatar: instructorImages[0],
            authorTitle: "PhD in Computer Science · Senior Software Engineer",
            category: "Web Development",
            freeVideos: [
              { 
                id: 1, 
                title: "Introduction to Web Development", 
                duration: "15:30", 
                order: 1, 
                stepNumber: 1,
                description: "Learn the basics of web development and how websites work",
                isFree: true, 
                videoUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
                thumbnail: workingThumbnails[0]
              },
              { 
                id: 2, 
                title: "HTML & CSS Fundamentals", 
                duration: "22:45", 
                order: 2, 
                stepNumber: 2,
                description: "Master HTML structure and CSS styling",
                isFree: true, 
                videoUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
                thumbnail: workingThumbnails[1]
              },
              { 
                id: 3, 
                title: "JavaScript Basics", 
                duration: "28:15", 
                order: 3, 
                stepNumber: 3,
                description: "Learn JavaScript programming fundamentals",
                isFree: true, 
                videoUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
                thumbnail: workingThumbnails[2]
              }
            ],
            paidVideos: [
              { 
                id: 4, 
                title: "React JS Mastery", 
                duration: "35:20", 
                order: 4, 
                stepNumber: 4,
                description: "Build modern React applications with hooks and context",
                isFree: false, 
                price: "$9.99",
                videoUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
                thumbnail: workingThumbnails[3]
              },
              { 
                id: 5, 
                title: "Node.js Backend Development", 
                duration: "42:10", 
                order: 5, 
                stepNumber: 5,
                description: "Build scalable backend APIs with Node.js and Express",
                isFree: false, 
                price: "$9.99",
                videoUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
                thumbnail: workingThumbnails[4]
              }
            ]
          };
          if (isMounted) {
            setCourseData(mockCourse);
            setupVideos(mockCourse);
          }
        }
      }
    };
    
    loadCourse();
    
    return () => {
      isMounted = false;
    };
  }, [selectedCourse]);

  const setupVideos = (course) => {
    const free = (course.freeVideos || []).map((v, idx) => ({ 
      ...v, 
      isFree: true, 
      type: 'free', 
      locked: false,
      thumbnail: v.thumbnail || workingThumbnails[idx % workingThumbnails.length]
    }));
    const paid = (course.paidVideos || []).map((v, idx) => ({ 
      ...v, 
      isFree: false, 
      type: 'paid', 
      locked: true,
      thumbnail: v.thumbnail || workingThumbnails[(idx + free.length) % workingThumbnails.length]
    }));
    const all = [...free, ...paid].sort((a, b) => (a.order || a.stepNumber || 0) - (b.order || b.stepNumber || 0));
    
    setAllVideos(all);
    
    const firstUnlocked = all.find(v => v.isFree === true);
    if (firstUnlocked) {
      setActiveLesson(firstUnlocked.id);
      setCurrentVideo(firstUnlocked);
    }
  };

  // Auto-play video when active lesson changes
  useEffect(() => {
    if (videoRef.current && currentVideo && !currentVideo.locked && currentVideo.videoUrl) {
      const playVideo = async () => {
        try {
          await videoRef.current.play();
          setViewsCount(prev => prev + 1);
        } catch (err) {
          console.log("Autoplay was prevented:", err);
        }
      };
      playVideo();
    }
  }, [currentVideo]);

  const handleVideoClick = (video) => {
    if (video.locked) {
      alert(`This is a premium video. ${video.price || 'Upgrade to premium'} to unlock!`);
      return;
    }
    setActiveLesson(video.id);
    setCurrentVideo(video);
    setVideoProgress(0);
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      setCurrentTime(current);
      if (dur && !isNaN(dur)) {
        setVideoProgress((current / dur) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    const currentIndex = allVideos.findIndex(v => v.id === currentVideo?.id);
    const nextVideo = allVideos[currentIndex + 1];
    if (nextVideo && !nextVideo.locked) {
      setActiveLesson(nextVideo.id);
      setCurrentVideo(nextVideo);
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const handleFollow = () => {
    if (followed) {
      setFollowersCount(prev => prev - 1);
      setFollowed(false);
    } else {
      setFollowersCount(prev => prev + 1);
      setFollowed(true);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds) || !isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const colors = {
    accent: '#0ea5e9',
    purple: '#8b5cf6',
    green: '#10b981',
    orange: '#f59e0b',
    darkBg: '#06070d',
    surface: 'rgba(255,255,255,0.04)',
    surface2: 'rgba(255,255,255,0.07)',
    border: 'rgba(255,255,255,0.08)',
    textMain: 'rgba(240,244,255,0.95)',
    textMuted: 'rgba(160,175,210,0.6)'
  };

  const filteredVideos = allVideos.filter(v =>
    v.title?.toLowerCase().includes(search.toLowerCase()) || false
  );

  const comments = [
    { id: 1, user: "Asha Mushi", avatar: "https://randomuser.me/api/portraits/women/1.jpg", time: "2 hours ago", text: "Mafundisho mazuri sana! Nimeelewa vizuri.", likes: 12 },
    { id: 2, user: "Juma Kilonzo", avatar: "https://randomuser.me/api/portraits/men/2.jpg", time: "1 hour ago", text: "Asante kwa mafundisho mzuri!", likes: 8 },
    { id: 3, user: "Fatma Ali", avatar: "https://randomuser.me/api/portraits/women/3.jpg", time: "30 minutes ago", text: "Nimejifunza mengi kutoka kwa video hizi.", likes: 5 }
  ];

  const resources = [
    { name: "Course Materials Notes.pdf", type: "pdf", size: "2.4 MB" },
    { name: "starter-code-project.zip", type: "zip", size: "840 KB" },
    { name: "Cheatsheet & Reference.pdf", type: "pdf", size: "1.1 MB" }
  ];

  useEffect(() => {
    function handleClick(e) {
      if (dlRef.current && !dlRef.current.contains(e.target)) setShowDL(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // If no course data, show loading
  if (!courseData && allVideos.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: colors.darkBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '50px', height: '50px', border: `3px solid ${colors.border}`, borderTop: `3px solid ${colors.accent}`, borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ color: colors.textMuted }}>Loading course...</p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  const instructorAvatar = courseData?.authorAvatar || instructorImages[0];

  return (
    <div style={{ minHeight: '100vh', background: colors.darkBg, fontFamily: "'DM Sans', sans-serif" }}>
      {/* TOP NAV */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 28px', background: 'rgba(6,7,13,0.8)', backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${colors.border}`, position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '18px', fontWeight: 800 }}>
            Skill<span style={{ color: colors.accent }}>feature</span><sub style={{ fontSize: '10px', color: colors.textMuted }}>TZ</sub>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('home')}
            style={{
              background: colors.surface, border: `1px solid ${colors.border}`,
              borderRadius: '30px', padding: '6px 16px', fontSize: '12px',
              color: colors.textMain, cursor: 'pointer'
            }}
          >
            ← All Courses
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`, fontSize: '11px', fontWeight: 600, padding: '5px 12px', borderRadius: '20px', cursor: 'pointer' }}>
            ⚡ Upgrade Pro
          </div>
          <img style={{ width: '34px', height: '34px', borderRadius: '50%', border: `2px solid ${colors.accent}`, objectFit: 'cover', cursor: 'pointer' }}
            src="https://randomuser.me/api/portraits/men/1.jpg" alt="user" />
        </div>
      </nav>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '24px' }}>
          
          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: colors.textMuted }}>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }} style={{ color: colors.textMuted, textDecoration: 'none' }}>Home</a>
              <span>›</span>
              <span style={{ color: colors.accent }}>{courseData?.title || 'Course'}</span>
            </div>

            {/* VIDEO PLAYER */}
            <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', background: '#000', aspectRatio: '16/9', border: `1px solid ${colors.border}` }}>
              {currentVideo && !currentVideo.locked && currentVideo.videoUrl ? (
                <video
                  ref={videoRef}
                  src={currentVideo.videoUrl}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  controls
                  autoPlay
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleVideoEnded}
                />
              ) : (
                <>
                  <img style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
                    src={currentVideo?.thumbnail || "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&q=85"} alt="video" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,7,13,0.7) 0%, transparent 50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(14,165,233,0.15)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(14,165,233,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                </>
              )}
              <div style={{ position: 'absolute', bottom: '14px', left: '18px', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
              {currentVideo?.isFree === false && (
                <div style={{ position: 'absolute', bottom: '14px', right: '18px', background: colors.orange, padding: '3px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold' }}>
                  PREMIUM
                </div>
              )}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.2)' }}>
                <div style={{ width: `${videoProgress}%`, height: '100%', background: colors.accent }}></div>
              </div>
            </div>

            {/* Video Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 4px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '14px' }}>👁️</span>
                  <span style={{ fontSize: '13px', color: colors.textMuted }}>{viewsCount.toLocaleString()} views</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button onClick={handleLike} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px', color: isLiked ? colors.accent : colors.textMuted }}>❤️</span>
                    <span style={{ fontSize: '13px', color: isLiked ? colors.accent : colors.textMuted }}>{likesCount.toLocaleString()}</span>
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '14px' }}>💬</span>
                  <span style={{ fontSize: '13px', color: colors.textMuted }}>{commentsCount} comments</span>
                </div>
              </div>
            </div>

            {/* Video Title */}
            <div style={{ padding: '8px 0' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>{currentVideo?.title || courseData?.title}</h1>
              <p style={{ fontSize: '14px', color: colors.textMuted, marginTop: '8px', lineHeight: '1.6' }}>{currentVideo?.description || courseData?.description}</p>
            </div>

            {/* INSTRUCTOR CARD */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: colors.surface, backdropFilter: 'blur(20px)', border: `1px solid ${colors.border}`, borderRadius: '16px', padding: '14px 18px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: '-3px', borderRadius: '50%', background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})` }}></div>
                <img 
                  style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff' }} 
                  src={instructorAvatar} 
                  alt="instructor"
                  onError={(e) => {
                    e.target.src = "https://randomuser.me/api/portraits/women/68.jpg";
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '10px', color: colors.textMuted, textTransform: 'uppercase' }}>Your Instructor</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'white' }}>{courseData?.authorName || "Dr. Sarah Johnson"}</div>
                <div style={{ fontSize: '11px', color: colors.textMuted }}>{courseData?.authorTitle || 'PhD in Computer Science · Senior Software Engineer'}</div>
                <div style={{ fontSize: '11px', color: colors.textMuted, marginTop: '4px' }}>👥 {followersCount.toLocaleString()} followers</div>
              </div>
              <button 
                onClick={handleFollow} 
                style={{ 
                  padding: '9px 20px', 
                  borderRadius: '12px', 
                  fontSize: '12px', 
                  fontWeight: 600, 
                  cursor: 'pointer', 
                  background: followed ? colors.surface2 : `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`,
                  border: `1px solid ${followed ? colors.border : colors.accent}`,
                  color: followed ? colors.textMuted : 'white'
                }}
              >
                {followed ? "✓ Following" : "+ Follow"}
              </button>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: colors.surface, backdropFilter: 'blur(16px)', border: `1px solid ${colors.border}`, borderRadius: '16px', padding: '14px 18px', flexWrap: 'wrap' }}>
              <button onClick={() => setNotesActive(!notesActive)} style={{ display: 'flex', alignItems: 'center', gap: '7px', background: colors.surface2, border: `1px solid ${colors.border}`, borderRadius: '10px', padding: '9px 16px', color: notesActive ? colors.accent : colors.textMain, fontSize: '13px', cursor: 'pointer' }}>
                ❤️ {notesActive ? 'Hide Likes' : 'Show Likes'}
              </button>
              <button onClick={() => setCommentsActive(!commentsActive)} style={{ display: 'flex', alignItems: 'center', gap: '7px', background: colors.surface2, border: `1px solid ${colors.border}`, borderRadius: '10px', padding: '9px 16px', color: commentsActive ? colors.accent : colors.textMain, fontSize: '13px', cursor: 'pointer' }}>
                💬 Comments ({commentsCount})
              </button>
              <div style={{ position: 'relative', marginLeft: 'auto' }} ref={dlRef}>
                <button onClick={() => setShowDL(!showDL)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: `linear-gradient(135deg, rgba(14,165,233,0.2), rgba(139,92,246,0.2))`, border: `1px solid rgba(14,165,233,0.35)`, borderRadius: '10px', padding: '9px 18px', color: colors.accent, fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  📥 Download Resources
                </button>
                {showDL && (
                  <div style={{ position: 'absolute', bottom: 'calc(100% + 10px)', right: 0, background: 'rgba(10,12,22,0.95)', backdropFilter: 'blur(24px)', border: `1px solid ${colors.border}`, borderRadius: '16px', padding: '16px', width: '280px', zIndex: 50 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>📦 Lesson Resources</div>
                    {resources.map((r, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', background: colors.surface2, border: `1px solid ${colors.border}`, marginBottom: '8px', cursor: 'pointer' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: r.type === 'pdf' ? 'rgba(239,68,68,0.15)' : 'rgba(245,166,35,0.15)' }}>{r.type === 'pdf' ? "📄" : "🗜️"}</div>
                        <div style={{ flex: 1 }}><div style={{ fontSize: '11px', fontWeight: 500 }}>{r.name}</div><div style={{ fontSize: '10px', color: colors.textMuted }}>{r.size}</div></div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* LIKES PANEL */}
            {notesActive && (
              <div style={{ background: colors.surface, backdropFilter: 'blur(16px)', border: `1px solid ${colors.border}`, borderRadius: '16px', padding: '20px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>❤️ Likes ({likesCount})</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto' }}>
                  {['Issa Felix', 'Zuhura Mfinanga', 'Asha Ramadhan', 'Juma Kapufya', 'Halima Swai', 'Baraka Ndemu'].map((name, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: colors.surface2, borderRadius: '10px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        {name.charAt(0)}
                      </div>
                      <div style={{ flex: 1 }}>{name}</div>
                      <span style={{ fontSize: '12px', color: colors.textMuted }}>just now</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* COMMENTS PANEL */}
            {commentsActive && (
              <div style={{ background: colors.surface, backdropFilter: 'blur(16px)', border: `1px solid ${colors.border}`, borderRadius: '16px', padding: '20px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>💬 {commentsCount} Comments</div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <img src="https://randomuser.me/api/portraits/men/1.jpg" style={{ width: '40px', height: '40px', borderRadius: '50%' }} alt="" />
                  <textarea 
                    placeholder="Add a comment..." 
                    rows="2" 
                    style={{ flex: 1, background: colors.surface2, border: `1px solid ${colors.border}`, borderRadius: '10px', padding: '12px', color: colors.textMain, fontSize: '13px', resize: 'vertical' }}
                  />
                  <button style={{ background: colors.accent, border: 'none', borderRadius: '10px', padding: '12px 20px', fontWeight: 600, cursor: 'pointer', color: 'white' }}>Post</button>
                </div>
                {comments.map(comment => (
                  <div key={comment.id} style={{ display: 'flex', gap: '12px', padding: '16px 0', borderBottom: `1px solid ${colors.border}` }}>
                    <img src={comment.avatar} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} alt="" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, marginBottom: '4px', color: 'white' }}>{comment.user}</div>
                      <div style={{ fontSize: '13px', marginBottom: '8px', color: colors.textMain }}>{comment.text}</div>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: colors.textMuted }}>
                        <span>{comment.time}</span>
                        <span>❤️ {comment.likes}</span>
                        <span style={{ cursor: 'pointer' }}>Reply</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR - LESSONS LIST WITH THUMBNAILS */}
          <div style={{ background: colors.surface, backdropFilter: 'blur(20px)', border: `1px solid ${colors.border}`, borderRadius: '20px', overflow: 'hidden', position: 'sticky', top: '80px', alignSelf: 'start' }}>
            <div style={{ padding: '18px', borderBottom: `1px solid ${colors.border}` }}>
              <div style={{ fontWeight: 700, marginBottom: '10px', color: 'white' }}>{courseData?.title || 'Course Content'}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.07)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '37%', height: '100%', background: `linear-gradient(to right, ${colors.accent}, ${colors.purple})`, borderRadius: '4px' }}></div>
                </div>
                <div style={{ fontSize: '11px', color: colors.accent, fontWeight: 600 }}>37% done</div>
              </div>
            </div>

            {/* Search */}
            <div style={{ padding: '12px 14px', borderBottom: `1px solid ${colors.border}` }}>
              <div style={{ position: 'relative' }}>
                <svg style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input type="text" placeholder="Search lessons..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', background: colors.surface2, border: `1px solid ${colors.border}`, borderRadius: '10px', padding: '9px 12px 9px 32px', color: colors.textMain, fontSize: '12px', outline: 'none' }} />
              </div>
            </div>

            {/* Lessons List with Thumbnails */}
            <div style={{ maxHeight: '550px', overflowY: 'auto' }}>
              {filteredVideos.length > 0 ? filteredVideos.map((video, idx) => {
                const stepNumber = video.stepNumber || video.order || idx + 1;
                const isActive = activeLesson === video.id;
                const isFree = video.isFree === true;
                const isLocked = video.locked === true;
                const thumbUrl = video.thumbnail || workingThumbnails[idx % workingThumbnails.length];
                
                return (
                  <div
                    key={video.id}
                    onClick={() => handleVideoClick(video)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      cursor: isLocked ? 'not-allowed' : 'pointer',
                      background: isActive ? `rgba(14, 165, 233, 0.08)` : 'transparent',
                      borderLeft: isActive ? `3px solid ${colors.accent}` : '3px solid transparent',
                      transition: 'all 0.2s ease',
                      opacity: isLocked ? 0.6 : 1,
                      borderBottom: `1px solid ${colors.border}`
                    }}
                  >
                    {/* Thumbnail Image */}
                    <div style={{ 
                      width: '100px', 
                      height: '56px', 
                      borderRadius: '8px', 
                      overflow: 'hidden', 
                      position: 'relative', 
                      flexShrink: 0, 
                      background: '#1a1a2e',
                      border: `1px solid ${colors.border}`
                    }}>
                      <img 
                        src={thumbUrl} 
                        alt={video.title} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          display: 'block'
                        }} 
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=200&q=80";
                        }}
                      />
                      {isLocked && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill={colors.orange}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        </div>
                      )}
                      {isActive && !isLocked && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,165,233,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      )}
                    </div>

                    {/* Video Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '12px', fontWeight: isActive ? 700 : 500, color: isActive ? colors.accent : 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                          {stepNumber}. {video.title}
                        </span>
                        {isFree ? (
                          <span style={{ background: colors.green, padding: '2px 6px', borderRadius: '4px', fontSize: '8px', fontWeight: 'bold', color: 'white' }}>FREE</span>
                        ) : isLocked ? (
                          <span style={{ background: colors.orange, padding: '2px 6px', borderRadius: '4px', fontSize: '8px', fontWeight: 'bold', color: 'white' }}>PREMIUM</span>
                        ) : null}
                      </div>
                      <div style={{ fontSize: '10px', color: colors.textMuted, marginTop: '4px' }}>{video.duration}</div>
                    </div>
                  </div>
                );
              }) : (
                <div style={{ textAlign: 'center', padding: '40px', color: colors.textMuted }}>No videos found</div>
              )}
            </div>

            {/* Stats Strip */}
            <div style={{ display: 'flex', borderTop: `1px solid ${colors.border}` }}>
              <div style={{ flex: 1, padding: '12px', textAlign: 'center', borderRight: `1px solid ${colors.border}` }}>
                <div style={{ fontWeight: 700, color: 'white' }}>{allVideos.length}</div>
                <div style={{ fontSize: '10px', color: colors.textMuted, letterSpacing: '0.05em' }}>LESSONS</div>
              </div>
              <div style={{ flex: 1, padding: '12px', textAlign: 'center', borderRight: `1px solid ${colors.border}` }}>
                <div style={{ fontWeight: 700, color: 'white' }}>{allVideos.filter(v => v.isFree === true).length} / {allVideos.filter(v => v.isFree === false).length}</div>
                <div style={{ fontSize: '10px', color: colors.textMuted, letterSpacing: '0.05em' }}>FREE / PREMIUM</div>
              </div>
              <div style={{ flex: 1, padding: '12px', textAlign: 'center' }}>
                <div style={{ fontWeight: 700, color: 'white' }}>4.9★</div>
                <div style={{ fontSize: '10px', color: colors.textMuted, letterSpacing: '0.05em' }}>RATING</div>
              </div>
            </div>
          </div>
        </div>

        {/* GRAPHIC DESIGNERS SECTION - BOTTOM */}
        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
                🎨 Top Graphic Designers
              </h2>
              <p style={{ fontSize: '14px', color: colors.textMuted }}>
                Meet our professional graphic designers ready to bring your vision to life
              </p>
            </div>
            <button style={{
              background: 'transparent',
              border: `1px solid ${colors.accent}`,
              borderRadius: '30px',
              padding: '8px 20px',
              color: colors.accent,
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = colors.accent;
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = colors.accent;
            }}>
              View All Designers →
            </button>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
            gap: '20px'
          }}>
            {graphicDesigners.map((designer) => (
              <div
                key={designer.id}
                style={{
                  background: colors.surface,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = colors.accent;
                  e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 20px ${colors.accent}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Profile Image */}
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  margin: '0 auto 16px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: `3px solid ${colors.accent}`,
                  padding: '3px',
                  background: colors.darkBg
                }}>
                  <img 
                    src={designer.image} 
                    alt={designer.name}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      borderRadius: '50%', 
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.src = `https://randomuser.me/api/portraits/${designer.id % 2 === 0 ? 'women' : 'men'}/${designer.id * 10}.jpg`;
                    }}
                  />
                </div>
                
                {/* Info */}
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
                  {designer.name}
                </h3>
                <p style={{ fontSize: '12px', color: colors.accent, fontWeight: 500, marginBottom: '4px' }}>
                  {designer.role}
                </p>
                <p style={{ fontSize: '11px', color: colors.textMuted, marginBottom: '12px' }}>
                  {designer.company}
                </p>
                
                {/* Stats */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>{designer.followers}</div>
                    <div style={{ fontSize: '10px', color: colors.textMuted }}>Followers</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#f5c518' }}>★ {designer.rating}</div>
                    <div style={{ fontSize: '10px', color: colors.textMuted }}>Rating</div>
                  </div>
                </div>
                
                {/* Button */}
                <button style={{
                  width: '100%',
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`,
                  border: 'none',
                  borderRadius: '30px',
                  padding: '8px 16px',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = `0 4px 15px ${colors.accent}40`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}>
                  Hire Designer
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;