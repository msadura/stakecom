"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { ModeToggle } from "~/components/mode-toggle";
import { cn } from "~/lib/utils";

export function MainNav() {
  const pathname = usePathname();

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
          <Link
            href="/"
            className={cn(
              "px-2 font-bold transition-colors hover:text-foreground/80",
              pathname === "/" ? "text-foreground" : "text-foreground/60",
            )}
          >
            STAKE
          </Link>
          <Link
            href="/faq"
            className={cn(
              "mr-4 px-2 font-bold transition-colors hover:text-foreground/80",
              pathname?.startsWith("/faq")
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            FAQ
          </Link>
          <ConnectButton />
          <ModeToggle />
        </nav>
      </div>
    </div>
  );
}
