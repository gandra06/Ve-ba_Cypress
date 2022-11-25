const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    baseUrl: 'http://localhost/orangehrm',
    retries: {
      runMode: 0,
      openMode: 0,
    },
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    chromeWebSecurity: false,
    fixturesFolder: 'cypress/fixtures',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}',
    trashAssetsBeforeRuns: true,
    video: true,
    videoCompression: 32,
    videosFolder: 'cypress/videos',
    videoUploadOnPasses: true,
   // uncaught:'exception' ,
    setupNodeEvents(on, config) {
     
      return require('./cypress/plugins/index.js')(on, config)
     
     
    },
  
  },
  
})

