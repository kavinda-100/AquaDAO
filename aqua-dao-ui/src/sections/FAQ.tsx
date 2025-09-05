"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Plus, X } from "lucide-react";

// Question Icon Component using lucide-react
const QuestionIcon = ({ className }: { className?: string }) => (
  <motion.div
    className={className}
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ duration: 3, repeat: Infinity }}
  >
    <HelpCircle className="h-full w-full" />
  </motion.div>
);

// Plus/Minus Icon for accordion using lucide-react
const AccordionIcon = ({ isOpen }: { isOpen: boolean }) => (
  <motion.div
    className="text-primary flex-shrink-0"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    animate={{ rotate: isOpen ? 90 : 0 }}
    transition={{ duration: 0.3 }}
  >
    {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
  </motion.div>
);

// FAQ Item Component
const FAQItem = ({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: {
    question: string;
    answer: string;
    category: string;
  };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group"
  >
    <motion.div
      className={`overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
        isOpen
          ? "from-primary/10 border-primary/30 shadow-primary/10 bg-gradient-to-br to-blue-500/5 shadow-lg"
          : "bg-card/40 border-border/30 hover:border-primary/20 hover:bg-card/60"
      }`}
      whileHover={{ scale: 1.01 }}
    >
      {/* Question Header */}
      <motion.button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
        whileHover={{ x: 2 }}
      >
        <div className="flex-1">
          <motion.span
            className="bg-primary/10 border-primary/20 text-primary mb-3 inline-block rounded-full border px-3 py-1 text-xs font-semibold"
            animate={{ scale: isOpen ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {faq.category}
          </motion.span>
          <h3 className="text-lg leading-relaxed font-semibold lg:text-xl">
            {faq.question}
          </h3>
        </div>

        <AccordionIcon isOpen={isOpen} />
      </motion.button>{" "}
      {/* Answer Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="px-6 pt-0 pb-6"
            >
              <div className="via-border mb-4 h-px w-full bg-gradient-to-r from-transparent to-transparent" />
              <p className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </motion.div>
);

// Category Filter Component
const CategoryFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
}: {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) => (
  <div className="mb-12 flex flex-wrap justify-center gap-3">
    {categories.map((category) => (
      <motion.button
        key={category}
        onClick={() => onCategoryChange(category)}
        className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
          activeCategory === category
            ? "bg-primary text-primary-foreground shadow-primary/30 shadow-lg"
            : "bg-card/60 border-border/30 hover:border-primary/30 hover:bg-card/80 border"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ scale: activeCategory === category ? 1.05 : 1 }}
      >
        {category}
      </motion.button>
    ))}
  </div>
);

export const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // Reset openFAQ when category changes to fix filter animation issues
  const handleCategoryChange = (category: string) => {
    setOpenFAQ(null); // Close any open FAQ when changing category
    setActiveCategory(category);
  };

  const faqs = [
    {
      question: "What is AquaDAO and how does it work?",
      answer:
        "AquaDAO is a decentralized autonomous organization built on blockchain technology that enables transparent, democratic governance. Members hold AQUA tokens which grant voting rights on proposals. The entire governance process from proposal creation to execution is automated through smart contracts, ensuring transparency and eliminating the need for traditional intermediaries.",
      category: "General",
    },
    {
      question: "How do I become a member of AquaDAO?",
      answer:
        "To become a member, you need to connect your Web3 wallet (like MetaMask) and purchase AQUA tokens using ETH. Once you hold AQUA tokens, you automatically become a DAO member with voting rights proportional to your token holdings. There are no additional membership fees or requirements.",
      category: "Getting Started",
    },
    {
      question: "What can I do with AQUA tokens?",
      answer:
        "AQUA tokens serve as governance tokens that grant you voting rights in the DAO. You can vote on proposals, create your own proposals, and participate in all governance decisions. Your voting power is proportional to the number of AQUA tokens you hold. Tokens also represent your stake in the DAO's future success.",
      category: "Tokens",
    },
    {
      question: "How do I create and submit a proposal?",
      answer:
        "Any AQUA token holder can create proposals through our user-friendly interface. Simply connect your wallet, navigate to the proposals section, and fill out the proposal form with your idea, implementation details, and expected outcomes. Once submitted, your proposal enters a review period before community voting begins. As the proposal creator, you become the owner with execution rights.",
      category: "Proposals",
    },
    {
      question: "What types of proposals can be submitted?",
      answer:
        "Proposals can cover a wide range of topics including protocol upgrades, treasury allocation, partnership decisions, governance parameter changes, community initiatives, and strategic direction. All proposals must benefit the DAO and its members. The community votes to approve or reject each proposal based on its merits.",
      category: "Proposals",
    },
    {
      question: "How does the voting process work?",
      answer:
        "Voting is conducted entirely on-chain for maximum transparency. Once a proposal is submitted, there's a voting period during which AQUA token holders can cast their votes &ldquo;For&rdquo; or &ldquo;Against&rdquo; the proposal. Voting power is weighted by token holdings. All votes are recorded on the blockchain and can be publicly verified.",
      category: "Voting",
    },
    {
      question: "Who can execute approved proposals?",
      answer:
        "Only the original proposal creator (the proposal owner) has the right to execute their proposal once it has been approved by the community vote. This ownership model ensures accountability and gives proposers the responsibility to implement their ideas. Execution is done through smart contracts to ensure transparency.",
      category: "Execution",
    },
    {
      question: "Is AquaDAO secure and audited?",
      answer:
        "Yes, AquaDAO's smart contracts have been thoroughly audited by leading blockchain security firms. All code is open-source and available for community review. The platform uses battle-tested smart contract patterns and follows best practices for DeFi security. Regular security reviews ensure ongoing protection.",
      category: "Security",
    },
    {
      question: "What are the fees for participating in AquaDAO?",
      answer:
        "The only fees you pay are standard Ethereum network gas fees for transactions like voting, creating proposals, or executing decisions. AquaDAO itself doesn't charge any platform fees. Gas fees vary based on network congestion but are typically minimal for governance transactions.",
      category: "Fees",
    },
    {
      question: "Can I sell or transfer my AQUA tokens?",
      answer:
        "Yes, AQUA tokens are standard ERC-20 tokens that can be freely transferred, traded, or sold on supported exchanges and DEXs. However, remember that selling your tokens means giving up your voting rights and stake in the DAO. Token transfers are instant and recorded on the blockchain.",
      category: "Tokens",
    },
    {
      question: "How is AquaDAO different from traditional governance?",
      answer:
        "Unlike traditional governance, AquaDAO operates without central authorities, bureaucratic delays, or opaque decision-making. All processes are transparent, recorded on blockchain, and executed automatically through smart contracts. Members have direct voting power, and there's no single point of control or failure.",
      category: "General",
    },
    {
      question: "What happens if I disagree with a governance decision?",
      answer:
        "In a decentralized democracy, majority decisions are binding. However, the transparent nature of blockchain governance means all decisions are public and auditable. If you fundamentally disagree with the DAO's direction, you can sell your tokens and exit. The open-source nature also allows for forking if there's significant community disagreement.",
      category: "Governance",
    },
  ];

  const categories = [
    "All",
    ...Array.from(new Set(faqs.map((faq) => faq.category))),
  ];

  const filteredFAQs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  console.log("Active Category:", activeCategory);
  console.log("Filtered FAQs:", filteredFAQs.length);
  console.log("Categories:", categories);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="from-background via-muted/10 to-background relative overflow-hidden bg-gradient-to-br py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="border-primary/30 absolute top-32 right-16 h-64 w-64 rounded-full border"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="from-primary/20 absolute bottom-32 left-16 h-48 w-48 rounded-full bg-gradient-to-br to-blue-500/20"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        <motion.div
          className="border-primary/20 absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rotate-45 transform border-2"
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-primary mx-auto mb-6 h-20 w-20"
          >
            <QuestionIcon className="h-full w-full" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-primary/10 border-primary/20 text-primary mb-6 inline-block rounded-full border px-4 py-2 text-sm font-semibold"
          >
            Get Answers
          </motion.span>

          <h2 className="mb-6 text-4xl leading-tight font-bold lg:text-6xl">
            Frequently Asked{" "}
            <span className="from-primary to-primary bg-gradient-to-r via-blue-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
            Find answers to common questions about AquaDAO, governance tokens,
            voting processes, and everything you need to know to get started.
          </p>
        </motion.div>
        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />{" "}
        {/* FAQ List */}
        <div className="mx-auto max-w-4xl">
          <AnimatePresence>
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <FAQItem
                    key={`${faq.question}-${faq.category}`} // Use unique question + category as key
                    faq={faq}
                    index={index}
                    isOpen={openFAQ === index}
                    onToggle={() => toggleFAQ(index)}
                  />
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground text-lg">
                    No FAQs found for the selected category.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="from-primary/10 via-card/50 border-primary/20 rounded-3xl border bg-gradient-to-br to-blue-500/10 p-12 backdrop-blur-sm">
            <h3 className="mb-6 text-3xl font-bold lg:text-4xl">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
              Our community is here to help! Join our Discord or reach out to
              our support team for personalized assistance.
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
                <span className="relative z-10">Join Discord</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-border hover:border-primary/50 rounded-lg border-2 px-10 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-200"
              >
                Contact Support
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
