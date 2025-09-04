import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Github,
  Twitter,
  MessageCircle,
  Mail,
  ExternalLink,
  Shield,
  BookOpen,
  Users,
  Vote,
  Coins,
  FileText,
  Newspaper,
  Heart,
  Waves,
  ArrowUpRight,
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-border/50 mt-auto border-t">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="footer-section space-y-4">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Aqua DAO Logo"
                  width={40}
                  height={30}
                  className="transition-transform duration-200 group-hover:rotate-12"
                />
                <Waves className="text-primary/60 wave-animation absolute -right-1 -bottom-1 h-3 w-3" />
              </div>
              <div>
                <h3 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent">
                  Aqua DAO
                </h3>
                <p className="text-muted-foreground -mt-1 text-xs">
                  Decentralized Governance
                </p>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering communities through transparent, decentralized
              governance. Vote on proposals, manage treasury, and shape the
              future together.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="social-icon border-border/50 hover:border-primary/50 hover:bg-primary/5 group rounded-lg border p-2 transition-all duration-200"
              >
                <Github className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              </Link>
              <Link
                href="/"
                className="social-icon border-border/50 hover:border-primary/50 hover:bg-primary/5 group rounded-lg border p-2 transition-all duration-200"
              >
                <Twitter className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              </Link>
              <Link
                href="/"
                className="social-icon border-border/50 hover:border-primary/50 hover:bg-primary/5 group rounded-lg border p-2 transition-all duration-200"
              >
                <MessageCircle className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              </Link>
            </div>
          </div>

          {/* Governance Links */}
          <div className="footer-section space-y-4">
            <h4 className="text-foreground flex items-center gap-2 font-semibold">
              <Vote className="text-primary h-4 w-4" />
              Governance
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/proposals"
                  className="footer-link-hover text-muted-foreground hover:text-foreground group flex items-center gap-2 text-sm transition-colors duration-200"
                >
                  <span>Active Proposals</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="footer-link-hover text-muted-foreground hover:text-foreground group flex items-center gap-2 text-sm transition-colors duration-200"
                >
                  <span>Voting History</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="footer-link-hover text-muted-foreground hover:text-foreground group flex items-center gap-2 text-sm transition-colors duration-200"
                >
                  <span>Treasury</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="footer-link-hover text-muted-foreground hover:text-foreground group flex items-center gap-2 text-sm transition-colors duration-200"
                >
                  <span>Token Distribution</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="footer-section space-y-4">
            <h4 className="text-foreground flex items-center gap-2 font-semibold">
              <BookOpen className="text-primary h-4 w-4" />
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="footer-link-hover text-muted-foreground hover:text-foreground group flex items-center gap-2 text-sm transition-colors duration-200"
                >
                  <span>Documentation</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="footer-link-hover text-muted-foreground hover:text-foreground group flex items-center gap-2 text-sm transition-colors duration-200"
                >
                  <span>API Reference</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="footer-link-hover text-muted-foreground hover:text-foreground group flex items-center gap-2 text-sm transition-colors duration-200"
                >
                  <span>Smart Contracts</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="footer-link-hover text-muted-foreground hover:text-foreground group flex items-center gap-2 text-sm transition-colors duration-200"
                >
                  <span>Security Audit</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div className="footer-section space-y-4">
            <h4 className="text-foreground flex items-center gap-2 font-semibold">
              <Users className="text-primary h-4 w-4" />
              Community
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="footer-link-hover text-muted-foreground hover:text-foreground group flex items-center gap-2 text-sm transition-colors duration-200"
                >
                  <span>Forum</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="footer-link-hover text-muted-foreground hover:text-foreground group flex items-center gap-2 text-sm transition-colors duration-200"
                >
                  <span>Blog</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="footer-link-hover text-muted-foreground hover:text-foreground group flex items-center gap-2 text-sm transition-colors duration-200"
                >
                  <span>Help Center</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="footer-link-hover text-muted-foreground hover:text-foreground group flex items-center gap-2 text-sm transition-colors duration-200"
                >
                  <span>Contact Us</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-border/50 mt-12 border-t pt-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="space-y-2">
              <h4 className="text-foreground flex items-center gap-2 font-semibold">
                <Newspaper className="text-primary h-4 w-4" />
                Stay Updated
              </h4>
              <p className="text-muted-foreground text-sm">
                Get the latest updates on proposals, governance changes, and
                community news.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-accent/30 border-border/50 flex items-center gap-2 rounded-lg border px-4 py-2">
                <Mail className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm">
                  newsletter@aquadao.org
                </span>
              </div>
              <Link
                href="/"
                className="bg-primary text-primary-foreground hover:bg-primary/90 group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
              >
                Subscribe
                <ExternalLink className="h-3 w-3 transition-transform duration-200 group-hover:scale-110" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-border/30 bg-accent/20 border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-muted-foreground flex items-center gap-4 text-sm">
              <span>© {currentYear} Aqua DAO. All rights reserved.</span>
              <div className="hidden items-center gap-1 md:flex">
                <span>Built with</span>
                <Heart className="h-3 w-3 animate-pulse text-red-500" />
                <span>for the decentralized future</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground group flex items-center gap-1 transition-colors duration-200"
              >
                <Shield className="h-3 w-3 transition-transform duration-200 group-hover:scale-110" />
                Privacy Policy
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground group flex items-center gap-1 transition-colors duration-200"
              >
                <FileText className="h-3 w-3 transition-transform duration-200 group-hover:scale-110" />
                Terms of Service
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground group flex items-center gap-1 transition-colors duration-200"
              >
                <Coins className="h-3 w-3 transition-transform duration-200 group-hover:scale-110" />
                Token Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
