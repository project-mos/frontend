import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

// const ROOT_DEFAULT_SIZE = 16;

// const px0_10rem = Object.fromEntries(
//   Array.from({ length: 11 }, (_, i) => [`${i}`, `${i / ROOT_DEFAULT_SIZE}rem`])
// );
// const px0_100rem = Object.fromEntries(
//   Array.from({ length: 101 }, (_, i) => [`${i}`, `${i / ROOT_DEFAULT_SIZE}rem`])
// );
// const px0_200rem = Object.fromEntries(
//   Array.from({ length: 201 }, (_, i) => [`${i}`, `${i / ROOT_DEFAULT_SIZE}rem`])
// );

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // width: px0_200rem,
      // height: px0_200rem,
      // borderWidth: px0_10rem,
      // fontSize: px0_200rem,
      // padding: px0_200rem,
      // margin: px0_200rem,
      // lineHeight: px0_100rem,
      fontSize: {
        sm: "var(--font-size)", // 기존 sm 값 유지
        md: "calc(var(--font-size) + 4px)", // 중간 크기
        lg: "calc(var(--font-size) + 8px)", // 큰 크기
        xs: "calc(var(--font-size) - 4px)", // 가장 작은 사이즈 추가
        xxs: "calc(var(--font-size) - 8px)", // 가장 작은 사이즈 추가
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        "mos-main-500": "#4ecdc4",
        "mos-main-700": "#45b8b0",
        "mos-green-500": "#348037",
        "mos-green-300": "#C8E6C9",
        "mos-green-100": "#E7F6EA",
        "mos-gray-700": "#495057",
        "mos-gray-500": "#6C757D",
        "mos-gray-100": "#D5D5D5",
        "mos-blue-700": "#1E77D2",
        "mos-blue-500": "#0D6EFD",
        "mos-blue-300": "#BDDFFB",
        "mos-blue-100": "#E3F3FD",
        "mos-pink-500": "#D21EA8",
        "mos-pink-300": "#EFA1DD",
        "mos-pink-100": "#F0D2E9",
        "mos-coral-500": "#FF6B6B",
        "btn-border-main-color": "#e9ecef",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
