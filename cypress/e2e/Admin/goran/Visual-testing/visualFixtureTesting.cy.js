/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})