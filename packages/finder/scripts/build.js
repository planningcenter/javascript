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
    file: "./dist/finder.umd.js",
    format: "umd",
    globals: {
      react: "React"
    },
    name: "Finder",
    sourcemap: true
  });
  console.log(`wrote ${chalk.green("dist/finder.umd.js")}`);

  bundle.write({
    file: "./dist/finder.js",
    format: "cjs",
    sourcemap: true
  });
  console.log(`wrote ${chalk.green("dist/finder.js")}`);

  bundle.write({
    file: "./dist/finder.m.js",
    format: "es",
    sourcemap: true
  });
  console.log(`wrote ${chalk.green("dist/finder.m.js")}`);
});
