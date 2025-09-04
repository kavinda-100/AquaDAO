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
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathname = usePathname();
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
          <Link
            href={"/proposals"}
            className={cn("font-bold", {
              "text-primary/90": pathname === "/proposals",
            })}
          >
            Proposals
          </Link>
          <Link
            href={"/about"}
            className={cn("font-bold", {
              "text-primary/90": pathname === "/about",
            })}
          >
            About
          </Link>
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
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Aqua DAO</SheetTitle>
          <SheetDescription>
            A decentralized autonomous organization for Web3
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 p-4">
          <Link
            href={"/proposals"}
            className={cn("font-bold", {
              "text-primary/90": pathname === "/proposals",
            })}
          >
            Proposals
          </Link>
          <Link
            href={"/about"}
            className={cn("font-bold", {
              "text-primary/90": pathname === "/about",
            })}
          >
            About
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
