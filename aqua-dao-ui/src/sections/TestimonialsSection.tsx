"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Type definitions
interface Testimonial {
  content: string;
  author: string;
  role: string;
  rating: number;
}

// Quote Icon Component
const QuoteIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M20 35 Q20 25 30 25 Q40 25 40 35 L40 55 Q40 65 30 65 L25 65 L30 75 L20 75 L15 65 Q15 55 15 45 Q15 35 20 35 Z"
      fill="currentColor"
      opacity="0.8"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.path
      d="M60 35 Q60 25 70 25 Q80 25 80 35 L80 55 Q80 65 70 65 L65 65 L70 75 L60 75 L55 65 Q55 55 55 45 Q55 35 60 35 Z"
      fill="currentColor"
      opacity="0.8"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
    />
  </svg>
);

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <motion.svg
        key={star}
        className="h-5 w-5"
        fill={star <= rating ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1"
        viewBox="0 0 24 24"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: star * 0.1 }}
      >
        <motion.path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: star * 0.2 }}
        />
      </motion.svg>
    ))}
  </div>
);

// Avatar Component with initials
const Avatar = ({
  name,
  role,
  delay,
}: {
  name: string;
  role: string;
  delay: number;
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const colors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-purple-500",
    "from-cyan-500 to-blue-500",
  ];
  const colorIndex = name.length % colors.length;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-4"
    >
      <motion.div
        className={`h-16 w-16 rounded-full bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center text-lg font-bold text-white shadow-lg`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        {initials}
      </motion.div>
      <div>
        <h4 className="text-lg font-semibold">{name}</h4>
        <p className="text-muted-foreground text-sm">{role}</p>
      </div>
    </motion.div>
  );
};

