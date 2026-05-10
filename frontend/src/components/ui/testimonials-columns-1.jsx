import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = ({ testimonials, className = "", duration = 15 }) => {
  return (
    <div className={`flex flex-col gap-6 w-[340px] shrink-0 ${className}`}>
      <motion.div
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: duration,
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {/* Render twice for seamless loop. Note: "-50%" translation assumes content is doubled identically. */}
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={index}
            className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm flex flex-col gap-4"
          >
            <p className="text-sm text-gray-600 leading-relaxed">"{testimonial.text}"</p>
            <div className="flex items-center gap-3 mt-2">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-black">{testimonial.name}</span>
                <span className="text-xs text-gray-500">{testimonial.role}</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
