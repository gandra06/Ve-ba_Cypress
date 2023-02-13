/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
// visual-test.js
describe('Cypress Visual Testing', () => {
    before(() => {
        cy.clearLocalStorage();
        cy.viewport(428, 926);
        cy.visit('/');
        cy.loginForm();
       
        //cy.saveLocalStorage();
    })
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('_orangehrm', 'i2n99vbi7v0ktcoa28iup53d17');
        cy.Time();
        cy.url().should('include', '/viewEmployeeTimesheet');
        cy.restoreLocalStorage();
 
    })
    after(() => {
        cy.clearLocalStorage();    
    })

  it('Visual teting Time form', () => {
    cy.compareSnapshot('wholePage')


  }) 
  it('Visual teting Time form', () => {

    cy.compareSnapshot('wholePageThreshold', 0.2)
  })
  cy.input('Empoyee Name*').compareSnapshot('element')  
})