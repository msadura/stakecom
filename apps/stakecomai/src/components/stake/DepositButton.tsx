"use client";

import { useCallback, useMemo, useState } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { switchChain } from "@wagmi/core";
import { useAccount, useConfig } from "wagmi";
import { mainnet } from "wagmi/chains";

import { Spinner } from "~/components/Spinner";
import { Button } from "~/components/ui/button";

interface ButtonConfig {
  label: string;
  onClick: () => void;
  variant: undefined | "secondary" | "warning";
  disabled?: boolean;
  tooltip?: string;
}

export const DepositButton = ({
  onStake,
  onApprove,
  stakingPaused,
  hasAllowance,
  disabled,
  isPending,
}: {
  onStake: VoidFunction;
  onApprove: VoidFunction;
  stakingPaused?: boolean;
  isPending?: boolean;
  hasAllowance: boolean;
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

    if (stakingPaused) {
      return {
        label: "Deposits disabled",
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClick: () => {},
        variant: undefined,
        disabled: true,
      };
    }

    if (!hasAllowance) {
      return {
        label: "Approve",
        onClick: onApprove,
        variant: undefined,
        disabled,
      };
    }

    return {
      label: "Deposit",
      onClick: onStake,
      variant: undefined,
      disabled: disabled || isPending,
    };
  }, [
    chainId,
    disabled,
    hasAllowance,
    isConnected,
    isPending,
    onApprove,
    onStake,
    openConnectModal,
    safeSwitchNetwork,
    stakingPaused,
  ]);

  return (
    <Button
      onClick={buttonConfig?.onClick}
      variant={buttonConfig?.variant}
      className="flex-1"
      size="lg"
      disabled={isLoading || buttonConfig?.disabled}
    >
      {buttonConfig?.label}
      {(isLoading || isPending) && <Spinner className="mx-1" size={16} />}
    </Button>
  );
};
