import React from "react";
import { ArrowUpRight } from "lucide-react";
import logo from "../assets/logo.png";
import { motion } from "motion/react";

const footerSections = [
  {
    title: "Travel Ideas",
    links: ["Beach Holidays", "Family Trips", "Adventure Tours", "City Breaks", "Honeymoon Plans"],
  },
  {
    title: "Destinations",
    links: ["Bali", "Paris", "Rome", "Tokyo", "Dubai"],
  },
  {
    title: "Company",
    links: ["About", "Testimonials", "FAQ", "Blog", "Contact"],
  },
  {
    title: "More",
    links: ["Travel Guide", "Booking Help", "Privacy Policy", "Terms", "Support"],
  },
];

const sectionLinks = {
  About: "#about",
  Testimonials: "#testimonials",
  FAQ: "#faq",
  Bali: "#destinations",
  Paris: "#destinations",
  Rome: "#destinations",
  Tokyo: "#destinations",
  Dubai: "#destinations",
};

const Footer = () => {
  return (
    <motion.footer
      id="footer"
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.16 }}
      className="w-full px-6 md:px-10 pb-8 scroll-mt-24"
    >
      <div className="bg-[#1f1f1f] text-white rounded-[32px] px-6 py-10 md:px-14 md:py-16 overflow-hidden relative">
        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <img src={logo} alt="traver logo" className="w-[130px] md:w-[160px]" />
            <p className="text-gray-400 max-w-sm mt-5 leading-relaxed">
              Explore beautiful destinations, plan simple trips, and find fresh travel ideas for your next journey.
            </p>
            <a href="#home" className="mt-8 bg-black text-white rounded-full py-3 pl-6 pr-3 font-bold inline-flex items-center gap-4 transition-transform duration-300 hover:scale-105">
              Start Planning
              <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                <ArrowUpRight size={20} />
              </span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-bold text-lg mb-5">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href={sectionLinks[link] || "#"} className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-gray-400">
          <p>© Arrive 2026</p>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:text-white transition-colors">Cookies preferences</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Credits</a>
          </div>
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;
