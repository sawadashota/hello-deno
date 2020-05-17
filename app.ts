import {
  Application,
  Context,
  Router,
  send,
} from "https://deno.land/x/oak/mod.ts";
import { registerRoutes } from "./hello/handler.ts";
import { port } from "./config.ts";

const app = new Application();

// Logger
app.use(async (ctx: Context, next: () => Promise<void>) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx: Context, next: () => Promise<void>) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Register each handler
const router = new Router();
registerRoutes(router);
app.use(router.routes());

// Serve static files
app.use(async (ctx: Context) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/static`,
    index: "index.html",
  });
});

console.log(`Listening :${port}`);
await app.listen({ port });
