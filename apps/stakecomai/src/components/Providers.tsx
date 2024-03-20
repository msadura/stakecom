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
import { useTheme } from "next-themes";
import { WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";

import { TRPCReactProvider } from "~/trpc/react";

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: "stake.com.ai",
  projectId: "5a2a229ccb03eb4f9b5909cb3255f0f9",
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

export function Providers({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <WagmiProvider config={config} reconnectOnMount={true}>
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
    </WagmiProvider>
  );
}
