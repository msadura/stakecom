"use client";

import { useCallback, useMemo, useState } from "react";
import { COMAI_DECIMALS } from "~core/constants";
import { formatCOMAmount } from "~core/formatters";
import { AlertTriangle } from "lucide-react";
import { formatUnits } from "viem";

import { ComLogo } from "~/components/ComLogo";
import { WithdrawButton } from "~/components/stake/WithdrawButton";
import { Box } from "~/components/ui/box";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useBridge } from "~/hooks/useBridge";
import { useStaker } from "~/hooks/useStaker";
import { toAmount } from "~/lib/toAmount";

const MIN_WITHDRAW = 12;

export function WithdrawCard() {
  const { stakerQuery } = useStaker();
  const { claimableAmount, isClaiming, claimFromBridge } = useBridge();
  // withdraw - COMAI decimals
  const [value, setValue] = useState(
    BigInt(toAmount(MIN_WITHDRAW, COMAI_DECIMALS)),
  );
  const [inputValue, setInputValue] = useState(MIN_WITHDRAW.toString());

  const { data: staker } = stakerQuery;
  const nativeBalance = BigInt(staker?.balance || "0");
  const stakeBalance = BigInt(staker?.stake || "0");
  const comBalance = nativeBalance + stakeBalance;

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const newValue = e.target.value
          ? toAmount(e.target.value, COMAI_DECIMALS)
          : BigInt(0n);

        setValue(newValue);
        setInputValue(e.target.value);
      } catch (e) {
        // nothing
      }
    },
    [],
  );

  const onMaxClick = useCallback(() => {
    setValue(comBalance);
    setInputValue(formatUnits(comBalance, COMAI_DECIMALS));
  }, [comBalance]);

  const error = useMemo(() => {
    if (value < toAmount(MIN_WITHDRAW, COMAI_DECIMALS)) {
      return "Withdraw amount too low";
    }

    if (value > comBalance) {
      return "Insufficient balance";
    }

    return "";
  }, [comBalance, value]);

  return (
    <Card>
      <CardContent className="justify-start space-y-2 py-0">
        <div className="pt-6">
          <Box justify="between">
            <Label htmlFor="name" className="mb-1 text-muted-foreground">
              Withdraw wCOM
            </Label>
            <Label htmlFor="name" className="text-muted-foreground">
              Stake:{" "}
              <span className="font-bold text-foreground">
                {formatCOMAmount(comBalance, { maxDecimals: 4 })}
              </span>
            </Label>
          </Box>
          <Box className="relative" align="center">
            <Box className="absolute left-2.5">
              <ComLogo size={24} />
            </Box>
            <Input
              id="amount"
              defaultValue="10"
              className="pl-[40px] pr-[60px] text-lg font-bold"
              value={inputValue}
              onChange={onInputChange}
              placeholder="0.0"
            />
            <Button
              onClick={onMaxClick}
              variant="muted"
              className="absolute right-[0px] max-w-[60px] rounded-l-none py-1 text-xs"
            >
              Max
            </Button>
          </Box>

          <Box className="py-3">
            {error ? (
              <Box className="gap-1">
                <AlertTriangle className="text-warning" size={16} />
                <p className="text-warning text-xs">{error || "\u00A0"}</p>
              </Box>
            ) : (
              <p className="text-xs">{"\u00A0"}</p>
            )}
          </Box>
        </div>
      </CardContent>
      <CardFooter className="mt-0">
        <WithdrawButton
          claimAmount={claimableAmount}
          isClaiming={isClaiming}
          onClaim={claimFromBridge}
        />
      </CardFooter>
    </Card>
  );
}
