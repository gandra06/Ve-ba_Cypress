/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Create user in PIM',() => {

    //before(() => {
        //cy.clearCookies();
        //cy.visit('/');
        //cy.loginForm();
        //cy.clearCookies()
    //})

    it('Create new user',() => {
    cy.clearCookies()
        
        cy.loginForm()
        cy.PIM()
        cy.get('form').within(($form) => {
            cy.get('input')
            cy.get('input[name="firstName"]').type('Miskic')
            cy.get('input[name="lastName"]').type('Piskic')
            //cy.get('.oxd-grid-2').find('input').invoke('cont').type({selectAll},{backSpace}).type('077')
            //cy.get('input[class="oxd-input.oxd-input--active"]')//.selectAll().type({backSpace}).type('077')
            cy.get('.oxd-grid-2 > .oxd-grid-item > .oxd-input-group')

            cy.root().submit()
        })
        //.first().type('Miskic')
        //.last().type('Piskic')
        //cy.get('.oxd-form')
        //find('button').contains('Save').click()


        
        
        
    })
})