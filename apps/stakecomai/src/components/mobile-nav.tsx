"use client";

import type { LinkProps } from "next/link";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Box } from "~/components/ui/box";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box justify="between" className="flex-1 md:hidden">
      <MobileLink href="/" className="flex items-center" onOpenChange={setOpen}>
        <Image
          src="/stake_logo2.png"
          alt="logo"
          width={45}
          height={40}
          objectFit="contain"
        />
        <span className="ml-1 hidden font-bold sm:inline-block">
          stake.com.ai
        </span>
      </MobileLink>
      <Box center className="gap-2">
        <ConnectButton />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <svg
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M3 5H11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M3 12H16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M3 19H21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="pr-0">
            <MobileLink
              href="/"
              className="flex items-center"
              onOpenChange={setOpen}
            >
              <Image
                src="/stake_logo2.png"
                alt="logo"
                width={35}
                height={30}
                objectFit="contain"
              />
              <span className="ml-1  font-bold ">stake.com.ai</span>
            </MobileLink>
            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pt-2">
              <div className="flex flex-col">
                <MobileLink
                  href="/"
                  onOpenChange={setOpen}
                  className="py-3 font-bold"
                >
                  STAKE
                </MobileLink>
                <MobileLink
                  href="/faq"
                  onOpenChange={setOpen}
                  className="py-3 font-bold"
                >
                  FAQ
                </MobileLink>
              </div>
              <div className="flex flex-col space-y-2">
                {/* {docsConfig.sidebarNav.map((item, index) => (
              <div key={index} className="flex flex-col space-y-3 pt-6">
                <h4 className="font-medium">{item.title}</h4>
                {item?.items?.length &&
                  item.items.map((item) => (
                    <React.Fragment key={item.href}>
                      {!item.disabled &&
                        (item.href ? (
                          <MobileLink
                            href={item.href}
                            onOpenChange={setOpen}
                            className="text-muted-foreground"
                          >
                            {item.title}
                            {item.label && (
                              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                                {item.label}
                              </span>
                            )}
                          </MobileLink>
                        ) : (
                          item.title
                        ))}
                    </React.Fragment>
                  ))}
              </div>
            ))} */}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </Box>
    </Box>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
