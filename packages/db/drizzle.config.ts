import type { Config } from "drizzle-kit";
import { connectionString } from "./src/config";

export default {
  schema: "./src/schema",
  driver: "pg",
  out: "./drizzle",
  dbCredentials: { connectionString },
  verbose: true,
  strict: true,
  tablesFilter: ["comstaked_*"],
} satisfies Config;
