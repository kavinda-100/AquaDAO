"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ModeToggle } from "@/components/ModeToggle";

export const Header = () => {
  return (
    <header className="container mx-auto flex items-center justify-between px-2 py-2">
      {/* logo */}
      <Link href={"/"} className="flex items-center gap-2">
        <Image src="/logo.png" alt="Logo" width={40} height={30} />
        <h1 className="text-primary/90 hidden text-xl font-bold md:block">
          Aqua DAO
        </h1>
      </Link>

      {/* navigation links */}
      <div className="flex items-center gap-3">
        {/* desktop bar */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link href={"/about"}>About</Link>
        </div>
        <ConnectButton
          showBalance={false}
          chainStatus={"icon"}
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
        />
        <ModeToggle />
        {/* mobile nav */}
        <MobileNav />
      </div>
    </header>
  );
};

const MobileNav = () => {
  return (
    <div className="flex lg:hidden">
      <Link href={"/about"}>About</Link>
    </div>
  );
};
