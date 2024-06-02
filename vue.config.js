const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  pluginOptions: {
    vuetify: {},
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        extraFiles: [
          "helper.db"
        ]
      }
    }
  }
});
