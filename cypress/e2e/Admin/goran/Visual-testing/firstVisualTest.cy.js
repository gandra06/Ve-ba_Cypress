/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
// visual-test.js
describe('Cypress Visual Testing', () => {
    beforeEach(() => {
        cy.viewport(390,844)
        cy.intercept('GET', 'http://localhost/orangehrm/web/index.php/auth/login').as('login')
        cy.visit("http://localhost/orangehrm/web/index.php/auth/login")
      })
it('Compare fullpage of orangeHRM login page', () => {
//cy.intercept('GET', 'http://localhost/orangehrm/web/index.php/core/i18n/messages').as('login')
         
//cy.visit("http://localhost/orangehrm/web/index.php/auth/login")
cy.wait('@login')//.then()
cy.wait(5000)
cy.compareSnapshot('wholePage')

})
it('should compare screenshot of the entire page', () => {
    //cy.visit('http://localhost/orangehrm/web/index.php/auth/login')
    cy.wait('@login')
    cy.wait(5000)
    cy.compareSnapshot('wholePageThreshold', 0.2)
  })
  it('should compare screenshot from a given element', () => {
    //cy.visit('http://localhost/orangehrm/web/index.php/auth/login')
    cy.wait('@login')
    cy.wait(5000)
    cy.get('input[name="username"]').compareSnapshot('element')
  })
  it('should compare hide an element', () => {
    //cy.visit('http://localhost/orangehrm/web/index.php/auth/login')
    cy.wait('@login')
    cy.wait(5000)
    cy.get('input[name="username"]').hideElement()
    cy.compareSnapshot('hideElement')
  })
})