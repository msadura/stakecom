"use client";

import { useCallback, useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { formatUnits } from "viem";

import { ComLogo } from "~/components/ComLogo";
import { WithdrawButton } from "~/components/stake/WithdrawButton";
import { Box } from "~/components/ui/box";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useWCom } from "~/hooks/useWCom";
import { WCOM_DECIMALS } from "~/lib/constants";
import { toAmount } from "~/lib/toAmount";
import { toMaxDecimals } from "~/lib/toMaxDecimals";

const MIN_STAKE = 10;

export function WithdrawCard() {
  const { balance } = useWCom();
  const [value, setValue] = useState(BigInt(toAmount("10", WCOM_DECIMALS)));
  const [inputValue, setInputValue] = useState("10");

  console.log("🔥v:", value);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const newValue = e.target.value
          ? toAmount(e.target.value, WCOM_DECIMALS)
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
    setValue(balance.value);
    setInputValue(formatUnits(balance.value, WCOM_DECIMALS));
  }, [balance.value]);

  const error = useMemo(() => {
    if (value < toAmount(MIN_STAKE, WCOM_DECIMALS)) {
      return "Stake amount too low";
    }

    if (value > balance.value) {
      return "Insufficient balance";
    }

    return "";
  }, [balance.value, value]);

  return (
    <Card>
      <CardContent className="justify-start space-y-2 py-0">
        <div className="pt-6">
          <Box justify="between">
            <Label htmlFor="name" className="mb-1 text-muted-foreground">
              Withdraw wCOM
            </Label>
            <Label htmlFor="name" className="text-muted-foreground">
              Balance:{" "}
              <span className="font-bold text-foreground">
                {toMaxDecimals(balance.formatted, 4)}
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
        <WithdrawButton />
      </CardFooter>
    </Card>
  );
}
