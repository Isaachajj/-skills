import React, { useState, useEffect } from 'react';

function StatsCategories() {
  const stats = [
    { number: '500+', label: 'Experts', target: 500, suffix: '+' },
    { number: '200+', label: 'Skills', target: 200, suffix: '+' },
    { number: '1000+', label: 'Students', target: 1000, suffix: '+' },
    { number: '50+', label: 'Partners', target: 50, suffix: '+' }
  ];

  const categories = [
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      ), 
      title: 'Cyber Security',
      desc: 'Learn to protect systems & networks'
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ), 
      title: 'Web Development',
      desc: 'Build modern websites & apps'
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
      ), 
      title: 'Graphic Design',
      desc: 'Create stunning visuals'
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ), 
      title: 'Business',
      desc: 'Start & grow your business'
    }
  ];

  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        clearInterval(timer);
        setHasAnimated(true);
      }
      setCounters(stats.map(s => Math.min(Math.floor((s.target / steps) * step), s.target)));
    }, interval);
    
    return () => clearInterval(timer);
  }, [hasAnimated]);

return (
    <>
      {/* Categories Section */}
      <div className="w-full bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-4">
              Popular Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most in-demand courses and start learning from industry experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="group bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-cyan-200 hover:-translate-y-2"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-[#e0f2fe] flex items-center justify-center mb-6 text-[#0284c7] group-hover:bg-[#0ea5e9] group-hover:text-white transition-all duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1e3a8a] mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {category.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default StatsCategories;
