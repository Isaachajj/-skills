import React, { useState, useEffect } from 'react';
import './Register.css';

function Myprofile({ onLoginClick }) {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coreSkill: '',
    expertiseLevel: '',
    bio: '',
    profilePhoto: null,
    workSample: null,
    portfolioLink: ''
  });

  useEffect(() => {
    // Load user data from localStorage
    const savedData = localStorage.getItem('skillhubUser');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUserData(parsed);
      setFormData({
        ...parsed,
        profilePhoto: parsed.profilePhoto || parsed.passport || null,
        workSample: parsed.workSample || null
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0] || null
    }));
  };

  const handleSave = async () => {
    const updatedData = { ...formData };

    // Handle profile photo
    if (formData.profilePhoto instanceof File) {
      await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          updatedData.profilePhoto = reader.result;
          resolve();
        };
        reader.readAsDataURL(formData.profilePhoto);
      });
    }

    // Handle work sample
    if (formData.workSample instanceof File) {
      await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          updatedData.workSample = reader.result;
          resolve();
        };
        reader.readAsDataURL(formData.workSample);
      });
    }

    localStorage.setItem('skillhubUser', JSON.stringify(updatedData));
    setUserData(updatedData);
    setIsEditing(false);
  };

  const skills = {
    programming: 'Programming',
    'cyber-security': 'Cyber Security',
    'web-development': 'Web Development',
    'data-science': 'Data Science',
    design: 'Design',
    marketing: 'Marketing'
  };

  const getSkillLabel = (value) => skills[value] || value;

  const profileImage = userData?.profilePhoto || userData?.passport;

  if (!userData || (!userData.fullName && !profileImage)) {
    return (
      <div className="register-container">
        <div className="register-left">
          <div className="register-form" style={{ textAlign: 'center' }}>
            <h2>No Profile Found</h2>
            <p style={{ color: '#94a3b8', marginBottom: '20px' }}>
              Please register first to view your profile.
            </p>
            <button 
              className="submit-btn" 
              onClick={() => {
                if (onLoginClick) onLoginClick();
              }}
            >
              Register Now
            </button>
          </div>
        </div>
        <div className="register-right">
          <div className="welcome-content">
            <h1>Welcome to SkillHub Tanzania</h1>
            <p>Create your profile and start sharing your expertise.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-left">
        <form className="register-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <h2>My Profile</h2>

          {isEditing ? (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="coreSkill">Your Main Skill</label>
                  <select
                    id="coreSkill"
                    name="coreSkill"
                    value={formData.coreSkill}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a skill</option>
                    <option value="programming">Programming</option>
                    <option value="cyber-security">Cyber Security</option>
                    <option value="web-development">Web Development</option>
                    <option value="data-science">Data Science</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expertiseLevel">Expertise Level</label>
                  <select
                    id="expertiseLevel"
                    name="expertiseLevel"
                    value={formData.expertiseLevel}
                    onChange={handleInputChange}
                  >
                    <option value="">Select level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="profilePhoto">Profile Photo</label>
                <div className="passport-upload-area">
                  <input
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    accept="image/jpeg,image/png"
                    onChange={handleFileChange}
                  />
                  {formData.profilePhoto ? (
                    <img src={URL.createObjectURL(formData.profilePhoto)} alt="Preview" className="passport-preview" />
                  ) : profileImage ? (
                    <img src={profileImage} alt="Current" className="passport-preview" />
                  ) : null}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="workSample">Work Sample</label>
                <div className="passport-upload-area">
                  <input
                    type="file"
                    id="workSample"
                    name="workSample"
                    accept="image/jpeg,image/png"
                    onChange={handleFileChange}
                  />
                  {formData.workSample ? (
                    <img src={URL.createObjectURL(formData.workSample)} alt="Preview" className="passport-preview" />
                  ) : userData?.workSample ? (
                    <img src={userData.workSample} alt="Current" className="passport-preview" />
                  ) : null}
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="bio">Brief Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  maxLength="200"
                  rows="2"
                />
              </div>

              <div className="form-group">
                <label htmlFor="portfolioLink">Portfolio Link</label>
                <input
                  type="url"
                  id="portfolioLink"
                  name="portfolioLink"
                  value={formData.portfolioLink}
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className="submit-btn">Save Changes</button>
              <button 
                type="button" 
                className="submit-btn" 
                style={{ background: '#64748b', marginTop: '10px' }}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <p style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>{userData.fullName}</p>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <p style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>{userData.email || '-'}</p>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <p style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>{userData.phone}</p>
                </div>

                <div className="form-group">
                  <label>Main Skill</label>
                  <p style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>{getSkillLabel(userData.coreSkill)}</p>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Expertise Level</label>
                <p style={{ color: '#22d3ee', fontSize: '0.95rem', textTransform: 'capitalize' }}>
                  {userData.expertiseLevel}
                </p>
              </div>

              <div className="form-group full-width">
                <label>Bio</label>
                <p style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>{userData.bio || '-'}</p>
              </div>

              {userData.portfolioLink && (
                <div className="form-group full-width">
                  <label>Portfolio Link</label>
                  <a 
                    href={userData.portfolioLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#22d3ee', fontSize: '0.95rem', textDecoration: 'none' }}
                  >
                    {userData.portfolioLink}
                  </a>
                </div>
              )}

              <button 
                type="button" 
                className="submit-btn"
                onClick={() => {
                  setFormData({
                    ...userData,
                    profilePhoto: userData.profilePhoto || userData.passport || null,
                    workSample: userData.workSample || null
                  });
                  setIsEditing(true);
                }}
              >
                Edit Profile
              </button>
            </>
          )}
        </form>
      </div>

      <div className="register-right">
        <div className="welcome-content">
          <h1>My Profile</h1>
          <p>View and manage your expert profile.</p>
          
          {profileImage ? (
            <div className="passport-upload-section">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="passport-preview-large" 
              />
            </div>
          ) : (
            <div className="passport-upload-section" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
              <svg className="passport-icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="7" r="4"></circle>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              </svg>
              <span className="passport-text">No Photo Uploaded</span>
            </div>
          )}

          {userData?.coreSkill && (
            <div style={{ 
              marginTop: '20px', 
              padding: '12px 20px', 
              background: 'rgba(34, 211, 238, 0.15)',
              borderRadius: '50px',
              border: '1px solid rgba(34, 211, 238, 0.3)'
            }}>
              <span style={{ color: '#22d3ee', fontWeight: '600' }}>
                {getSkillLabel(userData.coreSkill)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Myprofile;

