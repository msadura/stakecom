import Fastify from "fastify";
import { z } from "zod";

import { getBalance } from "@comstaked/commune-sdk";

const fastify = Fastify({
  logger: true,
});

fastify.get<{ Querystring: { key: string } }>("/", async (request) => {
  const key = z.string().parse(request.query.key);

  const balance = await getBalance(key);
  return { hello: "world", balance };
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 5555 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start().catch(console.error);
