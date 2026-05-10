import React, { useState } from 'react'
import hero_img from "../assets/hero.jpg";
import { CalendarDays, ChevronDown, MapPin, Users } from "lucide-react";
import { motion } from "motion/react";

const locations = ["Bali, Indonesia", "Paris, France", "Rome, Italy", "Tokyo, Japan"];
const dates = ["15 Aug 2026", "22 Aug 2026", "05 Sep 2026", "18 Sep 2026"];
const guests = ["1 Person", "2 People", "3 People", "4 People"];

const BookingDropdown = ({ name, options, onSelect }) => (
  <div className="absolute top-full left-0 mt-3 min-w-[190px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl z-30">
    {options.map((option) => (
      <button
        key={option}
        type="button"
        onClick={() => onSelect(name, option)}
        className="block w-full px-4 py-3 text-left text-sm text-black hover:bg-gray-100"
      >
        {option}
      </button>
    ))}
  </div>
);

const Hero = () => {
  const [booking, setBooking] = useState({
    location: locations[0],
    date: dates[0],
    guest: guests[1],
  });
  const [openDropdown, setOpenDropdown] = useState(null);

  const updateBooking = (key, value) => {
    setBooking((current) => ({ ...current, [key]: value }));
    setOpenDropdown(null);
  };

  const openBookingPage = () => {
    const bookingParams = new URLSearchParams(booking);
    window.location.href = `/booking?${bookingParams.toString()}`;
  };

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className='w-full h-screen relative text-white scroll-mt-24'
      onClick={() => setOpenDropdown(null)}
    >

      {/* Background */}
      <img 
        src={hero_img} 
        alt="hero" 
        className='w-full h-full object-cover' 
      />

      {/* Overlay */}
      <div className='absolute inset-0 from-black/40 to-transparent'></div>

      {/* Big Text */}
      <h1 className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 
                     text-[140px] md:text-[240px] font-bold z-10">
        <span className='italic'>A</span>rrive
      </h1>

      {/* ✅ Bottom Section */}
      <div className="absolute bottom-30 left-10 right-10 md:left-16 md:right-16 z-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">

        {/* Left Text */}
        <h2 className="text-3xl md:text-5xl font-semibold max-w-xl leading-tight">
          Discover Earth’s <br /> Hidden Masterpieces.
        </h2>

        {/* Booking Card */}
        <div className="bg-white text-black rounded-2xl shadow-xl px-6 py-4 flex flex-wrap items-center gap-6">

          {/* Location */}
          <div className="relative">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setOpenDropdown(openDropdown === "location" ? null : "location");
            }}
            className="flex items-center gap-2 text-left"
          >
            <MapPin color='black' size={18} />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm text-black font-medium">{booking.location}</p>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
          {openDropdown === "location" && (
            <BookingDropdown name="location" options={locations} onSelect={updateBooking} />
          )}
          </div>

          {/* Divider */}
          <div className="hidden md:block h-8 w-px bg-gray-300"></div>

          {/* Date */}
          <div className="relative">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setOpenDropdown(openDropdown === "date" ? null : "date");
            }}
            className="flex items-center gap-2 text-left"
          >
            <CalendarDays color='black' size={18} />
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-sm text-black font-medium">{booking.date}</p>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
          {openDropdown === "date" && (
            <BookingDropdown name="date" options={dates} onSelect={updateBooking} />
          )}
          </div>

          {/* Divider */}
          <div className="hidden md:block h-8 w-px bg-gray-300"></div>

          {/* Guest */}
          <div className="relative">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setOpenDropdown(openDropdown === "guest" ? null : "guest");
            }}
            className="flex items-center gap-2 text-left"
          >
            <Users color='black' size={18} />
            <div>
              <p className="text-xs text-gray-500">Guest</p>
              <p className="text-sm text-black font-medium">{booking.guest}</p>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
          {openDropdown === "guest" && (
            <BookingDropdown name="guest" options={guests} onSelect={updateBooking} />
          )}
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setOpenDropdown(null);
              openBookingPage();
            }}
            className="ml-auto bg-black text-white px-8 py-3 rounded-full text-sm"
          >
            Book schedule
          </button>
        </div>

      </div>

    </motion.section>
  )
}

export default Hero
