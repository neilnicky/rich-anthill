import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents/partialPrefetching are off: under @opennextjs/cloudflare 1.20.x
  // the Cache Components render path hangs in workerd (Worker never responds → 1101).
  // Every route here is static/SSG anyway, so they bought nothing.
};

export default nextConfig;
