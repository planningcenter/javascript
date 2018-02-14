const { rollup } = require("rollup");
const babel = require("rollup-plugin-babel");
const package = require("../package.json");
const chalk = require("chalk");

rollup({
  input: package.source,
  external: "react",
  plugins: [babel()]
}).then(bundle => {
  bundle.write({
    file: "./dist/finder-layouts.umd.js",
    format: "umd",
    globals: {
      react: "React"
    },
    name: "FinderLayouts",
    sourcemap: true
  });
  console.log(`wrote ${chalk.green("dist/finder-layouts.umd.js")}`);

  bundle.write({
    file: "./dist/finder-layouts.js",
    format: "cjs",
    sourcemap: true
  });
  console.log(`wrote ${chalk.green("dist/finder-layouts.js")}`);

  bundle.write({
    file: "./dist/finder-layouts.m.js",
    format: "es",
    sourcemap: true
  });
  console.log(`wrote ${chalk.green("dist/finder-layouts.m.js")}`);
});
