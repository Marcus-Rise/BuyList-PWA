const ImageMinPlugin = require("imagemin-webpack-plugin").default;
const packageJson = require("./package");

process.env.VUE_APP_VERSION = packageJson.version;
process.env.VUE_APP_AUTHOR = packageJson.author;

module.exports = {
  transpileDependencies: ["vuetify"],
  css: {
    extract: { ignoreOrder: true }
  },
  pwa: {
    name: "BuyList",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/sw.js",
      swDest: "service-worker.js"
    }
  },
  configureWebpack: {
    plugins: [
      // Make sure that the plugin is after any plugins that add images
      new ImageMinPlugin({
        disable: process.env.NODE_ENV !== "production", // Disable during development
        pngquant: {
          quality: "95-100"
        }
      })
    ]
  }
};
