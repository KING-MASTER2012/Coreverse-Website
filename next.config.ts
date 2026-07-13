import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: [
    "192.168.56.1",
    "192.168.1.130"
  ],

  webpack(config) {
    const assetRule = config.module.rules.find(
      (rule: { test?: RegExp }) =>
        rule.test instanceof RegExp && rule.test.test(".svg"),
    );

    if (assetRule && typeof assetRule === "object") {
      assetRule.exclude = /\.svg$/i;
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default withNextIntl(nextConfig);
