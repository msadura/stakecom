import { Stake } from "~/components/stake/Stake";
import { Box } from "~/components/ui/box";

export default async function HomePage() {
  return (
    <main className="container py-12">
      <div className="flex flex-col items-center justify-center text-center ">
        <Box align="center" className="flex-wrap justify-center gap-1">
          <img src="/commune.svg" alt="stake.com.ai" width="45" height="40" />
          <h1 className="whitespace-nowrap text-3xl font-extrabold">
            Stake Commune AI
          </h1>
        </Box>
        <h2 className="text-center text-xl text-muted-foreground">
          Stake your wCom tokens and enjoy native yield!
        </h2>

        <Box className="mt-12">
          <Stake />
        </Box>
      </div>
    </main>
  );
}
