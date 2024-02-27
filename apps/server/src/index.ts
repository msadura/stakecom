import { Elysia } from "elysia";

const app = new Elysia().get("/as", () => "Hello Elysia").listen(3355);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
