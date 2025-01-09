const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || "https://qauto.forstudy.space",
    retries: {
      runMode: 0,
      openMode: 0,
    },
    video: true,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "mochawesome-report",
      reportFilename: "report",
      quiet: true,
    },
  },
});
