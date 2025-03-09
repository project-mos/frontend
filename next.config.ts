import type { NextConfig } from "next";
import createMDX from "@next/mdx";

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
  transpilePackages: ["next-mdx-remote"],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired 플러그인 추후 추가예정
});

export default withMDX(nextConfig);
