App to load miner balances.

How to setup:

1. Copy your keys json files to `./src/keys`. By default keys are located in `~/.commune/key`. If you want to copy keys from remove server use scp i.e. `scp -r root@123.123.123.123:~/.commune/keys ~/local_path/comstaked/apps/miner-stats/src/keys`

2. Edit `src/index.ts` and specify patterns for your key names to be sum up and logged:

```
await getFilteredBalance({
  pattern: /^epic[0-9]+$/i,
  label: "🔥 Log you like:",
});
```

3. Run the code from project root dir (bun is required) `pnpm stats` or directly with bun `bun comstaked/apps/miner-stats/src/index.ts`