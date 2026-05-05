import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, Upload, Video, Image, Lock, Unlock,
  DollarSign, Eye, Save, Send, X, Edit, Move,
  CheckCircle, AlertCircle, Play, Clock, Tag,
  Users, Globe, Link as LinkIcon, FileText,
  ChevronRight, ChevronDown, PlusCircle, MinusCircle
} from 'lucide-react';

const PostSkills = ({ userData, onNavigate, onCoursePublished }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Course Data
  const [courseData, setCourseData] = useState({
    title: '',
    category: '',
    subcategory: '',
    description: '',
    level: 'beginner',
    language: 'english',
    thumbnail: null,
    thumbnailPreview: null,
    price: 0,
    isPaid: false,
    tags: [],
    currentTag: ''
  });

  // Videos Data
  const [freeVideos, setFreeVideos] = useState([]);
  const [paidVideos, setPaidVideos] = useState([]);
  const [activeVideoType, setActiveVideoType] = useState('free');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  
  // New Video Form
  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnail: null,
    duration: '',
    order: 0
  });

  const colors = {
    accent: '#0ea5e9',
    accentDark: '#0284c7',
    purple: '#8b5cf6',
    pink: '#ec4899',
    orange: '#f59e0b',
    green: '#10b981',
    darkBg: '#0f172a',
    cardBg: 'rgba(30, 41, 59, 0.7)',
    textMain: '#f1f5f9',
    textMuted: '#94a3b8',
    border: 'rgba(255,255,255,0.08)',
    danger: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b'
  };

  const categories = [
    { name: 'Web Development', subcategories: ['Frontend', 'Backend', 'Full-Stack', 'React', 'Vue', 'Angular', 'Node.js', 'Next.js'] },
    { name: 'Mobile Development', subcategories: ['React Native', 'Flutter', 'iOS Swift', 'Android Kotlin', 'Cross-Platform'] },
    { name: 'Data Science', subcategories: ['Python', 'Machine Learning', 'Deep Learning', 'Data Analytics', 'SQL', 'Tableau'] },
    { name: 'Cybersecurity', subcategories: ['Ethical Hacking', 'Network Security', 'Cloud Security', 'Penetration Testing', 'SOC'] },
    { name: 'Cloud Computing', subcategories: ['AWS', 'Azure', 'GCP', 'DevOps', 'Kubernetes', 'Docker'] },
    { name: 'Artificial Intelligence', subcategories: ['Generative AI', 'NLP', 'Computer Vision', 'Reinforcement Learning', 'LLMs'] },
    { name: 'Game Development', subcategories: ['Unity', 'Unreal Engine', '3D Modeling', 'Game Design', 'Godot'] },
    { name: 'Digital Marketing', subcategories: ['SEO', 'Social Media', 'Content Marketing', 'Email Marketing', 'Google Ads'] },
    { name: 'Language Learning', subcategories: ['English', 'Swahili', 'French', 'Spanish', 'German', 'Arabic', 'Chinese'] },
    { name: 'Finance & Trading', subcategories: ['Forex', 'Cryptocurrency', 'Stock Trading', 'Personal Finance', 'Accounting'] },
    { name: 'Design', subcategories: ['UI/UX', 'Graphic Design', 'Figma', 'Adobe XD', '3D Design'] },
    { name: 'Business', subcategories: ['Entrepreneurship', 'Project Management', 'Leadership', 'Sales', 'Communication'] }
  ];

  const levels = [
    { value: 'beginner', label: 'Beginner', icon: '🌱', color: colors.green },
    { value: 'intermediate', label: 'Intermediate', icon: '📈', color: colors.accent },
    { value: 'advanced', label: 'Advanced', icon: '🚀', color: colors.purple },
    { value: 'expert', label: 'Expert', icon: '🏆', color: colors.orange }
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'swahili', label: 'Swahili' },
    { value: 'french', label: 'French' },
    { value: 'arabic', label: 'Arabic' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'german', label: 'German' }
  ];

  const handleCourseInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagAdd = () => {
    if (courseData.currentTag.trim() && !courseData.tags.includes(courseData.currentTag.trim())) {
      setCourseData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: ''
      }));
    }
  };

  const handleTagRemove = (tag) => {
    setCourseData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseData(prev => ({
          ...prev,
          thumbnail: file,
          thumbnailPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoSubmit = () => {
    if (!videoForm.title || !videoForm.videoUrl) {
      alert('Please fill in video title and URL');
      return;
    }

    const newVideo = {
      id: editingVideo?.id || Date.now(),
      ...videoForm,
      order: editingVideo?.order || (activeVideoType === 'free' ? freeVideos.length + 1 : paidVideos.length + 1)
    };

    if (editingVideo) {
      // Update existing video
      if (activeVideoType === 'free') {
        setFreeVideos(prev => prev.map(v => v.id === editingVideo.id ? newVideo : v));
      } else {
        setPaidVideos(prev => prev.map(v => v.id === editingVideo.id ? newVideo : v));
      }
    } else {
      // Add new video
      if (activeVideoType === 'free') {
        setFreeVideos(prev => [...prev, newVideo]);
      } else {
        setPaidVideos(prev => [...prev, newVideo]);
      }
    }

    setShowVideoModal(false);
    setEditingVideo(null);
    setVideoForm({ title: '', description: '', videoUrl: '', thumbnail: null, duration: '', order: 0 });
  };

  const handleEditVideo = (video) => {
    setEditingVideo(video);
    setVideoForm(video);
    setShowVideoModal(true);
  };

  const handleDeleteVideo = (videoId, type) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      if (type === 'free') {
        setFreeVideos(prev => prev.filter(v => v.id !== videoId));
      } else {
        setPaidVideos(prev => prev.filter(v => v.id !== videoId));
      }
    }
  };

  const handleSubmitCourse = async () => {
    // Validation
    if (!courseData.title.trim()) {
      alert('Please enter a course title');
      return;
    }
    if (!courseData.category) {
      alert('Please select a category');
      return;
    }
    if (!courseData.description.trim()) {
      alert('Please enter a course description');
      return;
    }
    if (freeVideos.length === 0) {
      alert('Please add at least one free video');
      return;
    }

    setIsSubmitting(true);

    // Prepare course data for storage
    const currentUser = userData || JSON.parse(localStorage.getItem('skillhubUser') || '{}');
    
    const newCourse = {
      id: Date.now(),
      ...courseData,
      freeVideos: freeVideos.map((v, idx) => ({ ...v, order: idx + 1 })),
      paidVideos: paidVideos.map((v, idx) => ({ ...v, order: idx + 1 })),
      totalVideos: freeVideos.length + paidVideos.length,
      freeVideoCount: freeVideos.length,
      paidVideoCount: paidVideos.length,
      authorId: 'current-user',
      authorName: currentUser.fullName || 'Anonymous',
      authorAvatar: currentUser.profilePhoto || null,
      createdAt: new Date().toISOString(),
      students: 0,
      views: 0,
      likes: 0,
      isPublic: true,
      status: 'published'
    };

    // Save to localStorage
    const existingCourses = localStorage.getItem('skillhubCourses');
    const courses = existingCourses ? JSON.parse(existingCourses) : [];
    courses.push(newCourse);
    localStorage.setItem('skillhubCourses', JSON.stringify(courses));

    // Also save to public courses
    const existingPublic = localStorage.getItem('skillhubPublicCourses');
    const publicCourses = existingPublic ? JSON.parse(existingPublic) : [];
    publicCourses.push({ ...newCourse, isPublic: true });
    localStorage.setItem('skillhubPublicCourses', JSON.stringify(publicCourses));

    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      if (onCoursePublished) onCoursePublished(newCourse);
      if (onNavigate) onNavigate('account1');
    }, 2000);
  };

  const canProceed = () => {
    if (step === 1) {
      return courseData.title && courseData.category && courseData.description;
    }
    if (step === 2) {
      return freeVideos.length > 0;
    }
    return true;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.darkBg} 0%, #0a0f1c 100%)`,
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            style={{
              position: 'fixed',
              top: '80px',
              right: '24px',
              zIndex: 1000,
              background: colors.success,
              color: 'white',
              padding: '16px 24px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            <CheckCircle size={20} />
            <div>
              <strong>Course Published!</strong>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>Your course is now live on SkillsFuture</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${colors.border}`,
        padding: '16px 24px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div />
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => onNavigate?.('account1')}
              style={{
                background: 'transparent',
                border: `1px solid ${colors.border}`,
                padding: '8px 20px',
                borderRadius: '30px',
                color: colors.textMuted,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitCourse}
              disabled={!canProceed() || isSubmitting}
              style={{
                background: canProceed() ? `linear-gradient(135deg, ${colors.accent}, ${colors.purple})` : colors.cardBg,
                border: 'none',
                padding: '8px 24px',
                borderRadius: '30px',
                color: 'white',
                fontWeight: 600,
                cursor: canProceed() ? 'pointer' : 'not-allowed',
                opacity: canProceed() ? 1 : 0.5
              }}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Course'}
            </button>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
          {[
            { step: 1, label: 'Course Info', icon: '📝' },
            { step: 2, label: 'Add Videos', icon: '🎬' },
            { step: 3, label: 'Pricing & Publish', icon: '💰' }
          ].map(s => (
            <div
              key={s.step}
              onClick={() => step >= s.step && setStep(s.step)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                background: step >= s.step ? `linear-gradient(135deg, ${colors.accent}, ${colors.purple})` : colors.cardBg,
                borderRadius: '40px',
                cursor: step >= s.step ? 'pointer' : 'default',
                opacity: step >= s.step ? 1 : 0.5
              }}
            >
              <span>{s.icon}</span>
              <span style={{ fontSize: '13px', fontWeight: 500 }}>{s.label}</span>
              {step > s.step && <CheckCircle size={14} style={{ marginLeft: '4px' }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 60px' }}>
        
        {/* Step 1: Course Information */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: colors.cardBg,
              borderRadius: '28px',
              padding: '32px',
              border: `1px solid ${colors.border}`
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Course Information</h2>
            <p style={{ color: colors.textMuted, marginBottom: '32px' }}>Tell students what they'll learn</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {/* Title */}
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>
                  Course Title <span style={{ color: colors.danger }}>*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={courseData.title}
                  onChange={handleCourseInputChange}
                  placeholder="e.g., Complete React Developer Course 2024"
                  style={{
                    width: '100%',
                    background: colors.darkBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '14px',
                    padding: '14px 16px',
                    color: 'white',
                    fontSize: '15px'
                  }}
                />
              </div>

              {/* Category & Subcategory */}
              <div>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>
                  Category <span style={{ color: colors.danger }}>*</span>
                </label>
                <select
                  name="category"
                  value={courseData.category}
                  onChange={handleCourseInputChange}
                  style={{
                    width: '100%',
                    background: colors.darkBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '14px',
                    padding: '14px 16px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Subcategory</label>
                <select
                  name="subcategory"
                  value={courseData.subcategory}
                  onChange={handleCourseInputChange}
                  style={{
                    width: '100%',
                    background: colors.darkBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '14px',
                    padding: '14px 16px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Select subcategory</option>
                  {courseData.category && categories.find(c => c.name === courseData.category)?.subcategories.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* Level & Language */}
              <div>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Difficulty Level</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {levels.map(level => (
                    <button
                      key={level.value}
                      onClick={() => setCourseData(prev => ({ ...prev, level: level.value }))}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: courseData.level === level.value ? `linear-gradient(135deg, ${level.color}, ${colors.purple})` : colors.darkBg,
                        border: `1px solid ${courseData.level === level.value ? level.color : colors.border}`,
                        borderRadius: '12px',
                        color: courseData.level === level.value ? 'white' : colors.textMuted,
                        fontSize: '13px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>{level.icon}</span>
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Language</label>
                <select
                  name="language"
                  value={courseData.language}
                  onChange={handleCourseInputChange}
                  style={{
                    width: '100%',
                    background: colors.darkBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '14px',
                    padding: '14px 16px',
                    color: 'white',
                    fontSize: '14px'
                  }}
                >
                  {languages.map(lang => (
                    <option key={lang.value} value={lang.value}>{lang.label}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>
                  Course Description <span style={{ color: colors.danger }}>*</span>
                </label>
                <textarea
                  name="description"
                  value={courseData.description}
                  onChange={handleCourseInputChange}
                  rows="5"
                  placeholder="What will students learn? What are the requirements? Who is this course for?"
                  style={{
                    width: '100%',
                    background: colors.darkBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '14px',
                    padding: '14px 16px',
                    color: 'white',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Thumbnail */}
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Course Thumbnail</label>
                <div
                  onClick={() => document.getElementById('thumbnailInput').click()}
                  style={{
                    width: '100%',
                    height: '200px',
                    background: colors.darkBg,
                    border: `2px dashed ${colors.border}`,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  {courseData.thumbnailPreview ? (
                    <img src={courseData.thumbnailPreview} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <Upload size={32} color={colors.textMuted} />
                      <p style={{ color: colors.textMuted, marginTop: '8px' }}>Click to upload thumbnail</p>
                      <p style={{ fontSize: '11px', color: colors.textMuted }}>Recommended: 1280x720px, JPG/PNG</p>
                    </div>
                  )}
                  <input
                    id="thumbnailInput"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Tags (Topics covered)</label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  {courseData.tags.map(tag => (
                    <span key={tag} style={{
                      background: `rgba(14, 165, 233, 0.15)`,
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: colors.accent,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      {tag}
                      <X size={12} style={{ cursor: 'pointer' }} onClick={() => handleTagRemove(tag)} />
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input
                    type="text"
                    value={courseData.currentTag}
                    onChange={(e) => setCourseData(prev => ({ ...prev, currentTag: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && handleTagAdd()}
                    placeholder="Add tag (e.g., React, JavaScript, Web Development)"
                    style={{
                      flex: 1,
                      background: colors.darkBg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '14px',
                      padding: '12px 16px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  />
                  <button
                    onClick={handleTagAdd}
                    style={{
                      background: colors.accent,
                      border: 'none',
                      padding: '0 20px',
                      borderRadius: '14px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
              <button
                onClick={() => setStep(2)}
                disabled={!canProceed()}
                style={{
                  background: canProceed() ? `linear-gradient(135deg, ${colors.accent}, ${colors.purple})` : colors.cardBg,
                  border: 'none',
                  padding: '14px 32px',
                  borderRadius: '40px',
                  color: 'white',
                  fontWeight: 600,
                  cursor: canProceed() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Next: Add Videos
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Add Videos */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: colors.cardBg,
              borderRadius: '28px',
              padding: '32px',
              border: `1px solid ${colors.border}`
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Add Course Videos</h2>
            <p style={{ color: colors.textMuted, marginBottom: '32px' }}>
              Free videos help students preview your course. Paid videos are for enrolled students only.
            </p>

            {/* Video Type Tabs */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <button
                onClick={() => setActiveVideoType('free')}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: activeVideoType === 'free' ? `linear-gradient(135deg, ${colors.green}, ${colors.accent})` : colors.darkBg,
                  border: `1px solid ${activeVideoType === 'free' ? colors.green : colors.border}`,
                  borderRadius: '14px',
                  color: activeVideoType === 'free' ? 'white' : colors.textMuted,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Unlock size={18} />
                Free Videos ({freeVideos.length})
              </button>
              <button
                onClick={() => setActiveVideoType('paid')}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: activeVideoType === 'paid' ? `linear-gradient(135deg, ${colors.orange}, ${colors.purple})` : colors.darkBg,
                  border: `1px solid ${activeVideoType === 'paid' ? colors.orange : colors.border}`,
                  borderRadius: '14px',
                  color: activeVideoType === 'paid' ? 'white' : colors.textMuted,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Lock size={18} />
                Paid Videos ({paidVideos.length})
              </button>
            </div>

            {/* Video List */}
            <div style={{ marginBottom: '24px' }}>
              {(activeVideoType === 'free' ? freeVideos : paidVideos).length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px',
                  background: colors.darkBg,
                  borderRadius: '20px',
                  border: `1px dashed ${colors.border}`
                }}>
                  <Video size={48} color={colors.textMuted} style={{ marginBottom: '16px' }} />
                  <p style={{ color: colors.textMuted, marginBottom: '16px' }}>
                    No {activeVideoType === 'free' ? 'free' : 'paid'} videos added yet
                  </p>
                  <button
                    onClick={() => setShowVideoModal(true)}
                    style={{
                      background: colors.accent,
                      border: 'none',
                      padding: '10px 24px',
                      borderRadius: '30px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    + Add First Video
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(activeVideoType === 'free' ? freeVideos : paidVideos).map((video, idx) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px',
                        background: colors.darkBg,
                        borderRadius: '16px',
                        border: `1px solid ${colors.border}`
                      }}
                    >
                      <div style={{
                        width: '120px',
                        height: '68px',
                        background: '#000',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        {video.thumbnail ? (
                          <img src={video.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: colors.cardBg }}>
                            <Play size={20} color={colors.accent} />
                          </div>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: 'white', marginBottom: '4px' }}>{video.title}</div>
                        <div style={{ fontSize: '12px', color: colors.textMuted }}>{video.duration || 'No duration'}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleEditVideo(video)}
                          style={{
                            background: 'transparent',
                            border: `1px solid ${colors.border}`,
                            padding: '8px 12px',
                            borderRadius: '8px',
                            color: colors.accent,
                            cursor: 'pointer'
                          }}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(video.id, activeVideoType)}
                          style={{
                            background: 'transparent',
                            border: `1px solid ${colors.border}`,
                            padding: '8px 12px',
                            borderRadius: '8px',
                            color: colors.danger,
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  
                  <button
                    onClick={() => setShowVideoModal(true)}
                    style={{
                      marginTop: '16px',
                      background: 'transparent',
                      border: `2px dashed ${colors.border}`,
                      padding: '16px',
                      borderRadius: '16px',
                      color: colors.accent,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Plus size={18} />
                    Add Another Video
                  </button>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  background: 'transparent',
                  border: `1px solid ${colors.border}`,
                  padding: '14px 32px',
                  borderRadius: '40px',
                  color: colors.textMuted,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} />
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={freeVideos.length === 0}
                style={{
                  background: freeVideos.length > 0 ? `linear-gradient(135deg, ${colors.accent}, ${colors.purple})` : colors.cardBg,
                  border: 'none',
                  padding: '14px 32px',
                  borderRadius: '40px',
                  color: 'white',
                  fontWeight: 600,
                  cursor: freeVideos.length > 0 ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Next: Pricing
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Pricing & Publish */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: colors.cardBg,
              borderRadius: '28px',
              padding: '32px',
              border: `1px solid ${colors.border}`
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Pricing & Publishing</h2>
            <p style={{ color: colors.textMuted, marginBottom: '32px' }}>Set your course price and publish to the world</p>

            <div style={{ display: 'grid', gap: '24px' }}>
              {/* Pricing Toggle */}
              <div>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '12px' }}>Course Type</label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button
                    onClick={() => setCourseData(prev => ({ ...prev, isPaid: false, price: 0 }))}
                    style={{
                      flex: 1,
                      padding: '16px',
                      background: !courseData.isPaid ? `linear-gradient(135deg, ${colors.green}, ${colors.accent})` : colors.darkBg,
                      border: `1px solid ${!courseData.isPaid ? colors.green : colors.border}`,
                      borderRadius: '16px',
                      color: !courseData.isPaid ? 'white' : colors.textMuted,
                      cursor: 'pointer'
                    }}
                  >
                    <Unlock size={24} style={{ marginBottom: '8px' }} />
                    <div style={{ fontWeight: 600 }}>Free Course</div>
                    <div style={{ fontSize: '12px', marginTop: '4px' }}>Students can access for free</div>
                  </button>
                  <button
                    onClick={() => setCourseData(prev => ({ ...prev, isPaid: true }))}
                    style={{
                      flex: 1,
                      padding: '16px',
                      background: courseData.isPaid ? `linear-gradient(135deg, ${colors.orange}, ${colors.purple})` : colors.darkBg,
                      border: `1px solid ${courseData.isPaid ? colors.orange : colors.border}`,
                      borderRadius: '16px',
                      color: courseData.isPaid ? 'white' : colors.textMuted,
                      cursor: 'pointer'
                    }}
                  >
                    <Lock size={24} style={{ marginBottom: '8px' }} />
                    <div style={{ fontWeight: 600 }}>Paid Course</div>
                    <div style={{ fontSize: '12px', marginTop: '4px' }}>Students pay to access</div>
                  </button>
                </div>
              </div>

              {/* Price Input */}
              {courseData.isPaid && (
                <div>
                  <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Course Price (USD)</label>
                  <input
                    type="number"
                    name="price"
                    value={courseData.price}
                    onChange={handleCourseInputChange}
                    min="0"
                    step="0.01"
                    placeholder="29.99"
                    style={{
                      width: '200px',
                      background: colors.darkBg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '14px',
                      padding: '14px 16px',
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: 600
                    }}
                  />
                  <p style={{ fontSize: '12px', color: colors.textMuted, marginTop: '8px' }}>
                    SkillsFuture takes 20% commission. You'll receive ${(courseData.price * 0.8).toFixed(2)} per sale.
                  </p>
                </div>
              )}

              {/* Course Summary */}
              <div style={{
                background: colors.darkBg,
                borderRadius: '20px',
                padding: '24px',
                marginTop: '16px'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '16px' }}>Course Summary</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: colors.textMuted }}>Title</div>
                    <div style={{ color: 'white', fontWeight: 500 }}>{courseData.title || 'Not set'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: colors.textMuted }}>Category</div>
                    <div style={{ color: 'white', fontWeight: 500 }}>{courseData.category || 'Not set'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: colors.textMuted }}>Level</div>
                    <div style={{ color: 'white', fontWeight: 500 }}>{levels.find(l => l.value === courseData.level)?.label || 'Beginner'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: colors.textMuted }}>Total Videos</div>
                    <div style={{ color: 'white', fontWeight: 500 }}>{freeVideos.length + paidVideos.length} videos</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: colors.textMuted }}>Free Videos</div>
                    <div style={{ color: colors.green, fontWeight: 500 }}>{freeVideos.length} videos</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: colors.textMuted }}>Paid Videos</div>
                    <div style={{ color: colors.orange, fontWeight: 500 }}>{paidVideos.length} videos</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
              <button
                onClick={() => setStep(2)}
                style={{
                  background: 'transparent',
                  border: `1px solid ${colors.border}`,
                  padding: '14px 32px',
                  borderRadius: '40px',
                  color: colors.textMuted,
                  cursor: 'pointer'
                }}
              >
                Back
              </button>
              <button
                onClick={handleSubmitCourse}
                disabled={isSubmitting}
                style={{
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`,
                  border: 'none',
                  padding: '14px 40px',
                  borderRadius: '40px',
                  color: 'white',
                  fontWeight: 700,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Course'}
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Add/Edit Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
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
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: colors.darkBg,
                borderRadius: '24px',
                maxWidth: '550px',
                width: '90%',
                padding: '32px',
                border: `1px solid ${colors.border}`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>
                  {editingVideo ? 'Edit Video' : `Add ${activeVideoType === 'free' ? 'Free' : 'Paid'} Video`}
                </h3>
                <button onClick={() => setShowVideoModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <X size={20} color={colors.textMuted} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Video Title *</label>
                  <input
                    type="text"
                    value={videoForm.title}
                    onChange={(e) => setVideoForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Introduction to React Hooks"
                    style={{
                      width: '100%',
                      background: colors.cardBg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'white'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Video URL (YouTube, Vimeo, or Direct) *</label>
                  <input
                    type="url"
                    value={videoForm.videoUrl}
                    onChange={(e) => setVideoForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                    placeholder="https://youtube.com/watch?v=..."
                    style={{
                      width: '100%',
                      background: colors.cardBg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'white'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Video Description</label>
                  <textarea
                    value={videoForm.description}
                    onChange={(e) => setVideoForm(prev => ({ ...prev, description: e.target.value }))}
                    rows="3"
                    placeholder="What will students learn in this video?"
                    style={{
                      width: '100%',
                      background: colors.cardBg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'white',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Duration (optional)</label>
                  <input
                    type="text"
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 12:34"
                    style={{
                      width: '100%',
                      background: colors.cardBg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'white'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Thumbnail (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setVideoForm(prev => ({ ...prev, thumbnail: reader.result }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    style={{
                      width: '100%',
                      background: colors.cardBg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '12px',
                      padding: '10px',
                      color: colors.textMuted
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
                <button
                  onClick={() => setShowVideoModal(false)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: `1px solid ${colors.border}`,
                    padding: '12px',
                    borderRadius: '12px',
                    color: colors.textMuted,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleVideoSubmit}
                  style={{
                    flex: 1,
                    background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`,
                    border: 'none',
                    padding: '12px',
                    borderRadius: '12px',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {editingVideo ? 'Save Changes' : 'Add Video'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostSkills;