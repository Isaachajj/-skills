import { useState } from "react";

const courses = [
  {
    title: "Advanced React & Next.js: Production Mastery",
    category: "Web Development",
    duration: "58h 45m",
    lessons: 187,
    rating: 4.95,
    students: "42.3K",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=90",
    instructor: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
    },
  },
  {
    title: "Full-Stack JavaScript with Node.js & Express",
    category: "Web Development",
    duration: "46h 20m",
    lessons: 152,
    rating: 4.92,
    students: "31.7K",
    image: "https://images.unsplash.com/photo-1502807284362-262f2aa697b9?w=800&q=90",
    instructor: {
      name: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
  },
  {
    title: "Modern CSS: Tailwind, Animations & Design Systems",
    category: "Web Development",
    duration: "32h 15m",
    lessons: 98,
    rating: 4.88,
    students: "28.9K",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=90",
    instructor: {
      name: "Emma Larsson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
  },
  {
    title: "TypeScript for Professional Developers",
    category: "Web Development",
    duration: "24h 40m",
    lessons: 76,
    rating: 4.96,
    students: "19.4K",
    image: "https://images.unsplash.com/photo-1517433456452-dbda00d0d179?w=800&q=90",
    instructor: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    },
  },
  {
    title: "Performance Web Apps: Core Web Vitals & Optimization",
    category: "Web Development",
    duration: "39h 10m",
    lessons: 124,
    rating: 4.91,
    students: "36.2K",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=90",
    instructor: {
      name: "Lisa Petrov",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
  },
  {
    title: "Headless CMS & Jamstack Architecture",
    category: "Web Development",
    duration: "27h 55m",
    lessons: 89,
    rating: 4.89,
    students: "22.1K",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=90",
    instructor: {
      name: "Alex Turner",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    },
  },
  {
    title: "React Native & Cross-Platform Mobile Web",
    category: "Web Development",
    duration: "51h 30m",
    lessons: 165,
    rating: 4.93,
    students: "38.6K",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=90",
    instructor: {
      name: "Rachel Green",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
    },
  },
  {
    title: "Web Accessibility & Inclusive Design Patterns",
    category: "Web Development",
    duration: "19h 25m",
    lessons: 62,
    rating: 4.97,
    students: "15.8K",
    image: "https://images.unsplash.com/photo-1586790266406-365316d2e91c?w=800&q=90",
    instructor: {
      name: "James Okoro",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
  },
  {
    title: "Flutter & Dart: Cross-Platform Mobile Mastery",
    category: "Mobile Development",
    duration: "55h 12m",
    lessons: 178,
    rating: 4.94,
    students: "45.1K",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=90",
    instructor: {
      name: "Aisha Khan",
      avatar: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=100&q=80",
    },
  },
  {
    title: "iOS Development with SwiftUI & Swift 6",
    category: "Mobile Development",
    duration: "48h 30m",
    lessons: 159,
    rating: 4.96,
    students: "33.8K",
    image: "https://images.unsplash.com/photo-1596774206583-1982a69eeead?w=800&q=90",
    instructor: {
      name: "Carlos Mendoza",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    },
  },
  {
    title: "Advanced Machine Learning with TensorFlow",
    category: "Data Science",
    duration: "62h 18m",
    lessons: 210,
    rating: 4.93,
    students: "52.4K",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=90",
    instructor: {
      name: "Dr. Elena Vasquez",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    },
  },
  {
    title: "Python for Data Science & Big Data Analytics",
    category: "Data Science",
    duration: "41h 45m",
    lessons: 142,
    rating: 4.91,
    students: "39.7K",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=90",
    instructor: {
      name: "Raj Patel",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
  },
  {
    title: "Figma & Adobe XD: Professional UI/UX Design",
    category: "UI/UX Design",
    duration: "35h 50m",
    lessons: 112,
    rating: 4.95,
    students: "29.3K",
    image: "https://images.unsplash.com/photo-1559028005-7f8e11f15b23?w=800&q=90",
    instructor: {
      name: "Sophia Nguyen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
  },
  {
    title: "Docker, Kubernetes & Cloud Native DevOps",
    category: "DevOps",
    duration: "44h 25m",
    lessons: 148,
    rating: 4.90,
    students: "27.6K",
    image: "https://images.unsplash.com/photo-1614370132626-bca37f9ca3f8?w=800&q=90",
    instructor: {
      name: "Marcus Bello",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    },
  },
  {
    title: "Node.js Microservices & Serverless Architecture",
    category: "Backend Development",
    duration: "37h 10m",
    lessons: 129,
    rating: 4.92,
    students: "34.2K",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=90",
    instructor: {
      name: "Fatima Ali",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80",
    },
  },
  {
    title: "Advanced Vue.js 3 & Nuxt.js Enterprise Apps",
    category: "Frontend Development",
    duration: "29h 40m",
    lessons: 95,
    rating: 4.89,
    students: "24.5K",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=90",
    instructor: {
      name: "Liam O'Connor",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
  }
];


const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#f5c518" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const PlayIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);

const BookIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, #root {
    min-height: 100vh;
    background: #06070d;
    font-family: 'DM Sans', sans-serif;
    padding: 40px 20px;
    background-image:
      radial-gradient(ellipse 80% 60% at 20% 10%, rgba(99, 60, 255, 0.18) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 80%, rgba(0, 178, 255, 0.12) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 50% 50%, rgba(255, 60, 120, 0.06) 0%, transparent 70%);
  }

  .web-page {
    max-width: 1400px;
    margin: 0 auto;
  }

  .hero-section {
    text-align: center;
    margin-bottom: 60px;
  }

  .hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c4b5fd 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
    letter-spacing: -0.02em;
  }

  .hero-subtitle {
    font-size: 1.3rem;
    color: rgba(180, 190, 220, 0.8);
    font-weight: 400;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
    gap: 32px;
    margin-bottom: 40px;
  }

  .card-scene {
    perspective: 1200px;
  }

  .card {
    width: 100%;
    max-width: 370px;
    margin: 0 auto;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid transparent;
    background-clip: padding-box;
    position: relative;
    cursor: pointer;
    transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.45s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow:
      0 8px 32px rgba(0,0,0,0.45),
      0 2px 8px rgba(0,0,0,0.3),
      inset 0 1px 0 rgba(255,255,255,0.08);
    overflow: hidden;
  }

  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 40%, rgba(99,60,255,0.3) 80%, rgba(0,178,255,0.2) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 2;
  }

  .card:hover {
    transform: translateY(-10px) rotateX(2deg);
    box-shadow:
      0 30px 70px rgba(0,0,0,0.6),
      0 10px 30px rgba(99,60,255,0.2),
      0 4px 12px rgba(0,178,255,0.1),
      inset 0 1px 0 rgba(255,255,255,0.12);
  }

  .card:hover .hero-image {
    transform: scale(1.07);
  }

  .card:hover .play-btn {
    background: rgba(255,255,255,0.2);
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.25),
      0 0 40px rgba(255,255,255,0.15),
      0 0 80px rgba(99,60,255,0.3);
    transform: translate(-50%, -50%) scale(1.08);
  }

  .card:hover .view-btn {
    background: linear-gradient(135deg, rgba(119,80,255,0.9), rgba(60,150,255,0.85));
    box-shadow:
      0 6px 28px rgba(99,60,255,0.55),
      0 2px 8px rgba(0,178,255,0.3),
      inset 0 1px 0 rgba(255,255,255,0.2);
    letter-spacing: 0.04em;
  }

.image-wrap {
    position: relative;
    height: 150px;
    overflow: hidden;
    border-radius: 24px 24px 0 0;
  }

  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.65s cubic-bezier(0.23, 1, 0.32, 1);
    display: block;
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom,
      rgba(6,7,13,0.15) 0%,
      rgba(6,7,13,0.1) 50%,
      rgba(6,7,13,0.65) 100%);
  }

  .play-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.1),
      0 0 24px rgba(255,255,255,0.08),
      0 0 50px rgba(99,60,255,0.2);
    transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 3;
    padding-left: 3px;
  }

  .instructor-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 30px;
    padding: 4px 12px 4px 4px;
    z-index: 4;
    box-shadow: 0 2px 12px rgba(0,0,0,0.25);
  }

  .instructor-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    border: 1.5px solid rgba(255,255,255,0.3);
    display: block;
  }

  .instructor-name {
    font-family: 'DM Sans', sans-serif;
    font-size: 11.5px;
    font-weight: 500;
    color: rgba(255,255,255,0.92);
    letter-spacing: 0.01em;
    white-space: nowrap;
  }

  .category-tag {
    position: absolute;
    bottom: 14px;
    left: 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(180,200,255,0.95);
    background: rgba(99,60,255,0.28);
    border: 1px solid rgba(99,60,255,0.45);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 4px 10px;
    border-radius: 6px;
    z-index: 4;
  }

  .body {
    padding: 22px 22px 20px;
    position: relative;
    z-index: 1;
  }

  .meta-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 14px;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: rgba(180,190,220,0.65);
    font-weight: 400;
  }

  .rating-wrap {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-left: auto;
  }

  .rating-score {
    font-size: 13px;
    font-weight: 600;
    color: #f5c518;
    font-family: 'Syne', sans-serif;
  }

  .title {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: rgba(240,244,255,0.97);
    line-height: 1.35;
    letter-spacing: -0.01em;
    margin-bottom: 18px;
  }

  .divider {
    height: 1px;
    background: linear-gradient(to right, rgba(255,255,255,0.0), rgba(255,255,255,0.07), rgba(99,60,255,0.18), rgba(255,255,255,0.0));
    margin-bottom: 18px;
  }

  .footer {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .students-pill {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: rgba(160,175,210,0.7);
    font-weight: 400;
  }

  .view-btn {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, rgba(99,60,255,0.75), rgba(30,130,255,0.7));
    border: 1px solid rgba(120,90,255,0.4);
    border-radius: 12px;
    padding: 10px 18px;
    color: rgba(240,244,255,0.97);
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow:
      0 4px 16px rgba(99,60,255,0.3),
      inset 0 1px 0 rgba(255,255,255,0.15);
    white-space: nowrap;
  }

  .shimmer-line {
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%);
    animation: shimmer 4s ease-in-out infinite;
    pointer-events: none;
    z-index: 5;
    border-radius: 24px;
  }

  @keyframes shimmer {
    0% { left: -100%; opacity: 0; }
    20% { opacity: 1; }
    60% { opacity: 1; }
    100% { left: 160%; opacity: 0; }
  }

  @media (max-width: 768px) {
    .cards-grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    
    .hero-section {
      margin-bottom: 40px;
    }

    .back-btn span {
      display: none;
    }
  }

  .back-btn {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 20;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    padding: 12px 16px;
    color: rgba(255, 255, 255, 0.95);
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow:
      0 4px 20px rgba(0,0,0,0.3),
      inset 0 1px 0 rgba(255,255,255,0.1);
    text-decoration: none;
  }

  .back-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    box-shadow:
      0 8px 32px rgba(99,60,255,0.3),
      0 4px 16px rgba(0,0,0,0.4),
      inset 0 1px 0 rgba(255,255,255,0.2);
    transform: translateY(-1px);
  }

  .back-btn:active {
    transform: translateY(0);
  }
