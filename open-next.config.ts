import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  ...defineCloudflareConfig(),
  // `pnpm build` runs OpenNext, so it must call the plain Next build to avoid recursing.
  buildCommand: "pnpm run build:next",
};
