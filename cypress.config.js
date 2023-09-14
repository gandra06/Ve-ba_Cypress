/// <reference types="Cypress" />
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const { defineConfig } = require('cypress')
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')

module.exports = defineConfig({
  reporter : 'cypress-mochawesome-reporter',
  e2e: {
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      const bundler = createBundler({
        plugins : [createEsbuildPlugin(config)],});

      on('file:preprocessor', bundler);
      await addCucumberPreprocessorPlugin(on, config);
      return config;
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {downloadFile})
      require("cypress-localstorage-commands/plugin")(on, config);
      return config;
    },

    
 

    

    //setupNodeEvents(on, config) {
      //require("cypress-localstorage-commands/plugin")(on, config);
      //return config;
    //},
    //setupNodeEvents(on, config) {
     
      //return require('./cypress/plugins/index.js')(on, config)
     
     
    //},

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
    //baseUrl: 'http://localhost/orangehrm',
    retries: {
      runMode: 0,
      openMode: 0,
    },
    resolve: {
      extensions: ['.ts', '.js' ,'.json','.feature', '.wasm'],
    },
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    chromeWebSecurity: false,
    fixturesFolder: 'cypress/fixtures',
    //specPattern: 'cypress/e2e/bdd/bdd.feature',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}',
    
    trashAssetsBeforeRuns: true,
    video: true,
    videoCompression: 32,
    videosFolder: 'cypress/videos',
    videoUploadOnPasses: true,
   // uncaught:'exception' ,
    
    
  
  },
 
})

