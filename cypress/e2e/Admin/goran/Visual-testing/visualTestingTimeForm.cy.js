/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
// visual-test.js
describe('Cypress Visual Testing', () => {
    before(() => {
        cy.clearLocalStorage();
        cy.viewport(1920,1080);
        cy.visit('/');
        cy.loginForm();
       
        //cy.saveLocalStorage();
    })
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('_orangehrm', 'i2n99vbi7v0ktcoa28iup53d17');
        //cy.Time();
        cy.url().should('include', '/dashboard/index');
        cy.restoreLocalStorage();
 
    })
    after(() => {
        cy.clearLocalStorage();    
    })

  it.only('Visual teting Time form', () => {
    cy.intercept('GET', url,  { fixture: 'wiewPortData' }).as('page')
    cy.request('GET',  url,  { fixture: 'wiewPortData' })
    cy.wait('@page')
    cy.wait(5000)
    cy.compareSnapshot('wholePage')
    cy.clearLocalStorage()


  }) 
  it('Visual teting Time form', () => {

    cy.compareSnapshot('wholePageThreshold', 0.2)
  })
  //cy.input('Empoyee Name*').compareSnapshot('element')  
})