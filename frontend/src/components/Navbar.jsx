import React, { useState } from 'react'
import logo from "../assets/logo.png";
import { ArrowUpRight, Menu, UserCircle, X } from 'lucide-react';

const profileImageUrl =
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces'

const ProfileButton = ({ mobile = false }) => {
    return (
        <button
            aria-label="Profile"
            className={`overflow-hidden bg-white text-black outline-none border-2 border-white rounded-full cursor-pointer flex items-center justify-center shadow-lg shadow-black/20 transition hover:scale-105 focus:ring-2 focus:ring-white/80 ${mobile ? 'w-[58px] h-[58px]' : 'ml-2 w-[50px] h-[50px]'}`}
        >
            <img
                src={profileImageUrl}
                alt="Profile"
                className="h-full w-full object-cover"
                onError={(event) => {
                    event.currentTarget.style.display = 'none'
                    event.currentTarget.nextElementSibling?.classList.remove('hidden')
                }}
            />
            <UserCircle className="hidden" size={mobile ? 32 : 28} />
        </button>
    )
}

const Navbar = ({ showBookSchedule = true, showProfile = false }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <div className={`absolute top-0 left-0 w-full z-50 flex justify-between items-center px-5 py-4 md:px-10 md:py-5 ${isMenuOpen ? 'fixed' : 'absolute'}`}>
                <div className='logo'>
                    <img src={logo} alt="logo" className='w-[100px] md:w-[120px]' />
                </div>
                <ul className='hidden lg:flex gap-[50px] text-[20px] text-white'>
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#destinations">Destinations</a>
                    <a href="#testimonials">Testimonials</a>
                    <a href="#faq">FAQ</a>
                </ul>
                {(showBookSchedule || showProfile) && (
                    <div className='hidden lg:flex items-center'>
                        {showBookSchedule && (
                            <>
                                <button className='bg-transparent outline-none border border-white rounded-[50px] cursor-pointer ml-2.5 text-white font-bold flex items-center justify-center py-[15px] px-[25px]'>Book schedule</button>
                                <button className='bg-black outline-none border border-white rounded-full cursor-pointer ml-1 text-white font-bold flex items-center justify-center w-[50px] h-[50px]'>
                                    <ArrowUpRight className='arrow' />
                                </button>
                            </>
                        )}
                        {showProfile && (
                            <ProfileButton />
                        )}
                    </div>
                )}
                <div className='lg:hidden flex items-center z-50'>
                    <button
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        className='flex h-[48px] w-[48px] items-center justify-center rounded-full border border-white/70 bg-black/20 text-white backdrop-blur-md'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black/95 backdrop-blur-md z-40 lg:hidden flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <ul className='flex flex-col gap-8 text-[24px] text-white text-center mb-10'>
                    <a href="#home" className='hover:text-gray-300 transition-colors' onClick={() => setIsMenuOpen(false)}>Home</a>
                    <a href="#about" className='hover:text-gray-300 transition-colors' onClick={() => setIsMenuOpen(false)}>About</a>
                    <a href="#destinations" className='hover:text-gray-300 transition-colors' onClick={() => setIsMenuOpen(false)}>Destinations</a>
                    <a href="#testimonials" className='hover:text-gray-300 transition-colors' onClick={() => setIsMenuOpen(false)}>Testimonials</a>
                    <a href="#faq" className='hover:text-gray-300 transition-colors' onClick={() => setIsMenuOpen(false)}>FAQ</a>
                    <a href="#" className='hover:text-gray-300 transition-colors' onClick={() => setIsMenuOpen(false)}>Blog</a>
                </ul>
                {(showBookSchedule || showProfile) && (
                    <div className='flex flex-col items-center gap-6'>
                        {showBookSchedule && (
                            <button className='bg-transparent outline-none border border-white rounded-[50px] cursor-pointer text-white font-bold flex items-center justify-center py-[15px] px-[40px] text-lg hover:bg-white hover:text-black transition-colors'>Book schedule</button>
                        )}
                        {showProfile && (
                            <div className="flex items-center gap-3 border-t border-white/15 pt-6">
                                <ProfileButton mobile />
                                <span className="text-base text-white/80">Profile</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default Navbar
