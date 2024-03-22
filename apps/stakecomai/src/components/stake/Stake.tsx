import { DepositCard } from "~/components/stake/DepositCard";
import { WithdrawCard } from "~/components/stake/WithdrawCard";
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
        <DepositCard />
      </TabsContent>
      <TabsContent value="password">
        <WithdrawCard />
      </TabsContent>
    </Tabs>
  );
}
