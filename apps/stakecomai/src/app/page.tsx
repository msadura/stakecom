import { ComLogo } from "~/components/ComLogo";
import { Stake } from "~/components/stake/Stake";
import { StakerStats } from "~/components/stakerStats/StakerStats";
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
          Stake your wCOM tokens and enjoy native yield!
        </h2>

        <Box className="mx-auto mt-6 flex w-full max-w-[400px] flex-col gap-4 self-stretch text-left md:mt-12">
          <StakerStats />

          <Box className=" flex-1 justify-center self-stretch ">
            <Stake />
          </Box>
        </Box>
      </div>
    </main>
  );
}
