import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign, TrendingUp, Users, Video, Star, Award, Calendar,
  Download, Filter, Search, MoreVertical, Eye, ThumbsUp,
  MessageCircle, Share2, Clock, CheckCircle, AlertCircle,
  BarChart3, PieChart, Activity, CreditCard, Wallet,
  ArrowUp, ArrowDown, Menu, X, FileText, Settings,
  Bell, Gift, Zap, Target, Crown, Sparkles, BookOpen,
  Play, Lock, Unlock, Plus, Edit, Trash2, Send
} from 'lucide-react';

const Account3 = ({ userData, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('earnings');
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('bank');

  // Load data from localStorage
  useEffect(() => {
    const storedCourses = localStorage.getItem('skillhubCourses');
    const storedUser = localStorage.getItem('skillhubUser');
    
    if (storedCourses) {
      const allCourses = JSON.parse(storedCourses);
      const myCourses = allCourses.filter(c => c.authorId === (userData?.id || 'current-user'));
      setCourses(myCourses);
    }
    
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed.students) setStudents(parsed.students);
      if (parsed.transactions) setTransactions(parsed.transactions);
    }
    
    // Mock data for demonstration
    if (students.length === 0) {
      setStudents(mockStudents);
    }
    if (transactions.length === 0) {
      setTransactions(mockTransactions);
    }
  }, [userData]);

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
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444'
  };

  // Calculate totals
  const totalRevenue = transactions.reduce((sum, t) => sum + (t.amount > 0 ? t.amount : 0), 0);
  const pendingWithdrawals = Math.abs(transactions.filter(t => t.type === 'withdrawal' && t.status === 'pending').reduce((sum, t) => sum + t.amount, 0));
  const availableBalance = totalRevenue - pendingWithdrawals;
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const totalCourses = courses.length;
  const totalViews = courses.reduce((sum, c) => sum + (c.views || 0), 0);
  const totalLikes = courses.reduce((sum, c) => sum + (c.likes || 0), 0);

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (parseFloat(withdrawAmount) > availableBalance) {
      alert('Insufficient balance');
      return;
    }
    
    const newTransaction = {
      id: Date.now(),
      type: 'withdrawal',
      amount: -parseFloat(withdrawAmount),
      method: withdrawMethod,
      date: new Date().toISOString(),
      status: 'pending',
      courseName: null
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    setShowWithdrawModal(false);
    setWithdrawAmount('');
    
    // Save to localStorage
    const storedUser = localStorage.getItem('skillhubUser');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      parsed.transactions = [newTransaction, ...(parsed.transactions || [])];
      localStorage.setItem('skillhubUser', JSON.stringify(parsed));
    }
    
    alert('Withdrawal request sent successfully!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.darkBg} 0%, #0a0f1c 100%)`,
      fontFamily: "'Inter', sans-serif"
    }}>
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
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => onNavigate?.('account1')}>
            <div style={{
              width: '40px',
              height: '40px',
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.purple})`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>💰</div>
            <div>
              <span style={{ fontWeight: 800, fontSize: '20px', color: 'white' }}>My</span>
              <span style={{ fontWeight: 800, fontSize: '20px', color: colors.accent }}>Earnings</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => onNavigate?.('account2')}
              style={{
                background: 'transparent',
                border: `1px solid ${colors.border}`,
                padding: '10px 20px',
                borderRadius: '40px',
                color: colors.textMuted,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Settings size={16} />
              Settings
            </button>
            <button
              onClick={() => setShowWithdrawModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: `linear-gradient(135deg, ${colors.green}, ${colors.accent})`,
                border: 'none',
                padding: '10px 24px',
                borderRadius: '40px',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Wallet size={18} />
              Withdraw Funds
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Balance Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: `linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(139, 92, 246, 0.1))`,
              borderRadius: '24px',
              padding: '24px',
              border: `1px solid ${colors.border}`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ color: colors.textMuted, fontSize: '14px' }}>Available Balance</span>
              <DollarSign size={24} color={colors.accent} />
            </div>
            <div style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
              ${availableBalance.toLocaleString()}
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span style={{ fontSize: '12px', color: colors.green, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ArrowUp size={12} /> +12% from last month
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              background: colors.cardBg,
              borderRadius: '24px',
              padding: '24px',
              border: `1px solid ${colors.border}`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ color: colors.textMuted, fontSize: '14px' }}>Total Revenue</span>
              <TrendingUp size={24} color={colors.green} />
            </div>
            <div style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
              ${totalRevenue.toLocaleString()}
            </div>
            <div style={{ fontSize: '12px', color: colors.textMuted }}>Lifetime earnings</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: colors.cardBg,
              borderRadius: '24px',
              padding: '24px',
              border: `1px solid ${colors.border}`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ color: colors.textMuted, fontSize: '14px' }}>Pending Withdrawals</span>
              <Clock size={24} color={colors.orange} />
            </div>
            <div style={{ fontSize: '36px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
              ${pendingWithdrawals.toLocaleString()}
            </div>
            <div style={{ fontSize: '12px', color: colors.textMuted }}>Processing in 2-3 business days</div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {[
            { label: 'Total Students', value: totalStudents, icon: <Users size={20} />, color: colors.accent },
            { label: 'Active Courses', value: totalCourses, icon: <Video size={20} />, color: colors.purple },
            { label: 'Total Views', value: totalViews.toLocaleString(), icon: <Eye size={20} />, color: colors.green },
            { label: 'Total Likes', value: totalLikes.toLocaleString(), icon: <ThumbsUp size={20} />, color: colors.pink }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              style={{
                background: colors.cardBg,
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
                border: `1px solid ${colors.border}`
              }}
            >
              <div style={{ color: stat.color, marginBottom: '12px' }}>{stat.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: colors.textMuted }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: `1px solid ${colors.border}`, marginBottom: '24px', flexWrap: 'wrap' }}>
          {[
            { id: 'earnings', label: '💰 Earnings History', icon: <DollarSign size={16} /> },
            { id: 'students', label: '👥 My Students', icon: <Users size={16} /> },
            { id: 'analytics', label: '📊 Course Analytics', icon: <BarChart3 size={16} /> }
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
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ background: colors.cardBg, borderRadius: '24px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}
          >
            <div style={{ padding: '24px', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white' }}>Transaction History</h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  style={{
                    background: colors.darkBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '12px',
                    padding: '8px 16px',
                    color: 'white',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  <option value="weekly">This Week</option>
                  <option value="monthly">This Month</option>
                  <option value="yearly">This Year</option>
                  <option value="all">All Time</option>
                </select>
                <button style={{
                  background: colors.darkBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '12px',
                  padding: '8px 16px',
                  color: colors.textMuted,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}>
                  <Download size={14} />
                  Export
                </button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${colors.border}`, color: colors.textMuted, fontSize: '13px' }}>
                    <th style={{ padding: '16px', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '16px', textAlign: 'left' }}>Description</th>
                    <th style={{ padding: '16px', textAlign: 'left' }}>Course</th>
                    <th style={{ padding: '16px', textAlign: 'right' }}>Amount</th>
                    <th style={{ padding: '16px', textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '60px', color: colors.textMuted }}>
                        <DollarSign size={48} style={{ marginBottom: '16px', opacity: 0.5, margin: '0 auto' }} />
                        <p>No transactions yet</p>
                        <p style={{ fontSize: '13px', marginTop: '4px' }}>When students enroll, transactions will appear here</p>
                      </td>
                    </tr>
                  ) : (
                    transactions.map((transaction, i) => (
                      <motion.tr
                        key={transaction.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        style={{ borderBottom: `1px solid ${colors.border}` }}
                      >
                        <td style={{ padding: '16px', fontSize: '13px', color: colors.textMuted }}>
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '16px', fontSize: '13px', color: 'white' }}>
                          {transaction.type === 'enrollment' ? 'Course Enrollment' : 
                           transaction.type === 'withdrawal' ? 'Withdrawal' : 'Subscription'}
                        </td>
                        <td style={{ padding: '16px', fontSize: '13px', color: colors.textMuted }}>
                          {transaction.courseName || '-'}
                        </td>
                        <td style={{ 
                          padding: '16px', 
                          textAlign: 'right', 
                          fontSize: '14px', 
                          fontWeight: 600,
                          color: transaction.amount > 0 ? colors.green : colors.danger
                        }}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          <span style={{
                            background: transaction.status === 'completed' ? 'rgba(16, 185, 129, 0.15)' : 
                                      transaction.status === 'pending' ? 'rgba(245, 158, 11, 0.15)' : 
                                      'rgba(239, 68, 68, 0.15)',
                            color: transaction.status === 'completed' ? colors.green : 
                                   transaction.status === 'pending' ? colors.orange : colors.danger,
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: 600
                          }}>
                            {transaction.status === 'completed' ? 'Completed' : 
                             transaction.status === 'pending' ? 'Pending' : 'Failed'}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ background: colors.cardBg, borderRadius: '24px', border: `1px solid ${colors.border}`, overflow: 'hidden' }}
          >
            <div style={{ padding: '24px', borderBottom: `1px solid ${colors.border}` }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>My Students</h3>
              <p style={{ color: colors.textMuted, fontSize: '13px' }}>Students enrolled in your courses</p>
            </div>

            <div style={{ padding: '24px' }}>
              {students.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: colors.textMuted }}>
                  <Users size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                  <p>No students enrolled yet</p>
                  <p style={{ fontSize: '13px' }}>Share your courses to attract students</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {students.map((student, i) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '16px',
                        padding: '16px',
                        background: colors.darkBg,
                        borderRadius: '16px',
                        border: `1px solid ${colors.border}`
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <img 
                          src={student.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&q=80'} 
                          alt={student.name}
                          style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: 'white', marginBottom: '4px' }}>{student.name}</div>
                          <div style={{ fontSize: '12px', color: colors.textMuted }}>{student.email}</div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        <div>
                          <div style={{ fontSize: '11px', color: colors.textMuted }}>Enrolled Course</div>
                          <div style={{ fontSize: '13px', color: 'white', fontWeight: 500 }}>{student.courseName}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: colors.textMuted }}>Progress</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '80px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ width: `${student.progress}%`, height: '100%', background: colors.accent, borderRadius: '4px' }}></div>
                            </div>
                            <span style={{ fontSize: '12px', color: colors.textMuted }}>{student.progress}%</span>
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: colors.textMuted }}>Joined</div>
                          <div style={{ fontSize: '13px', color: 'white' }}>{new Date(student.joinedDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                      
                      <button style={{
                        background: 'transparent',
                        border: `1px solid ${colors.accent}`,
                        borderRadius: '30px',
                        padding: '6px 16px',
                        color: colors.accent,
                        fontSize: '12px',
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
                        <MessageCircle size={14} style={{ display: 'inline', marginRight: '6px' }} />
                        Message
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'grid', gap: '24px' }}
          >
            {/* Course Performance Chart */}
            <div style={{
              background: colors.cardBg,
              borderRadius: '24px',
              padding: '24px',
              border: `1px solid ${colors.border}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white' }}>Course Performance</h3>
                <select style={{
                  background: colors.darkBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '10px',
                  padding: '6px 12px',
                  color: colors.textMuted,
                  fontSize: '12px'
                }}>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>All time</option>
                </select>
              </div>
              
              {courses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: colors.textMuted }}>
                  <BarChart3 size={40} style={{ marginBottom: '12px', opacity: 0.5 }} />
                  <p>No course data available</p>
                  <p style={{ fontSize: '13px', marginTop: '4px' }}>Create and publish courses to see analytics</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {courses.map((course, i) => (
                    <div key={course.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '13px', color: 'white' }}>{course.title}</span>
                        <span style={{ fontSize: '13px', color: colors.accent }}>{course.views || 0} views</span>
                      </div>
                      <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${Math.min(100, ((course.views || 0) / 1000) * 100)}%`,
                          height: '100%',
                          background: `linear-gradient(90deg, ${colors.accent}, ${colors.purple})`,
                          borderRadius: '4px'
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Engagement Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div style={{
                background: colors.cardBg,
                borderRadius: '24px',
                padding: '24px',
                border: `1px solid ${colors.border}`
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '16px' }}>🏆 Top Performing Course</h3>
                {courses[0] ? (
                  <>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: colors.accent, marginBottom: '8px' }}>{courses[0].title}</div>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '13px', color: colors.textMuted }}>👁️ {courses[0].views || 0} views</span>
                      <span style={{ fontSize: '13px', color: colors.textMuted }}>❤️ {courses[0].likes || 0} likes</span>
                      <span style={{ fontSize: '13px', color: colors.textMuted }}>👥 {courses[0].students || 0} students</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                      <div style={{ width: '75%', height: '100%', background: colors.green, borderRadius: '4px' }}></div>
                    </div>
                    <p style={{ fontSize: '11px', color: colors.textMuted, marginTop: '12px' }}>Completion rate: 68%</p>
                  </>
                ) : (
                  <p style={{ color: colors.textMuted }}>No courses yet</p>
                )}
              </div>

              <div style={{
                background: colors.cardBg,
                borderRadius: '24px',
                padding: '24px',
                border: `1px solid ${colors.border}`
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '16px' }}>📈 Revenue Breakdown</h3>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: colors.textMuted, fontSize: '13px' }}>Course Sales</span>
                    <span style={{ color: 'white', fontWeight: 600 }}>${totalRevenue}</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${totalRevenue > 0 ? 70 : 0}%`, height: '100%', background: colors.accent, borderRadius: '4px' }}></div>
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: colors.textMuted, fontSize: '13px' }}>Subscriptions</span>
                    <span style={{ color: 'white', fontWeight: 600 }}>$0</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '0%', height: '100%', background: colors.purple, borderRadius: '4px' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: colors.textMuted, fontSize: '13px' }}>Affiliate Commission</span>
                    <span style={{ color: 'white', fontWeight: 600 }}>$0</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '0%', height: '100%', background: colors.orange, borderRadius: '4px' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Chart Summary */}
            <div style={{
              background: colors.cardBg,
              borderRadius: '24px',
              padding: '24px',
              border: `1px solid ${colors.border}`
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '20px' }}>Monthly Performance</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '150px', padding: '10px 0' }}>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => {
                  const height = Math.random() * 120 + 20;
                  return (
                    <div key={month} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{
                        height: `${height}px`,
                        background: `linear-gradient(to top, ${colors.accent}, ${colors.purple})`,
                        borderRadius: '6px 6px 0 0',
                        transition: 'height 0.5s ease',
                        cursor: 'pointer'
                      }}></div>
                      <div style={{ fontSize: '10px', color: colors.textMuted, marginTop: '8px' }}>{month}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px', paddingTop: '16px', borderTop: `1px solid ${colors.border}` }}>
                <div><span style={{ color: colors.accent }}>●</span> <span style={{ fontSize: '12px', color: colors.textMuted }}>Revenue</span></div>
                <div><span style={{ color: colors.green }}>●</span> <span style={{ fontSize: '12px', color: colors.textMuted }}>Students</span></div>
                <div><span style={{ color: colors.orange }}>●</span> <span style={{ fontSize: '12px', color: colors.textMuted }}>Views</span></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {showWithdrawModal && (
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
            onClick={() => setShowWithdrawModal(false)}
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
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Withdraw Funds</h3>
              <p style={{ color: colors.textMuted, marginBottom: '24px' }}>
                Available balance: <strong style={{ color: colors.green }}>${availableBalance.toLocaleString()}</strong>
              </p>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Withdrawal Method</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setWithdrawMethod('bank')}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: withdrawMethod === 'bank' ? `linear-gradient(135deg, ${colors.accent}, ${colors.purple})` : colors.cardBg,
                      border: `1px solid ${withdrawMethod === 'bank' ? colors.accent : colors.border}`,
                      borderRadius: '12px',
                      color: withdrawMethod === 'bank' ? 'white' : colors.textMuted,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    🏦 Bank Transfer
                  </button>
                  <button
                    onClick={() => setWithdrawMethod('mobile')}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: withdrawMethod === 'mobile' ? `linear-gradient(135deg, ${colors.accent}, ${colors.purple})` : colors.cardBg,
                      border: `1px solid ${withdrawMethod === 'mobile' ? colors.accent : colors.border}`,
                      borderRadius: '12px',
                      color: withdrawMethod === 'mobile' ? 'white' : colors.textMuted,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    📱 Mobile Money
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', color: colors.textMuted, fontSize: '13px', marginBottom: '8px' }}>Amount (USD)</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount"
                  style={{
                    width: '100%',
                    background: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '12px',
                    padding: '14px',
                    color: 'white',
                    fontSize: '16px'
                  }}
                />
                <p style={{ fontSize: '11px', color: colors.textMuted, marginTop: '8px' }}>
                  Minimum withdrawal: $20. Processing fee: 2%
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setShowWithdrawModal(false)}
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
                  onClick={handleWithdraw}
                  style={{
                    flex: 1,
                    background: `linear-gradient(135deg, ${colors.green}, ${colors.accent})`,
                    border: 'none',
                    padding: '12px',
                    borderRadius: '12px',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Request Withdrawal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mock Data
const mockStudents = [
  { id: 1, name: 'John Mwangi', email: 'john.mwangi@example.com', courseName: 'React Mastery', progress: 75, joinedDate: '2024-01-15', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&q=80', status: 'active' },
  { id: 2, name: 'Aisha Mohamed', email: 'aisha@example.com', courseName: 'Python Programming', progress: 45, joinedDate: '2024-02-01', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&q=80', status: 'active' },
  { id: 3, name: 'James Kilonzo', email: 'james@example.com', courseName: 'React Mastery', progress: 90, joinedDate: '2024-01-20', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&q=80', status: 'active' },
  { id: 4, name: 'Fatma Hassan', email: 'fatma@example.com', courseName: 'UI/UX Design', progress: 30, joinedDate: '2024-02-10', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&q=80', status: 'inactive' },
  { id: 5, name: 'Oscar Peter', email: 'oscar@example.com', courseName: 'Full-Stack Web', progress: 60, joinedDate: '2024-01-25', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&q=80', status: 'active' }
];

const mockTransactions = [
  { id: 1, type: 'enrollment', amount: 49.99, courseName: 'React Mastery', date: '2024-02-15', status: 'completed' },
  { id: 2, type: 'enrollment', amount: 39.99, courseName: 'Python Programming', date: '2024-02-10', status: 'completed' },
  { id: 3, type: 'enrollment', amount: 59.99, courseName: 'Full-Stack Web', date: '2024-02-05', status: 'completed' },
  { id: 4, type: 'withdrawal', amount: -150, courseName: null, date: '2024-01-28', status: 'completed' },
  { id: 5, type: 'enrollment', amount: 49.99, courseName: 'React Mastery', date: '2024-01-20', status: 'completed' },
  { id: 6, type: 'enrollment', amount: 29.99, courseName: 'Digital Marketing', date: '2024-01-15', status: 'pending' }
];

export default Account3;