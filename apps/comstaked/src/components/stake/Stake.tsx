import { ComLogo } from "~/components/ComLogo";
import { Deposit } from "~/components/stake/Deposit";
import { DepositButton } from "~/components/stake/DepositButton";
import { Box } from "~/components/ui/box";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export function Stake() {
  return (
    <Tabs
      defaultValue="account"
      className="flex w-full max-w-[400px] flex-col self-stretch text-left"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Stake</TabsTrigger>
        <TabsTrigger value="password">Withdraw</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardContent className="justify-start space-y-2">
            <Deposit />
          </CardContent>
          <CardFooter>
            <DepositButton />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardContent className="justify-start space-y-2">
            <div className="space-y-1 pt-6">
              <Box justify="between">
                <Label htmlFor="name" className="text-muted-foreground">
                  Withdraw
                </Label>
                <Label htmlFor="name" className="text-muted-foreground">
                  Balance:{" "}
                  <span className="font-bold text-foreground">0.0</span>
                </Label>
              </Box>
              <Box className="relative" align="center">
                <Box className="absolute left-2.5">
                  <ComLogo size={24} />
                </Box>
                <Input
                  id="amount"
                  defaultValue="10"
                  className="pl-[40px] pr-[60px]"
                />
                <Button
                  variant="muted"
                  className="absolute right-[0px] max-w-[60px] rounded-l-none py-1 text-xs"
                >
                  Max
                </Button>
              </Box>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="flex-1" size="lg">
              Init withdrawal
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
