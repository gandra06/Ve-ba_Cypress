/// <reference types="cypress" />
const cucumber = require('cypress-cucumber-preprocessor').default
const browserify = require('@cypress/browserify-preprocessor')

browserify.defaultOptions.browserifyOptions.plugin.unshift(['tsify', { project: './cypress/tsconfig.json' }])

const browserifyOptions = {
  typescript: require.resolve('typescript'),
}
const cucumberOptions = { ...browserify.defaultOptions }
const b = browserify(browserifyOptions)
const c = cucumber(cucumberOptions)

module.exports = on => {

  on('file:preprocessor', browserify())
  on('file:preprocessor', file => {
    if (file.filePath.includes('.feature')) {
      return c(file)
    }
    return b(file)
  })
  on('before:browser:launch', (browser = {}, args) => {
    if (browser.name === 'chrome') {
      args.push('--remote-debugging-port=9222')
      return args
    }
  })
}

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
   
    const getCompareSnapshotsPlugin = require('cypress-image-diff-js/dist/plugin')
    getCompareSnapshotsPlugin(on, config)
    on('file:preprocessor', cucumber())
}
