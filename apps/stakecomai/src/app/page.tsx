import { Stake } from "~/components/stake/Stake";
import { StakerStats } from "~/components/stakerStats/StakerStats";
import { Box } from "~/components/ui/box";

export default async function HomePage() {
  return (
    <Box className="mx-auto mt-6 flex w-full max-w-[600px] flex-col gap-4 self-stretch text-left md:mt-12">
      <StakerStats />

      <Box className=" flex-1 justify-center self-stretch ">
        <Stake />
      </Box>
    </Box>
  );
}
