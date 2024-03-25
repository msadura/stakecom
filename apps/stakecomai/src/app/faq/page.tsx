import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Box } from "~/components/ui/box";

export default async function FAQPage() {
  return (
    <Box className="mx-auto mt-6 flex w-full max-w-[600px] flex-col gap-4 self-stretch text-left md:mt-12">
      <h3 className="text-lg font-bold">FREQUENTLY ASKED QUESTIONS</h3>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is stake.com.ai?</AccordionTrigger>
          <AccordionContent>
            It is a product that allows users to deposit wCOMAI on Ethereum and
            stake them on native Commune chain automatically. EVM users do not
            need to interact with native chain and they are able to receive
            native stake yield in COMAI tokens.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How does it work?</AccordionTrigger>
          <AccordionContent>
            Stake uses combridge to seamlessly transfer wCOMAI from Ethereum to
            the Commune network. Once transferred, the COMAI tokens are
            automatically staked in a validator pool. Validator receives rewards
            and distribute dividents to stakers automatically.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How to stake wCOMAI?</AccordionTrigger>
          <AccordionContent>
            To stake wCOMAI, you need to connect your Ethereum wallet and
            deposit wCOMAI. Your input will be validated and you will be
            prompted with any issues. Once you enter a correct amount of wCOMAI
            you should confirm transaction in your wallet. Once deposited, the
            system will automatically stake your wCOMAI on the Commune network.
            Deposit state will be stored on the ethereum chain. You can unstake
            your wCOMAI at any time.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>How to unstake and claim wCOMAI?</AccordionTrigger>
          <AccordionContent>
            You can unstake your wCOMAI at any time. To do so, you need to
            connect your evm wallet and input desired amount of staked COMAI
            tokens in &quot;withdraw&quot; tab. You should confirm transaction
            in your wallet. Once you confirm transaction, the system will
            unstake and bridge back your token. Once tokens are bridged back to
            Ethereum, you will see confirmation nad will be able to claim them
            in your wallet.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            How long does it take to confirm stake / unstake transaction
          </AccordionTrigger>
          <AccordionContent>
            Stake / unstake time depends on a few factors. The most important is
            the time needed to bridge wCOMAI from Ethereum to Commune network
            when staking (or the opposite direction when unstaking). This
            process takes usually a few minutes, but can take up even a few
            hours depending on bridge performance. Once tokens are bridged, the
            stake / unstake transaction is confirmed within a minutes. If it
            takes too long to finalize your transaction, feel free to reach our
            support.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>
            What are the risks of using stake?
          </AccordionTrigger>
          <AccordionContent>
            Stake.com.ai exercises the best practices to ensure the security of
            staked funds. However, there are always risks associated with using
            bridge which is 3rd party service although it is the most commonly
            used COMMUNEAI bridge.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
