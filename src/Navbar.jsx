import React, { useState, useEffect, useRef } from 'react';

function Navbar({ onNavigate, onLoginClick, onRegisterClick }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [activeLink, setActiveLink] = useState('');
const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

// Translation content
  const translations = {
    EN: {
      searchPlaceholder: "Search skills, courses, or locations...",
      explore: "Explore",
      howItWork: "How it Work",
      topExperts: "Top Experts",
      about: "About",
      signIn: "Sign In",
      myProfile: "My Profile",
      mySkills: "My Skills",
      booking: "Booking",
      settings: "Settings",
      logout: "Logout"
    },
    SW: {
      searchPlaceholder: "Tafuta ujuzi, kozi, au maeneo...",
      explore: "Gundua",
      howItWork: "Inavyofanya",
      topExperts: "Wataalam Top",
      about: "Kuhusu",
      signIn: "Ingia",
      myProfile: "Wasifu Wangu",
      mySkills: "Ujuzi Wangu",
      booking: "Kuhudumu",
      settings: "Mipangilio",
      logout: "Toka"
    }
  };

  const t = translations[language];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'SW' : 'EN');
  };

const colors = {
    darkBg: '#ffffff',
    darkBgMid: '#f8f9fa',
    darkBgLight: '#f1f5f9',
    cyan: '#0ea5e9',
    cyanDark: '#0284c7',
    blue: '#3b82f6',
    blueDark: '#1d4ed8',
    lightGrey: '#f4f7f9',
    border: '#e2e8f0',
    textLight: '#1e3a8a',
    textDark: '#64748b',
    glassBg: 'rgba(255, 255, 255, 0.95)'
  };

const handleNavClick = (link) => {
    setActiveLink(link);
    if (onNavigate) {
      onNavigate(link.toLowerCase().replace(' ', '-'));
    }
  };

  const handleLanguageToggle = () => {
    setLanguage(language === 'EN' ? 'SW' : 'EN');
  };

const navbarStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: colors.glassBg,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(14, 165, 233, 0.15)',
    fontFamily: "'Poppins', sans-serif",
    backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
    backgroundSize: '200% 200%'
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px'
  };

  // LEFT: Logo
  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    cursor: 'pointer',
    flexShrink: 0
  };

const logoIconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    boxShadow: '0 2px 10px rgba(14, 165, 233, 0.3)'
  };

  const logoTextStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const skillTextStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: colors.textLight,
    letterSpacing: '-0.5px',
    lineHeight: '1.1'
  };

  const hubTextStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: colors.cyan
  };

  const logoSubtextStyle = {
    fontSize: '10px',
    color: colors.textDark,
    fontWeight: '500',
    letterSpacing: '1px'
  };

  // MIDDLE: Search Bar
const searchContainerStyle = {
    flex: '1',
    maxWidth: '500px',
    display: 'flex',
    alignItems: 'center',
    background: colors.darkBgMid,
    borderRadius: '8px',
    border: '1px solid rgba(14, 165, 233, 0.2)',
    overflow: 'hidden'
  };

const categorySelectStyle = {
    background: 'transparent',
    border: 'none',
    borderRight: '1px solid rgba(14, 165, 233, 0.2)',
    padding: '10px 12px',
    fontSize: '12px',
    color: colors.textDark,
    cursor: 'pointer',
    outline: 'none',
    height: '40px',
    display: 'flex',
    alignItems: 'center'
  };

  const searchInputStyle = {
    flex: '1',
    padding: '10px 12px',
    border: 'none',
    fontSize: '14px',
    outline: 'none',
    background: 'transparent',
    color: colors.textLight
  };

const searchBtnStyle = {
    background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    border: 'none',
    padding: '10px 16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(14, 165, 233, 0.3)'
  };

  // RIGHT: Links + Icons
  const rightSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0
  };

  const navLinkStyle = (isActive) => ({
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: '500',
    color: isActive ? colors.cyan : colors.textLight,
    textDecoration: 'none',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    background: isActive ? 'rgba(14, 165, 233, 0.15)' : 'transparent',
    border: isActive ? '1px solid rgba(14, 165, 233, 0.3)' : '1px solid transparent'
  });

  const iconButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '8px',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.textLight,
    position: 'relative'
  };

  const notificationBadge = {
    position: 'absolute',
    top: '2px',
    right: '2px',
    width: '8px',
    height: '8px',
    background: '#ef4444',
    borderRadius: '50%',
    border: '2px solid ' + colors.darkBg
  };

