import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Briefcase, 
  CreditCard, 
  ShieldCheck, 
  LogOut, 
  Globe, 
  Edit3, 
  LayoutDashboard,
  CheckCircle,
  Clock
} from 'lucide-react';

const Account = ({ onNavigate, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [language, setLanguage] = useState('EN');

  const translations = {
    EN: {
      dashboard: 'Skillhub Dashboard',
      profile: 'Profile Details',
      bookings: 'My Bookings',
      skills: 'Skills & Services',
      payments: 'Wallet & Payments',
      security: 'Security Settings',
      edit: 'Edit Profile',
      logout: 'Sign Out',
      expert: 'Verified Expert',
      save: 'Save Changes',
      cancel: 'Cancel'
    },
    SW: {
      dashboard: 'Dashibodi ya Skillhub',
      profile: 'Maelezo ya Wasifu',
      bookings: 'Mahudumu Yangu',
      skills: 'Ujuzi na Huduma',
      payments: 'Mkoba na Malipo',
      security: 'Mipangilio ya Usalama',
      edit: 'Hariri Wasifu',
      logout: 'Toka',
      expert: 'Mtaalamu Aliyethibitishwa',
      save: 'Hifadhi',
      cancel: 'Ghairi'
    }
  };

  const t = translations[language];

  useEffect(() => {
    const savedData = localStorage.getItem('skillhubUser');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setUserData(parsed);
      setFormData(parsed);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('skillhubUser', JSON.stringify(formData));
    setUserData(formData);
    setIsEditing(false);
  };

  if (!userData) return null;

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 mb-2 ${
        activeTab === id 
        ? 'bg-gradient-to-r from-cyan-500/20 to-transparent border-l-4 border-cyan-400 text-cyan-400' 
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium tracking-wide">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#06070d] text-white font-[Syne] overflow-x-hidden">
      {/* Background Decorative Blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
              <LayoutDashboard className="text-cyan-400" />
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {t.dashboard}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === 'EN' ? 'SW' : 'EN')}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm font-bold"
            >
              <Globe size={16} /> {language}
            </button>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all text-sm font-bold"
            >
              <LogOut size={16} /> {t.logout}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          
          {/* Sidebar Area */}
          <aside className="space-y-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 text-center shadow-2xl">
              <div className="relative inline-block group mb-4">
                <img 
                  src={userData.profilePhoto || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=80'} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border-4 border-cyan-500/30 object-cover"
                />
                <div className="absolute bottom-0 right-0 p-1.5 bg-cyan-500 rounded-full border-2 border-[#06070d]">
                  <CheckCircle size={14} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">{userData.fullName}</h3>
              <p className="text-xs text-cyan-400 font-black tracking-widest uppercase mb-4">{t.expert}</p>
              
              <div className="pt-6 border-t border-white/10 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Reputation</span>
                  <span className="text-white font-bold">4.9/5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Projects</span>
                  <span className="text-white font-bold">28</span>
                </div>
              </div>
            </div>

            <nav className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-3 shadow-2xl">
              <NavItem id="profile" icon={User} label={translations[language].profile} />
              <NavItem id="bookings" icon={Clock} label={translations[language].bookings} />
              <NavItem id="skills" icon={Briefcase} label={translations[language].skills} />
              <NavItem id="payments" icon={CreditCard} label={translations[language].payments} />
              <NavItem id="security" icon={ShieldCheck} label={translations[language].security} />
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl min-h-[600px]">
            
            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black">{t.profile}</h2>
                  {!isEditing && (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold transition-all"
                    >
                      <Edit3 size={18} /> {t.edit}
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-6 max-w-xl">
                    <div className="group">
                      <label className="block text-sm text-gray-400 mb-2 font-bold ml-1">Full Name</label>
                      <input 
                        name="fullName" 
                        value={formData.fullName || ''} 
                        onChange={handleInputChange} 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-cyan-400 outline-none transition-all"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm text-gray-400 mb-2 font-bold ml-1">Bio</label>
                      <textarea 
                        name="bio" 
                        value={formData.bio || ''} 
                        onChange={handleInputChange} 
                        rows="4"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-cyan-400 outline-none transition-all resize-none"
                      />
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button onClick={handleSave} className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-black shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-all">
                        {t.save}
                      </button>
                      <button onClick={() => setIsEditing(false)} className="flex-1 bg-white/5 border border-white/10 py-4 rounded-2xl font-black hover:bg-white/10 transition-all">
                        {t.cancel}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="p-6 bg-white/2 border border-white/5 rounded-2xl">
                        <p className="text-sm text-gray-500 mb-2 font-bold uppercase tracking-widest">Full Name</p>
                        <p className="text-xl font-bold">{userData.fullName}</p>
                      </div>
                      <div className="p-6 bg-white/2 border border-white/5 rounded-2xl">
                        <p className="text-sm text-gray-500 mb-2 font-bold uppercase tracking-widest">Contact Number</p>
                        <p className="text-xl font-bold">{userData.phone || '+255 XXX XXX XXX'}</p>
                      </div>
                    </div>
                    <div className="p-6 bg-white/2 border border-white/5 rounded-2xl">
                      <p className="text-sm text-gray-500 mb-2 font-bold uppercase tracking-widest">About / Professional Bio</p>
                      <p className="text-gray-300 leading-relaxed font-[DM_Sans]">
                        {userData.bio || 'Please update your bio to showcase your expertise.'}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Empty States for other tabs */}
            {activeTab !== 'profile' && (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-600">
                  <LayoutDashboard size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">Section Coming Soon</h3>
                <p className="text-gray-400 font-[DM_Sans]">We are currently working on your {activeTab} dashboard.</p>
              </div>
            )}

          </main>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500&display=swap');
      `}</style>
    </div>
  );
};

export default Account;