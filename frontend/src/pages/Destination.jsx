import React from 'react';
import { DestinationCard } from '../components/ui/card-21';
import SearchBar from '../components/SearchBar';
import { destinations } from '../assets/asset';
import { motion } from "motion/react";

const Destination = () => {
  const searchDestination = ({ location, date }) => {
    const searchParams = new URLSearchParams();

    if (location) {
      searchParams.set('location', location);
    }

    if (date) {
      searchParams.set('date', date);
    }

    const queryString = searchParams.toString();
    window.location.href = queryString ? `/booking?${queryString}` : '/booking';
  };

  return (
    <motion.section
      id="destinations"
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.16 }}
      className="w-full px-6 md:px-16 mt-20 mb-20 scroll-mt-24"
    >
      <div className="bg-[#f8f9fa] rounded-[40px] pb-32 px-6 flex flex-col items-center justify-center relative">

        {/* Heading */}
        <h2 className="text-4xl md:text-[54px] font-bold text-black text-center max-w-3xl leading-tight mb-6">
          Let's Explore Your Dream<br />Destination Here!
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 text-center max-w-2xl text-sm leading-relaxed">
          We have recommended popular destinations every week so you don't have to worry about your dream destination with traver.
        </p>

        <SearchBar
          onSearch={searchDestination}
          className="absolute bottom-6 md:-bottom-12 left-1/2 -translate-x-1/2"
        />
      </div>

      {/* Destination Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-0 mt-24 w-full max-w-7xl">
        {destinations.slice(0, 4).map((dest, index) => {
          const flags = ["🇮🇩", "🇫🇷", "🇮🇹", "🇯🇵", "🇺🇸", "🇬🇧", "🇦🇪", "🇦🇺"];
          const colors = [
            "150 50% 25%", // Bali
            "340 60% 40%", // Paris
            "20 70% 40%",  // Rome
            "0 60% 40%",   // Tokyo
            "210 60% 40%", // New York
            "230 50% 30%", // London
            "40 60% 40%",  // Dubai
            "200 60% 40%"  // Sydney
          ];

          return (
            <div key={dest.id} className="w-full h-[400px]">
              <DestinationCard
                imageUrl={dest.image}
                location={dest.title}
                flag={flags[index]}
                stats={dest.price}
                href="#"
                themeColor={colors[index]}
              />
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default Destination;
