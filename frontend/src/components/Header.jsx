import React, { useEffect, useRef, useState } from 'react'
import { LogOut, Menu, MessageSquare, Star, X } from 'lucide-react'
import logo from '../assets/logo.png'

const profileImageUrl =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const profileActions = [
    { label: 'Rate our App', icon: Star },
    { label: 'Share Feedback', icon: MessageSquare },
    { label: 'Sign out', icon: LogOut },
  ]

  const ProfileMenu = ({ mobile = false }) => (
    <div
      className={`${
        mobile
          ? 'mt-4 w-full'
          : 'absolute right-0 top-[calc(100%+12px)] w-[210px]'
      } rounded-lg border border-white/15 bg-black/90 p-2 text-white shadow-xl shadow-black/30 backdrop-blur-md`}
    >
      {profileActions.map(({ label, icon: Icon }) => (
        <button
          key={label}
          type="button"
          className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-medium text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          onClick={() => setIsProfileOpen(false)}
        >
          <Icon size={18} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  )

  return (
    <header className="absolute left-0 top-0 z-50 w-full px-5 py-4 md:px-10 md:py-5">
      <div className="flex items-center justify-between">
        <a href="/" aria-label="Arrive home">
          <img src={logo} alt="Arrive" className="w-[100px] md:w-[120px]" />
        </a>

        <nav className="hidden items-center gap-10 text-lg text-white lg:flex">
          <a href="/holidays">Holidays</a>
          <a href="#packages">Packages</a>
          <a href="/">Home</a>
        </nav>

        <div className="relative hidden items-center gap-3 lg:flex" ref={profileMenuRef}>
          <button
            aria-label="Profile"
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
            className="h-[48px] w-[48px] overflow-hidden rounded-full border-2 border-white bg-white shadow-lg shadow-black/20 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/80"
            onClick={() => setIsProfileOpen((open) => !open)}
          >
            <img
              src={profileImageUrl}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </button>
          {isProfileOpen && <ProfileMenu />}
        </div>

        <button
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-white/70 bg-black/20 text-white backdrop-blur-md lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div
        className={`mt-5 overflow-hidden rounded-lg border border-white/20 bg-black/80 backdrop-blur-md transition-all duration-300 lg:hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-5 py-5 text-lg font-semibold text-white">
          <a href="/holidays" className="py-3" onClick={() => setIsMenuOpen(false)}>
            Holidays
          </a>
          <a href="#packages" className="py-3" onClick={() => setIsMenuOpen(false)}>
            Packages
          </a>
          <a href="/" className="py-3" onClick={() => setIsMenuOpen(false)}>
            Home
          </a>
          <div className="mt-4 border-t border-white/15 pt-5">
            <div className="flex items-center gap-3">
              <button
                aria-label="Profile"
                aria-expanded={isProfileOpen}
                aria-haspopup="menu"
                className="h-[52px] w-[52px] overflow-hidden rounded-full border-2 border-white bg-white"
                onClick={() => setIsProfileOpen((open) => !open)}
              >
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </button>
              <span className="text-sm text-white/80">Profile</span>
            </div>
            {isProfileOpen && <ProfileMenu mobile />}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
