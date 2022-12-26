const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-localstorage-commands/plugin")(on, config);
      return config;
    },

    "env": {
      "test":{
        presets: [["env" , {"targets" : { "node" : true } }]]
      }
    },

    chromeWebSecurity: false,
    numTestsKeptInMemory: 200,
    defaultCommandTimeout: 10000,
    execTimeout: 20000,
    pageLoadTimeout: 60000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    baseUrl: 'http://localhost/orangehrm',
    retries: {
      runMode: 0,
      openMode: 0,
    },
    resolve: {
      extensions: ['.ts', '.js' ,'.json', '.wasm'],
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

