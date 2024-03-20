"use client";

import { useCallback, useMemo, useState } from "react";
import { toMaxDecimals } from "~core/formatters";
import { AlertTriangle } from "lucide-react";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";

import { ComLogo } from "~/components/ComLogo";
import { DepositButton } from "~/components/stake/DepositButton";
import { StakeFees } from "~/components/stake/StakeFees";
import { Box } from "~/components/ui/box";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Combobox } from "~/components/ui/combobox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useFees } from "~/hooks/useFees";
import { useStakeContract } from "~/hooks/useStakeContract";
import { useValidators } from "~/hooks/useValidators";
import { useWCom } from "~/hooks/useWCom";
import { WCOM_DECIMALS } from "~/lib/constants";
import { toAmount } from "~/lib/toAmount";

const MIN_STAKE = 15;
const DEFAULT_VALIDATOR_KEY = "vali::stakecomai";

export function DepositCard() {
  const { address } = useAccount();
  const { balance } = useWCom();
  const [value, setValue] = useState(
    BigInt(toAmount(MIN_STAKE.toString(), WCOM_DECIMALS)),
  );
  const [validatorKey, setValidatorKey] = useState(DEFAULT_VALIDATOR_KEY);
  const [inputValue, setInputValue] = useState(MIN_STAKE.toString());
  const { validator } = useValidators(validatorKey || DEFAULT_VALIDATOR_KEY);
  const fees = useFees({ amount: value, apy: validator?.apy });
  useStakeContract({ moduleKey: validator?.key, evmAddress: address });

  const onChangeValidatorKey = useCallback((value: string) => {
    setValidatorKey(value ? value : DEFAULT_VALIDATOR_KEY);
  }, []);

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
    if (!balance.isLoaded) {
      return "";
    }

    if (value < toAmount(MIN_STAKE, WCOM_DECIMALS)) {
      return "Stake amount too low";
    }

    if (value > balance.value) {
      return "Insufficient balance";
    }

    return "";
  }, [balance.isLoaded, balance.value, value]);

  return (
    <Card>
      <CardContent className="mb-4 justify-start py-0 ">
        <div className="pt-6">
          <Box justify="between">
            <Label htmlFor="name" className="mb-1 text-muted-foreground">
              Deposit wCOM
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

          <Box className="mt-2">
            <Combobox
              options={[
                {
                  label: "More modules coming soon...",
                  value: "",
                  disabled: true,
                },
                {
                  label: "vali::stakecomai",
                  value: "vali::stakecomai",
                },
              ]}
              placeholder="Select module to stake"
              value={validatorKey}
              onChange={onChangeValidatorKey}
            />
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
        <StakeFees fees={fees} />
      </CardContent>
      <CardFooter className="mt-0">
        <DepositButton />
      </CardFooter>
    </Card>
  );
}
