module.exports = {
  transpileDependencies: ["vuetify"],
  css: {
    extract: { ignoreOrder: true }
  },
  pwa: {
    name: "BuyList",
    manifestOptions: {
      start_url: "/"
    }
  }
};
