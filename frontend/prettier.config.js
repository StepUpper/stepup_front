export default {
  tailwindConfig: "./tailwind.config.js",
  plugins: [import('prettier-plugin-tailwindcss')],
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
};