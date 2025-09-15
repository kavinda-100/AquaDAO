"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Custom SVG Components for Features
const TransparencyIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Glass/Crystal shape */}
    <motion.path
      d="M50 10 L80 30 L80 70 L50 90 L20 70 L20 30 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
      animate={{
        scale: [1, 1.05, 1],
        rotate: [0, 2, 0],
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    {/* Internal light rays */}
    {[1, 2, 3].map((i) => (
      <motion.line
        key={i}
        x1="50"
        y1="30"
        x2="50"
        y2="70"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
        transform={`rotate(${i * 30} 50 50)`}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
      />
    ))}
    {/* Center shine */}
    <motion.circle
      cx="50"
      cy="50"
      r="6"
      fill="currentColor"
      animate={{ scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

const SecurityIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shield */}
    <motion.path
      d="M50 15 L75 25 L75 55 C75 70 50 85 50 85 C50 85 25 70 25 55 L25 25 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    {/* Lock inside */}
    <motion.rect
      x="42"
      y="45"
      width="16"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <motion.path
      d="M45 45 L45 40 C45 37 47 35 50 35 C53 35 55 37 55 40 L55 45"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      animate={{ y: [0, -1, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    {/* Protective aura */}
    <motion.circle
      cx="50"
      cy="50"
      r="35"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.3"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </svg>
);

const DecentralizedIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Network nodes */}
    {[
      { x: 50, y: 20, size: 6 },
      { x: 20, y: 40, size: 5 },
      { x: 80, y: 40, size: 5 },
      { x: 15, y: 70, size: 4 },
      { x: 50, y: 80, size: 5 },
      { x: 85, y: 70, size: 4 },
      { x: 50, y: 50, size: 7 }, // Center node
    ].map((node, i) => (
      <motion.circle
        key={i}
        cx={node.x}
        cy={node.y}
        r={node.size}
        fill="currentColor"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
    {/* Connection lines */}
    {[
      { x1: 50, y1: 20, x2: 50, y2: 50 },
      { x1: 20, y1: 40, x2: 50, y2: 50 },
      { x1: 80, y1: 40, x2: 50, y2: 50 },
      { x1: 15, y1: 70, x2: 50, y2: 50 },
      { x1: 50, y1: 80, x2: 50, y2: 50 },
      { x1: 85, y1: 70, x2: 50, y2: 50 },
    ].map((line, i) => (
      <motion.line
        key={i}
        x1={line.x1}
        y1={line.y1}
        x2={line.x2}
        y2={line.y2}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
      />
    ))}
  </svg>
);

const EfficientIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Speedometer */}
    <motion.path
      d="M25 70 A25 25 0 0 1 75 70"
      stroke="currentColor"
      strokeWidth="3"
      fill="none"
    />
    <motion.path
      d="M30 65 A20 20 0 0 1 70 65"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      opacity="0.6"
    />
    {/* Speed indicator */}
    <motion.line
      x1="50"
      y1="70"
      x2="65"
      y2="55"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      animate={{ rotate: [0, 20, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{ transformOrigin: "50px 70px" }}
    />
    {/* Speed marks */}
    {[0, 30, 60, 90, 120, 150, 180].map((angle, i) => {
      const x1 = 50 + 22 * Math.cos(((angle - 90) * Math.PI) / 180);
      const y1 = 70 + 22 * Math.sin(((angle - 90) * Math.PI) / 180);
      const x2 = 50 + 25 * Math.cos(((angle - 90) * Math.PI) / 180);
      const y2 = 70 + 25 * Math.sin(((angle - 90) * Math.PI) / 180);
      return (
        <motion.line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.6"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
        />
      );
    })}
    {/* Lightning bolt for speed */}
    <motion.path
      d="M50 25 L45 35 L52 35 L48 45 L53 35 L46 35 Z"
      fill="currentColor"
      animate={{ scale: [0.9, 1.1, 0.9] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </svg>
);

const AccessibleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Globe */}
    <motion.circle
      cx="50"
      cy="50"
      r="35"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    {/* Latitude lines */}
    <motion.ellipse
      cx="50"
      cy="50"
      rx="35"
      ry="15"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.5"
    />
    <motion.ellipse
      cx="50"
      cy="50"
      rx="35"
      ry="25"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.3"
    />
    {/* Longitude line */}
    <motion.ellipse
      cx="50"
      cy="50"
      rx="15"
      ry="35"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.5"
    />
    {/* Access points */}
    {[
      { x: 35, y: 35 },
      { x: 65, y: 35 },
      { x: 30, y: 65 },
      { x: 70, y: 65 },
    ].map((point, i) => (
      <motion.circle
        key={i}
        cx={point.x}
        cy={point.y}
        r="3"
        fill="currentColor"
        animate={{
          scale: [0.5, 1.5, 0.5],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
      />
    ))}
  </svg>
);

const ImmutableIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Blockchain blocks */}
    {[
      { x: 15, y: 40, delay: 0 },
      { x: 40, y: 40, delay: 0.2 },
      { x: 65, y: 40, delay: 0.4 },
    ].map((block, i) => (
      <g key={i}>
        <motion.rect
          x={block.x}
          y={block.y}
          width="20"
          height="20"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          fill="currentColor"
          fillOpacity="0.1"
          animate={{ y: [block.y, block.y - 2, block.y] }}
          transition={{ duration: 2, repeat: Infinity, delay: block.delay }}
        />
        {/* Chain links */}
        {i < 2 && (
          <motion.line
            x1={block.x + 20}
            y1={block.y + 10}
            x2={block.x + 25}
            y2={block.y + 10}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: block.delay }}
          />
        )}
      </g>
    ))}
    {/* Lock symbol on middle block */}
    <motion.circle
      cx="50"
      cy="50"
      r="4"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
    />
    <motion.rect
      x="47"
      y="52"
      width="6"
      height="4"
      rx="1"
      stroke="currentColor"
      strokeWidth="1"
      fill="currentColor"
      fillOpacity="0.3"
    />
  </svg>
);

const FeatureCard = ({
  title,
  description,
  icon,
  delay,
  highlight = false,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  highlight?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="group h-full"
  >
    <div
      className={`relative h-full rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300 ${
        highlight
          ? "from-primary/10 border-primary/30 shadow-primary/20 bg-gradient-to-br to-blue-500/10 shadow-lg"
          : "bg-card/30 border-border/30 hover:border-primary/30"
      }`}
    >
      {highlight && (
        <motion.div
          className="bg-primary text-primary-foreground absolute -top-4 left-1/2 -translate-x-1/2 transform rounded-full px-4 py-1 text-sm font-semibold"
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Most Popular
        </motion.div>
      )}

      <motion.div className="from-primary/5 absolute inset-0 rounded-2xl bg-gradient-to-br via-transparent to-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        <motion.div
          className="text-primary mx-auto mb-6 h-16 w-16"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.8 }}
        >
          {icon}
        </motion.div>

        <h3 className="mb-4 text-center text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground flex-1 text-center leading-relaxed">
          {description}
        </p>

        <motion.div
          className="bg-primary/60 mx-auto mt-6 h-1 w-12 rounded-full"
          animate={{ width: [48, 60, 48] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  </motion.div>
);

export const FeaturesSection = () => {
  const features = [
    {
      title: "Complete Transparency",
      description:
        "Every vote, proposal, and decision is recorded on the blockchain, ensuring full transparency and accountability in all governance activities.",
      icon: <TransparencyIcon className="h-full w-full" />,
      highlight: false,
    },
    {
      title: "Unbreakable Security",
      description:
        "Built on battle-tested smart contracts and secured by the Ethereum network, your governance processes are protected against manipulation and fraud.",
      icon: <SecurityIcon className="h-full w-full" />,
      highlight: true,
    },
    {
      title: "Truly Decentralized",
      description:
        "No single point of failure or control. Governance power is distributed among community members, ensuring democratic decision-making.",
      icon: <DecentralizedIcon className="h-full w-full" />,
      highlight: false,
    },
    {
      title: "Lightning Fast",
      description:
        "Streamlined voting processes and automated execution mean decisions are implemented quickly and efficiently without bureaucratic delays.",
      icon: <EfficientIcon className="h-full w-full" />,
      highlight: false,
    },
    {
      title: "Globally Accessible",
      description:
        "Participate in governance from anywhere in the world, 24/7. All you need is an internet connection and a web3 wallet.",
      icon: <AccessibleIcon className="h-full w-full" />,
      highlight: false,
    },
    {
      title: "Immutable Records",
      description:
        "All governance decisions are permanently recorded on the blockchain, creating an unchangeable history of community choices.",
      icon: <ImmutableIcon className="h-full w-full" />,
      highlight: false,
    },
  ];

  return (
    <section className="from-background via-background to-primary/5 relative overflow-hidden bg-gradient-to-br py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="border-primary/20 absolute top-20 right-20 h-40 w-40 rounded-full border"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="bg-primary/10 absolute bottom-40 left-20 h-32 w-32 rotate-45"
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 h-24 w-24 rounded-full border border-blue-500/20"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
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
            Why Choose Aqua DAO
          </motion.span>

          <h2 className="mb-6 text-4xl leading-tight font-bold lg:text-6xl">
            The Future of{" "}
            <span className="from-primary to-primary bg-gradient-to-r via-blue-500 bg-clip-text text-transparent">
              Governance
            </span>{" "}
            is Here
          </h2>

          <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
            Experience the power of blockchain-based governance with features
            designed to make decision-making transparent, secure, and truly
            democratic.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index * 0.1}
              highlight={feature.highlight}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
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
              <Link href={"/proposals/all"} className="relative z-10">
                Start Governing Today
              </Link>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-border hover:border-primary/50 rounded-lg border-2 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-200"
            >
              Explore Features
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
