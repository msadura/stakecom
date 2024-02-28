import { Elysia } from "elysia";
import { generateCommuneWallet, loadStakeEvents } from "@comstaked/core";

const app = new Elysia().get("/", () => "Hello Elysia").get("/events", async () => {
 const events =  generateCommuneWallet();
 return events;
}).listen(3535);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
