const ImageMinPlugin = require("imagemin-webpack-plugin").default;
const packageJson = require("./package");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const markdown = require("markdown-js");
const fs = require("fs");

process.env.VUE_APP_VERSION = packageJson.version;
process.env.VUE_APP_AUTHOR = packageJson.author;
process.env.VUE_APP_CHANGELOG = markdown.makeHtml(fs.readFileSync("CHANGELOG.md", "utf8"));
process.env.VUE_APP_README = markdown.makeHtml(fs.readFileSync("README.md", "utf8"));

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
        },
        // manifestPath: "oldManifest",
        manifestOptions: {
            icons: [
                {
                    src: "/android-chrome-36x36.png",
                    sizes: "36x36",
                    type: "image/png"
                },
                {
                    src: "/android-chrome-48x48.png",
                    sizes: "48x48",
                    type: "image/png"
                },
                {
                    src: "/android-chrome-72x72.png",
                    sizes: "72x72",
                    type: "image/png"
                },
                {
                    src: "/android-chrome-96x96.png",
                    sizes: "96x96",
                    type: "image/png"
                },
                {
                    src: "/android-chrome-144x144.png",
                    sizes: "144x144",
                    type: "image/png"
                },
                {
                    src: "/android-chrome-192x192.png",
                    sizes: "192x192",
                    type: "image/png"
                },
                {
                    src: "/android-chrome-256x256.png",
                    sizes: "256x256",
                    type: "image/png"
                },
                {
                    src: "/android-chrome-384x384.png",
                    sizes: "384x384",
                    type: "image/png"
                },
                {
                    src: "/android-chrome-512x512.png",
                    sizes: "512x512",
                    type: "image/png"
                }
            ]
        }
    },
    configureWebpack: (config) => {
        config.module.rules.push(
            {
                test: /\.md$/,
                use: "raw-loader"
            }
        );

        if (process.env.NODE_ENV === "production") {
            config.plugins.push(...[
                new FaviconsWebpackPlugin({
                    logo: "./src/assets/logo.png",
                    prefix: ""
                    /*favicons: {
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
                    }*/
                }),
                new ImageMinPlugin({
                    disable: process.env.NODE_ENV !== "production", // Disable during development
                    pngquant: {
                        quality: "95-100"
                    }
                })
            ]);
        }
    }
};
