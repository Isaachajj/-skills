import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload } from 'lucide-react';

// Visionary Card Component with Image Upload
const VisinaryCard = ({ name, title, description, tags, emoji, profileColor }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div 
      variants={{ hidden: { scale: 0.8, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { delay: 0.3, duration: 0.6, type: 'spring' } } }} 
      whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(14, 165, 233, 0.4)', transition: { duration: 0.3 } }}
      className="w-full max-w-md mx-auto justify-self-center backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 p-10 rounded-3xl text-center group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative mx-auto w-56 h-56 rounded-full border-4 border-[#0ea5e9] p-2 mb-8 overflow-hidden">
        {profileImage ? (
          <img src={profileImage} alt={name} className="w-full h-full rounded-full object-cover" />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-7xl">
            {emoji}
          </div>
        )}
        
        {/* Upload Button Overlay */}
        {isHovering && (
          <motion.label
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center cursor-pointer group/upload hover:bg-black/70 transition-colors"
          >
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="hidden" 
            />
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-white" />
              <span className="text-xs text-white font-bold">Upload Photo</span>
            </div>
          </motion.label>
        )}
      </div>

      <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-tight">{name}</h3>
      <p className="text-base text-[#0ea5e9] font-bold font-[DM_Sans] mb-4">{title}</p>
      <p className="text-sm text-gray-400 font-[DM_Sans] leading-relaxed mb-6 h-20">
        "{description}"
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        {tags.map((tag, idx) => (
          <span key={idx} className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm font-[DM_Sans]">
            {tag}
          </span>
        ))}
      </div>

      {/* Social Links */}
      <div className="flex gap-4 justify-center mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <a href="#" className="text-gray-300 hover:text-[#0ea5e9]">🔗</a>
        </button>
        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <a href="#" className="text-gray-300 hover:text-[#0ea5e9]">𝕏</a>
        </button>
        <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <a href="#" className="text-gray-300 hover:text-[#0ea5e9]">💼</a>
        </button>
      </div>
    </motion.div>
  );
};

const About = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

