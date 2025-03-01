import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tailwind from "eslint-plugin-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const tailwindESLintContext = {
  settingsDefault: {
    // These are the default values but feel free to customize
    callees: ["classnames", "clsx", "ctl", "cn"],
    config: "tailwind.config.js",
    cssFiles: [
      "**/*.css",
      "!**/node_modules",
      "!**/.*",
      "!**/dist",
      "!**/build",
    ],
    cssFilesRefreshRate: 5_000,
    removeDuplicates: true,
    skipClassAttribute: false,
    whitelist: [],
    tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
    classRegex: "^class(Name)?$", // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
  },
  getConfig() {
    return [
      ...tailwind.configs["flat/recommended"],
      {
        settings: {
          tailwindcss: {
            ...this.settingsDefault,
            callees: [...this.settingsDefault.callees, "twMerge"], // cn함수와 연관된 callee 추가
            config: "./tailwind.config.ts", // tailwind config file이 ts이므로 변경
            classRegex: "^(class(Name)?|.*Style.*|bi-.*|fa-.*)$", // Style도 포함
          },
        },
      },
    ];
  },
};

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...tailwindESLintContext.getConfig(),
  {
    rules: {
      "tailwindcss/no-custom-classname": isProduction ? "off" : "warn", // 🚀 프로덕션에서는 끄고, 개발에서는 경고
    },
  },
];

export default eslintConfig;
