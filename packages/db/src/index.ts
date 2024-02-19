
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as auth from "./schema/auth";
import * as post from "./schema/post";
import { connectionString } from "./config";

export const schema = { ...auth, ...post };

export { createPgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const client = new Client({ connectionString });

await client.connect();

export const db = drizzle(client, { schema });
export const connection = client;
