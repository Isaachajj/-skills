import React, { useState } from 'react';

function Login({ onRegisterClick, onNavigate }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    // Baada ya login, mleta Register.jsx
    if (onRegisterClick) {
      onRegisterClick();
    }
  };

// Cyan/Blue theme colors from Navbar
  const accentColor = '#22d3ee';
  const accentHover = '#06b6d4';
  const darkBg = '#111827';
  const darkBgMid = '#1e293b';
  const lightText = '#e2e8f0';
  const darkText = '#94a3b8';
  const inputBg = '#1e293b';
  const inputBorder = '#334155';

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: "'Poppins', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #0a0f1c 0%, #111827 50%, #0a0f1c 100%)',
    backgroundAttachment: 'fixed',
    animation: 'fadeIn 0.8s ease-out'
  };

const formWrapperStyle = {
    background: 'rgba(17, 24, 39, 0.9)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(34, 211, 238, 0.1)',
    width: '100%',
    maxWidth: '400px',
    animation: 'fadeInUp 0.6s ease-out',
    border: '1px solid rgba(34, 211, 238, 0.15)'
  };

const headingStyle = {
    textAlign: 'center',
    color: lightText,
    fontSize: '1.8rem',
    marginBottom: '10px',
    fontWeight: '700',
    animation: 'fadeInUp 0.5s ease-out 0.2s both',
    textShadow: '0 0 20px rgba(34, 211, 238, 0.3)'
  };

  const subHeadingStyle = {
    textAlign: 'center',
    color: darkText,
    fontSize: '0.95rem',
    marginBottom: '30px',
    animation: 'fadeInUp 0.5s ease-out 0.3s both'
  };

  const formGroupStyle = {
    marginBottom: '20px',
    animation: 'fadeInUp 0.5s ease-out'
  };

const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: accentColor,
    fontWeight: '600',
    fontSize: '0.9rem'
  };

const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    border: '2px solid ' + inputBorder,
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: inputBg,
    color: lightText,
    outline: 'none',
    boxSizing: 'border-box'
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: accentColor,
    boxShadow: '0 0 0 3px rgba(34, 211, 238, 0.2)',
    background: darkBgMid,
    transform: 'scale(1.02)'
  };

  const passwordWrapperStyle = {
    position: 'relative'
  };

const toggleBtnStyle = {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.1rem',
    color: darkText,
    transition: 'all 0.3s ease'
  };

const submitBtnStyle = {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px',
    animation: 'fadeInUp 0.5s ease-out 0.4s both',
    boxShadow: '0 4px 15px rgba(34, 211, 238, 0.3)'
  };

  const linkStyle = {
    textAlign: 'center',
    marginTop: '20px',
    animation: 'fadeIn 0.5s ease-out 0.5s both'
  };

const linkTextStyle = {
    color: accentColor,
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    display: 'inline-block'
  };

  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={containerStyle}>
        <div style={formWrapperStyle}>
          <h2 style={headingStyle}>Login</h2>
          <p style={subHeadingStyle}>Welcome back! Please login to your account.</p>
          
          <form onSubmit={handleSubmit}>
            <div style={formGroupStyle}>
              <label htmlFor="email" style={labelStyle}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                style={inputStyle}
                onFocus={(e) => e.target.style.cssText = Object.entries(inputFocusStyle).map(([k, v]) => `${k}: ${v}`).join('; ')}
                onBlur={(e) => e.target.style.cssText = Object.entries(inputStyle).map(([k, v]) => `${k}: ${v}`).join('; ')}
onMouseEnter={(e) => {
                  e.target.style.borderColor = accentColor;
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(34, 211, 238, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = inputBorder;
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            <div style={formGroupStyle}>
              <label htmlFor="password" style={labelStyle}>Password</label>
              <div style={passwordWrapperStyle}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.cssText = Object.entries(inputFocusStyle).map(([k, v]) => `${k}: ${v}`).join('; ')}
                  onBlur={(e) => e.target.style.cssText = Object.entries(inputStyle).map(([k, v]) => `${k}: ${v}`).join('; ')}
onMouseEnter={(e) => {
                  e.target.style.borderColor = accentColor;
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(34, 211, 238, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = inputBorder;
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
                <button
                  type="button"
                  style={toggleBtnStyle}
onClick={() => setShowPassword(!showPassword)}
                  onMouseEnter={(e) => {
                    e.target.style.color = accentColor;
                    e.target.style.transform = 'translateY(-50%) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = darkText;
                    e.target.style.transform = 'translateY(-50%) scale(1)';
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

<button
              type="submit"
              style={submitBtnStyle}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)';
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 10px 25px rgba(34, 211, 238, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(34, 211, 238, 0.3)';
              }}
              onActive={(e) => {
                e.target.style.transform = 'translateY(-1px) scale(0.98)';
              }}
            >
              Login
            </button>
          </form>

          <div style={linkStyle}>
<a href="#" style={linkTextStyle} onClick={(e) => {
              e.preventDefault();
              if (onRegisterClick) onRegisterClick();
            }} onMouseEnter={(e) => {
              e.target.style.color = '#06b6d4';
              e.target.style.textDecoration = 'underline';
              e.target.style.transform = 'scale(1.05)';
              e.target.style.textShadow = '0 0 10px rgba(34, 211, 238, 0.5)';
            }} onMouseLeave={(e) => {
              e.target.style.color = accentColor;
              e.target.style.textDecoration = 'none';
              e.target.style.transform = 'scale(1)';
              e.target.style.textShadow = 'none';
            }}>
              Don't have an account? Register
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
