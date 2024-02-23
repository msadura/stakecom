"use client";

import { ComLogo } from "~/components/ComLogo";
import { Box } from "~/components/ui/box";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useWCom } from "~/hooks/useWCom";
import { toMaxDecimals } from "~/lib/toMaxDecimals";

export function Deposit() {
  const { balance } = useWCom();

  return (
    <div className="space-y-1 pt-6">
      <Box justify="between">
        <Label htmlFor="name" className="text-muted-foreground">
          Deposit wCom
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
        <Input id="amount" defaultValue="10" className="pl-[40px] pr-[60px]" />
        <Button
          variant="muted"
          className="absolute right-[0px] max-w-[60px] rounded-l-none py-1 text-xs"
        >
          Max
        </Button>
      </Box>
    </div>
  );
}
