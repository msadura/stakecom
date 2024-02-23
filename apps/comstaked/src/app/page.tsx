import { ComLogo } from "~/components/ComLogo";
import { Stake } from "~/components/stake/Stake";
import { Box } from "~/components/ui/box";

export default async function HomePage() {
  return (
    <main className="container py-6 md:py-12">
      <div className="flex flex-col items-center justify-center text-center ">
        <Box align="center" className="flex-wrap justify-center gap-1">
          <ComLogo size={45} />
          <h1 className="whitespace-nowrap text-3xl font-extrabold">
            Stake Commune AI
          </h1>
        </Box>
        <h2 className="text-center text-xl text-muted-foreground">
          Stake your wCom tokens and enjoy native yield!
        </h2>

        <Box className="mt-6 flex-1 justify-center self-stretch md:mt-12">
          <Stake />
        </Box>
      </div>
    </main>
  );
}
