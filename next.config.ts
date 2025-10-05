import type { NextConfig } from "next";


const isProduction = process.env.NODE_ENV === "production";
export const isStrictMode = true;

const nextConfig: NextConfig = {
  reactStrictMode: isStrictMode,
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
  // 외부 이미지 호스트 허용 설정
  images: {
    domains: ["mos-data-bucket.s3.amazonaws.com", "ui-avatars.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // 개발 환경에서 WebSocket 프록시 설정(http, https 요청)
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/ws-stomp/:path*",
          destination: "http://localhost:8080/ws-stomp/:path*",
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
