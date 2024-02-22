import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { connectionString } from "./config";
import * as auth from "./schema/auth";
import * as post from "./schema/post";

export const schema = { ...auth, ...post };

export { createPgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const client = postgres(connectionString);

export const db = drizzle(client, { schema });
export const connection = client;
