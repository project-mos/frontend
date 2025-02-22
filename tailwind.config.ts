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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        "main-color": "#4ecdc4",
        "deep-main-color": "#45b8b0",
        "btn-text-color": "#495057",
        "btn-border-main-color": "#e9ecef",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
