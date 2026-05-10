import React from "react";
import {
  CreditCard,
  FileText,
  Heart,
  Mail,
  RefreshCw,
  Slash,
} from "lucide-react";
import { motion } from "motion/react";

const faqs = [
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, you can try Arrive for free for 30 days. Our travel team will help you set up your first trip plan quickly.",
    icon: Heart,
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Of course. You can update your package, travel dates, or guest count before your booking is finalized.",
    icon: RefreshCw,
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We understand that plans change. Cancellation terms depend on the destination and package, and we show them clearly before checkout.",
    icon: Slash,
  },
  {
    question: "Can extra details be added to my booking?",
    answer:
      "Yes. You can add notes for room preferences, airport pickup, meal needs, and special occasions during booking.",
    icon: FileText,
  },
  {
    question: "How does payment work?",
    answer:
      "Most trips can be reserved with a deposit. The remaining balance is collected before your departure date.",
    icon: CreditCard,
  },
  {
    question: "How do I contact support?",
    answer:
      "You can contact our team by email or through the booking page. We will help with changes, questions, and trip details.",
    icon: Mail,
  },
];

const team = [
  {
    name: "Marco Kelly",
    image: "https://www.untitledui.com/images/avatars/marco-kelly?fm=webp&q=80",
  },
  {
    name: "Amelie Laurent",
    image: "https://www.untitledui.com/images/avatars/amelie-laurent?fm=webp&q=80",
  },
  {
    name: "Jaya Willis",
    image: "https://www.untitledui.com/images/avatars/jaya-willis?fm=webp&q=80",
  },
];

const Faq = () => {
  return (
    <motion.section
      id="faq"
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.16 }}
      className="bg-white px-6 py-20 md:px-16 md:py-24 scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <h2 className="text-4xl font-bold leading-tight text-black md:text-[54px]">
            Frequently Asked Questions
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-500">
            Everything you need to know about planning, booking, and managing
            your trip with Arrive.
          </p>
        </div>

        <dl className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {faqs.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.question}
                className="rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600">
                  <Icon size={26} strokeWidth={2.2} />
                </div>
                <dt className="mt-5 text-lg font-bold text-black">
                  {item.question}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-gray-500">
                  {item.answer}
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="mx-auto mt-14 flex max-w-4xl flex-col items-center gap-6 rounded-3xl bg-[#f8f9fa] px-6 py-8 text-center md:mt-16 md:px-8 md:py-10">
          <div className="flex items-end -space-x-4">
            {team.map((member, index) => (
              <img
                key={member.name}
                src={member.image}
                alt={member.name}
                className={`rounded-full border-2 border-white object-cover ${
                  index === 1 ? "z-10 h-16 w-16" : "h-14 w-14"
                }`}
              />
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold text-black">
              Still have questions?
            </h3>
            <p className="mt-2 text-gray-500">
              Can't find the answer you're looking for? Talk to our travel team.
            </p>
          </div>
          <a
            href="mailto:support@arrive.com"
            className="rounded-full bg-black px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-gray-800"
          >
            Get in touch
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default Faq;
