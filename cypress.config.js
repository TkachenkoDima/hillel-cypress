const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://the-internet.herokuapp.com/",
    retries: {
      runMode: 0,
      openMode: 0,
    },
    video: true,
  },
});