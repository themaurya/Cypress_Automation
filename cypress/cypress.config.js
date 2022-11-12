const { defineConfig } = require("cypress");
const Mochawesome = require("mochawesome");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
  env: {
    url : "https://rahulshettyacademy.com/angularpractice/"
  }
});
