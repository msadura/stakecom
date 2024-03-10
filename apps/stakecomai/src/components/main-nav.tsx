"use client";

import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { ModeToggle } from "~/components/mode-toggle";

export function MainNav() {
  return (
    <div className="flex flex-1 flex-wrap">
      <Link href="/" className="mr-6 flex max-h-[40px] items-center space-x-1">
        <Image
          src="/stake_logo2.png"
          alt="logo"
          width={45}
          height={40}
          objectFit="contain"
        />
        <span className="hidden font-bold sm:inline-block">stake.com.ai</span>
      </Link>

      <div className="flex flex-1 items-center justify-end space-x-2">
        <nav className="flex items-center gap-2">
          <ConnectButton />
          <ModeToggle />
        </nav>
      </div>
    </div>
  );
}
