/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
//import url from '../../../../fixtures/wiewPortData.json'
//var urlFixtures= {url}
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
        Cypress.Cookies.preserveOnce('_orangehrm');
        //cy.Time();
        cy.url().should('include', '/dashboard/index');
        cy.restoreLocalStorage();
        //cy.fixture('wiewPortData.json').as('data') 
        
        
        //cy.log(JSON.stringify({data}))
      
      
 
    })
    after(() => {
        cy.clearLocalStorage()   
    })

  it.only('Visual testing diferent form', () => {
    cy.readFile('cypress/fixtures/wiewPortData.json').then((details) => {
      details.forEach((detail) => {
        cy.intercept(detail.url).as('page')
        cy.visit(detail.url)
        //cy.request('GET', detail.url)
    
    cy.wait('@page')
    //cy.request('GET', detail.url)
    //cy.wait('@page')
    
    cy.compareSnapshot('wholePage')
  })
    cy.clearLocalStorage()


  }) 
  it('Visual teting Time form', () => {

    cy.compareSnapshot('wholePageThreshold', 0.2)
  })
  //cy.input('Empoyee Name*').compareSnapshot('element')  
})
})
