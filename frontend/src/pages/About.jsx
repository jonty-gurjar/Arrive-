import React from "react";
import img1 from "../assets/travel 1.jpg";
import img2 from "../assets/travel 5.jpg";
import img3 from "../assets/travel 3.jpg";
import { Signpost, User, CalendarCheck } from "lucide-react";
import { motion } from "motion/react";

const About = () => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.18 }}
      className="w-full py-20 px-6 md:px-16 bg-white scroll-mt-24"
    >

      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT - Images */}
        <div className="relative w-full h-[500px]">

          {/* Big Image */}
          <img
            src={img1}
            alt="destination"
            className="w-[70%] h-[70%] object-cover rounded-3xl"
          />

          {/* Top Right Small */}
          <img
            src={img2}
            alt="destination"
            className="absolute top-15 right-2 w-[45%] h-[45%] object-cover rounded-3xl shadow-lg"
          />

          {/* Bottom Image */}
          <img
            src={img3}
            alt="destination"
            className="absolute bottom-0 left-20 w-[60%] h-[50%] object-cover rounded-3xl shadow-lg"
          />
        </div>

        {/* RIGHT - Content */}
        <div>

          {/* Small Label */}
          <p className="text-black font-bold text-1xl mb-2">
            About —
          </p>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl  text-black font-semibold leading-tight mb-4">
            We Recommend <br />
            Beautiful Destinations <br />
            Every Month
          </h2>

          {/* Description */}
          <p className="text-gray-500 mb-8 max-w-lg">
            Let’s choose your dream destinations. We provide many destinations
            and offer the best experiences every week.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">

            <div className="bg-gray-100 rounded-2xl p-5 text-center">
              <h3 className="text-xl text-black font-bold">2000+</h3>
              <p className="text-sm text-black">Our Explorers</p>
            </div>

            <div className="bg-gray-100 rounded-2xl p-5 text-center">
              <h3 className="text-xl text-black font-bold">100+</h3>
              <p className="text-sm text-black">Destinations</p>
            </div>

            <div className="bg-gray-100 rounded-2xl p-5 text-center">
              <h3 className="text-xl text-black font-bold">20+</h3>
              <p className="text-sm text-black">Years Experience</p>
            </div>

          </div>
        </div>

      </div>

      {/* NEW SECTION: What We Give */}
      <div className="mt-32 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-5">
        
        {/* Text Section */}
        <div className="lg:w-1/3 w-full">
          <p className="text-black font-bold text-sm mb-4 flex items-center gap-2">
            What We Give <span className="w-10 h-[2px] bg-black text-1xl"></span>
          </p>
          <h2 className="text-4xl md:text-5xl text-black font-bold leading-tight mb-4">
            Best Features <br /> For You
          </h2>
          <p className="text-gray-500 max-w-sm mt-4">
            We will provide the best features for those of you who want to travel comfortably with your family.
          </p>
        </div>

        {/* Cards Section */}
        <div className="lg:w-2/3 w-full flex flex-col md:flex-row gap-6 justify-end items-center">
          
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 w-full md:w-[220px] flex flex-col gap-4 transition-transform duration-300 hover:scale-105 cursor-pointer">
            <div className="w-14 h-14 bg-blue-400 rounded-2xl flex items-center justify-center text-white">
              <Signpost size={28} />
            </div>
            <h3 className="text-lg font-bold text-black">Lots of Choices</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              We have provided several choices of destinations and very cheap travelling packages
            </p>
          </div>

          {/* Card 2 - Highlighted */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 w-full md:w-[220px] flex flex-col gap-4 transition-transform duration-300 hover:scale-105 cursor-pointer">
            <div className="w-14 h-14 bg-blue-400 rounded-2xl flex items-center justify-center text-white">
              <User size={28} />
            </div>
            <h3 className="text-lg font-bold text-black">Best Tour Guide</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              We provide professional tour guide and provide and people who understand the place
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 w-full md:w-[220px] flex flex-col gap-4 transition-transform duration-300 hover:scale-105 cursor-pointer">
            <div className="w-14 h-14 bg-blue-400 rounded-2xl flex items-center justify-center text-white">
              <CalendarCheck size={28} />
            </div>
            <h3 className="text-lg font-bold text-black">Easy Booking</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              We will also make it easier for users to book tickets or book the place you want
            </p>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default About;
