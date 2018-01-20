import typescript from "rollup-plugin-typescript2";
import tsc from "typescript";
import pkg from "./package.json";

const external = Object.keys(pkg.dependencies || {});

export default [
  {
    input: "index.tsx",
    output: {
      file: pkg.browser,
      format: "umd"
    },
    external,
    name: "Topbar",
    plugins: [typescript({ typescript: tsc })]
  },
  {
    input: "index.tsx",
    external,
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ],
    plugins: [typescript({ typescript: tsc })]
  }
];
