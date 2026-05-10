import React from "react";
import { TestimonialsColumn } from "../components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "Traver revolutionized our vacation planning, streamlining flights and hotels. The platform keeps us organized, even on the go.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Briana Patton",
    role: "Avid Traveler",
  },
  {
    text: "Booking through Traver was smooth and quick. The customizable, user-friendly interface made itinerary planning effortless.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Bilal Ahmed",
    role: "Travel Blogger",
  },
  {
    text: "The support team is exceptional, guiding us through our bookings and providing ongoing assistance, ensuring our satisfaction.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Saman Malik",
    role: "Frequent Flyer",
  },
  {
    text: "Traver's seamless booking enhanced our travel experience and efficiency. Highly recommend for its intuitive interface.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Omar Raza",
    role: "Digital Nomad",
  },
  {
    text: "Its robust features and quick support have transformed how we travel, making us significantly more relaxed.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Zainab Hussain",
    role: "Family Traveler",
  },
  {
    text: "The smooth booking process exceeded expectations. It streamlined planning, improving overall vacation enjoyment.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aliza Khan",
    role: "Adventure Seeker",
  },
  {
    text: "Our travel experiences improved with a user-friendly app and positive customer feedback from the community.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Farhan Siddiqui",
    role: "Solo Backpacker",
  },
  {
    text: "They delivered a vacation that exceeded expectations, understanding our needs and enhancing our journey.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sana Sheikh",
    role: "Luxury Traveler",
  },
  {
    text: "Using Traver, our family trips significantly improved, boosting our happiness and saving us money.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Hassan Ali",
    role: "Tour Guide",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <motion.section
      id="testimonials"
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.16 }}
      className="bg-white py-15 relative overflow-hidden scroll-mt-24"
    >
      <div className="container z-10 mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-gray-200 py-3 px-8 rounded-full text-sm font-medium text-white bg-black shadow-sm">
              Testimonials
            </div>
          </div>

          <h2 className="text-4xl md:text-[44px] font-bold tracking-tight text-center text-black leading-tight mt-8">
            What our travelers say
          </h2>
          <p className="text-center mt-4 text-gray-500 text-lg">
            See what our customers have to say about booking with Traver.
          </p>
        </motion.div>

        {/* Masking container for the fading edges at top and bottom */}
        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[600px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:flex" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:flex" duration={17} />
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