const signInBtnStyle = {
    background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(14, 165, 233, 0.3)'
  };

const dividerStyle = {
    width: '1px',
    height: '24px',
    background: 'rgba(14, 165, 233, 0.3)',
    margin: '0 8px'
  };

  // Profile Dropdown Menu
  const profileDropdownStyle = {
    position: 'absolute',
    top: '100%',
    right: '0',
    marginTop: '8px',
    width: '200px',
    background: colors.darkBgMid,
    borderRadius: '8px',
    border: '1px solid rgba(14, 165, 233, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    overflow: 'hidden',
    zIndex: 1001,
    opacity: isProfileOpen ? 1 : 0,
    visibility: isProfileOpen ? 'visible' : 'hidden',
    transform: isProfileOpen ? 'translateY(0)' : 'translateY(-10px)',
    transition: 'all 0.2s ease'
  };

  const dropdownItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    fontSize: '14px',
    color: colors.textLight,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderBottom: '1px solid rgba(14, 165, 233, 0.1)'
  };

  const dropdownIconStyle = {
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px'
  };

  return (
    <nav style={navbarStyle}>
      <div style={containerStyle}>
        {/* LEFT: Logo */}
        <a href="#" style={logoContainerStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <div style={logoIconStyle}>🎓</div>
          <div style={logoTextStyle}>
            <span style={logoTextStyle}>
              <span style={skillTextStyle}>Skill</span>
              <span style={hubTextStyle}>Hub</span>
            </span>
            <span style={logoSubtextStyle}>.tz</span>
          </div>
        </a>

        {/* MIDDLE: Search Bar */}
        <div style={searchContainerStyle}>
          <select style={categorySelectStyle}>
            <option>Skills</option>
            <option>Location</option>
            <option>Experts</option>
          </select>
<input
            type="text"
            placeholder={t.searchPlaceholder}
            style={searchInputStyle}
            onFocus={(e) => {
              e.target.parentElement.style.borderColor = 'rgba(14, 165, 233, 0.5)';
              e.target.parentElement.style.boxShadow = '0 0 8px rgba(14, 165, 233, 0.2)';
            }}
            onBlur={(e) => {
              e.target.parentElement.style.borderColor = 'rgba(14, 165, 233, 0.2)';
              e.target.parentElement.style.boxShadow = 'none';
            }}
          />
          <button style={searchBtnStyle}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #0284c7 0%, #075984 100%)';
              e.target.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.5)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)';
              e.target.style.boxShadow = '0 2px 8px rgba(14, 165, 233, 0.3)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🔍
          </button>
        </div>

        {/* RIGHT: Links + Icons */}
        <div style={rightSectionStyle}>
{/* Navigation Links */}
          <a href="#" style={navLinkStyle(activeLink === 'Explore')}
            onClick={() => handleNavClick('Explore')}
            onMouseEnter={(e) => {
              if (activeLink !== 'Explore') {
                e.currentTarget.style.background = 'rgba(14, 165, 233, 0.1)';
                e.currentTarget.style.color = colors.cyan;
              }
            }}
            onMouseLeave={(e) => {
              if (activeLink !== 'Explore') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = colors.textLight;
              }
            }}
          >
            {t.explore}
          </a>
          <a href="#" style={navLinkStyle(activeLink === 'How it Work')}
            onClick={() => handleNavClick('How it Work')}
            onMouseEnter={(e) => {
              if (activeLink !== 'How it Work') {
                e.currentTarget.style.background = 'rgba(14, 165, 233, 0.1)';
                e.currentTarget.style.color = colors.cyan;
              }
            }}
            onMouseLeave={(e) => {
              if (activeLink !== 'How it Work') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = colors.textLight;
              }
            }}
          >
            {t.howItWork}
          </a>
          <a href="#" style={navLinkStyle(activeLink === 'Top Experts')}
            onClick={() => handleNavClick('Top Experts')}
            onMouseEnter={(e) => {
              if (activeLink !== 'Top Experts') {
                e.currentTarget.style.background = 'rgba(14, 165, 233, 0.1)';
                e.currentTarget.style.color = colors.cyan;
              }
            }}
            onMouseLeave={(e) => {
              if (activeLink !== 'Top Experts') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = colors.textLight;
              }
            }}
          >
            {t.topExperts}
          </a>
          <a href="#" style={navLinkStyle(activeLink === 'About')}
            onClick={() => handleNavClick('About')}
            onMouseEnter={(e) => {
              if (activeLink !== 'About') {
                e.currentTarget.style.background = 'rgba(14, 165, 233, 0.1)';
                e.currentTarget.style.color = colors.cyan;
              }
            }}
            onMouseLeave={(e) => {
              if (activeLink !== 'About') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = colors.textLight;
              }
            }}
          >
            {t.about}
          </a>

          {/* Divider */}
          <div style={dividerStyle}></div>

