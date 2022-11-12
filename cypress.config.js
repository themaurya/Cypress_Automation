const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  projectId: 'pdh7p6',
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('file:preprocessor', cucumber())
    },
  //  reporter: Mochawesome,
    specPattern: 'cypress/integration/examples/*.{feature,js,jsx,ts,tsx}'
    //specPattern: 'cypress/integration/examples/BDD/*.feature'
  },
  env: {
    url : "https://rahulshettyacademy.com/angularpractice/"
  }
});
