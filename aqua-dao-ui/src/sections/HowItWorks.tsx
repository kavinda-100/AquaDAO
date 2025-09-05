"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * How the DAO works section
 * 1. connect to wallet
 * 2. Buy Aqua tokens by paying ETH (Become a member of the DAO)
 * 3. Create proposals by someone (the one who created the proposal is the owner)
 * 4. Others can Vote on proposals (votes for or against)
 * 5. Execute proposals - (Only Owner of the proposal can execute)
 * 6. Governance and transparency
 */

// Custom SVG Components for each step
const WalletIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Wallet body */}
    <motion.rect
      x="20"
      y="30"
      width="60"
      height="40"
      rx="8"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    {/* Wallet opening */}
    <motion.path
      d="M75 45 L85 45 C87 45 89 47 89 49 L89 56 C89 58 87 60 85 60 L75 60"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    {/* Card inside wallet */}
    <motion.rect
      x="25"
      y="40"
      width="35"
      height="20"
      rx="3"
      stroke="currentColor"
      strokeWidth="1"
      fill="currentColor"
      fillOpacity="0.2"
      animate={{ y: [40, 38, 40] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    {/* Connection lines */}
    <motion.circle
      cx="82"
      cy="52"
      r="2"
      fill="currentColor"
      animate={{ scale: [1, 1.5, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  </svg>
);

const TokenIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main coin */}
    <motion.circle
      cx="50"
      cy="50"
      r="30"
      stroke="currentColor"
      strokeWidth="3"
      fill="currentColor"
      fillOpacity="0.1"
      animate={{ rotateY: [0, 360] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    {/* Inner design */}
    <motion.text
      x="50"
      y="55"
      textAnchor="middle"
      className="text-sm font-bold"
      fill="currentColor"
    >
      AQUA
    </motion.text>
    {/* Floating mini coins */}
    {[
      { x: 25, y: 25, delay: 0 },
      { x: 75, y: 25, delay: 0.5 },
      { x: 25, y: 75, delay: 1 },
      { x: 75, y: 75, delay: 1.5 },
    ].map((coin, i) => (
      <motion.circle
        key={i}
        cx={coin.x}
        cy={coin.y}
        r="8"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.3"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: coin.delay }}
      />
    ))}
  </svg>
);

const ProposalIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Document */}
    <motion.rect
      x="30"
      y="20"
      width="40"
      height="55"
      rx="4"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
      animate={{ y: [20, 18, 20] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    {/* Text lines */}
    {[35, 42, 49, 56, 63].map((y, i) => (
      <motion.line
        key={i}
        x1="35"
        y1={y}
        x2={i === 4 ? "55" : "65"}
        y2={y}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
    {/* Lightbulb idea */}
    <motion.circle
      cx="75"
      cy="35"
      r="8"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.2"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <motion.path
      d="M72 30 L75 33 L78 27"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  </svg>
);

const VoteIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Ballot box */}
    <motion.rect
      x="25"
      y="45"
      width="50"
      height="35"
      rx="4"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    {/* Ballot slot */}
    <motion.rect
      x="40"
      y="40"
      width="20"
      height="3"
      rx="1"
      fill="currentColor"
      opacity="0.6"
    />
    {/* Voting papers */}
    {[
      { x: 45, y: 25, rotation: -10, color: "green", delay: 0 },
      { x: 55, y: 20, rotation: 5, color: "red", delay: 0.5 },
    ].map((vote, i) => (
      <motion.g key={i}>
        <motion.rect
          x={vote.x}
          y={vote.y}
          width="12"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.2"
          transform={`rotate(${vote.rotation} ${vote.x + 6} ${vote.y + 8})`}
          animate={{
            y: [vote.y, vote.y + 20, vote.y + 20],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: vote.delay }}
        />
        {/* Check/X mark */}
        <motion.path
          d={
            vote.color === "green"
              ? `M${vote.x + 3} ${vote.y + 8} L${vote.x + 6} ${vote.y + 11} L${vote.x + 10} ${vote.y + 6}`
              : `M${vote.x + 3} ${vote.y + 5} L${vote.x + 9} ${vote.y + 11} M${vote.x + 9} ${vote.y + 5} L${vote.x + 3} ${vote.y + 11}`
          }
          stroke={vote.color === "green" ? "#10B981" : "#EF4444"}
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${vote.rotation} ${vote.x + 6} ${vote.y + 8})`}
          animate={{
            y: [0, 20, 20],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: vote.delay }}
        />
      </motion.g>
    ))}
  </svg>
);

const ExecuteIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Gear/cog */}
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "50px 50px" }}
    >
      <motion.path
        d="M50 20 L55 30 L65 25 L70 35 L80 40 L75 50 L80 60 L70 65 L65 75 L55 70 L50 80 L45 70 L35 75 L30 65 L20 60 L25 50 L20 40 L30 35 L35 25 L45 30 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="currentColor"
        fillOpacity="0.1"
      />
    </motion.g>
    {/* Center circle */}
    <motion.circle
      cx="50"
      cy="50"
      r="12"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.3"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    {/* Execute button */}
    <motion.polygon
      points="45,45 45,55 55,50"
      fill="currentColor"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </svg>
);

const GovernanceIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Building/institution */}
    <motion.rect
      x="20"
      y="60"
      width="60"
      height="30"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    {/* Columns */}
    {[30, 40, 50, 60, 70].map((x, i) => (
      <motion.rect
        key={i}
        x={x}
        y="40"
        width="4"
        height="20"
        fill="currentColor"
        opacity="0.6"
        animate={{ scaleY: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
    {/* Roof */}
    <motion.polygon
      points="15,40 50,20 85,40"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.2"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    {/* Transparency rays */}
    {[1, 2, 3].map((i) => (
      <motion.line
        key={i}
        x1="50"
        y1="20"
        x2="50"
        y2="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        transform={`rotate(${(i - 2) * 20} 50 20)`}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
      />
    ))}
  </svg>
);

// Step Component
const StepCard = ({
  step,
  index,
  isActive = false,
}: {
  step: {
    number: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    details: string[];
  };
  index: number;
  isActive?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    viewport={{ once: true }}
    className={`group relative ${isActive ? "z-10" : ""}`}
  >
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative h-full rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300 ${
        isActive
          ? "from-primary/15 border-primary/40 shadow-primary/20 bg-gradient-to-br to-blue-500/10 shadow-xl"
          : "bg-card/40 border-border/30 hover:border-primary/30"
      }`}
    >
      {/* Step number */}
      <motion.div
        className="bg-primary text-primary-foreground absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold shadow-lg"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
      >
        {step.number}
      </motion.div>

      {/* Icon */}
      <motion.div
        className="text-primary mx-auto mb-6 h-20 w-20"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.8 }}
      >
        {step.icon}
      </motion.div>

      {/* Content */}
      <h3 className="mb-4 text-center text-2xl font-bold">{step.title}</h3>
      <p className="text-muted-foreground mb-6 text-center leading-relaxed">
        {step.description}
      </p>

      {/* Details */}
      <ul className="space-y-2">
        {step.details.map((detail, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 + i * 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground flex items-start gap-3 text-sm"
          >
            <motion.div
              className="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
            {detail}
          </motion.li>
        ))}
      </ul>

      {/* Connection line to next step */}
      {index < 5 && (
        <motion.div
          className="bg-primary/30 absolute top-1/2 -right-4 hidden h-0.5 w-8 -translate-y-1/2 transform lg:block"
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
        />
      )}
    </motion.div>
  </motion.div>
);

// Flow Visualization Component
const FlowVisualization = () => (
  <div className="relative mx-auto mb-16 max-w-6xl">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="from-primary/10 via-card/50 border-primary/20 rounded-3xl border bg-gradient-to-r to-blue-500/10 p-8 backdrop-blur-sm"
    >
      <h3 className="mb-8 text-center text-2xl font-bold">
        DAO Workflow Visualization
      </h3>

      <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
        {[
          { icon: <WalletIcon className="h-12 w-12" />, label: "Connect" },
          { icon: <TokenIcon className="h-12 w-12" />, label: "Buy Tokens" },
          { icon: <ProposalIcon className="h-12 w-12" />, label: "Propose" },
          { icon: <VoteIcon className="h-12 w-12" />, label: "Vote" },
          { icon: <ExecuteIcon className="h-12 w-12" />, label: "Execute" },
          { icon: <GovernanceIcon className="h-12 w-12" />, label: "Govern" },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <motion.div
              className="bg-card/60 text-primary border-primary/30 mb-3 flex h-20 w-20 items-center justify-center rounded-full border"
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            >
              {item.icon}
            </motion.div>
            <span className="text-center text-sm font-medium">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

export const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Connect Wallet",
      description: "Connect your Web3 wallet to begin your DAO journey",
      icon: <WalletIcon className="h-full w-full" />,
      details: [
        "Support for MetaMask, WalletConnect, and more",
        "Secure connection with encrypted protocols",
        "One-click setup process",
      ],
    },
    {
      number: 2,
      title: "Buy AQUA Tokens",
      description: "Purchase AQUA tokens with ETH to become a DAO member",
      icon: <TokenIcon className="h-full w-full" />,
      details: [
        "Exchange ETH for AQUA governance tokens",
        "Instant membership activation",
        "Voting power proportional to token holdings",
      ],
    },
    {
      number: 3,
      title: "Create Proposals",
      description: "Submit proposals to shape the future of the DAO",
      icon: <ProposalIcon className="h-full w-full" />,
      details: [
        "Propose changes, improvements, or initiatives",
        "Become the proposal owner with execution rights",
        "Clear documentation and voting guidelines",
      ],
    },
    {
      number: 4,
      title: "Vote on Proposals",
      description: "Participate in democratic decision-making",
      icon: <VoteIcon className="h-full w-full" />,
      details: [
        "Vote For or Against each proposal",
        "Transparent voting process on blockchain",
        "Real-time results and participation tracking",
      ],
    },
    {
      number: 5,
      title: "Execute Proposals",
      description: "Proposal owners implement approved decisions",
      icon: <ExecuteIcon className="h-full w-full" />,
      details: [
        "Only proposal owners can execute",
        "Automated smart contract execution",
        "Immediate implementation of decisions",
      ],
    },
    {
      number: 6,
      title: "Governance & Transparency",
      description: "Enjoy transparent and accountable governance",
      icon: <GovernanceIcon className="h-full w-full" />,
      details: [
        "All decisions recorded on blockchain",
        "Complete audit trail of all activities",
        "Democratic participation for all members",
      ],
    },
  ];

  return (
    <section className="from-background via-background to-primary/5 relative overflow-hidden bg-gradient-to-br py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="border-primary/30 absolute top-40 right-20 h-64 w-64 rounded-full border"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="to-primary/20 absolute bottom-40 left-20 h-48 w-48 rounded-full bg-gradient-to-br from-blue-500/20"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
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
            Simple Process
          </motion.span>

          <h2 className="mb-6 text-4xl leading-tight font-bold lg:text-6xl">
            How{" "}
            <span className="from-primary to-primary bg-gradient-to-r via-blue-500 bg-clip-text text-transparent">
              AquaDAO
            </span>{" "}
            Works
          </h2>

          <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
            Join our decentralized governance in 6 simple steps. From connecting
            your wallet to executing proposals, experience true democratic
            decision-making.
          </p>
        </motion.div>

        {/* Flow Visualization */}
        <FlowVisualization />

        {/* Steps Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              isActive={index === 2} // Highlight the "Create Proposals" step
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
          <div className="from-primary/10 via-card/50 border-primary/20 rounded-3xl border bg-gradient-to-br to-blue-500/10 p-12 backdrop-blur-sm">
            <h3 className="mb-6 text-3xl font-bold lg:text-4xl">
              Ready to Start Governing?
            </h3>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
              Join thousands of members who are already shaping the future
              through transparent, democratic governance.
            </p>

            <div className="inline-flex flex-col gap-4 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground group relative overflow-hidden rounded-lg px-10 py-4 text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                <motion.div
                  className="from-primary to-primary absolute inset-0 bg-gradient-to-r via-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10">Connect Wallet Now</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-border hover:border-primary/50 rounded-lg border-2 px-10 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-200"
              >
                View Live Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
