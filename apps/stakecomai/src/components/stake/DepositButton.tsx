"use client";

import { useCallback, useMemo, useState } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { switchChain } from "@wagmi/core";
import { Loader2 } from "lucide-react";
import { useAccount, useConfig } from "wagmi";
import { mainnet } from "wagmi/chains";

import { Button } from "~/components/ui/button";

interface ButtonConfig {
  label: string;
  onClick: () => void;
  variant: undefined | "secondary" | "warning";
  disabled?: boolean;
  tooltip?: string;
}

export const DepositButton = () => {
  const wagmiConfig = useConfig();
  const { openConnectModal } = useConnectModal();
  const { isConnected, chainId } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  const safeSwitchNetwork = useCallback(async () => {
    try {
      setIsLoading(true);
      await switchChain(wagmiConfig, { chainId: mainnet.id });
    } catch (error) {
      // nothing
    } finally {
      setIsLoading(false);
    }
  }, []);

  const buttonConfig: ButtonConfig = useMemo(() => {
    if (!isConnected) {
      return {
        label: "Connect wallet",
        onClick: () => openConnectModal?.(),
        variant: "warning" as const,
      };
    }

    if (chainId !== mainnet.id) {
      return {
        label: "Switch to Ethereum",
        onClick: safeSwitchNetwork,
        variant: "warning" as const,
      };
    }

    return {
      label: "Deposits disabled",
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick: () => {},
      variant: undefined,
      disabled: true,
    };
  }, [chainId, isConnected, openConnectModal, safeSwitchNetwork]);

  return (
    <Button
      onClick={buttonConfig?.onClick}
      variant={buttonConfig?.variant}
      className="flex-1"
      size="lg"
      disabled={isLoading || buttonConfig?.disabled}
    >
      {isLoading && (
        <Loader2 className="mr-1 animate-spin" width={50} height={50} />
      )}
      {buttonConfig?.label}
    </Button>
  );
};