const stats = [     { number: '5K+', label: 'Students', icon: '👥' },     { number: '50+', label: 'Industry Experts', icon: '🎓' },
    { number: '20+', label: 'Free Courses', icon: '📚' },
    { number: '95%', label: 'Success Rate', icon: '⭐' }
  ];

  const values = [
    { 
      title: 'Excellence', 
      description: 'We deliver world-class quality education with rigorous international standards.',
      icon: '⭐'     },
    { 
      title: 'Accessibility', 
      description: 'Quality tech education should be available to everyone, everywhere. We make premium learning affordable globally.',
      icon: '🌐'     },
    { 
      title: 'Innovation', 
      description: 'We constantly evolve to stay ahead of industry trends across all global tech markets.',
      icon: '💼'     },
    { 
      title: 'Impact', 
      description: 'We measure success by transforming careers and building a skilled workforce for the future.',
icon: '📈'
    }
  ];

  const testimonials = [
    {
      name: 'John Mwangi',
      role: 'Full Stack Developer - Kenya',
      image: '👨‍💼',
      text: 'SkillsFuture changed my career trajectory. Within 3 months, I landed a job at a leading tech company. The platform connects you with real industry professionals.',
      rating: 5
    },
    {
      name: 'Amara Okonkwo',
      role: 'Data Scientist - Nigeria',
      image: '👩‍💻',
      text: 'The practical approach to learning is unmatched. Real projects, real mentorship, real results. I was able to transition from a different field into tech successfully.',
      rating: 5
    },
    {
      name: 'Sofia Morales',
      role: 'UI/UX Designer - Mexico',
      image: '🎨',
      text: 'World-class instructors, supportive global community, and structured curriculum. SkillsFuture helped me freelance successfully and land remote projects!',
      rating: 5
    }
  ];

  const timeline = [
    { year: '2022', event: 'SkillsFuture Founded', description: 'Started with a vision to empower learners globally' },
    { year: '2023', event: 'First 1,000 Students', description: 'Reached our first major milestone across multiple countries' },
    { year: '2024', event: '50+ Expert Instructors', description: 'Expanded with industry professionals from around the world' },
    { year: '2026', event: '100,000+ Success Stories', description: 'Transforming careers and lives globally daily' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.6,
        type: 'spring'
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 25px 50px -12px rgba(14, 165, 233, 0.4)',
      transition: { duration: 0.3 }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06070d] to-black font-[Syne] text-white overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center pt-20 px-4"
      >
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6 px-6 py-2 bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 rounded-full"
          >
            <p className="text-[#0ea5e9] font-bold text-sm tracking-wider">ABOUT SKILLSFUTURE</p>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-[#0ea5e9] via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8 leading-tight"
          >
            Empowering the World's
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl">Next Generation</span>
            <br />
            <span>of Tech Leaders</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-[DM_Sans]"
          >
            From local communities to global tech hubs—we're building the future of education, one learner at a time. SkillsFuture connects students worldwide with industry experts and real-world opportunities.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-2xl"
          >
            <p className="text-base md:text-base font-[DM_Sans] leading-relaxed text-gray-300">
              SkillsFuture isn't just another e-learning platform. We're a global movement to democratize tech education, connect industry experts with passionate learners worldwide, and create lasting economic impact in communities everywhere.
            </p>
          </motion.div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-l from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 px-4 relative"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-black text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            By The Numbers
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                variants={statVariants}
                className="text-center group"
              >
                <motion.div 
                  animate={statsVisible ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-5xl mb-4"
                >
                  {stat.icon}
                </motion.div>
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#0ea5e9] to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-lg text-gray-400 font-[DM_Sans] font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-24 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-black text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Our Foundation
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 p-10 rounded-3xl hover:border-[#0ea5e9]/50 transition-all duration-500 group cursor-pointer shadow-2xl flex flex-col"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#0ea5e9] to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-black mb-4 text-white">Our Mission</h3>
              <p className="text-lg text-gray-300 font-[DM_Sans] leading-relaxed flex-grow">
                To make world-class tech education accessible and affordable for every learner globally, bridging the digital skills gap and creating economic opportunities through practical, industry-relevant learning on the SkillsFuture platform.
              </p>
            </motion.div>

            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="backdrop-blur-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 p-10 rounded-3xl hover:border-[#0ea5e9]/50 transition-all duration-500 group cursor-pointer shadow-2xl flex flex-col"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-2xl font-black mb-4 text-white">Our Vision</h3>
              <p className="text-lg text-gray-300 font-[DM_Sans] leading-relaxed flex-grow">
                To become the world's leading tech education platform by 2030, empowering 1 million+ students and building a global network of skilled tech professionals and innovators.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Core Values Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-24 px-4 bg-gradient-to-b from-transparent to-white/5"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-black text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Our Core Values
          </motion.h2>
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={cardVariants}
                whileHover="hover"
                className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl text-center group cursor-pointer"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h4 className="text-lg font-black text-white mb-3">{value.title}</h4>
                <p className="text-gray-400 font-[DM_Sans] text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Learning Approach Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-24 px-4 relative"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-[#0ea5e9] to-purple-400 bg-clip-text text-transparent">
                Hands-on Projects,
              </span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl text-white">Not Just Theory</span>
            </h2>
            <p className="text-base text-gray-300 font-[DM_Sans] leading-relaxed mb-8">
              We believe learning happens through doing. Our curriculum is built around <strong className="text-white font-bold">real projects</strong> that mirror actual industry challenges. Every course is designed to get you hired.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                'Live coding sessions with industry experts',
                'Real-world projects that build your portfolio',
                'Mentorship from professionals working at top companies',
                'Job placement support and career guidance'
              ].map((item, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-xl">✓</span>
                  <span className="text-gray-300 font-[DM_Sans]">{item}</span>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#0ea5e9] to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
              >
                Explore Courses
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white/30 backdrop-blur-sm bg-white/10 text-white font-bold rounded-xl transition-all duration-300 text-lg hover:border-[#0ea5e9]/50"
              >
                Schedule Demo
              </motion.button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl p-8 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="text-center relative z-10">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-3xl border-2 border-[#0ea5e9]/50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12 md:w-16 md:h-16 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xl font-[DM_Sans] text-gray-300">Interactive Learning</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-24 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-black text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#0ea5e9] via-purple-500 to-pink-500"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`}
                >
                  <div className="w-1/2"></div>
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9] to-purple-500 rounded-full p-0.5">
                      <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-[#0ea5e9] to-purple-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 pt-3">
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-xl">
                      <p className="text-[#0ea5e9] font-bold text-base">{item.year}</p>
                      <h3 className="text-lg font-black text-white mt-2">{item.event}</h3>
                      <p className="text-gray-400 font-[DM_Sans] mt-2">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-24 px-4 bg-gradient-to-b from-white/5 to-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-black text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Success Stories
          </motion.h2>

<div className="grid md:grid-cols-3 gap-8 place-items-center">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={cardVariants}
                whileHover="hover"
                className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 p-8 rounded-2xl group cursor-pointer"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-sm text-gray-300 font-[DM_Sans] leading-relaxed mb-8 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{testimonial.image}</div>
                  <div>
                    <p className="font-bold text-white text-base">{testimonial.name}</p>
                    <p className="text-[#0ea5e9] text-xs font-[DM_Sans]">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Founders Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-24 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-black text-center mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Meet the Visionaries
          </motion.h2>
          <p className="text-center text-gray-400 font-[DM_Sans] mb-16 text-lg">Leading SkillsFuture's mission to transform education globally</p>

<div className="grid md:grid-cols-2 gap-12 place-items-center justify-items-center justify-center max-w-4xl mx-auto">
            {/* Isaac */}
            <VisinaryCard 
              name="IS-HAK HAJI JUMA"
              title="Co-Founder & Lead Developer"
              description="Building scalable educational technology for learners worldwide. Passionate about making world-class tech education accessible globally."
              tags={["Full Stack", "Systems"]}
              emoji="👨‍💻"
              profileColor="from-[#0ea5e9]"
            />

            {/* Yasir */}
            <VisinaryCard 
              name="YASIR MIRAJI"
              title="Co-Founder & System Architect"
              description="Scaling education technology across borders through innovation. Believes learning is the most powerful tool for global change and opportunity."
              tags={["Architecture", "Strategy"]}
              emoji="🚀"
              profileColor="from-purple-500"
            />
          </div>

          <div className="mt-16 p-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl text-center">
            <h3 className="text-2xl font-black text-white mb-4">Join Our Expert Network</h3>
            <p className="text-gray-400 font-[DM_Sans] mb-6">Are you an industry expert? Help shape the future of education on SkillsFuture's global platform.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-[#0ea5e9] to-purple-500 text-white font-bold rounded-xl"
            >
              Become an Expert
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-32 px-4 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9]/10 via-purple-500/10 to-pink-500/10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-[#0ea5e9] via-purple-400 to-white bg-clip-text text-transparent">
              Ready to Transform
              <br />
              Your Future?
            </span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 font-[DM_Sans] max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Join 100,000+ learners worldwide who've already launched their tech careers. Start learning today—completely free and accessible from anywhere.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-[#0ea5e9] via-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-[#0ea5e9]/30 hover:shadow-2xl transition-all duration-300"
            >
              Start Learning Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-white/30 backdrop-blur-sm bg-white/10 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:border-[#0ea5e9]/50 hover:bg-white/20"
            >
              Schedule a Call
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        
        * {
          font-family: 'DM Sans', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Syne', sans-serif !important;
        }
      `}</style>
    </div>
  );
};

export default About;