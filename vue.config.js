const ImageMinPlugin = require("imagemin-webpack-plugin").default;
const packageJson = require("./package");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

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
      }),
      new FaviconsWebpackPlugin({
        logo: "./src/assets/logo.png",
        prefix: "",
        favicons: {
          appName: "BuyList",
          appDescription: "BuyList App",
          developerName: packageJson.author,
          developerURL: "https://marcus-rise.dev", // prevent retrieving from the nearest package.json
          background: "#ddd",
          theme_color: "#333",
          icons: {
            coast: false,
            yandex: false
          }
        }
      })
    ]
  }
};
