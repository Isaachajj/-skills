import { useState } from 'react'
import Navbar from './Navbar'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Myprofile from './Myprofile'
import ImageSlider from './ImageSlider'
import Web from './Web'
import Mobile from './Mobile'
import Cyber from './cyber'
import Datascience from './Datascience'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

const handleNavigation = (page) => {
    if (page === 'login') {
      setCurrentPage('login');
    } else if (page === 'register') {
      setCurrentPage('register');
  } else if (page === 'myprofile') {
      setCurrentPage('myprofile');
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
