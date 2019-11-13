module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: process.env.NODE_ENV === "production" ? "/buylist-pwa/" : "/",
  pwa: {
    manifestOptions: {
      start_url: "buylist-pwa"
    }
  }
};
