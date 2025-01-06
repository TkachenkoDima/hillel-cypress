const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto.forstudy.space",
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: true,
      html: false,
      json: true,
    },
  },
});
