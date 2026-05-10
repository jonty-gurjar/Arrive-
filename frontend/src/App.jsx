import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './pages/Hero.jsx'
import About from './pages/About.jsx'
import Destination from './pages/Destination.jsx'
import Testimonials from './pages/Testimonials.jsx'
import Faq from './pages/Faq.jsx'
import Footer from './components/Footer.jsx'
import Booking from './pages/Page.tsx'
import Signup from './pages/Signup.tsx'
import Holiday from './pages/Holiday.jsx'

const HolidaysPage = () => (
  <div>
    <Navbar />
    <Hero />
    <About />
    <Destination />
    <Testimonials />
    <Faq />
    <Footer />
  </div>
)

const App = () => {
  if (window.location.pathname === '/booking') {
    return <Booking />
  }

  if (window.location.pathname === '/signup') {
    return <Signup />
  }

  if (window.location.pathname === '/holidays') {
    return <Holiday />
  }

  return <HolidaysPage />
}

export default App
