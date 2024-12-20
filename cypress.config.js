const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://the-internet.herokuapp.com/",
    retries: {
      runMode: 2,
      openMode: 2,
    },
    video: true,
  },
});