// Individual Testimonial Card
const TestimonialCard = ({
  testimonial,
  delay,
  isActive = false,
}: {
  testimonial: Testimonial;
  delay: number;
  isActive?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    whileHover={{ y: -10, scale: 1.02 }}
    className={`group h-full transition-all duration-300 ${isActive ? "z-10" : ""}`}
  >
    <div
      className={`relative h-full rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300 ${
        isActive
          ? "from-primary/15 border-primary/40 shadow-primary/20 scale-105 bg-gradient-to-br to-blue-500/10 shadow-xl"
          : "bg-card/40 border-border/30 hover:border-primary/30 hover:bg-card/60"
      }`}
    >
      {/* Quote icon */}
      <motion.div
        className="text-primary/60 mb-6 h-12 w-12"
        animate={{ rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <QuoteIcon className="h-full w-full" />
      </motion.div>

      {/* Star rating */}
      <div className="mb-6 text-yellow-500">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Testimonial text */}
      <blockquote className="text-foreground/90 mb-8 text-lg leading-relaxed italic">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>

      {/* Author info */}
      <Avatar
        name={testimonial.author}
        role={testimonial.role}
        delay={delay + 0.3}
      />

      {/* Decorative elements */}
      <motion.div
        className="bg-primary/20 absolute -top-2 -right-2 h-6 w-6 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: delay }}
      />
      <motion.div
        className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-blue-500/20"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: delay + 0.5 }}
      />
    </div>
  </motion.div>
);

// Carousel Testimonial (for featured testimonials)
const CarouselTestimonial = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative mx-auto mb-16 max-w-4xl">
      <div className="relative h-80 overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="from-primary/10 via-card/50 border-primary/20 absolute inset-0 flex flex-col justify-center rounded-3xl border bg-gradient-to-br to-blue-500/10 p-12 backdrop-blur-sm"
          >
            <motion.div
              className="text-primary/40 mx-auto mb-6 h-16 w-16"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <QuoteIcon className="h-full w-full" />
            </motion.div>

            <div className="mb-6 text-center text-yellow-500">
              <StarRating rating={testimonials[currentIndex]?.rating ?? 5} />
            </div>

            <blockquote className="text-foreground/90 mb-8 text-center text-2xl leading-relaxed font-medium lg:text-3xl">
              &ldquo;{testimonials[currentIndex]?.content}&rdquo;
            </blockquote>

            <div className="text-center">
              <h4 className="mb-1 text-xl font-semibold">
                {testimonials[currentIndex]?.author}
              </h4>
              <p className="text-muted-foreground">
                {testimonials[currentIndex]?.role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel indicators */}
      <div className="mt-6 flex justify-center gap-3">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary scale-125"
                : "bg-border hover:bg-primary/50"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

export const TestimonialsSection = () => {
  const featuredTestimonials = [
    {
      content:
        "AquaDAO has revolutionized how our community makes decisions. The transparency and speed of blockchain governance is unmatched.",
      author: "Sarah Chen",
      role: "Community Lead at DeFi Protocol",
      rating: 5,
    },
    {
      content:
        "Finally, a governance platform that puts power back in the hands of the community. Every vote matters and every voice is heard.",
      author: "Marcus Rodriguez",
      role: "DAO Governance Specialist",
      rating: 5,
    },
    {
      content:
        "The security and immutability of decisions gives us complete confidence. No more worrying about manipulation or fraud.",
      author: "Dr. Elena Kowalski",
      role: "Blockchain Research Director",
      rating: 5,
    },
  ];

  const allTestimonials = [
    {
      content:
        "AquaDAO's user interface is incredibly intuitive. Even complex governance proposals are easy to understand and vote on.",
      author: "James Liu",
      role: "Product Manager",
      rating: 5,
    },
    {
      content:
        "The 24/7 accessibility means our global community can participate regardless of time zones. True democratic governance.",
      author: "Amira Hassan",
      role: "Decentralization Advocate",
      rating: 5,
    },
    {
      content:
        "Smart contract automation has eliminated bureaucratic delays. Decisions are implemented immediately after voting concludes.",
      author: "Viktor Petrov",
      role: "Smart Contract Developer",
      rating: 5,
    },
    {
      content:
        "Having all governance history permanently recorded on-chain provides incredible accountability and transparency.",
      author: "Isabella Santos",
      role: "Governance Researcher",
      rating: 5,
    },
    {
      content:
        "The decentralized nature means no single entity can control outcomes. It's democracy in its purest digital form.",
      author: "Robert Kim",
      role: "Crypto Policy Analyst",
      rating: 5,
    },
    {
      content:
        "AquaDAO has set the standard for what modern governance should look like. Other platforms are trying to catch up.",
      author: "Maya Patel",
      role: "Blockchain Consultant",
      rating: 5,
    },
  ];

  return (
    <section className="from-background via-muted/20 to-background relative overflow-hidden bg-gradient-to-br py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="border-primary/30 absolute top-32 left-16 h-64 w-64 rounded-full border"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="from-primary/20 absolute right-16 bottom-32 h-48 w-48 rounded-full bg-gradient-to-br to-blue-500/20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="border-primary/20 absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rotate-45 transform border-2"
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-primary/10 border-primary/20 text-primary mb-6 inline-block rounded-full border px-4 py-2 text-sm font-semibold"
          >
            Trusted by Leaders
          </motion.span>

          <h2 className="mb-6 text-4xl leading-tight font-bold lg:text-6xl">
            What Our{" "}
            <span className="from-primary to-primary bg-gradient-to-r via-blue-500 bg-clip-text text-transparent">
              Community
            </span>{" "}
            Says
          </h2>

          <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
            Join thousands of governance participants who have transformed their
            decision-making processes with AquaDAO&apos;s blockchain technology.
          </p>
        </motion.div>

        {/* Featured Testimonials Carousel */}
        <CarouselTestimonial testimonials={featuredTestimonials} />

        {/* All Testimonials Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.author}
              testimonial={testimonial}
              delay={index * 0.1}
              isActive={index === 1} // Highlight middle card
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 grid grid-cols-2 gap-8 lg:grid-cols-4"
        >
          {[
            { number: "10,000+", label: "Active Voters", icon: "👥" },
            { number: "500+", label: "Proposals Passed", icon: "📊" },
            { number: "99.9%", label: "Uptime", icon: "⚡" },
            { number: "50+", label: "DAOs Using AquaDAO", icon: "🏛️" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card/30 border-border/30 hover:bg-card/50 rounded-2xl border p-6 text-center backdrop-blur-sm transition-all duration-300"
            >
              <motion.div
                className="mb-3 text-4xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="text-primary mb-2 text-3xl font-bold lg:text-4xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.div>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="mb-6 text-2xl font-bold lg:text-3xl">
            Ready to Join Our Growing Community?
          </h3>
          <div className="inline-flex flex-col gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground group relative overflow-hidden rounded-lg px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              <motion.div
                className="from-primary to-primary absolute inset-0 bg-gradient-to-r via-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10">Start Your Journey</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-border hover:border-primary/50 rounded-lg border-2 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-200"
            >
              Read More Reviews
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
