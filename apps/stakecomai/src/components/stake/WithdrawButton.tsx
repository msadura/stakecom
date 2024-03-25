"use client";

import { useCallback, useMemo, useState } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { switchChain } from "@wagmi/core";
import { useAccount, useConfig } from "wagmi";
import { mainnet } from "wagmi/chains";

import { Spinner } from "~/components/Spinner";
import { Box } from "~/components/ui/box";
import { Button } from "~/components/ui/button";

interface ButtonConfig {
  label: string;
  onClick: () => void;
  variant: undefined | "secondary" | "warning";
  disabled?: boolean;
  tooltip?: string;
}

export const WithdrawButton = ({
  disabled,
  onUnstake,
  isUnstaking,
}: {
  onUnstake: VoidFunction;
  isUnstaking: boolean;
  disabled?: boolean;
}) => {
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
  }, [wagmiConfig]);

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
      label: "Unstake",
      onClick: onUnstake,
      variant: undefined,
      disabled: disabled,
    };
  }, [
    chainId,
    disabled,
    isConnected,
    onUnstake,
    openConnectModal,
    safeSwitchNetwork,
  ]);

  return (
    <Box direction="col" className="flex-1">
      <Button
        onClick={buttonConfig?.onClick}
        variant={buttonConfig?.variant}
        size="lg"
        disabled={isLoading || buttonConfig?.disabled}
      >
        {buttonConfig?.label}
        {(isLoading || isUnstaking) && <Spinner className="ml-1" size={16} />}
      </Button>
    </Box>
  );
};
