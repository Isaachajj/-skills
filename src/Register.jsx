import React, { useState } from 'react';
import './Register.css';

function Register({ onLoginClick }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    course: '',
    coreSkill: '',
    expertiseLevel: '',
    bio: '',
    passport: null,
    cv: null,
    birthCertificate: null,
    certificate: null,
    portfolioLink: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

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
      [name]: files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.certificate) {
      newErrors.certificate = 'Certificate is required';
    }

    setErrors(newErrors);

if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      
      // Save user data to localStorage for profile page
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        university: formData.university,
        course: formData.course,
        coreSkill: formData.coreSkill,
        expertiseLevel: formData.expertiseLevel,
        bio: formData.bio,
        portfolioLink: formData.portfolioLink
      };
      
      // Convert passport file to base64 if exists
      if (formData.passport) {
        const reader = new FileReader();
        reader.onloadend = () => {
          userData.passport = reader.result;
          localStorage.setItem('skillhubUser', JSON.stringify(userData));
        };
        reader.readAsDataURL(formData.passport);
      } else {
        localStorage.setItem('skillhubUser', JSON.stringify(userData));
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Register as an Expert</h2>

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
                required
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
              <label htmlFor="passport">Passport Photo</label>
              <div className="passport-upload-area">
                <input
                  type="file"
                  id="passport"
                  name="passport"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <div className="passport-placeholder">
                  {formData.passport ? (
                    <img src={URL.createObjectURL(formData.passport)} alt="Passport" className="passport-preview" />
                  ) : (
                    <>
                      <svg className="passport-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <p>Upload Photo</p>
                      <small>Click to upload</small>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="university">University</label>
              <input
                type="text"
                id="university"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                placeholder="Name of university"
              />
            </div>

            <div className="form-group">
              <label htmlFor="course">Course/Field of Study</label>
              <input
                type="text"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                placeholder="Course you are studying"
              />
            </div>
          </div>

          <div className="form-row">
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

            <div className="form-group">
              <label>Expertise Level</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="expertiseLevel"
                    value="intermediate"
                    checked={formData.expertiseLevel === 'intermediate'}
                    onChange={handleInputChange}
                    required
                  />
                  Intermediate
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="expertiseLevel"
                    value="expert"
                    checked={formData.expertiseLevel === 'expert'}
                    onChange={handleInputChange}
                    required
                  />
                  Expert
                </label>
              </div>
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
              placeholder="Tell us about your experience..."
            />
            <small>{formData.bio.length}/200 characters</small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cv">Upload CV</label>
              <div className="upload-area">
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <div className="upload-placeholder">
                  <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                  </svg>
                  <p>Upload CV</p>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="birthCertificate">Birth Certificate</label>
              <div className="upload-area">
                <input
                  type="file"
                  id="birthCertificate"
                  name="birthCertificate"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <div className="upload-placeholder">
                  <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                  </svg>
                  <p>Upload</p>
                </div>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="certificate">Professional Certificate</label>
              <div className="upload-area">
                <input
                  type="file"
                  id="certificate"
                  name="certificate"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <div className="upload-placeholder">
                  <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                  </svg>
                  <p>Upload</p>
                </div>
              </div>
              {errors.certificate && <span className="error">{errors.certificate}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="portfolioLink">Portfolio Link</label>
              <input
                type="url"
                id="portfolioLink"
                name="portfolioLink"
                value={formData.portfolioLink}
                onChange={handleInputChange}
                placeholder="GitHub or LinkedIn"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
          </div>

<button type="submit" className="submit-btn">Register as an Expert</button>
        </form>
        
        <div className="login-redirect">
          <a href="#" onClick={(e) => {
            e.preventDefault();
            if (onLoginClick) onLoginClick();
          }}>
            Already have an account? Login
          </a>
        </div>
      </div>
      <div className="register-right">
        <div className="welcome-content">
          <h1>Join SkillHub Tanzania</h1>
          <p>Share your expertise and connect with learners across Tanzania.</p>
          <div className="passport-upload-section">
            <input
              type="file"
              id="passport-side"
              name="passport"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="file-input"
            />
            <div className="passport-placeholder">
              {formData.passport ? (
                <img src={URL.createObjectURL(formData.passport)} alt="Passport" className="passport-preview-large" />
              ) : (
                <>
                  <svg className="passport-icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span className="passport-text">Click to Upload Passport Size Photo</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
