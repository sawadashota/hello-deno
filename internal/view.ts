const { cwd } = Deno;
import { renderFileToString, Params } from "https://deno.land/x/dejs/mod.ts";

export const view = async (name: string, params: Params): Promise<string> =>
  await renderFileToString(`${cwd()}/views/${name}.ejs`, params);
