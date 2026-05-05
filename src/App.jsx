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
import Account from './Account'
import './App.css'

function App() {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'navigate') {
        setCurrentPage(event.data.page);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const [currentPage, setCurrentPage] = useState('videopage')

  const handleNavigation = (page) => {
    if (page === 'login') {
      setCurrentPage('login');
    } else if (page === 'register') {
      setCurrentPage('register');
    } else if (page === 'myprofile') {
      setCurrentPage('myprofile');
    } else if (page === 'about') {
      setCurrentPage('about');
    } else if (page === 'home') {
      setCurrentPage('home');
    } else if (page === 'web') {
      setCurrentPage('web');
    } else if (page === 'mobile') {
      setCurrentPage('mobile');
    } else if (page === 'cyber') {
      setCurrentPage('cyber');
    } else if (page === 'datascience') {
      setCurrentPage('datascience');
    } else if (page === 'education') {
      setCurrentPage('education');
    } else if (page === 'artificialintelligence') {
      setCurrentPage('artificialintelligence');
    } else if (page === 'forex') {
      setCurrentPage('forex');
    } else if (page === 'game') {
      setCurrentPage('game');
    } else if (page === 'dataengin') {
      setCurrentPage('dataengin');
    } else if (page === 'marketing') {
      setCurrentPage('marketing');
    } else if (page === 'account') {
      setCurrentPage('account');
    } else if (page === 'videopage') {
      setCurrentPage('videopage');
    } else {
      setCurrentPage('home');
    }
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'login':
        return <Login onRegisterClick={() => setCurrentPage('register')} />;
      case 'register':
        return <Register onLoginClick={() => setCurrentPage('login')} />;
      case 'myprofile':
        return <Myprofile onLoginClick={() => setCurrentPage('register')} />;
      case 'about':
        return <About />;
      case 'home':
        return <Home onNavigate={handleNavigation} onRegisterClick={() => setCurrentPage('register')} />;
      case 'web':
        return <Web onNavigate={handleNavigation} onRegisterClick={() => setCurrentPage('register')} />;
      case 'mobile':
        return <Mobile onNavigate={handleNavigation} onRegisterClick={() => setCurrentPage('register')} />;
      case 'cyber':
        return <Cyber onNavigate={handleNavigation} onRegisterClick={() => setCurrentPage('register')} />;
      case 'datascience':
        return <Datascience onNavigate={handleNavigation} onRegisterClick={() => setCurrentPage('register')} />;
      case 'education':
        return <Education onNavigate={handleNavigation} onRegisterClick={() => setCurrentPage('register')} />;
      case 'artificialintelligence':
        return <ArtificialIntelligence onNavigate={handleNavigation} onRegisterClick={() => setCurrentPage('register')} />;
      case 'forex':
        return <Forex onNavigate={handleNavigation} onRegisterClick={() => setCurrentPage('register')} />;
      case 'game':
        return <Game onNavigate={handleNavigation} onRegisterClick={() => setCurrentPage('register')} />;
      case 'dataengin':
        return <DataEngin onNavigate={handleNavigation} onRegisterClick={() => setCurrentPage('register')} />;
      case 'marketing':
        return <Marketing onNavigate={handleNavigation} onRegisterClick={() => setCurrentPage('register')} />;
      case 'account':
        return <Account onNavigate={handleNavigation} />;
      case 'videopage':
        return <VideoPage onNavigate={handleNavigation} onRegisterClick={() => setCurrentPage('register')} />;
      default:
        return <Home onNavigate={handleNavigation} onRegisterClick={() => setCurrentPage('register')} />;
    }
  };

  return (
    <>
      <Navbar 
        onNavigate={handleNavigation} 
        onLoginClick={() => setCurrentPage('login')}
        onRegisterClick={() => setCurrentPage('register')}
      />
      
      {renderPage()}
    </>
  )
}

export default App

