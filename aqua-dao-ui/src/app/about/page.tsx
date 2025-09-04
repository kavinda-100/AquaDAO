"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Custom SVG Components for About page
const VisionIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Eye outline */}
    <motion.path
      d="M50 25 C70 25 85 40 90 50 C85 60 70 75 50 75 C30 75 15 60 10 50 C15 40 30 25 50 25 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
    />
    {/* Pupil */}
    <motion.circle
      cx="50"
      cy="50"
      r="12"
      fill="currentColor"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    {/* Vision rays */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const x1 = 50 + 25 * Math.cos((angle * Math.PI) / 180);
      const y1 = 50 + 25 * Math.sin((angle * Math.PI) / 180);
      const x2 = 50 + 35 * Math.cos((angle * Math.PI) / 180);
      const y2 = 50 + 35 * Math.sin((angle * Math.PI) / 180);
      return (
        <motion.line
          key={angle}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.6"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
        />
      );
    })}
  </svg>
);

const MissionIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Target circles */}
    <motion.circle
      cx="50"
      cy="50"
      r="40"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      opacity="0.3"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.circle
      cx="50"
      cy="50"
      r="25"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      opacity="0.5"
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 2.5, repeat: Infinity }}
    />
    <motion.circle
      cx="50"
      cy="50"
      r="10"
      fill="currentColor"
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    {/* Arrow pointing to center */}
    <motion.path
      d="M20 20 L40 40 M35 35 L40 40 L35 45"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </svg>
);

const CommunityIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Central figure */}
    <motion.circle
      cx="50"
      cy="35"
      r="8"
      fill="currentColor"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path
      d="M35 65 L35 55 C35 50 40 45 50 45 C60 45 65 50 65 55 L65 65"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    {/* Surrounding community members */}
    {[
      { x: 25, y: 25, delay: 0 },
      { x: 75, y: 25, delay: 0.3 },
      { x: 15, y: 50, delay: 0.6 },
      { x: 85, y: 50, delay: 0.9 },
      { x: 25, y: 75, delay: 1.2 },
      { x: 75, y: 75, delay: 1.5 },
    ].map((member, i) => (
      <g key={i}>
        <motion.circle
          cx={member.x}
          cy={member.y - 10}
          r="4"
          fill="currentColor"
          opacity="0.7"
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: member.delay }}
        />
        <motion.line
          x1={member.x}
          y1={member.y}
          x2={member.x}
          y2={member.y + 8}
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.7"
        />
        {/* Connection lines to center */}
        <motion.line
          x1={member.x}
          y1={member.y}
          x2="50"
          y2="50"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, delay: member.delay }}
        />
      </g>
    ))}
  </svg>
);

