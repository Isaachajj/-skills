import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Myprofile from './Myprofile'
import About from './About'
import ImageSlider from './ImageSlider'
import Web from './Web'
import Mobile from './Mobile'
import Cyber from './cyber'
import Datascience from './Datascience'
import Education from './Education'
import ArtificialIntelligence from './ArtificialIntelligence'
import Forex from './Forex'
import Game from './Game'
import DataEngin from './DataEngin'
import Marketing from './Marketing'
import VideoPage from './VideoPage'
import Account1 from './Account1'
import Account2 from './Account2'
import Account3 from './Account3'
import PostSkills from './PostSkills'
import CourseCategory from './CourseCategory'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [userData, setUserData] = useState(null)

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('skillhubUser')
    if (storedUser) {
      setUserData(JSON.parse(storedUser))
    }

    const handleMessage = (event) => {
      if (event.data.type === 'navigate') {
        setCurrentPage(event.data.page)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Update user data when profile changes
  const handleUpdateProfile = (updatedData) => {
    setUserData(updatedData)
    localStorage.setItem('skillhubUser', JSON.stringify(updatedData))
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('skillhubUser')
    setUserData(null)
    setCurrentPage('home')
  }

  // Handle course publication
  const handleCoursePublished = (newCourse) => {
    console.log('Course published:', newCourse)
  }

  const handleNavigate = (page, params = {}) => {
    console.log('Navigating to:', page)
    
    // Handle category navigation
    if (page && page.startsWith('category/')) {
      const categoryId = page.replace('category/', '')
      setSelectedCategory(categoryId)
      setCurrentPage('category')
      return
    }
    
    // Handle video page with course data
    if (page === 'videopage' && params.course) {
      setSelectedCourse(params.course)
      setCurrentPage('videopage')
      return
    }

    // Handle account pages (Account1, Account2, Account3)
    if (page === 'account1') {
      setCurrentPage('account1')
    } else if (page === 'account2') {
      setCurrentPage('account2')
    } else if (page === 'account3') {
      setCurrentPage('account3')
    } else if (page === 'postskills') {
      setCurrentPage('postskills')
    } else if (page === 'login') {
      setCurrentPage('login')
    } else if (page === 'register') {
      setCurrentPage('register')
    } else if (page === 'myprofile') {
      setCurrentPage('myprofile')
    } else if (page === 'about') {
      setCurrentPage('about')
    } else if (page === 'home') {
      setCurrentPage('home')
    } else if (page === 'web') {
      setCurrentPage('web')
    } else if (page === 'mobile') {
      setCurrentPage('mobile')
    } else if (page === 'cyber') {
      setCurrentPage('cyber')
    } else if (page === 'datascience') {
      setCurrentPage('datascience')
    } else if (page === 'education') {
      setCurrentPage('education')
    } else if (page === 'artificialintelligence') {
      setCurrentPage('artificialintelligence')
    } else if (page === 'forex') {
      setCurrentPage('forex')
    } else if (page === 'game') {
      setCurrentPage('game')
    } else if (page === 'dataengin') {
      setCurrentPage('dataengin')
    } else if (page === 'marketing') {
      setCurrentPage('marketing')
    } else if (page === 'videopage') {
      // For video page, get the course from localStorage if not provided
      if (!selectedCourse) {
        const storedCourse = localStorage.getItem('selectedCourse')
        if (storedCourse) {
          setSelectedCourse(JSON.parse(storedCourse))
        }
      }
      setCurrentPage('videopage')
    } else {
      setCurrentPage('home')
    }
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'login':
        return <Login onRegisterClick={() => setCurrentPage('register')} onNavigate={handleNavigate} />
      
      case 'register':
        return <Register onLoginClick={() => setCurrentPage('login')} onNavigate={handleNavigate} />
      
      case 'myprofile':
        return <Myprofile onLoginClick={() => setCurrentPage('register')} onNavigate={handleNavigate} />
      
      case 'about':
        return <About onNavigate={handleNavigate} />
      
      case 'home':
        return <Home onNavigate={handleNavigate} onRegisterClick={() => setCurrentPage('register')} />
      
      case 'category':
        return <CourseCategory 
          onNavigate={handleNavigate} 
          categoryId={selectedCategory} 
          onCourseSelect={(course) => {
            setSelectedCourse(course)
            setCurrentPage('videopage')
          }}
        />
      
      case 'videopage':
        return <VideoPage 
          onNavigate={handleNavigate} 
          selectedCourse={selectedCourse}
          userData={userData}
        />
      
      case 'web':
        return <Web onNavigate={handleNavigate} onRegisterClick={() => setCurrentPage('register')} />
      
      case 'mobile':
        return <Mobile onNavigate={handleNavigate} onRegisterClick={() => setCurrentPage('register')} />
      
      case 'cyber':
        return <Cyber onNavigate={handleNavigate} onRegisterClick={() => setCurrentPage('register')} />
      
      case 'datascience':
        return <Datascience onNavigate={handleNavigate} onRegisterClick={() => setCurrentPage('register')} />
      
      case 'education':
        return <Education onNavigate={handleNavigate} onRegisterClick={() => setCurrentPage('register')} />
      
      case 'artificialintelligence':
        return <ArtificialIntelligence onNavigate={handleNavigate} onRegisterClick={() => setCurrentPage('register')} />
      
      case 'forex':
        return <Forex onNavigate={handleNavigate} onRegisterClick={() => setCurrentPage('register')} />
      
      case 'game':
        return <Game onNavigate={handleNavigate} onRegisterClick={() => setCurrentPage('register')} />
      
      case 'dataengin':
        return <DataEngin onNavigate={handleNavigate} onRegisterClick={() => setCurrentPage('register')} />
      
      case 'marketing':
        return <Marketing onNavigate={handleNavigate} onRegisterClick={() => setCurrentPage('register')} />
      
      // Account Pages - Account1, Account2, Account3
      case 'account1':
        return <Account1 onNavigate={handleNavigate} userData={userData} onLogout={handleLogout} />
      
      case 'account2':
        return <Account2 
          onNavigate={handleNavigate} 
          userData={userData} 
          onLogout={handleLogout} 
          onUpdateProfile={handleUpdateProfile}
        />
      
      case 'account3':
        return <Account3 onNavigate={handleNavigate} userData={userData} onLogout={handleLogout} />
      
      case 'postskills':
        return <PostSkills 
          onNavigate={handleNavigate} 
          userData={userData} 
          onCoursePublished={handleCoursePublished}
        />
      
      default:
        return <Home onNavigate={handleNavigate} onRegisterClick={() => setCurrentPage('register')} />
    }
  }

  // Check if we should show Navbar (hide on video page, login, register for better experience)
  const showNavbar = currentPage !== 'videopage' && currentPage !== 'login' && currentPage !== 'register'

  return (
    <>
      {showNavbar && (
        <Navbar 
          onNavigate={handleNavigate} 
          onLoginClick={() => setCurrentPage('login')}
          onRegisterClick={() => setCurrentPage('register')}
          userData={userData}
        />
      )}
      
      {renderPage()}
    </>
  )
}

export default App