import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Account2 = ({ userData, onNavigate, onLogout, onUpdateProfile }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    website: '',
    occupation: '',
    expertise: '',
    yearsOfExperience: '',
    hourlyRate: '',
    languages: [],
    socialLinks: {
      twitter: '',
      instagram: '',
      linkedin: '',
      facebook: '',
      youtube: ''
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false
    },
    privacy: {
      showEmail: false,
      showPhone: false,
      showLocation: true
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Load user data
  useEffect(() => {
    const storedUser = localStorage.getItem('skillhubUser');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setFormData(prev => ({
        ...prev,
        fullName: parsed.fullName || '',
        email: parsed.email || '',
        phone: parsed.phone || '',
        bio: parsed.bio || '',
        occupation: parsed.occupation || '',
        expertise: parsed.expertise || '',
        yearsOfExperience: parsed.yearsOfExperience || '',
        hourlyRate: parsed.hourlyRate || '',
        location: parsed.location || '',
        website: parsed.website || '',
        languages: parsed.languages || [],
        socialLinks: parsed.socialLinks || prev.socialLinks,
        notifications: parsed.notifications || prev.notifications,
        privacy: parsed.privacy || prev.privacy
      }));
      setProfilePhoto(parsed.profilePhoto || parsed.passport || null);
      setCoverPhoto(parsed.coverPhoto || null);
    }
  }, []);

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
    success: '#10b981'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value }
    }));
  };

  const handleNotificationChange = (key) => {
    setFormData(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: !prev.notifications[key] }
    }));
  };

  const handlePrivacyChange = (key) => {
    setFormData(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: !prev.privacy[key] }
    }));
  };

  const handleLanguageToggle = (lang) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    const updatedUser = {
      ...formData,
      profilePhoto,
      coverPhoto,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('skillhubUser', JSON.stringify(updatedUser));
    
    if (onUpdateProfile) onUpdateProfile(updatedUser);
    
    setSuccessMessage('Profile updated successfully!');
    setShowSuccess(true);
    setIsEditing(false);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setSuccessMessage('Password changed successfully!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem('skillhubUser');
    localStorage.removeItem('skillhubCourses');
    localStorage.removeItem('skillhubPublicCourses');
    if (onLogout) onLogout();
    if (onNavigate) onNavigate('register');
  };

  const availableLanguages = ['English', 'Swahili', 'French', 'Arabic', 'German', 'Spanish', 'Chinese', 'Portuguese'];
  const expertiseLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'];
  const occupations = [
    'Software Engineer', 'Data Scientist', 'Cybersecurity Expert', 'UI/UX Designer',
    'Digital Marketer', 'Language Teacher', 'Business Analyst', 'Project Manager',
    'DevOps Engineer', 'Cloud Architect', 'Mobile Developer', 'Game Developer'
  ];

  // Social media platforms with emoji
  const socialPlatforms = [
    { key: 'twitter', icon: '🐦', placeholder: 'https://twitter.com/yourhandle', color: '#1DA1F2', label: 'Twitter' },
    { key: 'instagram', icon: '📸', placeholder: 'https://instagram.com/yourhandle', color: '#E4405F', label: 'Instagram' },
    { key: 'linkedin', icon: '💼', placeholder: 'https://linkedin.com/in/yourprofile', color: '#0077B5', label: 'LinkedIn' },
    { key: 'facebook', icon: '📘', placeholder: 'https://facebook.com/yourpage', color: '#1877F2', label: 'Facebook' },
    { key: 'youtube', icon: '📺', placeholder: 'https://youtube.com/c/yourchannel', color: '#FF0000', label: 'YouTube' }
  ];

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
              padding: '12px 24px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '14px',
              fontWeight: 500,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}
          >
            <span style={{ fontSize: '18px' }}>✓</span>
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cover Photo Section */}
      <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
        {coverPhoto ? (
          <img 
            src={coverPhoto} 
            alt="Cover" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`,
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)'
            }}></div>
          </div>
        )}
        
        <label style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(10px)',
          padding: '10px 16px',
          borderRadius: '30px',
          color: 'white',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}>
          <span>📷</span>
          Change Cover
          <input type="file" accept="image/*" onChange={handleCoverPhotoUpload} style={{ display: 'none' }} />
        </label>
      </div>

      {/* Profile Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Avatar and Basic Info */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', marginTop: '-60px', marginBottom: '32px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              border: `4px solid ${colors.accent}`,
              background: colors.cardBg,
              overflow: 'hidden',
              position: 'relative'
            }}>
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`
                }}>
                  {formData.fullName?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            <label style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              background: colors.accent,
              padding: '8px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '14px', color: 'white' }}>📷</span>
              <input type="file" accept="image/*" onChange={handleProfilePhotoUpload} style={{ display: 'none' }} />
            </label>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
                  {formData.fullName || 'Your Name'}
                </h1>
                <p style={{ color: colors.accent, fontSize: '14px', fontWeight: 500 }}>
                  {formData.occupation || 'Educator & Content Creator'}
                </p>
                <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap' }}>
                  {formData.location && (
                    <span style={{ fontSize: '13px', color: colors.textMuted, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>📍</span> {formData.location}
                    </span>
                  )}
                  {formData.yearsOfExperience && (
                    <span style={{ fontSize: '13px', color: colors.textMuted, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>🏆</span> {formData.yearsOfExperience} years exp
                    </span>
                  )}
                  {formData.hourlyRate && (
                    <span style={{ fontSize: '13px', color: colors.green, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>$</span> {formData.hourlyRate}/hour
                    </span>
                  )}
                </div>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`,
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '40px',
                    color: 'white',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <span>✏️</span>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: `1px solid ${colors.border}`, marginBottom: '32px', flexWrap: 'wrap' }}>
          {[
            { id: 'profile', label: 'Profile Info', icon: '👤' },
            { id: 'social', label: 'Social Links', icon: '🔗' },
            { id: 'notifications', label: 'Notifications', icon: '🔔' },
            { id: 'privacy', label: 'Privacy & Security', icon: '🛡️' }
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
                fontWeight: 500,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Info Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ background: colors.cardBg, borderRadius: '24px', padding: '32px', border: `1px solid ${colors.border}` }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    style={{ width: '100%', background: colors.darkBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '12px', color: 'white' }}
                  />
                ) : (
                  <p style={{ color: 'white', fontSize: '15px' }}>{formData.fullName || 'Not set'}</p>
                )}
              </div>
              <div>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ width: '100%', background: colors.darkBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '12px', color: 'white' }}
                  />
                ) : (
                  <p style={{ color: 'white', fontSize: '15px' }}>{formData.email || 'Not set'}</p>
                )}
              </div>
              <div>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{ width: '100%', background: colors.darkBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '12px', color: 'white' }}
                  />
                ) : (
                  <p style={{ color: 'white', fontSize: '15px' }}>{formData.phone || 'Not set'}</p>
                )}
              </div>
              <div>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Dar es Salaam, Tanzania"
                    style={{ width: '100%', background: colors.darkBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '12px', color: 'white' }}
                  />
                ) : (
                  <p style={{ color: 'white', fontSize: '15px' }}>{formData.location || 'Not set'}</p>
                )}
              </div>
              <div>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Occupation</label>
                {isEditing ? (
                  <select
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    style={{ width: '100%', background: colors.darkBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '12px', color: 'white' }}
                  >
                    <option value="">Select occupation</option>
                    {occupations.map(occ => (
                      <option key={occ} value={occ}>{occ}</option>
                    ))}
                  </select>
                ) : (
                  <p style={{ color: 'white', fontSize: '15px' }}>{formData.occupation || 'Not set'}</p>
                )}
              </div>
              <div>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Expertise Level</label>
                {isEditing ? (
                  <select
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleInputChange}
                    style={{ width: '100%', background: colors.darkBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '12px', color: 'white' }}
                  >
                    <option value="">Select level</option>
                    {expertiseLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                ) : (
                  <p style={{ color: 'white', fontSize: '15px' }}>{formData.expertise || 'Not set'}</p>
                )}
              </div>
              <div>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Years of Experience</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    style={{ width: '100%', background: colors.darkBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '12px', color: 'white' }}
                  />
                ) : (
                  <p style={{ color: 'white', fontSize: '15px' }}>{formData.yearsOfExperience || 'Not set'} years</p>
                )}
              </div>
              <div>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Hourly Rate (USD)</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    style={{ width: '100%', background: colors.darkBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '12px', color: 'white' }}
                  />
                ) : (
                  <p style={{ color: colors.green, fontSize: '15px', fontWeight: 600 }}>${formData.hourlyRate || '0'}/hour</p>
                )}
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Bio</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Tell us about yourself, your expertise, and what you teach..."
                    style={{ width: '100%', background: colors.darkBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '12px', color: 'white', resize: 'vertical' }}
                  />
                ) : (
                  <p style={{ color: colors.textMuted, fontSize: '14px', lineHeight: '1.6' }}>{formData.bio || 'No bio added yet'}</p>
                )}
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Website / Portfolio</label>
                {isEditing ? (
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                    style={{ width: '100%', background: colors.darkBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '12px', color: 'white' }}
                  />
                ) : (
                  <p style={{ color: colors.accent, fontSize: '14px' }}>
                    {formData.website ? (
                      <a href={formData.website} target="_blank" rel="noopener noreferrer" style={{ color: colors.accent, textDecoration: 'none' }}>
                        {formData.website}
                      </a>
                    ) : 'Not set'}
                  </p>
                )}
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '12px' }}>Languages You Speak</label>
                {isEditing ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {availableLanguages.map(lang => (
                      <button
                        key={lang}
                        onClick={() => handleLanguageToggle(lang)}
                        style={{
                          background: formData.languages.includes(lang) ? colors.accent : colors.darkBg,
                          border: `1px solid ${formData.languages.includes(lang) ? colors.accent : colors.border}`,
                          padding: '8px 16px',
                          borderRadius: '30px',
                          color: formData.languages.includes(lang) ? 'white' : colors.textMuted,
                          fontSize: '13px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {formData.languages.length > 0 ? (
                      formData.languages.map(lang => (
                        <span key={lang} style={{ background: colors.darkBg, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', color: colors.textMuted }}>
                          {lang}
                        </span>
                      ))
                    ) : (
                      <p style={{ color: colors.textMuted }}>No languages selected</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <div style={{ display: 'flex', gap: '16px', marginTop: '32px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{
                    background: 'transparent',
                    border: `1px solid ${colors.border}`,
                    padding: '12px 24px',
                    borderRadius: '40px',
                    color: colors.textMuted,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  style={{
                    background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`,
                    border: 'none',
                    padding: '12px 32px',
                    borderRadius: '40px',
                    color: 'white',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <span>💾</span>
                  Save Changes
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Social Links Tab */}
        {activeTab === 'social' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ background: colors.cardBg, borderRadius: '24px', padding: '32px', border: `1px solid ${colors.border}` }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Connect Your Social Media</h3>
            <p style={{ color: colors.textMuted, fontSize: '13px', marginBottom: '32px' }}>Share your social profiles to connect with more students</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {socialPlatforms.map(social => (
                <div key={social.key} style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ width: '40px', fontSize: '24px', textAlign: 'center' }}>{social.icon}</div>
                  <input
                    type="url"
                    value={formData.socialLinks[social.key]}
                    onChange={(e) => handleSocialChange(social.key, e.target.value)}
                    placeholder={social.placeholder}
                    style={{
                      flex: 1,
                      background: colors.darkBg,
                      border: `1px solid ${colors.border}`,
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleSaveProfile}
              style={{
                marginTop: '32px',
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`,
                border: 'none',
                padding: '12px 32px',
                borderRadius: '40px',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Save Social Links
            </button>
          </motion.div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ background: colors.cardBg, borderRadius: '24px', padding: '32px', border: `1px solid ${colors.border}` }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Notification Preferences</h3>
            <p style={{ color: colors.textMuted, fontSize: '13px', marginBottom: '32px' }}>Choose how you want to be notified</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { key: 'email', label: 'Email Notifications', description: 'Receive updates about your courses and students' },
                { key: 'push', label: 'Push Notifications', description: 'Get real-time alerts on your browser' },
                { key: 'sms', label: 'SMS Alerts', description: 'Important updates via text message' },
                { key: 'marketing', label: 'Marketing Emails', description: 'News about new features and promotions' }
              ].map(notif => (
                <div key={notif.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', padding: '12px 0', borderBottom: `1px solid ${colors.border}` }}>
                  <div>
                    <div style={{ color: 'white', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{notif.label}</div>
                    <div style={{ color: colors.textMuted, fontSize: '12px' }}>{notif.description}</div>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(notif.key)}
                    style={{
                      width: '52px',
                      height: '28px',
                      borderRadius: '34px',
                      background: formData.notifications[notif.key] ? colors.accent : colors.darkBg,
                      border: `1px solid ${colors.border}`,
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'white',
                      position: 'absolute',
                      top: '2px',
                      left: formData.notifications[notif.key] ? '28px' : '2px',
                      transition: 'left 0.3s ease'
                    }} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleSaveProfile}
              style={{
                marginTop: '32px',
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`,
                border: 'none',
                padding: '12px 32px',
                borderRadius: '40px',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Save Preferences
            </button>
          </motion.div>
        )}

        {/* Privacy & Security Tab */}
        {activeTab === 'privacy' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ background: colors.cardBg, borderRadius: '24px', padding: '32px', border: `1px solid ${colors.border}` }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Privacy & Security</h3>
            <p style={{ color: colors.textMuted, fontSize: '13px', marginBottom: '32px' }}>Control your privacy settings and account security</p>

            {/* Privacy Settings */}
            <div style={{ marginBottom: '32px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '16px' }}>Profile Privacy</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { key: 'showEmail', label: 'Show email on profile', description: 'Allow others to see your email address' },
                  { key: 'showPhone', label: 'Show phone number', description: 'Display your phone number on your public profile' },
                  { key: 'showLocation', label: 'Show location', description: 'Display your city and country on your profile' }
                ].map(privacy => (
                  <div key={privacy.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ color: 'white', fontSize: '14px' }}>{privacy.label}</div>
                      <div style={{ color: colors.textMuted, fontSize: '12px' }}>{privacy.description}</div>
                    </div>
                    <button
                      onClick={() => handlePrivacyChange(privacy.key)}
                      style={{
                        width: '52px',
                        height: '28px',
                        borderRadius: '34px',
                        background: formData.privacy[privacy.key] ? colors.accent : colors.darkBg,
                        border: `1px solid ${colors.border}`,
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: 'white',
                        position: 'absolute',
                        top: '2px',
                        left: formData.privacy[privacy.key] ? '28px' : '2px',
                        transition: 'left 0.3s ease'
                      }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Change Password */}
            <div style={{ marginBottom: '32px', paddingTop: '20px', borderTop: `1px solid ${colors.border}` }}>
              <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '16px' }}>Change Password</h4>
              <button
                onClick={() => setShowPasswordModal(true)}
                style={{
                  background: 'transparent',
                  border: `1px solid ${colors.accent}`,
                  padding: '10px 20px',
                  borderRadius: '40px',
                  color: colors.accent,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>🔒</span>
                Update Password
              </button>
            </div>

            {/* Delete Account */}
            <div style={{ paddingTop: '20px', borderTop: `1px solid ${colors.border}` }}>
              <h4 style={{ fontSize: '16px', fontWeight: 600, color: colors.danger, marginBottom: '16px' }}>Danger Zone</h4>
              <button
                onClick={() => setShowDeleteModal(true)}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: `1px solid ${colors.danger}`,
                  padding: '12px 24px',
                  borderRadius: '40px',
                  color: colors.danger,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>⚠️</span>
                Delete Account
              </button>
              <p style={{ color: colors.textMuted, fontSize: '11px', marginTop: '12px' }}>
                Warning: This action is irreversible. All your courses and data will be permanently deleted.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
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
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: colors.darkBg,
                borderRadius: '24px',
                maxWidth: '450px',
                width: '90%',
                padding: '32px',
                border: `1px solid ${colors.border}`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Change Password</h3>
              <p style={{ color: colors.textMuted, marginBottom: '24px' }}>Enter your current password and choose a new one</p>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Current Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword.current ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    style={{ width: '100%', background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '12px', color: 'white', paddingRight: '40px' }}
                  />
                  <button
                    onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    {showPassword.current ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>New Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword.new ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    style={{ width: '100%', background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '12px', color: 'white', paddingRight: '40px' }}
                  />
                  <button
                    onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    {showPassword.new ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Confirm New Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword.confirm ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    style={{ width: '100%', background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '12px', color: 'white', paddingRight: '40px' }}
                  />
                  <button
                    onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    {showPassword.confirm ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  style={{ flex: 1, background: 'transparent', border: `1px solid ${colors.border}`, padding: '12px', borderRadius: '12px', color: colors.textMuted, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangePassword}
                  style={{ flex: 1, background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`, border: 'none', padding: '12px', borderRadius: '12px', color: 'white', fontWeight: 600, cursor: 'pointer' }}
                >
                  Update Password
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
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
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: colors.darkBg,
                borderRadius: '24px',
                maxWidth: '400px',
                width: '90%',
                padding: '32px',
                textAlign: 'center',
                border: `1px solid ${colors.danger}`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: colors.danger, marginBottom: '12px' }}>Delete Account?</h3>
              <p style={{ color: colors.textMuted, marginBottom: '24px' }}>
                This action cannot be undone. All your courses, videos, and data will be permanently deleted.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  style={{ flex: 1, background: 'transparent', border: `1px solid ${colors.border}`, padding: '12px', borderRadius: '12px', color: colors.textMuted, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  style={{ flex: 1, background: colors.danger, border: 'none', padding: '12px', borderRadius: '12px', color: 'white', fontWeight: 600, cursor: 'pointer' }}
                >
                  Delete Forever
                </button>
              </div>
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
        input, select, textarea, button { font-family: inherit; }
      `}</style>
    </div>
  );
};

export default Account2;