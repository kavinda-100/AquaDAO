"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ModeToggle } from "@/components/ModeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Vote, Info, Waves, WebhookIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";

export const Header = () => {
  const pathname = usePathname();
  const isScrolled = useScrolled(20);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/80 border-border/50 border-b shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo Section */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-all duration-200 hover:scale-105"
        >
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
          <div className="hidden md:block">
            <h1 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
              Aqua DAO
            </h1>
            <p className="text-muted-foreground -mt-1 text-xs">
              Decentralized Governance
            </p>
          </div>
        </Link>

        {/* Enhanced Navigation */}
        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            <Link
              href="/tokens"
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-all duration-200",
                "hover:bg-accent/50 hover:text-accent-foreground group",
                pathname === "/proposals"
                  ? "bg-primary/10 text-primary border-primary/20 border"
                  : "text-foreground/80 hover:text-foreground",
              )}
            >
              <WebhookIcon
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  "group-hover:scale-110",
                  pathname === "/tokens" ? "text-primary" : "",
                )}
              />
              By Tokens
              {pathname === "/tokens" && (
                <div className="bg-primary h-1 w-1 animate-pulse rounded-full" />
              )}
            </Link>
            <Link
              href="/proposals"
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-all duration-200",
                "hover:bg-accent/50 hover:text-accent-foreground group",
                pathname === "/proposals"
                  ? "bg-primary/10 text-primary border-primary/20 border"
                  : "text-foreground/80 hover:text-foreground",
              )}
            >
              <Vote
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  "group-hover:scale-110",
                  pathname === "/proposals" ? "text-primary" : "",
                )}
              />
              Proposals
              {pathname === "/proposals" && (
                <div className="bg-primary h-1 w-1 animate-pulse rounded-full" />
              )}
            </Link>

            <Link
              href="/about"
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-all duration-200",
                "hover:bg-accent/50 hover:text-accent-foreground group",
                pathname === "/about"
                  ? "bg-primary/10 text-primary border-primary/20 border"
                  : "text-foreground/80 hover:text-foreground",
              )}
            >
              <Info
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  "group-hover:scale-110",
                  pathname === "/about" ? "text-primary" : "",
                )}
              />
              About
              {pathname === "/about" && (
                <div className="bg-primary h-1 w-1 animate-pulse rounded-full" />
              )}
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <ConnectButton
                showBalance={false}
                chainStatus="icon"
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "full",
                }}
              />
            </div>

            <div className="sm:hidden">
              <ConnectButton
                showBalance={false}
                chainStatus="none"
                accountStatus="avatar"
              />
            </div>

            <div className="p-1">
              <ModeToggle />
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="hover:bg-accent/50 group flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200">
          <Menu className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader className="text-left">
          <div className="mb-2 flex items-center gap-3">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Aqua DAO Logo"
                width={32}
                height={24}
              />
              <Waves className="text-primary/60 wave-animation absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5" />
            </div>
            <div>
              <SheetTitle className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-lg text-transparent">
                Aqua DAO
              </SheetTitle>
              <SheetDescription className="text-xs">
                Decentralized Autonomous Organization
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-3">
          <Link
            href="/tokens"
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 font-medium transition-all duration-200",
              "hover:bg-accent/50 hover:text-accent-foreground group",
              pathname === "/proposals"
                ? "bg-primary/10 text-primary border-primary/20 border"
                : "text-foreground/80 hover:text-foreground",
            )}
          >
            <WebhookIcon
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                "group-hover:scale-110",
                pathname === "/tokens" ? "text-primary" : "",
              )}
            />
            By Tokens
            {pathname === "/tokens" && (
              <div className="bg-primary h-1 w-1 animate-pulse rounded-full" />
            )}
          </Link>

          <Link
            href="/proposals"
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-all duration-200",
              "hover:bg-accent/50 hover:text-accent-foreground group",
              pathname === "/proposals"
                ? "bg-primary/10 text-primary border-primary/20 border"
                : "text-foreground/80 hover:text-foreground",
            )}
          >
            <Vote
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                "group-hover:scale-110",
                pathname === "/proposals" ? "text-primary" : "",
              )}
            />
            <span>Proposals</span>
            {pathname === "/proposals" && (
              <div className="bg-primary ml-auto h-2 w-2 animate-pulse rounded-full" />
            )}
          </Link>

          <Link
            href="/about"
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-all duration-200",
              "hover:bg-accent/50 hover:text-accent-foreground group",
              pathname === "/about"
                ? "bg-primary/10 text-primary border-primary/20 border"
                : "text-foreground/80 hover:text-foreground",
            )}
          >
            <Info
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                "group-hover:scale-110",
                pathname === "/about" ? "text-primary" : "",
              )}
            />
            <span>About</span>
            {pathname === "/about" && (
              <div className="bg-primary ml-auto h-2 w-2 animate-pulse rounded-full" />
            )}
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
