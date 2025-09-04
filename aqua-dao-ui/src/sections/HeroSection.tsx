"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Custom SVG Components for blockchain theme
const BlockchainIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {/* Outer ring */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
      />
      {/* Inner blocks */}
      <rect
        x="20"
        y="20"
        width="12"
        height="12"
        fill="currentColor"
        opacity="0.6"
      />
      <rect
        x="68"
        y="20"
        width="12"
        height="12"
        fill="currentColor"
        opacity="0.8"
      />
      <rect
        x="44"
        y="8"
        width="12"
        height="12"
        fill="currentColor"
        opacity="0.9"
      />
      <rect
        x="20"
        y="68"
        width="12"
        height="12"
        fill="currentColor"
        opacity="0.7"
      />
      <rect
        x="68"
        y="68"
        width="12"
        height="12"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="44"
        y="80"
        width="12"
        height="12"
        fill="currentColor"
        opacity="0.8"
      />
    </motion.g>
    {/* Center node */}
    <circle cx="50" cy="50" r="8" fill="currentColor" />
    {/* Connection lines */}
    <line
      x1="26"
      y1="26"
      x2="42"
      y2="42"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.4"
    />
    <line
      x1="74"
      y1="26"
      x2="58"
      y2="42"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.4"
    />
    <line
      x1="50"
      y1="20"
      x2="50"
      y2="42"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.4"
    />
    <line
      x1="26"
      y1="74"
      x2="42"
      y2="58"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.4"
    />
    <line
      x1="74"
      y1="74"
      x2="58"
      y2="58"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.4"
    />
    <line
      x1="50"
      y1="80"
      x2="50"
      y2="58"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.4"
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
    {/* Central hub */}
    <motion.circle
      cx="50"
      cy="50"
      r="6"
      fill="currentColor"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />

    {/* Surrounding nodes */}
    {[0, 60, 120, 180, 240, 300].map((angle, index) => {
      const x = 50 + 25 * Math.cos((angle * Math.PI) / 180);
      const y = 50 + 25 * Math.sin((angle * Math.PI) / 180);
      return (
        <g key={angle}>
          <motion.circle
            cx={x}
            cy={y}
            r="4"
            fill="currentColor"
            opacity="0.7"
            animate={{ scale: [0.8, 1.1, 0.8] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          />
          <motion.line
            x1="50"
            y1="50"
            x2={x}
            y2={y}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          />
        </g>
      );
    })}
  </svg>
);

const GovernanceIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shield outline */}
    <motion.path
      d="M50 10 L75 25 L75 55 C75 65 65 80 50 90 C35 80 25 65 25 55 L25 25 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      animate={{ pathLength: [0, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    />

    {/* Voting elements */}
    <motion.rect
      x="35"
      y="30"
      width="8"
      height="6"
      fill="currentColor"
      opacity="0.6"
      animate={{ y: [30, 28, 30] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
    />
    <motion.rect
      x="46"
      y="32"
      width="8"
      height="6"
      fill="currentColor"
      opacity="0.8"
      animate={{ y: [32, 30, 32] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
    />
    <motion.rect
      x="57"
      y="28"
      width="8"
      height="6"
      fill="currentColor"
      opacity="0.9"
      animate={{ y: [28, 26, 28] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
    />

    {/* Check mark */}
    <motion.path
      d="M35 50 L45 60 L65 40"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 2, repeat: Infinity, repeatDelay: 2 }}
    />
  </svg>
);

const FloatingParticle = ({
  delay,
  duration,
  className,
  style,
}: {
  delay: number;
  duration: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <motion.div
    className={`bg-primary/20 absolute h-2 w-2 rounded-full ${className}`}
    style={style}
    animate={{
      y: [-20, -100],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

export const HeroSection = () => {
  return (
    <section className="from-background via-background to-primary/5 relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            duration={3 + Math.random() * 2}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Geometric background shapes */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="border-primary/30 absolute top-20 left-10 h-32 w-32 rotate-45 border"
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="border-primary/20 absolute right-20 bottom-40 h-24 w-24 rounded-full border"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="bg-primary/10 absolute top-1/2 right-10 h-16 w-16 rotate-12"
          animate={{ rotate: [12, 372] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left side - Content */}
          <div className="space-y-8">
            {/* Logo and brand */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Aqua DAO Logo"
                  width={60}
                  height={45}
                  className="drop-shadow-lg"
                />
                <motion.div
                  className="bg-primary/20 absolute -inset-2 rounded-full blur-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="from-primary via-primary/80 to-primary/60 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                  Aqua DAO
                </h1>
                <p className="text-muted-foreground text-sm">
                  Decentralized Governance
                </p>
              </div>
            </motion.div> */}

            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-4xl leading-tight font-bold lg:text-6xl">
                Shape the Future with{" "}
                <span className="from-primary to-primary bg-gradient-to-r via-blue-500 bg-clip-text text-transparent">
                  Decentralized
                </span>{" "}
                Governance
              </h2>
              <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed lg:text-xl">
                Join a community-driven ecosystem where every voice matters.
                Create proposals, vote on decisions, and collectively manage
                treasury funds in a transparent and democratic way.
              </p>
            </motion.div>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              <div className="bg-card/50 border-border/50 flex items-center gap-3 rounded-lg border p-4 backdrop-blur-sm">
                <BlockchainIcon className="text-primary h-8 w-8" />
                <div>
                  <h3 className="font-semibold">Blockchain Secured</h3>
                  <p className="text-muted-foreground text-sm">
                    Immutable & transparent
                  </p>
                </div>
              </div>

              <div className="bg-card/50 border-border/50 flex items-center gap-3 rounded-lg border p-4 backdrop-blur-sm">
                <DecentralizedIcon className="text-primary h-8 w-8" />
                <div>
                  <h3 className="font-semibold">Truly Decentralized</h3>
                  <p className="text-muted-foreground text-sm">
                    Community owned
                  </p>
                </div>
              </div>

              <div className="bg-card/50 border-border/50 flex items-center gap-3 rounded-lg border p-4 backdrop-blur-sm">
                <GovernanceIcon className="text-primary h-8 w-8" />
                <div>
                  <h3 className="font-semibold">Democratic Voting</h3>
                  <p className="text-muted-foreground text-sm">
                    Every vote counts
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
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
                <Link href={"/proposals"}>
                  <span className="relative z-10">Start Exploring</span>
                </Link>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-border hover:border-primary/50 rounded-lg border-2 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-200"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>

          {/* Right side - Visual representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            {/* Central governance visualization */}
            <div className="relative h-80 w-80 lg:h-96 lg:w-96">
              {/* Outer ring with nodes */}
              <motion.div
                className="border-primary/30 absolute inset-0 rounded-full border-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * 360) / 8;
                  const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
                  const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);
                  return (
                    <motion.div
                      key={i}
                      className="bg-primary absolute h-4 w-4 rounded-full"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.25,
                      }}
                    />
                  );
                })}
              </motion.div>

              {/* Inner ring */}
              <motion.div
                className="border-primary/50 absolute inset-8 rounded-full border"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Center element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="from-primary to-primary/60 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br shadow-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    scale: { duration: 2, repeat: Infinity },
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  }}
                >
                  <GovernanceIcon className="h-8 w-8 text-white" />
                </motion.div>
              </div>

              {/* Floating elements */}
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={`float-${i}`}
                  className="bg-primary/40 absolute h-3 w-3 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    x: [-5, 5, -5],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>

            {/* Background glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,rgba(99,102,241,0.05)_50%,transparent_100%)] blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-muted-foreground flex flex-col items-center gap-2"
        >
          <span className="text-sm">Scroll to explore</span>
          <motion.div
            className="flex h-10 w-6 justify-center rounded-full border-2 border-current"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="mt-2 h-3 w-1 rounded-full bg-current"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
