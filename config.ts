const { env } = Deno;

const port: number = +(env.get("PORT") || "8000");

export {
  port,
};