{/* Language Toggle */}
          <button style={iconButtonStyle}
            onClick={handleLanguageToggle}
            title={language === 'EN' ? 'Switch to Swahili' : 'Switch to English'}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(14, 165, 233, 0.15)';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(14, 165, 233, 0.4)';
              e.currentTarget.style.color = colors.cyan;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.color = colors.textLight;
            }}
          >
            🌐
          </button>

          {/* Notification Bell */}
          <button style={iconButtonStyle}
            onClick={() => console.log('Notifications')}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(14, 165, 233, 0.15)';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(14, 165, 233, 0.4)';
              e.currentTarget.style.color = colors.cyan;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.color = colors.textLight;
            }}
          >
            🔔
            <span style={notificationBadge}></span>
          </button>

{/* Profile Dropdown */}
          <div style={{ position: 'relative' }} ref={profileRef}>
            <button style={iconButtonStyle}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(14, 165, 233, 0.15)';
                e.currentTarget.style.boxShadow = '0 0 12px rgba(14, 165, 233, 0.4)';
                e.currentTarget.style.color = colors.cyan;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.color = colors.textLight;
              }}
            >
              👤
            </button>
            
            {/* Dropdown Menu */}
            <div style={profileDropdownStyle}>
<div 
                style={dropdownItemStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(14, 165, 233, 0.15)';
                  e.currentTarget.style.color = colors.cyan;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = colors.textLight;
                }}
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('myprofile');
                  }
                  setIsProfileOpen(false);
                }}
              >
                <span style={dropdownIconStyle}>👤</span>
                {t.myProfile}
              </div>
              <div 
                style={dropdownItemStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(14, 165, 233, 0.15)';
                  e.currentTarget.style.color = colors.cyan;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = colors.textLight;
                }}
                onClick={() => {
                  console.log('My Skills');
                  setIsProfileOpen(false);
                }}
              >
                <span style={dropdownIconStyle}>⚡</span>
                {t.mySkills}
              </div>
              <div 
                style={dropdownItemStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(14, 165, 233, 0.15)';
                  e.currentTarget.style.color = colors.cyan;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = colors.textLight;
                }}
                onClick={() => {
                  console.log('Booking');
                  setIsProfileOpen(false);
                }}
              >
                <span style={dropdownIconStyle}>📅</span>
                {t.booking}
              </div>
              <div 
                style={dropdownItemStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(14, 165, 233, 0.15)';
                  e.currentTarget.style.color = colors.cyan;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = colors.textLight;
                }}
                onClick={() => {
                  console.log('Settings');
                  setIsProfileOpen(false);
                }}
              >
                <span style={dropdownIconStyle}>⚙️</span>
                {t.settings}
              </div>
              <div 
                style={{...dropdownItemStyle, borderBottom: 'none', color: '#ef4444'}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                  e.currentTarget.style.color = '#ef4444';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#ef4444';
                }}
                onClick={() => {
                  console.log('Logout');
                  setIsProfileOpen(false);
                }}
              >
                <span style={dropdownIconStyle}>🚪</span>
                {t.logout}
              </div>
            </div>
          </div>

{/* Sign In Button */}
          <button style={signInBtnStyle}
            onClick={onLoginClick}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #0284c7 0%, #075984 100%)';
              e.target.style.boxShadow = '0 4px 15px rgba(14, 165, 233, 0.5)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)';
              e.target.style.boxShadow = '0 2px 8px rgba(14, 165, 233, 0.3)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {t.signIn}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
