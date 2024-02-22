import { Box } from "~/components/ui/box";
import { Button } from "~/components/ui/button";

export default async function HomePage() {
  return (
    <main className="container py-16">
      <div className="flex flex-col items-center justify-center">
        <Box align="center" className="gap-1">
          <img src="/commune.svg" alt="stake.com.ai" width="45" height="40" />
          <h1 className="text-3xl font-extrabold">Stake Commune AI</h1>
        </Box>
        <h2 className="text-xltext-muted-foreground">
          Stake your wCom tokens and enjoy native yield!
        </h2>

        <Box className="mt-5">
          <Button variant="warning" disabled>
            Coming soon...
          </Button>
        </Box>
      </div>
    </main>
  );
}
