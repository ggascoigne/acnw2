// snowpack.config.js
module.exports = {
  extends: "@snowpack/app-scripts-react",
  scripts: {
    "bundle:*": "@snowpack/plugin-webpack",
    "mount:public": "mount public --to /",
    "mount:src": "mount src --to /_dist_",
    "mount:@": "mount src --to /@",
  },
  plugins: [["@snowpack/plugin-webpack"]],
  installOptions: {
    rollup: {
      plugins: [
        require('rollup-plugin-node-polyfills')()
      ]
    },
    sourceMap: true
  },
  devOptions: {
    port: parseInt(process.env.PORT) || 3000,
    open: 'none'
  }
};
