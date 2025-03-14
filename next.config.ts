import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  /* config options here */
  webpack: (config) => {
    // svg 파일을 위한 svgr 웹팩 추가
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  // 빌드 시 콘솔 제거
  compiler: {
    removeConsole: isProduction,
  },
};

export default nextConfig;