`;

function CourseCard({ course }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="card-scene">
      <div
        className="card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="shimmer-line" />
        <div className="image-wrap">
          <img
            className="hero-image"
            src={course.image}
            alt={course.title}
          />
          <div className="image-overlay" />
          <div className="play-btn">
            <PlayIcon />
          </div>
          <div className="instructor-badge">
            <img
              className="instructor-avatar"
              src={course.instructor.avatar}
              alt={course.instructor.name}
            />
            <span className="instructor-name">{course.instructor.name}</span>
          </div>
          <div className="category-tag">{course.category}</div>
        </div>
        <div className="body">
          <div className="meta-row">
            <span className="meta-item">
              <ClockIcon /> {course.duration}
            </span>
            <span className="meta-item">
              <BookIcon /> {course.lessons} lessons
            </span>
            <div className="rating-wrap">
              <StarIcon />
              <span className="rating-score">{course.rating}</span>
            </div>
          </div>
          <h2 className="title">{course.title}</h2>
          <div className="divider" />
          <div className="footer">
            <div className="students-pill">
              <UsersIcon />
              {course.students} enrolled
            </div>
            <button className="view-btn">
              View Course <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackButton() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={goBack}
      className="back-btn"
      aria-label="Rudi nyuma"
    >
      <BackIcon />
      <span>Rudi Nyuma</span>
    </button>
  );
}

export default function Web() {
  return (
    <>
      <style>{styles}</style>
      <div className="web-page" style={{position: 'relative'}}>
        <BackButton />
        <div className="hero-section">
          <h1 className="hero-title">Featured Web Development Courses</h1>
          <p className="hero-subtitle">
            Production-ready skills for senior developers and web experts. Advanced patterns, performance optimization, and modern architectures.
          </p>
        </div>
        <div className="cards-grid">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </>
  );
}
