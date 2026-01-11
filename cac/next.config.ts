import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: false,
  register: true,
  // skipWaiting: true, // `skipWaiting` is not a valid option for `@ducanh2912/next-pwa`
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* config options here */
  // @ts-ignore - Silence "webpack config with no turbopack config" error
  turbopack: {},
};

export default withPWA(nextConfig);
