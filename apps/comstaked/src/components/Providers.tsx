"use client";

import * as React from "react";
import {
  darkTheme,
  getDefaultConfig,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";

import { TRPCReactProvider } from "~/trpc/react";

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: "stake.com.ai",
  projectId: "YOUR_PROJECT_ID",
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [mainnet],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TRPCReactProvider>
          <RainbowKitProvider
            theme={
              theme === "dark"
                ? darkTheme({
                    borderRadius: "medium",
                    accentColor: "hsl(27.16 95.29% 50%)",
                    accentColorForeground: "hsl(207.89 74.74% 18.63%)",
                  })
                : lightTheme({
                    borderRadius: "medium",
                    accentColor: "hsl(27.16 95.29% 50%)",
                    accentColorForeground: "hsl(207.89 74.74% 18.63%)",
                  })
            }
          >
            {children}
          </RainbowKitProvider>
        </TRPCReactProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
