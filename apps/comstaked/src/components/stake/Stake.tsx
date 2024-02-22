import { Box } from "~/components/ui/box";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export function Stake() {
  return (
    <Tabs defaultValue="account" className="w-[400px] text-left">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Stake</TabsTrigger>
        <TabsTrigger value="password">Withdraw</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardContent className="justify-start space-y-2">
            <div className="space-y-1 pt-6">
              <Box justify="between">
                <Label htmlFor="name" className="text-muted-foreground">
                  Deposit
                </Label>
                <Label htmlFor="name" className="text-muted-foreground">
                  Balance:{" "}
                  <span className="font-bold text-foreground">0.0</span>
                </Label>
              </Box>
              <Input id="amount" defaultValue="10" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="flex-1" variant="warning" size="lg">
              Connect wallet
            </Button>
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
              <Input id="amount" defaultValue="10" />
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
