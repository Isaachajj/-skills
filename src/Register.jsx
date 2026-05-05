import React, { useState } from 'react';
import './Register.css';

function Register({ onLoginClick }) {
  const [formData, setFormData] = useState({
    fullName: '',
    profilePhoto: null
  });


  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.profilePhoto) newErrors.profilePhoto = 'Profile photo is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSaving(true);
      console.log('Register submitted:', formData);
      
      const userData = {
        fullName: formData.fullName
      };

      // Handle profile photo
      if (formData.profilePhoto) {
        await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            userData.profilePhoto = reader.result;
            resolve();
          };
          reader.readAsDataURL(formData.profilePhoto);
        });
      }

      localStorage.setItem('skillhubUser', JSON.stringify(userData));
      setSaving(false);
      window.parent.postMessage({ type: 'navigate', page: 'account' }, '*');
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <form className="register-form" onSubmit={handleSubmit}>
<h2>Register</h2>

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
              {errors.fullName && <span className="error">{errors.fullName}</span>}
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="profilePhoto">Profile Photo</label>
            {errors.profilePhoto && <span className="error">{errors.profilePhoto}</span>}
            <div className="passport-upload-area">
              <input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
                className="file-input"
              />
              <div className="passport-placeholder">
                {formData.profilePhoto ? (
                  <img src={URL.createObjectURL(formData.profilePhoto)} alt="Profile Photo" className="passport-preview" />
                ) : (
                  <>
                    <svg className="passport-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="7" r="4"></circle>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    </svg>
                    <p>Upload Profile Photo</p>
                    <small>JPG, PNG up to 5MB</small>
                  </>
                )}
              </div>
            </div>
          </div>

          <button type="submit" disabled={saving} className="submit-btn">
            {saving ? 'Saving...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

