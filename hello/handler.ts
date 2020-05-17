import {
  Router,
  RouterMiddleware,
} from "https://deno.land/x/oak/mod.ts";
import { view } from "../internal/view.ts";

const registerRoutes = (router: Router): void => {
  router.get("/", hello);
  router.get("/ipinfo/:ip", ipinfo);
};

const hello: RouterMiddleware = async ({ response }) => {
  try {
    response.body = await view("hello", { message: "Hello Deno!" });
  } catch (error) {
    console.error(error);
  }
};

const ipinfo: RouterMiddleware = async ({ response, params }) => {
  if (!params.ip) {
    response.status = 422;
    response.body = { error: "path params are invalid" };
    return;
  }

  console.log(`fetching https://ipinfo.io/${params.ip}`);
  try {
    const res = await fetch(`https://ipinfo.io/${params.ip}`, {
      headers: {
        Accept: "application/json",
      },
    });
    response.body = await res.json();
  } catch (error) {
    console.error(error);
    response.status = 500;
    response.body = { error };
  }
};

export { registerRoutes };