const ValueCard = ({
  title,
  description,
  icon,
  delay,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="group"
  >
    <div className="bg-card/30 border-border/30 relative overflow-hidden rounded-2xl border p-8 backdrop-blur-sm">
      <motion.div className="from-primary/10 absolute inset-0 bg-gradient-to-br via-transparent to-blue-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 text-center">
        <motion.div
          className="text-primary mx-auto mb-6 h-16 w-16"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
        >
          {icon}
        </motion.div>
        <h3 className="mb-4 text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

const AboutPage = () => {
  return (
    <div className="from-background via-background to-primary/3 min-h-screen bg-gradient-to-br">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="border-primary/20 absolute top-20 left-10 h-40 w-40 rounded-full border"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="bg-primary/10 absolute right-20 bottom-20 h-32 w-32 rotate-45"
            animate={{ rotate: [45, 405] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 flex items-center justify-center gap-4"
            >
              <Image
                src="/logo.png"
                alt="Aqua DAO Logo"
                width={80}
                height={60}
                className="drop-shadow-lg"
              />
              <div className="text-left">
                <h1 className="from-primary via-primary/80 to-primary/60 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                  Aqua DAO
                </h1>
                <p className="text-muted-foreground">About Our Mission</p>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 text-5xl leading-tight font-bold lg:text-7xl"
            >
              Building the Future of{" "}
              <span className="from-primary to-primary bg-gradient-to-r via-blue-500 bg-clip-text text-transparent">
                Decentralized
              </span>{" "}
              Governance
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-muted-foreground mb-12 text-xl leading-relaxed"
            >
              We believe in the power of collective decision-making,
              transparency, and community-driven innovation. Our mission is to
              create tools and systems that empower communities to govern
              themselves effectively.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-3"
            >
              <ValueCard
                title="Vision"
                description="A world where every community has the tools to govern itself democratically and transparently through blockchain technology."
                icon={<VisionIcon className="h-full w-full" />}
                delay={0}
              />
              <ValueCard
                title="Mission"
                description="To build and maintain open-source governance tools that enable fair, transparent, and efficient decision-making for decentralized communities."
                icon={<MissionIcon className="h-full w-full" />}
                delay={0.2}
              />
              <ValueCard
                title="Community"
                description="We foster an inclusive environment where every voice matters and collective wisdom drives innovation and positive change."
                icon={<CommunityIcon className="h-full w-full" />}
                delay={0.4}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold lg:text-5xl">Our Story</h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
              Born from the belief that true democracy requires transparency,
              accessibility, and community participation at every level of
              decision-making.
            </p>
          </motion.div>

          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold">The Beginning</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Aqua DAO started as a simple idea: what if communities could
                make decisions together without the complexity and barriers of
                traditional governance systems? We saw the potential of
                blockchain technology to create transparent, immutable, and fair
                voting systems.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our team of blockchain developers, governance experts, and
                community builders came together to create tools that would make
                decentralized governance accessible to everyone, regardless of
                technical expertise.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  "Transparency",
                  "Security",
                  "Accessibility",
                  "Innovation",
                ].map((value, i) => (
                  <motion.span
                    key={value}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-primary/10 border-primary/20 text-primary rounded-full border px-4 py-2 font-semibold"
                  >
                    {value}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="from-primary/20 relative h-96 w-full overflow-hidden rounded-2xl bg-gradient-to-br to-blue-500/20">
                <motion.div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.3)_0%,transparent_70%)]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="border-primary/40 h-32 w-32 rounded-full border-4"
                  >
                    <div className="border-t-primary h-full w-full animate-spin rounded-full border-4 border-transparent" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology & Features Section */}
      <section className="bg-card/20 py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
              How Aqua DAO Works
            </h2>
            <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
              Powered by cutting-edge blockchain technology and smart contracts,
              our platform ensures transparent, secure, and democratic
              governance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left side - Process Steps */}
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Create Proposals",
                  description:
                    "Community members submit proposals for voting, including funding requests, protocol changes, or strategic decisions.",
                  icon: "💡",
                },
                {
                  step: "02",
                  title: "Community Discussion",
                  description:
                    "Proposals are discussed openly in our forum, allowing for feedback, refinement, and community input before voting begins.",
                  icon: "💭",
                },
                {
                  step: "03",
                  title: "Transparent Voting",
                  description:
                    "Token holders vote using their governance tokens. All votes are recorded on-chain and publicly verifiable.",
                  icon: "🗳️",
                },
                {
                  step: "04",
                  title: "Only Proposer Can Execute",
                  description:
                    "Approved proposals can only be executed by the original proposer, ensuring accountability.",
                  icon: "⚡",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex gap-6"
                >
                  <div className="flex-shrink-0">
                    <div className="from-primary to-primary/60 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-2xl text-white shadow-lg">
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-primary/60 font-mono text-sm">
                        {item.step}
                      </span>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right side - Technology Stack */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="from-primary/10 rounded-2xl bg-gradient-to-br to-blue-500/10 p-8">
                <h3 className="mb-6 text-2xl font-bold">Technology Stack</h3>
                <div className="space-y-6">
                  {[
                    {
                      name: "Smart Contracts",
                      description:
                        "Solidity-based contracts on Ethereum ensuring trustless execution",
                      progress: 95,
                    },
                    {
                      name: "IPFS Storage",
                      description:
                        "Decentralized storage for proposal documents and metadata",
                      progress: 90,
                    },
                    {
                      name: "Web3 Integration",
                      description:
                        "Seamless wallet connection and blockchain interaction",
                      progress: 100,
                    },
                    {
                      name: "Security Audits",
                      description:
                        "Regular third-party security reviews and bug bounties",
                      progress: 85,
                    },
                  ].map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between">
                        <h4 className="font-semibold">{tech.name}</h4>
                        <span className="text-primary font-mono text-sm">
                          {tech.progress}%
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {tech.description}
                      </p>
                      <div className="bg-border h-2 overflow-hidden rounded-full">
                        <motion.div
                          className="bg-primary h-full rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Statistics - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="mb-8 text-2xl font-bold">Platform Statistics</h3>
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { label: "Active Proposals", value: "47", icon: "📋" },
                { label: "Total Votes Cast", value: "12.4K", icon: "✅" },
                { label: "Treasury Funds", value: "$2.8M", icon: "💰" },
                { label: "Community Members", value: "8.9K", icon: "👥" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card/50 hover:bg-card/70 rounded-xl p-6 text-center backdrop-blur-sm transition-all duration-300"
                >
                  <div className="mb-3 text-3xl">{stat.icon}</div>
                  <div className="text-primary text-2xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative overflow-hidden py-20">
        <div className="from-primary/10 absolute inset-0 bg-gradient-to-r via-transparent to-blue-500/10" />
        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
              Ready to Shape the Future?
            </h2>
            <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-xl">
              Join our community and be part of the governance revolution. Your
              voice matters in building the future of decentralized
              decision-making.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground rounded-lg px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                Join Our Community
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-border hover:border-primary/50 rounded-lg border-2 px-8 py-4 text-lg font-semibold transition-all duration-200"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
