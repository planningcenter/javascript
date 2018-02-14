const { rollup } = require("rollup");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const babel = require("rollup-plugin-babel");
const package = require("../package.json");

// console.log(package)

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

  bundle.write({
    file: "./dist/finder.js",
    format: "cjs",
    sourcemap: true
  });

  bundle.write({
    file: "./dist/finder.m.js",
    format: "es",
    sourcemap: true
  });
});
